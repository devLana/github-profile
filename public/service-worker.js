const cacheName = "cache-v1.0";
const staticFiles = [
  "index.html",
  "https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&family=Montserrat:wght@400;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css",
];

const self = this;

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(staticFiles);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) return res;

      return fetch(e.request).then(response => {
        if (response.status !== 200) return;

        const responseToCache = response.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("activate", e => {
  const cacheNames = [cacheName];

  e.waitUntil(
    caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (!cacheNames.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
