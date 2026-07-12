import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* -------------------------------------------------------------------------
   Collections de contenu — le cœur « éditable » du site.
   Chaque actualité et chaque événement est un simple fichier Markdown dans
   src/content/… Quand un bénévole en ajoute un (à la main ou via l'interface
   d'administration à installer plus tard), le site se reconstruit tout seul.
   ------------------------------------------------------------------------- */

const actualites = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/actualites' }),
  schema: z.object({
    titre: z.string(),
    date: z.coerce.date(),
    resume: z.string().optional(),
    image: z.string().nullish(),
    brouillon: z.boolean().default(false),
  }),
});

const evenements = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/evenements' }),
  schema: z.object({
    titre: z.string(),
    date: z.coerce.date(),          // date de l'événement
    lieu: z.string().optional(),
    resume: z.string().optional(),
    image: z.string().nullish(),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { actualites, evenements };
