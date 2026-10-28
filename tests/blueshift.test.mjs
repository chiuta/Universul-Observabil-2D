// UO-2D 6.2.2 — Andromeda (M31) este spre albastru: z negativ afișat în panou și în tabel. Rulare: node tests/blueshift.test.mjs   (rețea blocată, file://)
import {createRequire} from "module"; const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require("playwright");
import path from "node:path"; import {fileURLToPath} from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url)), APP = "file://" + path.join(HERE, "..", "index.html");
let fails = 0, passes = 0; const check = (n, c, x) => { c ? (passes++, console.log("  ok  " + n)) : (fails++, console.log("FAIL  " + n + (x !== undefined ? "  -> " + JSON.stringify(x).slice(0, 300) : ""))); };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"]});
const ctx = await b.newContext({viewport: {width: 1280, height: 800}}); await ctx.route(/^https?:/, r => r.abort());
const p = await ctx.newPage(); const errs = []; p.on("pageerror", e => errs.push(String(e))); await p.goto(APP); await p.waitForTimeout(2000);
const z = await p.evaluate(() => { const i = GALAXIES.findIndex(g => /Andromeda/.test(g.n)); openInfoPanel(GALAXIES[i]); return GALAXIES[i].z; });
await p.waitForTimeout(400);
check("catalog: z(Andromeda) < 0", z < 0, z);
const pz = await p.evaluate(() => document.getElementById("pz").textContent);
check("panoul de detalii: „-0.0010 (blueshift)”", /^[−-]0\.0010 \(blueshift\)$/.test(pz.trim()), pz);
const arrow = await p.evaluate(() => GALAXIES.filter(g => g.z < 0).map(g => g.n));
check("Andromeda e printre galaxiile marcate albastru (săgeți de mișcare)", arrow.includes("Andromeda (M31)"), arrow);
check("fără erori JS", errs.length === 0, errs);
await b.close(); console.log(fails ? fails + " eșecuri" : "toate trecute (" + passes + ")"); process.exit(fails ? 1 : 0);
