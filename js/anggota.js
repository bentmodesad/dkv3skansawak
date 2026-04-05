function renderMembers(filteredMembers) {
    const grid = document.getElementById('membersGrid');
    if (!grid) return;
    if (filteredMembers.length === 0) { grid.innerHTML = '<div style="text-align:center;padding:40px">Tidak ada anggota</div>'; return; }
    grid.innerHTML = filteredMembers.map(member => `
        <div class="member-card">
            <div class="member-badge">${member.noAbsen}</div>
            <img src="${member.photo}" class="member-image" onerror="this.src='https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${member.name}'">
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p class="member-absen"><i class="fas fa-hashtag"></i> No Absen: ${member.noAbsen}</p>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const stats = storage.getStats();
    const studentCount = document.getElementById('studentCount');
    const photoCount = document.getElementById('photoCount');
    if (studentCount) studentCount.textContent = stats.totalMembers;
    if (photoCount) photoCount.textContent = stats.totalPhotos;
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = storage.getMembers().filter(m => m.name.toLowerCase().includes(term) || m.noAbsen.includes(term));
        renderMembers(filtered);
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (searchInput) searchInput.value = '';
        let filtered = storage.getMembers();
        if (filter === 'Laki-laki') filtered = filtered.filter(m => m.gender === 'Laki-laki');
        else if (filter === 'Perempuan') filtered = filtered.filter(m => m.gender === 'Perempuan');
        else if (filter === 'pengurus') filtered = filtered.filter(m => m.role !== 'Anggota');
        renderMembers(filtered);
    });
});

renderMembers(storage.getMembers());
updateStats();