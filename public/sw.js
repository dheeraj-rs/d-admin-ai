const CACHE_NAME = 'd-admin-ai-v1';
const STATIC_ASSETS = [
    '/',
    '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          return Promise.all(
            STATIC_ASSETS.map(url => {
              return fetch(url).then(response => {
                if (response.ok) return cache.put(url, response);
                return Promise.resolve();
              }).catch(() => {});
            })
          );
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then(
            (cached) => cached || fetch(event.request)
        )
    );
});
