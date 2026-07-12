# CLAUDE.md — instructions projet

Contexte et règles pour toute intervention sur ce dépôt. À lire avant de coder.

## Le projet en une phrase

Site web de l'association **Culture et Patrimoine en Boisset** (association loi 1901,
patrimoine / histoire / culture / environnement) — un **site statique Astro**, en
**français**, pensé pour être tenu par des bénévoles, pas par des informaticiens.

## Principes non négociables

1. **Site public statique.** Toutes les pages publiques se compilent en fichiers
   HTML/CSS/JS. Pas de base de données. Seule exception assumée : les routes de
   l'admin Keystatic (`/keystatic`, `/api/keystatic`) tournent « à la demande »
   côté serveur, uniquement pendant l'édition (voir ADMIN.md). Le site que
   visitent les gens, lui, reste sans serveur. Pour tout autre besoin (formulaire),
   passer par un service externe ou une petite fonction — jamais un serveur à administrer.
2. **Tout en français.** Interface, contenu, noms de fichiers de contenu, messages.
3. **Souveraineté des données.** Préférence forte pour des dépendances et services
   européens. Éviter d'ajouter des services tiers américains quand une alternative
   européenne existe. (Cas connu : les polices sont servies via Google Fonts ;
   prévoir de les passer en local — voir feuille de route.)
4. **Accessibilité = plancher de qualité.** HTML sémantique, focus clavier visible,
   lien d'évitement, `prefers-reduced-motion` respecté, textes alternatifs sur les
   images, contrastes suffisants. Ne jamais régresser sur ces points.
5. **Simplicité avant tout.** Ce site sera maintenu par des non-spécialistes.
   Préférer une solution simple et robuste à une solution astucieuse et fragile.
   Garder les dépendances au minimum.
6. **Ne pas casser le build.** Lancer `npm run build` avant de valider un commit.

## Stack & architecture

- **Astro 5**, `output: 'static'` (pages pré-générées) + adaptateur `@astrojs/node`
  pour les seules routes admin. Intégrations : `react`, `markdoc`, `keystatic`.
- Contenu géré par les **collections Astro** (voir `content.config.ts`), au format
  **Markdoc** (`.mdoc`) pour rester compatible avec l'éditeur Keystatic.
- **Admin : Keystatic** (`keystatic.config.ts`) — voir **ADMIN.md**.
- Pas de framework d'UI (React/Vue…) tant que ce n'est pas nécessaire. Si un besoin
  d'interactivité apparaît, préférer un peu de JavaScript vanilla, ou une île Astro
  ciblée — pas une SPA.

```
src/pages/        1 fichier .astro = 1 page (l'URL suit le nom du fichier)
src/content/      Contenu éditable : actualites/ et evenements/ (fichiers .md)
src/layouts/      Gabarit commun (BaseLayout)
src/components/    Header, Footer
src/styles/global.css   Système de design (voir DESIGN.md)
content.config.ts  Schéma des collections
```

## Modèle de contenu

Deux collections, chacune = un dossier de fichiers Markdown :
- `actualites` : champs `titre`, `date`, `resume?`, `image?`, `brouillon`.
- `evenements` : champs `titre`, `date`, `lieu?`, `resume?`, `image?`, `brouillon`.

Ajouter un contenu = ajouter un fichier `.mdoc` (ou le créer via `/keystatic`).
`brouillon: true` masque l'entrée. Ne pas changer les noms de champs sans mettre à
jour `content.config.ts`, **`keystatic.config.ts`** ET les pages qui les consomment
(`index`, `agenda`, `actualites/`). Ces trois fichiers doivent rester synchronisés.

## Design

Le système visuel est décrit dans **DESIGN.md**. S'y conformer : utiliser les
variables CSS existantes (couleurs, typographie, espacements), ne pas introduire
de nouvelle couleur ou police sans raison, et préserver l'élément signature
(le filet « rivière »). Toute nouvelle page réutilise `BaseLayout`, `.container`,
`.section`, `.eyebrow`, `.card`, `.btn`.

## Décisions déjà arrêtées

- **Messagerie : Microsoft 365** (offre associations, gratuite). Décision du comité.
- **Domaine : en attente** — le comité tranche entre `.fr` et `.org`. Ne pas coder
  d'URL en dur ; laisser `site:` dans `astro.config.mjs` à mettre à jour plus tard.
- **Hébergement : à arbitrer** (Azure Static Web Apps / OVH / Infomaniak / Clever
  Cloud), tous compatibles avec un site statique déployé depuis Git.

## Feuille de route — quoi faire ensuite (par ordre de priorité)

1. **Interface d'administration — ÉCHAFAUDÉE (Keystatic).** Fonctionne en local
   (`npm run dev` → `/keystatic`). Reste à faire pour la production : créer la
   GitHub App, passer `storage` en mode `github`, aligner l'adaptateur sur
   l'hébergeur. **Tout est détaillé dans ADMIN.md** — commencer par là.
2. **Formulaire de contact.** Le squelette existe (masqué) dans
   `infos-pratiques.astro`, avec piège à robots (`website`). L'activer via un
   service d'envoi (privilégier une option européenne / respectueuse du RGPD) ou
   une fonction de l'hébergeur. Relier à la politique de confidentialité ; ne
   demander que nom, e-mail, message.
3. **Domaine + DNS Microsoft** une fois `.fr`/`.org` choisi : enregistrements
   MX, SPF, DKIM et vérification chez le registrar.
4. **Déploiement** : connecter le dépôt à l'hébergeur retenu (build auto sur push)
   et renseigner `site:` dans `astro.config.mjs`.
5. **Contenu réel** : remplacer les textes marqués `TODO` et les entrées de
   démonstration dans `src/content/`.
6. **Polices en local** (souveraineté) : remplacer Google Fonts par
   `@fontsource/inter` et `@fontsource/spectral`.

## À NE PAS faire

- N'introduis pas de base de données ni de serveur applicatif permanent.
- Ne bascule pas le projet hors du statique (`output` reste `static`).
- N'ajoute pas de traceur/analytics posant des cookies sans bandeau de consentement
  (RGPD) — préférer une solution sans cookie (ex. hébergée en UE) si un suivi est voulu.
- Ne code pas le nom de domaine en dur dans les pages.
- Ne commite pas `node_modules/`, `dist/`, `.astro/` (déjà dans `.gitignore`).
- N'ajoute pas de dépendance lourde sans nécessité claire.

## Commandes

```bash
npm install      # dépendances
npm run dev      # dév local (http://localhost:4321)
npm run build    # build statique dans dist/  ← à lancer avant de commiter
npm run preview  # prévisualisation du build
```
