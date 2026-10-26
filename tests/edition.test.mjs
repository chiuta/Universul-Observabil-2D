// UO-2D 6.0.0 — comutator de ediție satirică ⇄ științifică. Rulare: node tests/edition.test.mjs   (rețea blocată, file://)
import {createRequire} from "module"; const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require("playwright");
import path from "node:path"; import {fileURLToPath} from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url)), APP = "file://" + path.join(HERE, "..", "index.html");
let fails = 0, passes = 0; const check = (n, c, x) => { c ? (passes++, console.log("  ok  " + n)) : (fails++, console.log("FAIL  " + n + (x !== undefined ? "  -> " + JSON.stringify(x).slice(0, 300) : ""))); };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"]});
const jc = (pg, sel) => pg.evaluate(s => document.querySelector(s).click(), sel);   // clic programatic: tutorialul de pornire poate acoperi pagina
async function open(query = "", ctx = null, w = 1280, h = 800, accept = true) {
  ctx = ctx || await b.newContext({viewport: {width: w, height: h}, acceptDownloads: true}); await ctx.route(/^https?:/, r => r.abort());
  const p = await ctx.newPage(); p.errs = []; p.on("pageerror", e => p.errs.push(String(e))); p.on("console", m => { if (/Content Security Policy|Refused to/i.test(m.text())) p.errs.push(m.text()); });
  await p.goto(APP + query); await p.waitForTimeout(2200);
  if (accept && await p.evaluate(() => getComputedStyle(document.getElementById("warningOvl")).display !== "none")) { await jc(p, "#btnAccept"); await p.waitForTimeout(300); }
  p.ctx = ctx; return p;
}
console.log("UO-2D — comutator de ediție");
let p = await open();
check("implicit: ediția satirică (butonul 🔬 există, straturile satirice active)", await p.evaluate(() => !!document.getElementById("btnEdition") && !document.body.classList.contains("sci-edition") && state.showDome && state.showIceWall && state.showNASA && !SCI));
check("etichetă SATIRĂ în bara de sus", /SATIR/.test(await p.textContent("#satireTag")));
const labels = async () => p.evaluate(() => { const seen = []; const o = CanvasRenderingContext2D.prototype.fillText; CanvasRenderingContext2D.prototype.fillText = function (t) { seen.push(String(t)); return o.apply(this, arguments); }; state.showLabels = true; needsRedraw = true; drawFlatEarth(); CanvasRenderingContext2D.prototype.fillText = o; return seen; });
check("ediția satirică desenează „FLAT EARTH™” în centru", (await labels()).some(t => /FLAT EARTH|PĂMÂNT PLAT|PAMANT PLAT/i.test(t)));
await jc(p, "#btnEdition");
check("butonul deschide dialogul (role=dialog, aria-modal) cu 7 corecții", await p.evaluate(() => { const o = document.getElementById("edOvl"); return o.classList.contains("open") && o.getAttribute("role") === "dialog" && o.getAttribute("aria-modal") === "true" && document.querySelectorAll("#edList .edItem").length === 7; }));
check("fiecare corecție are titlu, corecție și explicație nevide", await p.evaluate(() => [...document.querySelectorAll("#edList .edItem")].every(li => li.querySelector(".edSatT").textContent.trim().length > 3 && li.querySelector(".edReal").textContent.trim().length > 20 && li.querySelector(".edWhy").textContent.trim().length > 60)));
check("focusul intră în dialog", await p.evaluate(() => document.getElementById("edOvl").contains(document.activeElement)));
await jc(p, "#edBtnSci"); await p.waitForTimeout(400);
const sci = await p.evaluate(() => ({cls: document.body.classList.contains("sci-edition"), flags: [state.showDome, state.showIceWall, state.showNASA, state.showTurtles], sw: ["showDome", "showIceWall", "showNASA", "showTurtles"].map(k => document.getElementById("sw-" + k).classList.contains("on")),
  ticker: getComputedStyle(document.getElementById("ticker")).display, badge: getComputedStyle(document.getElementById("flatBadge")).display, meter: getComputedStyle(document.querySelector(".flatMeterWrap")).display, sec: getComputedStyle(document.getElementById("satSec")).display,
  sub: document.getElementById("sub").textContent, tag: document.getElementById("satireTag").textContent, title: document.title, pressed: document.getElementById("edBtnSci").getAttribute("aria-pressed"), cur: document.getElementById("edCur").textContent, list: document.getElementById("edListTtl").textContent}));
