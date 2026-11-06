// Slaat elk antwoord op: facet-schema, antwoordgeschiedenis (reviews) en fouten (mistakes).
import { all, get, put } from './db';
import type { Ex } from './exercises';
import { type Card, type Facet, type FacetRec, dayStr, fromOldCard, newFacet, review } from './srs';

export async function loadFacets(): Promise<Map<string, FacetRec>> {
  const recs = await all<FacetRec | Card>('vocab'); const m = new Map<string, FacetRec>();
  for (const r of recs) if (!('facet' in r)) fromOldCard(r as Card).forEach((f) => m.set(f.id, f)); // oude voortgang als zaad
  for (const r of recs) if ('facet' in r) m.set(r.id, r as FacetRec);                               // nieuwe records winnen
  return m;
}
async function current(item: string, facet: Facet): Promise<FacetRec> {
  const rec = await get<FacetRec>('vocab', `${item}:${facet}`); if (rec) return rec;
  const old = await get<Card>('vocab', item);
  return (old && !('facet' in old) ? fromOldCard(old).find((f) => f.facet === facet) : undefined) ?? newFacet(item, facet);
}
export async function recordAnswer(ex: Ex, ok: boolean, given: string, partial = false): Promise<void> {
  const today = dayStr(); const item = ex.vocabId ?? ex.id; const facet: Facet = ex.facet ?? 'ex';
  const next = review(await current(item, facet), ok, today, partial);
  await put('vocab', next.id, next);
  await put('reviews', `${Date.now()}-${next.id}`, { day: today, item, facet, ok, partial, topic: ex.topic, category: ex.category });
  if (!ok) await put('mistakes', `${Date.now()}-${ex.id}`, { exerciseId: ex.id, prompt: ex.prompt, given, correct: ex.answers[0], topic: ex.topic, category: ex.category, date: today });
}
