import { useEffect, useState } from 'react';
import Home from './screens/Home';
import Soon from './screens/Soon';
import Learn from './screens/Learn';
import Journey from './screens/Journey';
import Progress from './screens/Progress';
import { loadProfile, defaultProfile, addXp, type Profile, type Level } from './profile';
import { requestPersistence, put } from './db';
import { registerSW, applyUpdate } from './sw';

export type Tab = 'home' | 'journey' | 'practice' | 'progress';
const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' }, { id: 'journey', label: 'Mijn reis', icon: '🧭' },
  { id: 'practice', label: 'Oefenen', icon: '📚' }, { id: 'progress', label: 'Voortgang', icon: '📈' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [profile, setProfile] = useState<Profile>(defaultProfile());
  const [error, setError] = useState('');
  const [upd, setUpd] = useState<ServiceWorker | null>(null);
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => { registerSW(setUpd); const on = () => setOnline(true), off = () => setOnline(false); window.addEventListener('online', on); window.addEventListener('offline', off); return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); }; }, []);
  useEffect(() => {
    loadProfile().then(setProfile).catch(() => setError('Opslaan op dit apparaat lukt niet. Open de app in Safari (niet in privémodus).'));
    requestPersistence();
  }, []);
  const gainXp = async (n: number) => setProfile(await addXp(profile, n));
  const setLevel = async (level: Level) => { const n = { ...profile, level }; await put('kv', 'profile', n); setProfile(n); };
  return (
    <div className="app">
      {error && <div className="error">{error}</div>}
      {upd && <div className="update">Er is een nieuwe versie beschikbaar. <button className="chip" onClick={() => applyUpdate(upd)}>Vernieuwen</button></div>}
      {!online && <div className="offline">Offline: je kunt gewoon verder oefenen. Je voortgang blijft op je toestel bewaard.</div>}
      <main>
        {tab === 'home' && <Home profile={profile} go={setTab} />}
        {tab === 'journey' && <Journey gainXp={gainXp} onExit={() => setTab('home')} />}
        {tab === 'practice' && <Learn gainXp={gainXp} setLevel={setLevel} />}
        {tab === 'progress' && <Progress />}
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