check("ediția științifică: clasa pe body + straturile satirice oprite + comutatoarele sincronizate", sci.cls && sci.flags.every(v => v === false) && sci.sw.every(v => v === false), sci);
check("ticker, insignă, indice de planeitate și secțiunea satirică ascunse", [sci.ticker, sci.badge, sci.meter, sci.sec].every(d => d === "none"), sci);
check("subtitlu, etichetă și titlul paginii schimbate", /SCIENTIFIC EDITION/.test(sci.sub) && sci.tag === "SCIENTIFIC" && /Scientific Edition/.test(sci.title) && !/Flat Earth/.test(sci.title), sci);
check("dialog: stare aria-pressed, ediția curentă și titlul listei", sci.pressed === "true" && /Scientific/.test(sci.cur) && /Corrections applied/.test(sci.list), sci);
check("ediția științifică nu desenează „FLAT EARTH™”", !(await labels()).some(t => /FLAT EARTH|PĂMÂNT PLAT|PAMANT PLAT/i.test(t)));
await p.waitForTimeout(400);
check("preferința se salvează (prefs.edition = sci)", await p.evaluate(() => JSON.parse(localStorage.getItem("universul-observabil-2d.prefs") || "{}").edition === "sci"));
await p.keyboard.press("Escape"); await p.waitForTimeout(100);
check("Escape închide dialogul și returnează focusul butonului", await p.evaluate(() => !document.getElementById("edOvl").classList.contains("open") && document.activeElement === document.getElementById("btnEdition")));
// export PNG în ediția științifică
const dl = p.waitForEvent("download", {timeout: 8000}); await p.evaluate(() => exportPNG()); const d = await dl;
check("export PNG funcționează în ediția științifică", /\.png$/.test(d.suggestedFilename()));
check("filigran științific disponibil în toate limbile", await p.evaluate(() => UI_LANGS.every(l => { const s = ED_I18N[l]; return s && s.png && s.poster && !/PARODI/i.test(s.png); })));
// revenire: straturile revin
await jc(p, "#btnEdition"); await jc(p, "#edBtnSat"); await p.waitForTimeout(300);
check("înapoi la satiră: straturile și elementele revin", await p.evaluate(() => !document.body.classList.contains("sci-edition") && state.showDome && state.showIceWall && state.showNASA && !state.showTurtles && /SATIR/.test(document.getElementById("satireTag").textContent) && getComputedStyle(document.getElementById("ticker")).display !== "none"));
await jc(p, "#edBtnSci"); await p.keyboard.press("Escape");
// persistență: aceeași origine/context -> pagină nouă
await p.waitForTimeout(400);
const p2 = await open("", p.ctx, 1280, 800, false);
check("la reîncărcare: ediția științifică se păstrează și avertismentul satiric nu mai apare", await p2.evaluate(() => document.body.classList.contains("sci-edition") && getComputedStyle(document.getElementById("warningOvl")).display === "none"));
check("fără erori JS/CSP (reîncărcare)", p2.errs.length === 0, p2.errs);
await p.ctx.close();
// parametri de adresă
let q = await open("?ed=sci"); check("?ed=sci impune ediția științifică", await q.evaluate(() => SCI && document.body.classList.contains("sci-edition"))); await q.ctx.close();
q = await open("?ed=sat"); check("?ed=sat impune ediția satirică", await q.evaluate(() => !SCI)); await q.ctx.close();
{ const ctx = await b.newContext({viewport: {width: 1280, height: 800}}); await ctx.addInitScript(() => { try { localStorage.setItem("universul-observabil-2d.prefs", JSON.stringify({edition: "sci"})); } catch (e) {} });
  q = await open("?ed=sat", ctx); check("?ed=sat bate preferința salvată", await q.evaluate(() => !SCI)); await ctx.close(); }
{ const ctx = await b.newContext({viewport: {width: 1280, height: 800}}); await ctx.addInitScript(() => { try { localStorage.setItem("universul-observabil-2d.prefs", JSON.stringify({edition: {x: 1}})); } catch (e) {} });
  q = await open("?ed=%00%ff<script>", ctx); check("preferință coruptă / parametru ostil: fără erori, ediția satirică", await q.evaluate(() => !SCI) && q.errs.length === 0, q.errs); await ctx.close(); }
// limbi
q = await open();
for (const l of ["ro", "en", "fr", "it", "es", "pt", "de", "hu"]) {
  const r = await q.evaluate(l => { setLang(l); edOpen(); const items = [...document.querySelectorAll("#edList .edItem")]; const out = {n: items.length, sat: items[0].querySelector(".edSatT").textContent, real: items[0].querySelector(".edReal").textContent, ttl: document.getElementById("edTtl").textContent, ph: /\{0\}/.test(document.getElementById("edCur").textContent), lang: document.getElementById("edOvl").getAttribute("lang")}; edClose(); return out; }, l);
  check("limba " + l + ": 7 corecții, titlu tradus, fără {0} rămas", r.n === 7 && r.sat.length > 3 && r.real.length > 20 && r.ttl.length > 8 && !r.ph && r.lang === l, r);
}
const distinct = await q.evaluate(() => new Set(["ro", "en", "fr", "it", "es", "pt", "de", "hu"].map(l => ED_ITEMS.real[l][0])).size);
check("cele 8 limbi au texte distincte pentru corecții", distinct === 8, distinct);
await q.evaluate(() => setLang("fr")); await q.evaluate(() => edSet(true));
check("în franceză: subtitlul științific tradus", /ÉDITION SCIENTIFIQUE/.test(await q.textContent("#sub")), await q.textContent("#sub"));
await q.evaluate(() => setLang("hu")); check("schimbarea limbii păstrează ediția științifică (subtitlu)", /TUDOMÁNYOS/.test(await q.textContent("#sub")), await q.textContent("#sub"));
await q.ctx.close();
// mobil
q = await open("", null, 360, 640); await jc(q, "#btnEdition").catch(async () => { await q.evaluate(() => edOpen()); });
const mob = await q.evaluate(() => { edOpen(); const r = document.getElementById("edBox").getBoundingClientRect(); return {l: r.left, r: r.right, w: innerWidth, sw: document.documentElement.scrollWidth}; });
check("360 px: dialogul încape în ecran, fără defilare orizontală", mob.l >= 0 && mob.r <= mob.w + 1 && mob.sw <= mob.w + 1, mob);
check("fără erori JS/CSP (mobil)", q.errs.length === 0, q.errs); await q.ctx.close();
await b.close(); console.log(fails ? fails + " eșecuri, " + passes + " reușite" : passes + " reușite, toate trecute"); process.exit(fails ? 1 : 0);
