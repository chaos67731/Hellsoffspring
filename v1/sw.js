const version = "0.6.9";
const cacheName = `hellsOffspring-${version}`;
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        // Site
        `/`,
        `/index.html?timestamp=${timeStamp}`,
        // Style
        `/resources/css/site.css?timestamp=${timeStamp}`,
        // Js
        `/resources/js/jquery.js?timestamp=${timeStamp}`,
        `/resources/js/plugins.js?timestamp=${timeStamp}`,
        `/pages.js?timestamp=${timeStamp}`,
        `/resources/js/site.js?timestamp=${timeStamp}`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});