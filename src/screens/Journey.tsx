import { useEffect, useRef, useState } from 'react';
import Practice, { type Wrong } from './Practice';
import { Duo } from '../components/Characters';
import { all, put } from '../db';
import { LESSONS, type Lesson } from '../content/lessons';
import { dayStr } from '../srs';
import { type Ex, shuffle } from '../exercises';
import { recordAnswer, loadFacets } from '../progress';
import { buildWordSession, buildWeak } from '../session';

type Phase = { kind: 'ex'; title: string; ex: Ex[] } | { kind: 'lesson'; title: string; l: Lesson; ex: Ex[] };
interface Plan { phases: Phase[]; lines: string[] }

// Bouwt een sessie van ± 5 minuten uit: herhaling, een nieuwe les en je terugkerende fouten.
async function buildPlan(): Promise<Plan> {
  const facets = await loadFacets();
  const done = new Set((await all<{ id: string; done: boolean }>('lessons')).filter((d) => d.done).map((d) => d.id));
  const { ex: warm, keys } = buildWordSession(facets, 8);
  const { ex: weak, topics } = buildWeak(facets, keys, 3);
  const lesson = LESSONS.find((l) => !done.has(l.id));
  const phases: Phase[] = [{ kind: 'ex', title: 'Warming-up', ex: warm }];
  const lines = [`${warm.length} woorden herhalen of leren`];
  if (lesson) { phases.push({ kind: 'lesson', title: lesson.title, l: lesson, ex: shuffle(lesson.exercises).slice(0, 5) }); lines.push(`Nieuwe les: ${lesson.title}`); }
  if (weak.length) { phases.push({ kind: 'ex', title: 'Aandachtspunten', ex: weak }); lines.push(`${weak.length} aandachtspunten (${topics.join(', ')})`); }
  return { phases, lines };
}

export default function Journey({ gainXp }: { gainXp: (n: number) => void }) {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [step, setStep] = useState<'intro' | 'run' | 'end'>('intro');
  const [p, setP] = useState(0); const [explain, setExplain] = useState(false);
  const acc = useRef({ score: 0, total: 0, wrong: [] as Wrong[] });
  useEffect(() => { if (step === 'intro') { setPlan(null); buildPlan().then(setPlan); } }, [step]);

  if (step === 'intro') return (
    <div className="screen center"><Duo size={90} /><h2>Mijn reis</h2>
      {!plan ? <p className="muted">Even je sessie voorbereiden…</p> : <>
        <div className="card wrongs"><strong>Vandaag, ± 5 minuten</strong>{plan.lines.map((l) => <span key={l}>• {l}</span>)}</div>
        <button className="primary" onClick={() => { acc.current = { score: 0, total: 0, wrong: [] }; setP(0); setExplain(plan.phases[0].kind === 'lesson'); setStep('run'); }}>Start sessie</button></>}
    </div>);

  if (step === 'end') return (
    <div className="screen center"><Duo size={90} mood="cheer" /><h2>Sessie klaar!</h2>
      <div className="stat big"><b>{acc.current.score}/{acc.current.total}</b><span>goed</span></div>
      {acc.current.wrong.length > 0 && <div className="card wrongs"><strong>Om nog eens te bekijken ({acc.current.wrong.length})</strong>
        {acc.current.wrong.map((x, i) => <div key={i} className="wr"><b>{x.prompt}</b><span>Juist: {x.correct}</span><span className="muted">{x.explain}</span></div>)}</div>}
      <p className="muted">Fouten komen vanzelf terug in een volgende sessie.</p>
      <button className="primary" onClick={() => setStep('intro')}>Nog een sessie</button></div>);

  const ph = plan!.phases[p];
  if (ph.kind === 'lesson' && explain) return (
    <div className="screen"><button className="link" onClick={() => setStep('intro')}>← Stoppen</button><h2>{ph.l.title}</h2><p className="muted">Doel: {ph.l.objective}</p>
      {ph.l.sections.map((s) => <div className="card" key={s.h}><strong>{s.h}</strong><p style={{ whiteSpace: 'pre-line' }}>{s.body}</p>
        {s.examples?.map(([de, nl]) => <details key={de}><summary>{de}</summary><span className="muted">{nl}</span></details>)}</div>)}
      <button className="primary" onClick={() => setExplain(false)}>Naar de oefeningen</button></div>);

  return <Practice key={p} title={ph.title} exercises={ph.ex} onAnswer={recordAnswer} onExit={() => setStep('intro')}
    onDone={async (s, t, w) => {
      acc.current = { score: acc.current.score + s, total: acc.current.total + t, wrong: [...acc.current.wrong, ...w] };
      if (ph.kind === 'lesson' && s / t >= 0.7) { await put('lessons', ph.l.id, { id: ph.l.id, done: true, score: s, date: dayStr() }); gainXp(20); }
      if (p + 1 < plan!.phases.length) { setP(p + 1); setExplain(plan!.phases[p + 1].kind === 'lesson'); }
      else { gainXp(acc.current.score * 10 + 10); setStep('end'); }
    }} />;
}
