import { useCallback, useEffect, useState } from 'react';
import Arrival from '../components/Arrival';
import WorldMap from '../components/WorldMap';
import Symbols, { HAS } from '../components/Symbols';
import Journey from './Journey';
import UnitActivity, { type Activity } from './UnitActivity';
import { all, get, put } from '../db';
import { loadJourney, LEVELS, type Journey as JD, type RouteNode } from '../journey';
import { LESSONS } from '../content/lessons';
import { TEXTS } from '../content/texts';
import { unitLessonsDone, type Level } from '../content/curriculum';
import { REGIONS } from '../content/world';
const STATE = { reached: 'bereikt', current: 'hier werk je aan', available: 'volgende bestemming', undiscovered: 'nog niet ontdekt' };
const MEDAL = { bronze: '🥉', silver: '🥈', gold: '🥇' };
// Voorlopige introductie per niveau (taal groeit mee). Eigen dialogen per stop volgen later.
function intro(n: RouteNode, lv: Level) {
  const city = n.world.name.split(' – ')[0];
  if (lv === 'A1') return { who: 'Karst', text: `Kijk, ${n.world.name}! Een nieuwe plek om Duits te leren. Carla zegt: „Willkommen!“`, tr: '' };
  if (lv === 'A2') return { who: 'Carla', text: `Schau mal, hier ist ${city}! Bereit für etwas Neues?`, tr: `Kijk eens, hier is ${city}! Klaar voor iets nieuws?` };
  return { who: 'Karst', text: `Wir sind in ${city}! Hier lerne ich wieder etwas dazu.`, tr: `We zijn in ${city}! Hier leer ik weer iets bij.` };
}
function Sheet({ n, done, start }: { n: RouteNode; done: Set<string>; start: (a: Activity) => void }) {
  const w = n.world, st = n.stop, lm = HAS.has(w.landmark) ? w.landmark : 'pin', un = n.state === 'undiscovered', i = intro(n, w.region);
  return (
    <div className="card sheet"><div className="row"><svg viewBox="0 0 40 40" width="64" height="64"><Symbols /><use href={`#lm-${un ? 'pin' : lm}`} width="40" height="40" opacity={un ? 0.4 : 1} /></svg>
      <div style={{ flex: 1 }}><b>{un ? 'Nog niet ontdekt' : w.name}</b><br /><span className="muted">{un ? 'Bereik eerst de eerdere bestemmingen.' : `${w.country} · ${STATE[n.state]}`}{st?.medal ? ` · ${MEDAL[st.medal]}` : ''}</span></div></div>
      {!un && <div className="bubble"><b>{i.who}:</b> {i.text}{i.tr && <details><summary className="muted">Vertaling</summary>{i.tr}</details>}</div>}
      {!un && !st && <p className="muted">Tussenstop: Karst en Carla reizen hier doorheen. Hier zijn geen lessen.</p>}
      {st && !un && <>
        <p><b>{st.unit.title}</b> · <span className="muted">{st.unit.goal}</span></p>
        {st.state === 'reached' ? <p className="muted">Stempel {st.stamp?.backfilled ? 'eerder behaald' : `behaald op ${st.stamp?.date}`}. Woorden beheerst: {st.mastered}/{st.words}.</p>
          : <><div className="bar"><i style={{ width: st.progress * 100 + '%' }} /></div><p className="muted">Nog {st.todo.join(', ') || 'bijna klaar'}.</p></>}
        {st.unit.lessons.map((id) => { const l = LESSONS.find((x) => x.id === id)!; const ix = LESSONS.indexOf(l); const open = ix === 0 || done.has(LESSONS[ix - 1].id);
          return <div className="act" key={id}><span>{done.has(id) ? '✅' : open ? '📘' : '🔒'} {l.title}</span><button className="chip" disabled={!open} onClick={() => start({ kind: 'lesson', lesson: l })}>{done.has(id) ? 'Opnieuw' : 'Start'}</button></div>; })}
        {TEXTS.filter((t) => t.unit === st.unit.id).map((t) => { const open = unitLessonsDone(st.unit.id, done);
          return <div className="act" key={t.id}><span>{done.has(t.id) ? '✅' : open ? '📖' : '🔒'} {t.title}</span><button className="chip" disabled={!open} onClick={() => start({ kind: 'text', text: t })}>{done.has(t.id) ? 'Opnieuw' : 'Lees'}</button></div>; })}</>}
    </div>);
}
export default function World({ gainXp, auto, onAutoUsed }: { gainXp: (n: number) => void; auto: boolean; onAutoUsed: () => void }) {
  const [j, setJ] = useState<JD | null>(null); const [lv, setLv] = useState<Level>('A1'); const [sel, setSel] = useState<RouteNode | null>(null);
  const [mode, setMode] = useState<'map' | 'session' | { act: Activity; was: boolean }>(auto ? 'session' : 'map'); const [done, setDone] = useState<Set<string>>(new Set()); const [marker, setMarker] = useState<string | undefined>();
  const reload = useCallback(async (first = false) => {
    const x = await loadJourney(); setJ(x); setDone(new Set((await all<{ id: string; done?: boolean }>('lessons')).filter((d) => d.done).map((d) => d.id)));
    const cur = x.current?.world.id ?? x.stops[x.stops.length - 1].world.id; const stored = await get<string>('kv', 'markerAt');
    setMarker((m) => m ?? stored ?? cur); setTimeout(() => { setMarker(cur); put('kv', 'markerAt', cur); }, 500); // Karst en Carla reizen naar de nieuwe stop
    if (first && x.current) setLv(x.current.unit.level);
  }, []);
  useEffect(() => { reload(true); if (auto) onAutoUsed(); }, []); // eslint-disable-line
  if (mode === 'session') return <Journey gainXp={gainXp} onExit={() => { setMode('map'); reload(); }} />;
  if (typeof mode === 'object') return <UnitActivity item={mode.act} wasDone={mode.was} gainXp={gainXp} onClose={() => { setMode('map'); reload(); }} />;
  if (!j) return <div className="screen center"><p className="muted">De kaart wordt getekend…</p></div>;
  const nodes = j.route.filter((n) => n.world.region === lv); const mapped = lv === 'A1' || lv === 'A2';
  const startAct = (a: Activity) => setMode({ act: a, was: done.has(a.kind === 'lesson' ? a.lesson.id : a.text.id) });
  return (
    <div className="screen"><h2>Mijn reis</h2><Arrival stops={j.newStops} onDone={() => reload()} />
      <div className="quick">{LEVELS.map((l) => <button key={l} className={'chip' + (l === lv ? ' on' : '')} onClick={() => { setLv(l); setSel(null); }}>{l}</button>)}</div>
      <p className="muted"><b>{REGIONS[lv].title}</b> – {REGIONS[lv].blurb}</p>
      {mapped ? <WorldMap region={lv as 'A1' | 'A2'} nodes={nodes} selectedId={sel?.id} markerId={marker} onSelect={setSel} />
        : <div className="card">{nodes.map((n) => <div className="act" key={n.id}><span>{n.state === 'undiscovered' ? '❔ Nog niet ontdekt' : `📍 ${n.world.name}`} <span className="muted">{n.state === 'reached' ? '· bereikt' : ''}</span></span><button className="chip" onClick={() => setSel(n)}>Bekijk</button></div>)}<p className="muted">De kaart van dit deel van de wereld volgt in een volgende versie.</p></div>}
      <button className="primary" onClick={() => setMode('session')}>Start sessie · ± 5 min</button>
      {sel && <Sheet n={sel} done={done} start={startAct} />}
    </div>);
}
