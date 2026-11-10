import { useEffect, useRef, useState } from 'react';
import Practice, { type Wrong } from './Practice';
import SpeakCard from './SpeakCard';
import { speechOk, speak } from '../speech';
import { Duo } from '../components/Characters';
import { all, put } from '../db';
import { LESSONS, type Lesson } from '../content/lessons';
import { TEXTS, type TextItem } from '../content/texts';
import { unitLessonsDone } from '../content/curriculum';
import { dayStr } from '../srs';
import { type Ex, shuffle } from '../exercises';
import { recordAnswer, loadFacets } from '../progress';
import { buildWordSession, buildWeak } from '../session';

type Phase = { kind: 'ex'; title: string; ex: Ex[] } | { kind: 'lesson'; title: string; l: Lesson; ex: Ex[] } | { kind: 'text'; title: string; t: TextItem; ex: Ex[] } | { kind: 'speak'; title: string; ex: Ex[]; lines: { de: string; nl: string }[] };
interface Plan { phases: Phase[]; lines: string[] }

// Bouwt een sessie van ± 5 minuten uit: herhaling, een nieuwe les en je terugkerende fouten.
async function buildPlan(): Promise<Plan> {
  const facets = await loadFacets();
  const done = new Set((await all<{ id: string; done: boolean }>('lessons')).filter((d) => d.done).map((d) => d.id));
  const lesson = LESSONS.find((l) => !done.has(l.id));
  const text = TEXTS.find((t) => !done.has(t.id) && unitLessonsDone(t.unit, done)); // een tekst komt als de lessen van zijn unit klaar zijn
  const { ex: warm, keys } = buildWordSession(facets, lesson && text ? 6 : 8);
  const { ex: weak, topics } = buildWeak(facets, keys, 3);
  const phases: Phase[] = [{ kind: 'ex', title: 'Warming-up', ex: warm }];
  if (lesson) phases.push({ kind: 'lesson', title: lesson.title, l: lesson, ex: shuffle(lesson.exercises).slice(0, 5) });
  if (text) phases.push({ kind: 'text', title: text.title, t: text, ex: text.questions });
  if (text && speechOk) phases.push({ kind: 'speak', title: 'Spreken', ex: [], lines: text.lines.filter((l) => l.de.split(' ').length <= 12).slice(0, 3).map((l) => ({ de: l.de, nl: l.nl })) });
  if (weak.length) phases.push({ kind: 'ex', title: 'Aandachtspunten', ex: weak });
  return { phases, lines: topics };
}

export default function Journey({ gainXp, onExit }: { gainXp: (n: number) => void; onExit: () => void }) {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [step, setStep] = useState<'loading' | 'run' | 'end'>('loading');
  const [p, setP] = useState(0); const [explain, setExplain] = useState(false);
  const acc = useRef({ score: 0, total: 0, wrong: [] as Wrong[] });
  // Geen tussenscherm: de sessie start direct.
  useEffect(() => { if (step === 'loading') buildPlan().then((pl) => { acc.current = { score: 0, total: 0, wrong: [] }; setPlan(pl); setP(0); setExplain(pl.phases[0].kind === 'lesson'); setStep('run'); }); }, [step]);

  if (step === 'loading' || !plan) return <div className="screen center"><Duo size={90} /><p className="muted">Even je sessie voorbereiden…</p></div>;
  if (step === 'end') return (
    <div className="screen center"><Duo size={90} mood="cheer" /><h2>Sessie klaar!</h2>
      <div className="stat big"><b>{acc.current.score}/{acc.current.total}</b><span>goed</span></div>
      {acc.current.wrong.length > 0 && <div className="card wrongs"><strong>Om nog eens te bekijken ({acc.current.wrong.length})</strong>
        {acc.current.wrong.map((x, i) => <div key={i} className="wr"><b>{x.prompt}</b><span>Juist: {x.correct}</span><span className="muted">{x.explain}</span></div>)}</div>}
      <p className="muted">Fouten komen vanzelf terug in een volgende sessie.</p>
      <button className="primary" onClick={() => setStep('loading')}>Nog een sessie</button><button className="link" onClick={onExit}>Terug naar Home</button></div>);

  const ph = plan.phases[p];
  if (ph.kind === 'text' && explain) return (
    <div className="screen"><button className="link" onClick={onExit}>← Stoppen</button><h2>{ph.t.title}</h2><p className="muted">Lees de tekst. Tik op een regel voor de vertaling.</p>
      <div className="card">{ph.t.lines.map((l, k) => <details key={k} className="ln"><summary>{l.who ? (l.who === 'Carla' ? '🐸 ' : '🦎 ') + l.who + ': ' : ''}{l.de}{speechOk && <button className="link small" onClick={(e) => { e.preventDefault(); speak(l.de); }}> 🔊</button>}</summary><span className="muted">{l.nl}</span></details>)}</div>
      <button className="primary" onClick={() => setExplain(false)}>Naar de vragen</button></div>);
  if (ph.kind === 'lesson' && explain) return (
    <div className="screen"><button className="link" onClick={onExit}>← Stoppen</button><h2>{ph.l.title}</h2><p className="muted">Doel: {ph.l.objective}</p>
      {ph.l.sections.map((s) => <div className="card" key={s.h}><strong>{s.h}</strong><p style={{ whiteSpace: 'pre-line' }}>{s.body}</p>
        {s.examples?.map(([de, nl]) => <details key={de}><summary>{de}</summary><span className="muted">{nl}</span></details>)}</div>)}
      <button className="primary" onClick={() => setExplain(false)}>Naar de oefeningen</button></div>);

  const goNext = () => { if (p + 1 < plan.phases.length) { setP(p + 1); setExplain(plan.phases[p + 1].kind === 'lesson' || plan.phases[p + 1].kind === 'text'); } else { gainXp(acc.current.score * 10 + 10); setStep('end'); } };
  if (ph.kind === 'speak') return <SpeakCard key={p} lines={ph.lines} onExit={onExit} onDone={(n) => { gainXp(n * 5); goNext(); }} />;
  const offset = plan.phases.slice(0, p).reduce((n, x) => n + x.ex.length, 0); const grandTotal = plan.phases.reduce((n, x) => n + x.ex.length, 0);
  return <Practice key={p} title={ph.title} hideTitle offset={offset} grandTotal={grandTotal} exercises={ph.ex} onAnswer={recordAnswer} onExit={onExit}
    onDone={async (s, t, w) => {
      acc.current = { score: acc.current.score + s, total: acc.current.total + t, wrong: [...acc.current.wrong, ...w] };
      if (ph.kind !== 'ex' && s / t >= 0.7) { const id = ph.kind === 'lesson' ? ph.l.id : ph.t.id; await put('lessons', id, { id, done: true, score: s, date: dayStr() }); gainXp(ph.kind === 'lesson' ? 20 : 10); }
      goNext();
    }} />;
}
