// IndexedDB layer. All stores for later phases are created now (version 1),
// so later updates do not need to change the structure.
// Future changes: add a new `if (old < 2) {...}` block in upgrade(); never delete old stores.
const NAME = 'die-reise';
const VERSION = 1;
export const STORES = ['kv', 'vocab', 'mistakes', 'lessons', 'reviews'] as const;
export type StoreName = (typeof STORES)[number];

let dbPromise: Promise<IDBDatabase> | null = null;
function open(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(NAME, VERSION);
      req.onupgradeneeded = (e) => {
        const db = req.result;
        const old = e.oldVersion;
        if (old < 1) for (const s of STORES) db.createObjectStore(s);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}
export async function get<T>(store: StoreName, key: string): Promise<T | undefined> {
  const db = await open();
  return new Promise((res, rej) => {
    const r = db.transaction(store).objectStore(store).get(key);
    r.onsuccess = () => res(r.result as T | undefined);
    r.onerror = () => rej(r.error);
  });
}
export async function put<T>(store: StoreName, key: string, value: T): Promise<void> {
  const db = await open();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).put(value, key);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}
export async function requestPersistence(): Promise<boolean> {
  try { return (await navigator.storage?.persist?.()) ?? false; } catch { return false; }
}
export async function all<T>(store: StoreName): Promise<T[]> {
  const db = await open();
  return new Promise((res, rej) => {
    const r = db.transaction(store).objectStore(store).getAll();
    r.onsuccess = () => res(r.result as T[]);
    r.onerror = () => rej(r.error);
  });
}
// Back-up: alle opslagvakken als [sleutel, waarde]-paren uitlezen en terugzetten (in één transactie: lukt het niet, dan blijft alles zoals het was).
export async function dumpAll(): Promise<Record<string, [string, unknown][]>> {
  const db = await open(); const out: Record<string, [string, unknown][]> = {};
  for (const s of STORES) out[s] = await new Promise<[string, unknown][]>((res, rej) => {
    const rows: [string, unknown][] = []; const c = db.transaction(s).objectStore(s).openCursor();
    c.onsuccess = () => { const cur = c.result; if (cur) { rows.push([String(cur.key), cur.value]); cur.continue(); } else res(rows); };
    c.onerror = () => rej(c.error);
  });
  return out;
}
export async function restoreAll(data: Record<string, [string, unknown][]>): Promise<void> {
  const db = await open();
  await new Promise<void>((res, rej) => {
    const tx = db.transaction([...STORES], 'readwrite');
    for (const s of STORES) { const os = tx.objectStore(s); os.clear(); for (const [k, v] of data[s] ?? []) os.put(v, k); }
    tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); tx.onabort = () => rej(tx.error);
  });
}
