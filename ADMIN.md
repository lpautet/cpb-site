# ADMIN.md — interface d'administration (Keystatic)

Comment fonctionne l'espace d'édition qui permet aux bénévoles d'ajouter des
actualités et des événements **sans toucher au code**, et ce qu'il reste à faire
pour le mettre en ligne.

## Ce qui est déjà en place

- **Keystatic** installé et branché dans `astro.config.mjs`
  (intégrations `react()`, `markdoc()`, `keystatic()`).
- Configuration dans **`keystatic.config.ts`** : deux collections, `actualites`
  et `evenements`, dont les champs correspondent exactement à `src/content.config.ts`.
- Le contenu est stocké au format **Markdoc** (`.mdoc`) dans `src/content/…`.
  Markdoc est un sur-ensemble de Markdown ; Astro le rend via `@astrojs/markdoc`.
- **Mode local** actif par défaut : l'édition écrit directement les fichiers du
  projet. Parfait pour tester tout de suite.

## Essayer maintenant (en local)

```bash
npm run dev
# puis ouvrir http://localhost:4321/keystatic
```

On peut créer/modifier une actualité ou un événement : Keystatic écrit le fichier
`.mdoc` correspondant dans `src/content/…`, et la page publique se met à jour.

## Architecture (important)

Ce projet reste **statique pour le public** : toutes les pages du site sont
pré-générées en HTML (voir `dist/client/` après `npm run build`). **Seules** les
routes de l'admin (`/keystatic` et `/api/keystatic`) tournent « à la demande »
côté serveur (voir `dist/server/`). Autrement dit : le site que visitent les gens
n'a pas de serveur ; seul l'outil d'édition en a besoin, et uniquement pendant
qu'on édite.

## Passer en production (mode GitHub) — à faire

En production, on veut que les bénévoles éditent depuis un `/keystatic` en ligne,
chaque enregistrement créant un **commit** sur GitHub. Étapes :

1. **Créer une GitHub App** pour le dépôt (procédure guidée par Keystatic au
   premier lancement en mode GitHub, ou via la doc Keystatic « GitHub mode »).
   On obtient un *client ID*, un *client secret*, et on définit un *secret*.
2. **Renseigner le dépôt** dans `keystatic.config.ts` :
   remplacer `VOTRE-ORG/cpb-site` par le dépôt réel (une fois transféré à
   l'organisation de l'association).
3. **Définir les variables d'environnement** (chez l'hébergeur, ou dans un
   fichier `.env` local non commité) :
   ```
   KEYSTATIC_STORAGE=github
   KEYSTATIC_GITHUB_CLIENT_ID=…
   KEYSTATIC_GITHUB_CLIENT_SECRET=…
   KEYSTATIC_SECRET=…
   ```
4. **Donner accès** aux bénévoles éditeurs : ils devront disposer d'un compte
   GitHub avec accès au dépôt. (C'est la contrepartie du mode GitHub. Si l'on
   veut éviter les comptes GitHub pour les éditeurs, envisager Keystatic Cloud —
   mais c'est un service tiers ; à peser au regard de la souveraineté.)

## Hébergement de l'admin — selon l'hébergeur retenu

L'admin a besoin d'exécuter du code côté serveur. Aujourd'hui, l'adaptateur est
`@astrojs/node` (neutre, fonctionne en local et sur tout hébergeur Node). À l'étape
« déploiement », l'adapter est à aligner sur l'hébergeur :

- **Azure Static Web Apps** (cohérent avec le choix Microsoft) : les routes admin
  s'exécutent en **Azure Functions**, le reste du site est servi en statique.
  → utiliser l'adaptateur adéquat et suivre la doc Astro/Azure.
- **OVH VPS / Clever Cloud** : `@astrojs/node` convient tel quel.
- **Hébergeur 100 % statique (sans fonctions)** : le site public fonctionne, mais
  `/keystatic` en ligne ne sera pas disponible ; dans ce cas, l'édition se fait
  **en local** (`npm run dev`) par une personne technique, puis `git push`.

## Règles à respecter (pour Claude Code)

- Garder **`keystatic.config.ts` et `src/content.config.ts` synchronisés** : même
  noms de champs, mêmes collections. Un champ ajouté d'un côté doit l'être de l'autre.
- Ne pas repasser le projet en tout-serveur : `output` reste `static`, seules les
  routes Keystatic sont « à la demande ».
- Les images téléversées vont dans `public/…-images/` (déjà configuré) et sont
  donc servies directement.

## Reste à finaliser

- [ ] Créer la GitHub App et passer `storage` en mode `github` (ci-dessus).
- [ ] Aligner l'adaptateur sur l'hébergeur retenu au moment du déploiement.
- [ ] Vérifier le rendu des images téléversées via l'admin (chemin `public/`).
- [ ] Optionnel : restreindre les droits (rôle GitHub dédié) pour les éditeurs.
