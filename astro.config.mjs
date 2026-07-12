// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // ⚠️ À remplacer par l'URL finale du site une fois le domaine choisi (.fr ou .org)
  site: 'https://exemple.fr',

  // Les PAGES du site restent statiques (pré-générées en HTML).
  // Seules les routes de l'admin Keystatic (/keystatic, /api/keystatic) tournent
  // « à la demande » via l'adaptateur — uniquement quand un bénévole édite.
  output: 'static',

  // Adaptateur neutre : permet de faire tourner l'admin en local et sur tout
  // hébergeur Node. À REMPLACER par l'adaptateur de l'hébergeur retenu :
  //   - Azure Static Web Apps → routes admin en Azure Functions
  //   - OVH VPS / Clever Cloud → @astrojs/node (celui-ci convient déjà)
  // Sur un hébergeur 100 % statique, le site public fonctionne ; l'admin se
  // lance alors en local (npm run dev). Voir ADMIN.md.
  adapter: node({ mode: 'standalone' }),

  integrations: [react(), markdoc(), keystatic()],
});
