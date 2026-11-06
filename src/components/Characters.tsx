// Karst (axolotl) en Carla (kikker): SVG in losse lagen. De animaties staan in styles.css (alleen CSS-transforms, licht voor iPhone).
export type Mood = 'happy' | 'thinking' | 'cheer' | 'oops';
interface P { size?: number; mood?: Mood; delay?: string }
const ink = '#17424a';
const arc = (x: number, y: number, r: number) => `M${x - r} ${y + 3}q${r} ${-r * 1.7} ${r * 2} 0`;
function Eyes({ xs, y, r, mood, delay, sclera }: { xs: number[]; y: number; r: number; mood: Mood; delay?: string; sclera?: number }) {
  return <>{xs.map((x) => mood === 'cheer'
    ? <path key={x} d={arc(x, y, r)} fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
    : <g key={x} className="eye" style={{ animationDelay: delay }}>{sclera && <circle cx={x} cy={y} r={sclera} fill="#fff" />}
        <circle cx={x} cy={y} r={r} fill={ink} /><circle cx={x + r * 0.3} cy={y - r * 0.35} r={r * 0.32} fill="#fff" /></g>)}</>;
}
function Brows({ xs, y, mood }: { xs: number[]; y: number; mood: Mood }) {
  const p = { stroke: ink, strokeWidth: 3.5, strokeLinecap: 'round' as const, fill: 'none' };
  if (mood === 'thinking') return <g {...p}><path d={`M${xs[0] - 9} ${y}l16 -6`} /><path d={`M${xs[1] - 8} ${y}h16`} /></g>;
  if (mood === 'oops') return <g {...p}><path d={`M${xs[0] - 8} ${y}l16 -6`} /><path d={`M${xs[1] + 8} ${y}l-16 -6`} /></g>;
  return null;
}
function Mouth({ x, y, w, mood }: { x: number; y: number; w: number; mood: Mood }) {
  const p = { stroke: ink, strokeWidth: 4.5, strokeLinecap: 'round' as const };
  if (mood === 'cheer') return <path d={`M${x - w} ${y}q${w} ${w * 1.5} ${w * 2} 0z`} fill="#c94f6b" {...p} strokeLinejoin="round" />;
  if (mood === 'thinking') return <path d={`M${x - w * 0.6} ${y + 3}q${w * 0.6} -3 ${w * 1.4} -4`} fill="none" {...p} />;
  if (mood === 'oops') return <ellipse cx={x} cy={y + 3} rx="5" ry="6" fill={ink} />;
  return <path d={`M${x - w} ${y}q${w} ${w * 0.9} ${w * 2} 0`} fill="none" {...p} />;
}
const Dots = () => <g className="dots" fill="#f6b94b"><circle cx="128" cy="30" r="3" /><circle cx="140" cy="18" r="4" /><circle cx="154" cy="8" r="5" /></g>;

export function Karst({ size = 120, mood = 'happy', delay = '0s' }: P) {
  const gills = (m: number) => (<><path d={`M${m ? 124 : 36} 70L${m ? 150 : 10} 52M${m ? 128 : 32} 84L${m ? 156 : 4} 84M${m ? 124 : 36} 98L${m ? 150 : 10} 116`} stroke="#e8607e" strokeWidth="8" strokeLinecap="round" fill="none" />
    <g fill="#e8607e">{[[10, 52], [4, 84], [10, 116]].map(([x, y]) => <circle key={y} cx={m ? 160 - x : x} cy={y} r="6" />)}</g></>);
  return (
    <svg className={`ch m-${mood}`} style={{ animationDelay: delay }} width={size} height={size} viewBox="0 0 160 160" role="img" aria-label="Karst, de axolotl">
      <g className="gl">{gills(0)}</g><g className="gr">{gills(1)}</g>
      <g className="c-body" style={{ animationDelay: delay }}>
        <ellipse cx="80" cy="84" rx="56" ry="48" fill="#f9bccb" />
        <circle cx="44" cy="96" r="7" fill="#f28fa6" opacity=".65" /><circle cx="116" cy="96" r="7" fill="#f28fa6" opacity=".65" />
        <Eyes xs={[58, 102]} y={78} r={7} mood={mood} delay={delay} /><Brows xs={[58, 102]} y={64} mood={mood} />
        <Mouth x={80} y={98} w={14} mood={mood} />
        <path d="M42 126q38 18 76 0v16q-38 16 -76 0z" fill="#137f86" /><path d="M62 136v14M82 140v14" stroke="#fff" strokeWidth="3" opacity=".45" />
      </g>
      {mood === 'thinking' && <Dots />}
    </svg>);
}
export function Carla({ size = 120, mood = 'happy', delay = '0s' }: P) {
  return (
    <svg className={`ch m-${mood}`} style={{ animationDelay: delay }} width={size} height={size} viewBox="0 0 160 160" role="img" aria-label="Carla, de kikker">
      <g className="c-body" style={{ animationDelay: delay }}>
        <ellipse cx="80" cy="96" rx="58" ry="46" fill="#7cc576" />
        <circle cx="50" cy="56" r="22" fill="#7cc576" /><circle cx="110" cy="56" r="22" fill="#7cc576" />
        <Eyes xs={[50, 110]} y={57} r={7} sclera={14} mood={mood} delay={delay} />
        <g stroke={ink} strokeWidth="3" strokeLinecap="round"><path d="M34 46l-8 -5M40 38l-4 -9M126 46l8 -5M120 38l4 -9" /></g>
        <Brows xs={[50, 110]} y={30} mood={mood} />
        <circle cx="38" cy="104" r="7" fill="#f4a0a0" opacity=".6" /><circle cx="122" cy="104" r="7" fill="#f4a0a0" opacity=".6" />
        <Mouth x={80} y={106} w={18} mood={mood} />
        <g transform="translate(122 26)">{[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 10} cy={Math.sin((a * Math.PI) / 180) * 10} r="5.5" fill="#fff" stroke="#f6b94b" strokeWidth="1.5" />)}<circle r="5" fill="#f6b94b" /></g>
      </g>
    </svg>);
}
export function Duo({ size = 140, mood = 'happy' }: { size?: number; mood?: Mood }) {
  return <div className="duo"><Karst size={size} mood={mood} /><Carla size={size} mood={mood} delay="1.3s" /></div>;
}
