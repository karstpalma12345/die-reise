// Reismotor: rekent uit je bestaande gegevens uit hoe ver je bent. Bewaard worden alleen: weekdoel, gezien-aankomsten, STEMPELS en SOUVENIRS met datum.
// Taalbeheersing, lessen en teksten blijven de enige bron voor "bereikt"; XP speelt hier geen rol.
import { all, get, put } from './db';
import { CURRICULUM, LEVELS, type Level, type Unit } from './content/curriculum';
import { VOCAB } from './content/vocab';
import { TEXTS } from './content/texts';
import { LESSONS } from './content/lessons';
import { WORLD, stopOfUnit, type WorldStop } from './content/world';
import { type FacetRec, addDays, dayStr, fStatus, wordStatus } from './srs';
import { loadFacets } from './progress';
import { requiredFacets, wordCounts } from './session';

export type Medal = 'bronze' | 'silver' | 'gold';
export const MEDAL_LIMITS = { silver: 0.4, gold: 0.75 };  // aandeel beheerste woorden van de unit
export const MIN_ANSWERS_PER_DAY = 10;                    // een oefendag = minstens 10 antwoorden, of een afgeronde les/tekst
const RANK = { bronze: 1, silver: 2, gold: 3 } as const;
export const medalOf = (share: number): Medal => (share >= MEDAL_LIMITS.gold ? 'gold' : share >= MEDAL_LIMITS.silver ? 'silver' : 'bronze');
export interface Stamp { date: string; medal: Medal; upgraded?: string; backfilled?: boolean }   // backfilled = eerder behaald, datum onbekend
export type Stamps = Record<string, Stamp>;
export type SouvDates = Record<string, { date: string; backfilled?: boolean }>;
export interface Stop { unit: Unit; world: WorldStop; place: string; country: string; state: 'reached' | 'current' | 'next' | 'planned'; medal?: Medal; stamp?: Stamp; progress: number; todo: string[]; words: number; mastered: number }
export interface RouteNode { id: string; world: WorldStop; state: 'reached' | 'current' | 'available' | 'undiscovered'; stop?: Stop }
export interface Souvenir { id: string; title: string; how: string; earned: boolean; date?: string; backfilled?: boolean }
export interface Journey { stops: Stop[]; route: RouteNode[]; current?: Stop; reached: number; newStops: Stop[]; weekDays: boolean[]; weekCount: number; goal: number; weekStreak: number; souvenirs: Souvenir[];
  counts: { new: number; learning: number; extra: number; mastered: number }; weak: { label: string; sub: string }[]; stampsNext: Stamps; souvNext: SouvDates; changed: boolean }
interface In { facets: Map<string, FacetRec>; done: Set<string>; days: string[]; goal: number; seen: string[]; stamps: Stamps | null; souv: SouvDates | null; today?: string }
const FACET_NL = { recog: 'betekenis herkennen', recall: 'zelf schrijven', article: 'lidwoord', ex: '' } as const;

