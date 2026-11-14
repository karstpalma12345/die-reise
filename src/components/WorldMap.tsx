import { useEffect, useMemo, useRef, useState, type PointerEvent as PE } from 'react';
import Symbols, { HAS } from './Symbols';
import { GEO, project, wob, rng, inside, DE, NL, MAINLAND, RIVERS, CITIES } from '../content/geo';
import type { RouteNode } from '../journey';
const MEDAL = { bronze: '🥉', silver: '🥈', gold: '🥇' };
interface Props { region: 'A1' | 'A2'; nodes: RouteNode[]; selectedId?: string; markerId?: string; onSelect: (n: RouteNode) => void }

export default function WorldMap({ region, nodes, selectedId, markerId, onSelect }: Props) {
  const g = GEO[region]; const [v, setV] = useState({ x: 0, y: 0, k: 1 }); const box = useRef<HTMLDivElement>(null);
  const ptr = useRef(new Map<number, [number, number]>()); const travel = useRef(0); const pinch = useRef(0);
  const P = (lat: number, lon: number) => project(g, lat, lon); const ms = region === 'A1' ? 50 : 36;
  const clamp = (x: number, y: number, k: number) => ({ x: Math.min(0, Math.max(g.W - g.W * k, x)), y: Math.min(0, Math.max(g.H - g.H * k, y)), k });
  const toMap = (cx: number, cy: number) => { const r = box.current!.getBoundingClientRect(); const sc = Math.min(r.width / g.W, r.height / g.H); return { x: (cx - r.left - (r.width - g.W * sc) / 2) / sc, y: (cy - r.top - (r.height - g.H * sc) / 2) / sc, sc }; };
  const zoomAt = (cx: number, cy: number, f: number) => setV((o) => { const m = toMap(cx, cy); const k = Math.min(6, Math.max(1, o.k * f)); const r = k / o.k; return clamp(m.x - (m.x - o.x) * r, m.y - (m.y - o.y) * r, k); });
  const zoomCenter = (f: number) => { const r = box.current!.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, f); };
  useEffect(() => { setV({ x: 0, y: 0, k: 1 }); }, [region]);
  useEffect(() => { const el = box.current; if (!el) return; const h = (e: WheelEvent) => { e.preventDefault(); zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.2 : 1 / 1.2); }; el.addEventListener('wheel', h, { passive: false }); return () => el.removeEventListener('wheel', h); }, [region]); // eslint-disable-line
  const down = (e: PE) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); ptr.current.set(e.pointerId, [e.clientX, e.clientY]); travel.current = 0; if (ptr.current.size === 2) { const [a, b] = [...ptr.current.values()]; pinch.current = Math.hypot(a[0] - b[0], a[1] - b[1]); } };
  const move = (e: PE) => {
    const prev = ptr.current.get(e.pointerId); if (!prev) return; const cur: [number, number] = [e.clientX, e.clientY]; ptr.current.set(e.pointerId, cur);
    if (ptr.current.size === 1) { const sc = toMap(0, 0).sc; const dx = cur[0] - prev[0], dy = cur[1] - prev[1]; travel.current += Math.hypot(dx, dy); if (travel.current > 6) setV((o) => clamp(o.x + dx / sc, o.y + dy / sc, o.k)); }
    else if (ptr.current.size === 2) { const [a, b] = [...ptr.current.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch.current) zoomAt((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, d / pinch.current); pinch.current = d; travel.current = 99; }
  };
  const up = (e: PE) => { ptr.current.delete(e.pointerId); pinch.current = 0; };

  const art = useMemo(() => {
    const R = rng(region === 'A1' ? 7 : 11); const pr = (a: number[][]) => a.map(([la, lo]) => project(g, la, lo)); const trees: [number, number][] = [];
    if (region === 'A2') { for (let n = 0; n < 900 && trees.length < 70; n++) { const la = 47.7 + R() * 6.5, lo = 5.8 + R() * 9; if (inside(la, lo, DE) && R() > 0.35) trees.push(project(g, la, lo)); } }
    else { for (let n = 0; n < 200 && trees.length < 46; n++) trees.push([R() * g.W, R() * g.H]); }
    const mts = region === 'A2' ? Array.from({ length: 16 }, (_, i) => project(g, 47.3 + 0.12 * Math.sin(i * 2.1), 7.6 + i * 0.46)) : [];
    return { trees, mts, land: wob(pr(MAINLAND), 14, 3, true), de: wob(pr(DE), 9, 5, true), nl: wob(pr(NL), 8, 9, true), rivers: RIVERS.map((r, i) => wob(pr(r), 10, 20 + i)),
      river1: wob([[0, g.H * 0.62], [g.W * 0.3, g.H * 0.5], [g.W * 0.6, g.H * 0.68], [g.W, g.H * 0.55]], 30, 4), border: [project(g, 51.78, 6.86), project(g, 52.16, 6.86)] };
  }, [region]); // eslint-disable-line
  const route = nodes.map((n) => P(n.world.lat, n.world.lon)); const lastDone = nodes.reduce((m, n, i) => (n.state === 'reached' || n.state === 'current' ? i : m), -1);
  const markIdx = Math.max(0, nodes.findIndex((n) => n.id === (markerId ?? nodes.find((x) => x.state === 'current')?.id))); const mk = route[markIdx] ?? [0, 0];
  const line = (pts: number[][]) => pts.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
  return (
    <div className="mapbox" ref={box} style={{ aspectRatio: `${g.W} / ${g.H}` }} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      <svg viewBox={`0 0 ${g.W} ${g.H}`} width="100%" height="100%" style={{ display: 'block' }} role="img" aria-label={`Kaart van ${region}`}><Symbols />
        <g transform={`translate(${v.x} ${v.y}) scale(${v.k})`}>
          {region === 'A2' ? <>
            <rect width={g.W} height={g.H} fill="#a9d9e6" /><path d={art.land} fill="#f1e4bd" stroke="#d8c58f" strokeWidth="3" /><path d={art.nl} fill="#ecd99c" stroke="#c9ad62" strokeWidth="3" strokeDasharray="8 5" /><path d={art.de} fill="#cfe5a4" stroke="#8fb460" strokeWidth="3" strokeDasharray="8 5" />
            {art.rivers.map((d, i) => <path key={i} d={d} fill="none" stroke="#7fc4dc" strokeWidth="5" strokeLinecap="round" />)}
            {art.mts.map(([x, y], i) => <use key={'m' + i} href="#lm-mountain" x={x - 20} y={y - 20} width="40" height="40" opacity=".9" />)}
            {art.trees.map(([x, y], i) => <use key={'t' + i} href="#lm-tree" x={x - 10} y={y - 10} width="20" height="20" opacity=".85" />)}
            {CITIES.map(([n, la, lo]) => { const [x, y] = P(la, lo); return <g key={n} opacity=".7"><circle cx={x} cy={y} r="4" fill="#8a7a5a" /><text x={x + 7} y={y + 4} fontSize="14" fill="#6b5a3a">{n}</text></g>; })}
            <text x={g.W * 0.43} y={g.H * 0.3} fontSize="30" fill="#7a9b52" opacity=".55" fontWeight="700" letterSpacing="6">DUITSLAND</text><text x={g.W * 0.03} y={g.H * 0.24} fontSize="22" fill="#a68a3c" opacity=".6" fontWeight="700">NEDERLAND</text>
          </> : <>
            <rect width={g.W} height={g.H} fill="#d8e8ac" /><path d={art.river1} fill="none" stroke="#7fc4dc" strokeWidth="14" strokeLinecap="round" opacity=".9" />
            <rect x={art.border[0][0]} y="0" width={g.W - art.border[0][0]} height={g.H} fill="#cfe5a4" opacity=".55" /><line x1={art.border[0][0]} y1="0" x2={art.border[0][0]} y2={g.H} stroke="#c0563f" strokeWidth="4" strokeDasharray="14 8" />
            {art.trees.map(([x, y], i) => <use key={i} href="#lm-tree" x={x - 14} y={y - 14} width="28" height="28" opacity=".8" />)}
            <text x="24" y="40" fontSize="26" fill="#7a9b52" fontWeight="700" opacity=".7">NEDERLAND</text><text x={g.W - 190} y="40" fontSize="26" fill="#a68a3c" fontWeight="700" opacity=".8">DUITSLAND</text></>}
          {route.length > 1 && <polyline points={line(route)} fill="none" stroke="#a98b5a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 10" opacity=".8" />}
          {lastDone > 0 && <polyline points={line(route.slice(0, lastDone + 1))} fill="none" stroke="#e0574a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />}
          {nodes.map((n, i) => { const [x, y] = route[i]; const un = n.state === 'undiscovered'; const sel = n.id === selectedId; const wpt = n.world.kind === 'waypoint'; const z = wpt ? ms * 0.78 : ms; const lm = HAS.has(n.world.landmark) ? n.world.landmark : 'pin';
            const ring = n.state === 'current' ? '#ff8a6b' : n.state === 'reached' ? '#f6b94b' : n.state === 'available' ? '#137f86' : '#b7c3c6';
            return <g key={n.id} transform={`translate(${x} ${y})`} onClick={() => { if (travel.current <= 6) onSelect(n); }} style={{ cursor: 'pointer' }} opacity={un ? 0.6 : 1}>
              <circle r={z * 0.95} fill="transparent" /><circle r={z * 0.66} fill="#fff8e6" stroke={sel ? '#17424a' : ring} strokeWidth={sel ? 6 : n.state === 'current' ? 6 : 4} strokeDasharray={n.state === 'available' ? '6 5' : undefined} />
              {un ? <text textAnchor="middle" dy=".36em" fontSize={z * 0.6} fontWeight="700" fill="#6b7a80">?</text> : <use href={`#lm-${lm}`} x={-z * 0.5} y={-z * 0.5} width={z} height={z} />}
              {n.stop?.medal && <text x={z * 0.42} y={-z * 0.4} fontSize={z * 0.5}>{MEDAL[n.stop.medal]}</text>}
              {!un && <text y={z * 1.02} textAnchor="middle" fontSize={z * 0.4} fontWeight="700" fill="#4a3a28" stroke="#fff6e0" strokeWidth={z * 0.14} paintOrder="stroke">{n.world.name}</text>}</g>; })}
          <g style={{ transform: `translate(${mk[0]}px, ${mk[1] - ms * 0.95}px)`, transition: 'transform 1.4s ease-in-out', pointerEvents: 'none' }}><g className="bob">
            <use href="#k-mini" x={-ms * 0.62} y={-ms * 0.3} width={ms * 0.62} height={ms * 0.62} /><use href="#c-mini" x={0} y={-ms * 0.3} width={ms * 0.62} height={ms * 0.62} /></g></g>
        </g>
      </svg>
      <div className="mapctl"><button onClick={() => zoomCenter(1.4)} aria-label="Inzoomen">＋</button><button onClick={() => zoomCenter(1 / 1.4)} aria-label="Uitzoomen">－</button><button onClick={() => setV({ x: 0, y: 0, k: 1 })} aria-label="Hele kaart">⟲</button></div>
    </div>);
}
