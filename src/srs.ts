// Vereenvoudigd SM-2: moeilijke woorden komen snel terug, goed onthouden woorden steeds later.
// recogOk = goed bij herkennen (meerkeuze); recallOk = goed bij zelf produceren (typen).
export interface Card {
  id: string; due: string; interval: number; ease: number; reps: number; lapses: number;
  ok: number; bad: number; recogOk: number; recallOk: number; last: string;
}
export const dayStr = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toLocaleDateString('sv-SE'); };
export const newCard = (id: string): Card => ({ id, due: dayStr(), interval: 0, ease: 2.5, reps: 0, lapses: 0, ok: 0, bad: 0, recogOk: 0, recallOk: 0, last: '' });
export function review(c: Card, ok: boolean, recall: boolean): Card {
  const n = { ...c, last: dayStr() };
  if (ok) {
    n.ok++; n.reps++; if (recall) n.recallOk++; else n.recogOk++;
    n.interval = n.reps === 1 ? 1 : n.reps === 2 ? 3 : Math.round(c.interval * c.ease);
    n.ease = Math.min(3, c.ease + 0.05);
  } else {
    n.bad++; n.lapses++; n.reps = 0; n.interval = 0; n.ease = Math.max(1.3, c.ease - 0.2);
  }
  n.due = dayStr(n.interval);
  return n;
}
export const status = (c?: Card) => !c || c.ok === 0 ? 'Nieuw' : c.recallOk >= 2 ? 'Actief' : 'Herkend';
