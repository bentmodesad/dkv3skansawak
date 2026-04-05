// Saran Box - 10 DKV 3
// Dengan fitur kirim notifikasi ke WhatsApp

let sarans = [];
const ADMIN_WHATSAPP = '6289517976358'; // Nomor admin (tanpa +62, tanpa 0, tanpa spasi)

// Load saran dari localStorage
function loadSarans() {
    const saved = localStorage.getItem('saran_box');
    if (saved) {
        sarans = JSON.parse(saved);
    } else {
        sarans = [];
    }
    renderSarans();
}

// Simpan saran ke localStorage
function saveSarans() {
    localStorage.setItem('saran_box', JSON.stringify(sarans));
    renderSarans();
}

// Tampilkan saran di halaman
function renderSarans() {
    const container = document.getElementById('saranList');
    
    if (!container) return;
    
    if (sarans.length === 0) {
        container.innerHTML = '<div class="empty-saran"><i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i><p>Belum ada saran. Jadilah yang pertama!</p></div>';
        return;
    }
    
    container.innerHTML = sarans.map(s => `
        <div class="saran-item">
            <span class="saran-category ${getCategoryClass(s.type)}">${getCategoryIcon(s.type)} ${getCategoryName(s.type)}</span>
            <div class="saran-text">${escapeHtml(s.message)}</div>
            <div class="saran-date"><i class="fas fa-clock"></i> ${new Date(s.date).toLocaleString('id-ID')}</div>
            <div class="saran-status ${s.status === 'done' ? 'status-done' : 'status-pending'}">
                <i class="fas ${s.status === 'done' ? 'fa-check-circle' : 'fa-clock'}"></i> 
                ${s.status === 'done' ? 'Sudah ditanggapi' : 'Menunggu tanggapan'}
            </div>
            ${s.whatsappSent ? '<span class="badge-wa"><i class="fab fa-whatsapp"></i> Notifikasi WA terkirim</span>' : ''}
        </div>
    `).join('');
}

// Nama kategori
function getCategoryName(type) {
    const names = { saran: 'Saran', kritik: 'Kritik', pujian: 'Pujian', lain: 'Lainnya' };
    return names[type] || 'Lainnya';
}

// Icon kategori
function getCategoryIcon(type) {
    const icons = { saran: '💡', kritik: '⚠️', pujian: '👏', lain: '📝' };
    return icons[type] || '📝';
}

// Class CSS kategori
function getCategoryClass(type) {
    const classes = { saran: 'category-saran', kritik: 'category-kritik', pujian: 'category-pujian', lain: 'category-lain' };
    return classes[type] || 'category-lain';
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Kirim pesan ke WhatsApp
async function sendToWhatsApp(type, message, messageId) {
    const categoryName = getCategoryName(type);
    const categoryIcon = getCategoryIcon(type);
    const timestamp = new Date().toLocaleString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Format pesan untuk WhatsApp
    const whatsappMessage = `📢 *SARAN BARU DARI SARAN BOX DKV 3!*
    
${categoryIcon} *Jenis:* ${categoryName}
📝 *Pesan:* 
"${message}"

⏰ *Waktu:* ${timestamp}

💬 *Balas pesan ini untuk menanggapi saran.*
🔗 *Website:* ${window.location.origin}`;
    
    // Encode pesan untuk URL WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;
    
    // Simpan ke localStorage untuk history pengiriman
    const whatsappLogs = JSON.parse(localStorage.getItem('whatsapp_logs') || '[]');
    whatsappLogs.unshift({
        id: messageId,
        to: ADMIN_WHATSAPP,
        message: message.substring(0, 100),
        fullMessage: whatsappMessage,
        timestamp: new Date().toISOString(),
        sent: true
    });
    
    // Simpan hanya 50 log terakhir
    while (whatsappLogs.length > 50) whatsappLogs.pop();
    localStorage.setItem('whatsapp_logs', JSON.stringify(whatsappLogs));
    
    // Buka WhatsApp di tab baru (akan otomatis terisi pesan)
    window.open(whatsappURL, '_blank');
    
    console.log(`✅ Notifikasi WhatsApp terkirim ke ${ADMIN_WHATSAPP}`);
    return true;
}

// Submit saran
document.getElementById('saranForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const type = document.getElementById('saranType').value;
    const message = document.getElementById('saranMessage').value.trim();
    
    if (!message) {
        alert('Pesan tidak boleh kosong!');
        return;
    }
    
    const messageId = Date.now();
    
    const newSaran = {
        id: messageId,
        type: type,
        message: message,
        date: new Date().toISOString(),
        status: 'pending',
        whatsappSent: true
    };
    
    sarans.unshift(newSaran);
    saveSarans();
    
    // Kirim ke WhatsApp
    await sendToWhatsApp(type, message, messageId);
    
    // Reset form
    document.getElementById('saranForm').reset();
    
    // Animasi sukses
    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fab fa-whatsapp"></i> Terkirim ke Admin!';
    btn.style.background = '#25d366';
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '#4f46e5';
    }, 3000);
    
    // Tampilkan alert sukses
    showNotification('Saran terkirim! Admin akan menerima notifikasi WhatsApp.', 'success');
});

// Fungsi notifikasi
function showNotification(message, type) {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = `notification ${type}`;
    notificationDiv.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${message}`;
    notificationDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#4f46e5'};
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notificationDiv);
    
    setTimeout(() => {
        notificationDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificationDiv.remove(), 300);
    }, 3000);
}

// Tambahkan CSS animasi
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
    .badge-wa {
        display: inline-block;
        background: #25d36620;
        color: #25d366;
        padding: 2px 10px;
        border-radius: 20px;
        font-size: 0.7rem;
        margin-top: 8px;
    }
`;
document.head.appendChild(style);

// Inisialisasi
loadSarans();

// Simpan juga ke storage.js jika ada (untuk cloud sync)
if (typeof storage !== 'undefined' && storage.setSaran) {
    storage.setSaran(sarans);
}