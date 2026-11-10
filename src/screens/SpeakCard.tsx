import { useState } from 'react';
import { Karst, Carla } from '../components/Characters';
import { speak, speechOk, recordOk, startRecording, stopSpeaking } from '../speech';
interface Props { lines: { de: string; nl: string }[]; onDone: (good: number) => void; onExit: () => void }
// Luisteren, nazeggen, opnemen en zelf beoordelen. De app beoordeelt je uitspraak NIET automatisch.
export default function SpeakCard({ lines, onDone, onExit }: Props) {
  const [i, setI] = useState(0); const [good, setGood] = useState(0); const [rec, setRec] = useState<{ stop: () => Promise<string> } | null>(null);
  const [url, setUrl] = useState(''); const [err, setErr] = useState(''); const [nl, setNl] = useState(false);
  const l = lines[i];
  const toggle = async () => { setErr(''); stopSpeaking();
    if (rec) { setUrl(await rec.stop()); setRec(null); return; }
    try { setUrl(''); setRec(await startRecording()); } catch { setErr('De microfoon is niet beschikbaar of niet toegestaan. Je kunt ook zonder opname oefenen: luister en zeg de zin hardop na.'); } };
  const next = (ok: boolean) => { const g = good + (ok ? 1 : 0); if (i + 1 >= lines.length) { onDone(g); return; } setGood(g); setI(i + 1); setUrl(''); setNl(false); };
  return (
    <div className="screen"><div className="row"><button className="link" onClick={onExit}>← Stoppen</button><div className="react"><Karst size={52} mood="happy" /><Carla size={52} mood="happy" delay="0.15s" /></div></div>
      <div className="card"><span className="muted">Spreken {i + 1}/{lines.length} · luister, zeg na, vergelijk</span><h2 className="q">{l.de}</h2>
        {nl ? <p className="muted">{l.nl}</p> : <button className="link" onClick={() => setNl(true)}>Toon vertaling</button>}
        {speechOk ? <div className="audio"><button className="chip" onClick={() => speak(l.de)}>🔊 Luister</button><button className="chip" onClick={() => speak(l.de, true)}>🐢 Langzaam</button></div> : <p className="muted">Voorlezen wordt op dit apparaat niet ondersteund.</p>}
        {recordOk ? <div className="audio"><button className="chip" onClick={toggle}>{rec ? '⏹ Stop opname' : '🎤 Neem jezelf op'}</button></div> : <p className="muted">Opnemen wordt hier niet ondersteund. Zeg de zin hardop na.</p>}
        {url && <audio controls src={url} style={{ width: '100%' }} />}{err && <p className="muted">{err}</p>}
        <p className="muted">Je opname blijft op je toestel en wordt niet bewaard. De app beoordeelt je uitspraak niet; luister naar het voorbeeld en vergelijk zelf.</p></div>
      <div className="quick"><button className="primary" onClick={() => next(true)}>👍 Ging goed</button><button className="chip" onClick={() => next(false)}>🔁 Nog oefenen</button></div></div>);
}
