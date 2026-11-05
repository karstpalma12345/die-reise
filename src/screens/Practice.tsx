import { useState } from 'react';
import { type Ex, isCorrect, norm } from '../exercises';
interface Props { title: string; exercises: Ex[]; onAnswer?: (ex: Ex, ok: boolean, given: string) => void; onDone: (score: number, total: number) => void; onExit: () => void; showFeedback?: boolean; }
export default function Practice({ title, exercises, onAnswer, onDone, onExit, showFeedback = true }: Props) {
  const [i, setI] = useState(0); const [given, setGiven] = useState(''); const [res, setRes] = useState<boolean | null>(null); const [score, setScore] = useState(0);
  const ex = exercises[i];
  const submit = (g: string) => {
    if (res !== null || !g.trim()) return;
    const ok = isCorrect(ex, g); setGiven(g); setRes(ok); if (ok) setScore((s) => s + 1); onAnswer?.(ex, ok, g);
    if (!showFeedback) next(ok ? score + 1 : score);
  };
  const next = (sc = score) => { if (i + 1 >= exercises.length) onDone(sc, exercises.length); else { setI(i + 1); setGiven(''); setRes(null); } };
  return (
    <div className="screen">
      <div className="row"><button className="link" onClick={onExit}>← Stoppen</button><span className="muted">{title} · {i + 1}/{exercises.length}</span></div>
      <div className="bar"><i style={{ width: (i / exercises.length) * 100 + '%' }} /></div>
      <div className="card"><h2 className="q">{ex.prompt}</h2>
        {ex.kind === 'mc' ? <div className="opts">{ex.options!.map((o) => <button key={o} className={'opt' + (res !== null && isCorrect(ex, o) ? ' ok' : res === false && o === given ? ' no' : '')} disabled={res !== null} onClick={() => submit(o)}>{o}</button>)}</div>
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
