// Automatische inhoudscontrole (voor de ontwikkelaar): structuur, verwijzingen en volledigheid. Controleert NIET of het Duits natuurlijk klinkt.
import { VOCAB } from '../src/content/vocab';
import { LESSONS } from '../src/content/lessons';
import { TEXTS } from '../src/content/texts';
import { CURRICULUM } from '../src/content/curriculum';
let fails = 0; const check = (n: string, bad: string[]) => { console.log((bad.length ? 'FAIL ' : 'PASS ') + n + (bad.length ? '\n   ' + bad.slice(0, 8).join('\n   ') : '')); if (bad.length) fails++; };
const topics = new Set(VOCAB.map((w) => w.topic)); const lessonIds = new Set(LESSONS.map((l) => l.id)); const unitIds = new Set(CURRICULUM.map((u) => u.id));
check('woorden: alle velden gevuld, unieke id\'s', VOCAB.filter((w, i) => !w.de || !w.nl || !w.ex || !w.exNl || !w.topic || (w.type === 'noun' && !w.gender) || VOCAB.findIndex((x) => x.id === w.id) !== i).map((w) => w.de));
// Werkwoorden slaan we over: onregelmatige en gesplitste vormen (bin, liest, stehe ... auf) zijn daar juist correct.
check('woorden: voorbeeldzin bevat het woord (zelfstandige en bijvoeglijke naamwoorden)', VOCAB.filter((w) => (w.type === 'noun' || w.type === 'adj') && !w.ex.toLowerCase().includes(w.de.toLowerCase().slice(0, Math.max(3, w.de.length - 3))) && !(w.plural && w.ex.toLowerCase().includes(w.plural.toLowerCase().slice(0, 4)))).map((w) => `${w.de}: ${w.ex}`));
check('units: topics bestaan', CURRICULUM.flatMap((u) => u.topics.filter((t) => !topics.has(t)).map((t) => `${u.id}: ${t}`)));
check('units: lessen bestaan', CURRICULUM.flatMap((u) => u.lessons.filter((l) => !lessonIds.has(l)).map((l) => `${u.id}: ${l}`)));
check('elke les hoort bij precies één unit', LESSONS.filter((l) => CURRICULUM.filter((u) => u.lessons.includes(l.id)).length !== 1).map((l) => l.id));
check('elk woordthema hoort bij een unit', [...topics].filter((t) => !CURRICULUM.some((u) => u.topics.includes(t))));
check('teksten: unit bestaat, regels gevuld', TEXTS.filter((t) => !unitIds.has(t.unit) || t.lines.some((l) => !l.de || !l.nl)).map((t) => t.id));
const allEx = [...LESSONS.flatMap((l) => l.exercises), ...TEXTS.flatMap((t) => t.questions)];
check('oefeningen: unieke id\'s', allEx.filter((e, i) => allEx.findIndex((x) => x.id === e.id) !== i).map((e) => e.id));
check('meerkeuze: antwoord staat in de opties', allEx.filter((e) => e.kind === 'mc' && !e.options!.includes(e.answers[0])).map((e) => e.id));
check('lesoefeningen: uitleg ingevuld', allEx.filter((e) => !e.explain || !e.topic).map((e) => e.id));
console.log(`\nInhoud: ${VOCAB.length} woorden, ${LESSONS.length} lessen, ${TEXTS.length} teksten, ${CURRICULUM.length} units (${CURRICULUM.filter((u) => u.topics.length || u.lessons.length).length} met inhoud)`);
console.log(fails ? `${fails} controle(s) MISLUKT` : 'Alle controles geslaagd'); if (fails) process.exit(1);
