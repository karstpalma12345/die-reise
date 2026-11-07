// Grammaticalessen (uitleg in het Nederlands). Nieuwe les = nieuw object in LESSONS.
import { type Ex, shuffle } from '../exercises';
export interface Lesson { id: string; title: string; level: string; objective: string; sections: { h: string; body: string; examples?: [string, string][] }[]; exercises: Ex[]; }
const art = (id: string, w: string, nl: string, a: 'der' | 'die' | 'das', why: string): Ex => ({ id: `g1-${id}`, kind: 'mc', prompt: `Welk lidwoord: ___ ${w} (${nl})`, options: ['der', 'die', 'das'], answers: [a], explain: `${a} ${w}. ${why}`, topic: 'Lidwoorden', category: 'article' });
const gap = (id: string, s: string, a: string, why: string): Ex => ({ id: `g2-${id}`, kind: 'type', prompt: `Vul in: ${s}`, answers: [a], explain: why, topic: 'sein', category: 'verb' });

type Cat = Ex['category'];
const mc = (id: string, prompt: string, options: string[], a: string, explain: string, topic: string, category: Cat): Ex => ({ id, kind: 'mc', prompt, options, answers: [a], explain, topic, category });
const ty = (id: string, prompt: string, answers: string[], explain: string, topic: string, category: Cat): Ex => ({ id, kind: 'type', prompt, answers, explain, topic, category });
const ord = (id: string, sentences: string[], explain: string, topic: string): Ex => { const w = sentences[0].split(' '); let o = shuffle(w); for (let n = 0; n < 9 && w.length > 1 && o.join(' ') === w.join(' '); n++) o = shuffle(w);
  return { id, kind: 'order', prompt: 'Zet de woorden in de goede volgorde.', options: o, answers: sentences, explain, topic, category: 'sentence' }; };
