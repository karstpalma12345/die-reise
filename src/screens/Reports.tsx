import { useEffect, useState } from 'react';
import { loadReports, clearReports, reportsText, type Report } from '../reports';
export default function ReportsCard() {
  const [r, setR] = useState<Report[]>([]); const [msg, setMsg] = useState(''); const [text, setText] = useState('');
  useEffect(() => { loadReports().then(setR); }, []);
  if (!r.length) return <div className="card"><strong>Gemelde fouten</strong><p>Klopt een vraag of vertaling niet? Tik tijdens een oefening op "⚑ Meld fout". Je meldingen verschijnen hier.</p></div>;
  const copy = async () => { const t = reportsText(r); try { await navigator.clipboard.writeText(t); setMsg('Gekopieerd! Plak de lijst in je gesprek met Claude.'); } catch { setText(t); setMsg('Kopiëren lukt niet vanzelf. Selecteer de tekst hieronder en kopieer hem.'); } };
  const clear = async () => { if (window.confirm('Alle gemelde fouten wissen?')) { await clearReports(); setR([]); setMsg(''); setText(''); } };
  return <div className="card wrongs"><strong>Gemelde fouten ({r.length})</strong><p>Kopieer de lijst en plak hem in je gesprek met Claude, dan neem ik ze mee in een verbetering.</p>
    <button className="chip" onClick={copy}>Kopieer lijst</button><button className="link" onClick={clear}>Lijst wissen</button>
    {msg && <span className="muted">{msg}</span>}{text && <textarea className="inp" readOnly rows={6} value={text} onFocus={(e) => e.currentTarget.select()} />}</div>;
}
