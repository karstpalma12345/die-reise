import { Duo, Carla } from '../components/Characters';
import Pond from '../components/Pond';
import type { Profile } from '../profile';
import type { Tab } from '../App';

export default function Home({ profile, go }: { profile: Profile; go: (t: Tab) => void }) {
  const pct = Math.min(100, Math.round((profile.todayXp / profile.dailyGoal) * 100));
  const away = profile.lastActiveDay ? Math.round((Date.now() - new Date(profile.lastActiveDay + 'T12:00:00').getTime()) / 86400000) : 0;
  const back = away >= 3; // een paar dagen weggeweest: Carla begroet je enthousiast
  return (
    <div className="screen">
      {back && <div className="welcome"><Carla size={52} mood="cheer" /><div><b>„Schön, dich wiederzusehen!“</b><br /><span className="muted">Fijn je weer te zien! Carla heeft je gemist.</span></div></div>}
      <section className="hero"><Pond /><h1>Die Reise</h1><p className="sub">Karst &amp; Carla – Eine gemeinsame Reise zur deutschen Sprache.</p><Duo size={128} mood={back ? 'cheer' : 'happy'} /></section>
      <button className="primary big" onClick={() => go('journey')}>Verder met je reis</button>
      <div className="panel">
        <div className="row"><div className="pads" aria-label={`${profile.streak} dagen op rij`}>{[0, 1, 2, 3, 4, 5, 6].map((n) => <span key={n} className={'pad' + (n < Math.min(profile.streak, 7) ? ' on' : '')} />)}
          <span className="muted">{profile.streak} {profile.streak === 1 ? 'dag' : 'dagen'} op rij</span></div><span className="pill">{profile.level} · {profile.xp} XP</span></div>
        <div><div className="row small"><span>Dagdoel</span><span>{profile.todayXp} / {profile.dailyGoal} XP</span></div>
          <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><i style={{ width: pct + '%' }} /></div></div>
      </div>
      <div className="quick"><button className="chip" onClick={() => go('practice')}>Zelf oefenen</button><button className="chip" onClick={() => go('progress')}>Voortgang</button></div>
    </div>);
}
