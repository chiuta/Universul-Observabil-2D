# Observable Universe 2D · v5.9.4 · Flat Earth Edition™

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version :** 5.11.0 · **Dernière mise à jour :** 2026-10-19

Carte 2D interactive de l'univers observable, à l'échelle logarithmique, avec 112 entrées de catalogue (111 galaxies + le fond cosmique CMB) — dans une édition satirique « Terre plate ».

**Application en ligne :** https://chiuta.github.io/Universul-Observabil-2D/

![Capture d'écran](screenshot.png)

## Présentation

Une application en un seul fichier (`index.html`, canvas + JavaScript) qui affiche l'univers observable comme un disque plat, à l'échelle logarithmique, avec 111 galaxies (plus le fond CMB = 112 entrées), des horizons cosmiques et des données JWST (le catalogue de l'application est daté de mai 2026 ; record affiché : MoM-z14, z=14,44, revérifié le 11 octobre 2026). L'édition « Terre plate™ » est humoristique/satirique, et l'application comprend aussi une section qui réfute la théorie de la Terre plate et une autre sur les limites de la simulation.

## Fonctionnalités

- Navigation : zoom (molette, +/-), déplacement, réinitialisation de la vue, annulation de la navigation (Z), menu latéral.
- Couches visuelles (étiquettes, grille, anneaux, filaments, carte de chaleur, groupes gravitationnels, mode spectre, etc.), avec corrections pour le daltonisme (deutéranopie, protanopie, tritanopie, achromatopsie).
- Règle (M) : les galaxies A et B se choisissent par un clic sur la carte ou par leur nom (champs avec liste, utilisables au clavier), avec un bouton « Copier le résultat ».
- Recherche de galaxie, galaxie aléatoire, favoris (avec export CSV), export CSV des 112 entrées (111 galaxies + CMB).
- Visite guidée, Quiz cosmique avec classement local, « Puissances de 10 », comparateur d'échelle, écran partagé, simulation d'Andromède, « Le saviez-vous… », outil de mesure, statistiques.
- Bande-son adaptative (Web Audio) avec activation/désactivation et volume.
- Export PNG et impression ; permalien avec l'état complet (`#s=...`).
- Guide intégré : Intro, Navigation, Couches visuelles, Chronologie des records de distance, Terre plate, Glossaire, Questions fréquentes, Limites de la simulation, Historique des versions, Crédits et sources.
- Interface bilingue roumain / anglais.
- Les étiquettes qui se chevaucheraient sont omises automatiquement (elles apparaissent à un zoom plus grand).

## Mode d'emploi

1. À la première visite, un court tutoriel apparaît ; vous pouvez le passer (« Skip tutorial »).
2. Naviguez : molette pour zoomer, glisser pour déplacer, **R** réinitialise, **Z** revient à la position précédente.
3. Ouvrez le menu ☰ ou utilisez la barre supérieure pour Search, Tour, Quiz, Powers×10, Scale, Andromeda, Split Screen, Did you know, Measure, Favorites, Stats, Random, Export PNG.
4. Touches : **/** recherche, **R** réinitialisation, **L** étiquettes, **S** son, **C** comparateur d'échelle, **H** carte de chaleur, **P** export PNG, **T** visite, **M** mesure, **Q** quiz, **D** galaxie aléatoire, **F** favoris, **G** groupes gravitationnels, **N** changer de langue, **O** Powers of Ten, **X** écran partagé, **A** simulation d'Andromède, **Z** annuler la navigation, **`** menu latéral, **?** liste des raccourcis, **Échap** ferme les panneaux.
5. Langue : la touche **N** ou le bouton RO/EN.
6. Daltonisme : choisissez le mode dans le panneau des couches (Normal, Deuteranopia, Protanopia, Tritanopia, Achromatopsia).
7. Enregistrement : étoile ⭐ pour les favoris, « ⬇ Export favorites CSV », « ⬇ Export CSV (112 entries) » ou « 📸 Export PNG ».

## Confidentialité et réseau

- **Stockage local :** `localStorage` — `uv_lang` (langue), `uv2d_favs` (favoris), `uv2d_prefs_v1` (préférences : daltonisme, couches, son, volume), plus les scores du quiz ; `sessionStorage` — `tut_done`, `uv_eventGreetingShown`. L'application affirme que rien n'est envoyé à un serveur (elle n'a pas de backend).
- **Service worker :** le code d'un service worker issu d'un blob existe dans le fichier, mais les navigateurs refusent l'enregistrement d'un service worker depuis `blob:` ; en pratique il est inactif. L'application fonctionne hors ligne parce qu'elle est un seul fichier local, et non grâce à un cache.
- **Réseau :** je n'ai trouvé aucun appel `fetch` de données vers des services tiers. Les liens vers alexio.tf, ares.org.ro, Buy Me a Coffee, Wikipedia, ADS et ESA Sky ne s'ouvrent qu'au clic. Les balises meta (Open Graph, image d'aperçu) pointent vers alexio.tf, sans effet à l'exécution.

## Remarque : édition satirique

L'édition « Terre plate™ » est satirique. Les éléments Voûte céleste, Mur de glace, « Conspiration de la NASA » et Tortue spatiale sont fictifs ; les galaxies et les distances sont celles du catalogue. En plus de l'avertissement à l'ouverture, la page affiche désormais en permanence, dans la barre supérieure (y compris sur mobile), l'étiquette « SATIRĂ · SATIRE ».

## Données et sources
Les affirmations de « record » (MoM-z14, z = 14,44) sont valables **à la date du catalogue (mai 2026), revérifiées le 11 octobre 2026**, et peuvent être dépassées. Source : Naidu et al., arXiv:2505.11263 (préprint de mai 2025 ; publié dans l'Open Journal of Astrophysics, janvier 2026). L'entrée EGS-z11-R0 (mars 2026, arXiv:2603.15841 ; également rapportée par phys.org, mars 2026) n'a pas été vérifiée de façon indépendante en détail. Les distances sont des valeurs approximatives issues du catalogue de l'application (ΛCDM, Planck 2018), à visée éducative. La référence de citation ne contient plus de DOI (l'application n'en possède pas encore). Bibliographie par galaxie : en cours de complétion.

## Exécution locale / hors ligne

Téléchargez `index.html` et ouvrez-le dans un navigateur ; il fonctionne sans internet. L'application reste fonctionnelle sans internet (le service worker issu d'un blob est inactif).

## Historique / Changelog

### 5.11.0 — 2026-10-19
- Bouton « 📏 AXE 1D ↗ » dans le panneau de la galaxie (même galaxie, langue courante) ; le permalien `#g=` accepte la garde `gn`.

### 5.10.0 — 2026-10-14
- Sauvegarde et étiquetage des données (fff-kit).

### 12 octobre 2026 — version 5.9.4
- 5.9.4 — 2026-10-12 : la version et la date de dernière mise à jour sont affichées dans l'application

### 11 octobre 2026 (troisième passage) — version 5.9.3
- Règle : correspondance partielle du nom (à Entrée/à la sortie du champ) avec un message clair lorsqu'il n'y a aucune correspondance ou plusieurs.
- Le widget de soutien se masque tant que l'avertissement initial est affiché (à 360 px il recouvrait le bouton RO/EN). CSP : hachage recalculé.

### 11 octobre 2026 (deuxième passage) — version 5.9.2
- Règle : choix des galaxies A/B par leur nom (sans clic sur la carte) et « Copier le résultat » ; les textes indiquent désormais « 111 galaxies » (+ CMB = 112 entrées) au lieu de « 112 galaxies » ; historique RO/EN dans le guide ; CSP : hachage recalculé.

### 11 octobre 2026
- Version 5.9.1 (titre, meta, JSON-LD, `VERSION`, cache SW, guide intégré — historique RO/EN).
- Correction d'un commentaire qui contenait littéralement la fermeture de la balise script : ~3 Ko de code (état des boutons de la barre mobile, piège de focus pour le tiroir) apparaissaient comme du texte dans la page et ne s'exécutaient pas ; le même défaut provoquait un défilement horizontal à 360 px.
- La règle et le toucher sur mobile trouvent la galaxie au point pressé ; étiquettes sans chevauchement ; la pastille Buy Me a Coffee ne recouvre plus la barre mobile.
- Accessibilité : `<main>`, boîte de dialogue pour l'avertissement, navigation pour le tiroir, bandeau défilant en tant que région ; axe-core 0 violation à 1280 et 360 px.
- Sécurité : les 87 attributs `on*` en ligne ont été remplacés par des gestionnaires délégués (`data-onclick` etc., interprétés sans `eval`) ; la CSP utilise un hachage SHA-256 pour le script, sans `'unsafe-inline'` dans `script-src`.
- Le pied de page affichait « 111 galaxies » contre « 112 » ailleurs : désormais « 112 entrées (111 galaxies + CMB) ».

**Sources vérifiées le 11.10.2026 :** Wikipedia — List of the most distant astronomical objects (MoM-z14, z=14,44, le record spectroscopique actuel ; les candidats à z photométrique plus élevé restent non confirmés) ; phys.org, 2026-03 (EGS-z11-R0, z≈11,45).

## Licence

MIT — voir le fichier LICENSE

## Audit

Audit : 2026-10-10 — le seul `fetch` du fichier se trouve dans le service worker issu d'un blob (cache GET, même origine ; CSP `connect-src 'self'`) ; il n'y a aucun appel de données vers des tiers. La satire est signalée explicitement à la première ouverture (« satirical and educational… The flat Earth is not »). Les données du catalogue (y compris le record JWST MoM-z14, z=14,44) proviennent du contenu de l'auteur et n'ont pas été vérifiées de façon indépendante lors de cet audit. Corrections d'accessibilité : viewport (zoom autorisé), étiquettes pour les curseurs de filtrage.

## Droits et attribution
L'application et le code appartiennent à l'auteur (licence MIT, voir `LICENSE`). Les données astronomiques proviennent de publications et de catalogues publics ; les droits sur les matériaux de tiers appartiennent à leurs titulaires, et la licence MIT ne les couvre pas. Si vous êtes titulaire de droits ou une personne mentionnée et souhaitez une correction ou un retrait, écrivez à alexio@trom.tf ; nous répondons sous 7 jours.

## Auteur

Alexio — Alexandru-Ionuț Chiuță, contact : alexio@trom.tf. L'application crédite l'auteur avec ARES (ares.org.ro) et le Centrul StrING.

## Résumé en anglais

Une carte 2D interactive de l'univers observable en un seul fichier, à l'échelle logarithmique, avec 111 galaxies (plus le fond CMB = 112 entrées), des données JWST (catalogue daté de mai 2026), visite guidée, quiz avec classement local, Puissances de 10, écran partagé, simulation d'Andromède, modes pour daltoniens, export CSV/PNG et une « Flat Earth Edition » satirique avec guide intégré. Bilingue RO/EN. Préférences stockées dans localStorage ; aucune requête de données vers des tiers. Licence MIT.

Tour 3 : 2026-10-11 — formulations « à la date du catalogue », DOI fictif supprimé du guide, étiquettes bilingues pour les curseurs de filtrage.
