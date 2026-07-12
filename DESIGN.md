# DESIGN.md — système de design

Langage visuel du site. But : une identité ancrée dans le territoire (patrimoine
ligérien), chaleureuse et digne de confiance — jamais un gabarit générique.
Toute nouvelle interface doit rester cohérente avec ce document et réutiliser les
variables CSS de `src/styles/global.css`.

## Intention

Association de patrimoine et d'histoire locale, rive droite de la Loire. Le ton
visuel est **posé, local, sérieux mais accueillant** : de la pierre, de l'eau, de
l'ancien mis en valeur proprement. Pas de mode « startup », pas d'effets gratuits.

## Palette

Ancrée dans le paysage : pierre de tuffeau, ardoise de Loire, ocre patrimonial.
Utiliser **exclusivement** ces variables (définies dans `global.css`) :

| Variable        | Hex       | Usage |
|-----------------|-----------|-------|
| `--paper`       | `#FBFAF7` | Fond principal (blanc chaud) |
| `--stone`       | `#EDE7DB` | Fonds de section alternés (tuffeau) |
| `--stone-line`  | `#D8CFBF` | Filets, bordures discrètes |
| `--ink`         | `#22201C` | Texte principal |
| `--ink-soft`    | `#55504A` | Texte secondaire |
| `--river`       | `#2F5D62` | **Accent principal** (ardoise de Loire) |
| `--river-deep`  | `#1E3D40` | Pied de page, survols, variantes foncées |
| `--ochre`       | `#9C6B24` | Liens, petits détails (ocre patrimonial) |

Ne pas ajouter de nouvelle couleur sans nécessité. Si un état supplémentaire est
requis, le dériver de ces teintes. Vérifier le contraste (WCAG AA) sur tout texte.

## Typographie

- **Titres — `Spectral`** (serif littéraire, à personnalité, poids 500/600).
  Employée avec retenue, jamais pour de longs paragraphes.
- **Texte & interface — `Inter`** (sans-serif humaniste, poids 400/500/600).
- Variables : `--font-display`, `--font-body`.
- Échelle des titres fluide (`clamp`) déjà posée sur `h1`–`h3`. Réutiliser ces
  niveaux plutôt que des tailles arbitraires.
- Largeur de lecture confortable : `--measure` (68ch) sur les paragraphes.

> Souveraineté : les polices viennent de Google Fonts pour l'instant. À terme,
> les servir en local (`@fontsource/*`) — voir CLAUDE.md.

## Mise en page & espacements

- `--container` (1120px) via la classe `.container` — centre et marge le contenu.
- `.section` : rythme vertical entre blocs. `.section--stone` : fond tuffeau + filets.
- `.stack > * + *` : espacement vertical régulier entre éléments enchaînés.
- `--radius` (6px) : arrondi commun. `--gap` : gouttière de base.

## Composants existants (à réutiliser)

- `.eyebrow` : intitulé en capitales au-dessus d'un titre (couleur `--river`).
- `.btn` + `.btn--primary` / `.btn--ghost` : boutons/liens d'action.
- `.card` (+ `.grid`) : cartes d'actualité / d'événement.
- `.river-rule` : **élément signature** — filet ondulé évoquant le cours de la
  Loire, placé sous les titres de tête. C'est le seul ornement « fort » du site :
  le garder rare et discret, ne pas le multiplier ni le décliner en excès.

## Voix & rédaction

- Français clair, phrases courtes, voix active. « Adhérer », pas « Procéder à
  l'adhésion ». Un libellé garde le même mot du bouton au message de confirmation.
- Nommer les choses côté visiteur (ce qu'il fait), pas côté technique.
- Les états vides et erreurs guident (« Aucun événement programmé — revenez
  bientôt »), sans s'excuser ni faire de l'humour déplacé.
- Sobriété : chaque mot aide à comprendre ou à agir, sinon on le coupe.

## Plancher d'accessibilité (obligatoire)

- HTML sémantique ; un seul `<h1>` par page ; hiérarchie de titres respectée.
- Focus clavier visible (`:focus-visible` déjà stylé) ; lien d'évitement présent.
- `prefers-reduced-motion` respecté (animations neutralisées).
- Images : attribut `alt` pertinent (vide si purement décoratif).
- Cibles tactiles confortables ; navigation mobile repliable déjà en place.

## Étendre le système

- Réutiliser variables et classes existantes avant d'en créer.
- Dépenser l'audace à un seul endroit : garder le reste calme et discipliné.
- Avant d'ajouter un ornement, se demander s'il encode une information utile ;
  sinon, s'en passer (principe : retirer un accessoire de trop).
