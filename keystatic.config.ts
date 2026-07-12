import { config, fields, collection } from '@keystatic/core';

/* =========================================================================
   Configuration de l'interface d'administration (Keystatic).
   Les champs ci-dessous DOIVENT rester alignés avec src/content.config.ts :
   toute modification de nom de champ se répercute dans les deux fichiers
   ET dans les pages qui les affichent.
   Interface accessible en local sur : http://localhost:4321/keystatic
   ========================================================================= */

export default config({
  // STOCKAGE
  //  - En local (défaut) : les modifications écrivent directement les fichiers
  //    du dossier src/content/ — idéal pour tester (npm run dev).
  //  - En production : passer en mode "github" pour que les bénévoles éditent
  //    depuis un /admin en ligne (chaque enregistrement = un commit).
  //    Renseigner alors le dépôt et créer une GitHub App (voir ADMIN.md), puis
  //    lancer avec la variable d'environnement PUBLIC_KEYSTATIC_STORAGE=github.
  //    (Préfixe PUBLIC_ obligatoire : ce fichier est aussi chargé côté navigateur
  //    par l'interface Keystatic ; seul import.meta.env y expose la variable —
  //    process.env n'existe pas dans le navigateur.)
  storage:
    import.meta.env.PUBLIC_KEYSTATIC_STORAGE === 'github'
      ? { kind: 'github', repo: 'VOTRE-ORG/cpb-site' } // ← à compléter
      : { kind: 'local' },

  ui: {
    brand: { name: 'Culture et Patrimoine en Boisset' },
  },

  collections: {
    actualites: collection({
      label: 'Actualités',
      slugField: 'titre',
      path: 'src/content/actualites/*',
      format: { contentField: 'corps' },
      entryLayout: 'content',
      schema: {
        titre: fields.slug({
          name: { label: 'Titre', validation: { isRequired: true } },
        }),
        date: fields.date({
          label: 'Date de publication',
          validation: { isRequired: true },
        }),
        resume: fields.text({
          label: 'Résumé',
          description: 'Une phrase affichée dans la liste des actualités.',
          multiline: true,
        }),
        image: fields.image({
          label: 'Image (facultative)',
          directory: 'public/actualites-images',
          publicPath: '/actualites-images/',
        }),
        brouillon: fields.checkbox({
          label: 'Brouillon (ne pas publier)',
          defaultValue: false,
        }),
        corps: fields.markdoc({ label: 'Contenu' }),
      },
    }),

    evenements: collection({
      label: 'Agenda (événements)',
      slugField: 'titre',
      path: 'src/content/evenements/*',
      format: { contentField: 'corps' },
      entryLayout: 'content',
      schema: {
        titre: fields.slug({
          name: { label: 'Titre', validation: { isRequired: true } },
        }),
        date: fields.date({
          label: "Date de l'événement",
          validation: { isRequired: true },
        }),
        lieu: fields.text({ label: 'Lieu' }),
        resume: fields.text({
          label: 'Résumé',
          description: 'Une phrase affichée dans l\'agenda.',
          multiline: true,
        }),
        image: fields.image({
          label: 'Image (facultative)',
          directory: 'public/evenements-images',
          publicPath: '/evenements-images/',
        }),
        brouillon: fields.checkbox({
          label: 'Brouillon (ne pas publier)',
          defaultValue: false,
        }),
        corps: fields.markdoc({ label: 'Contenu' }),
      },
    }),
  },
});
