// QR Code Dinamis - 10 DKV 3

let currentQRType = 'website';
let currentQR = null;
let membersList = [];

// Base URL website (sesuaikan dengan domain Anda)
const BASE_URL = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');

function loadMembers() {
    membersList = storage.getMembers();
    const select = document.getElementById('memberSelect');
    if (select) {
        select.innerHTML = '<option value="">-- Pilih Anggota --</option>' + 
            membersList.map(m => `<option value="${m.id}">${m.noAbsen} - ${m.name}</option>`).join('');
    }
}

function changeQRType(type) {
    currentQRType = type;
    
    // Update active button
    document.querySelectorAll('.qr-type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(getButtonText(type))) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide member select
    const memberSelectContainer = document.getElementById('memberSelectContainer');
    if (type === 'member') {
        memberSelectContainer.style.display = 'block';
        loadMembers();
        generateMemberQR();
    } else {
        memberSelectContainer.style.display = 'none';
        generateQR(getURLForType(type));
    }
}

function getButtonText(type) {
    const texts = {
        'website': 'Website',
        'album': 'Album',
        'jadwal': 'Jadwal',
        'anggota': 'Anggota',
        'member': 'Anggota Tertentu'
    };
    return texts[type] || 'Website';
}

function getURLForType(type) {
    const urls = {
        'website': BASE_URL + 'index.html',
        'album': BASE_URL + 'album.html',
        'jadwal': BASE_URL + 'jadwal.html',
        'anggota': BASE_URL + 'anggota.html'
    };
    return urls[type] || BASE_URL;
}

function generateMemberQR() {
    const select = document.getElementById('memberSelect');
    const memberId = select.value;
    
    if (!memberId) {
        generateQR(BASE_URL + 'anggota.html');
        return;
    }
    
    const member = membersList.find(m => m.id == memberId);
    if (member) {
        const memberURL = `${BASE_URL}anggota.html?absen=${member.noAbsen}`;
        generateQR(memberURL);
    }
}

function generateQR(text) {
    // Clear previous QR
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    
    // Generate new QR
    currentQR = new QRCode(qrContainer, {
        text: text,
        width: 250,
        height: 250,
        colorDark: "#4f46e5",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function downloadQR() {
    const qrCanvas = document.querySelector('#qrcode canvas');
    if (!qrCanvas) {
        alert('QR Code belum siap!');
        return;
    }
    
    const link = document.createElement('a');
    let filename = 'qr_';
    
    switch(currentQRType) {
        case 'website': filename += 'website_dkv3'; break;
        case 'album': filename += 'album_dkv3'; break;
        case 'jadwal': filename += 'jadwal_dkv3'; break;
        case 'anggota': filename += 'anggota_dkv3'; break;
        case 'member': 
            const select = document.getElementById('memberSelect');
            const member = membersList.find(m => m.id == select.value);
            filename += member ? member.noAbsen + '_' + member.name : 'member';
            break;
        default: filename += 'dkv3';
    }
    
    link.download = filename + '.png';
    link.href = qrCanvas.toDataURL();
    link.click();
}

// Inisialisasi
setTimeout(() => {
    generateQR(getURLForType('website'));
}, 100);