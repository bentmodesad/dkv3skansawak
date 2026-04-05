// ============================================
// SUPABASE CLIENT - Database Cloud
// Ganti dengan URL dan KEY Anda
// ============================================

// GANTI DENGAN DATA SUPABASE ANDA!!!
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxx';

// Inisialisasi Supabase
let supabaseClient = null;

async function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase library not loaded');
        return false;
    }
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase connected');
    return true;
}

// ========== MEMBERS CRUD ==========
async function getMembers() {
    if (!supabaseClient) return [];
    const { data, error } = await supabaseClient
        .from('members')
        .select('*')
        .order('no_absen', { ascending: true });
    if (error) {
        console.error('Error get members:', error);
        return [];
    }
    return data;
}

async function addMember(member) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('members')
        .insert([{
            no_absen: member.noAbsen,
            name: member.name,
            gender: member.gender,
            role: member.role,
            photo: member.photo,
            nim: member.nim,
            created_at: new Date().toISOString()
        }])
        .select();
    if (error) {
        console.error('Error add member:', error);
        return null;
    }
    return data[0];
}

async function updateMember(id, updates) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('members')
        .update(updates)
        .eq('id', id)
        .select();
    if (error) {
        console.error('Error update member:', error);
        return null;
    }
    return data[0];
}

async function deleteMember(id) {
    if (!supabaseClient) return false;
    const { error } = await supabaseClient
        .from('members')
        .delete()
        .eq('id', id);
    if (error) {
        console.error('Error delete member:', error);
        return false;
    }
    return true;
}

// ========== PHOTOS CRUD ==========
async function getPhotos() {
    if (!supabaseClient) return [];
    const { data, error } = await supabaseClient
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        console.error('Error get photos:', error);
        return [];
    }
    return data;
}

async function addPhoto(photo) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
        .from('photos')
        .insert([{
            title: photo.title,
            category: photo.category,
            description: photo.description,
            image_url: photo.image,
            created_at: new Date().toISOString()
        }])
        .select();
    if (error) {
        console.error('Error add photo:', error);
        return null;
    }
    
    // Kirim notifikasi WhatsApp
    await sendWhatsAppNotif(`📸 Foto baru: ${photo.title} telah diupload!`);
    
    return data[0];
}

async function deletePhoto(id) {
    if (!supabaseClient) return false;
    const { error } = await supabaseClient
        .from('photos')
        .delete()
        .eq('id', id);
    if (error) {
        console.error('Error delete photo:', error);
        return false;
    }
    return true;
}

// ========== NOTIFIKASI WHATSAPP ==========
async function sendWhatsAppNotif(message) {
    const FONNTE_API_KEY = 'GANTI_DENGAN_API_KEY_FONNTE_ANDA';
    const FONNTE_NUMBER = '6289517976358'; // Nomor admin
    
    try {
        const response = await fetch('https://api.fonnte.com/send', {
            method: 'POST',
            headers: {
                'Authorization': FONNTE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                target: FONNTE_NUMBER,
                message: `📢 *DKV 3 Notification*\n\n${message}\n\n_Website Kelas 10 DKV 3_`,
                countryCode: '62'
            })
        });
        const result = await response.json();
        console.log('WhatsApp notif sent:', result);
        return true;
    } catch (error) {
        console.error('Error sending WhatsApp:', error);
        return false;
    }
}

// ========== BACKUP OTOMATIS ==========
async function autoBackup() {
    const members = await getMembers();
    const photos = await getPhotos();
    
    const backupData = {
        members: members,
        photos: photos,
        backupDate: new Date().toISOString()
    };
    
    // Simpan ke localStorage sebagai backup
    localStorage.setItem('cloud_backup', JSON.stringify(backupData));
    
    // Kirim notifikasi
    await sendWhatsAppNotif(`💾 Backup otomatis berhasil! ${members.length} anggota, ${photos.length} foto.`);
    
    console.log('Auto backup completed');
}

// Jalankan auto backup setiap 24 jam
setInterval(() => {
    autoBackup();
}, 24 * 60 * 60 * 1000);

// Backup pertama saat load
setTimeout(() => {
    autoBackup();
}, 5000);