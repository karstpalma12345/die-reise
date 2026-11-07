import { Duo } from './Characters';
import { markSeen, type Stop } from '../journey';
const M = { bronze: '🥉', silver: '🥈', gold: '🥇' };
export default function Arrival({ stops, onDone }: { stops: Stop[]; onDone: () => void }) {
  if (!stops.length) return null; const s = stops[0];
  return <div className="welcome arrive"><Duo size={56} mood="cheer" /><div><b>Aangekomen: {s.place}!</b><br /><span className="muted">{s.unit.title} · {M[s.medal ?? 'bronze']} stempel{stops.length > 1 ? ` (+${stops.length - 1} meer)` : ''}</span></div>
    <button className="chip" onClick={async () => { await markSeen(stops.map((x) => x.unit.id)); onDone(); }}>Mooi!</button></div>;
}
