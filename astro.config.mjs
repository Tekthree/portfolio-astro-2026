// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.pixeljones.com',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      // The lumos-* pages are an internal design-system proving ground (see
      // project_pixel_astro_portfolio memory), not real portfolio content --
      // keep them out of the sitemap Google actually crawls from.
      filter: (page) => !page.includes('/lumos-'),
    }),
  ],
});
