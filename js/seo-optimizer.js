// SEO Optimizer - Optimasi untuk Google

class SEOOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Set default meta tags jika belum ada
        this.setDefaultMeta();
        
        // Update canonical URL
        this.setCanonicalURL();
        
        // Add structured data
        this.addStructuredData();
        
        // Optimasi gambar (add loading lazy)
        this.optimizeImages();
        
        console.log('✅ SEO Optimizer initialized');
    }
    
    setDefaultMeta() {
        // Meta description
        if (!document.querySelector('meta[name="description"]')) {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Website resmi kelas 10 DKV 3 - Desain Komunikasi Visual SMK Negeri 1 Jakarta. Informasi anggota, jadwal, album, dan kegiatan kelas.';
            document.head.appendChild(meta);
        }
        
        // Meta keywords
        if (!document.querySelector('meta[name="keywords"]')) {
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = 'DKV, Desain Komunikasi Visual, SMK, Kelas 10 DKV 3, Website Kelas, Desain Grafis, Multimedia';
            document.head.appendChild(meta);
        }
        
        // Meta author
        if (!document.querySelector('meta[name="author"]')) {
            const meta = document.createElement('meta');
            meta.name = 'author';
            meta.content = 'Kelas 10 DKV 3';
            document.head.appendChild(meta);
        }
        
        // Open Graph (Facebook/WhatsApp)
        if (!document.querySelector('meta[property="og:title"]')) {
            const ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            ogTitle.content = document.title;
            document.head.appendChild(ogTitle);
        }
        
        if (!document.querySelector('meta[property="og:description"]')) {
            const ogDesc = document.createElement('meta');
            ogDesc.setAttribute('property', 'og:description');
            ogDesc.content = 'Website resmi kelas 10 DKV 3';
            document.head.appendChild(ogDesc);
        }
        
        if (!document.querySelector('meta[property="og:type"]')) {
            const ogType = document.createElement('meta');
            ogType.setAttribute('property', 'og:type');
            ogType.content = 'website';
            document.head.appendChild(ogType);
        }
        
        // Twitter Card
        if (!document.querySelector('meta[name="twitter:card"]')) {
            const twitterCard = document.createElement('meta');
            twitterCard.name = 'twitter:card';
            twitterCard.content = 'summary_large_image';
            document.head.appendChild(twitterCard);
        }
        
        // Viewport (sudah ada)
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewport);
        }
        
        // Robots
        if (!document.querySelector('meta[name="robots"]')) {
            const robots = document.createElement('meta');
            robots.name = 'robots';
            robots.content = 'index, follow';
            document.head.appendChild(robots);
        }
    }
    
    setCanonicalURL() {
        if (!document.querySelector('link[rel="canonical"]')) {
            const canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = window.location.href.split('?')[0];
            document.head.appendChild(canonical);
        }
    }
    
    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Kelas 10 DKV 3",
            "description": "Website resmi kelas 10 DKV 3 - Desain Komunikasi Visual",
            "url": window.location.origin,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jakarta",
                "addressCountry": "Indonesia"
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
    
    optimizeImages() {
        // Tambahkan loading="lazy" ke semua gambar
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });
        
        // Tambahkan alt jika kosong
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.alt = 'Gambar - 10 DKV 3';
        });
    }
    
    // Update judul halaman
    setPageTitle(title) {
        document.title = `${title} | 10 DKV 3`;
        
        // Update og:title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = document.title;
    }
    
    // Track page view untuk analytics
    trackPageView(pageName) {
        let stats = JSON.parse(localStorage.getItem('page_views') || '{}');
        const today = new Date().toDateString();
        
        if (!stats[today]) {
            stats[today] = {};
        }
        
        if (!stats[today][pageName]) {
            stats[today][pageName] = 0;
        }
        
        stats[today][pageName]++;
        localStorage.setItem('page_views', JSON.stringify(stats));
    }
    
    getPageViews() {
        return JSON.parse(localStorage.getItem('page_views') || '{}');
    }
}

const seo = new SEOOptimizer();

// Track page view saat halaman dimuat
seo.trackPageView(window.location.pathname.split('/').pop() || 'index.html');

window.seo = seo;