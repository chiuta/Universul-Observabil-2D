# Observable Universe 2D · v5.11.0 · Flat Earth Edition™

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version:** 5.11.0 · **Last updated:** 2026-10-19

An interactive 2D map of the observable universe, on a logarithmic scale, with 112 catalogue entries (111 galaxies + the cosmic background CMB) — in a satirical "Flat Earth" edition.

**Live app:** https://chiuta.github.io/Universul-Observabil-2D/

![Screenshot](screenshot.png)

## What it is

A single-file application (`index.html`, canvas + JavaScript) that displays the observable universe as a flat disc, on a logarithmic scale, with 111 galaxies (plus the CMB background = 112 entries), cosmic horizons and JWST data (the catalogue in the application is dated May 2026; the record shown: MoM-z14, z=14.44, rechecked on 11 October 2026). The "Flat Earth™" edition is humorous/satirical, and the application also includes a section that debunks the flat-Earth theory and one on the limits of the simulation.

## Features

- Navigation: zoom (scroll, +/-), pan, view reset, undo navigation (Z), side menu.
- Visual layers (labels, grid, rings, filaments, heatmap, gravitational groups, spectrum mode, etc.), with colour-blindness corrections (deuteranopia, protanopia, tritanopia, achromatopsia).
- Ruler (M): galaxies A and B are chosen by clicking on the map or by name (fields with a list, usable from the keyboard), with a "Copy the result" button.
- Galaxy search, random galaxy, favourites (with CSV export), CSV export of the 112 entries (111 galaxies + CMB).
- Guided tour, Cosmic quiz with a local leaderboard, "Powers of 10", scale comparator, split screen, Andromeda simulation, "Did you know…", measuring tool, statistics.
- Adaptive soundtrack (Web Audio) with on/off switch and volume.
- PNG export and printing; permalink with the complete state (`#s=...`).
- Built-in guide: Intro, Navigation, Visual layers, Timeline of distance records, Flat Earth, Glossary, Frequently asked questions, Limits of the simulation, Version history, Credits and sources.
- Bilingual Romanian / English interface.
- Labels that would overlap are omitted automatically (they appear at higher zoom).

## User guide

