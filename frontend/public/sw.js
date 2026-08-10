/* Installability runtime only: no fetch handler means no offline cache or deadline data. */
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
