// ============================================
// ALBUM PAGE - 10 DKV 3
// Membaca data dari storage yang SAMA dengan admin
// ============================================

let allPhotos = [];
let currentCategory = 'all';

// Fungsi untuk memuat foto dari storage (SAMA dengan admin)
function loadPhotosFromStorage() {
    try {
        if (typeof storage === 'undefined') {
            console.error('Storage not loaded!');
            return [];
        }
        let photos = storage.getPhotos();
        console.log('Photos loaded from storage:', photos.length);
        return photos;
    } catch (error) {
        console.error('Error loading photos:', error);
        return [];
    }
}

// Render album
function renderAlbums(albums) {
    const grid = document.getElementById('albumGrid');
    if (!grid) return;
    
    if (!albums || albums.length === 0) {
        grid.innerHTML = `
            <div class="empty-album" style="text-align:center; padding:60px; grid-column:1/-1;">
                <i class="fas fa-images" style="font-size: 60px; color: #cbd5e1;"></i>
                <p style="margin-top: 20px; color: #64748b;">Belum ada foto</p>
                <p style="font-size: 0.8rem; margin-top: 10px;">Silakan upload foto di halaman admin</p>
                <a href="login.html" style="display: inline-block; margin-top: 20px; padding: 10px 25px; background: #4f46e5; color: white; border-radius: 50px; text-decoration: none;">Login Admin</a>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = albums.map(album => `
        <div class="album-card" data-id="${album.id}">
            <img src="${album.image}" alt="${album.title}" 
                 onerror="this.src='https://placehold.co/600x400/4f46e5/white?text=${encodeURIComponent(album.title)}'">
            <div class="album-overlay">
                <h3>${album.title}</h3>
                <p><i class="fas fa-calendar-alt"></i> ${new Date(album.date).toLocaleDateString('id-ID')}</p>
                ${album.description ? `<p><i class="fas fa-info-circle"></i> ${album.description.substring(0, 50)}</p>` : ''}
            </div>
        </div>
    `).join('');
    
    // Event listener untuk buka lightbox
    document.querySelectorAll('.album-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const album = albums.find(a => a.id == id);
            if (album) openLightbox(album.image, album.title, album.description);
        });
    });
}

// Lightbox functions
function openLightbox(src, title, description) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    
    if (modal && img) {
        img.src = src;
        img.onerror = function() {
            this.src = 'https://placehold.co/800x600/4f46e5/white?text=Image+Not+Found';
        };
        if (caption) caption.innerHTML = `<strong>${title}</strong><br>${description || ''}`;
        modal.classList.add('active');
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.remove('active');
}

// Event listeners lightbox
document.querySelector('.close-lightbox')?.addEventListener('click', closeLightbox);
document.getElementById('lightboxModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightboxModal')) closeLightbox();
});

// Filter kategori
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        let filtered = loadPhotosFromStorage();
        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }
        
        renderAlbums(filtered);
    });
});

// Inisialisasi
function initAlbum() {
    console.log('Initializing album page...');
    
    const grid = document.getElementById('albumGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="loading-album" style="text-align:center; padding:60px; grid-column:1/-1;">
                <div style="width:50px; height:50px; border:3px solid #e2e8f0; border-top-color:#4f46e5; border-radius:50%; animation: spin 1s linear infinite; margin:0 auto 20px;"></div>
                <p>Memuat album...</p>
            </div>
        `;
    }
    
    setTimeout(() => {
        const photos = loadPhotosFromStorage();
        renderAlbums(photos);
        console.log('Rendered', photos.length, 'photos');
    }, 500);
}

// Jalankan saat halaman siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAlbum);
} else {
    initAlbum();
}

// Tambahkan style untuk animasi spin
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);