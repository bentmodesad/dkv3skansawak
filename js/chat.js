// Chat Real-time Kelas 10 DKV 3 - Cloud Sync (jsonbin.io)
// Fixed: No duplicates, XSS safe, rate limited, robust fallback

const BIN_ID = '672f9e8aad19ca34f8b9e4b7';
const API_KEY = '$2a$10$Gp/0eXzyHGESNT/T72Di3OuvWifb.ebc.aeOmGJgarDawFOM9IY/e';
const ACCESS_KEY = '$2a$10$uaKOY7jVAZxvHGSN/2uRQuxrxfmlMRsD7dUMGwp.x0cDYSBEWxuT2';

let chatMessages = [];
let autoRefreshInterval;
let lastSendTime = 0;
const RATE_LIMIT_MS = 1000; // 1s cooldown

// Utility functions
function getAvatarColor(name) {
    const colors = ['#4f46e5', '#ec489a', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash) + name.charCodeAt(i);
        hash |= 0;
    }
    return colors[Math.abs(hash) % colors.length];
}

function formatTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'Baru saja';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
    return date.toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load chat from cloud (primary)
async function loadChatFromCloud() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': API_KEY,
                'X-Access-Key': ACCESS_KEY
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const cloudData = data.record || {};
            chatMessages = cloudData.chat || [];
            localStorage.setItem('dkv3_chat_cache', JSON.stringify(chatMessages)); // Cache
            renderChat();
        } else {
            console.warn('Cloud load failed, using cache');
            loadChatFromCache();
        }
    } catch (error) {
        console.error('Cloud error:', error);
        loadChatFromCache();
    }
}

// Fallbacks
function loadChatFromCache() {
    const cached = localStorage.getItem('dkv3_chat_cache');
    chatMessages = cached ? JSON.parse(cached) : [];
    renderChat();
}

async function saveChatToCloud() {
    try {
        // Get current cloud data
        const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            headers: { 'X-Master-Key': API_KEY }
        });
        
        const cloudData = getRes.ok ? (await getRes.json()).record || {} : {};
        cloudData.chat = chatMessages;
        cloudData.lastChatUpdate = new Date().toISOString();

        const saveRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(cloudData)
        });

        if (saveRes.ok) {
            localStorage.setItem('dkv3_chat_cache', JSON.stringify(chatMessages));
            console.log('✅ Chat synced to cloud');
        }
    } catch (error) {
        console.error('Save error:', error);
        localStorage.setItem('dkv3_chat_cache', JSON.stringify(chatMessages));
    }
}

function renderChat() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    if (chatMessages.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:40px;color:#94a3b8;">
                <i class="fas fa-comments" style="font-size:3rem;margin-bottom:15px;display:block;"></i>
                <p>Belum ada pesan. Jadilah yang pertama!</p>
                <p style="font-size:0.8rem;">Pesan tersimpan di cloud, sync real-time</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = chatMessages.map(msg => `
        <div class="chat-message">
            <div class="chat-avatar" style="background:${getAvatarColor(msg.sender)}">
                ${escapeHtml(msg.sender.charAt(0).toUpperCase())}
            </div>
            <div class="chat-bubble">
                <div class="chat-name">${escapeHtml(msg.sender)}
                    <span style="font-size:0.7rem;color:#94a3b8;font-weight:normal;">
                        ${formatTime(msg.time)}
                    </span>
                </div>
                <div class="chat-text">${escapeHtml(msg.text)}</div>
            </div>
        </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
}

// Send message with rate limit
async function sendMessage() {
    const now = Date.now();
    if (now - lastSendTime < RATE_LIMIT_MS) {
        alert('Tunggu sebentar sebelum kirim lagi!');
        return;
    }
    lastSendTime = now;

    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    const username = localStorage.getItem('chatUsername') || `Siswa_${Math.floor(Math.random()*100)}`;
    
    const newMessage = {
        id: Date.now(),
        sender: username,
        text: text.slice(0, 500), // Max 500 chars
        time: new Date().toISOString()
    };
    
    chatMessages.push(newMessage);
    if (chatMessages.length > 200) chatMessages = chatMessages.slice(-200);
    
    await saveChatToCloud();
    renderChat();
    input.value = '';
}

// Set username + welcome
function setUsername() {
    const name = prompt('Nama untuk chat:', localStorage.getItem('chatUsername') || '');
    if (name && name.trim()) {
        const trimmed = name.trim().slice(0, 20);
        localStorage.setItem('chatUsername', trimmed);
        document.getElementById('currentUser').textContent = trimmed;
        
        const welcomeMsg = {
            id: Date.now() + 1,
            sender: 'System',
            text: `✨ ${trimmed} bergabung ke chat kelas!`,
            time: new Date().toISOString()
        };
        chatMessages.push(welcomeMsg);
        saveChatToCloud();
        renderChat();
    }
}

// Auto refresh
function startAutoRefresh() {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(loadChatFromCloud, 3000);
}

// Init
async function initChat() {
    // Default username
    if (!localStorage.getItem('chatUsername')) {
        const defaultName = `Siswa_${Math.floor(Math.random()*100)}`;
        localStorage.setItem('chatUsername', defaultName);
    }
    document.getElementById('currentUser').textContent = localStorage.getItem('chatUsername');
    
    await loadChatFromCloud();
    startAutoRefresh();
    
    // Enter key support
    document.getElementById('chatInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });
}

// DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
} else {
    initChat();
}

