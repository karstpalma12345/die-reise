// Extra woordenlijst, per thema. Nieuwe woorden: voeg een regel toe in een groep (of maak een nieuwe groep).
// Regel = [Duits, Nederlands, soort, meervoud, voorbeeldzin, vertaling]
// soort: 'der' | 'die' | 'das' (zelfstandig naamwoord) | 'v' werkwoord | 'a' bijvoeglijk naamwoord | 'p' zin/overig
type Kind = 'der' | 'die' | 'das' | 'v' | 'a' | 'p';
type Row = [string, string, Kind, string, string, string];
export type MoreRow = [string, string, 'noun' | 'verb' | 'adj' | 'phrase', string, string, string, string, string, 'A0' | 'A1'];
const t = (topic: string, level: 'A0' | 'A1', rows: Row[]): MoreRow[] => rows.map(([de, nl, k, pl, ex, exNl]) => [de, nl, k === 'v' ? 'verb' : k === 'a' ? 'adj' : k === 'p' ? 'phrase' : 'noun', k === 'der' || k === 'die' || k === 'das' ? k : '', pl, ex, exNl, topic, level]);

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
];
