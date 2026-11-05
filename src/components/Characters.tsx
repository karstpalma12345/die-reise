export type Mood = 'happy' | 'thinking' | 'cheer';
const ink = '#1f3b3d';
function Mouth({ x, y, w, mood }: { x: number; y: number; w: number; mood: Mood }) {
  const d = mood === 'cheer' ? `M${x - w} ${y}q${w} ${w * 1.3} ${w * 2} 0z` : mood === 'thinking' ? `M${x - w * 0.6} ${y + 4}h${w * 1.2}` : `M${x - w} ${y}q${w} ${w * 0.9} ${w * 2} 0`;
  return <path d={d} fill={mood === 'cheer' ? '#c94f6b' : 'none'} stroke={ink} strokeWidth="5" strokeLinecap="round" />;
}
/** Karst – male axolotl: pink face, feathery gills, small blue scarf. */
export function Karst({ size = 120, mood = 'happy' }: { size?: number; mood?: Mood }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" role="img" aria-label="Karst, de axolotl">
      <g stroke="#e86f8c" strokeWidth="9" strokeLinecap="round">
        <path d="M38 62L12 46M36 82L8 82M40 102L14 118M122 62l26-16M124 82l28 0M120 102l26 16" />
      </g>
      <ellipse cx="80" cy="84" rx="56" ry="50" fill="#f7b4c3" />
      <circle cx="58" cy="76" r="7" fill={ink} /><circle cx="102" cy="76" r="7" fill={ink} />
      <circle cx="60" cy="74" r="2" fill="#fff" /><circle cx="104" cy="74" r="2" fill="#fff" />
      <circle cx="45" cy="94" r="7" fill="#f08aa0" opacity=".6" /><circle cx="115" cy="94" r="7" fill="#f08aa0" opacity=".6" />
      <Mouth x={80} y={96} w={14} mood={mood} />
      <path d="M44 128q36 16 72 0v14q-36 14-72 0z" fill="#3b7ea1" />
    </svg>
  );
}
/** Carla – female frog: green, eyes on top, long lashes, little flower. */
export function Carla({ size = 120, mood = 'happy' }: { size?: number; mood?: Mood }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" role="img" aria-label="Carla, de kikker">
      <ellipse cx="80" cy="92" rx="58" ry="48" fill="#79c06f" />
      <circle cx="50" cy="52" r="22" fill="#79c06f" /><circle cx="110" cy="52" r="22" fill="#79c06f" />
      <circle cx="50" cy="52" r="14" fill="#fff" /><circle cx="110" cy="52" r="14" fill="#fff" />
      <circle cx="53" cy="54" r="7" fill={ink} /><circle cx="107" cy="54" r="7" fill={ink} />
      <g stroke={ink} strokeWidth="3" strokeLinecap="round"><path d="M34 42l-7-5M40 36l-3-8M126 42l7-5M120 36l3-8" /></g>
      <circle cx="40" cy="100" r="7" fill="#f4a0a0" opacity=".6" /><circle cx="120" cy="100" r="7" fill="#f4a0a0" opacity=".6" />
      <Mouth x={80} y={102} w={18} mood={mood} />
      <g transform="translate(118 22)"><circle r="6" fill="#f6b94b" />
        {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 10} cy={Math.sin((a * Math.PI) / 180) * 10} r="5" fill="#fff" stroke="#f6b94b" strokeWidth="1.5" />)}
        <circle r="5" fill="#f6b94b" /></g>
    </svg>
  );
}
export function Duo({ size = 140, mood = 'happy' }: { size?: number; mood?: Mood }) {
  return <div className="duo"><Karst size={size} mood={mood} /><Carla size={size} mood={mood} /></div>;
}
