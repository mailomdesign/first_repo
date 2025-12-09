const VERSION = 'v1';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;

const ASSETS = [
  '/first_repo/',
  '/first_repo/index.php',
  '/first_repo/offline.html',
  '/first_repo/css/style.css',
  '/first_repo/css/responsive.css',
  '/first_repo/js/script.js',
  '/first_repo/icons/icon-192.png',
  '/first_repo/icons/icon-512.png',
  '/first_repo/icons/maskable-512.png'
  ];
 

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(ASSETS))
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
  if (ASSETS.includes(url.pathname) || req.destination === 'image' || req.destination === 'font') {
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
