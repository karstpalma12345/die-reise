// Reismotor: rekent uit je bestaande gegevens uit hoe ver je bent (stops, stempels, week). Niets hiervan wordt apart opgeslagen, behalve je weekdoel en welke aankomsten je al hebt gezien.
import { all, get, put } from './db';
import { CURRICULUM, LEVELS, type Level, type Unit } from './content/curriculum';
import { VOCAB } from './content/vocab';
import { TEXTS } from './content/texts';
import { LESSONS } from './content/lessons';
import { type FacetRec, addDays, dayStr, fStatus, wordStatus } from './srs';
import { loadFacets } from './progress';
import { requiredFacets, wordCounts } from './session';

const PLACES: Record<Level, string[]> = {
  A1: ['De vijver', 'Het dorp', 'Het familiehuis', 'Het café', 'Carla’s huis', 'Het dorpsplein', 'Het station', 'De dokter', 'Het kantoor', 'De markt', 'Het sportveld', 'De grens'],
  A2: ['Hannover', 'Berlijn', 'Berlijn', 'Berlijn', 'Berlijn', 'Berlijn', 'Dresden', 'München'],
  B1: ['Wenen', 'Wenen', 'Salzburg', 'Innsbruck', 'Zürich', 'Luzern', 'Bern', 'Basel'],
  B2: ['De wereld in', 'De wereld in', 'De wereld in', 'De wereld in', 'De wereld in', 'De wereld in', 'De wereld in', 'De wereld in'],
};
export type Medal = 'bronze' | 'silver' | 'gold';
export interface Stop { unit: Unit; place: string; state: 'reached' | 'current' | 'next' | 'planned'; medal?: Medal; progress: number; todo: string[]; words: number; mastered: number }
export interface Souvenir { id: string; title: string; how: string; earned: boolean }
export interface Journey { stops: Stop[]; current?: Stop; reached: number; newStops: Stop[]; weekDays: boolean[]; weekCount: number; goal: number; weekStreak: number; souvenirs: Souvenir[];
  counts: { new: number; learning: number; extra: number; mastered: number }; weak: { label: string; sub: string }[] }
interface In { facets: Map<string, FacetRec>; done: Set<string>; days: string[]; goal: number; seen: string[]; today?: string }
const FACET_NL = { recog: 'betekenis herkennen', recall: 'zelf schrijven', article: 'lidwoord', ex: '' } as const;

