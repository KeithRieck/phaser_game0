const CACHE_NAME = "cache_game_0"; // Change value to force update

const URLS_TO_CACHE = [
    "/",
    "bundle.min.js",
    "bundle.min.js.map",
    "favicon.png",
    "icon_128x128.png",
    "index.html",
    "LICENSE",
    "site.webmanifest",
    "apple-touch-icon.png",
    "style.css",
    "assets/bomb.png",
    "assets/dude.png",
    "assets/platform.png",
    "assets/sky.png",
    "assets/star.png",

];

// Install event: Cache assets
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Opened cache');
          return cache.addAll(URLS_TO_CACHE);
        })
    );
  });

// Fetch event: Serve from cache or network
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Cache hit - return response
          if (response) {
            return response;
          }
          // Not in cache - fetch from network
          return fetch(event.request);
        }
      )
    );
  });
  
  // Activate event: Clean up old caches
  self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
