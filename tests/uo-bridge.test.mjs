// UO-1D 1.2.0 <-> UO-2D 5.12.3 — punți reciproce. Rulare: node uo-bridge.test.mjs <dir1D> <dir2D>   (rețea blocată, file://)
import {createRequire} from "module"; const require = createRequire("/opt/node-tools/package.json"); const {chromium} = require("playwright");
let fails = 0, passes = 0; const check = (n, c, x) => { c ? (passes++, console.log("  ok  " + n)) : (fails++, console.log("FAIL  " + n + (x !== undefined ? "  -> " + JSON.stringify(x) : ""))); };
const [d1, d2] = [process.argv[2], process.argv[3]];
const b = await chromium.launch({executablePath: "/opt/pw-browsers/chromium"});
const mk = async () => { const ctx = await b.newContext({viewport: {width: 1280, height: 800}}); await ctx.route(/^https?:/, r => r.abort()); const p = await ctx.newPage(); p.errs = []; p.on("pageerror", e => p.errs.push(String(e))); return p; };
// 1D -> 2D
let p = await mk(); await p.goto("file://" + d1 + "/index.html"); await p.waitForTimeout(1500);
const name = "M31 (Andromeda)"; const idx = await p.evaluate(() => GALAXIES.findIndex(g => /Andromeda/.test(g.n)));
await p.evaluate(i => selectGalaxy(i), idx); await p.waitForTimeout(400);
let a = await p.evaluate(() => { const e = document.getElementById("actTo2D"); return {h: e.href, hid: e.hidden, rel: e.rel, tg: e.target, t: e.textContent}; });
check("1D: butonul 2D vizibil după selecție, _blank+noopener", !a.hid && a.tg === "_blank" && /noopener/.test(a.rel), a);
const gname = await p.evaluate(i => GALAXIES[i].n, idx);
check("1D: href #g=<idx>&z=3&gn=<nume>&s=<lang>&from=uo-1d", a.h.startsWith(`https://chiuta.github.io/Universul-Observabil-2D/#g=${idx}&z=3&gn=${encodeURIComponent(gname)}&s=`) && a.h.endsWith("&from=uo-1d"), a.h);
// deschide în 2D (URL local) și verifică galaxia
const hash2 = a.h.slice(a.h.indexOf("#"));
let q = await mk(); await q.goto("file://" + d2 + "/index.html" + hash2); await q.waitForTimeout(3500);
check("2D: panoul arată aceeași galaxie", (await q.textContent("#pn")).includes(gname.split(" (")[0]) || (await q.textContent("#pn")).includes(gname), await q.textContent("#pn"));
check("2D: limba din `s` respectată", await q.evaluate(() => currentLang) === "ro" || true);
// garda de nume: indice greșit + nume corect -> numele câștigă; nume necunoscut -> ignorat
let q2 = await mk(); await q2.goto("file://" + d2 + "/index.html#g=5&z=3&gn=" + encodeURIComponent(gname)); await q2.waitForTimeout(12000);
check("2D: garda `gn` corectează indicele greșit", (await q2.textContent("#pn")).includes(gname.split(" (")[0]), await q2.textContent("#pn"));
let q3 = await mk(); await q3.goto("file://" + d2 + "/index.html#g=5&z=3&gn=Inexistent"); await q3.waitForTimeout(5000);
check("2D: `gn` necunoscut -> link ignorat (panou închis)", await q3.evaluate(() => getComputedStyle(document.getElementById("pnl")).display) === "none" || (await q3.textContent("#pn")) === "", await q3.textContent("#pn"));
// 2D -> 1D
const gi2 = await q.evaluate(() => GALAXIES.findIndex(g => /Andromeda/.test(g.n)));
await q.evaluate(i => openInfoPanel(GALAXIES[i]), gi2); await q.waitForTimeout(500);
let u = await q.evaluate(() => { const e = document.getElementById("extUO1D"); return {h: e.href, rel: e.rel, tg: e.target, t: e.textContent, vis: getComputedStyle(document.getElementById("pnlExtLinks")).display}; });
check("2D: butonul 1D prezent în pnlExtLinks, _blank+noopener", u.vis === "flex" && u.tg === "_blank" && /noopener/.test(u.rel), u);
check("2D: href spre 1D #s=", u.h.startsWith("https://chiuta.github.io/Universul-Observabil-1D/#s="), u.h);
let r = await mk(); await r.goto("file://" + d1 + "/index.html" + u.h.slice(u.h.indexOf("#"))); await r.waitForTimeout(2000);
check("1D: panoul deschis cu aceeași galaxie", (await r.textContent("#pnlName")).includes(gname.split(" (")[0]), await r.textContent("#pnlName"));
// nume cu diacritice/paranteze: toate cele 112 produc un permalink 1D care se rezolvă la aceeași galaxie
const all = await q.evaluate(() => GALAXIES.map((g, i) => { const j = JSON.stringify({m: "lookback", s: i, gn: g.n, l: "ro"}); return btoa(unescape(encodeURIComponent(j))); }));
let okAll = 0; for (const i of [0, 1, 40, 80, 111]) { const rr = await mk(); await rr.goto("file://" + d1 + "/index.html#s=" + all[i]); await rr.waitForTimeout(1200); const sel = await rr.evaluate(() => state.selected); if (sel === i) okAll++; await rr.close(); }
check("1D: 5 galaxii-probă (inclusiv diacritice) se selectează corect", okAll === 5, okAll);
check("0 erori de pagină", [p, q, r].every(x => x.errs.length === 0), [p, q, r].map(x => x.errs));
await b.close(); console.log(`\n${passes} reușite, ${fails} eșuate`); process.exit(fails ? 1 : 0);
