// Extra woordenlijst, per thema. Nieuwe woorden: voeg een regel toe in een groep (of maak een nieuwe groep).
// Regel = [Duits, Nederlands, soort, meervoud, voorbeeldzin, vertaling]
// soort: 'der' | 'die' | 'das' (zelfstandig naamwoord) | 'v' werkwoord | 'a' bijvoeglijk naamwoord | 'p' zin/overig
type Kind = 'der' | 'die' | 'das' | 'v' | 'a' | 'p';
type Row = [string, string, Kind, string, string, string];
export type MoreRow = [string, string, 'noun' | 'verb' | 'adj' | 'phrase', string, string, string, string, string, 'A0' | 'A1' | 'A2' | 'B1' | 'B2'];
const t = (topic: string, level: 'A0' | 'A1' | 'A2' | 'B1' | 'B2', rows: Row[]): MoreRow[] => rows.map(([de, nl, k, pl, ex, exNl]) => [de, nl, k === 'v' ? 'verb' : k === 'a' ? 'adj' : k === 'p' ? 'phrase' : 'noun', k === 'der' || k === 'die' || k === 'das' ? k : '', pl, ex, exNl, topic, level]);

export const MORE: MoreRow[] = [
  ...t('Getallen', 'A0', [
    ['eins', 'één', 'p', '', 'Eins plus eins ist zwei.', 'Een plus een is twee.'], ['zwei', 'twee', 'p', '', 'Ich habe zwei Katzen.', 'Ik heb twee katten.'],
    ['drei', 'drie', 'p', '', 'Wir sind drei Freunde.', 'Wij zijn met z’n drieën.'], ['vier', 'vier', 'p', '', 'Der Tisch hat vier Beine.', 'De tafel heeft vier poten.'],
    ['fünf', 'vijf', 'p', '', 'Es ist fünf Uhr.', 'Het is vijf uur.'], ['sechs', 'zes', 'p', '', 'Ich habe sechs Äpfel.', 'Ik heb zes appels.'],
    ['sieben', 'zeven', 'p', '', 'Die Woche hat sieben Tage.', 'De week heeft zeven dagen.'], ['acht', 'acht', 'p', '', 'Es ist acht Uhr.', 'Het is acht uur.'],
    ['neun', 'negen', 'p', '', 'Ich habe neun Bücher.', 'Ik heb negen boeken.'], ['zehn', 'tien', 'p', '', 'Zehn Minuten, bitte.', 'Tien minuten, alsjeblieft.']]),
  ...t('Kleuren', 'A0', [
    ['rot', 'rood', 'a', '', 'Die Blume ist rot.', 'De bloem is rood.'], ['blau', 'blauw', 'a', '', 'Das Wasser ist blau.', 'Het water is blauw.'],
    ['grün', 'groen', 'a', '', 'Der Frosch ist grün.', 'De kikker is groen.'], ['gelb', 'geel', 'a', '', 'Die Banane ist gelb.', 'De banaan is geel.'],
    ['schwarz', 'zwart', 'a', '', 'Die Nacht ist schwarz.', 'De nacht is zwart.'], ['weiß', 'wit', 'a', '', 'Das Brot ist weiß.', 'Het brood is wit.'],
    ['rosa', 'roze', 'a', '', 'Karst ist rosa.', 'Karst is roze.'], ['braun', 'bruin', 'a', '', 'Der Hund ist braun.', 'De hond is bruin.']]),
  ...t('Tijd', 'A0', [
    ['heute', 'vandaag', 'p', '', 'Heute ist es kalt.', 'Vandaag is het koud.'], ['morgen', 'morgen', 'p', '', 'Morgen lerne ich Deutsch.', 'Morgen leer ik Duits.'],
    ['jetzt', 'nu', 'p', '', 'Ich esse jetzt.', 'Ik eet nu.'], ['Tag', 'dag', 'der', 'Tage', 'Der Tag ist schön.', 'De dag is mooi.'],
    ['Nacht', 'nacht', 'die', 'Nächte', 'Die Nacht ist kalt.', 'De nacht is koud.'], ['Abend', 'avond', 'der', 'Abende', 'Am Abend lese ich.', 'Ik lees ’s avonds.'],
    ['Woche', 'week', 'die', 'Wochen', 'Die Woche ist lang.', 'De week is lang.'], ['Uhr', 'uur, klok', 'die', 'Uhren', 'Wie viel Uhr ist es?', 'Hoe laat is het?'],
    ['Montag', 'maandag', 'der', '', 'Am Montag arbeite ich.', 'Op maandag werk ik.'], ['Dienstag', 'dinsdag', 'der', '', 'Am Dienstag lerne ich Deutsch.', 'Op dinsdag leer ik Duits.'],
    ['Mittwoch', 'woensdag', 'der', '', 'Am Mittwoch koche ich.', 'Op woensdag kook ik.'], ['Donnerstag', 'donderdag', 'der', '', 'Am Donnerstag schwimme ich.', 'Op donderdag zwem ik.'],
    ['Freitag', 'vrijdag', 'der', '', 'Am Freitag habe ich frei.', 'Op vrijdag heb ik vrij.'], ['Samstag', 'zaterdag', 'der', '', 'Am Samstag besuche ich Carla.', 'Op zaterdag bezoek ik Carla.'],
    ['Sonntag', 'zondag', 'der', '', 'Am Sonntag schlafe ich lange.', 'Op zondag slaap ik lang.']]),
  ...t('Begroeting', 'A0', [
    ['Guten Tag', 'goedendag', 'p', '', 'Guten Tag, Frau Weber.', 'Goedendag, mevrouw Weber.'], ['Guten Abend', 'goedenavond', 'p', '', 'Guten Abend, Carla!', 'Goedenavond, Carla!'],
    ['Gute Nacht', 'welterusten', 'p', '', 'Gute Nacht, Karst.', 'Welterusten, Karst.'], ['Entschuldigung', 'pardon, sorry', 'p', '', 'Entschuldigung, wo ist der Bahnhof?', 'Pardon, waar is het station?'],
    ['Wie heißt du?', 'hoe heet je?', 'p', '', 'Hallo, wie heißt du?', 'Hallo, hoe heet je?'], ['Ich verstehe nicht.', 'ik begrijp het niet', 'p', '', 'Entschuldigung, ich verstehe nicht.', 'Sorry, ik begrijp het niet.'],
    ['Bis bald', 'tot snel', 'p', '', 'Tschüss, bis bald!', 'Doei, tot snel!'], ['ja', 'ja', 'p', '', 'Ja, das stimmt.', 'Ja, dat klopt.'], ['nein', 'nee', 'p', '', 'Nein, danke.', 'Nee, bedankt.'],
    ['Willkommen', 'welkom', 'p', '', 'Willkommen am Teich!', 'Welkom bij de vijver!'], ['gern', 'graag', 'p', '', 'Ich trinke gern Kaffee.', 'Ik drink graag koffie.']]),
  ...t('Vraagwoorden', 'A0', [
    ['wer', 'wie', 'p', '', 'Wer bist du?', 'Wie ben jij?'], ['was', 'wat', 'p', '', 'Was machst du heute?', 'Wat doe je vandaag?'], ['wo', 'waar', 'p', '', 'Wo wohnst du?', 'Waar woon je?'],
    ['wann', 'wanneer', 'p', '', 'Wann kommst du?', 'Wanneer kom je?'], ['warum', 'waarom', 'p', '', 'Warum lernst du Deutsch?', 'Waarom leer je Duits?'], ['wie', 'hoe', 'p', '', 'Wie alt bist du?', 'Hoe oud ben je?'],
    ['woher', 'waarvandaan', 'p', '', 'Woher kommst du?', 'Waar kom je vandaan?'], ['wohin', 'waarheen', 'p', '', 'Wohin gehst du?', 'Waar ga je naartoe?'], ['wie viel', 'hoeveel', 'p', '', 'Wie viel kostet das?', 'Hoeveel kost dat?']]),
  ...t('Kleine woorden', 'A0', [
    ['und', 'en', 'p', '', 'Karst und Carla lachen.', 'Karst en Carla lachen.'], ['aber', 'maar', 'p', '', 'Ich bin müde, aber froh.', 'Ik ben moe, maar blij.'], ['oder', 'of', 'p', '', 'Kaffee oder Tee?', 'Koffie of thee?'],
    ['nicht', 'niet', 'p', '', 'Ich bin nicht müde.', 'Ik ben niet moe.'], ['sehr', 'heel, erg', 'p', '', 'Der Teich ist sehr schön.', 'De vijver is erg mooi.'], ['auch', 'ook', 'p', '', 'Ich bin auch müde.', 'Ik ben ook moe.'],
    ['hier', 'hier', 'p', '', 'Ich wohne hier.', 'Ik woon hier.'], ['dort', 'daar', 'p', '', 'Carla wohnt dort.', 'Carla woont daar.']]),
  ...t('Werkwoorden', 'A0', [
    ['gehen', 'gaan, lopen', 'v', '', 'Wir gehen zum Teich.', 'Wij gaan naar de vijver.'], ['kommen', 'komen', 'v', '', 'Carla kommt aus Deutschland.', 'Carla komt uit Duitsland.'],
    ['machen', 'doen, maken', 'v', '', 'Was machst du heute?', 'Wat doe je vandaag?'], ['kaufen', 'kopen', 'v', '', 'Ich kaufe Brot.', 'Ik koop brood.'],
    ['lesen', 'lezen', 'v', '', 'Karst liest ein Buch.', 'Karst leest een boek.'], ['schreiben', 'schrijven', 'v', '', 'Ich schreibe eine Nachricht.', 'Ik schrijf een bericht.'],
    ['schlafen', 'slapen', 'v', '', 'Ich schlafe gern lange.', 'Ik slaap graag lang.'], ['arbeiten', 'werken', 'v', '', 'Mein Vater arbeitet viel.', 'Mijn vader werkt veel.'],
    ['spielen', 'spelen', 'v', '', 'Die Kinder spielen.', 'De kinderen spelen.'], ['kochen', 'koken', 'v', '', 'Carla kocht Suppe.', 'Carla kookt soep.'],
    ['mögen', 'leuk vinden, houden van', 'v', '', 'Ich mag Äpfel.', 'Ik hou van appels.'], ['möchten', 'graag willen', 'v', '', 'Ich möchte einen Kaffee.', 'Ik wil graag een koffie.'],
    ['brauchen', 'nodig hebben', 'v', '', 'Ich brauche einen Stuhl.', 'Ik heb een stoel nodig.'], ['helfen', 'helpen', 'v', '', 'Carla hilft Karst.', 'Carla helpt Karst.'],
    ['verstehen', 'begrijpen', 'v', '', 'Ich verstehe dich.', 'Ik begrijp je.'], ['sagen', 'zeggen', 'v', '', 'Was sagst du?', 'Wat zeg je?'], ['fragen', 'vragen', 'v', '', 'Ich frage Carla.', 'Ik vraag het aan Carla.'],
    ['lachen', 'lachen', 'v', '', 'Wir lachen viel.', 'Wij lachen veel.'], ['schwimmen', 'zwemmen', 'v', '', 'Karst schwimmt im Teich.', 'Karst zwemt in de vijver.'], ['wissen', 'weten', 'v', '', 'Ich weiß es nicht.', 'Ik weet het niet.']]),
  ...t('Huis en omgeving', 'A0', [
    ['Zimmer', 'kamer', 'das', 'Zimmer', 'Das Zimmer ist klein.', 'De kamer is klein.'], ['Küche', 'keuken', 'die', 'Küchen', 'Die Küche ist warm.', 'De keuken is warm.'],
    ['Tür', 'deur', 'die', 'Türen', 'Die Tür ist offen.', 'De deur is open.'], ['Fenster', 'raam', 'das', 'Fenster', 'Das Fenster ist groß.', 'Het raam is groot.'],
    ['Bett', 'bed', 'das', 'Betten', 'Das Bett ist weich.', 'Het bed is zacht.'], ['Stuhl', 'stoel', 'der', 'Stühle', 'Der Stuhl ist neu.', 'De stoel is nieuw.'],
    ['Garten', 'tuin', 'der', 'Gärten', 'Der Garten ist grün.', 'De tuin is groen.'], ['Tasche', 'tas', 'die', 'Taschen', 'Meine Tasche ist rot.', 'Mijn tas is rood.'],
    ['Telefon', 'telefoon', 'das', 'Telefone', 'Das Telefon ist neu.', 'De telefoon is nieuw.'], ['Geld', 'geld', 'das', '', 'Ich habe kein Geld.', 'Ik heb geen geld.']]),
  ...t('Natuur en dieren', 'A0', [
    ['Axolotl', 'axolotl', 'der', 'Axolotl', 'Karst ist ein Axolotl.', 'Karst is een axolotl.'], ['Frosch', 'kikker', 'der', 'Frösche', 'Carla ist ein Frosch.', 'Carla is een kikker.'],
    ['Fisch', 'vis', 'der', 'Fische', 'Der Fisch schwimmt.', 'De vis zwemt.'], ['Vogel', 'vogel', 'der', 'Vögel', 'Der Vogel singt.', 'De vogel zingt.'],
    ['Blume', 'bloem', 'die', 'Blumen', 'Die Blume ist schön.', 'De bloem is mooi.'], ['Baum', 'boom', 'der', 'Bäume', 'Der Baum ist alt.', 'De boom is oud.'],
    ['Sonne', 'zon', 'die', '', 'Die Sonne ist warm.', 'De zon is warm.'], ['Wetter', 'weer', 'das', '', 'Das Wetter ist gut.', 'Het weer is goed.']]),
  ...t('Eten en drinken', 'A0', [
    ['Suppe', 'soep', 'die', 'Suppen', 'Die Suppe ist heiß.', 'De soep is heet.'], ['Käse', 'kaas', 'der', '', 'Ich mag Käse.', 'Ik hou van kaas.'], ['Fleisch', 'vlees', 'das', '', 'Ich esse kein Fleisch.', 'Ik eet geen vlees.'],
    ['Ei', 'ei', 'das', 'Eier', 'Ich esse ein Ei.', 'Ik eet een ei.'], ['Reis', 'rijst', 'der', '', 'Der Reis ist lecker.', 'De rijst is lekker.'], ['Salat', 'salade', 'der', 'Salate', 'Der Salat ist frisch.', 'De salade is vers.'],
    ['Tee', 'thee', 'der', '', 'Ich trinke Tee.', 'Ik drink thee.'], ['Bier', 'bier', 'das', 'Biere', 'Das Bier ist kalt.', 'Het bier is koud.'], ['Kuchen', 'taart, cake', 'der', 'Kuchen', 'Der Kuchen ist süß.', 'De taart is zoet.'],
    ['Gemüse', 'groente', 'das', '', 'Ich esse gern Gemüse.', 'Ik eet graag groente.'], ['Obst', 'fruit', 'das', '', 'Das Obst ist frisch.', 'Het fruit is vers.'], ['Banane', 'banaan', 'die', 'Bananen', 'Die Banane ist gelb.', 'De banaan is geel.'],
    ['Frühstück', 'ontbijt', 'das', '', 'Das Frühstück ist fertig.', 'Het ontbijt is klaar.'], ['Rechnung', 'rekening', 'die', 'Rechnungen', 'Die Rechnung, bitte.', 'De rekening, alsjeblieft.'],
    ['Speisekarte', 'menukaart', 'die', 'Speisekarten', 'Die Speisekarte, bitte.', 'De menukaart, alsjeblieft.']]),
  ...t('Bijvoeglijke naamwoorden', 'A0', [
    ['gut', 'goed', 'a', '', 'Das Wetter ist gut.', 'Het weer is goed.'], ['schlecht', 'slecht', 'a', '', 'Das Wetter ist schlecht.', 'Het weer is slecht.'], ['alt', 'oud', 'a', '', 'Der Baum ist alt.', 'De boom is oud.'],
    ['neu', 'nieuw', 'a', '', 'Das Auto ist neu.', 'De auto is nieuw.'], ['jung', 'jong', 'a', '', 'Das Kind ist jung.', 'Het kind is jong.'], ['schnell', 'snel', 'a', '', 'Der Zug ist schnell.', 'De trein is snel.'],
    ['langsam', 'langzaam', 'a', '', 'Der Frosch ist langsam.', 'De kikker is langzaam.'], ['kalt', 'koud', 'a', '', 'Das Wasser ist kalt.', 'Het water is koud.'], ['warm', 'warm', 'a', '', 'Der Tee ist warm.', 'De thee is warm.'],
    ['heiß', 'heet', 'a', '', 'Der Kaffee ist heiß.', 'De koffie is heet.'], ['froh', 'blij', 'a', '', 'Karst ist froh.', 'Karst is blij.'], ['traurig', 'verdrietig', 'a', '', 'Der Hund ist traurig.', 'De hond is verdrietig.'],
    ['nett', 'aardig', 'a', '', 'Carla ist nett.', 'Carla is aardig.'], ['lustig', 'grappig', 'a', '', 'Karst ist lustig.', 'Karst is grappig.'], ['hungrig', 'hongerig', 'a', '', 'Ich bin hungrig.', 'Ik heb honger.'],
    ['durstig', 'dorstig', 'a', '', 'Karst ist durstig.', 'Karst heeft dorst.'], ['krank', 'ziek', 'a', '', 'Mein Bruder ist krank.', 'Mijn broer is ziek.'], ['richtig', 'juist', 'a', '', 'Das ist richtig.', 'Dat is juist.'],
    ['falsch', 'fout', 'a', '', 'Das ist falsch.', 'Dat is fout.'], ['leicht', 'makkelijk', 'a', '', 'Die Frage ist leicht.', 'De vraag is makkelijk.'], ['schwer', 'moeilijk', 'a', '', 'Die Grammatik ist schwer.', 'De grammatica is moeilijk.']]),
  ...t('Stad en reizen', 'A1', [
    ['Stadt', 'stad', 'die', 'Städte', 'Die Stadt ist schön.', 'De stad is mooi.'], ['Straße', 'straat', 'die', 'Straßen', 'Die Straße ist lang.', 'De straat is lang.'], ['Bahnhof', 'station', 'der', 'Bahnhöfe', 'Wo ist der Bahnhof?', 'Waar is het station?'],
    ['Zug', 'trein', 'der', 'Züge', 'Der Zug kommt gleich.', 'De trein komt zo.'], ['Auto', 'auto', 'das', 'Autos', 'Das Auto ist neu.', 'De auto is nieuw.'], ['Fahrrad', 'fiets', 'das', 'Fahrräder', 'Mein Fahrrad ist blau.', 'Mijn fiets is blauw.'],
    ['Restaurant', 'restaurant', 'das', 'Restaurants', 'Das Restaurant ist voll.', 'Het restaurant is vol.'], ['Schule', 'school', 'die', 'Schulen', 'Die Schule ist groß.', 'De school is groot.'], ['Urlaub', 'vakantie', 'der', '', 'Ich mache Urlaub in Berlin.', 'Ik ga op vakantie naar Berlijn.']]),
  ...t('Lichaam', 'A1', [
    ['Kopf', 'hoofd', 'der', 'Köpfe', 'Mein Kopf tut weh.', 'Mijn hoofd doet pijn.'], ['Hand', 'hand', 'die', 'Hände', 'Die Hand ist kalt.', 'De hand is koud.'], ['Auge', 'oog', 'das', 'Augen', 'Carla hat große Augen.', 'Carla heeft grote ogen.'],
    ['Herz', 'hart', 'das', 'Herzen', 'Mein Herz ist froh.', 'Mijn hart is blij.'], ['Fuß', 'voet', 'der', 'Füße', 'Mein Fuß tut weh.', 'Mijn voet doet pijn.'], ['Mund', 'mond', 'der', 'Münder', 'Der Mund ist offen.', 'De mond is open.']]),
  ...t('Taal en leren', 'A1', [
    ['Deutsch', 'Duits', 'p', '', 'Karst lernt Deutsch.', 'Karst leert Duits.'], ['Sprache', 'taal', 'die', 'Sprachen', 'Deutsch ist eine Sprache.', 'Duits is een taal.'], ['Wort', 'woord', 'das', 'Wörter', 'Das Wort ist neu.', 'Het woord is nieuw.'],
    ['Satz', 'zin', 'der', 'Sätze', 'Der Satz ist kurz.', 'De zin is kort.'], ['Frage', 'vraag', 'die', 'Fragen', 'Ich habe eine Frage.', 'Ik heb een vraag.'], ['Antwort', 'antwoord', 'die', 'Antworten', 'Die Antwort ist richtig.', 'Het antwoord is juist.'],
    ['Hilfe', 'hulp', 'die', '', 'Ich brauche Hilfe.', 'Ik heb hulp nodig.']]),
  ...t('Werk', 'A1', [
    ['Arbeit', 'werk', 'die', '', 'Die Arbeit beginnt um acht Uhr.', 'Het werk begint om acht uur.'], ['Beruf', 'beroep', 'der', 'Berufe', 'Was ist dein Beruf?', 'Wat is jouw beroep?'], ['Chef', 'baas', 'der', 'Chefs', 'Mein Chef ist nett.', 'Mijn baas is aardig.'],
    ['Büro', 'kantoor', 'das', 'Büros', 'Das Büro ist klein.', 'Het kantoor is klein.'], ['Kollege', 'collega', 'der', 'Kollegen', 'Mein Kollege kocht Kaffee.', 'Mijn collega zet koffie.'], ['Termin', 'afspraak', 'der', 'Termine', 'Ich habe heute einen Termin.', 'Ik heb vandaag een afspraak.']]),
  ...t('Winkelen', 'A1', [
    ['Supermarkt', 'supermarkt', 'der', 'Supermärkte', 'Der Supermarkt ist offen.', 'De supermarkt is open.'], ['Preis', 'prijs', 'der', 'Preise', 'Der Preis ist gut.', 'De prijs is goed.'], ['Euro', 'euro', 'der', 'Euros', 'Das Brot kostet zwei Euro.', 'Het brood kost twee euro.'],
    ['teuer', 'duur', 'a', '', 'Der Kaffee ist teuer.', 'De koffie is duur.'], ['billig', 'goedkoop', 'a', '', 'Das Obst ist billig.', 'Het fruit is goedkoop.'], ['bezahlen', 'betalen', 'v', '', 'Ich bezahle die Rechnung.', 'Ik betaal de rekening.'], ['kosten', 'kosten', 'v', '', 'Das kostet zehn Euro.', 'Dat kost tien euro.']]),
  ...t('Gevoelens', 'A1', [
    ['glücklich', 'gelukkig', 'a', '', 'Karst ist glücklich.', 'Karst is gelukkig.'], ['wütend', 'boos', 'a', '', 'Der Chef ist wütend.', 'De baas is boos.'], ['nervös', 'zenuwachtig', 'a', '', 'Ich bin nervös.', 'Ik ben zenuwachtig.'],
    ['lieben', 'liefhebben', 'v', '', 'Ich liebe meine Familie.', 'Ik hou van mijn familie.'], ['Liebe', 'liefde', 'die', '', 'Die Liebe ist schön.', 'De liefde is mooi.'], ['Angst', 'angst', 'die', 'Ängste', 'Ich habe keine Angst.', 'Ik ben niet bang.'],
    ['lächeln', 'glimlachen', 'v', '', 'Carla lächelt.', 'Carla glimlacht.'], ['weinen', 'huilen', 'v', '', 'Das Kind weint.', 'Het kind huilt.']]),
  ...t('Dagelijks leven', 'A1', [
    ['aufstehen', 'opstaan', 'v', '', 'Ich stehe um sieben Uhr auf.', 'Ik sta om zeven uur op.'], ['anrufen', 'bellen', 'v', '', 'Ich rufe Carla an.', 'Ik bel Carla.'], ['warten', 'wachten', 'v', '', 'Ich warte am Bahnhof.', 'Ik wacht op het station.'],
    ['besuchen', 'bezoeken', 'v', '', 'Ich besuche meine Mutter.', 'Ik bezoek mijn moeder.'], ['wollen', 'willen', 'v', '', 'Ich will schlafen.', 'Ik wil slapen.'], ['können', 'kunnen', 'v', '', 'Ich kann schwimmen.', 'Ik kan zwemmen.'], ['müssen', 'moeten', 'v', '', 'Ich muss arbeiten.', 'Ik moet werken.']]),
  ...t('Eten en drinken', 'A1', [
    ['Saft', 'sap', 'der', 'Säfte', 'Ich trinke gern Saft.', 'Ik drink graag sap.'], ['Wurst', 'worst', 'die', 'Würste', 'Die Wurst ist lecker.', 'De worst is lekker.'], ['Kartoffel', 'aardappel', 'die', 'Kartoffeln', 'Die Kartoffel ist heiß.', 'De aardappel is heet.'],
    ['Tomate', 'tomaat', 'die', 'Tomaten', 'Die Tomate ist rot.', 'De tomaat is rood.'], ['Zucker', 'suiker', 'der', '', 'Der Zucker ist weiß.', 'De suiker is wit.'], ['Glas', 'glas', 'das', 'Gläser', 'Ein Glas Wasser, bitte.', 'Een glas water, alsjeblieft.'],
    ['Flasche', 'fles', 'die', 'Flaschen', 'Die Flasche ist groß.', 'De fles is groot.'], ['Teller', 'bord', 'der', 'Teller', 'Der Teller ist neu.', 'Het bord is nieuw.'], ['Löffel', 'lepel', 'der', 'Löffel', 'Der Löffel ist klein.', 'De lepel is klein.'],
    ['Gabel', 'vork', 'die', 'Gabeln', 'Ich brauche eine Gabel.', 'Ik heb een vork nodig.'], ['Messer', 'mes', 'das', 'Messer', 'Ich brauche ein Messer.', 'Ik heb een mes nodig.'], ['Stück', 'stuk', 'das', 'Stücke', 'Ein Stück Kuchen, bitte.', 'Een stuk taart, alsjeblieft.'],
    ['lecker', 'lekker', 'a', '', 'Der Kuchen ist lecker.', 'De taart is lekker.'], ['süß', 'zoet', 'a', '', 'Der Kuchen ist süß.', 'De taart is zoet.'], ['bestellen', 'bestellen', 'v', '', 'Ich bestelle einen Kaffee.', 'Ik bestel een koffie.'], ['schmecken', 'smaken', 'v', '', 'Das Brot schmeckt gut.', 'Het brood smaakt goed.']]),
  ...t('Huis en omgeving', 'A1', [
    ['Wohnung', 'woning', 'die', 'Wohnungen', 'Meine Wohnung ist klein.', 'Mijn woning is klein.'], ['Wohnzimmer', 'woonkamer', 'das', 'Wohnzimmer', 'Das Wohnzimmer ist groß.', 'De woonkamer is groot.'], ['Schlafzimmer', 'slaapkamer', 'das', 'Schlafzimmer', 'Das Schlafzimmer ist dunkel.', 'De slaapkamer is donker.'],
    ['Badezimmer', 'badkamer', 'das', 'Badezimmer', 'Das Badezimmer ist weiß.', 'De badkamer is wit.'], ['Sofa', 'bank (zitbank)', 'das', 'Sofas', 'Das Sofa ist blau.', 'De bank is blauw.'], ['Lampe', 'lamp', 'die', 'Lampen', 'Die Lampe ist neu.', 'De lamp is nieuw.'],
    ['Schrank', 'kast', 'der', 'Schränke', 'Der Schrank ist braun.', 'De kast is bruin.'], ['Regal', 'rek, plank', 'das', 'Regale', 'Das Regal ist groß.', 'Het rek is groot.'], ['Teppich', 'tapijt', 'der', 'Teppiche', 'Der Teppich ist rot.', 'Het tapijt is rood.'],
    ['Spiegel', 'spiegel', 'der', 'Spiegel', 'Der Spiegel ist klein.', 'De spiegel is klein.'], ['Treppe', 'trap', 'die', 'Treppen', 'Die Treppe ist alt.', 'De trap is oud.'], ['Balkon', 'balkon', 'der', 'Balkone', 'Der Balkon ist klein.', 'Het balkon is klein.'],
    ['Schlüssel', 'sleutel', 'der', 'Schlüssel', 'Wo ist mein Schlüssel?', 'Waar is mijn sleutel?'], ['hell', 'licht (helder)', 'a', '', 'Das Zimmer ist hell.', 'De kamer is licht.'], ['dunkel', 'donker', 'a', '', 'Die Küche ist dunkel.', 'De keuken is donker.'], ['gemütlich', 'gezellig', 'a', '', 'Mein Zimmer ist gemütlich.', 'Mijn kamer is gezellig.']]),
  ...t('Tijd', 'A1', [
    ['Minute', 'minuut', 'die', 'Minuten', 'Ich warte zehn Minuten.', 'Ik wacht tien minuten.'], ['Stunde', 'uur (tijdsduur)', 'die', 'Stunden', 'Ich lerne eine Stunde Deutsch.', 'Ik leer een uur Duits.'], ['Mittag', 'middag (12 uur)', 'der', 'Mittage', 'Am Mittag esse ich Suppe.', 'Om twaalf uur eet ik soep.'],
    ['Nachmittag', 'namiddag', 'der', 'Nachmittage', 'Am Nachmittag lese ich ein Buch.', 'In de namiddag lees ik een boek.'], ['Zeit', 'tijd', 'die', '', 'Ich habe heute keine Zeit.', 'Ik heb vandaag geen tijd.'], ['Wecker', 'wekker', 'der', 'Wecker', 'Der Wecker klingelt um sieben.', 'De wekker gaat om zeven uur.'],
    ['Pause', 'pauze', 'die', 'Pausen', 'Wir machen eine Pause.', 'Wij nemen een pauze.'], ['früh', 'vroeg', 'a', '', 'Ich stehe früh auf.', 'Ik sta vroeg op.'], ['spät', 'laat', 'a', '', 'Es ist schon spät.', 'Het is al laat.'],
    ['immer', 'altijd', 'p', '', 'Ich trinke immer Kaffee.', 'Ik drink altijd koffie.'], ['oft', 'vaak', 'p', '', 'Karst schwimmt oft.', 'Karst zwemt vaak.'], ['manchmal', 'soms', 'p', '', 'Manchmal koche ich Suppe.', 'Soms kook ik soep.'], ['nie', 'nooit', 'p', '', 'Ich trinke nie Bier.', 'Ik drink nooit bier.']]),
  ...t('Dagelijks leven', 'A1', [
    ['Mittagessen', 'lunch', 'das', '', 'Das Mittagessen ist fertig.', 'De lunch is klaar.'], ['Abendessen', 'avondeten', 'das', '', 'Das Abendessen ist lecker.', 'Het avondeten is lekker.'],
    ['einkaufen', 'boodschappen doen', 'v', '', 'Ich kaufe im Supermarkt ein.', 'Ik doe boodschappen in de supermarkt.'], ['fernsehen', 'tv kijken', 'v', '', 'Am Abend sehe ich fern.', 'S avonds kijk ik tv.'],
    ['aufräumen', 'opruimen', 'v', '', 'Ich räume die Küche auf.', 'Ik ruim de keuken op.'], ['anfangen', 'beginnen', 'v', '', 'Der Kurs fängt um acht Uhr an.', 'De cursus begint om acht uur.'],
    ['mitkommen', 'meekomen', 'v', '', 'Kommst du mit?', 'Kom je mee?'], ['aufwachen', 'wakker worden', 'v', '', 'Ich wache früh auf.', 'Ik word vroeg wakker.'],
    ['ankommen', 'aankomen', 'v', '', 'Der Zug kommt um acht Uhr an.', 'De trein komt om acht uur aan.'], ['duschen', 'douchen', 'v', '', 'Ich dusche am Morgen.', 'Ik douche in de ochtend.'], ['frühstücken', 'ontbijten', 'v', '', 'Wir frühstücken um acht Uhr.', 'Wij ontbijten om acht uur.']]),
  ...t('Stad en reizen', 'A1', [
    ['Haltestelle', 'halte', 'die', 'Haltestellen', 'Die Haltestelle ist hier.', 'De halte is hier.'], ['Bus', 'bus', 'der', 'Busse', 'Der Bus kommt gleich.', 'De bus komt zo.'], ['Fahrkarte', 'vervoersbewijs', 'die', 'Fahrkarten', 'Eine Fahrkarte, bitte.', 'Een kaartje, alsjeblieft.'],
    ['Flughafen', 'vliegveld', 'der', 'Flughäfen', 'Der Flughafen ist groß.', 'Het vliegveld is groot.'], ['Koffer', 'koffer', 'der', 'Koffer', 'Mein Koffer ist schwer.', 'Mijn koffer is zwaar.'], ['Hotel', 'hotel', 'das', 'Hotels', 'Das Hotel ist teuer.', 'Het hotel is duur.'],
    ['weit', 'ver', 'a', '', 'Der Bahnhof ist weit.', 'Het station is ver.'], ['nah', 'dichtbij', 'a', '', 'Das Hotel ist nah.', 'Het hotel is dichtbij.'], ['links', 'links', 'p', '', 'Das Hotel ist links.', 'Het hotel is links.'], ['rechts', 'rechts', 'p', '', 'Der Bahnhof ist rechts.', 'Het station is rechts.'],
    ['geradeaus', 'rechtdoor', 'p', '', 'Gehen Sie geradeaus.', 'Ga rechtdoor.'], ['nehmen', 'nemen', 'v', '', 'Ich nehme den Bus.', 'Ik neem de bus.'], ['fahren', 'rijden, reizen', 'v', '', 'Wir fahren nach Berlin.', 'Wij reizen naar Berlijn.']]),
  ...t('Gevoelens', 'A1', [
    ['Hunger', 'honger', 'der', '', 'Ich habe Hunger.', 'Ik heb honger.'], ['Durst', 'dorst', 'der', '', 'Ich habe Durst.', 'Ik heb dorst.'], ['Fieber', 'koorts', 'das', '', 'Ich habe Fieber.', 'Ik heb koorts.'],
    ['Erkältung', 'verkoudheid', 'die', 'Erkältungen', 'Ich habe eine Erkältung.', 'Ik ben verkouden.'], ['Arzt', 'dokter (arts)', 'der', 'Ärzte', 'Der Arzt ist nett.', 'De dokter is aardig.'], ['wehtun', 'pijn doen', 'v', '', 'Mein Kopf tut weh.', 'Mijn hoofd doet pijn.'], ['gesund', 'gezond', 'a', '', 'Ich bin gesund.', 'Ik ben gezond.']]),
  ...t('Lichaam', 'A1', [
    ['Bauch', 'buik', 'der', 'Bäuche', 'Mein Bauch tut weh.', 'Mijn buik doet pijn.'], ['Rücken', 'rug', 'der', 'Rücken', 'Mein Rücken tut weh.', 'Mijn rug doet pijn.'], ['Zahn', 'tand', 'der', 'Zähne', 'Mein Zahn tut weh.', 'Mijn tand doet pijn.']]),
  ...t('Werk', 'A1', [
    ['Lehrer', 'leraar', 'der', 'Lehrer', 'Mein Vater ist Lehrer.', 'Mijn vader is leraar.'], ['Lehrerin', 'lerares', 'die', 'Lehrerinnen', 'Meine Mutter ist Lehrerin.', 'Mijn moeder is lerares.'], ['Koch', 'kok', 'der', 'Köche', 'Der Koch kocht Suppe.', 'De kok kookt soep.'],
    ['Student', 'student', 'der', 'Studenten', 'Karst ist Student.', 'Karst is student.'], ['Studentin', 'studente', 'die', 'Studentinnen', 'Meine Schwester ist Studentin.', 'Mijn zus is studente.'], ['Besprechung', 'vergadering', 'die', 'Besprechungen', 'Die Besprechung beginnt um zehn.', 'De vergadering begint om tien.'],
    ['E-Mail', 'e-mail', 'die', 'E-Mails', 'Ich schreibe eine E-Mail.', 'Ik schrijf een e-mail.'], ['studieren', 'studeren', 'v', '', 'Ich studiere in Utrecht.', 'Ik studeer in Utrecht.']]),
  ...t('Winkelen', 'A1', [
    ['Kasse', 'kassa', 'die', 'Kassen', 'Die Kasse ist dort.', 'De kassa is daar.'], ['Tüte', 'zak, tas', 'die', 'Tüten', 'Ich brauche eine Tüte.', 'Ik heb een zak nodig.'], ['Markt', 'markt', 'der', 'Märkte', 'Der Markt ist am Samstag.', 'De markt is op zaterdag.'],
    ['Kilo', 'kilo', 'das', 'Kilos', 'Ein Kilo Äpfel, bitte.', 'Een kilo appels, alsjeblieft.'], ['Packung', 'pak, verpakking', 'die', 'Packungen', 'Eine Packung Milch, bitte.', 'Een pak melk, alsjeblieft.'], ['Angebot', 'aanbieding', 'das', 'Angebote', 'Das ist ein Angebot.', 'Dat is een aanbieding.'], ['bar', 'contant', 'p', '', 'Ich bezahle bar.', 'Ik betaal contant.']]),
  ...t('Getallen en prijzen', 'A1', [
    ['elf', 'elf', 'p', '', 'Es ist elf Uhr.', 'Het is elf uur.'], ['zwölf', 'twaalf', 'p', '', 'Es ist zwölf Uhr.', 'Het is twaalf uur.'], ['zwanzig', 'twintig', 'p', '', 'Das kostet zwanzig Euro.', 'Dat kost twintig euro.'],
    ['dreißig', 'dertig', 'p', '', 'Ich bin dreißig Jahre alt.', 'Ik ben dertig jaar oud.'], ['fünfzig', 'vijftig', 'p', '', 'Das Buch kostet fünfzig Euro.', 'Het boek kost vijftig euro.'], ['hundert', 'honderd', 'p', '', 'Hundert Euro, bitte.', 'Honderd euro, alsjeblieft.']]),
  ...t('Hobbys', 'A1', [
    ['Hobby', 'hobby', 'das', 'Hobbys', 'Mein Hobby ist Schwimmen.', 'Mijn hobby is zwemmen.'], ['Sport', 'sport', 'der', '', 'Ich mache gern Sport.', 'Ik sport graag.'], ['Musik', 'muziek', 'die', '', 'Ich höre gern Musik.', 'Ik luister graag naar muziek.'],
    ['Fußball', 'voetbal', 'der', '', 'Wir spielen Fußball.', 'Wij voetballen.'], ['Film', 'film', 'der', 'Filme', 'Der Film ist lustig.', 'De film is grappig.'], ['hören', 'horen, luisteren naar', 'v', '', 'Ich höre Musik.', 'Ik luister naar muziek.'],
    ['singen', 'zingen', 'v', '', 'Carla kann singen.', 'Carla kan zingen.'], ['tanzen', 'dansen', 'v', '', 'Wir tanzen am Samstag.', 'Wij dansen op zaterdag.'], ['üben', 'oefenen', 'v', '', 'Wir üben zusammen.', 'Wij oefenen samen.'], ['zusammen', 'samen', 'p', '', 'Wir lernen zusammen.', 'Wij leren samen.']]),
  ...t('Modale werkwoorden', 'A1', [['dürfen', 'mogen (toestemming)', 'v', '', 'Darf ich hier sitzen?', 'Mag ik hier zitten?']]),
  ...t('Reizen en plannen', 'A1', [
    ['Reise', 'reis', 'die', 'Reisen', 'Die Reise ist lang.', 'De reis is lang.'], ['Plan', 'plan', 'der', 'Pläne', 'Ich habe einen Plan.', 'Ik heb een plan.'], ['Welt', 'wereld', 'die', 'Welten', 'Die Welt ist groß.', 'De wereld is groot.'],
    ['Land', 'land', 'das', 'Länder', 'Deutschland ist ein Land.', 'Duitsland is een land.'], ['Karte', 'kaart, landkaart', 'die', 'Karten', 'Die Karte ist alt.', 'De kaart is oud.'], ['Pass', 'paspoort', 'der', 'Pässe', 'Mein Pass ist neu.', 'Mijn paspoort is nieuw.'],
    ['reisen', 'reizen', 'v', '', 'Wir reisen gern.', 'Wij reizen graag.'], ['planen', 'plannen', 'v', '', 'Wir planen die Reise.', 'Wij plannen de reis.'], ['packen', 'inpakken', 'v', '', 'Ich packe meinen Koffer.', 'Ik pak mijn koffer in.'],
    ['zuerst', 'eerst', 'p', '', 'Zuerst fahren wir nach Berlin.', 'Eerst reizen we naar Berlijn.'], ['dann', 'dan, daarna', 'p', '', 'Dann sehen wir viele Länder.', 'Dan zien we veel landen.']]),
  ...t('Weekend', 'A2', [
    ['Wochenende', 'weekend', 'das', 'Wochenenden', 'Am Wochenende schlafe ich lange.', 'In het weekend slaap ik lang.'], ['Ausflug', 'uitstapje', 'der', 'Ausflüge', 'Wir machen einen Ausflug.', 'Wij maken een uitstapje.'], ['Party', 'feest', 'die', 'Partys', 'Die Party ist am Samstag.', 'Het feest is op zaterdag.'],
    ['Geschenk', 'cadeau', 'das', 'Geschenke', 'Das Geschenk ist klein.', 'Het cadeau is klein.'], ['Spaziergang', 'wandeling', 'der', 'Spaziergänge', 'Der Spaziergang ist schön.', 'De wandeling is mooi.'], ['Besuch', 'bezoek', 'der', 'Besuche', 'Heute bekomme ich Besuch.', 'Vandaag krijg ik bezoek.'],
    ['gestern', 'gisteren', 'p', '', 'Gestern habe ich gekocht.', 'Gisteren heb ik gekookt.'], ['treffen', 'ontmoeten, afspreken met', 'v', '', 'Ich treffe Carla am Samstag.', 'Ik spreek op zaterdag af met Carla.'], ['sehen', 'zien, kijken', 'v', '', 'Wir sehen einen Film.', 'Wij kijken een film.'],
    ['bleiben', 'blijven', 'v', '', 'Ich bleibe zu Hause.', 'Ik blijf thuis.'], ['wandern', 'wandelen (in de natuur)', 'v', '', 'Wir wandern gern.', 'Wij wandelen graag.'], ['laufen', 'lopen, rennen', 'v', '', 'Ich laufe schnell.', 'Ik loop snel.']]),
  ...t('Op reis', 'A2', [
    ['Gleis', 'perron, spoor', 'das', 'Gleise', 'Der Zug fährt auf Gleis fünf ab.', 'De trein vertrekt van spoor vijf.'], ['Abfahrt', 'vertrek', 'die', 'Abfahrten', 'Die Abfahrt ist um acht Uhr.', 'Het vertrek is om acht uur.'], ['Ankunft', 'aankomst', 'die', 'Ankünfte', 'Die Ankunft ist um zehn Uhr.', 'De aankomst is om tien uur.'],
    ['Stadtplan', 'plattegrond', 'der', 'Stadtpläne', 'Der Stadtplan ist klein.', 'De plattegrond is klein.'], ['Sehenswürdigkeit', 'bezienswaardigheid', 'die', 'Sehenswürdigkeiten', 'Berlin hat viele Sehenswürdigkeiten.', 'Berlijn heeft veel bezienswaardigheden.'], ['Brücke', 'brug', 'die', 'Brücken', 'Die Brücke ist alt.', 'De brug is oud.'],
    ['Platz', 'plein', 'der', 'Plätze', 'Der Platz ist groß.', 'Het plein is groot.'], ['Turm', 'toren', 'der', 'Türme', 'Der Turm ist hoch.', 'De toren is hoog.'], ['Museum', 'museum', 'das', 'Museen', 'Das Museum ist offen.', 'Het museum is open.'],
    ['Reservierung', 'reservering', 'die', 'Reservierungen', 'Ich habe eine Reservierung.', 'Ik heb een reservering.'], ['hoch', 'hoog', 'a', '', 'Das Haus ist sehr hoch.', 'Het huis is erg hoog.'], ['berühmt', 'beroemd', 'a', '', 'Berlin ist berühmt.', 'Berlijn is beroemd.'],
    ['abfahren', 'vertrekken', 'v', '', 'Der Zug fährt um acht Uhr ab.', 'De trein vertrekt om acht uur.'], ['besichtigen', 'bezoeken (bezienswaardigheid)', 'v', '', 'Wir besichtigen das Museum.', 'Wij bezoeken het museum.']]),
  ...t('Gezondheid', 'A2', [
    ['Praxis', 'praktijk (dokter)', 'die', 'Praxen', 'Die Praxis ist am Montag offen.', 'De praktijk is op maandag open.'], ['Rezept', 'recept', 'das', 'Rezepte', 'Der Arzt schreibt ein Rezept.', 'De dokter schrijft een recept.'], ['Medikament', 'medicijn', 'das', 'Medikamente', 'Ich nehme ein Medikament.', 'Ik neem een medicijn.'],
    ['Apotheke', 'apotheek', 'die', 'Apotheken', 'Die Apotheke ist neben dem Bahnhof.', 'De apotheek is naast het station.'], ['Schmerz', 'pijn', 'der', 'Schmerzen', 'Ich habe starke Schmerzen.', 'Ik heb veel pijn.'], ['Husten', 'hoest', 'der', '', 'Ich habe Husten.', 'Ik heb hoest.'],
    ['Hals', 'keel, hals', 'der', 'Hälse', 'Mein Hals tut weh.', 'Mijn keel doet pijn.'], ['Tablette', 'tablet', 'die', 'Tabletten', 'Ich nehme zwei Tabletten.', 'Ik neem twee tabletten.'], ['wichtig', 'belangrijk', 'a', '', 'Gesundheit ist wichtig.', 'Gezondheid is belangrijk.'], ['stark', 'sterk', 'a', '', 'Ich habe starke Schmerzen.', 'Ik heb veel pijn.'],
    ['sich fühlen', 'zich voelen', 'v', '', 'Ich fühle mich müde.', 'Ik voel me moe.'], ['sich ausruhen', 'uitrusten', 'v', '', 'Ich ruhe mich aus.', 'Ik rust uit.'], ['untersuchen', 'onderzoeken', 'v', '', 'Der Arzt untersucht mich.', 'De dokter onderzoekt me.']]),
  ...t('Wonen en stad', 'A2', [
    ['Miete', 'huur', 'die', 'Mieten', 'Die Miete ist hoch.', 'De huur is hoog.'], ['Nachbar', 'buurman', 'der', 'Nachbarn', 'Mein Nachbar ist freundlich.', 'Mijn buurman is vriendelijk.'], ['Stockwerk', 'verdieping', 'das', 'Stockwerke', 'Das Haus hat drei Stockwerke.', 'Het huis heeft drie verdiepingen.'],
    ['Aufzug', 'lift', 'der', 'Aufzüge', 'Der Aufzug ist neu.', 'De lift is nieuw.'], ['Innenstadt', 'binnenstad', 'die', 'Innenstädte', 'Die Innenstadt ist groß.', 'De binnenstad is groot.'], ['Vorort', 'voorstad', 'der', 'Vororte', 'Der Vorort ist ruhig.', 'De voorstad is rustig.'],
    ['Park', 'park', 'der', 'Parks', 'Der Park ist grün.', 'Het park is groen.'], ['Verkehr', 'verkeer', 'der', '', 'Der Verkehr ist laut.', 'Het verkeer is luid.'], ['ruhig', 'rustig', 'a', '', 'Mein Zimmer ist ruhig.', 'Mijn kamer is rustig.'], ['laut', 'luid, lawaaiig', 'a', '', 'Die Stadt ist laut.', 'De stad is lawaaiig.'],
    ['günstig', 'voordelig', 'a', '', 'Die Wohnung ist günstig.', 'De woning is voordelig.'], ['umziehen', 'verhuizen', 'v', '', 'Wir ziehen nach Berlin um.', 'Wij verhuizen naar Berlijn.'], ['mieten', 'huren', 'v', '', 'Ich miete eine Wohnung.', 'Ik huur een woning.']]),
  ...t('Werk en school', 'A2', [
    ['Ausbildung', 'beroepsopleiding', 'die', 'Ausbildungen', 'Ich mache eine Ausbildung.', 'Ik doe een beroepsopleiding.'], ['Universität', 'universiteit', 'die', 'Universitäten', 'Die Universität ist groß.', 'De universiteit is groot.'], ['Studium', 'studie', 'das', 'Studien', 'Mein Studium ist interessant.', 'Mijn studie is interessant.'],
    ['Prüfung', 'examen, toets', 'die', 'Prüfungen', 'Die Prüfung ist schwer.', 'Het examen is moeilijk.'], ['Note', 'cijfer', 'die', 'Noten', 'Die Note ist gut.', 'Het cijfer is goed.'], ['Gehalt', 'salaris', 'das', 'Gehälter', 'Das Gehalt ist gut.', 'Het salaris is goed.'],
    ['Erfahrung', 'ervaring', 'die', 'Erfahrungen', 'Ich habe viel Erfahrung.', 'Ik heb veel ervaring.'], ['Bewerbung', 'sollicitatie', 'die', 'Bewerbungen', 'Ich schreibe eine Bewerbung.', 'Ik schrijf een sollicitatie.'], ['Lebenslauf', 'cv', 'der', 'Lebensläufe', 'Mein Lebenslauf ist kurz.', 'Mijn cv is kort.'],
    ['sich bewerben', 'solliciteren', 'v', '', 'Ich bewerbe mich in Berlin.', 'Ik solliciteer in Berlijn.'], ['verdienen', 'verdienen', 'v', '', 'Ich verdiene gut.', 'Ik verdien goed.'], ['weil', 'omdat', 'p', '', 'Ich bleibe zu Hause, weil ich krank bin.', 'Ik blijf thuis omdat ik ziek ben.'], ['dass', 'dat (voegwoord)', 'p', '', 'Ich glaube, dass er nett ist.', 'Ik geloof dat hij aardig is.']]),
  ...t('Vroeger', 'A2', [
    ['Kindheit', 'jeugd', 'die', '', 'Meine Kindheit war schön.', 'Mijn jeugd was mooi.'], ['Erinnerung', 'herinnering', 'die', 'Erinnerungen', 'Das ist eine schöne Erinnerung.', 'Dat is een mooie herinnering.'], ['Großmutter', 'oma', 'die', 'Großmütter', 'Meine Großmutter wohnte am Teich.', 'Mijn oma woonde bij de vijver.'],
    ['Großvater', 'opa', 'der', 'Großväter', 'Mein Großvater war Koch.', 'Mijn opa was kok.'], ['Jahr', 'jaar', 'das', 'Jahre', 'Ich lerne seit einem Jahr Deutsch.', 'Ik leer al een jaar Duits.'], ['Geschichte', 'verhaal, geschiedenis', 'die', 'Geschichten', 'Die Geschichte ist lang.', 'Het verhaal is lang.'],
    ['damals', 'toen, destijds', 'p', '', 'Damals war ich klein.', 'Toen was ik klein.'], ['früher', 'vroeger', 'p', '', 'Früher wohnte ich in Utrecht.', 'Vroeger woonde ik in Utrecht.'], ['erzählen', 'vertellen', 'v', '', 'Carla erzählt eine Geschichte.', 'Carla vertelt een verhaal.'],
    ['sich erinnern', 'zich herinneren', 'v', '', 'Ich erinnere mich gut.', 'Ik herinner het me goed.'], ['passieren', 'gebeuren', 'v', '', 'Was ist passiert?', 'Wat is er gebeurd?'], ['vergessen', 'vergeten', 'v', '', 'Ich habe es vergessen.', 'Ik ben het vergeten.']]),
];
