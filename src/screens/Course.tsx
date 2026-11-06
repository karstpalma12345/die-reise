import { CURRICULUM, LEVELS } from '../content/curriculum';
import { VOCAB } from '../content/vocab';
import { TEXTS } from '../content/texts';
export default function Course({ done, onBack }: { done: Set<string>; onBack: () => void }) {
  return (
    <div className="screen"><button className="link" onClick={onBack}>← Terug</button><h2>Cursusoverzicht</h2>
      <p className="muted">De cursus loopt van A1 tot B2. Gepland betekent: de structuur staat klaar, de inhoud volgt.</p>
      {LEVELS.map((lv) => { const us = CURRICULUM.filter((x) => x.level === lv); const ready = us.filter((x) => x.topics.length || x.lessons.length).length;
        return <details key={lv} className="card" open={lv === 'A1'}><summary><strong>{lv}</strong> · {ready}/{us.length} units met inhoud</summary>
          {us.map((x) => { const words = VOCAB.filter((w) => x.topics.includes(w.topic)).length; const tx = TEXTS.filter((t) => t.unit === x.id);
            const status = x.lessons.length || tx.length ? 'Beschikbaar' : x.topics.length ? 'Alleen woorden' : 'Gepland';
            return <div key={x.id} className={'wr' + (status === 'Gepland' ? ' locked' : '')}><b>{x.title} <span className="pill">{status}</span></b><span className="muted">{x.goal}</span>
              {status !== 'Gepland' && <span>Woorden {words} · Lessen {x.lessons.filter((l) => done.has(l)).length}/{x.lessons.length} · Teksten {tx.filter((t) => done.has(t.id)).length}/{tx.length}</span>}</div>; })}
        </details>; })}
    </div>);
}
