import { useCallback, useEffect, useState } from 'react';
import { Duo } from '../components/Characters';
import Arrival from '../components/Arrival';
import { loadJourney, setWeekGoal, LEVELS, type Journey, type Stop, type Souvenir } from '../journey';
import { dumpAll, restoreAll, STORES } from '../db';
import { APP_VERSION } from '../version';
const MEDAL = { bronze: '🥉', silver: '🥈', gold: '🥇' };

function RouteMap({ stops }: { stops: Stop[] }) {
  const cols = 6; const pos = (i: number) => { const r = Math.floor(i / cols), c = i % cols; return [30 + (r % 2 ? cols - 1 - c : c) * 60, 34 + r * 64]; };
  const pts = stops.map((_, i) => pos(i));
  return <svg viewBox={`0 0 360 ${20 + Math.ceil(stops.length / cols) * 64}`} className="rmap" role="img" aria-label="Reiskaart">
    <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="#7fd6d3" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 11" />
    {stops.map((s, i) => <g key={s.unit.id}><circle cx={pts[i][0]} cy={pts[i][1]} r={s.state === 'current' ? 14 : 11} fill={s.state === 'reached' ? '#f6b94b' : s.state === 'current' ? '#ff8a6b' : s.state === 'next' ? '#fff' : '#d7e3e4'} stroke="#137f86" strokeWidth="3" />
      <text x={pts[i][0]} y={pts[i][1]} textAnchor="middle" dy=".35em" fontSize="10" fontWeight="700" fill="#17424a">{s.unit.id.slice(-2).replace(/^0/, '')}</text></g>)}
  </svg>;
}
export default function Progress() {
  const [j, setJ] = useState<Journey | null>(null); const [lv, setLv] = useState('A1'); const [msg, setMsg] = useState(''); const [sel, setSel] = useState<Souvenir | null>(null);
  const reload = useCallback(() => { loadJourney().then((x) => { setJ(x); if (x.current) setLv(x.current.unit.level); }); }, []);
  useEffect(() => { reload(); }, [reload]);
  if (!j) return <div className="screen center"><Duo size={80} /><p className="muted">Je reis wordt berekend…</p></div>;
  const stops = j.stops.filter((s) => s.unit.level === lv); const cur = j.current;
  const exportData = async () => { const stores = await dumpAll(); const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ app: 'die-reise', version: APP_VERSION, exported: new Date().toISOString(), stores })], { type: 'application/json' })); a.download = `die-reise-backup-${new Date().toLocaleDateString('sv-SE')}.json`; a.click(); setMsg('Back-up gemaakt. Bewaar het bestand op een veilige plek.'); };
  const importData = async (f: File) => { try { const d = JSON.parse(await f.text());
      const ok = d && d.app === 'die-reise' && d.stores && STORES.every((s) => Array.isArray(d.stores[s]) && d.stores[s].every((p: unknown) => Array.isArray(p) && typeof p[0] === 'string'));
      if (!ok) { setMsg('Dit bestand is geen geldige back-up van Die Reise. Er is niets veranderd.'); return; }
      if (!window.confirm(`Je huidige voortgang wordt vervangen door deze back-up (${String(d.exported ?? '').slice(0, 10) || 'datum onbekend'}). Doorgaan?`)) return;
      await restoreAll(d.stores); setMsg('Back-up hersteld.'); reload(); } catch { setMsg('Het bestand kon niet worden gelezen. Er is niets veranderd.'); } };
  return (
    <div className="screen"><h2>Voortgang</h2>
      <Arrival stops={j.newStops} onDone={reload} />
      <div className="card"><strong>Reiskaart</strong>
        <div className="quick" style={{ margin: '8px 0' }}>{LEVELS.map((l) => <button key={l} className={'chip' + (l === lv ? ' on' : '')} onClick={() => setLv(l)}>{l}</button>)}</div>
        <RouteMap stops={stops} />
        {cur && <p className="muted">Volgende stop: <b>{cur.place}</b> ({cur.unit.title}) · {Math.round(cur.progress * 100)}% · nog {cur.todo.join(', ') || 'bijna klaar'}</p>}
        {stops.map((s) => <div key={s.unit.id} className={'wr' + (s.state === 'planned' ? ' locked' : '')}><b>{s.unit.id.slice(-2).replace(/^0/, '')}. {s.place} {s.medal ? MEDAL[s.medal] : ''}</b><span className="muted">{s.unit.title}{s.state === 'planned' ? ' · gepland' : ''}</span></div>)}</div>
      <div className="card"><strong>Paspoort ({j.reached} stempels)</strong><div className="stamps">{j.stops.filter((s) => s.state === 'reached').map((s) => <span key={s.unit.id} className="stamp">{MEDAL[s.medal!]}<small>{s.place}</small><small>{s.stamp?.backfilled ? 'eerder behaald' : s.stamp?.date}</small></span>)}{j.reached === 0 && <span className="muted">Bereik je eerste stop voor je eerste stempel. Goud = je beheerst de woorden echt.</span>}</div></div>
      <div className="card"><strong>Souvenirs</strong><div className="stamps">{j.souvenirs.map((s) => <button key={s.id} className={'stamp' + (s.earned ? '' : ' locked')} onClick={() => setSel(s)}>{s.earned ? '🏅' : '🔒'}<small>{s.title}</small></button>)}</div>
        {sel && <p className="muted"><b>{sel.title}</b>: {sel.how}{sel.earned ? (sel.backfilled ? ' (eerder behaald)' : ` (behaald op ${sel.date})`) : ' (nog niet behaald)'}</p>}</div>
      <div className="card"><strong>Weekdoel</strong>
        <div className="pads" style={{ margin: '8px 0' }}>{j.weekDays.map((d, n) => <span key={n} className={'pad' + (d ? ' on' : '')} />)}<span className="muted">{j.weekCount} van {j.goal} dagen · {j.weekStreak} {j.weekStreak === 1 ? 'week' : 'weken'} op rij</span></div>
        <div className="quick">{[3, 4, 5, 6, 7].map((n) => <button key={n} className={'chip' + (n === j.goal ? ' on' : '')} onClick={async () => { await setWeekGoal(n); reload(); }}>{n} dagen</button>)}</div></div>
      <div className="card"><strong>Mijn woorden</strong><p>{j.counts.new} nieuw · {j.counts.learning} aan het leren · {j.counts.extra} extra oefening nodig · {j.counts.mastered} beheerst</p></div>
      <div className="card wrongs"><strong>Mijn aandachtspunten</strong>{j.weak.length === 0 ? <p>Geen aandachtspunten. Fouten zijn leermomenten; ze verschijnen hier als ze terugkomen.</p> : j.weak.map((w, k) => <span key={k}>{w.label} <span className="muted">· {w.sub}</span></span>)}</div>
      <div className="card wrongs"><strong>Back-up</strong><p>Je voortgang staat alleen op dit toestel. Maak regelmatig een back-up.</p>
        <button className="chip" onClick={exportData}>Back-up maken</button><label className="link">Back-up terugzetten<input type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) importData(f); e.target.value = ''; }} /></label>{msg && <span className="muted">{msg}</span>}</div>
    </div>);
}
