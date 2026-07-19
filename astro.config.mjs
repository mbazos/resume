import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Static by default; pages/endpoints opt into SSR with `prerender = false`.
  // The server runtime powers the private /tailor feature (see src/pages/tailor).
  output: 'hybrid',
  adapter: netlify(),
  integrations: [tailwind()],
  devToolbar: {
    enabled: false,
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
