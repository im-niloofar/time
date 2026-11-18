/* Mohan Time service worker: offline-first app shell */
const V = 'mohan-time-v1';
const CORE = [
  './', 'index.html', 'manifest.webmanifest',
  'fonts/Vazirmatn.woff2', 'fonts/Nunito.woff2',
  'icons/icon-192.png', 'icons/icon-512.png',
  'icons/icon-maskable-192.png', 'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png', 'icons/favicon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  // Only handle same-origin GETs; Google Apps Script / AI API calls pass straight through.
  if (req.method !== 'GET' || url.origin !== location.origin) return;

  const isPage = req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/');
  if (isPage) {
    // network-first so updates arrive, fall back to cache when offline
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(V).then(c => c.put('index.html', copy));
        return res;
      }).catch(() => caches.match('index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
