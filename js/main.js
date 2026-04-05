// ============================================
// MAIN.JS - Website Kelas 10 DKV 3
// Fitur: Preloader, Typing Animation, 
// Back to Top Smooth, Navbar Hide/Show on Scroll,
// Mobile Menu, dll
// ============================================

// ========== 1. PRELOADER ==========
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ========== 2. TYPING ANIMATION ==========
const texts = ["10 DKV 3", "Generasi Kreatif", "Desain Grafis", "Multimedia", "Kreatif & Inovatif"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    if (!typingElement) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

if (typingElement) {
    typeEffect();
}

// ========== 3. NAVBAR HIDE/SHOW ON SCROLL ==========
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
let navbarHeight = navbar ? navbar.offsetHeight : 70;
let isNavbarHidden = false;

window.addEventListener('scroll', function() {
    if (!navbar) return;
    
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Jangan sembunyikan navbar di bagian paling atas
    if (currentScroll <= 50) {
        navbar.classList.remove('hidden');
        navbar.classList.remove('scrolled');
        isNavbarHidden = false;
        return;
    }
    
    // Scroll ke bawah - sembunyikan navbar
    if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
        if (!isNavbarHidden) {
            navbar.classList.add('hidden');
            isNavbarHidden = true;
        }
    } 
    // Scroll ke atas - tampilkan navbar
    else if (currentScroll < lastScrollTop) {
        if (isNavbarHidden) {
            navbar.classList.remove('hidden');
            isNavbarHidden = false;
        }
        // Tambah class scrolled saat scroll ke bawah sedikit
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ========== 4. BACK TO TOP BUTTON (SMOOTH) ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== 5. NAVBAR SCROLL EFFECT (Background change) ==========
window.addEventListener('scroll', function() {
    if (navbar) {
        if (window.scrollY > 50 && !isNavbarHidden) {
            navbar.classList.add('scrolled');
        } else if (window.scrollY <= 50) {
            navbar.classList.remove('scrolled');
        }
    }
});

// ========== 6. MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Ubah icon hamburger menjadi X saat aktif
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans.forEach(span => span.style.backgroundColor = '#4f46e5');
        } else {
            spans.forEach(span => span.style.backgroundColor = '#1e293b');
        }
    });
}

// ========== 7. CLOSE MENU SAAT KLIK LINK ==========
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.style.backgroundColor = '#1e293b');
        }
    });
});

// ========== 8. SMOOTH SCROLL UNTUK ANCHOR LINK ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== 9. SET CURRENT YEAR DI FOOTER ==========
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// ========== 10. UPDATE STATS & CHART (jika ada) ==========
function updateStatsAndChart() {
    if (typeof storage !== 'undefined') {
        const members = storage.getMembers();
        const photos = storage.getPhotos();
        
        const totalMembers = document.getElementById('totalMembers');
        const totalPhotos = document.getElementById('totalPhotos');
        
        if (totalMembers) totalMembers.textContent = members.length;
        if (totalPhotos) totalPhotos.textContent = photos.length;
        
        // Update chart jika ada
        const maleCount = members.filter(m => m.gender === 'Laki-laki').length;
        const femaleCount = members.filter(m => m.gender === 'Perempuan').length;
        
        const ctx = document.getElementById('genderChart')?.getContext('2d');
        
        if (ctx && typeof Chart !== 'undefined') {
            if (window.genderChart) {
                window.genderChart.data.datasets[0].data = [maleCount, femaleCount];
                window.genderChart.update();
            } else {
                window.genderChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Laki-laki', 'Perempuan'],
                        datasets: [{
                            data: [maleCount, femaleCount],
                            backgroundColor: ['#4f46e5', '#ec489a'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { font: { size: 14 }, padding: 15 }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const label = context.label || '';
                                        const value = context.raw || 0;
                                        const total = maleCount + femaleCount;
                                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                        return `${label}: ${value} orang (${percentage}%)`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }
}

// ========== 11. LOAD ANNOUNCEMENT ==========
function loadAnnouncement() {
    if (typeof storage !== 'undefined') {
        const settings = storage.getSettings();
        const announcementEl = document.getElementById('latestAnnouncement');
        if (announcementEl && settings.announcement) {
            announcementEl.textContent = settings.announcement;
        }
    }
}

// Jalankan update jika storage tersedia
if (typeof storage !== 'undefined') {
    setTimeout(() => {
        updateStatsAndChart();
        loadAnnouncement();
    }, 500);
}

// ========== 12. TAMBAHKAN CSS UNTUK NAVBAR HIDDEN ==========
const style = document.createElement('style');
style.textContent = `
    /* Navbar Hide/Show on Scroll */
    .navbar {
        transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    }
    
    .navbar.hidden {
        transform: translateY(-100%);
    }
    
    .navbar.scrolled {
        background: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        padding: 8px 0;
    }
    
    /* Pastikan konten tidak tertutup navbar saat navbar hilang */
    body {
        padding-top: 70px;
    }
    
    @media (max-width: 768px) {
        body {
            padding-top: 60px;
        }
    }
`;
document.head.appendChild(style);

// ========== 13. RESET PADDING BODY SAAT LOAD ==========
function resetBodyPadding() {
    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    document.body.style.paddingTop = navbarHeight + 'px';
}

window.addEventListener('load', resetBodyPadding);
window.addEventListener('resize', resetBodyPadding);

console.log('✅ main.js loaded - Navbar hide/show on scroll active');