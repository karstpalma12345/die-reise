import { Duo } from '../components/Characters';
import type { Profile } from '../profile';
import type { Tab } from '../App';

export default function Home({ profile, go }: { profile: Profile; go: (t: Tab) => void }) {
  const pct = Math.min(100, Math.round((profile.todayXp / profile.dailyGoal) * 100));
  return (
    <div className="screen">
      <section className="hero"><Duo size={130} /><h1>Die Reise</h1>
        <p className="sub">Karst &amp; Carla – Eine gemeinsame Reise zur deutschen Sprache.</p></section>
      <button className="primary" onClick={() => go('journey')}>Verder met je reis · ± 5 min</button>
      <div className="stats">
        <div className="stat"><b>{profile.level}</b><span>Niveau</span></div>
        <div className="stat"><b>{profile.streak}</b><span>{profile.streak === 1 ? 'dag op rij' : 'dagen op rij'}</span></div>
        <div className="stat"><b>{profile.xp}</b><span>XP</span></div>
      </div>
      <div className="card"><div className="row"><strong>Dagdoel</strong><span>{profile.todayXp} / {profile.dailyGoal} XP</span></div>
        <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><i style={{ width: pct + '%' }} /></div></div>
      <div className="card story"><strong>Karst &amp; Carla</strong><p>Hun verhaal komt straks als korte scènes tussen je oefeningen door. Dat is nog in aanbouw.</p></div>
      <div className="quick"><button className="chip" onClick={() => go('practice')}>Zelf oefenen</button><button className="chip" onClick={() => go('progress')}>Voortgang</button></div>
    </div>);
}
