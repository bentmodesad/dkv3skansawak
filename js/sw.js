const CACHE_NAME = 'dkv3-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/anggota.html',
  '/album.html',
  '/jadwal.html',
  '/login.html',
  '/admin.html',
  '/chat.html',
  '/forum.html',
  '/css/style.css',
  '/js/main.js',
  '/js/storage.js',
  '/js/auth.js',
  '/js/chat.js',
  '/js/forum.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
});