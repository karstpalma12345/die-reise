// De wereldreis als data: elke unit is een stop, plus tussenstops (waypoints) zonder lessen.
// Nieuwe landen of steden toevoegen = een regel in WORLD (op de plek in de route). De kaart en de motor lezen alles hieruit.
import type { Level } from './curriculum';
export interface WorldStop { id: string; unit?: string; name: string; country: string; region: Level; lat: number; lon: number; landmark: string; kind: 'unit' | 'waypoint'; provisional?: boolean }
const u = (unit: string, name: string, country: string, lat: number, lon: number, landmark: string, provisional = false): WorldStop => ({ id: unit, unit, name, country, region: unit.slice(0, 2) as Level, lat, lon, landmark, kind: 'unit', provisional });
const wp = (id: string, name: string, country: string, lat: number, lon: number, landmark: string, region: Level): WorldStop => ({ id, name, country, region, lat, lon, landmark, kind: 'waypoint' });
export const REGIONS: Record<Level, { title: string; blurb: string }> = {
  A1: { title: 'Van de vijver naar de grens', blurb: 'Karst verlaat zijn vijver en reist met Carla richting de Duitse grens.' },
  A2: { title: 'Duitsland', blurb: 'Door Duitsland, met Berlijn als hart van het verhaal.' },
  B1: { title: 'Europa', blurb: 'Oostenrijk, Zwitserland en daarna de grote steden van Europa.' },
  B2: { title: 'De wereld', blurb: 'Een internationale reis. Duits blijft hun gezamenlijke taal.' },
};
// A1: fictieve plekken tussen de vijver in de Achterhoek en de grens bij Borken
const A1 = [['De vijver', 'pond'], ['Het dorp', 'village'], ['Het familiehuis', 'house'], ['Het café', 'cafe'], ['Carla’s huis', 'home'], ['Het dorpsplein', 'square'], ['Het station', 'station'], ['De dokter', 'clinic'], ['Het kantoor', 'office'], ['De markt', 'market'], ['Het sportveld', 'sports'], ['De grens', 'border']];
const a1 = A1.map(([name, mark], i) => u(`A1-${String(i + 1).padStart(2, '0')}`, name, 'Nederland', +(52.06 - 0.16 * (i / 11) + 0.025 * Math.sin(i * 1.7)).toFixed(3), +(6.2 + 0.6 * (i / 11)).toFixed(3), mark));
export const WORLD: WorldStop[] = [
  ...a1,
  u('A2-01', 'Borken', 'Duitsland', 51.844, 6.858, 'town'), wp('wp-essen', 'Essen', 'Duitsland', 51.457, 7.012, 'mine', 'A2'), wp('wp-bremen', 'Bremen', 'Duitsland', 53.079, 8.802, 'musicians', 'A2'),
  u('A2-02', 'Berlijn – het station', 'Duitsland', 52.525, 13.369, 'berlin-station'), u('A2-03', 'Berlijn – de praktijk', 'Duitsland', 52.50, 13.33, 'clinic'), u('A2-04', 'Berlijn – de woning', 'Duitsland', 52.49, 13.43, 'home'),
  u('A2-05', 'Berlijn – het kantoor', 'Duitsland', 52.53, 13.41, 'office'), u('A2-06', 'Berlijn – het park', 'Duitsland', 52.51, 13.35, 'park'), u('A2-07', 'Dresden', 'Duitsland', 51.050, 13.738, 'dresden'), u('A2-08', 'München', 'Duitsland', 48.137, 11.575, 'munich'),
  u('B1-01', 'Wenen', 'Oostenrijk', 48.208, 16.373, 'wheel'), u('B1-02', 'Salzburg', 'Oostenrijk', 47.800, 13.044, 'fortress'), u('B1-03', 'Zürich', 'Zwitserland', 47.377, 8.541, 'lake'), u('B1-04', 'Praag', 'Tsjechië', 50.075, 14.438, 'bridge'),
  u('B1-05', 'Barcelona', 'Spanje', 41.385, 2.173, 'sagrada'), u('B1-06', 'Rome', 'Italië', 41.903, 12.496, 'colosseum'), u('B1-07', 'Parijs', 'Frankrijk', 48.857, 2.352, 'eiffel'), u('B1-08', 'Londen', 'Verenigd Koninkrijk', 51.507, -0.128, 'bigben'),
  // B2 is voorlopig: Chicago, Thailand en Australië staan vast; de rest werken we later uit met het verhaal.
  u('B2-01', 'Chicago', 'Verenigde Staten', 41.878, -87.630, 'skyline'), u('B2-02', 'San Francisco', 'Verenigde Staten', 37.775, -122.419, 'goldengate', true), u('B2-03', 'Tokio', 'Japan', 35.682, 139.692, 'tokyo', true), u('B2-04', 'Bangkok', 'Thailand', 13.756, 100.502, 'temple'),
  u('B2-05', 'Chiang Mai', 'Thailand', 18.788, 98.985, 'temple'), u('B2-06', 'Sydney', 'Australië', -33.869, 151.209, 'opera'), u('B2-07', 'Melbourne', 'Australië', -37.814, 144.963, 'trams', true), u('B2-08', 'Uluru', 'Australië', -25.344, 131.036, 'rock', true),
];
export const stopOfUnit = (unit: string) => WORLD.find((w) => w.unit === unit);
