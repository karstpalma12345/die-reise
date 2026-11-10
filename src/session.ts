// Kiest welke oefeningen er aan de beurt zijn (gedeeld door Mijn reis en Oefenen).
import { VOCAB, type Word } from './content/vocab';
import { LESSONS } from './content/lessons';
import { TEXTS } from './content/texts';
import { CURRICULUM } from './content/curriculum';
import { type Ex, vocabEx, shuffle, full } from './exercises';
import { type Facet, type FacetRec, fStatus, wordStatus, dayStr } from './srs';
type M = Map<string, FacetRec>;
const unitOf = (t: string) => { const k = CURRICULUM.findIndex((u) => u.topics.includes(t)); return k < 0 ? 999 : k; };
const ORDERED = [...VOCAB].sort((a, b) => unitOf(a.topic) - unitOf(b.topic)); // nieuwe woorden komen in de volgorde van de cursus
export const requiredFacets = (w: Word): Facet[] => (w.gender ? ['recog', 'recall', 'article'] : ['recog', 'recall']);
const rec = (m: M, w: Word, f: Facet) => m.get(`${w.id}:${f}`);
export const dueCount = (m: M) => [...m.values()].filter((f) => f.facet !== 'ex' && f.due <= dayStr()).length;
export function wordCounts(m: M) {
  const c = { new: 0, learning: 0, extra: 0, mastered: 0 };
  VOCAB.forEach((w) => { c[wordStatus(requiredFacets(w), (f) => rec(m, w, f))]++; }); return c;
}
export function buildWordSession(m: M, max: number): { ex: Ex[]; keys: Set<string> } {
  const today = dayStr(); const byId = new Map(VOCAB.map((w) => [w.id, w]));
  const due = [...m.values()].filter((f) => f.facet !== 'ex' && f.due <= today)
    .sort((a, b) => Number(fStatus(b) === 'extra') - Number(fStatus(a) === 'extra') || a.due.localeCompare(b.due));
  const out: Ex[] = []; const keys = new Set<string>();
  const add = (w: Word, facet: Facet) => { const k = `${w.id}:${facet}`; if (keys.has(k) || out.length >= max) return; keys.add(k); out.push(vocabEx(w, facet as 'recog' | 'recall' | 'article', VOCAB)); };
  due.slice(0, Math.ceil(max * 0.6)).forEach((f) => { const w = byId.get(f.item); if (w) add(w, f.facet); });
  const room = due.length > 12 ? 0 : due.length > 6 ? 1 : 3; // veel achterstand = geen of weinig nieuwe woorden
  let fresh = 0; for (const w of ORDERED) { if (fresh >= room) break; if (!rec(m, w, 'recog')) { add(w, 'recog'); fresh++; } }
  let intro = 0; for (const w of ORDERED) { if (intro >= 2) break; const r = rec(m, w, 'recog');           // nieuwe onderdelen van bekende woorden
    if (r && r.ok >= 1 && w.gender && !rec(m, w, 'article')) { add(w, 'article'); intro++; } else if (r && r.ok >= 2 && !rec(m, w, 'recall')) { add(w, 'recall'); intro++; } }
  if (!out.length) shuffle(VOCAB).slice(0, 6).forEach((w) => add(w, rec(m, w, 'recall') ? 'recall' : 'recog')); // niets aan de beurt: extra oefenen
  return { ex: shuffle(out), keys };
}
// Aandachtspunten: alleen onderdelen met status "extra oefening nodig" (afgeleid van recente antwoorden).
export function buildWeak(m: M, skip: Set<string>, max: number): { ex: Ex[]; topics: string[] } {
  const byId = new Map(VOCAB.map((w) => [w.id, w])); const lessonEx = new Map([...LESSONS.flatMap((l) => l.exercises), ...TEXTS.flatMap((t) => t.questions)].map((e) => [e.id, e]));
  const zeros = (f: FacetRec) => [...f.recent].filter((c) => c === '0').length;
  const ex: Ex[] = []; const topics = new Set<string>();
  for (const f of [...m.values()].filter((x) => fStatus(x) === 'extra' && !skip.has(x.id)).sort((a, b) => zeros(b) - zeros(a))) {
    if (ex.length >= max) break;
    if (f.facet === 'ex') { const e = lessonEx.get(f.item); if (e) { ex.push(e); topics.add(e.topic); } }
    else { const w = byId.get(f.item); if (w) { ex.push(vocabEx(w, f.facet as 'recog' | 'recall' | 'article', VOCAB)); topics.add(w.topic); } }
  }
  return { ex, topics: [...topics] };
}

// Luisteroefeningen: hoor een woord of zin en kies de betekenis. De Duitse tekst wordt niet getoond.
export function listenSession(m: M, n = 10): Ex[] {
  const started = ORDERED.filter((w) => (['recog', 'recall', 'article'] as Facet[]).some((f) => m.has(`${w.id}:${f}`)));
  const pool = started.length >= 8 ? started : ORDERED.slice(0, 40); const half = Math.ceil(n / 2);
  const words = shuffle(pool).slice(0, half).map((w): Ex => ({ id: `${w.id}-listen`, kind: 'mc', prompt: 'Luister en kies de betekenis.', listen: true, speak: full(w), answers: [w.nl],
    options: shuffle([w.nl, ...shuffle(pool.filter((p) => p.id !== w.id && p.type === w.type && p.nl !== w.nl)).slice(0, 3).map((p) => p.nl)]), explain: `${full(w)} = ${w.nl}`, topic: w.topic, category: 'vocabulary' }));
  const sents = shuffle(pool.filter((w) => w.ex.split(' ').length >= 3)).slice(0, n - half).map((w): Ex => ({ id: `${w.id}-listen-s`, kind: 'mc', prompt: 'Luister naar de zin en kies de vertaling.', listen: true, speak: w.ex, answers: [w.exNl],
    options: shuffle([w.exNl, ...shuffle(pool.filter((p) => p.id !== w.id && p.exNl !== w.exNl)).slice(0, 3).map((p) => p.exNl)]), explain: `${w.ex} – ${w.exNl}`, topic: w.topic, category: 'vocabulary' }));
  return shuffle([...words, ...sents]);
}
