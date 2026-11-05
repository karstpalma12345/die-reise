import { useEffect, useRef, useState } from 'react';
import { type Ex, isCorrect, norm } from '../exercises';
export interface Wrong { prompt: string; correct: string; explain: string }
interface Props { title: string; exercises: Ex[]; onAnswer?: (ex: Ex, ok: boolean, given: string) => void; onDone: (score: number, total: number, wrong: Wrong[]) => void; onExit: () => void; showFeedback?: boolean; }
const AUTO_MS = 1000; // na een goed antwoord gaat de app na 1 seconde vanzelf door

export default function Practice({ title, exercises, onAnswer, onDone, onExit, showFeedback = true }: Props) {
  const [i, setI] = useState(0); const [given, setGiven] = useState(''); const [res, setRes] = useState<boolean | null>(null);
  const [score, setScore] = useState(0); const [picked, setPicked] = useState<number[]>([]);
  const wrongRef = useRef<Wrong[]>([]);
  const ex = exercises[i];
  const next = (sc = score) => { if (i + 1 >= exercises.length) onDone(sc, exercises.length, wrongRef.current); else { setI(i + 1); setGiven(''); setRes(null); setPicked([]); } };
  useEffect(() => { if (res === true && showFeedback) { const t = setTimeout(() => next(), AUTO_MS); return () => clearTimeout(t); } }, [res, i]); // eslint-disable-line
  const submit = (g: string) => {
    if (res !== null || !g.trim()) return;
    const ok = isCorrect(ex, g);
    if (!ok) wrongRef.current.push({ prompt: ex.prompt, correct: ex.answers[0], explain: ex.explain });
    setGiven(g); setRes(ok); if (ok) setScore((s) => s + 1); onAnswer?.(ex, ok, g);
    if (!showFeedback) next(ok ? score + 1 : score);
  };
  const words = ex.options ?? [];
  const shown = res === false ? ex.answers[0].split(' ') : picked.map((n) => words[n]); // bij een fout zie je alleen het juiste antwoord
  const orderUI = (<div>
    <div className="ans" aria-label="Jouw zin">{shown.length === 0 && <span className="muted">Tik op de woorden in de goede volgorde</span>}
      {shown.map((w, k) => <button key={k} className={'tok' + (res === false ? ' good' : '')} disabled={res !== null} onClick={() => setPicked(picked.filter((x) => x !== picked[k]))}>{w}</button>)}</div>
    <div className="bank">{words.map((w, n) => picked.includes(n) ? null : <button key={n} className="tok" disabled={res !== null} onClick={() => setPicked([...picked, n])}>{w}</button>)}</div>
    {res === null && <button className="primary" disabled={!picked.length} onClick={() => submit(picked.map((n) => words[n]).join(' '))}>Controleer</button>}</div>);
  return (
    <div className="screen">
      <div className="row"><button className="link" onClick={onExit}>← Stoppen</button><span className="muted">{title} · {i + 1}/{exercises.length}</span></div>
      <div className="bar"><i style={{ width: (i / exercises.length) * 100 + '%' }} /></div>
      <div className="card"><h2 className="q">{ex.prompt}</h2>
        {ex.kind === 'order' ? orderUI : ex.kind === 'mc' ? <div className="opts">{ex.options!.map((o) => <button key={o} className={'opt' + (res !== null && isCorrect(ex, o) ? ' ok' : '')} disabled={res !== null} onClick={() => submit(o)}>{o}</button>)}</div>
          : <form onSubmit={(e) => { e.preventDefault(); submit(given); }}><input className="inp" value={res === false ? '' : given} onChange={(e) => setGiven(e.target.value)} disabled={res !== null} autoCapitalize="off" autoCorrect="off" spellCheck={false} placeholder="Typ je antwoord" aria-label="Antwoord" />
            {res === null && <button className="primary" type="submit">Controleer</button>}</form>}
      </div>
      {res === true && showFeedback && <div className="card fb okc"><strong>✓ Goed zo!</strong><button className="link" onClick={() => next()}>Volgende ›</button></div>}
      {res === false && showFeedback && <div className="card fb noc">
        <span className="muted">Juist is:</span><div className="right">{ex.answers[0]}</div>
        {ex.near && norm(given) === norm(ex.near) && <p className="why">Vergeet het lidwoord niet.</p>}
        <p className="why">{ex.explain}</p>
        <button className="primary" onClick={() => next()}>{i + 1 >= exercises.length ? 'Afronden' : 'Volgende'}</button></div>}
    </div>
  );
}
