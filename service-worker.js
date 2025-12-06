const VERSION = 'v1';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.php',
  '/css/style.css',
  '/css/responsive.css',
  '/js/script.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
  // + добавьте все критичные ресурсы (шрифты, основные картинки)
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => ![STATIC_CACHE, RUNTIME_CACHE].includes(k)).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first для статических ресурсов, network-first для навигации/API
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // навигация: network-first -> fallback to cache -> offline page
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        // optionally put into cache
        return res;
      }).catch(() =>
        caches.match('/offline.html')
      )
    );
    return;
  }

  // для статических ассетов — cache-first
  if (STATIC_ASSETS.includes(url.pathname) || req.destination === 'image' || req.destination === 'font') {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        return caches.open(RUNTIME_CACHE).then(cache => {
          cache.put(req, res.clone());
          return res;
        });
      }))
    );
    return;
  }

  // по умолчанию — network-first for API
  event.respondWith(
    fetch(req).then(res => {
      return caches.open(RUNTIME_CACHE).then(cache => {
        cache.put(req, res.clone());
        return res;
      });
    }).catch(() => caches.match(req))
  );
});
