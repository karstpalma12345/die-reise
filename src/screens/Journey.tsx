import { useEffect, useRef, useState } from 'react';
import Practice, { type Wrong } from './Practice';
import { Duo } from '../components/Characters';
import { all, put } from '../db';
import { VOCAB } from '../content/vocab';
import { LESSONS, type Lesson } from '../content/lessons';
import { type Card, dayStr } from '../srs';
import { type Ex, vocabEx, shuffle } from '../exercises';
import { recordAnswer, wordIdOf } from '../progress';

interface Mistake { exerciseId: string; topic: string }
type Phase = { kind: 'ex'; title: string; ex: Ex[] } | { kind: 'lesson'; title: string; l: Lesson; ex: Ex[] };
interface Plan { phases: Phase[]; lines: string[] }

// Bouwt een sessie van ± 5 minuten uit: herhaling, een nieuwe les en je terugkerende fouten.
async function buildPlan(): Promise<Plan> {
  const cards = new Map((await all<Card>('vocab')).map((c) => [c.id, c]));
  const mistakes = await all<Mistake>('mistakes');
  const done = new Set((await all<{ id: string; done: boolean }>('lessons')).filter((d) => d.done).map((d) => d.id));
  const today = dayStr();
  let words = [...shuffle(VOCAB.filter((w) => { const c = cards.get(w.id); return c && c.due <= today; })).slice(0, 4), ...VOCAB.filter((w) => !cards.has(w.id)).slice(0, 3)];
  if (!words.length) words = shuffle(VOCAB).slice(0, 6);
  const warm = words.map((w) => { const c = cards.get(w.id);
    return w.gender && c && c.recogOk >= 1 && Math.random() < 0.35 ? vocabEx(w, 'article', VOCAB) : vocabEx(w, c && c.recogOk >= 2 ? 'recall' : 'recog', VOCAB); });
  // terugkerende fouten: wie vaker fout ging, komt eerder aan bod (in een andere vorm)
  const count = new Map<string, number>(); const topicOf = new Map<string, string>();
  mistakes.forEach((m) => { const k = wordIdOf(m.exerciseId); count.set(k, (count.get(k) ?? 0) + 1); topicOf.set(k, m.topic); });
  const lessonEx = new Map(LESSONS.flatMap((l) => l.exercises).map((e) => [e.id, e]));
  const warmIds = new Set(words.map((w) => w.id));
  const weak: Ex[] = []; const weakTopics = new Set<string>();
  for (const [k] of [...count.entries()].sort((a, b) => b[1] - a[1])) {
    if (weak.length >= 3) break;
    const le = lessonEx.get(k); const w = VOCAB.find((v) => v.id === k);
    if (le) { weak.push(le); weakTopics.add(topicOf.get(k) ?? ''); }
    else if (w && !warmIds.has(w.id)) { weak.push(vocabEx(w, w.gender && Math.random() < 0.5 ? 'article' : 'recall', VOCAB)); weakTopics.add(topicOf.get(k) ?? ''); }
  }
  const lesson = LESSONS.find((l) => !done.has(l.id));
  const phases: Phase[] = [{ kind: 'ex', title: 'Warming-up', ex: warm }];
  const lines = [`${warm.length} woorden herhalen of leren`];
  if (lesson) { phases.push({ kind: 'lesson', title: lesson.title, l: lesson, ex: shuffle(lesson.exercises).slice(0, 5) }); lines.push(`Nieuwe les: ${lesson.title}`); }
  if (weak.length) { phases.push({ kind: 'ex', title: 'Aandachtspunten', ex: weak }); lines.push(`${weak.length} aandachtspunten uit je eerdere fouten (${[...weakTopics].filter(Boolean).join(', ')})`); }
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
