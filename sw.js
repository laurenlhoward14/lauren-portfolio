importScripts('scripts/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('jack-bio-site').then(function(cache) {
     return cache.addAll([
			 './',
			'styles/styles.css',
			'images/bio-175.png',
			'favicon.ico',
			'manifest.json',
			'images/bio-192.png',
			'images/bio-512.png'
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