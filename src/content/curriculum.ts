// Cursuskaart A1–B2. Een unit = een thema met een duidelijk doel ("Ik kan …").
// Nieuwe inhoud koppel je hier aan een unit: woordthema's (topics), grammaticalessen (lessons) en teksten (texts.ts, via unit-id).
// Units zonder topics/lessons/teksten staan als "gepland". C1/C2 kunnen later gewoon als extra niveau worden toegevoegd.
export type Level = 'A1' | 'A2' | 'B1' | 'B2';
export interface Unit { id: string; level: Level; title: string; goal: string; topics: string[]; lessons: string[] }
const u = (level: Level, n: number, title: string, goal: string, topics: string[] = [], lessons: string[] = []): Unit =>
  ({ id: `${level}-${String(n).padStart(2, '0')}`, level, title, goal, topics, lessons });
export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];
export const CURRICULUM: Unit[] = [
  u('A1', 1, 'Hallo!', 'Ik kan groeten en mezelf voorstellen.', ['Begroeting', 'Voorstellen', 'Kleine woorden'], ['gram-artikel', 'gram-sein']),
  u('A1', 2, 'Wie ben jij?', 'Ik kan vragen stellen over naam, herkomst en woonplaats.', ['Vraagwoorden', 'Getallen', 'Taal en leren'], ['gram-werkwoorden', 'gram-zinsbouw']),
  u('A1', 3, 'Familie en vrienden', 'Ik kan mijn familie en vrienden beschrijven.', ['Familie en vrienden', 'Bijvoeglijke naamwoorden'], ['gram-bezit']),
  u('A1', 4, 'Eten en drinken', 'Ik kan zeggen wat ik eet en drink.', ['Eten en drinken'], ['gram-akkusativ', 'gram-moechten']),
  u('A1', 5, 'Thuis', 'Ik kan mijn huis en mijn spullen benoemen.', ['Huis en omgeving', 'Dieren en huis', 'Kleuren', 'Natuur en dieren'], ['gram-esgibt']),
  u('A1', 6, 'Mijn dag', 'Ik kan vertellen wat ik op een dag doe.', ['Tijd', 'Dagelijks leven', 'Werkwoorden'], ['gram-trennbar', 'gram-uhrzeit']),
  u('A1', 7, 'Onderweg', 'Ik kan de weg vragen en reizen regelen.', ['Stad en reizen'], ['gram-weg']),
  u('A1', 8, 'Gevoelens en lichaam', 'Ik kan zeggen hoe ik me voel.', ['Gevoelens', 'Lichaam'], ['gram-befinden']),
  u('A1', 9, 'Werk en afspraken', 'Ik kan over werk en afspraken praten.', ['Werk'], ['gram-beruf']),
  u('A1', 10, 'Boodschappen doen', 'Ik kan iets kopen en betalen.', ['Winkelen', 'Getallen en prijzen'], ['gram-preise']),
  u('A1', 11, 'Kunnen, willen, moeten', 'Ik kan zeggen wat ik wil, kan en moet.', ['Hobbys', 'Modale werkwoorden'], ['gram-modal']),
  u('A1', 12, 'Samen op reis', 'Ik kan een korte reis plannen (A1-afsluiting).', ['Reizen en plannen'], ['gram-imperativ']),
  u('A2', 1, 'Het weekend', 'Ik kan vertellen wat ik gedaan heb (perfectum).', ['Weekend'], ['gram-perfekt-haben', 'gram-perfekt-sein']), u('A2', 2, 'Op reis', 'Ik kan plaatsen en richtingen beschrijven (voorzetsels, datief).', ['Op reis'], ['gram-wo-dativ', 'gram-wohin']),
  u('A2', 3, 'Gezondheid', 'Ik kan bij de dokter uitleggen wat er mis is.', ['Gezondheid'], ['gram-reflexiv', 'gram-arzt']), u('A2', 4, 'Wonen en stad', 'Ik kan mijn woonomgeving beschrijven en vergelijken.', ['Wonen en stad'], ['gram-komparativ', 'gram-adjektiv']),
  u('A2', 5, 'Werk en school', 'Ik kan over mijn werk of studie vertellen.', ['Werk en school'], ['gram-weil', 'gram-dass']), u('A2', 6, 'Vroeger', 'Ik kan over het verleden vertellen (verleden tijd).', ['Vroeger'], ['gram-praet-sein', 'gram-praet-regulier']),
  u('A2', 7, 'Plannen maken', 'Ik kan afspraken maken en uitnodigen.'), u('A2', 8, 'Feesten en tradities', 'Ik kan over feesten en gewoontes vertellen.'),
  u('B1', 1, 'Ervaringen', 'Ik kan uitgebreid over ervaringen vertellen.'), u('B1', 2, 'Mijn mening', 'Ik kan een mening geven en onderbouwen (bijzinnen).'),
  u('B1', 3, 'Nieuws en media', 'Ik kan een nieuwsbericht begrijpen en samenvatten.'), u('B1', 4, 'Studie en carrière', 'Ik kan solliciteren en over plannen praten.'),
  u('B1', 5, 'Reizen en cultuur', 'Ik kan cultuurverschillen beschrijven.'), u('B1', 6, 'Samenleving', 'Ik kan over maatschappelijke thema’s praten (betrekkelijke zinnen).'),
  u('B1', 7, 'Milieu', 'Ik kan een discussie volgen en meedoen.'), u('B1', 8, 'Wensen en dromen', 'Ik kan wensen en hypothesen uiten (Konjunktiv II).'),
  u('B2', 1, 'Argumenteren', 'Ik kan een standpunt verdedigen en tegenargumenten weerleggen.'), u('B2', 2, 'Zakelijk Duits', 'Ik kan zakelijk communiceren (mail, overleg).'),
  u('B2', 3, 'Wetenschap en technologie', 'Ik kan complexe teksten over techniek begrijpen.'), u('B2', 4, 'Maatschappij', 'Ik kan abstracte maatschappelijke onderwerpen bespreken.'),
  u('B2', 5, 'Literatuur en kunst', 'Ik kan teksten en kunst interpreteren.'), u('B2', 6, 'Passief en formele taal', 'Ik kan passiefconstructies en formeel Duits gebruiken.'),
  u('B2', 7, 'Indirecte rede', 'Ik kan weergeven wat anderen zeggen (Konjunktiv I).'), u('B2', 8, 'Nuance en register', 'Ik kan nuances, toon en register bewust kiezen.'),
];
// Een unit is "klaar" als de lessen van deze unit én alle eerdere units zijn afgerond.
export const unitLessonsDone = (unitId: string, done: Set<string>) => { const i = CURRICULUM.findIndex((c) => c.id === unitId); return i >= 0 && CURRICULUM.slice(0, i + 1).every((c) => c.lessons.every((l) => done.has(l))); };