const A = ['der', 'die', 'das'];
export const LESSONS: Lesson[] = [
  { id: 'gram-artikel', title: 'Lidwoorden: der, die, das', level: 'A0', objective: 'Je kent de drie geslachten en leert elk zelfstandig naamwoord mét lidwoord.',
    sections: [
      { h: 'Drie geslachten', body: 'Nederlands heeft "de" en "het". Duits heeft drie lidwoorden: der (mannelijk), die (vrouwelijk) en das (onzijdig). In het meervoud is het altijd "die".' },
      { h: 'Let op', body: 'Het geslacht kun je meestal niet raden en komt niet altijd overeen met het Nederlands. Leer daarom elk woord mét lidwoord: niet "Hund" maar "der Hund". Zelfstandige naamwoorden schrijf je in het Duits altijd met een hoofdletter.', examples: [['der Hund', 'de hond'], ['die Katze', 'de kat'], ['das Haus', 'het huis'], ['die Hunde', 'de honden']] },
    ],
    exercises: [art('1', 'Tisch', 'tafel', 'der', 'Tisch is mannelijk.'), art('2', 'Katze', 'kat', 'die', 'Katze is vrouwelijk.'), art('3', 'Haus', 'huis', 'das', 'Haus is onzijdig.'),
      art('4', 'Frau', 'vrouw', 'die', 'Frau is vrouwelijk.'), art('5', 'Buch', 'boek', 'das', 'Buch is onzijdig.'), art('6', 'Mann', 'man', 'der', 'Mann is mannelijk.'),
      { id: 'g1-7', kind: 'mc', prompt: 'Welk lidwoord: ___ Hunde (de honden)', options: ['der', 'die', 'das'], answers: ['die'], explain: 'In het meervoud is het lidwoord altijd "die".', topic: 'Lidwoorden', category: 'article' }] },
  { id: 'gram-sein', title: 'Het werkwoord "sein" (zijn)', level: 'A0', objective: 'Je kunt "sein" vervoegen en jezelf en anderen beschrijven.',
    sections: [
      { h: 'Vervoeging', body: 'Net als "zijn" in het Nederlands is "sein" onregelmatig. Je moet de vormen uit je hoofd leren:\n\nich bin · du bist · er/sie/es ist · wir sind · ihr seid · sie/Sie sind' },
      { h: 'Voorbeelden', body: 'Gebruik "sein" om te zeggen wie of hoe iemand is.', examples: [['Ich bin Karst.', 'Ik ben Karst.'], ['Du bist müde.', 'Je bent moe.'], ['Carla ist ein Frosch.', 'Carla is een kikker.'], ['Wir sind Freunde.', 'Wij zijn vrienden.']] },
    ],
    exercises: [gap('1', 'Ich ___ Karst.', 'bin', 'Bij "ich" hoort "bin".'), gap('2', 'Du ___ müde.', 'bist', 'Bij "du" hoort "bist".'), gap('3', 'Carla ___ ein Frosch.', 'ist', 'Carla = "sie", dus "ist".'),
      gap('4', 'Wir ___ Freunde.', 'sind', 'Bij "wir" hoort "sind".'), gap('5', 'Ihr ___ nett.', 'seid', 'Bij "ihr" (jullie) hoort "seid".'),
      { id: 'g2-6', kind: 'type', prompt: 'Vertaal: Ik ben moe.', answers: ['Ich bin müde'], explain: 'Ich bin müde.', topic: 'sein', category: 'translation' },
      { id: 'g2-7', kind: 'type', prompt: 'Vertaal: Karst is een axolotl.', answers: ['Karst ist ein Axolotl'], explain: 'Karst ist ein Axolotl. (Axolotl is mannelijk: ein.)', topic: 'sein', category: 'translation' }] },
  { id: 'gram-werkwoorden', title: 'Regelmatige werkwoorden (tegenwoordige tijd)', level: 'A0', objective: 'Je kunt regelmatige werkwoorden vervoegen: wohnen, lernen, kochen.',
    sections: [
      { h: 'Stam + uitgang', body: 'Haal -en van de infinitief af: dat is de stam (wohn-). Zet daar de uitgang achter:\n\nich wohne · du wohnst · er/sie/es wohnt · wir wohnen · ihr wohnt · sie/Sie wohnen\n\nDuits heeft één tegenwoordige tijd: "Ich lerne" is zowel "ik leer" als "ik ben aan het leren".', examples: [['Ich wohne am Teich.', 'Ik woon bij de vijver.'], ['Du lernst Deutsch.', 'Je leert Duits.'], ['Carla kocht Suppe.', 'Carla kookt soep.'], ['Wir spielen im Garten.', 'Wij spelen in de tuin.']] },
      { h: 'Uitzonderingen', body: 'Eindigt de stam op -t of -d (arbeiten), dan komt er een extra -e bij du, er/sie/es en ihr: du arbeitest, er arbeitet.\n\nSommige werkwoorden veranderen ook hun klinker bij du en er/sie/es: sprechen → du sprichst, er spricht. Die leer je per werkwoord.' },
    ],
    exercises: [ty('g3-1', 'Vul in: Ich ___ (wohnen) am Teich.', ['wohne'], 'Bij "ich" komt er -e achter de stam.', 'Vervoeging', 'verb'), ty('g3-2', 'Vul in: Du ___ (lernen) Deutsch.', ['lernst'], 'Bij "du" komt er -st achter de stam.', 'Vervoeging', 'verb'),
      ty('g3-3', 'Vul in: Carla ___ (kochen) Suppe.', ['kocht'], 'Bij "sie/er/es" komt er -t achter de stam.', 'Vervoeging', 'verb'), ty('g3-4', 'Vul in: Wir ___ (spielen) im Garten.', ['spielen'], 'Bij "wir" is de uitgang -en, net als de infinitief.', 'Vervoeging', 'verb'),
      ty('g3-5', 'Vul in: Ihr ___ (machen) viel.', ['macht'], 'Bij "ihr" komt er -t achter de stam.', 'Vervoeging', 'verb'), ty('g3-6', 'Vul in: Du ___ (arbeiten) viel.', ['arbeitest'], 'De stam eindigt op -t, dus er komt een extra -e: arbeitest.', 'Vervoeging', 'verb'),
      ord('g3-7', ['Ich wohne am Teich'], 'Het werkwoord staat op de tweede plaats.', 'Vervoeging')] },
  { id: 'gram-zinsbouw', title: 'Zinsbouw, vragen en ontkenning', level: 'A0', objective: 'Je zet het werkwoord op de goede plaats, stelt vragen en ontkent met nicht en kein.',
    sections: [
      { h: 'Werkwoord op plek 2', body: 'In een gewone zin staat het vervoegde werkwoord op de tweede plaats. Begin je met iets anders dan het onderwerp (bijvoorbeeld "heute"), dan komt het onderwerp na het werkwoord.', examples: [['Carla spricht Deutsch.', 'Carla spreekt Duits.'], ['Heute lerne ich Deutsch.', 'Vandaag leer ik Duits.'], ['Ich lerne heute Deutsch.', 'Ik leer vandaag Duits.']] },
      { h: 'Vragen', body: 'Ja/nee-vraag: het werkwoord staat vooraan. W-vraag: eerst het vraagwoord, dan het werkwoord.', examples: [['Spricht Carla Deutsch?', 'Spreekt Carla Duits?'], ['Wo wohnst du?', 'Waar woon je?'], ['Was machst du heute?', 'Wat doe je vandaag?']] },
      { h: 'Ontkenning', body: '"nicht" ontkent een werkwoord of eigenschap: het staat meestal achter het werkwoord of vóór het bijvoeglijk naamwoord. "kein" ontkent een zelfstandig naamwoord (geen): kein bij der- en das-woorden, keine bij die-woorden en meervoud.', examples: [['Ich bin nicht müde.', 'Ik ben niet moe.'], ['Ich habe kein Auto.', 'Ik heb geen auto.'], ['Ich habe keine Katze.', 'Ik heb geen kat.']] },
    ],
    exercises: [ord('g4-1', ['Carla spricht Deutsch'], 'Onderwerp, dan werkwoord op plek 2.', 'Zinsbouw'), ord('g4-2', ['Heute lerne ich Deutsch', 'Ich lerne heute Deutsch'], 'Het werkwoord blijft op plek 2. Beide volgordes zijn goed.', 'Zinsbouw'),
      ord('g4-3', ['Wo wohnst du'], 'W-vraag: vraagwoord, dan werkwoord.', 'Vragen'), ord('g4-4', ['Spricht Carla Deutsch'], 'Bij een ja/nee-vraag staat het werkwoord vooraan.', 'Vragen'),
      mc('g4-5', 'Ich bin ___ müde.', ['nicht', 'kein', 'keine'], 'nicht', '"nicht" ontkent een eigenschap (müde).', 'Ontkenning', 'sentence'), mc('g4-6', 'Ich habe ___ Auto.', ['kein', 'keine', 'nicht'], 'kein', 'Auto is onzijdig (das Auto), dus kein.', 'Ontkenning', 'article'),
      mc('g4-7', 'Ich habe ___ Katze.', ['keine', 'kein', 'nicht'], 'keine', 'Katze is vrouwelijk (die Katze), dus keine.', 'Ontkenning', 'article'),
      ty('g4-8', 'Verbeter de zin: Carla Deutsch spricht.', ['Carla spricht Deutsch'], 'Het werkwoord hoort op plek 2.', 'Zinsbouw', 'sentence'), ty('g4-9', 'Verbeter de zin: Ich nicht bin müde.', ['Ich bin nicht müde'], 'Het werkwoord staat op plek 2, "nicht" komt daarna.', 'Ontkenning', 'sentence'),
      ty('g4-10', 'Vertaal: Ik heb geen kat.', ['Ich habe keine Katze'], 'Katze is vrouwelijk, dus keine.', 'Ontkenning', 'translation')] },
  { id: 'gram-bezit', title: 'Bezittelijke voornaamwoorden', level: 'A0', objective: 'Je zegt "mijn", "jouw", "zijn" en "haar" in de goede vorm.',
    sections: [
      { h: 'De vormen', body: 'ich → mein · du → dein · er → sein · sie → ihr · es → sein · wir → unser · ihr → euer · sie/Sie → ihr/Ihr\n\nBij der- en das-woorden gebruik je de basisvorm (mein Hund, mein Haus). Bij die-woorden en meervoud komt er een -e achter: meine Katze, meine Freunde.', examples: [['mein Hund', 'mijn hond'], ['meine Katze', 'mijn kat'], ['Das ist Karst und das ist seine Freundin.', 'Dit is Karst en dit is zijn vriendin.'], ['Das ist Carla und das ist ihr Bruder.', 'Dit is Carla en dit is haar broer.']] },
    ],
    exercises: [mc('g5-1', '___ Katze ist klein. (mijn)', ['meine', 'mein', 'meinen'], 'meine', 'Katze is vrouwelijk: meine.', 'Bezit', 'article'), mc('g5-2', '___ Hund ist groß. (mijn)', ['mein', 'meine', 'meinen'], 'mein', 'Hund is mannelijk (nominatief): mein.', 'Bezit', 'article'),
      mc('g5-3', '___ Haus ist neu. (jouw)', ['dein', 'deine', 'deinen'], 'dein', 'Haus is onzijdig: dein.', 'Bezit', 'article'), mc('g5-4', 'Carla ist ___ Freundin. (zijn, van Karst)', ['seine', 'sein', 'ihre'], 'seine', 'Freundin is vrouwelijk, het bezit is van Karst (er): seine.', 'Bezit', 'article'),
      mc('g5-5', 'Das ist Carla und das ist ___ Bruder. (haar)', ['ihr', 'sein', 'seine'], 'ihr', 'Het bezit is van Carla (sie): ihr. Bruder is mannelijk, dus geen -e.', 'Bezit', 'article'),
      mc('g5-6', 'Das sind ___ Freunde. (mijn)', ['meine', 'mein', 'meinen'], 'meine', 'In het meervoud komt er altijd -e achter.', 'Bezit', 'article'), ty('g5-7', 'Vertaal: Mijn zus is aardig.', ['Meine Schwester ist nett'], 'Schwester is vrouwelijk: meine.', 'Bezit', 'translation')] },
  { id: 'gram-akkusativ', title: 'Nominatief en accusatief', level: 'A1', objective: 'Je herkent onderwerp en lijdend voorwerp en kiest het juiste lidwoord.',
    sections: [
      { h: 'Twee naamvallen', body: 'Nominatief = het onderwerp (wie of wat doet iets). Accusatief = het lijdend voorwerp (wie of wat wordt gezien, gekocht, gehad). Vraag: "Wie of wat zie ik?"\n\nAlleen bij mannelijke woorden verandert er iets: der → den · ein → einen · mein → meinen · kein → keinen. Bij die, das en het meervoud blijft alles gelijk.', examples: [['Der Hund ist groß.', 'De hond is groot. (nominatief)'], ['Ich sehe den Hund.', 'Ik zie de hond. (accusatief)'], ['Ich habe einen Bruder.', 'Ik heb een broer.'], ['Ich habe eine Schwester.', 'Ik heb een zus. (blijft gelijk)']] },
    ],
    exercises: [mc('g6-1', 'Ich sehe ___ Hund.', ['den', 'der', 'das'], 'den', 'Hund is mannelijk en lijdend voorwerp: der → den.', 'Accusatief', 'article'), mc('g6-2', 'Ich sehe ___ Katze.', A, 'die', 'Bij vrouwelijke woorden verandert er niets: die.', 'Accusatief', 'article'),
      mc('g6-3', 'Ich kaufe ___ Brot.', A, 'das', 'Bij onzijdige woorden verandert er niets: das.', 'Accusatief', 'article'), mc('g6-4', 'Ich habe ___ Bruder.', ['einen', 'ein', 'eine'], 'einen', 'Bruder is mannelijk en lijdend voorwerp: ein → einen.', 'Accusatief', 'article'),
      mc('g6-5', 'Ich habe ___ Schwester.', ['eine', 'einen', 'ein'], 'eine', 'Schwester is vrouwelijk: eine.', 'Accusatief', 'article'), mc('g6-6', '___ Tisch ist neu.', ['Der', 'Den', 'Das'], 'Der', 'Tisch is hier het onderwerp (nominatief): der.', 'Accusatief', 'article'),
      mc('g6-7', 'Ich esse ___ Apfel.', ['einen', 'ein', 'eine'], 'einen', 'Apfel is mannelijk en lijdend voorwerp: einen.', 'Accusatief', 'article'), ty('g6-8', 'Verbeter de zin: Ich habe ein Hund.', ['Ich habe einen Hund'], 'Hund is mannelijk en lijdend voorwerp: einen.', 'Accusatief', 'article')] },
  { id: 'gram-moechten', title: 'Bestellen met "möchten"', level: 'A1', objective: 'Je kunt beleefd zeggen wat je wilt hebben of doen.',
    sections: [
      { h: 'Vormen', body: '"möchten" betekent "graag willen" en is beleefder dan "wollen".\n\nich möchte · du möchtest · er/sie/es möchte · wir möchten · ihr möchtet · sie/Sie möchten', examples: [['Ich möchte einen Kaffee.', 'Ik wil graag een koffie.'], ['Was möchtest du?', 'Wat wil je?'], ['Wir möchten Wasser.', 'Wij willen graag water.']] },
      { h: 'Een tweede werkwoord', body: 'Wil je iets doen, dan staat het tweede werkwoord als infinitief helemaal aan het einde van de zin, net als bij "willen" in het Nederlands. Voor iets bestellen gebruik je het lidwoord van de vorige les: einen (der), ein (das), eine (die).', examples: [['Ich möchte Deutsch lernen.', 'Ik wil graag Duits leren.'], ['Ich möchte ein Brot.', 'Ik wil graag een brood.']] },
    ],
    exercises: [mc('g7-1', 'Ich ___ einen Kaffee.', ['möchte', 'möchtest', 'möchten'], 'möchte', 'Bij "ich" hoort "möchte".', 'möchten', 'verb'), mc('g7-2', 'Du ___ eine Suppe.', ['möchtest', 'möchte', 'möchtet'], 'möchtest', 'Bij "du" hoort "möchtest".', 'möchten', 'verb'),
      mc('g7-3', 'Wir ___ Wasser.', ['möchten', 'möchte', 'möchtest'], 'möchten', 'Bij "wir" hoort "möchten".', 'möchten', 'verb'), mc('g7-4', 'Ich möchte ___ Apfel.', ['einen', 'ein', 'eine'], 'einen', 'Apfel is mannelijk en lijdend voorwerp: einen.', 'möchten', 'article'),
      mc('g7-5', 'Ich möchte ___ Brot.', ['ein', 'einen', 'eine'], 'ein', 'Brot is onzijdig: ein.', 'möchten', 'article'), ord('g7-6', ['Ich möchte einen Kaffee'], 'Het werkwoord "möchte" staat op plek 2.', 'möchten'),
      ord('g7-7', ['Was möchtest du'], 'W-vraag: vraagwoord, dan het werkwoord.', 'möchten'), ord('g7-8', ['Ich möchte Deutsch lernen'], 'Het tweede werkwoord (lernen) staat aan het einde.', 'möchten'),
      ty('g7-9', 'Vertaal: Ik wil graag een thee.', ['Ich möchte einen Tee'], 'Tee is mannelijk en lijdend voorwerp: einen.', 'möchten', 'translation')] },
  { id: 'gram-esgibt', title: '"Es gibt" – er is, er zijn', level: 'A1', objective: 'Je kunt zeggen wat er is (of niet is) in een ruimte.',
    sections: [
      { h: 'Es gibt + accusatief', body: '"Es gibt" betekent "er is" of "er zijn". Wat erna komt is een lijdend voorwerp, dus je gebruikt de accusatiefvormen: einen (der), ein (das), eine (die). Ontkennen doe je met keinen / kein / keine. Een vraag begint met "Gibt es …?"', examples: [['Es gibt einen Balkon.', 'Er is een balkon.'], ['Es gibt ein Sofa.', 'Er is een bank.'], ['Es gibt keine Katze.', 'Er is geen kat.'], ['Gibt es einen Garten?', 'Is er een tuin?']] },
    ],
    exercises: [mc('g8-1', 'Es gibt ___ Balkon.', ['einen', 'ein', 'eine'], 'einen', 'Balkon is mannelijk: einen.', 'Es gibt', 'article'), mc('g8-2', 'Es gibt ___ Lampe.', ['eine', 'einen', 'ein'], 'eine', 'Lampe is vrouwelijk: eine.', 'Es gibt', 'article'),
      mc('g8-3', 'Es gibt ___ Sofa.', ['ein', 'einen', 'eine'], 'ein', 'Sofa is onzijdig: ein.', 'Es gibt', 'article'), mc('g8-4', 'Es gibt ___ Schrank. (geen)', ['keinen', 'kein', 'keine'], 'keinen', 'Schrank is mannelijk: keinen.', 'Es gibt', 'article'),
      mc('g8-5', 'Es gibt ___ Tür. (geen)', ['keine', 'keinen', 'kein'], 'keine', 'Tür is vrouwelijk: keine.', 'Es gibt', 'article'), ord('g8-6', ['Gibt es einen Garten'], 'Een vraag begint met het werkwoord.', 'Es gibt'),
      ty('g8-7', 'Vertaal: Er is een tuin.', ['Es gibt einen Garten'], 'Garten is mannelijk: einen.', 'Es gibt', 'translation'), ty('g8-8', 'Vertaal: Er is geen kat.', ['Es gibt keine Katze'], 'Katze is vrouwelijk: keine.', 'Es gibt', 'translation')] },
  { id: 'gram-trennbar', title: 'Trennbare Verben (gesplitste werkwoorden)', level: 'A1', objective: 'Je kunt werkwoorden als aufstehen en einkaufen goed gebruiken.',
    sections: [
      { h: 'Het voorvoegsel splitst', body: 'Net als in het Nederlands ("opstaan → ik sta op") hebben veel Duitse werkwoorden een voorvoegsel dat loskomt. In een gewone zin staat het vervoegde werkwoord op plek 2 en het voorvoegsel helemaal aan het einde.', examples: [['Ich stehe um sieben Uhr auf.', 'Ik sta om zeven uur op.'], ['Wir kaufen im Supermarkt ein.', 'Wij doen boodschappen in de supermarkt.'], ['Carla ruft Karst an.', 'Carla belt Karst.'], ['Kommst du mit?', 'Kom je mee?']] },
      { h: 'In de infinitief blijft het heel', body: 'Na "möchten", "können" en dergelijke staat het werkwoord als infinitief aan het einde, en dan blijft het voorvoegsel eraan vast: Ich möchte früh aufstehen. Veelvoorkomende voorvoegsels: an-, auf-, ein-, fern-, mit-.' },
    ],
    exercises: [ord('g9-1', ['Ich stehe um sieben Uhr auf'], 'Werkwoord op plek 2, voorvoegsel "auf" aan het einde.', 'Trennbare Verben'), ord('g9-2', ['Wir kaufen im Supermarkt ein'], '"einkaufen" splitst: kaufen … ein.', 'Trennbare Verben'),
      ord('g9-3', ['Kommst du mit'], '"mitkommen" in een vraag: Kommst du … mit?', 'Trennbare Verben'), mc('g9-4', 'Carla ruft Karst ___. (anrufen)', ['an', 'auf', 'ein'], 'an', 'anrufen → ruft … an.', 'Trennbare Verben', 'verb'),
      mc('g9-5', 'Der Kurs fängt um acht Uhr ___. (anfangen)', ['an', 'aus', 'mit'], 'an', 'anfangen → fängt … an.', 'Trennbare Verben', 'verb'), mc('g9-6', 'Der Zug kommt um zehn Uhr ___. (ankommen)', ['an', 'auf', 'mit'], 'an', 'ankommen → kommt … an.', 'Trennbare Verben', 'verb'),
      mc('g9-7', 'Ich möchte früh ___. (opstaan)', ['aufstehen', 'stehen auf', 'auf stehen'], 'aufstehen', 'Na "möchten" blijft het werkwoord heel: aufstehen.', 'Trennbare Verben', 'verb'),
      ty('g9-8', 'Vertaal: Ik sta om zeven uur op.', ['Ich stehe um sieben Uhr auf'], 'Werkwoord op plek 2, "auf" aan het einde.', 'Trennbare Verben', 'translation'),
      ty('g9-9', 'Verbeter de zin: Ich aufstehe um sieben Uhr.', ['Ich stehe um sieben Uhr auf'], 'Het voorvoegsel splitst en gaat naar het einde.', 'Trennbare Verben', 'sentence')] },
  { id: 'gram-uhrzeit', title: 'Uhrzeit en dagindeling', level: 'A1', objective: 'Je kunt de tijd vragen en zeggen, en vertellen wanneer je iets doet.',
    sections: [
      { h: 'Hoe laat is het?', body: 'Vraag: "Wie spät ist es?" of "Wie viel Uhr ist es?" Antwoord: "Es ist drei Uhr." Met "um" zeg je wanneer iets gebeurt: "Um acht Uhr frühstücken wir." Na "um acht Uhr" staat het werkwoord op plek 2.', examples: [['Es ist drei Uhr.', 'Het is drie uur.'], ['Um acht Uhr frühstücken wir.', 'Om acht uur ontbijten wij.']] },
      { h: 'Half, kwart, over en voor', body: '"halb acht" is 7:30, net als in het Nederlands "half acht". Verder: Viertel nach sieben = kwart over zeven (7:15), Viertel vor acht = kwart voor acht (7:45), zehn vor acht = tien voor acht (7:50), fünf nach sieben = vijf over zeven (7:05).', examples: [['Es ist halb acht.', 'Het is half acht (7:30).'], ['Es ist Viertel nach sieben.', 'Het is kwart over zeven.']] },
      { h: 'Dagdelen en frequentie', body: 'am Morgen (in de ochtend), am Mittag, am Nachmittag, am Abend, in der Nacht. Frequentie: immer (altijd), oft (vaak), manchmal (soms), nie (nooit). Ze staan vaak vlak na het werkwoord: Ich trinke immer Kaffee.' },
    ],
    exercises: [mc('g10-1', 'Es ist halb acht. Hoe laat is het?', ['7:30', '8:30', '8:00'], '7:30', '"halb acht" = half acht = 7:30, net als in het Nederlands.', 'Uhrzeit', 'vocabulary'), mc('g10-2', 'Viertel nach sieben is:', ['7:15', '6:45', '7:45'], '7:15', 'Viertel nach = kwart over.', 'Uhrzeit', 'vocabulary'),
      mc('g10-3', 'Zehn vor acht is:', ['7:50', '8:10', '7:10'], '7:50', 'zehn vor = tien voor.', 'Uhrzeit', 'vocabulary'), mc('g10-4', 'Wat betekent "Um neun Uhr"?', ['om negen uur', 'negen uur lang', 'rond negen'], 'om negen uur', '"um" geeft het tijdstip aan.', 'Uhrzeit', 'vocabulary'),
      mc('g10-5', 'Hoe laat is het? Wie ___ ist es?', ['spät', 'groß', 'alt'], 'spät', '"Wie spät ist es?" = hoe laat is het?', 'Uhrzeit', 'sentence'), ord('g10-6', ['Um acht Uhr frühstücken wir'], 'Na "Um acht Uhr" staat het werkwoord op plek 2.', 'Uhrzeit'),
      ord('g10-7', ['Es ist halb neun'], 'halb neun = 8:30.', 'Uhrzeit'), ty('g10-8', 'Vertaal: Het is half negen.', ['Es ist halb neun'], '"halb neun" = 8:30.', 'Uhrzeit', 'translation'),
      ty('g10-9', 'Vertaal: Ik begin om negen uur.', ['Ich fange um neun Uhr an', 'Ich beginne um neun Uhr'], 'anfangen splitst: fange … an. Beginnen kan ook.', 'Uhrzeit', 'translation')] },
];
const q = (id: string, prompt: string, options: string[], a: string, explain: string): Ex => ({ id: `pl-${id}`, kind: 'mc', prompt, options, answers: [a], explain, topic: 'Instaptoets', category: 'vocabulary' });
export const PLACEMENT: Ex[] = [
  q('1', 'Wat betekent "Danke"?', ['bedankt', 'doei', 'alsjeblieft', 'goedemorgen'], 'bedankt', '"Danke" betekent bedankt.'),
  q('2', '___ Katze schläft.', ['die', 'der', 'das'], 'die', 'Katze is vrouwelijk: die Katze.'),
  q('3', 'Ich ___ Karst.', ['bin', 'bist', 'ist'], 'bin', 'Bij "ich" hoort "bin".'),
  q('4', 'Hoe zeg je "goedemorgen"?', ['Guten Morgen', 'Gute Nacht', 'Guten Tag', 'Tschüss'], 'Guten Morgen', 'Guten Morgen = goedemorgen.'),
  q('5', 'Carla ___ Deutsch.', ['sprechen', 'spricht', 'sprichst'], 'spricht', 'Bij "sie/er" hoort "spricht".'),
  q('6', 'Ich habe ___ Hund.', ['einen', 'ein', 'eine'], 'einen', 'Hund is mannelijk; als lijdend voorwerp wordt "ein" → "einen" (accusatief).'),
  q('7', 'Wo ___ du?', ['wohnst', 'wohne', 'wohnt'], 'wohnst', 'Bij "du" hoort de uitgang -st.'),
  q('8', 'Gestern ___ ich ins Kino gegangen.', ['bin', 'habe', 'war'], 'bin', 'Bewegingswerkwoorden (gehen) vormen het perfectum met "sein".'),
  q('9', 'Ich möchte, ___ du kommst.', ['dass', 'das', 'was'], 'dass', '"dass" leidt een bijzin in.'),
  q('10', 'Ich helfe ___ Freund.', ['meinem', 'meinen', 'mein'], 'meinem', '"helfen" vraagt de datief: meinem Freund.'),
];
