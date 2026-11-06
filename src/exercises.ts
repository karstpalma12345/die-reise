import type { Word } from './content/vocab';
import type { Facet } from './srs';
export interface Ex {
  id: string; kind: 'mc' | 'type' | 'order'; prompt: string; options?: string[]; answers: string[];
  explain: string; topic: string; category: 'vocabulary' | 'article' | 'verb' | 'translation' | 'sentence';
  vocabId?: string; facet?: Facet; near?: string;
}
export const norm = (s: string) => s.toLowerCase().replace(/ß/g, 'ss').replace(/[.,!?"'’]/g, '').replace(/\s+/g, ' ').trim();
export const isCorrect = (ex: Ex, given: string) => ex.answers.some((a) => norm(a) === norm(given));
export const shuffle = <T,>(a: T[]): T[] => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
export const full = (w: Word) => (w.gender ? `${w.gender} ${w.de}` : w.de);
const info = (w: Word) => `${w.ex} – ${w.exNl}`;

export function vocabEx(w: Word, kind: 'recog' | 'recall' | 'article', pool: Word[]): Ex {
  if (kind === 'article' && !w.gender) kind = 'recog';
  const base = { vocabId: w.id, facet: kind as Facet, topic: w.topic, explain: info(w) };
  if (kind === 'article' && w.gender)
    return { ...base, id: `${w.id}-art`, kind: 'mc', prompt: `Welk lidwoord hoort bij "${w.de}" (${w.nl})?`, options: ['der', 'die', 'das'], answers: [w.gender], category: 'article', explain: `${full(w)} = ${w.nl}${w.plural ? ` · mv. die ${w.plural}` : ''}` };
  if (kind === 'recall')
    return { ...base, id: `${w.id}-nl2de`, kind: 'type', prompt: `Hoe zeg je in het Duits: "${w.nl}"?${w.gender ? ' (met lidwoord)' : ''}`, answers: [full(w)], near: w.gender ? w.de : undefined, category: 'vocabulary' };
  const others = shuffle(pool.filter((p) => p.id !== w.id && p.type === w.type && p.nl !== w.nl)).slice(0, 3).map((p) => p.nl);
  return { ...base, id: `${w.id}-de2nl`, kind: 'mc', prompt: `Wat betekent "${full(w)}"?`, options: shuffle([w.nl, ...others]), answers: [w.nl], category: 'vocabulary' };
}
