// Notele JWST reverificate (27.10.2026) există în toate cele 8 limbi ale catalogului; fr/it/es/pt/de/hu sunt traduceri automate, marcate.
// Rulare: node tests/jwst-notes.test.mjs
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const html = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x === undefined ? '' : JSON.stringify(x).slice(0, 200)); } };
const m = html.match(/const GAL_TR2 = (\{.*\});\n/); const TR = JSON.parse(m[1]);
t('6 limbi în GAL_TR2', Object.keys(TR).sort().join() === 'de,es,fr,hu,it,pt');
const marks = {fr: 'Traduction automatique', it: 'Traduzione automatica', es: 'Traducción automática', pt: 'Tradução automática', de: 'Maschinelle Übersetzung', hu: 'Gépi fordítás'};
for (const l of Object.keys(marks)) {
  const j = TR[l]['JADES-GS-z14-0'], mo = TR[l]['MoM-z14'];
  t(l + ': JADES-GS-z14-0 are nota ALMA (z = 14,1793, arXiv:2409.20549) și marcaj', /14,1793/.test(j) && /2409\.20549/.test(j) && j.includes(marks[l]), j.slice(-90));
  t(l + ': MoM-z14 are nota PAN-z14-1 (13,53, arXiv:2601.11515) și marcaj', /13,53/.test(mo) && /2601\.11515/.test(mo) && mo.includes(marks[l]), mo.slice(-90));
  t(l + ': textul vechi păstrat (z=14,32 / z=14,44)', /z=14,32/.test(j) && /z=14,44/.test(mo));
}
t('ro și en (câmpurile desc/de) au nota', /14,1793/.test(html) && /14\.1793/.test(html));
console.log(`${bad} eșecuri, ${ok} reușite`); process.exit(bad ? 1 : 0);
