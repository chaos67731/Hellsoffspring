self.addEventListener('fetch', function(event) {

});

document.addEventListener('touchstart', onTouchStart, {passive: true});

// self.addEventListener('install', function(e) {
//   e.waitUntil(
//     caches.open('the-magic-cache').then(function(cache) {
//       return cache.addAll([
//       	// Pages
//         '/',
//         '/#Dragon',
//         '/#Golem',
//         '/#Cthulhu',
//         // Other
//         '/manifest.json',
// 		// Style
//         '/resources/css/bootstrap.css',
//         '/resources/css/chosen.min.css',
//         '/resources/css/site.css',
// 		// JS
//         '/resources/js/jquery.js',
//         '/pages.js',
//         '/resources/js/chosen.jquery.min.js',
//         '/resources/js/site.js',
// 		// Images
//         '/img/site/background-2.jpg',
//         '/logo.png',
//       ]);
//     })
//   );
// });