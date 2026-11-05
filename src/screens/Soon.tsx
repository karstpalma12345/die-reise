import { Karst, Carla } from '../components/Characters';
export default function Soon({ title, who, text, phase }: { title: string; who: 'karst' | 'carla'; text: string; phase: string }) {
  return (
    <div className="screen center">
      {who === 'karst' ? <Karst size={110} mood="thinking" /> : <Carla size={110} mood="thinking" />}
      <h2>{title}</h2>
      <p>{text}</p>
      <p className="muted">Wordt gebouwd in {phase}. Deze pagina bevat nog geen oefeningen.</p>
    </div>
  );
}
