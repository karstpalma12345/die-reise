import { useEffect, useState } from 'react';
import Home from './screens/Home';
import Soon from './screens/Soon';
import { loadProfile, defaultProfile, type Profile } from './profile';
import { requestPersistence } from './db';

export type Tab = 'home' | 'learn' | 'story' | 'speak' | 'progress';
const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' }, { id: 'learn', label: 'Leren', icon: '📚' },
  { id: 'story', label: 'Verhaal', icon: '📖' }, { id: 'speak', label: 'Spreken', icon: '🎤' },
  { id: 'progress', label: 'Voortgang', icon: '📈' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [profile, setProfile] = useState<Profile>(defaultProfile());
  const [error, setError] = useState('');
  useEffect(() => {
    loadProfile().then(setProfile).catch(() => setError('Opslaan op dit apparaat lukt niet. Open de app in Safari (niet in privémodus).'));
    requestPersistence();
  }, []);
  return (
    <div className="app">
      {error && <div className="error">{error}</div>}
      <main>
        {tab === 'home' && <Home profile={profile} go={setTab} />}
        {tab === 'learn' && <Soon who="karst" title="Leren" text="Hier komen woorden, grammatica, luisteren en lezen." phase="fase 2" />}
        {tab === 'story' && <Soon who="carla" title="Verhaal" text="Hier ontmoet Karst Carla en groeit hun gesprek mee met jouw Duits." phase="fase 3" />}
        {tab === 'speak' && <Soon who="carla" title="Spreken" text="Hier oefen je hardop met Carla: luisteren, nazeggen en opnemen." phase="fase 4" />}
        {tab === 'progress' && <Soon who="karst" title="Voortgang" text="Hier zie je je niveau, je aandachtspunten en je resultaten." phase="fase 5" />}
      </main>
      <nav aria-label="Hoofdmenu">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)} aria-current={tab === t.id ? 'page' : undefined}>
            <span aria-hidden>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
