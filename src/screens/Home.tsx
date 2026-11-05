import { Duo } from '../components/Characters';
import type { Profile } from '../profile';
import type { Tab } from '../App';

export default function Home({ profile, go }: { profile: Profile; go: (t: Tab) => void }) {
  const pct = Math.min(100, Math.round((profile.todayXp / profile.dailyGoal) * 100));
  return (
    <div className="screen">
      <section className="hero">
        <Duo size={130} />
        <h1>Die Reise</h1>
        <p className="sub">Karst &amp; Carla – Eine gemeinsame Reise zur deutschen Sprache.</p>
      </section>
      <div className="stats">
        <div className="stat"><b>{profile.level}</b><span>Niveau</span></div>
        <div className="stat"><b>{profile.streak}</b><span>{profile.streak === 1 ? 'dag op rij' : 'dagen op rij'}</span></div>
        <div className="stat"><b>{profile.xp}</b><span>XP</span></div>
      </div>
      <div className="card">
        <div className="row"><strong>Dagdoel</strong><span>{profile.todayXp} / {profile.dailyGoal} XP</span></div>
        <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><i style={{ width: pct + '%' }} /></div>
      </div>
      <button className="primary" onClick={() => go('learn')}>Verder leren</button>
      <div className="card story">
        <strong>Volgende gebeurtenis</strong>
        <p>Hoofdstuk 1: Karst ontmoet Carla bij de vijver. Beschikbaar zodra de verhaalmodus klaar is (fase 3).</p>
      </div>
      <div className="quick">
        {([['learn', 'Woorden & grammatica'], ['speak', 'Spreken'], ['progress', 'Voortgang']] as [Tab, string][]).map(([t, l]) =>
          <button key={t} className="chip" onClick={() => go(t)}>{l}</button>)}
      </div>
    </div>
  );
}