export function meaningfulDays(answerDays: string[], doneDates: string[], min = MIN_ANSWERS_PER_DAY): string[] {
  const n = new Map<string, number>(); answerDays.forEach((d) => n.set(d, (n.get(d) ?? 0) + 1));
  return [...new Set([...[...n].filter(([, c]) => c >= min).map(([d]) => d), ...doneDates.filter(Boolean)])];
}
export function computeJourney(i: In): Journey {
  const today = i.today ?? dayStr(); const initStamps = i.stamps === null, initSouv = i.souv === null;
  const stamps: Stamps = { ...(i.stamps ?? {}) };
  const stops: Stop[] = CURRICULUM.map((u) => {
    const words = VOCAB.filter((w) => u.topics.includes(w.topic));
    const st = words.map((w) => wordStatus(requiredFacets(w), (f) => i.facets.get(`${w.id}:${f}`)));
    const started = st.filter((s) => s !== 'new').length, mastered = st.filter((s) => s === 'mastered').length;
    const texts = TEXTS.filter((t) => t.unit === u.id); const needW = Math.ceil(words.length * 0.7);
    const lDone = u.lessons.filter((l) => i.done.has(l)).length, tDone = texts.filter((t) => i.done.has(t.id)).length, wDone = Math.min(started, needW);
    const total = u.lessons.length + texts.length + needW; const available = total > 0;
    const reachedNow = available && lDone === u.lessons.length && tDone === texts.length && wDone === needW;
    let stamp = stamps[u.id]; const share = words.length ? mastered / words.length : 0;
    if (reachedNow) { const m = medalOf(share);
      if (!stamp) stamp = { date: initStamps ? '' : today, medal: m, ...(initStamps ? { backfilled: true } : {}) };
      else if (RANK[m] > RANK[stamp.medal]) stamp = { ...stamp, medal: m, upgraded: today }; }   // een stempel kan stijgen, nooit dalen
    if (stamp) stamps[u.id] = stamp;
    const todo = [u.lessons.length - lDone && `${u.lessons.length - lDone} les${u.lessons.length - lDone > 1 ? 'sen' : ''}`, texts.length - tDone && `${texts.length - tDone} tekst${texts.length - tDone > 1 ? 'en' : ''}`, needW - wDone && `${needW - wDone} woorden leren`].filter(Boolean) as string[];
    const w = stopOfUnit(u.id)!;
    return { unit: u, world: w, place: w.name, country: w.country, state: stamp ? 'reached' : available ? 'next' : 'planned', medal: stamp?.medal, stamp, progress: stamp ? 1 : available ? (lDone + tDone + wDone) / total : 0, todo: stamp ? [] : todo, words: words.length, mastered } as Stop;
  });
  const current = stops.find((s) => s.state === 'next'); if (current) current.state = 'current';
  // route voor de kaart: unit-stops en tussenstops, met de toestand ontdekt/beschikbaar/bezig/bereikt
  let ahead = 0; const route: RouteNode[] = []; let prev: Stop | undefined;
  for (const ws of WORLD) {
    const stop = ws.unit ? stops.find((s) => s.unit.id === ws.unit) : undefined;
    let state: RouteNode['state'];
    if (stop) { if (stop.state === 'reached') state = 'reached'; else if (stop.state === 'current') state = 'current'; else if (ahead++ < 2 && stop.state === 'next') state = 'available'; else state = 'undiscovered'; prev = stop; }
    else state = prev?.state === 'reached' ? 'reached' : prev?.state === 'current' ? 'available' : 'undiscovered';
    route.push({ id: ws.id, world: ws, state, stop });
  }
  const d = new Date(today + 'T12:00:00'); const start = addDays(today, -((d.getDay() + 6) % 7)); const set = new Set(i.days);
  const cnt = (s: string) => [0, 1, 2, 3, 4, 5, 6].filter((n) => set.has(addDays(s, n))).length;
  let weekStreak = 0, everMet = false, running = true, run = 0, maxStreak = 0;
  for (let w = 0; w < 52; w++) { const met = cnt(addDays(start, -7 * w)) >= i.goal; if (met) everMet = true; if (running) { if (met) weekStreak++; else if (w > 0) running = false; } }
  for (let w = 51; w >= 0; w--) { const met = cnt(addDays(start, -7 * w)) >= i.goal; run = met ? run + 1 : w === 0 ? run : 0; maxStreak = Math.max(maxStreak, run); }
  const counts = wordCounts(i.facets); const reachedN = stops.filter((s) => s.state === 'reached').length;
  const lessonsDone = LESSONS.filter((l) => i.done.has(l.id)).length; const lastB2 = stops.filter((s) => s.unit.level === 'B2').pop();
  const defs: [string, string, string, boolean][] = [
    ['s1', 'Eerste bestemming bereikt', 'Bereik je eerste stop op de wereldreis.', reachedN >= 1], ['m100', 'Eerste 100 beheerste woorden', 'Beheers 100 woorden echt (op meerdere dagen goed).', counts.mastered >= 100], ['m250', '250 beheerste woorden', 'Beheers 250 woorden echt.', counts.mastered >= 250],
    ['gold1', 'Eerste gouden stempel', 'Bereik een stop waarvan je minstens 75% van de woorden beheerst.', Object.values(stamps).some((s) => s.medal === 'gold')], ['l10', 'Eerste grammaticale mijlpaal', 'Rond 10 grammaticalessen af.', lessonsDone >= 10],
    ['s10', 'Tien bestemmingen bereikt', 'Bereik tien stops.', reachedN >= 10], ['wk1', 'Eerste weekdoel behaald', 'Haal voor het eerst je weekdoel.', everMet], ['wk3', 'Drie weken op rij', 'Haal je weekdoel drie weken achter elkaar.', maxStreak >= 3],
    ['a1', 'Taalmijlpaal: A1 voltooid', 'Bereik alle stops van niveau A1.', stops.filter((s) => s.unit.level === 'A1').every((s) => s.state === 'reached')], ['b2end', 'B2-eindbestemming bereikt', 'Bereik de laatste stop van B2.', lastB2?.state === 'reached']];
  const souvNext: SouvDates = { ...(i.souv ?? {}) };
  for (const [id, , , earned] of defs) if (earned && !souvNext[id]) souvNext[id] = { date: initSouv ? '' : today, ...(initSouv ? { backfilled: true } : {}) };
  const lessonTopic = new Map(LESSONS.flatMap((l) => l.exercises).concat(TEXTS.flatMap((t) => t.questions)).map((e) => [e.id, e.topic] as const)); const byId = new Map(VOCAB.map((w) => [w.id, w]));
  const zeros = (f: FacetRec) => [...f.recent].filter((c) => c === '0').length;
  const weak = [...i.facets.values()].filter((f) => fStatus(f) === 'extra').sort((a, b) => zeros(b) - zeros(a)).slice(0, 10).map((f) => f.facet === 'ex'
    ? { label: lessonTopic.get(f.item) ?? 'Oefening', sub: 'les of tekst' } : { label: byId.get(f.item)?.de ?? f.item, sub: FACET_NL[f.facet] });
  const changed = JSON.stringify(stamps) !== JSON.stringify(i.stamps) || JSON.stringify(souvNext) !== JSON.stringify(i.souv);
  return { stops, route, current, reached: reachedN, newStops: stops.filter((s) => s.stamp && !s.stamp.backfilled && !i.seen.includes(s.unit.id)), weekDays: [0, 1, 2, 3, 4, 5, 6].map((n) => set.has(addDays(start, n))), weekCount: cnt(start), goal: i.goal, weekStreak, counts, weak, stampsNext: stamps, souvNext, changed,
    souvenirs: defs.map(([id, title, how]) => ({ id, title, how, earned: !!souvNext[id], date: souvNext[id]?.date, backfilled: souvNext[id]?.backfilled })) };
}
export async function loadJourney(): Promise<Journey> {
  const [facets, lessons, reviews, goal, seen, stamps, souv] = await Promise.all([loadFacets(), all<{ id: string; done?: boolean; date?: string }>('lessons'), all<{ day: string }>('reviews'), get<number>('kv', 'weekGoal'), get<string[]>('kv', 'seenStops'), get<Stamps>('kv', 'stamps'), get<SouvDates>('kv', 'souvenirs')]);
  const j = computeJourney({ facets, done: new Set(lessons.filter((l) => l.done).map((l) => l.id)), days: meaningfulDays(reviews.map((r) => r.day), lessons.map((l) => l.date ?? '')), goal: goal ?? 4, seen: seen ?? [], stamps: stamps ?? null, souv: souv ?? null });
  if (j.changed) await Promise.all([put('kv', 'stamps', j.stampsNext), put('kv', 'souvenirs', j.souvNext)]);
  if (!stamps) await markSeen(j.stops.filter((s) => s.stamp).map((s) => s.unit.id)); // eerste keer: bestaande stempels als "eerder behaald", geen banner
  return j;
}
export const setWeekGoal = (n: number) => put('kv', 'weekGoal', n);
export const markSeen = async (ids: string[]) => put('kv', 'seenStops', [...new Set([...((await get<string[]>('kv', 'seenStops')) ?? []), ...ids])]);
export { LEVELS };
export type { Level };
