# CHANGELOG

Format: SemVer (MAJOR.MINOR.PATCH). Intrările mai vechi sunt copiate din README (secțiunea „History / Changelog”), neschimbate.

## 6.2.0 — 2026-10-27 (anterior: 6.1.0)

Stare: stabil
Offline: complet

Tura 2 a recenziei:
- Notele JWST noi (JADES-GS-z14-0: ALMA [OIII] 88 µm z = 14,1793; MoM-z14: PAN-z14-1) în fr/it/es/pt/de/hu, în `GAL_TR2`, ca **traduceri automate marcate** în text; cheile existente neschimbate. Test nou `tests/jwst-notes.test.mjs` (20/20).
- `docs/DISCREPANTE.md` (generat de `tools/compare-catalogs.mjs` din depozitul hub): cele 8 distanțe diferite față de 1D și semnul z al Andromedei. **Nicio valoare aleasă** (NED/SIMBAD/arXiv inaccesibile în sesiune). Observație aritmetică, nu sursă: valorile 2D nu coincid cu lookback-ul calculat din z-ul din propriul catalog (cele 1D da).
- NU s-a făcut: unificarea cataloagelor într-un fișier comun; adăugarea PAN-z14-1 ca intrare (coordonate neverificate).
- Versiune 6.2.0 în `index.html`, `sw.js`, `app.json`, test.

---

## 6.1.0 — 2026-10-27 (anterior: 6.0.0)

Stare: stabil
Offline: complet

Recenzie:
- **Banner permanent** „PĂMÂNT PLAT™ = SATIRĂ · FLAT EARTH™ = SATIRE” (`#satBanner`, nu poate fi închis; ascuns doar în ediția științifică, unde nu există satiră). Eticheta „SATIRĂ · SATIRE” din bara de sus exista deja.
- **JWST** (verificat pe web la 27.10.2026, surse în README): MoM-z14 z=14,44 rămâne cel mai îndepărtat confirmat spectroscopic; JADES-GS-z14-0: ALMA [OIII] 88 µm z=14,1793 ± 0,0007 (Schouws et al. 2025, arXiv:2409.20549) notat în descriere, catalogul păstrează valoarea NIRSpec 14,32; PAN-z14-1 z=13,53 (Donnan et al., arXiv:2601.11515, ian. 2026), a patra ca distanță, menționată în nota MoM-z14, neadăugată în catalog (coordonate neverificate).
- **Cataloage**: documentate (nu unificate) diferențele hub 112 / 1D 112 / 2D 112 (111 galaxii + CMB) / 3D 118 și conflictul 1D ↔ 2D (8 distanțe, semnul z al Andromedei), de verificat de autor.
- README (8 limbi): secțiuni noi „Mărimea cataloagelor în serie” și „Recorduri JWST reverificate”.
- Versiune în `index.html`, `sw.js`, `app.json`; CSP rehash.

---

## Istoric anterior (din README.md)

#### 6.0.0 — 2026-10-26
- Satire ⇄ scientific edition switch with every correction explained; exports (PNG, A3 poster) carry the active edition's mark.

#### 5.12.10 — 2026-10-23
- Robustness: corrupted preferences, favourites and quiz leaderboard in `localStorage` are ignored instead of breaking the app; #g=… links with extreme values or invalid `%` no longer break rendering (zoom/pan clamped); the version shown in the title and the Guide is the real one again.

#### 5.12.9 — 2026-10-23
- fff-kit 1.2.0: the browser keys now carry the app prefix (`universul-observabil-2d.lang`, `.favs`, `.prefs`); the old ones (`uv_lang`, `uv2d_favs`, `uv2d_prefs_v1`) are migrated automatically at start-up, also after importing an old .fff.json backup. The “copy link” fallback no longer uses the native browser prompt but an accessible dialog in the interface language.

#### 5.12.7 — 2026-10-22
- fff-kit 1.1.4: touch targets and minimum text size; touch targets/text fixed

#### 5.12.6 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 600,000 iterations, anti-clickjacking protection.

