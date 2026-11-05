import { MORE } from './vocab-more';
// Woordenlijst. Nieuwe woorden toevoegen = een regel toevoegen aan RAW. Geen andere code aanpassen.
export interface Word { id: string; de: string; nl: string; type: 'noun' | 'verb' | 'adj' | 'phrase'; gender?: 'der' | 'die' | 'das'; plural?: string; ex: string; exNl: string; level: 'A0' | 'A1'; topic: string; }
type R = [string, string, Word['type'], string, string, string, string, string]; // de, nl, type, gender|'', plural, ex, exNl, topic
const RAW: R[] = [
  ['Hallo', 'hallo', 'phrase', '', '', 'Hallo, ich bin Carla.', 'Hallo, ik ben Carla.', 'Begroeting'],
  ['Tschüss', 'doei', 'phrase', '', '', 'Tschüss, bis morgen!', 'Doei, tot morgen!', 'Begroeting'],
  ['Danke', 'bedankt', 'phrase', '', '', 'Danke für das Brot.', 'Bedankt voor het brood.', 'Begroeting'],
  ['Bitte', 'alsjeblieft', 'phrase', '', '', 'Ein Wasser, bitte.', 'Een water, alsjeblieft.', 'Begroeting'],
  ['Guten Morgen', 'goedemorgen', 'phrase', '', '', 'Guten Morgen, Karst!', 'Goedemorgen, Karst!', 'Begroeting'],
  ['Wie geht es dir?', 'hoe gaat het met je?', 'phrase', '', '', 'Hallo Karst, wie geht es dir?', 'Hallo Karst, hoe gaat het met je?', 'Begroeting'],
  ['Name', 'naam', 'noun', 'der', 'Namen', 'Mein Name ist Karst.', 'Mijn naam is Karst.', 'Voorstellen'],
  ['Freund', 'vriend', 'noun', 'der', 'Freunde', 'Karst ist mein Freund.', 'Karst is mijn vriend.', 'Familie en vrienden'],
  ['Freundin', 'vriendin', 'noun', 'die', 'Freundinnen', 'Carla ist meine Freundin.', 'Carla is mijn vriendin.', 'Familie en vrienden'],
  ['Familie', 'familie', 'noun', 'die', 'Familien', 'Meine Familie ist groß.', 'Mijn familie is groot.', 'Familie en vrienden'],
  ['Mutter', 'moeder', 'noun', 'die', 'Mütter', 'Meine Mutter kocht.', 'Mijn moeder kookt.', 'Familie en vrienden'],
  ['Vater', 'vader', 'noun', 'der', 'Väter', 'Mein Vater arbeitet.', 'Mijn vader werkt.', 'Familie en vrienden'],
  ['Schwester', 'zus', 'noun', 'die', 'Schwestern', 'Meine Schwester wohnt hier.', 'Mijn zus woont hier.', 'Familie en vrienden'],
  ['Bruder', 'broer', 'noun', 'der', 'Brüder', 'Mein Bruder ist nett.', 'Mijn broer is aardig.', 'Familie en vrienden'],
  ['Kind', 'kind', 'noun', 'das', 'Kinder', 'Das Kind spielt.', 'Het kind speelt.', 'Familie en vrienden'],
  ['Frau', 'vrouw', 'noun', 'die', 'Frauen', 'Die Frau lacht.', 'De vrouw lacht.', 'Familie en vrienden'],
  ['Mann', 'man', 'noun', 'der', 'Männer', 'Der Mann liest.', 'De man leest.', 'Familie en vrienden'],
  ['Wasser', 'water', 'noun', 'das', '', 'Ich trinke Wasser.', 'Ik drink water.', 'Eten en drinken'],
  ['Brot', 'brood', 'noun', 'das', 'Brote', 'Das Brot ist frisch.', 'Het brood is vers.', 'Eten en drinken'],
  ['Apfel', 'appel', 'noun', 'der', 'Äpfel', 'Der Apfel ist rot.', 'De appel is rood.', 'Eten en drinken'],
  ['Milch', 'melk', 'noun', 'die', '', 'Ich mag Milch.', 'Ik hou van melk.', 'Eten en drinken'],
  ['Kaffee', 'koffie', 'noun', 'der', 'Kaffees', 'Carla trinkt Kaffee.', 'Carla drinkt koffie.', 'Eten en drinken'],
  ['Katze', 'kat', 'noun', 'die', 'Katzen', 'Die Katze schläft.', 'De kat slaapt.', 'Dieren en huis'],
  ['Hund', 'hond', 'noun', 'der', 'Hunde', 'Der Hund ist groß.', 'De hond is groot.', 'Dieren en huis'],
  ['Haus', 'huis', 'noun', 'das', 'Häuser', 'Das Haus ist klein.', 'Het huis is klein.', 'Dieren en huis'],
  ['Tisch', 'tafel', 'noun', 'der', 'Tische', 'Der Tisch ist neu.', 'De tafel is nieuw.', 'Dieren en huis'],
  ['Buch', 'boek', 'noun', 'das', 'Bücher', 'Das Buch ist gut.', 'Het boek is goed.', 'Dieren en huis'],
  ['Teich', 'vijver', 'noun', 'der', 'Teiche', 'Der Teich ist ruhig.', 'De vijver is rustig.', 'Dieren en huis'],
  ['sein', 'zijn', 'verb', '', '', 'Ich bin müde.', 'Ik ben moe.', 'Werkwoorden'],
  ['haben', 'hebben', 'verb', '', '', 'Ich habe einen Hund.', 'Ik heb een hond.', 'Werkwoorden'],
  ['heißen', 'heten', 'verb', '', '', 'Ich heiße Karst.', 'Ik heet Karst.', 'Werkwoorden'],
  ['wohnen', 'wonen', 'verb', '', '', 'Carla wohnt am Teich.', 'Carla woont bij de vijver.', 'Werkwoorden'],
  ['lernen', 'leren', 'verb', '', '', 'Karst lernt Deutsch.', 'Karst leert Duits.', 'Werkwoorden'],
  ['sprechen', 'spreken', 'verb', '', '', 'Carla spricht Deutsch.', 'Carla spreekt Duits.', 'Werkwoorden'],
  ['trinken', 'drinken', 'verb', '', '', 'Wir trinken Wasser.', 'Wij drinken water.', 'Werkwoorden'],
  ['essen', 'eten', 'verb', '', '', 'Wir essen Brot.', 'Wij eten brood.', 'Werkwoorden'],
  ['groß', 'groot', 'adj', '', '', 'Der Hund ist groß.', 'De hond is groot.', 'Bijvoeglijke naamwoorden'],
  ['klein', 'klein', 'adj', '', '', 'Die Katze ist klein.', 'De kat is klein.', 'Bijvoeglijke naamwoorden'],
  ['müde', 'moe', 'adj', '', '', 'Karst ist müde.', 'Karst is moe.', 'Bijvoeglijke naamwoorden'],
  ['schön', 'mooi', 'adj', '', '', 'Der Teich ist schön.', 'De vijver is mooi.', 'Bijvoeglijke naamwoorden'],
];
const toWord = ([de, nl, type, g, plural, ex, exNl, topic, level]: (string | undefined)[]): Word => ({
  id: (de as string).toLowerCase().replace(/[^a-zäöüß]+/g, '-'), de: de as string, nl: nl as string, type: type as Word['type'],
  gender: (g || undefined) as Word['gender'], plural: plural || undefined, ex: ex as string, exNl: exNl as string, level: (level || 'A0') as Word['level'], topic: topic as string,
});
// Eerst de basislijst, dan de uitbreiding; dubbele woorden worden automatisch overgeslagen.
const seen = new Set<string>();
export const VOCAB: Word[] = [...RAW, ...MORE].map(toWord).filter((w) => !seen.has(w.id) && !!seen.add(w.id));
