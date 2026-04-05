// AI Chatbot - 10 DKV 3

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Database pengetahuan AI
const knowledgeBase = {
    // Salam
    'halo': 'Halo! 👋 Ada yang bisa saya bantu?',
    'hai': 'Hai juga! Semangat belajar ya! 💪',
    'assalamualaikum': 'Waalaikumsalam! Selamat datang di website DKV 3 🙏',
    'pagi': 'Selamat pagi! Semoga harimu menyenangkan! ☀️',
    
    // Info Kelas
    'kelas berapa': 'Kami adalah kelas 10 DKV 3 - Desain Komunikasi Visual',
    'dkv itu apa': 'DKV adalah Desain Komunikasi Visual. Kami belajar desain grafis, ilustrasi, animasi, videografi, dan multimedia! 🎨',
    'wali kelas': 'Wali kelas kita adalah Ibu Abdiend, S.Pd. Beliau sangat perhatian dan baik!',
    'ketua kelas': 'Ketua kelas kita adalah Indra Yulianti. Beliau sangat bertanggung jawab!',
    'jumlah siswa': 'Kelas 10 DKV 3 memiliki 34 siswa yang kreatif dan berbakat!',
    
    // Jadwal
    'jadwal hari ini': 'Cek jadwal di halaman Jadwal ya! Minggu ini praktik/laboratorium 🖥️',
    'jadwal besok': 'Besok kita ada jadwal sesuai minggu. Cek halaman Jadwal untuk detail lengkapnya!',
    'jam masuk': 'Jam masuk sekolah pukul 07:00 WIB. Jangan terlambat ya! ⏰',
    'jam pulang': 'Pulang: Senin-Selasa-Rabu 15.30, Kamis 15.00, Jumat 11.45',
    
    // Tugas & Ujian
    'tugas': 'Tugas terbaru: Desain poster dan kumpul minggu depan. Cek grup kelas untuk info detail!',
    'ujian': 'Ujian akhir semester akan dilaksanakan bulan Desember. Persiapkan diri dengan baik! 📝',
    'pr': 'PR bisa dilihat di grup WhatsApp kelas ya!',
    
    // Guru
    'guru dkv': 'Guru DKV kami: Pak Pungky (Desain Grafis), Pak Pungky (Animasi), Pak Pungky (Fotografi)',
    'guru produktif': 'Mapel produktif: Desain Grafis, Animasi, Videografi, Fotografi, UI/UX Design',
    
    // Kegiatan
    'ekstrakurikuler': 'Ekstrakurikuler: Desain Grafis, Fotografi, Klub Film, Paskibra, dan masih banyak lagi!',
    'praktik': 'Praktik diadakan di Laboratorium Komputer dan Studio DKV 🖥️',
    'study tour': 'Study tour biasanya diadakan di akhir semester. Tunggu informasi lebih lanjut ya!',
    
    // Lagu
    'putar lagu': 'Buka halaman Music Player untuk mendengarkan lagu-lagu keren kami! 🎵',
    'lagu': 'Kami punya playlist keren! Buka menu Music Player ya! 🎧',
    'musik': 'Bisa dengar lagu di halaman Music Player. Ada Jakarta Hari Ini, Mangu, Multo!',
    
    // Lainnya
    'terima kasih': 'Sama-sama! Senang bisa membantu 😊',
    'makasih': 'Sama-sama! Selamat belajar! 📚',
    'bye': 'Dadah! Semangat terus belajarnya! 👋',
    'tolong': 'Ada yang bisa saya bantu? Silakan tanya apa saja tentang kelas 10 DKV 3!'
};

// Cari jawaban berdasarkan kata kunci
function getBotReply(message) {
    const lowerMsg = message.toLowerCase();
    
    // Cek kata kunci
    for (const [key, reply] of Object.entries(knowledgeBase)) {
        if (lowerMsg.includes(key)) {
            return reply;
        }
    }
    
    // Deteksi pertanyaan tentang jadwal
    if (lowerMsg.includes('jadwal') && (lowerMsg.includes('senin') || lowerMsg.includes('selasa') || lowerMsg.includes('rabu') || lowerMsg.includes('kamis') || lowerMsg.includes('jumat'))) {
        return 'Cek jadwal lengkap di halaman Jadwal ya! 📅 Sistem 2 minggu bergantian praktik dan teori.';
    }
    
    // Deteksi pertanyaan tentang waktu
    if (lowerMsg.includes('jam') && (lowerMsg.includes('sekolah') || lowerMsg.includes('masuk'))) {
        return 'Jam masuk sekolah pukul 07:00 WIB. Istirahat 10:10-10:25 dan 11:45-12:45. Pulang tergantung hari! ⏰';
    }
    
    // Deteksi pertanyaan tentang absen
    if (lowerMsg.includes('absen') || lowerMsg.includes('no absen')) {
        return 'Setiap siswa punya nomor absen masing-masing. Cek di halaman Anggota ya! 👥';
    }
    
    // Fallback reply
    return 'Maaf, saya belum mengerti pertanyaanmu 🤔 Coba tanyakan tentang jadwal, tugas, guru, atau kegiatan kelas ya! Atau ketik "tolong" untuk bantuan.';
}

// Tambah pesan ke chat
function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    if (isUser) {
        messageDiv.innerHTML = `
            <div class="bubble">${text}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="avatar"><i class="fas fa-robot"></i></div>
            <div class="bubble">${text}</div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Tampilkan loading
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="avatar"><i class="fas fa-robot"></i></div>
        <div class="bubble typing"><span></span><span></span><span></span></div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// Kirim pesan
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    chatInput.value = '';
    
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        const reply = getBotReply(message);
        addMessage(reply, false);
        
        // Simpan chat ke localStorage
        saveChatHistory(message, reply);
    }, 500 + Math.random() * 500);
}

function sendSuggestion(text) {
    chatInput.value = text;
    sendMessage();
}

function saveChatHistory(question, answer) {
    let history = localStorage.getItem('chat_history');
    if (history) {
        history = JSON.parse(history);
    } else {
        history = [];
    }
    history.unshift({ question, answer, time: new Date().toISOString() });
    if (history.length > 50) history.pop();
    localStorage.setItem('chat_history', JSON.stringify(history));
}

// Welcome message
setTimeout(() => {
    addMessage('Ketik pertanyaanmu atau pilih saran di atas! 😊', false);
}, 1000);