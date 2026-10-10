// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from "@astrojs/vercel";

// Secret used by Vercel to revalidate ISR pages on demand (min. 32 chars).
// Set it as an environment variable in Vercel; without it pages only
// refresh when `expiration` elapses.
const isrBypassToken = process.env.ISR_BYPASS_TOKEN;

// https://astro.build/config
export default defineConfig({
  site: "https://lucasdeprit.dev",
  output: "server",
  adapter: vercel({
    isr: {
      expiration: 300,
      ...(isrBypassToken ? { bypassToken: isrBypassToken } : {}),
    },
  }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
