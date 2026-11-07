import { useEffect, useState } from 'react';
import { Duo, Carla } from '../components/Characters';
import Arrival from '../components/Arrival';
import { loadJourney, type Journey } from '../journey';
import Pond from '../components/Pond';
import type { Profile } from '../profile';
import type { Tab } from '../App';

export default function Home({ profile, go }: { profile: Profile; go: (t: Tab) => void }) {
  const [j, setJ] = useState<Journey | null>(null);
  const reload = () => { loadJourney().then(setJ); };
  useEffect(() => { reload(); }, []);
  const away = profile.lastActiveDay ? Math.round((Date.now() - new Date(profile.lastActiveDay + 'T12:00:00').getTime()) / 86400000) : 0;
  const back = away >= 3; // een paar dagen weggeweest: Carla begroet je enthousiast
  return (
    <div className="screen">
      {back && <div className="welcome"><Carla size={52} mood="cheer" /><div><b>„Schön, dich wiederzusehen!“</b><br /><span className="muted">Fijn je weer te zien! Carla heeft je gemist.</span></div></div>}
      <Arrival stops={j?.newStops ?? []} onDone={reload} />
      <section className="hero"><Pond /><h1>Die Reise</h1><p className="sub">Karst &amp; Carla – Eine gemeinsame Reise zur deutschen Sprache.</p><Duo size={128} mood={back ? 'cheer' : 'happy'} /></section>
      <button className="primary big" onClick={() => go('journey')}>Verder met je reis</button>
      <div className="panel">
        {j?.current && <div><div className="row small"><span>Volgende stop: <b>{j.current.place}</b></span><span>{Math.round(j.current.progress * 100)}%</span></div>
          <div className="bar" role="progressbar" aria-valuenow={Math.round(j.current.progress * 100)} aria-valuemin={0} aria-valuemax={100}><i style={{ width: j.current.progress * 100 + '%' }} /></div>
          <span className="muted small">{j.current.unit.title} · nog {j.current.todo.join(', ') || 'bijna klaar'}</span></div>}
        <div className="row"><div className="pads">{(j?.weekDays ?? [false, false, false, false, false, false, false]).map((d, n) => <span key={n} className={'pad' + (d ? ' on' : '')} />)}
          <span className="muted">{j?.weekCount ?? 0} van {j?.goal ?? 4} dagen deze week</span></div><span className="pill">{profile.level}</span></div>
      </div>
      <div className="quick"><button className="chip" onClick={() => go('practice')}>Zelf oefenen</button><button className="chip" onClick={() => go('progress')}>Voortgang</button></div>
    </div>);
}
