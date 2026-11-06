// Herhalingssysteem v2: elk woord heeft aparte "facetten" (herkennen, zelf produceren, lidwoord), elk met een eigen schema.
// Status wordt AFGELEID uit recente antwoorden, dus fouten ruimen zichzelf op en "beheerst" is echt verdiend.
export type Facet = 'recog' | 'recall' | 'article' | 'ex'; // ex = losse lesoefening
export type FStatus = 'new' | 'learning' | 'extra' | 'mastered';
export interface FacetRec {
  id: string; item: string; facet: Facet; due: string; interval: number; ease: number; reps: number; lapses: number;
  ok: number; bad: number; days: string[]; recent: string; last: string; // recent: laatste 6 antwoorden: 1 goed, 0 fout, ~ schrijfvariant
}
export const MASTER = { days: 3, interval: 14, streak: 3 }; // beheerst = 3 goed op 3 verschillende dagen, interval >= 14 dagen, laatste 3 allemaal goed
export const dayStr = (offset = 0) => addDays(new Date().toLocaleDateString('sv-SE'), offset);
export const addDays = (day: string, n: number) => { const d = new Date(day + 'T12:00:00'); d.setDate(d.getDate() + n); return d.toLocaleDateString('sv-SE'); };
export const newFacet = (item: string, facet: Facet, today = dayStr()): FacetRec =>
  ({ id: `${item}:${facet}`, item, facet, due: today, interval: 0, ease: 2.5, reps: 0, lapses: 0, ok: 0, bad: 0, days: [], recent: '', last: '' });

export function review(f: FacetRec, ok: boolean, today: string, partial = false): FacetRec {
  const n: FacetRec = { ...f, last: today, recent: (f.recent + (ok ? (partial ? '~' : '1') : '0')).slice(-6) };
  if (ok && partial) { n.interval = Math.max(1, f.interval); }                 // schrijfvariant: geen vooruitgang in het schema
  else if (ok) {
    n.ok++; n.days = f.days.includes(today) ? f.days : [...f.days, today].slice(-10);
    n.reps = f.reps + 1; n.interval = n.reps === 1 ? 1 : n.reps === 2 ? 3 : Math.max(f.interval + 1, Math.round(f.interval * f.ease));
    n.ease = Math.min(3, f.ease + 0.05);
  } else {
    n.bad++; n.lapses++; n.ease = Math.max(1.3, f.ease - 0.2);
    if (f.reps >= 4) { n.interval = Math.max(1, Math.round(f.interval * 0.25)); n.reps = 2; } // goed bekend: zachte straf
    else { n.interval = 0; n.reps = 0; }                                                          // nog aan het leren: vandaag nog eens
  }
  n.due = addDays(today, n.interval);
  return n;
}
export function fStatus(f?: FacetRec): FStatus {
  if (!f || f.recent === '') return 'new';
  const zeros = [...f.recent.slice(-4)].filter((c) => c === '0').length;
  if (zeros >= 2 || (f.recent.endsWith('0') && f.ok >= 3)) return 'extra';
  if (f.days.length >= MASTER.days && f.interval >= MASTER.interval && f.recent.slice(-MASTER.streak) === '111') return 'mastered';
  return 'learning';
}
export function wordStatus(required: Facet[], get: (f: Facet) => FacetRec | undefined): FStatus {
  const st = required.map((f) => fStatus(get(f)));
  if (st.includes('extra')) return 'extra';
  if (st.every((s) => s === 'mastered')) return 'mastered';
  if (st.every((s) => s === 'new')) return 'new';
  return 'learning';
}
// Oude kaarten (versie 0.2/0.3) worden zonder dataverlies als facetten gelezen; het oude record blijft onaangeroerd staan.
export interface Card { id: string; due: string; interval: number; ease: number; reps: number; lapses: number; ok: number; bad: number; recogOk: number; recallOk: number; last: string }
export function fromOldCard(c: Card): FacetRec[] {
  const mk = (facet: Facet, okN: number, recent: string): FacetRec => ({ ...newFacet(c.id, facet, c.due), due: c.due, interval: c.interval, ease: c.ease, reps: Math.min(c.reps, okN), lapses: c.lapses, ok: okN, bad: c.bad, days: c.last && okN ? [c.last] : [], recent, last: c.last });
  const out: FacetRec[] = [];
  if (c.recogOk > 0 || c.bad > 0) out.push(mk('recog', c.recogOk, c.recogOk === 0 ? '0'.repeat(Math.min(2, c.bad)) : '1'.repeat(Math.min(3, c.recogOk))));
  if (c.recallOk > 0) out.push(mk('recall', c.recallOk, '1'.repeat(Math.min(3, c.recallOk))));
  return out;
}
