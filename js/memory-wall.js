// Memory Wall - Dinding Kenangan

let memories = [];

function loadMemories() {
    const saved = localStorage.getItem('memory_wall');
    if (saved) {
        memories = JSON.parse(saved);
    } else {
        // Data default
        memories = [
            {
                id: 1,
                title: "MPLS 2024",
                message: "Momen pertama kita kenalan saat MPLS. Seru banget!",
                author: "Ahmad Fauzi",
                image: "https://placehold.co/600x400/4f46e5/white?text=MPLS+2024",
                date: new Date().toISOString(),
                likes: 5
            },
            {
                id: 2,
                title: "Study Tour ke Museum",
                message: "Belajar sambil jalan-jalan bersama teman-teman. Tak terlupakan!",
                author: "Siti Aisyah",
                image: "https://placehold.co/600x400/ec489a/white?text=Study+Tour",
                date: new Date().toISOString(),
                likes: 3
            }
        ];
        saveMemories();
    }
    renderMemories();
}

function saveMemories() {
    localStorage.setItem('memory_wall', JSON.stringify(memories));
}

function renderMemories() {
    const container = document.getElementById('memoryGrid');
    if (!container) return;
    
    if (memories.length === 0) {
        container.innerHTML = '<div class="loading"><i class="fas fa-heart"></i><p>Belum ada kenangan. Jadilah yang pertama!</p></div>';
        return;
    }
    
    container.innerHTML = memories.map(memory => `
        <div class="memory-card">
            <img src="${memory.image}" class="memory-image" onerror="this.src='https://placehold.co/600x400/4f46e5/white?text=Memory'">
            <div class="memory-content">
                <h3 class="memory-title">${escapeHtml(memory.title)}</h3>
                <div class="memory-author">
                    <div class="memory-avatar">${memory.author.charAt(0).toUpperCase()}</div>
                    <div class="memory-name">${escapeHtml(memory.author)}</div>
                </div>
                <p class="memory-message">${escapeHtml(memory.message)}</p>
                <div class="memory-date"><i class="fas fa-calendar-alt"></i> ${new Date(memory.date).toLocaleDateString('id-ID')}</div>
                <div class="memory-likes" onclick="likeMemory(${memory.id})">
                    <i class="fas ${memory.liked ? 'fa-heart' : 'fa-heart'}"></i>
                    <span>${memory.likes || 0} suka</span>
                </div>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function likeMemory(id) {
    const memory = memories.find(m => m.id === id);
    if (memory) {
        memory.likes = (memory.likes || 0) + 1;
        saveMemories();
        renderMemories();
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

document.getElementById('addMemoryBtn')?.addEventListener('click', async () => {
    const title = document.getElementById('memoryTitle').value.trim();
    const message = document.getElementById('memoryMessage').value.trim();
    const author = document.getElementById('memoryAuthor').value.trim();
    const imageFile = document.getElementById('memoryImage').files[0];
    
    if (!title || !message || !author) {
        alert('Semua field harus diisi!');
        return;
    }
    
    let image = 'https://placehold.co/600x400/4f46e5/white?text=Memory';
    if (imageFile) {
        image = await fileToBase64(imageFile);
    }
    
    const newMemory = {
        id: Date.now(),
        title: title,
        message: message,
        author: author,
        image: image,
        date: new Date().toISOString(),
        likes: 0
    };
    
    memories.unshift(newMemory);
    saveMemories();
    renderMemories();
    
    document.getElementById('memoryTitle').value = '';
    document.getElementById('memoryMessage').value = '';
    document.getElementById('memoryAuthor').value = '';
    document.getElementById('memoryImage').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    
    alert('Kenangan berhasil ditambahkan!');
});

document.getElementById('memoryImage')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            preview.innerHTML = `<img src="${event.target.result}" style="max-width: 150px; border-radius: 8px;">`;
        };
        reader.readAsDataURL(file);
    }
});

loadMemories();