export function computeJourney(i: In): Journey {
  const today = i.today ?? dayStr();
  const stops: Stop[] = CURRICULUM.map((u) => {
    const words = VOCAB.filter((w) => u.topics.includes(w.topic));
    const st = words.map((w) => wordStatus(requiredFacets(w), (f) => i.facets.get(`${w.id}:${f}`)));
    const started = st.filter((s) => s !== 'new').length, mastered = st.filter((s) => s === 'mastered').length;
    const texts = TEXTS.filter((t) => t.unit === u.id); const needW = Math.ceil(words.length * 0.7);
    const lDone = u.lessons.filter((l) => i.done.has(l)).length, tDone = texts.filter((t) => i.done.has(t.id)).length, wDone = Math.min(started, needW);
    const total = u.lessons.length + texts.length + needW; const available = total > 0;
    const reached = available && lDone === u.lessons.length && tDone === texts.length && wDone === needW;
    const todo = [u.lessons.length - lDone && `${u.lessons.length - lDone} les${u.lessons.length - lDone > 1 ? 'sen' : ''}`, texts.length - tDone && `${texts.length - tDone} tekst${texts.length - tDone > 1 ? 'en' : ''}`, needW - wDone && `${needW - wDone} woorden leren`].filter(Boolean) as string[];
    const share = words.length ? mastered / words.length : 0;
    return { unit: u, place: PLACES[u.level][CURRICULUM.filter((x) => x.level === u.level).indexOf(u)], state: reached ? 'reached' : available ? 'next' : 'planned', progress: available ? (lDone + tDone + wDone) / total : 0,
      medal: reached ? (share >= 0.8 ? 'gold' : share >= 0.5 ? 'silver' : 'bronze') : undefined, todo, words: words.length, mastered } as Stop;
  });
  const current = stops.find((s) => s.state === 'next'); if (current) current.state = 'current';
  const d = new Date(today + 'T12:00:00'); const start = addDays(today, -((d.getDay() + 6) % 7)); const set = new Set(i.days);
  const cnt = (s: string) => [0, 1, 2, 3, 4, 5, 6].filter((n) => set.has(addDays(s, n))).length;
  let weekStreak = 0, everMet = false, running = true;
  for (let w = 0; w < 52; w++) { const met = cnt(addDays(start, -7 * w)) >= i.goal; if (met) everMet = true; if (running) { if (met) weekStreak++; else if (w > 0) running = false; } }
  const counts = wordCounts(i.facets); const reachedN = stops.filter((s) => s.state === 'reached').length; const started = counts.learning + counts.extra + counts.mastered;
  const a1 = stops.filter((s) => s.unit.level === 'A1'); const lessonsDone = LESSONS.filter((l) => i.done.has(l.id)).length;
  const sv = (id: string, title: string, how: string, earned: boolean): Souvenir => ({ id, title, how, earned });
  const lessonTopic = new Map(LESSONS.flatMap((l) => l.exercises).concat(TEXTS.flatMap((t) => t.questions)).map((e) => [e.id, e.topic] as const)); const byId = new Map(VOCAB.map((w) => [w.id, w]));
  const zeros = (f: FacetRec) => [...f.recent].filter((c) => c === '0').length;
  const weak = [...i.facets.values()].filter((f) => fStatus(f) === 'extra').sort((a, b) => zeros(b) - zeros(a)).slice(0, 10).map((f) => f.facet === 'ex'
    ? { label: lessonTopic.get(f.item) ?? 'Oefening', sub: 'les of tekst' } : { label: byId.get(f.item)?.de ?? f.item, sub: FACET_NL[f.facet] });
  return { stops, current, reached: reachedN, newStops: stops.filter((s) => s.state === 'reached' && !i.seen.includes(s.unit.id)), weekDays: [0, 1, 2, 3, 4, 5, 6].map((n) => set.has(addDays(start, n))), weekCount: cnt(start), goal: i.goal, weekStreak, counts, weak,
    souvenirs: [sv('first', 'Eerste stap', 'Beantwoord je eerste vraag.', i.days.length > 0), sv('w50', '50 woorden gestart', 'Begin met 50 woorden.', started >= 50), sv('w100', '100 woorden gestart', 'Begin met 100 woorden.', started >= 100), sv('w250', '250 woorden gestart', 'Begin met 250 woorden.', started >= 250),
      sv('m1', 'Eerste beheerste woord', 'Beheers één woord echt.', counts.mastered >= 1), sv('m25', '25 beheerste woorden', 'Beheers 25 woorden.', counts.mastered >= 25), sv('l10', '10 lessen', 'Rond 10 grammaticalessen af.', lessonsDone >= 10),
      sv('s1', 'Eerste stempel', 'Bereik je eerste stop.', reachedN >= 1), sv('a1', 'A1 voltooid', 'Bereik alle A1-stops.', a1.every((s) => s.state === 'reached')), sv('wk', 'Weekdoel gehaald', 'Haal je weekdoel.', everMet || weekStreak > 0)] };
}
export async function loadJourney(): Promise<Journey> {
  const [facets, lessons, reviews, goal, seen] = await Promise.all([loadFacets(), all<{ id: string; done?: boolean; date?: string }>('lessons'), all<{ day: string }>('reviews'), get<number>('kv', 'weekGoal'), get<string[]>('kv', 'seenStops')]);
  return computeJourney({ facets, done: new Set(lessons.filter((l) => l.done).map((l) => l.id)), days: [...reviews.map((r) => r.day), ...lessons.map((l) => l.date ?? '')].filter(Boolean), goal: goal ?? 4, seen: seen ?? [] });
}
export const setWeekGoal = (n: number) => put('kv', 'weekGoal', n);
export const markSeen = async (ids: string[]) => put('kv', 'seenStops', [...new Set([...((await get<string[]>('kv', 'seenStops')) ?? []), ...ids])]);
export { LEVELS };
