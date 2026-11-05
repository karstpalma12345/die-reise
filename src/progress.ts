// Gedeelde opslaglogica: elk antwoord werkt het herhaalschema bij en bewaart fouten.
import { get, put } from './db';
import type { Ex } from './exercises';
import { newCard, review, dayStr, type Card } from './srs';
export async function recordAnswer(ex: Ex, ok: boolean, given: string): Promise<void> {
  if (ex.vocabId) {
    const c = (await get<Card>('vocab', ex.vocabId)) ?? newCard(ex.vocabId);
    await put('vocab', ex.vocabId, review(c, ok, ex.kind === 'type'));
  }
  if (!ok) await put('mistakes', `${Date.now()}-${ex.id}`, { exerciseId: ex.id, prompt: ex.prompt, given, correct: ex.answers[0], topic: ex.topic, category: ex.category, date: dayStr() });
}
export const wordIdOf = (exerciseId: string) => exerciseId.replace(/-(de2nl|nl2de|art)$/, '');
