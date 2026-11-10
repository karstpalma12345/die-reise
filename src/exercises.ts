import type { Word } from './content/vocab';
import type { Facet } from './srs';
export interface Ex {
  id: string; kind: 'mc' | 'type' | 'order'; prompt: string; options?: string[]; answers: string[];
  explain: string; topic: string; category: 'vocabulary' | 'article' | 'verb' | 'translation' | 'sentence' | 'reading';
  vocabId?: string; facet?: Facet; speak?: string; listen?: boolean; near?: string;
}
export const norm = (s: string) => s.toLowerCase().replace(/ß/g, 'ss').replace(/[.,!?"'’]/g, '').replace(/\s+/g, ' ').trim();
export const shuffle = <T,>(a: T[]): T[] => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
export const full = (w: Word) => (w.gender ? `${w.gender} ${w.de}` : w.de);
const info = (w: Word) => `${w.ex} – ${w.exNl}`;

export function vocabEx(w: Word, kind: 'recog' | 'recall' | 'article', pool: Word[]): Ex {
  if (kind === 'article' && !w.gender) kind = 'recog';
  const base = { vocabId: w.id, facet: kind as Facet, speak: kind === 'recog' ? full(w) : undefined, topic: w.topic, explain: info(w) };
  if (kind === 'article' && w.gender)
    return { ...base, id: `${w.id}-art`, kind: 'mc', prompt: `Welk lidwoord hoort bij "${w.de}" (${w.nl})?`, options: ['der', 'die', 'das'], answers: [w.gender], category: 'article', explain: `${full(w)} = ${w.nl}${w.plural ? ` · mv. die ${w.plural}` : ''}` };
  if (kind === 'recall')
    return { ...base, id: `${w.id}-nl2de`, kind: 'type', prompt: `Hoe zeg je in het Duits: "${w.nl}"?${w.gender ? ' (met lidwoord)' : ''}`, answers: [full(w)], near: w.gender ? w.de : undefined, category: 'vocabulary' };
  const others = shuffle(pool.filter((p) => p.id !== w.id && p.type === w.type && p.nl !== w.nl)).slice(0, 3).map((p) => p.nl);
  return { ...base, id: `${w.id}-de2nl`, kind: 'mc', prompt: `Wat betekent "${full(w)}"?`, options: shuffle([w.nl, ...others]), answers: [w.nl], category: 'vocabulary' };
}

// Antwoordcontrole met drie uitkomsten: full (goed), variant (bijna goed: schrijfvariant) of wrong.
// Bij typen telt een andere hoofdletter, ß→ss, ä/ö/ü → a/o/u of ae/oe/ue als schrijfvariant. Zet CASE_STRICT op false om hoofdletters te negeren.
const CASE_STRICT = true;
const TWINS = new Set(['schon', 'wurde', 'zahlen', 'bar']); // zonder trema een ander woord (schön/schon): nooit een variant
const strip = (s: string) => s.replace(/[.,!?"'’]/g, '').replace(/\s+/g, ' ').trim();
const forms = (a: string) => { const s = strip(a).toLowerCase().replace(/ß/g, 'ss');
  return [s, s.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u'), s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')]; };
export type Grade = 'full' | 'variant' | 'wrong';
export function grade(ex: Ex, given: string): Grade {
  const g = strip(given); if (!g) return 'wrong'; const low = g.toLowerCase();
  if (ex.kind !== 'type') return ex.answers.some((a) => strip(a).toLowerCase() === low) ? 'full' : 'wrong'; // meerkeuze en woordvolgorde: hoofdletters tellen niet
  if (ex.answers.some((a) => strip(a) === g)) return 'full';
  if (TWINS.has(low)) return 'wrong';
  if (ex.answers.some((a) => forms(a).includes(low.replace(/ß/g, 'ss')))) return CASE_STRICT || low !== strip(ex.answers[0]).toLowerCase() ? 'variant' : 'full';
  return 'wrong';
}
export const isCorrect = (ex: Ex, given: string) => grade(ex, given) !== 'wrong';

// Wat mag de app voorlezen? Het woord of de zin die al zichtbaar is, of (na het antwoord) de complete Duitse zin.
const DUTCH = /\b(hoe|wat|welke|vul|vertaal|verbeter|betekent|een|het|de|dat|dit|zijn|wordt|moet|kan|niet|voor|met|naar|van|op|bij|om|wie|wanneer)\b/i;
export function sayText(ex: Ex, answered: boolean): string | undefined {
  if (ex.speak) return ex.speak;
  if (!answered) return undefined;
  if (ex.prompt.includes('___')) { const t = ex.prompt.replace(/^(Vul in|Verbeter de zin|Vertaal[^:]*):\s*/i, '').replace(/\s*\([^)]*\)/g, '').replace('___', ex.answers[0]); return DUTCH.test(t) ? undefined : t; }
  if (ex.kind === 'order' || ex.kind === 'type') return ex.answers[0];
  return undefined;
}
