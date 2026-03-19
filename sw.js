// ECOSEM V.6 — Service Worker Optimizado
const CACHE_NAME = 'ecosem-v7-cache-v1';
const RUNTIME_CACHE = 'ecosem-v7-runtime-v1';

const ASSETS_TO_CACHE = [
  './', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './firebase_setup.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)).then(() => self.skipWaiting()).catch(err => console.error('[SW] Error en install:', err)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(names.filter(n => n !== CACHE_NAME && n !== RUNTIME_CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET') return;
  if (url.origin.includes('firebaseapp.com') || url.origin.includes('googleapis.com')) return;

  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(fetch(request).then(r => { caches.open(RUNTIME_CACHE).then(c => c.put(request, r.clone())); return r; }).catch(() => caches.match(request).then(c => c || caches.match('./index.html'))));
    return;
  }

  event.respondWith(caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(r => {
      if (!r || r.status !== 200 || r.type === 'error') return r;
      caches.open(RUNTIME_CACHE).then(c => c.put(request, r.clone()));
      return r;
    }).catch(() => new Response('Offline', { status: 503, statusText: 'Service Unavailable', headers: new Headers({'Content-Type':'text/plain'}) }));
  }));
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CLEAR_CACHE') event.waitUntil(caches.keys().then(names => Promise.all(names.map(n => caches.delete(n)))));
});
