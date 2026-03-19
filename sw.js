// ECOSEM V.6 — Service Worker Optimizado (SIN ERROR DE CLONE)
const CACHE_NAME = 'ecosem-v7-cache-v2';
const RUNTIME_CACHE = 'ecosem-v7-runtime-v2';

const ASSETS_TO_CACHE = [
  './', 
  './index.html', 
  './manifest.json', 
  './firebase_setup.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
      .catch(err => console.error('[SW] Error en install:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(n => n !== CACHE_NAME && n !== RUNTIME_CACHE)
          .map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // No cachear Firebase ni Google APIs
  if (url.origin.includes('firebaseapp.com') || 
      url.origin.includes('googleapis.com') ||
      url.origin.includes('firestore.googleapis.com')) {
    return;
  }

  // Solo cachear peticiones GET
  if (request.method !== 'GET') return;

  // Para navegación (HTML)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // CLONAR antes de usar
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then(c => c.put(request, responseClone));
          return response;
        })
        .catch(() => 
          caches.match(request).then(c => c || caches.match('./index.html'))
        )
    );
    return;
  }

  // Para otros recursos (CSS, JS, imágenes)
  event.respondWith(
    caches.match(request)
      .then(cached => {
        if (cached) return cached;
        
        return fetch(request)
          .then(response => {
            // Verificar que la respuesta es válida antes de cachear
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            
            // CLONAR antes de guardar en caché
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(c => c.put(request, responseClone));
            return response;
          })
          .catch(() => new Response('Offline', { 
            status: 503, 
            statusText: 'Service Unavailable', 
            headers: new Headers({'Content-Type':'text/plain'}) 
          }));
      })
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))))
    );
  }
});
