// ECOSEM V.7 — Service Worker Final (Sin errores)
const CACHE_NAME = 'ecosem-v7-final';
const RUNTIME_CACHE = 'ecosem-runtime-final';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE).catch(() => {}))
      .then(() => self.skipWaiting())
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

  // FILTRAR peticiones que NO se pueden cachear
  if (
    request.method !== 'GET' ||
    url.protocol === 'chrome-extension:' ||
    url.protocol === 'chrome:' ||
    url.protocol === 'about:' ||
    url.origin.includes('firebaseapp.com') ||
    url.origin.includes('googleapis.com') ||
    url.origin.includes('firestore.googleapis.com') ||
    url.origin.includes('gstatic.com')
  ) {
    return; // Dejar pasar sin cachear
  }

  // Solo cachear recursos del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cached => {
        if (cached) return cached;

        return fetch(request)
          .then(response => {
            // Verificar respuesta válida
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clonar ANTES de guardar
            const responseClone = response.clone();
            
            caches.open(RUNTIME_CACHE)
              .then(cache => cache.put(request, responseClone))
              .catch(() => {}); // Ignorar errores de caché

            return response;
          })
          .catch(() => {
            // Si falla, intentar desde caché o página offline
            return caches.match('./index.html')
              .then(fallback => fallback || new Response('Offline', {
                status: 503,
                statusText: 'Service Unavailable'
              }));
          });
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
