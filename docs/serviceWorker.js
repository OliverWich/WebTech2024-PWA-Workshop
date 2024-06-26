console.log("Bleep Bloop 🤖 - hier spricht der ServiceWorker 🛠️");

// Wenn diese Version des ServiceWorkers geändert wird, werden alte Caches gelöscht und die neuen Dateien gecached.
const cacheVersion = 1;
const staticCache = "static-cache-v" + cacheVersion;

const staticFilesToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./serviceWorker.js",
];

self.addEventListener("install", event => {
    console.log("Der ServiceWorker wird installiert 🛠️");

    // Statische Dateien in den statischen Cache cachen.
    // Das passiert asynchron, deshalb wird event.waitUntil() genutzt.
    // Hinweis: Es können mehrere caches genutzt werden, z.B. einer für statische Dateien, ein anderer für Assets oder JS Dateien. Dadurch können verschiedene Resourcen-Kategorien getrennt voneinander gecached und bei Bedarf aus dem Cache geworfen werden.
    event.waitUntil(
        caches.open(staticCache).then(cache => {
            return cache.addAll(staticFilesToCache);
        })
    )
});

self.addEventListener("activate", event => {
    console.log("Der ServiceWorker wird aktiviert 🚀");

    // Hier werden alte Caches gelöscht, wenn sich die Version des Caches geändert hat.
    // Vorsicht: Wenn man mehrere Caches nutzt, muss sichergestellt werden, dass auch wirklich nur die alten Caches gelöscht werden!
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== staticCache) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    )
});
