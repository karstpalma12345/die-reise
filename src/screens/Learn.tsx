import { useCallback, useEffect, useState } from 'react';
import Practice from './Practice';
import { all, put } from '../db';
import { VOCAB } from '../content/vocab';
import { LESSONS, PLACEMENT, type Lesson } from '../content/lessons';
import { type Card, newCard, review, status, dayStr } from '../srs';
import { type Ex, vocabEx, shuffle } from '../exercises';
import type { Level } from '../profile';

type View = { t: 'menu' } | { t: 'drill'; ex: Ex[] } | { t: 'lesson'; l: Lesson } | { t: 'lessonEx'; l: Lesson } | { t: 'place' }
  | { t: 'result'; title: string; score: number; total: number; msg: string; level?: Level };
interface Props { gainXp: (n: number) => void; setLevel: (l: Level) => void; }
interface Done { id: string; done: boolean }

export default function Learn({ gainXp, setLevel }: Props) {
  const [view, setView] = useState<View>({ t: 'menu' });
  const [cards, setCards] = useState<Map<string, Card>>(new Map());
  const [done, setDone] = useState<Set<string>>(new Set());
  const refresh = useCallback(async () => {
    setCards(new Map((await all<Card>('vocab')).map((c) => [c.id, c])));
    setDone(new Set((await all<Done>('lessons')).filter((d) => d.done).map((d) => d.id)));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const today = dayStr();
  const due = VOCAB.filter((w) => { const c = cards.get(w.id); return c && c.due <= today; });
  const fresh = VOCAB.filter((w) => !cards.has(w.id));
  const counts = { Nieuw: 0, Herkend: 0, Actief: 0 } as Record<string, number>;
  VOCAB.forEach((w) => counts[status(cards.get(w.id))]++);

  const startDrill = () => {
    let words = [...shuffle(due).slice(0, 8), ...fresh.slice(0, 5)];
    if (!words.length) words = shuffle(VOCAB).slice(0, 8);
    const ex = words.map((w) => {
      const c = cards.get(w.id);
      if (w.gender && c && c.recogOk >= 1 && Math.random() < 0.35) return vocabEx(w, 'article', VOCAB);
      return vocabEx(w, c && c.recogOk >= 2 ? 'recall' : 'recog', VOCAB);
    });
    setView({ t: 'drill', ex });
  };
  const onAnswer = async (ex: Ex, ok: boolean, given: string) => {
    if (ex.vocabId) await put('vocab', ex.vocabId, review(cards.get(ex.vocabId) ?? newCard(ex.vocabId), ok, ex.kind === 'type'));
    if (!ok) await put('mistakes', `${Date.now()}-${ex.id}`, { exerciseId: ex.id, prompt: ex.prompt, given, correct: ex.answers[0], topic: ex.topic, category: ex.category, date: dayStr() });
  };

  if (view.t === 'drill') return <Practice title="Woorden" exercises={view.ex} onAnswer={onAnswer} onExit={() => { refresh(); setView({ t: 'menu' }); }}
    onDone={(s, t) => { gainXp(s * 10); refresh(); setView({ t: 'result', title: 'Woordtrainer klaar', score: s, total: t, msg: 'Woorden die je fout had, komen snel terug. Zo onthoud je ze beter.' }); }} />;
  if (view.t === 'place') return <Practice title="Instaptoets" exercises={PLACEMENT} showFeedback={false} onExit={() => setView({ t: 'menu' })}
    onDone={(s, t) => { const level: Level = s <= 3 ? 'A0' : s <= 6 ? 'A1' : 'A2';
      setView({ t: 'result', title: 'Resultaat instaptoets', score: s, total: t, level, msg: level === 'A2' ? 'Je schat op A2. Let op: de lessen gaan voorlopig tot A0–A1; meer niveaus volgen in latere updates.' : `Je geschatte startniveau is ${level}. Dit is een korte schatting, geen officieel examen.` }); }} />;
  if (view.t === 'lessonEx') { const l = view.l; return <Practice title={l.title} exercises={l.exercises} onAnswer={onAnswer} onExit={() => setView({ t: 'menu' })}
    onDone={async (s, t) => { const pass = s / t >= 0.7; if (pass) { await put('lessons', l.id, { id: l.id, done: true, score: s, date: dayStr() }); if (!done.has(l.id)) gainXp(20); }
      gainXp(s * 10); refresh(); setView({ t: 'result', title: l.title, score: s, total: t, msg: pass ? 'Les afgerond! De volgende les is ontgrendeld.' : 'Je hebt 70% nodig om door te gaan. Lees de uitleg nog eens en probeer opnieuw.' }); }} />; }
  if (view.t === 'lesson') { const l = view.l; return (
    <div className="screen"><button className="link" onClick={() => setView({ t: 'menu' })}>← Terug</button>
      <h2>{l.title}</h2><p className="muted">Doel: {l.objective}</p>
      {l.sections.map((s) => <div className="card" key={s.h}><strong>{s.h}</strong><p style={{ whiteSpace: 'pre-line' }}>{s.body}</p>
        {s.examples?.map(([de, nl]) => <details key={de}><summary>{de}</summary><span className="muted">{nl}</span></details>)}</div>)}
      <button className="primary" onClick={() => setView({ t: 'lessonEx', l })}>Naar de oefeningen</button></div>); }
  if (view.t === 'result') { const v = view; return (
    <div className="screen center"><h2>{v.title}</h2><div className="stat big"><b>{v.score}/{v.total}</b><span>goed</span></div><p>{v.msg}</p>
      {v.level && <><button className="primary" onClick={() => { setLevel(v.level!); setView({ t: 'menu' }); }}>Gebruik niveau {v.level}</button>
        <button className="chip" onClick={() => { setLevel('A0'); setView({ t: 'menu' }); }}>Toch bij A0 beginnen</button></>}
      {!v.level && <button className="primary" onClick={() => setView({ t: 'menu' })}>Verder</button>}</div>); }

  return (
    <div className="screen"><h2>Leren</h2>
      <div className="card"><strong>Woordtrainer</strong>
        <p>{VOCAB.length} woorden: {counts.Nieuw} nieuw · {counts.Herkend} herkend · {counts.Actief} actief onthouden. Nu te herhalen: {due.length}.</p>
        <button className="primary" onClick={startDrill}>{due.length || fresh.length ? 'Woorden oefenen' : 'Extra oefenen'}</button></div>
      <h3>Grammatica</h3>
      {LESSONS.map((l, i) => { const open = i === 0 || done.has(LESSONS[i - 1].id);
        return <button key={l.id} className={'card item' + (open ? '' : ' locked')} disabled={!open} onClick={() => setView({ t: 'lesson', l })}>
          <strong>{done.has(l.id) ? '✅ ' : open ? '' : '🔒 '}{l.title}</strong><span className="muted">{l.level} · {open ? l.objective : 'Rond eerst de vorige les af.'}</span></button>; })}
      <h3>Instaptoets</h3>
      <div className="card"><p>10 korte vragen om te schatten waar je begint. Je mag ook gewoon bij A0 starten.</p><button className="chip" onClick={() => setView({ t: 'place' })}>Start instaptoets</button></div>
    </div>
  );
}
