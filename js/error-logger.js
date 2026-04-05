// Error Logger - Mencatat semua error website

class ErrorLogger {
    constructor() {
        this.LOGS_KEY = 'error_logs';
        this.MAX_LOGS = 50;
        this.init();
    }
    
    init() {
        if (!localStorage.getItem(this.LOGS_KEY)) {
            localStorage.setItem(this.LOGS_KEY, JSON.stringify([]));
        }
        
        // Tangkap error global
        window.addEventListener('error', (e) => {
            this.logError({
                type: 'JavaScript Error',
                message: e.message,
                filename: e.filename,
                line: e.lineno,
                column: e.colno,
                stack: e.error?.stack
            });
        });
        
        // Tangkap Promise rejection
        window.addEventListener('unhandledrejection', (e) => {
            this.logError({
                type: 'Promise Rejection',
                message: e.reason?.message || String(e.reason),
                stack: e.reason?.stack
            });
        });
        
        // Tangkap error console
        const originalConsoleError = console.error;
        console.error = (...args) => {
            this.logError({
                type: 'Console Error',
                message: args.join(' ')
            });
            originalConsoleError.apply(console, args);
        };
        
        console.log('✅ Error Logger initialized');
    }
    
    logError(errorData) {
        const logs = this.getLogs();
        const newLog = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...errorData
        };
        
        logs.unshift(newLog);
        
        // Batasi jumlah log
        while (logs.length > this.MAX_LOGS) {
            logs.pop();
        }
        
        localStorage.setItem(this.LOGS_KEY, JSON.stringify(logs));
        
        // Kirim ke admin jika error kritis
        if (errorData.type === 'JavaScript Error' || errorData.type === 'Promise Rejection') {
            this.notifyAdmin(newLog);
        }
    }
    
    getLogs() {
        return JSON.parse(localStorage.getItem(this.LOGS_KEY) || '[]');
    }
    
    clearLogs() {
        localStorage.setItem(this.LOGS_KEY, JSON.stringify([]));
    }
    
    notifyAdmin(error) {
        // Simpan ke localStorage untuk notifikasi
        const notifications = JSON.parse(localStorage.getItem('error_notifications') || '[]');
        notifications.unshift({
            id: error.id,
            message: `${error.type}: ${error.message?.substring(0, 100)}`,
            time: error.timestamp
        });
        while (notifications.length > 10) notifications.pop();
        localStorage.setItem('error_notifications', JSON.stringify(notifications));
    }
    
    getErrorStats() {
        const logs = this.getLogs();
        const today = new Date().toDateString();
        const todayErrors = logs.filter(l => new Date(l.timestamp).toDateString() === today);
        
        return {
            total: logs.length,
            today: todayErrors.length,
            byType: {
                js: logs.filter(l => l.type === 'JavaScript Error').length,
                promise: logs.filter(l => l.type === 'Promise Rejection').length,
                console: logs.filter(l => l.type === 'Console Error').length
            }
        };
    }
}

// Inisialisasi error logger
const errorLogger = new ErrorLogger();

// Export untuk digunakan di admin panel
window.errorLogger = errorLogger;