// ============================================
// SECURITY MANAGER - 10 DKV 3
// Fitur: ReCaptcha Simulasi, Blokir IP, Session Manager
// ============================================

class SecurityManager {
    constructor() {
        this.BLOCKED_IPS_KEY = 'dkv3_blocked_ips';
        this.SESSIONS_KEY = 'dkv3_sessions';
        this.MAX_LOGIN_ATTEMPTS = 5;
        this.init();
    }

    init() {
        // Inisialisasi daftar IP terblokir
        if (!localStorage.getItem(this.BLOCKED_IPS_KEY)) {
            localStorage.setItem(this.BLOCKED_IPS_KEY, JSON.stringify([]));
        }
        
        // Inisialisasi session aktif
        if (!localStorage.getItem(this.SESSIONS_KEY)) {
            localStorage.setItem(this.SESSIONS_KEY, JSON.stringify([]));
        }
        
        // Clean expired sessions
        this.cleanExpiredSessions();
    }

    // ========== RECAPTCHA SIMULASI ==========
    generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operation = ['+', '-'][Math.floor(Math.random() * 2)];
        let result;
        
        if (operation === '+') {
            result = num1 + num2;
        } else {
            result = num1 - num2;
        }
        
        const captchaObj = {
            question: `${num1} ${operation} ${num2} = ?`,
            answer: result,
            timestamp: Date.now()
        };
        
        sessionStorage.setItem('captcha', JSON.stringify(captchaObj));
        return captchaObj.question;
    }

    verifyCaptcha(userAnswer) {
        const captchaData = sessionStorage.getItem('captcha');
        if (!captchaData) return false;
        
        const captcha = JSON.parse(captchaData);
        const isExpired = (Date.now() - captcha.timestamp) > 300000; // 5 menit expired
        
        if (isExpired) {
            sessionStorage.removeItem('captcha');
            return false;
        }
        
        const isValid = parseInt(userAnswer) === captcha.answer;
        if (isValid) sessionStorage.removeItem('captcha');
        return isValid;
    }

    // ========== BLOKIR IP ==========
    getClientIP() {
        // Simulasi IP (di hosting asli bisa dapat dari server)
        let ip = localStorage.getItem('simulated_ip');
        if (!ip) {
            // Generate IP random untuk simulasi
            ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
            localStorage.setItem('simulated_ip', ip);
        }
        return ip;
    }

    getBlockedIPs() {
        return JSON.parse(localStorage.getItem(this.BLOCKED_IPS_KEY) || '[]');
    }

    isIPBlocked() {
        const currentIP = this.getClientIP();
        const blockedIPs = this.getBlockedIPs();
        return blockedIPs.includes(currentIP);
    }

    blockIP(ip, reason = 'Mencurigakan') {
        const blockedIPs = this.getBlockedIPs();
        if (!blockedIPs.includes(ip)) {
            blockedIPs.push(ip);
            localStorage.setItem(this.BLOCKED_IPS_KEY, JSON.stringify(blockedIPs));
            this.logActivity(`IP ${ip} diblokir. Alasan: ${reason}`);
            return true;
        }
        return false;
    }

    unblockIP(ip) {
        let blockedIPs = this.getBlockedIPs();
        blockedIPs = blockedIPs.filter(i => i !== ip);
        localStorage.setItem(this.BLOCKED_IPS_KEY, JSON.stringify(blockedIPs));
        this.logActivity(`IP ${ip} dibuka blokirnya`);
        return true;
    }

    // ========== SESSION MANAGER ==========
    createSession(username, deviceInfo) {
        const sessions = this.getActiveSessions();
        const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
        
        const newSession = {
            id: sessionId,
            username: username,
            device: deviceInfo || this.getDeviceInfo(),
            ip: this.getClientIP(),
            loginTime: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 jam
        };
        
        sessions.push(newSession);
        localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
        localStorage.setItem('current_session_id', sessionId);
        
        this.logActivity(`Session baru dibuat untuk ${username} dari ${newSession.device}`);
        return newSession;
    }

    getActiveSessions() {
        const sessions = JSON.parse(localStorage.getItem(this.SESSIONS_KEY) || '[]');
        return sessions.filter(s => new Date(s.expiresAt) > new Date());
    }

    getCurrentSession() {
        const sessionId = localStorage.getItem('current_session_id');
        if (!sessionId) return null;
        
        const sessions = this.getActiveSessions();
        return sessions.find(s => s.id === sessionId) || null;
    }

    updateLastActive() {
        const sessionId = localStorage.getItem('current_session_id');
        if (!sessionId) return;
        
        const sessions = JSON.parse(localStorage.getItem(this.SESSIONS_KEY) || '[]');
        const sessionIndex = sessions.findIndex(s => s.id === sessionId);
        
        if (sessionIndex !== -1) {
            sessions[sessionIndex].lastActive = new Date().toISOString();
            localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
        }
    }

    terminateSession(sessionId) {
        let sessions = JSON.parse(localStorage.getItem(this.SESSIONS_KEY) || '[]');
        sessions = sessions.filter(s => s.id !== sessionId);
        localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
        
        if (sessionId === localStorage.getItem('current_session_id')) {
            localStorage.removeItem('current_session_id');
            localStorage.removeItem('isLoggedIn');
        }
        
        this.logActivity(`Session ${sessionId} diterminate`);
        return true;
    }

    terminateAllOtherSessions(currentSessionId) {
        let sessions = JSON.parse(localStorage.getItem(this.SESSIONS_KEY) || '[]');
        sessions = sessions.filter(s => s.id === currentSessionId);
        localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
        this.logActivity('Semua session lain di terminate');
        return true;
    }

    cleanExpiredSessions() {
        let sessions = JSON.parse(localStorage.getItem(this.SESSIONS_KEY) || '[]');
        const validSessions = sessions.filter(s => new Date(s.expiresAt) > new Date());
        
        if (validSessions.length !== sessions.length) {
            localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(validSessions));
        }
    }

    // ========== UTILITY ==========
    getDeviceInfo() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'Tablet';
        }
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'Mobile';
        }
        return 'Desktop';
    }

    logActivity(action) {
        let logs = localStorage.getItem('security_logs');
        logs = logs ? JSON.parse(logs) : [];
        
        logs.unshift({
            id: Date.now(),
            action: action,
            ip: this.getClientIP(),
            device: this.getDeviceInfo(),
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 logs
        if (logs.length > 100) logs.pop();
        localStorage.setItem('security_logs', JSON.stringify(logs));
    }

    getActivityLogs() {
        return JSON.parse(localStorage.getItem('security_logs') || '[]');
    }

    clearActivityLogs() {
        localStorage.setItem('security_logs', JSON.stringify([]));
        this.logActivity('Log aktivitas dibersihkan');
    }

    // Cek keamanan sebelum akses
    checkSecurity() {
        // Cek IP terblokir
        if (this.isIPBlocked()) {
            alert('⚠️ Akses Anda diblokir! Hubungi admin jika ini kesalahan.');
            window.location.href = 'index.html';
            return false;
        }
        
        // Update last active jika ada session
        if (localStorage.getItem('isLoggedIn') === 'true') {
            this.updateLastActive();
        }
        
        return true;
    }
}

// Inisialisasi security manager
const security = new SecurityManager();

// Jalankan pengecekan keamanan setiap halaman
if (security.checkSecurity()) {
    console.log('✅ Security check passed');
}

// Update last active setiap 30 detik jika login
setInterval(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        security.updateLastActive();
    }
}, 30000);