#### 5.12.5 — 2026-10-22
- Offline for real: the broken inline service worker (blob: URL, which can never cache the page) was replaced by a real sw.js (cache-first with background revalidation) plus a web manifest and icons; the app now opens without network after the first visit and can be installed. The QR generator is also pre-cached.
- Accessibility: the page now has exactly one H1 (the title bar); the comparison search field, the timeline-speed slider and the two split-view sliders have names announced by screen readers (8 languages); range sliders have 24 px touch targets.
- Exported PNG captures now carry a “PARODY · Flat Earth Edition™ — the Earth is not flat” mark (in the interface language), so a capture cannot be quoted out of context.
- Mobile: all interface text is at least 12 px.

- 5.12.4 — 2026-10-22: the remaining Romanian galaxy names (Milky Way, Triangulum, Cigar, Pinwheel, Whirlpool, Needle, Black Eye, Sunflower, Antennae, Fireworks, Bullet, Phoenix, Lens, Canis Major Dwarf, CMB Horizon and more) and the gravitational-group labels on the map are now translated in all 8 languages; internal keys are unchanged.
- 5.12.3 — 2026-10-22: the two Magellanic Cloud labels (LMC/SMC) are now translated in all 8 languages (acronyms kept); the top-bar title (OBSERVABLE UNIVERSE · 2D) and the PNG export title follow the interface language; the satire tag no longer repeats the word in fr/it/es/pt/de/hu.
- 5.12.2 — 2026-10-22: the interface is now complete in Romanian and English too (sidebar, shortcuts, ticker, tooltips and aria-labels no longer mix the two languages); page title and meta descriptions follow the interface language.

#### 5.12.1 — 2026-10-19
- The guide, the galaxy descriptions, the "Did you know?" facts, the tour, Powers of Ten, the timeline markers, teacher mode and the A3 poster are translated into fr, it, es, pt, de, hu; the false statement that these "remain in ro/en" was corrected.

#### 5.11.0 — 2026-10-19
- "📏 1D AXIS ↗" button in the galaxy panel (same galaxy, current language); the `#g=` permalink accepts the `gn` guard.

#### 5.10.0 — 2026-10-14
- Backup and data labelling (fff-kit).

#### 12 October 2026 — version 5.9.4
- 5.9.4 — 2026-10-12: the version and the last-updated date are shown in the app

#### 11 October 2026 (third pass) — version 5.9.3
- Ruler: partial name matching (on Enter/leaving the field) with a clear message when there is no match or there are several.
- The support widget hides while the initial warning is displayed (at 360 px it covered the RO/EN button). CSP: hash recalculated.

#### 11 October 2026 (second pass) — version 5.9.2
- Ruler: choosing galaxies A/B by name (without clicking on the map) and "Copy the result"; texts now state "111 galaxies" (+ CMB = 112 entries) instead of "112 galaxies"; RO/EN history in the guide; CSP: hash recalculated.

#### 11 October 2026
- Version 5.9.1 (title, meta, JSON-LD, `VERSION`, SW cache, built-in guide — RO/EN history).
- Fixed a comment that literally contained the closing of the script tag: ~3 KB of code (mobile-bar button state, focus trap for the drawer) appeared as text on the page and did not run; the same defect caused horizontal scrolling at 360 px.
- The ruler and touch on mobile find the galaxy at the pressed point; labels without overlap; the Buy Me a Coffee pill no longer covers the mobile bar.
- Accessibility: `<main>`, dialog for the warning, navigation for the drawer, ticker as a region; axe-core 0 violations at 1280 and 360 px.
- Security: the 87 inline `on*` attributes were replaced with delegated handlers (`data-onclick` etc., interpreted without `eval`); the CSP uses a SHA-256 hash for the script, without `'unsafe-inline'` in `script-src`.
- The footer showed "111 galaxies" versus "112" elsewhere: now "112 entries (111 galaxies + CMB)".

**Sources verified on 11.10.2026:** Wikipedia — List of the most distant astronomical objects (MoM-z14, z=14.44, the current spectroscopic record; candidates with a higher photometric z remain unconfirmed); phys.org, 2026-03 (EGS-z11-R0, z≈11.45).
