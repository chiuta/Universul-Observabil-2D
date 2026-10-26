// UO-2D 6.0.0 — date corupte în localStorage și permalink extrem. Rulare: node robustness.test.mjs <dir2D>   (rețea blocată, file://)
import {createRequire} from "module"; const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require("playwright");
let fails = 0; const check = (n, c, x) => { c ? console.log("  ok  " + n) : (fails++, console.log("FAIL  " + n + (x !== undefined ? "  -> " + JSON.stringify(x) : ""))); };
const d2 = process.argv[2] || process.cwd();
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined});
async function run(ls, hash, wait = 2500) {
  const ctx = await b.newContext({viewport: {width: 1280, height: 800}}); await ctx.route(/^https?:/, r => r.abort());
  await ctx.addInitScript(o => { for (const k in o) localStorage.setItem(k, o[k]); }, ls);
  const p = await ctx.newPage(); const errs = []; p.on("pageerror", e => errs.push(String(e)));
  await p.goto("file://" + d2 + "/index.html" + hash); await p.waitForTimeout(wait);
  return {p, errs, ctx};
}
for (const [n, ls] of [["prefs=null", {"universul-observabil-2d.prefs": "null"}], ["prefs=5", {"universul-observabil-2d.prefs": "5"}], ["favs={}", {"universul-observabil-2d.favs": "{\"a\":1}"}], ["favs=[1,null]", {"universul-observabil-2d.favs": "[1,null]"}]]) {
  const r = await run(ls, ""); check("fără erori: " + n, r.errs.length === 0, r.errs);
  if (n.startsWith("favs")) { const ok = await r.p.evaluate(() => Array.isArray(favorites) && favorites.every(x => typeof x === "string")); check("favorites e listă de șiruri: " + n, ok); }
  await r.ctx.close();
}
let r = await run({}, "#g=3&z=1e308&px=Infinity&py=-Infinity", 3500);
check("permalink extrem: fără erori", r.errs.length === 0, r.errs);
check("permalink extrem: zoom/pan finite și în limite", await r.p.evaluate(() => Number.isFinite(state.zoom) && state.zoom <= 25 && Number.isFinite(state.panX) && Number.isFinite(state.panY)));
r = await run({}, "#g=3&gn=%E0%A4%A"); check("permalink cu % invalid: fără erori", r.errs.length === 0, r.errs);
await b.close(); console.log(fails ? fails + " eșecuri" : "toate trecute"); process.exit(fails ? 1 : 0);
