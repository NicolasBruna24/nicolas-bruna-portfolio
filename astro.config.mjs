// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // `site` is intentionally unset in Phase 1: the production domain is not
  // confirmed yet, so `canonical` and `og:url` are omitted instead of guessed.
  // When the domain is known, set `site` here and fill `url` in src/data/site.ts.
  devToolbar: {
    enabled: false,
  },
});
