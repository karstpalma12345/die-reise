// "Meld fout": meldingen blijven lokaal op je toestel. Via Oefenen → Gemelde fouten kopieer je de lijst om aan Claude te geven.
import { get, put } from './db';
import type { Ex } from './exercises';
import { APP_VERSION } from './version';
import { dayStr } from './srs';
export interface Report { t: number; day: string; version: string; id: string; prompt: string; options?: string[]; answers: string[]; explain: string; topic: string }
export const loadReports = async (): Promise<Report[]> => (await get<Report[]>('kv', 'reports')) ?? [];
export async function addReport(ex: Ex): Promise<void> {
  const all = await loadReports(); if (all.some((r) => r.id === ex.id)) return;
  await put('kv', 'reports', [...all, { t: Date.now(), day: dayStr(), version: APP_VERSION, id: ex.id, prompt: ex.prompt, options: ex.options, answers: ex.answers, explain: ex.explain, topic: ex.topic }]);
}
export const clearReports = () => put('kv', 'reports', [] as Report[]);
export const reportsText = (r: Report[]) => `Gemelde fouten – Die Reise v${r[0]?.version ?? APP_VERSION}\n\n` + r.map((x, i) =>
  `${i + 1}. [${x.id}] ${x.prompt}${x.options ? ' (opties: ' + x.options.join(' / ') + ')' : ''}\n   Antwoord in de app: ${x.answers.join(' / ')}\n   Uitleg in de app: ${x.explain}`).join('\n\n');
