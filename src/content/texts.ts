// Leesteksten en dialogen met begripsvragen. Een tekst hoort bij een unit (zie curriculum.ts).
// Een tekst komt aan de beurt zodra de grammaticalessen van zijn unit zijn afgerond.
import type { Ex } from '../exercises';
export interface TextItem { id: string; unit: string; title: string; lines: { who?: 'Karst' | 'Carla'; de: string; nl: string }[]; questions: Ex[] }
const q = (id: string, prompt: string, options: string[], answer: string, explain: string): Ex => ({ id: `rd-${id}`, kind: 'mc', prompt, options, answers: [answer], explain, topic: 'Lezen', category: 'reading' });
export const TEXTS: TextItem[] = [
  { id: 'txt-a1-01-teich', unit: 'A1-01', title: 'Karst ontmoet Carla',
    lines: [
      { who: 'Carla', de: 'Hallo! Ich bin Carla.', nl: 'Hallo! Ik ben Carla.' }, { who: 'Karst', de: 'Hallo, Carla! Ich heiße Karst.', nl: 'Hallo, Carla! Ik heet Karst.' },
      { who: 'Carla', de: 'Wie geht es dir?', nl: 'Hoe gaat het met je?' }, { who: 'Karst', de: 'Gut, danke. Und dir?', nl: 'Goed, bedankt. En met jou?' }, { who: 'Carla', de: 'Auch gut, danke!', nl: 'Ook goed, bedankt!' }],
    questions: [q('t1-1', 'Hoe heet de kikker?', ['Carla', 'Karst', 'Karl'], 'Carla', 'Carla zegt: "Ich bin Carla."'),
      q('t1-2', 'Hoe gaat het met Karst?', ['goed', 'moe', 'ziek'], 'goed', 'Karst zegt: "Gut, danke."'),
      q('t1-3', 'Wat betekent "Und dir?"', ['En met jou?', 'Waar woon je?', 'Hoe heet je?'], 'En met jou?', '"Und dir?" = en met jou? (terugvraag)')] },
  { id: 'txt-a1-02-woher', unit: 'A1-02', title: 'Waar kom je vandaan?',
    lines: [
      { who: 'Carla', de: 'Woher kommst du, Karst?', nl: 'Waar kom je vandaan, Karst?' }, { who: 'Karst', de: 'Ich komme aus Holland.', nl: 'Ik kom uit Nederland.' },
      { who: 'Carla', de: 'Ich komme aus Deutschland. Ich wohne am Teich.', nl: 'Ik kom uit Duitsland. Ik woon bij de vijver.' }, { who: 'Karst', de: 'Sprichst du Niederländisch?', nl: 'Spreek je Nederlands?' },
      { who: 'Carla', de: 'Ein bisschen. Und du, sprichst du Deutsch?', nl: 'Een beetje. En jij, spreek jij Duits?' }, { who: 'Karst', de: 'Nein, noch nicht. Aber ich lerne!', nl: 'Nee, nog niet. Maar ik leer het!' }],
    questions: [q('t2-1', 'Waar komt Carla vandaan?', ['Duitsland', 'Nederland', 'Oostenrijk'], 'Duitsland', 'Carla: "Ich komme aus Deutschland."'),
      q('t2-2', 'Waar woont Carla?', ['bij de vijver', 'in Berlijn', 'in de stad'], 'bij de vijver', '"am Teich" = bij de vijver.'),
      q('t2-3', 'Spreekt Karst al Duits?', ['Nee, nog niet', 'Ja, een beetje', 'Ja, vloeiend'], 'Nee, nog niet', 'Karst: "Nein, noch nicht."'),
      q('t2-4', 'Wat betekent "Ein bisschen"?', ['een beetje', 'veel', 'niets'], 'een beetje', '"ein bisschen" = een beetje.')] },
  { id: 'txt-a1-03-familie', unit: 'A1-03', title: 'Een bericht van Carla',
    lines: [
      { who: 'Carla', de: 'Hallo Karst! Das ist meine Familie.', nl: 'Hallo Karst! Dit is mijn familie.' }, { who: 'Carla', de: 'Meine Mutter heißt Anna. Sie kocht gern Suppe.', nl: 'Mijn moeder heet Anna. Ze kookt graag soep.' },
      { who: 'Carla', de: 'Mein Bruder heißt Jonas. Er ist sehr lustig.', nl: 'Mijn broer heet Jonas. Hij is erg grappig.' }, { who: 'Carla', de: 'Das ist meine Katze Mia. Sie schläft viel.', nl: 'Dit is mijn kat Mia. Ze slaapt veel.' },
      { who: 'Carla', de: 'Hast du auch Geschwister?', nl: 'Heb jij ook broers of zussen?' }],
    questions: [q('t3-1', 'Hoe heet Carla’s moeder?', ['Anna', 'Mia', 'Jonas'], 'Anna', '"Meine Mutter heißt Anna."'),
      q('t3-2', 'Wie is erg grappig?', ['haar broer', 'haar moeder', 'de kat'], 'haar broer', '"Mein Bruder ... ist sehr lustig."'),
      q('t3-3', 'Wat doet Mia vooral?', ['slapen', 'koken', 'zwemmen'], 'slapen', '"Sie schläft viel." (sie = de kat)'),
      q('t3-4', 'Wat vraagt Carla aan het eind?', ['of Karst broers of zussen heeft', 'waar Karst woont', 'hoe oud Karst is'], 'of Karst broers of zussen heeft', '"Geschwister" = broers en zussen.')] },
];
