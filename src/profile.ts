import { get, put } from './db';
export type Level = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export interface Profile {
  level: Level; xp: number; streak: number; lastActiveDay: string;
  todayXp: number; todayDay: string; dailyGoal: number; minutesLearned: number;
}
export const today = () => new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD, local time
export const defaultProfile = (): Profile => ({
  level: 'A0', xp: 0, streak: 0, lastActiveDay: '', todayXp: 0, todayDay: today(), dailyGoal: 50, minutesLearned: 0,
});
export async function loadProfile(): Promise<Profile> {
  const p = { ...defaultProfile(), ...(await get<Profile>('kv', 'profile')) };
  const t = today();
  if (p.todayDay !== t) { p.todayDay = t; p.todayXp = 0; }
  // streak breaks if the last active day is before yesterday
  const y = new Date(); y.setDate(y.getDate() - 1);
  if (p.lastActiveDay && p.lastActiveDay !== t && p.lastActiveDay !== y.toLocaleDateString('sv-SE')) p.streak = 0;
  return p;
}
export async function addXp(p: Profile, amount: number): Promise<Profile> {
  const t = today();
  const n = { ...p, xp: p.xp + amount, todayXp: (p.todayDay === t ? p.todayXp : 0) + amount, todayDay: t };
  if (n.lastActiveDay !== t) { n.streak += 1; n.lastActiveDay = t; }
  await put('kv', 'profile', n);
  return n;
}
