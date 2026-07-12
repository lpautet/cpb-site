# Site — Culture et Patrimoine en Boisset

Site web de l'association **Culture et Patrimoine en Boisset** (association loi 1901).
Construit avec [Astro](https://astro.build) : un **site statique** (fichiers HTML/CSS/JS)
rapide, sûr, et hébergeable presque partout.

---

## Démarrer en local

Pré-requis : [Node.js](https://nodejs.org) 20 ou plus.

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site en local sur http://localhost:4321
npm run build    # génère le site final dans dist/
npm run preview  # prévisualise le résultat de build
```

## Structure du projet

```
src/
  pages/            Une page = un fichier .astro (l'URL suit le nom du fichier)
    index.astro           Accueil
    qui-sommes-nous.astro
    activites.astro
    agenda.astro          Liste les événements (à venir / passés)
    actualites/           Liste + page de chaque article
    galerie.astro
    adhesion.astro
    infos-pratiques.astro Contact (+ formulaire à activer)
    documents.astro
    mentions-legales.astro
    politique-de-confidentialite.astro
  content/          Le contenu « éditable »
    actualites/     1 fichier .md = 1 actualité
    evenements/     1 fichier .md = 1 événement d'agenda
  layouts/          Gabarit commun (en-tête, pied de page)
  components/        En-tête, pied de page
  styles/global.css  Système de design (couleurs, typographie)
content.config.ts   Définition des champs des actualités / événements
```

## Ajouter une actualité ou un événement (sans interface)

Créez un fichier `.md` dans `src/content/actualites/` ou `src/content/evenements/` :

```md
---
titre: "Titre de l'événement"
date: 2026-06-14
lieu: "Salle des fêtes, Boisset"   # (événements)
resume: "Une phrase de présentation."
brouillon: false                    # true = non publié
---

Le corps du texte, en Markdown.
```

Une fois poussé sur GitHub, l'hébergeur reconstruit le site automatiquement.

---

## Décisions déjà prises

| Sujet          | Choix |
|----------------|-------|
| Type de site   | Statique, généré par Astro |
| Messagerie     | **Microsoft 365** (offre associations, gratuite) — décision du comité |
| Nom de domaine | **En attente** : le comité choisit entre `.fr` et `.org` |
| Hébergement    | À arbitrer (Azure Static Web Apps / OVH / Infomaniak / Clever Cloud) |
| Souveraineté   | Préférence forte pour un hébergement européen, idéalement français |

## À faire ensuite (feuille de route)

### 1. Interface d'administration — DÉJÀ ÉCHAFAUDÉE (voir ADMIN.md)
Permettre à des non-informaticiens d'ajouter actualités/événements via une page
`/admin`, sans toucher au code. Deux pistes recommandées, hors Netlify :
- **Keystatic** — intégration native Astro, authentification GitHub incluse
  (le plus simple à mettre en place ici).
- **Sveltia CMS** — remplaçant moderne de Decap, même logique de config.
Ces outils enregistrent chaque modification comme un commit Git ; le site se
reconstruit ensuite tout seul.

### 2. Formulaire de contact
Un site statique n'a pas de serveur pour recevoir l'envoi. Le squelette du
formulaire (avec piège à robots) est déjà présent dans `infos-pratiques.astro`,
masqué. Options :
- Service tiers (Web3Forms…) — le plus rapide.
- Petite fonction côté hébergeur (ex. Azure Functions si l'on héberge sur Azure).
Pensez à lier la **politique de confidentialité** et à ne demander que le
strict nécessaire (nom, e-mail, message).

### 3. Domaine + messagerie
Une fois `.fr` / `.org` tranché : enregistrer le domaine, puis ajouter les
enregistrements DNS de **Microsoft 365** (MX, SPF, DKIM, CNAME de vérification)
chez le registrar pour activer `contact@…`.

### 4. Mise en ligne (déploiement)
Connecter ce dépôt GitHub à l'hébergeur retenu ; à chaque `git push`, le site
se reconstruit et se publie automatiquement. Mettre à jour `site:` dans
`astro.config.mjs` avec l'URL finale.

### 5. Contenu & images
Remplacer les textes de démonstration (marqués `TODO`) par le contenu réel.
Astro optimise les images au build ; si la galerie devient volumineuse,
servir les photos depuis un stockage objet séparé (ex. Cellar/Azure Blob) et
garder les originaux hors du site (sauvegarde).

### 6. Souveraineté (option)
Pour un site 100 % européen, servir les polices en local (paquets
`@fontsource/inter` et `@fontsource/spectral`) au lieu de Google Fonts.

---

*Projet initialisé dans le dépôt personnel de Laurent, à transférer vers
l'organisation de l'association ultérieurement.*
