import { useEffect, useRef, useState } from 'react';
import { type Ex, type Grade, grade, norm } from '../exercises';
import { addReport } from '../reports';
export interface Wrong { prompt: string; correct: string; explain: string }
interface Props { title: string; exercises: Ex[]; onAnswer?: (ex: Ex, ok: boolean, given: string, partial?: boolean) => void; onDone: (score: number, total: number, wrong: Wrong[]) => void; onExit: () => void;
  showFeedback?: boolean; offset?: number; grandTotal?: number; hideTitle?: boolean; }
const AUTO = { full: 1000, variant: 2500 }; // ms tot de volgende vraag vanzelf start

export default function Practice({ title, exercises, onAnswer, onDone, onExit, showFeedback = true, offset = 0, grandTotal, hideTitle }: Props) {
  const [i, setI] = useState(0); const [given, setGiven] = useState(''); const [res, setRes] = useState<Grade | null>(null);
  const [score, setScore] = useState(0); const [picked, setPicked] = useState<number[]>([]); const [reported, setReported] = useState('');
  const wrongRef = useRef<Wrong[]>([]); const inputRef = useRef<HTMLInputElement>(null);
  const ex = exercises[i];
  const next = (sc = score) => { if (i + 1 >= exercises.length) onDone(sc, exercises.length, wrongRef.current); else { setI(i + 1); setGiven(''); setRes(null); setPicked([]); } };
  const submit = (g: string) => {
    if (res !== null || !g.trim()) return;
    const r = grade(ex, g); const ok = r !== 'wrong';
    if (!ok) wrongRef.current.push({ prompt: ex.prompt, correct: ex.answers[0], explain: ex.explain });
    setGiven(g); setRes(r); if (ok) setScore((s) => s + 1); onAnswer?.(ex, ok, g, r === 'variant');
    if (!showFeedback) next(ok ? score + 1 : score);
  };
  useEffect(() => { if (res && res !== 'wrong' && showFeedback) { const t = setTimeout(() => next(), AUTO[res]); return () => clearTimeout(t); } }, [res, i]); // eslint-disable-line
  useEffect(() => { if (ex.kind === 'type') inputRef.current?.focus(); }, [i]); // eslint-disable-line
  // Automatisch controleren: direct bij een goed of bijna goed antwoord; anders na 2 seconden stilte (als er genoeg is getypt).
  useEffect(() => {
    if (ex.kind !== 'type' || res !== null || !given.trim()) return;
    if (grade(ex, given) !== 'wrong') { submit(given); return; }
    if (given.trim().length < Math.min(...ex.answers.map((a) => a.length))) return;
    const t = setTimeout(() => submit(given), 2000); return () => clearTimeout(t);
  }, [given]); // eslint-disable-line
  const total = grandTotal ?? exercises.length; const words = ex.options ?? [];
  const shown = res === 'wrong' ? ex.answers[0].split(' ') : picked.map((n) => words[n]); // bij een fout zie je alleen het juiste antwoord
  const orderUI = (<div>
    <div className="ans" aria-label="Jouw zin">{shown.length === 0 && <span className="muted">Tik op de woorden in de goede volgorde</span>}
      {shown.map((w, k) => <button key={k} className={'tok' + (res === 'wrong' ? ' good' : '')} disabled={res !== null} onClick={() => setPicked(picked.filter((x) => x !== picked[k]))}>{w}</button>)}</div>
    <div className="bank">{words.map((w, n) => picked.includes(n) ? null : <button key={n} className="tok" disabled={res !== null} onClick={() => setPicked([...picked, n])}>{w}</button>)}</div>
    {res === null && <button className="primary" disabled={!picked.length} onClick={() => submit(picked.map((n) => words[n]).join(' '))}>Controleer</button>}</div>);
  return (
    <div className="screen">
      <div className="row"><button className="link" onClick={onExit}>← Stoppen</button>{!hideTitle && <span className="muted">{title} · {i + 1}/{exercises.length}</span>}</div>
      <div className="bar"><i style={{ width: ((offset + i) / total) * 100 + '%' }} /></div>
      <div className="card"><h2 className="q">{ex.prompt}</h2>
        {ex.kind === 'order' ? orderUI : ex.kind === 'mc' ? <div className="opts">{ex.options!.map((o) => <button key={o} className={'opt' + (res !== null && grade(ex, o) !== 'wrong' ? ' ok' : '')} disabled={res !== null} onClick={() => submit(o)}>{o}</button>)}</div>
          : <form onSubmit={(e) => { e.preventDefault(); submit(given); }}><input ref={inputRef} className="inp" value={res === 'wrong' ? '' : given} onChange={(e) => { if (res === null) setGiven(e.target.value); }} readOnly={res !== null}
              autoCapitalize={/^[a-zäöüß]/.test(ex.answers[0]) ? 'off' : 'sentences'} autoCorrect="off" spellCheck={false} enterKeyHint="done" placeholder="Typ je antwoord" aria-label="Antwoord" />
            {res === null && <button className="primary" type="submit">Controleer</button>}</form>}
      </div>
      <button className="link small" style={{ alignSelf: 'flex-end' }} disabled={reported === ex.id} onClick={() => { addReport(ex); setReported(ex.id); }}>{reported === ex.id ? 'Gemeld ✓' : '⚑ Meld fout'}</button>
      {res === 'full' && showFeedback && <div className="card fb okc"><strong>✓ Goed zo!</strong><button className="link" onClick={() => next()}>Volgende ›</button></div>}
      {res === 'variant' && showFeedback && <div className="card fb okc"><strong>Bijna goed!</strong><span className="muted">Zo schrijf je het:</span><div className="right">{ex.answers[0]}</div><button className="link" onClick={() => next()}>Volgende ›</button></div>}
      {res === 'wrong' && showFeedback && <div className="card fb noc">
        <span className="muted">Juist is:</span><div className="right">{ex.answers[0]}</div>
        {ex.near && norm(given) === norm(ex.near) && <p className="why">Vergeet het lidwoord niet.</p>}
        <p className="why">{ex.explain}</p>
        <button className="primary" onClick={() => next()}>{i + 1 >= exercises.length ? 'Afronden' : 'Volgende'}</button></div>}
    </div>
  );
}
