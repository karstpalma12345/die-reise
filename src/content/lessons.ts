// Grammaticalessen (uitleg in het Nederlands). Nieuwe les = nieuw object in LESSONS.
import type { Ex } from '../exercises';
export interface Lesson { id: string; title: string; level: string; objective: string; sections: { h: string; body: string; examples?: [string, string][] }[]; exercises: Ex[]; }
const art = (id: string, w: string, nl: string, a: 'der' | 'die' | 'das', why: string): Ex => ({ id: `g1-${id}`, kind: 'mc', prompt: `Welk lidwoord: ___ ${w} (${nl})`, options: ['der', 'die', 'das'], answers: [a], explain: `${a} ${w}. ${why}`, topic: 'Lidwoorden', category: 'article' });
const gap = (id: string, s: string, a: string, why: string): Ex => ({ id: `g2-${id}`, kind: 'type', prompt: `Vul in: ${s}`, answers: [a], explain: why, topic: 'sein', category: 'verb' });
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
