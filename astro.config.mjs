import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://michaelbazos.com',
  // Static by default; pages/endpoints opt into SSR with `prerender = false`.
  // The server runtime powers the private /tailor feature (see src/pages/tailor).
  adapter: netlify(),
  integrations: [
    sitemap({
      // /tailor/* is a private, noindex-tagged tool — keep it out of the sitemap.
      filter: (page) => !new URL(page).pathname.startsWith('/tailor'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
