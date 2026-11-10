// Registreert de service worker en meldt wanneer er een nieuwe versie klaarstaat.
export function registerSW(onUpdate: (w: ServiceWorker) => void): void {
  if (!('serviceWorker' in navigator) || location.hostname === 'localhost') return;
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    if (reg.waiting && navigator.serviceWorker.controller) onUpdate(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const w = reg.installing;
      w?.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) onUpdate(w); });
    });
    // Na het eerste bezoek: alle bestanden die de pagina al gebruikt ook bewaren, zodat offline openen direct werkt.
    navigator.serviceWorker.ready.then((r) => {
      const urls = [new URL('./index.html', location.href).href, ...performance.getEntriesByType('resource').map((e) => e.name)].filter((u) => u.startsWith(location.origin));
      r.active?.postMessage({ type: 'CACHE_URLS', urls });
    });
  }).catch(() => { /* zonder service worker werkt de app gewoon online */ });
}
export function applyUpdate(w: ServiceWorker): void {
  navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), { once: true });
  w.postMessage({ type: 'SKIP_WAITING' });
}
