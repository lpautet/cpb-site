// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // ⚠️ À remplacer par l'URL finale du site une fois le domaine choisi (.fr ou .org)
  site: 'https://exemple.fr',
  // Le site est entièrement statique : Astro génère des fichiers HTML/CSS/JS
  // que n'importe quel hébergeur (Azure, OVH, Infomaniak…) peut servir.
  output: 'static',
});
