importScripts('scripts/cache-polyfill.js');
const LATEST_VERSION = 'cache07142019'

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(LATEST_VERSION).then(function(cache) {
     return cache.addAll([
			 './',
			'styles/styles.css',
			'images/bio-175.png',
      'favicon.ico',
			'manifest.json',
			'images/bio-192.png',
			'images/outline-chat_bubble_outline-24px.svg'
			]);
   })
 );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);	
});

self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all( 
        cacheNames.filter(function(cacheName) {
					return cacheName != LATEST_VERSION;
        }
        ).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});