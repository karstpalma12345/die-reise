// Service worker van Die Reise: de app werkt offline na het eerste bezoek.
// Verhoog VERSION bij elke nieuwe versie, dan merkt de app dat er een update is.
const VERSION = 'die-reise-3.2.0';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  // Niet automatisch overnemen: de gebruiker kiest zelf wanneer te vernieuwen (zodat een lopende sessie niet breekt).
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  if (d.type === 'CACHE_URLS') e.waitUntil(caches.open(VERSION).then((c) => Promise.all((d.urls || []).map((u) => fetch(u).then((r) => { if (r.ok) return c.put(u, r); }).catch(() => {})))));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') { // pagina: eerst netwerk (nieuwste versie), anders de bewaarde pagina
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html').then((r) => r || caches.match('./'))));
    return;
  }
  const hashed = url.pathname.includes('/assets/'); // bestanden met hash in de naam veranderen nooit: direct uit het geheugen
  e.respondWith(caches.match(req).then((cached) => {
    if (cached && hashed) return cached;
    const net = fetch(req).then((r) => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return r; });
    if (cached) { net.catch(() => {}); return cached; }
    return net;
  }));
});
