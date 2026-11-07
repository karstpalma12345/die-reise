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
  { id: 'txt-a1-06-tag', unit: 'A1-06', title: 'Karsts Tag',
    lines: [
      { who: 'Karst', de: 'Mein Tag beginnt um sieben Uhr.', nl: 'Mijn dag begint om zeven uur.' }, { who: 'Karst', de: 'Ich stehe auf und dusche.', nl: 'Ik sta op en douche.' },
      { who: 'Karst', de: 'Um acht Uhr frühstücke ich. Ich trinke immer Kaffee.', nl: 'Om acht uur ontbijt ik. Ik drink altijd koffie.' }, { who: 'Karst', de: 'Am Nachmittag lerne ich Deutsch.', nl: 'In de namiddag leer ik Duits.' },
      { who: 'Karst', de: 'Am Abend sehe ich fern.', nl: 'S avonds kijk ik tv.' }, { who: 'Karst', de: 'Und du, Carla? Wie ist dein Tag?', nl: 'En jij, Carla? Hoe is jouw dag?' }],
    questions: [q('t6-1', 'Hoe laat begint Karsts dag?', ['om zeven uur', 'om acht uur', 'om negen uur'], 'om zeven uur', '"Mein Tag beginnt um sieben Uhr."'), q('t6-2', 'Wat drinkt Karst altijd?', ['koffie', 'thee', 'water'], 'koffie', '"Ich trinke immer Kaffee."'),
      q('t6-3', 'Wat doet Karst in de namiddag?', ['Duits leren', 'tv kijken', 'boodschappen doen'], 'Duits leren', '"Am Nachmittag lerne ich Deutsch."'), q('t6-4', 'Wat betekent "Ich sehe fern"?', ['Ik kijk tv.', 'Ik zie ver.', 'Ik ga naar huis.'], 'Ik kijk tv.', '"fernsehen" = tv kijken (gesplitst: sehe … fern).')] },
  { id: 'txt-a1-06-carla', unit: 'A1-06', title: 'Carlas Tag',
    lines: [
      { who: 'Carla', de: 'Mein Wecker klingelt um halb sechs.', nl: 'Mijn wekker gaat om half zes.' }, { who: 'Karst', de: 'Um halb sechs? Das ist sehr früh!', nl: 'Om half zes? Dat is erg vroeg!' },
      { who: 'Carla', de: 'Ja, aber am Nachmittag habe ich Pause.', nl: 'Ja, maar in de namiddag heb ik pauze.' }, { who: 'Karst', de: 'Was machst du dann?', nl: 'Wat doe je dan?' },
      { who: 'Carla', de: 'Manchmal schwimme ich. Manchmal schlafe ich eine Stunde.', nl: 'Soms zwem ik. Soms slaap ik een uur.' }, { who: 'Karst', de: 'Kommst du am Samstag mit?', nl: 'Kom je zaterdag mee?' }, { who: 'Carla', de: 'Ja, gern!', nl: 'Ja, graag!' }],
    questions: [q('t7-1', 'Hoe laat gaat Carla’s wekker?', ['5:30', '6:30', '6:00'], '5:30', '"halb sechs" = 5:30.'), q('t7-2', 'Wat vindt Karst van die tijd?', ['te vroeg', 'te laat', 'precies goed'], 'te vroeg', '"Das ist sehr früh!"'),
      q('t7-3', 'Wat doet Carla soms in de namiddag?', ['zwemmen of een uur slapen', 'koken', 'werken'], 'zwemmen of een uur slapen', '"Manchmal schwimme ich. Manchmal schlafe ich eine Stunde."'), q('t7-4', 'Waarmee gaat Carla akkoord?', ['zaterdag meekomen', 'vroeg opstaan', 'tv kijken'], 'zaterdag meekomen', '"Kommst du am Samstag mit?" – "Ja, gern!"')] },
  { id: 'txt-a1-07-bahnhof', unit: 'A1-07', title: 'Wo ist der Bahnhof?',
    lines: [
      { who: 'Karst', de: 'Entschuldigung, wo ist der Bahnhof?', nl: 'Pardon, waar is het station?' }, { who: 'Carla', de: 'Gehen Sie geradeaus und dann links.', nl: 'Ga rechtdoor en dan naar links.' },
      { who: 'Karst', de: 'Ist das weit?', nl: 'Is dat ver?' }, { who: 'Carla', de: 'Nein, nur fünf Minuten.', nl: 'Nee, maar vijf minuten.' }, { who: 'Karst', de: 'Danke schön!', nl: 'Hartelijk dank!' }],
    questions: [q('t8-1', 'Waar vraagt Karst naar?', ['het station', 'het hotel', 'de bushalte'], 'het station', '"Wo ist der Bahnhof?"'), q('t8-2', 'Welke weg wijst Carla?', ['rechtdoor en dan links', 'rechts en dan rechtdoor', 'links en dan rechts'], 'rechtdoor en dan links', '"geradeaus und dann links"'),
      q('t8-3', 'Hoe ver is het?', ['vijf minuten', 'tien minuten', 'een uur'], 'vijf minuten', '"nur fünf Minuten"'), q('t8-4', 'Wat betekent "weit"?', ['ver', 'dichtbij', 'snel'], 'ver', '"weit" = ver.')] },
  { id: 'txt-a1-08-krank', unit: 'A1-08', title: 'Karst ist krank',
    lines: [
      { who: 'Carla', de: 'Wie geht es dir, Karst? Du siehst müde aus.', nl: 'Hoe gaat het, Karst? Je ziet er moe uit.' }, { who: 'Karst', de: 'Mir geht es nicht gut. Ich habe Fieber und mein Kopf tut weh.', nl: 'Het gaat niet goed met me. Ik heb koorts en mijn hoofd doet pijn.' },
      { who: 'Carla', de: 'Oje! Du brauchst einen Arzt.', nl: 'O jee! Je hebt een dokter nodig.' }, { who: 'Karst', de: 'Ja, ich glaube auch.', nl: 'Ja, dat denk ik ook.' }, { who: 'Carla', de: 'Ich bleibe bei dir. Gute Besserung!', nl: 'Ik blijf bij je. Beterschap!' }],
    questions: [q('t9-1', 'Wat heeft Karst?', ['koorts en hoofdpijn', 'honger en dorst', 'buikpijn'], 'koorts en hoofdpijn', '"Fieber" en "mein Kopf tut weh"'), q('t9-2', 'Wat heeft Karst volgens Carla nodig?', ['een dokter', 'koffie', 'vakantie'], 'een dokter', '"Du brauchst einen Arzt."'),
      q('t9-3', 'Hoe ziet Karst eruit?', ['moe', 'blij', 'boos'], 'moe', '"Du siehst müde aus."'), q('t9-4', 'Wat betekent "Gute Besserung"?', ['Beterschap!', 'Goede reis!', 'Veel plezier!'], 'Beterschap!', '"Gute Besserung" wens je iemand die ziek is.')] },
  { id: 'txt-a1-09-beruf', unit: 'A1-09', title: 'Was bist du von Beruf?',
    lines: [
      { who: 'Carla', de: 'Was bist du von Beruf, Karst?', nl: 'Wat ben je van beroep, Karst?' }, { who: 'Karst', de: 'Ich bin Student. Ich lerne Deutsch. Und du?', nl: 'Ik ben student. Ik leer Duits. En jij?' },
      { who: 'Carla', de: 'Ich bin Lehrerin. Meine Kollegen sind sehr nett.', nl: 'Ik ben lerares. Mijn collega’s zijn erg aardig.' }, { who: 'Karst', de: 'Hast du heute einen Termin?', nl: 'Heb je vandaag een afspraak?' },
      { who: 'Carla', de: 'Ja, um zehn Uhr habe ich eine Besprechung.', nl: 'Ja, om tien uur heb ik een vergadering.' }],
    questions: [q('t10-1', 'Wat is Karst van beroep?', ['student', 'leraar', 'kok'], 'student', '"Ich bin Student."'), q('t10-2', 'Wat is Carla van beroep?', ['lerares', 'studente', 'dokter'], 'lerares', '"Ich bin Lehrerin."'),
      q('t10-3', 'Hoe zijn Carla’s collega’s?', ['erg aardig', 'erg druk', 'erg streng'], 'erg aardig', '"sehr nett"'), q('t10-4', 'Hoe laat is Carla’s vergadering?', ['10:00', '9:00', '11:00'], '10:00', '"um zehn Uhr"')] },
  { id: 'txt-a1-10-markt', unit: 'A1-10', title: 'Auf dem Markt',
    lines: [
      { who: 'Karst', de: 'Guten Tag! Ein Kilo Äpfel, bitte.', nl: 'Goedendag! Een kilo appels, alsjeblieft.' }, { who: 'Carla', de: 'Gern! Das macht zwei Euro fünfzig.', nl: 'Graag! Dat is twee euro vijftig.' },
      { who: 'Karst', de: 'Und eine Flasche Milch. Was kostet die?', nl: 'En een fles melk. Wat kost die?' }, { who: 'Carla', de: 'Die kostet einen Euro zwanzig.', nl: 'Die kost een euro twintig.' }, { who: 'Karst', de: 'Danke. Ich bezahle bar.', nl: 'Bedankt. Ik betaal contant.' }],
    questions: [q('t11-1', 'Wat kost een kilo appels?', ['2,50 euro', '1,20 euro', '5,00 euro'], '2,50 euro', '"zwei Euro fünfzig"'), q('t11-2', 'Wat kost de fles melk?', ['1,20 euro', '2,50 euro', '12 euro'], '1,20 euro', '"einen Euro zwanzig"'),
      q('t11-3', 'Hoe betaalt Karst?', ['contant', 'met een kaart', 'hij betaalt niet'], 'contant', '"Ich bezahle bar."'), q('t11-4', 'Wat bestelt Karst naast appels?', ['een fles melk', 'een brood', 'een kilo kaas'], 'een fles melk', '"eine Flasche Milch"')] },
  { id: 'txt-a1-11-koennen', unit: 'A1-11', title: 'Was kannst du?',
    lines: [
      { who: 'Carla', de: 'Was kannst du gut, Karst?', nl: 'Waar ben je goed in, Karst?' }, { who: 'Karst', de: 'Ich kann gut schwimmen. Aber ich kann nicht singen.', nl: 'Ik kan goed zwemmen. Maar ik kan niet zingen.' },
      { who: 'Carla', de: 'Ich kann singen, aber ich kann nicht tanzen.', nl: 'Ik kan zingen, maar ik kan niet dansen.' }, { who: 'Karst', de: 'Wir müssen zusammen üben!', nl: 'We moeten samen oefenen!' }, { who: 'Carla', de: 'Gute Idee! Ich will am Samstag tanzen.', nl: 'Goed idee! Ik wil zaterdag dansen.' }],
    questions: [q('t12-1', 'Wat kan Karst goed?', ['zwemmen', 'zingen', 'dansen'], 'zwemmen', '"Ich kann gut schwimmen."'), q('t12-2', 'Wat kan Carla niet?', ['dansen', 'zingen', 'zwemmen'], 'dansen', '"ich kann nicht tanzen"'),
      q('t12-3', 'Wat moeten ze samen doen?', ['oefenen', 'koken', 'reizen'], 'oefenen', '"Wir müssen zusammen üben!"'), q('t12-4', 'Wanneer wil Carla dansen?', ['zaterdag', 'zondag', 'vrijdag'], 'zaterdag', '"am Samstag"')] },
  { id: 'txt-a1-12-reise', unit: 'A1-12', title: 'Die große Reise',
    lines: [
      { who: 'Carla', de: 'Karst, ich habe einen Plan! Wir reisen um die Welt.', nl: 'Karst, ik heb een plan! We reizen de wereld rond.' }, { who: 'Karst', de: 'Um die Welt? Das ist weit!', nl: 'De hele wereld rond? Dat is ver!' },
      { who: 'Carla', de: 'Ja! Zuerst fahren wir nach Berlin.', nl: 'Ja! Eerst reizen we naar Berlijn.' }, { who: 'Karst', de: 'Und dann?', nl: 'En dan?' }, { who: 'Carla', de: 'Dann sehen wir viele Länder. Pack deinen Koffer!', nl: 'Dan zien we veel landen. Pak je koffer!' },
      { who: 'Karst', de: 'Ich packe schon! Aber ich muss noch viel Deutsch lernen.', nl: 'Ik pak al in! Maar ik moet nog veel Duits leren.' }],
    questions: [q('t13-1', 'Wat is Carla’s plan?', ['de wereld rondreizen', 'naar huis gaan', 'een café openen'], 'de wereld rondreizen', '"Wir reisen um die Welt."'), q('t13-2', 'Waar gaan ze eerst naartoe?', ['Berlijn', 'Wenen', 'Amsterdam'], 'Berlijn', '"Zuerst fahren wir nach Berlin."'),
      q('t13-3', 'Wat moet Karst nog doen?', ['veel Duits leren', 'zijn paspoort halen', 'een kaart kopen'], 'veel Duits leren', '"Ich muss noch viel Deutsch lernen."'), q('t13-4', 'Wat betekent "Pack deinen Koffer!"?', ['Pak je koffer!', 'Koop een koffer!', 'Waar is je koffer?'], 'Pak je koffer!', 'Opdracht aan "du": Pack!')] },
];
