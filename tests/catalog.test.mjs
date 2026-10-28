// UO-2D 6.2.1 — catalog corectat în recenzia 3 (2026-10-28): distanțe, semnul z al Andromedei, eticheta IC 310.
// Rulare: node tests/catalog.test.mjs   (static, fără browser; valorile și sursele: docs/DISCREPANTE.md)
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), SRC = fs.readFileSync(path.join(HERE, '..', 'index.html'), 'utf8');
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x === undefined ? '' : JSON.stringify(x).slice(0, 300)); } };
function literal(src, start) { let d = 0, k = start; for (; k < src.length; k++) { const c = src[k]; if (c === '[' || c === '{') d++; else if (c === ']' || c === '}') { d--; if (!d) break; } } return src.slice(start, k + 1); }
const gi = SRC.indexOf('const GALAXIES = ['); const G = (0, eval)('(' + literal(SRC, gi + 17) + ')');
// lookback ΛCDM plat (Simpson), parametrii aplicației: H0 = 67,4; Ωm = 0,315 (verificați mai jos în sursă)
const lookback = (z, H0 = 67.4, Om = 0.315) => { const n = 2000, h = z / n, f = x => 1 / ((1 + x) * Math.sqrt(Om * (1 + x) ** 3 + (1 - Om))); let s = f(0) + f(z); for (let i = 1; i < n; i++) s += f(i * h) * (i % 2 ? 4 : 2); return 977792 / H0 * s * h / 3; };
t('constantele cosmologice din aplicație: H0_PLANCK 67.4, OMEGA_M 0.315', /H0_PLANCK:\s*67\.4/.test(SRC) && /OMEGA_M:\s*0\.315/.test(SRC));
// [nume, z, d = lb (Mly)] — vezi docs/DISCREPANTE.md pentru surse
const EXPECT = [['NGC 1132 (Relicvă Fosil)', 0.0232, 330], ['IC 310 (Perseus)', 0.0189, 270], ['3C 48', 0.367, 4150], ['Abell 370 (Arc gravitational)', 0.375, 4200], ['CL 0024+1654', 0.395, 4400], ['SDSS J1004+4112 (Cvintuplu quasar)', 1.734, 10050], ['IC 4296', 0.0124, 180], ['Abell 1689 (Lentilă)', 0.183, 2330]];
for (const [n, z, d] of EXPECT) {
  const g = G.find(x => x.n === n); t(n + ': există în catalog', !!g); if (!g) continue;
  t(n + ': z = ' + z + ', d = lb = ' + d + ' Mly', g.z === z && g.d === d && g.lb === d, {z: g.z, d: g.d, lb: g.lb});
  const L = lookback(z); t(n + ': lb în ±1,5 % din lookback(z) = ' + Math.round(L) + ' Mly (H0 67,4; Ωm 0,315)', Math.abs(g.lb - L) / L < 0.015, [g.lb, L]);
}
const A = G.find(x => x.n === 'Andromeda (M31)');
t('Andromeda: z negativ (M31 spre albastru, −301 km/s ⇒ z = −0,001004)', A && A.z < 0 && Math.abs(A.z - (-301 / 299792.458)) < 5e-5, A && A.z);
t('Andromeda: d = 2.537 Mly, lb = 2.5', A && A.d === 2.537 && A.lb === 2.5);
t('vechea etichetă „Perseus (BCG IC 310)” a dispărut din tot fișierul', !SRC.includes('Perseus (BCG IC 310)'));
const N = G.find(x => x.n === 'NGC 1275 (Perseus A)'); t('NGC 1275 (Perseus A) rămâne intrarea separată a galaxiei centrale (z = 0.0176)', N && N.z === 0.0176);
// cheile de traducere: noua etichetă există în fiecare dicționar de limbă și în dicționarul EN
for (const dict of ['GAL_TR', 'GAL_TR2']) { const i = SRC.indexOf('const ' + dict + ' = {'); if (i < 0) continue; const o = (0, eval)('(' + literal(SRC, i + dict.length + 8) + ')'); const langs = Object.keys(o);
  t(dict + ': ' + langs.length + ' limbi, fiecare cu cheia „IC 310 (Perseus)” și fără cea veche', langs.length >= 6 && langs.every(l => o[l]['IC 310 (Perseus)'] && !o[l]['Perseus (BCG IC 310)']), langs); }
t('descrierea EN există pentru „IC 310 (Perseus)”', /"IC 310 \(Perseus\)":"/.test(SRC));
t('nume unice în catalog', new Set(G.map(g => g.n)).size === G.length);
console.log(`${bad} eșecuri, ${ok} reușite`); process.exit(bad ? 1 : 0);
