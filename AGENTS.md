# AGENTS.md

## Commands
- Use npm, not pnpm/yarn; this repo has `package-lock.json` only.
- Required Node version is `>=22.12.0` from `package.json`.
- Install with `npm ci` when reproducing the locked dependency graph.
- Run the site with `npm run dev`; the Astro dev server defaults to `localhost:4321`.
- Verify changes with `npm run build`. There are no lint, formatter, typecheck, or test scripts in `package.json`; `build` is the focused verification source of truth here.
- `npm run preview` does not work with the Vercel adapter; check behavior with `npm run dev` and confirm the build with `npm run build` (output goes to `.vercel/output`, git-ignored).

## App Structure
- This is an Astro portfolio deployed on Vercel (`output: "server"` + `@astrojs/vercel` with ISR, 5-minute `expiration`; set `ISR_BYPASS_TOKEN` (min. 32 chars) in Vercel to enable on-demand revalidation) with two languages: English (default, no prefix) and Spanish (`/es/`), via Astro's built-in `i18n` config.
- Pages in `src/pages/` are thin wrappers: `index.astro` / `es/index.astro` render `src/views/HomeView.astro`, and `posts/[slug].astro` / `es/posts/[slug].astro` render `src/views/PostView.astro`. Edit the views, not the wrappers.
- UI text lives in `src/i18n/en.ts` and `src/i18n/es.ts` (`es` is typed against `en`, so missing keys fail the build). Helpers (`getDictionary`, `localePath`, `alternates`) are in `src/i18n/index.ts`. Do not hardcode user-facing strings in views/components.
- Home page content (CV texts: intro, facts, overview, stack cards, projects, availability) is remote: it lives in the private repo `lucasdeprit/portfolio-content` as `home/<lang>.json` and is read at request time by `src/content/` (`source.ts` reads `CONTENT_DIR` or the GitHub API with `GITHUB_CONTENT_TOKEN`; `schema.ts` validates with zod; `defaults.ts` holds the fallback used when the source is missing, unreachable or invalid). Keep `defaults.ts` and the content repo in sync. Env vars are documented in `.env.example`. Home pages are therefore on-demand (`prerender = false`) and cached by ISR.
- `src/i18n/*.ts` now only holds fixed UI text (labels, nav, aria, notices); do not put editable CV text there.
- Post metadata (slug, number, per-language title/topic/description/label) lives only in `src/data/posts.ts`; the homepage list, popup and static paths all read from it. Article bodies are `src/posts/<lang>/<slug>.astro`; a post with no body in any language renders the "Under Construction" page, and one missing only the requested language falls back to another with a notice.
- Language detection is client-side (inline script in `BaseLayout.astro`): first visit follows `navigator.languages`, the language switch saves `localStorage` key `lang`, and only default-language pages redirect (a direct `/es/` link is never bounced). Pages carry `hreflang` alternates.
- The homepage popup (`BrutalistPopup.astro`) is shown once per visitor, tracked in `localStorage` as `popup-seen:<storageKey>`; it promotes `featuredPost` from `posts.ts`, so publishing a new featured post re-triggers it.
- Shared document shell, SEO tags, JSON-LD person schema, fonts, and the early theme-init script are in `src/layouts/BaseLayout.astro`.
- Global styling is in `src/styles/global.css`; Tailwind v4 is wired through `@tailwindcss/vite` in `astro.config.mjs`, with no `tailwind.config.*` file.

## SEO And Assets
- The production site URL is `https://lucasdeprit.dev` in `astro.config.mjs`; keep page `canonical` values and `public/robots.txt` sitemap URL aligned with it.
- The sitemap is a dynamic route, `src/pages/sitemap.xml.ts`, built from `src/data/posts.ts` with `hreflang` alternates (`@astrojs/sitemap` is not used because it only sees prerendered routes). All pages are on-demand (`prerender = false`) and cached by ISR.
- Do not edit `.astro/`, `dist/` or `.vercel/`; all are generated and ignored by git.

## UI Gotchas
- Theme state uses `document.documentElement.dataset.theme` and `localStorage` key `theme`; the initial read is in `BaseLayout.astro`, while the homepage toggle behavior is in `src/views/HomeView.astro`.
- The design relies heavily on CSS variables from `global.css` and arbitrary Tailwind classes in Astro markup; preserve the existing editorial/brutalist visual language instead of introducing generic component styling.

## OpenCode Loops
- Local OpenCode loop config lives in `opencode.json` and `.opencode/`; restart OpenCode after changing those files because config is loaded only at startup.
- Use `/goal-loop <goal>` or the `maker-checker` agent for bounded code/post iterations; the hard stop is fidelity `>= 9/10`, 8 iterations, 30 minutes, marginal returns, or blocked verification.
