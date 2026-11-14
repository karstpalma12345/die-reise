import { useState } from 'react';
import Practice, { type Wrong } from './Practice';
import { put } from '../db';
import { recordAnswer } from '../progress';
import { dayStr } from '../srs';
import { speak, speechOk } from '../speech';
import type { Lesson } from '../content/lessons';
import type { TextItem } from '../content/texts';
export type Activity = { kind: 'lesson'; lesson: Lesson } | { kind: 'text'; text: TextItem };
// Een les of tekst starten vanaf de kaart: uitleg/lezen → oefeningen → resultaat. Zelfde regels als in Mijn reis (70% = afgerond).
export default function UnitActivity({ item, wasDone, gainXp, onClose }: { item: Activity; wasDone: boolean; gainXp: (n: number) => void; onClose: () => void }) {
  const [stage, setStage] = useState<'read' | 'do' | 'end'>('read'); const [r, setR] = useState<{ s: number; t: number; w: Wrong[]; pass: boolean }>({ s: 0, t: 0, w: [], pass: false });
  const l = item.kind === 'lesson' ? item.lesson : null; const tx = item.kind === 'text' ? item.text : null;
  const ex = l ? l.exercises : tx!.questions; const id = l ? l.id : tx!.id; const title = l ? l.title : tx!.title;
  if (stage === 'do') return <Practice title={title} exercises={ex} onAnswer={recordAnswer} onExit={onClose} onDone={async (s, t, w) => {
    const pass = s / t >= 0.7; if (pass) await put('lessons', id, { id, done: true, score: s, date: dayStr() });
    gainXp(s * 10 + (pass && !wasDone ? (l ? 20 : 10) : 0)); setR({ s, t, w, pass }); setStage('end'); }} />;
  if (stage === 'end') return (
    <div className="screen center"><h2>{title}</h2><div className="stat big"><b>{r.s}/{r.t}</b><span>goed</span></div>
      <p>{r.pass ? 'Afgerond! Weer een stap dichter bij je volgende bestemming.' : 'Je hebt 70% nodig om dit af te ronden. Lees nog eens en probeer opnieuw.'}</p>
      {r.w.length > 0 && <div className="card wrongs"><strong>Om nog eens te bekijken ({r.w.length})</strong>{r.w.map((x, i) => <div key={i} className="wr"><b>{x.prompt}</b><span>Juist: {x.correct}</span><span className="muted">{x.explain}</span></div>)}</div>}
      <button className="primary" onClick={onClose}>Terug naar de kaart</button></div>);
  return (
    <div className="screen"><button className="link" onClick={onClose}>← Terug naar de kaart</button><h2>{title}</h2>
      {l && <><p className="muted">Doel: {l.objective}</p>{l.sections.map((s) => <div className="card" key={s.h}><strong>{s.h}</strong><p style={{ whiteSpace: 'pre-line' }}>{s.body}</p>{s.examples?.map(([de, nl]) => <details key={de}><summary>{de}</summary><span className="muted">{nl}</span></details>)}</div>)}</>}
      {tx && <><p className="muted">Lees de tekst. Tik op een regel voor de vertaling.</p><div className="card">{tx.lines.map((x, k) => <details key={k} className="ln"><summary>{x.who ? (x.who === 'Carla' ? '🐸 ' : '🦎 ') + x.who + ': ' : ''}{x.de}{speechOk && <button className="link small" onClick={(e) => { e.preventDefault(); speak(x.de); }}> 🔊</button>}</summary><span className="muted">{x.nl}</span></details>)}</div></>}
      <button className="primary" onClick={() => setStage('do')}>{l ? 'Naar de oefeningen' : 'Naar de vragen'}</button></div>);
}
