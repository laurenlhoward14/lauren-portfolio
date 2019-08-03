importScripts('scripts/cache-polyfill.js');
const LATEST_VERSION = 'cache20190803'
const CACHED_URLS = [
  './',
  'styles/styles.css',
  'images/bio-175.png',
  'images/bio-175.webp',
  'favicon.ico',
  'images/bio-192.png',
  'manifest.json',
  'images/outline-chat_bubble_outline-24px.svg'
]

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(LATEST_VERSION).then(function (cache) {
      return cache.addAll(CACHED_URLS);
    }).then(function (e) {
      if (navigator.onLine) {
        return self.skipWaiting();
      }
    })
  )
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (LATEST_VERSION !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});