1. On the first visit a short tutorial appears; you can skip it ("Skip tutorial").
2. Navigate: scroll to zoom, drag to pan, **R** resets, **Z** returns to the previous position.
3. Open the ☰ menu or use the top bar for Search, Tour, Quiz, Powers×10, Scale, Andromeda, Split Screen, Did you know, Measure, Favorites, Stats, Random, Export PNG.
4. Keys: **/** search, **R** reset, **L** labels, **S** sound, **C** scale comparator, **H** heatmap, **P** export PNG, **T** tour, **M** measure, **Q** quiz, **D** random galaxy, **F** favourites, **G** gravitational groups, **N** switch language, **O** Powers of Ten, **X** split screen, **A** Andromeda simulation, **Z** undo navigation, **`** side menu, **?** shortcut list, **Esc** closes panels.
5. Language: the **N** key or the RO/EN button.
6. Colour blindness: choose the mode from the layers panel (Normal, Deuteranopia, Protanopia, Tritanopia, Achromatopsia).
7. Saving: star ⭐ for favourites, "⬇ Export favorites CSV", "⬇ Export CSV (112 entries)" or "📸 Export PNG".

## Privacy and network

- **Local storage:** `localStorage` — `uv_lang` (language), `uv2d_favs` (favourites), `uv2d_prefs_v1` (preferences: colour blindness, layers, sound, volume), plus the quiz scores; `sessionStorage` — `tut_done`, `uv_eventGreetingShown`. The application states that nothing is sent to a server (it has no backend).
- **Service worker:** code for a service worker from a blob exists in the file, but browsers reject registering a service worker from `blob:`; in practice it is inactive. The application works offline because it is a single local file, not thanks to a cache.
- **Network:** I found no data `fetch` calls to third-party services. The links to alexio.tf, ares.org.ro, Buy Me a Coffee, Wikipedia, ADS and ESA Sky open only on click. The meta tags (Open Graph, preview image) point to alexio.tf, with no effect at runtime.

## Note: satirical edition

The "Flat Earth™" edition is satirical. The elements Celestial Dome, Ice Wall, "NASA Conspiracy" and the Space Turtle are fictional; the galaxies and distances are those from the catalogue. In addition to the warning at opening, the page now permanently displays, in the top bar (including on mobile), the label "SATIRĂ · SATIRE".

## Data and sources
The "record" claims (MoM-z14, z = 14.44) are valid **as of the catalogue date (May 2026), rechecked on 11 October 2026**, and may be surpassed. Source: Naidu et al., arXiv:2505.11263 (preprint May 2025; published in the Open Journal of Astrophysics, January 2026). The entry EGS-z11-R0 (March 2026, arXiv:2603.15841; also reported by phys.org, March 2026) was not independently verified in detail. Distances are approximate values from the application's catalogue (ΛCDM, Planck 2018), for educational purposes. The citation reference no longer contains a DOI (the application does not yet have one). Bibliography per galaxy: being completed.

## Running locally / offline

Download `index.html` and open it in a browser; it works without internet. The application stays functional without internet (the blob service worker is inactive).

## History / Changelog

### 5.11.0 — 2026-10-19
- "📏 1D AXIS ↗" button in the galaxy panel (same galaxy, current language); the `#g=` permalink accepts the `gn` guard.

### 5.10.0 — 2026-10-14
- Backup and data labelling (fff-kit).

### 12 October 2026 — version 5.9.4
- 5.9.4 — 2026-10-12: the version and the last-updated date are shown in the app

### 11 October 2026 (third pass) — version 5.9.3
- Ruler: partial name matching (on Enter/leaving the field) with a clear message when there is no match or there are several.
- The support widget hides while the initial warning is displayed (at 360 px it covered the RO/EN button). CSP: hash recalculated.

### 11 October 2026 (second pass) — version 5.9.2
- Ruler: choosing galaxies A/B by name (without clicking on the map) and "Copy the result"; texts now state "111 galaxies" (+ CMB = 112 entries) instead of "112 galaxies"; RO/EN history in the guide; CSP: hash recalculated.

### 11 October 2026
- Version 5.9.1 (title, meta, JSON-LD, `VERSION`, SW cache, built-in guide — RO/EN history).
- Fixed a comment that literally contained the closing of the script tag: ~3 KB of code (mobile-bar button state, focus trap for the drawer) appeared as text on the page and did not run; the same defect caused horizontal scrolling at 360 px.
- The ruler and touch on mobile find the galaxy at the pressed point; labels without overlap; the Buy Me a Coffee pill no longer covers the mobile bar.
- Accessibility: `<main>`, dialog for the warning, navigation for the drawer, ticker as a region; axe-core 0 violations at 1280 and 360 px.
- Security: the 87 inline `on*` attributes were replaced with delegated handlers (`data-onclick` etc., interpreted without `eval`); the CSP uses a SHA-256 hash for the script, without `'unsafe-inline'` in `script-src`.
- The footer showed "111 galaxies" versus "112" elsewhere: now "112 entries (111 galaxies + CMB)".

**Sources verified on 11.10.2026:** Wikipedia — List of the most distant astronomical objects (MoM-z14, z=14.44, the current spectroscopic record; candidates with a higher photometric z remain unconfirmed); phys.org, 2026-03 (EGS-z11-R0, z≈11.45).

## License

MIT — see the LICENSE file

## Audit

Audit: 2026-10-10 — the only `fetch` in the file is in the blob service worker (GET cache, same-origin; CSP `connect-src 'self'`); there are no data calls to third parties. The satire is flagged explicitly at first opening ("satirical and educational… The flat Earth is not"). The data in the catalogue (including the JWST record MoM-z14, z=14.44) come from the author's content and were not independently verified in this audit. Accessibility fixes: viewport (zoom allowed), labels for the filter sliders.

## Rights and attribution
The application and the code belong to the author (MIT license, see `LICENSE`). The astronomical data come from public publications and catalogues; rights to third-party materials belong to their holders, and the MIT license does not cover them. If you are a rights holder or a person mentioned and wish to have something corrected or withdrawn, write to alexio@trom.tf; we reply within 7 days.

## Author

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf. The application credits the author together with ARES (ares.org.ro) and Centrul StrING.

## English summary

A single-file interactive 2D map of the observable universe on a logarithmic scale with 111 galaxies (plus the CMB background = 112 entries), JWST data (catalog dated May 2026), tour, quiz with local leaderboard, Powers of Ten, split screen, Andromeda simulation, colour-blind modes, CSV/PNG export and a satirical "Flat Earth Edition" with a built-in guide. Bilingual RO/EN. Preferences stored in localStorage; no data requests to third parties. MIT licence.

Round 3: 2026-10-11 — "as of the catalogue date" wording, the placeholder DOI removed from the guide, bilingual labels for the filter sliders.
