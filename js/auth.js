class AuthSystem {
    constructor() {
        this.SESSION_COOKIE = 'dkv3_session';
        this.init();
    }
    
    init() {
        if (!localStorage.getItem('dkv3_users')) {
            const defaultUsers = [
                { username: 'admin', password: btoa('admin123_salt'), role: 'admin' }
            ];
            localStorage.setItem('dkv3_users', JSON.stringify(defaultUsers));
        }
    }
    
    hashPassword(password) {
        return btoa(password + '_salt');
    }
    
    login(username, password, remember = false) {
        const users = JSON.parse(localStorage.getItem('dkv3_users'));
        const user = users.find(u => u.username === username);
        
        if (!user || user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Username atau password salah!' };
        }
        
        const sessionData = { username: user.username, role: user.role, loginTime: new Date().toISOString() };
        const days = remember ? 30 : 1;
        cookieManager.setCookie(this.SESSION_COOKIE, btoa(JSON.stringify(sessionData)), days);
        
        return { success: true, message: 'Login berhasil!', user: { username: user.username, role: user.role } };
    }
    
    isLoggedIn() {
        const session = cookieManager.getCookie(this.SESSION_COOKIE);
        if (!session) return false;
        try {
            JSON.parse(atob(session));
            return true;
        } catch(e) { return false; }
    }
    
    getCurrentUser() {
        const session = cookieManager.getCookie(this.SESSION_COOKIE);
        if (!session) return null;
        try {
            return JSON.parse(atob(session));
        } catch(e) { return null; }
    }
    
    logout() {
        cookieManager.deleteCookie(this.SESSION_COOKIE);
        window.location.href = 'login.html';
    }
}

const auth = new AuthSystem();

function login(username, password, remember) { return auth.login(username, password, remember); }
function logout() { auth.logout(); }
function isLoggedIn() { return auth.isLoggedIn(); }
function getCurrentUser() { return auth.getCurrentUser(); }
function requireAuth() { if (!isLoggedIn()) { window.location.href = 'login.html'; return false; } return true; }