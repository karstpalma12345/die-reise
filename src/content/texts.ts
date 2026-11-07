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
  { id: 'txt-a1-04-cafe', unit: 'A1-04', title: 'Im Café',
    lines: [
      { who: 'Carla', de: 'Guten Tag! Was möchtest du, Karst?', nl: 'Goedendag! Wat wil je, Karst?' }, { who: 'Karst', de: 'Ich möchte einen Kaffee und ein Stück Kuchen, bitte.', nl: 'Ik wil graag een koffie en een stuk taart, alsjeblieft.' },
      { who: 'Carla', de: 'Gern! Möchtest du auch Wasser?', nl: 'Graag! Wil je ook water?' }, { who: 'Karst', de: 'Nein, danke.', nl: 'Nee, bedankt.' },
      { who: 'Carla', de: 'Hier ist dein Kaffee.', nl: 'Hier is je koffie.' }, { who: 'Karst', de: 'Danke! Der Kuchen ist sehr lecker.', nl: 'Bedankt! De taart is erg lekker.' }],
    questions: [q('t4-1', 'Wat bestelt Karst?', ['koffie en een stuk taart', 'water en brood', 'thee en soep'], 'koffie en een stuk taart', '"einen Kaffee und ein Stück Kuchen"'),
      q('t4-2', 'Wil Karst ook water?', ['Nee', 'Ja', 'Hij weet het niet'], 'Nee', 'Karst zegt: "Nein, danke."'),
      q('t4-3', 'Hoe vindt Karst de taart?', ['lekker', 'koud', 'duur'], 'lekker', '"lecker" = lekker.'),
      q('t4-4', 'Wat betekent "Hier ist dein Kaffee"?', ['Hier is je koffie.', 'Wil je koffie?', 'De koffie is heet.'], 'Hier is je koffie.', '"dein" = jouw, "hier ist" = hier is.')] },
  { id: 'txt-a1-05-wohnung', unit: 'A1-05', title: 'Carlas Wohnung',
    lines: [
      { who: 'Karst', de: 'Wow, deine Wohnung ist schön!', nl: 'Wow, wat is je woning mooi!' }, { who: 'Carla', de: 'Danke! Hier ist das Wohnzimmer. Das Sofa ist neu.', nl: 'Bedankt! Hier is de woonkamer. De bank is nieuw.' },
      { who: 'Karst', de: 'Und wo ist die Küche?', nl: 'En waar is de keuken?' }, { who: 'Carla', de: 'Die Küche ist dort. Sie ist hell und klein.', nl: 'De keuken is daar. Ze is licht en klein.' },
      { who: 'Karst', de: 'Hast du auch einen Balkon?', nl: 'Heb je ook een balkon?' }, { who: 'Carla', de: 'Ja, der Balkon ist klein, aber gemütlich.', nl: 'Ja, het balkon is klein, maar gezellig.' }],
    questions: [q('t5-1', 'Wat is nieuw?', ['de bank', 'de keuken', 'het balkon'], 'de bank', '"Das Sofa ist neu."'),
      q('t5-2', 'Hoe is de keuken?', ['licht en klein', 'donker en groot', 'oud en gezellig'], 'licht en klein', '"hell und klein"'),
      q('t5-3', 'Hoe is het balkon?', ['klein, maar gezellig', 'groot en licht', 'nieuw en duur'], 'klein, maar gezellig', '"klein, aber gemütlich"'),
      q('t5-4', 'Wat vraagt Karst over een balkon?', ['of Carla een balkon heeft', 'hoe groot het balkon is', 'wie het balkon schoonmaakt'], 'of Carla een balkon heeft', '"Hast du auch einen Balkon?"')] },
];
