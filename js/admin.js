requireAuth();

const usernameDisplay = document.getElementById('usernameDisplay');
if (usernameDisplay) { const user = getCurrentUser(); if (user) usernameDisplay.textContent = user.username; }

function showAlert(msg, type) {
    const alertDiv = document.getElementById('alertMessage');
    if (alertDiv) { alertDiv.textContent = msg; alertDiv.className = `alert ${type}`; setTimeout(() => { alertDiv.className = 'alert'; }, 3000); }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function renderMembersTable() {
    const members = storage.getMembers();
    const tbody = document.getElementById('membersTableBody');
    if (!tbody) return;
    if (members.length === 0) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center">Belum ada anggota</td></tr>'; return; }
    tbody.innerHTML = members.map((m, i) => `
        <tr>
            <td>${i+1}</td><td><img src="${m.photo}" class="preview-image" onerror="this.src='https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${m.name}'"></td>
            <td>${m.name}</td><td><strong>${m.noAbsen}</strong></td><td>${m.gender}</td><td>${m.role}</td>
            <td><button class="btn-edit" onclick="editMember('${m.id}')"><i class="fas fa-edit"></i> Edit</button><button class="btn-danger" onclick="deleteMember('${m.id}')"><i class="fas fa-trash"></i> Hapus</button></td>
        </tr>
    `).join('');
}

document.getElementById('addMemberForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('memberName').value.trim();
    const noAbsen = document.getElementById('memberAbsen').value.trim().padStart(2, '0');
    const gender = document.getElementById('memberGender').value;
    const role = document.getElementById('memberRole').value;
    const photoFile = document.getElementById('memberPhotoFile').files[0];
    const photoUrl = document.getElementById('memberPhotoUrl').value.trim();
    
    if (!name) return showAlert('Nama harus diisi!', 'error');
    if (!noAbsen) return showAlert('No Absen harus diisi!', 'error');
    if (storage.getMemberByNoAbsen(noAbsen)) return showAlert(`No Absen ${noAbsen} sudah digunakan!`, 'error');
    
    let photo = photoUrl;
    if (photoFile) photo = await fileToBase64(photoFile);
    else if (!photo) photo = `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(name)}`;
    
    storage.addMember({ noAbsen, name, gender, role, photo });
    renderMembersTable();
    showAlert(`Anggota ${name} berhasil ditambahkan!`, 'success');
    document.getElementById('addMemberForm').reset();
});

window.deleteMember = function(id) {
    if (confirm('Yakin hapus anggota ini?')) {
        storage.deleteMember(id);
        renderMembersTable();
        showAlert('Anggota dihapus!', 'success');
    }
};

window.editMember = function(id) {
    const member = storage.getMembers().find(m => m.id === id);
    if (!member) return;
    const newName = prompt('Edit Nama:', member.name);
    const newRole = prompt('Edit Jabatan:', member.role);
    const newNoAbsen = prompt('Edit No Absen:', member.noAbsen);
    if (newName && newRole && newNoAbsen) {
        const formattedNo = newNoAbsen.padStart(2, '0');
        const existing = storage.getMemberByNoAbsen(formattedNo);
        if (existing && existing.id !== id) return showAlert(`No Absen ${formattedNo} sudah digunakan!`, 'error');
        storage.updateMember(id, { name: newName, role: newRole, noAbsen: formattedNo });
        renderMembersTable();
        showAlert('Anggota diupdate!', 'success');
    }
};

function renderPhotosTable() {
    const photos = storage.getPhotos();
    const tbody = document.getElementById('photosTableBody');
    if (!tbody) return;
    if (photos.length === 0) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">Belum ada foto</td></tr>'; return; }
    tbody.innerHTML = photos.map(p => `
        <tr>
            <td><img src="${p.image}" class="preview-image"></td><td>${p.title}</td>
            <td>${p.category === 'academic' ? 'Akademik' : p.category === 'event' ? 'Kegiatan' : 'Kebersamaan'}</td>
            <td>${new Date(p.date).toLocaleDateString('id-ID')}</td>
            <td><button class="btn-danger" onclick="deletePhoto('${p.id}')"><i class="fas fa-trash"></i> Hapus</button></td>
        </tr>
    `).join('');
}

document.getElementById('photoFile')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById('photoPreview');
    if (file && preview) {
        const reader = new FileReader();
        reader.onload = (event) => { preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`; };
        reader.readAsDataURL(file);
    }
});

document.getElementById('uploadPhotoForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('photoTitle').value.trim();
    const category = document.getElementById('photoCategory').value;
    const description = document.getElementById('photoDescription').value.trim();
    const photoFile = document.getElementById('photoFile').files[0];
    if (!title) return showAlert('Judul harus diisi!', 'error');
    if (!photoFile) return showAlert('Pilih foto!', 'error');
    const image = await fileToBase64(photoFile);
    storage.addPhoto({ title, category, description, image });
    renderPhotosTable();
    showAlert('Foto berhasil diupload!', 'success');
    document.getElementById('uploadPhotoForm').reset();
    document.getElementById('photoPreview').innerHTML = '';
});

window.deletePhoto = function(id) {
    if (confirm('Yakin hapus foto ini?')) {
        storage.deletePhoto(id);
        renderPhotosTable();
        showAlert('Foto dihapus!', 'success');
    }
};

function loadSettings() {
    const s = storage.getSettings();
    document.getElementById('websiteAnnouncement').value = s.announcement || '';
    document.getElementById('className').value = s.className || '10 DKV 3';
    document.getElementById('schoolName').value = s.schoolName || 'SMK Negeri 1 Jakarta';
}

document.getElementById('settingsForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    storage.updateSettings({
        announcement: document.getElementById('websiteAnnouncement').value,
        className: document.getElementById('className').value,
        schoolName: document.getElementById('schoolName').value
    });
    showAlert('Pengaturan disimpan!', 'success');
    const annEl = document.getElementById('latestAnnouncement');
    if (annEl) annEl.textContent = document.getElementById('websiteAnnouncement').value;
});

document.getElementById('backupData')?.addEventListener('click', () => {
    const data = { members: storage.getMembers(), photos: storage.getPhotos(), settings: storage.getSettings() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dkv3_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showAlert('Backup berhasil!', 'success');
});

window.confirmReset = function() {
    if (confirm('Hapus SEMUA data? Yakin?')) {
        storage.resetAll();
        renderMembersTable();
        renderPhotosTable();
        loadSettings();
        showAlert('Data direset!', 'success');
    }
};

document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        if (tabId === 'members') { document.getElementById('membersSection').classList.add('active'); renderMembersTable(); }
        else if (tabId === 'photos') { document.getElementById('photosSection').classList.add('active'); renderPhotosTable(); }
        else if (tabId === 'settings') { document.getElementById('settingsSection').classList.add('active'); loadSettings(); }
    });
});

renderMembersTable();
renderPhotosTable();
loadSettings();