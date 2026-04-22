const CACHE_NAME = "apex-cache-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/images/hero.webp",
  "/images/porsche.webp",
  "/images/ferrari.webp",
  "/images/lamborghini.webp"
];

// INSTALL → Cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// ACTIVATE → Clean old cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// FETCH → Serve from cache (Cache First)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
