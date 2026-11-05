import { useRef, useState } from 'react';
import { type Ex, isCorrect, norm } from '../exercises';
export interface Wrong { prompt: string; given: string; correct: string; explain: string }
interface Props { title: string; exercises: Ex[]; onAnswer?: (ex: Ex, ok: boolean, given: string) => void; onDone: (score: number, total: number, wrong: Wrong[]) => void; onExit: () => void; showFeedback?: boolean; }
export default function Practice({ title, exercises, onAnswer, onDone, onExit, showFeedback = true }: Props) {
  const [i, setI] = useState(0); const [given, setGiven] = useState(''); const [res, setRes] = useState<boolean | null>(null); const [score, setScore] = useState(0); const [picked, setPicked] = useState<number[]>([]);
  const wrongRef = useRef<Wrong[]>([]);
  const ex = exercises[i];
  const submit = (g: string) => {
    if (res !== null || !g.trim()) return;
    const ok = isCorrect(ex, g); if (!ok) wrongRef.current.push({ prompt: ex.prompt, given: g, correct: ex.answers[0], explain: ex.explain });
    setGiven(g); setRes(ok); if (ok) setScore((s) => s + 1); onAnswer?.(ex, ok, g);
    if (!showFeedback) next(ok ? score + 1 : score);
  };
  const next = (sc = score) => { if (i + 1 >= exercises.length) onDone(sc, exercises.length, wrongRef.current); else { setI(i + 1); setGiven(''); setRes(null); setPicked([]); } };
  const words = ex.options ?? [];
  const orderUI = (<div>
    <div className="ans" aria-label="Jouw zin">{picked.length === 0 && <span className="muted">Tik op de woorden in de goede volgorde</span>}
      {picked.map((n) => <button key={n} className="tok" disabled={res !== null} onClick={() => setPicked(picked.filter((x) => x !== n))}>{words[n]}</button>)}</div>
    <div className="bank">{words.map((w, n) => picked.includes(n) ? null : <button key={n} className="tok" disabled={res !== null} onClick={() => setPicked([...picked, n])}>{w}</button>)}</div>
    {res === null && <button className="primary" disabled={!picked.length} onClick={() => submit(picked.map((n) => words[n]).join(' '))}>Controleer</button>}</div>);
  return (
    <div className="screen">
      <div className="row"><button className="link" onClick={onExit}>← Stoppen</button><span className="muted">{title} · {i + 1}/{exercises.length}</span></div>
      <div className="bar"><i style={{ width: (i / exercises.length) * 100 + '%' }} /></div>
      <div className="card"><h2 className="q">{ex.prompt}</h2>
        {ex.kind === 'order' ? orderUI : ex.kind === 'mc' ? <div className="opts">{ex.options!.map((o) => <button key={o} className={'opt' + (res !== null && isCorrect(ex, o) ? ' ok' : res === false && o === given ? ' no' : '')} disabled={res !== null} onClick={() => submit(o)}>{o}</button>)}</div>
          : <form onSubmit={(e) => { e.preventDefault(); submit(given); }}><input className="inp" value={given} onChange={(e) => setGiven(e.target.value)} disabled={res !== null} autoCapitalize="off" autoCorrect="off" spellCheck={false} placeholder="Typ je antwoord" aria-label="Antwoord" />
            {res === null && <button className="primary" type="submit">Controleer</button>}</form>}
      </div>
      {res !== null && showFeedback && <div className={'card fb ' + (res ? 'okc' : 'noc')}>
        <strong>{res ? 'Goed zo!' : 'Nog niet helemaal. Dit is een leermoment.'}</strong>
        {!res && ex.near && norm(given) === norm(ex.near) && <p>Bijna! Het lidwoord hoort erbij.</p>}
        {!res && <p>Juist: <b>{ex.answers[0]}</b></p>}<p>{ex.explain}</p>
        <button className="primary" onClick={() => next()}>{i + 1 >= exercises.length ? 'Afronden' : 'Volgende'}</button></div>}
    </div>
  );
}
