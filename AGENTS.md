# AGENTS.md

## Commands
- Use npm, not pnpm/yarn; this repo has `package-lock.json` only.
- Required Node version is `>=22.12.0` from `package.json`.
- Install with `npm ci` when reproducing the locked dependency graph.
- Run the site with `npm run dev`; the Astro dev server defaults to `localhost:4321`.
- Verify changes with `npm run build`. There are no lint, formatter, typecheck, or test scripts in `package.json`; `build` is the focused verification source of truth here.
- Preview the production output with `npm run preview` after a successful build.

## App Structure
- This is a static Astro portfolio. Routes live in `src/pages/`: `/` is `src/pages/index.astro`, and `/posts/:slug` is `src/pages/posts/[slug].astro` via `getStaticPaths()`.
- Post metadata is hard-coded in `src/pages/posts/[slug].astro`, while the homepage post links are hard-coded separately in `src/pages/index.astro`; when adding/renaming a post, update both places.
- Shared document shell, SEO tags, JSON-LD person schema, fonts, and the early theme-init script are in `src/layouts/BaseLayout.astro`.
- Global styling is in `src/styles/global.css`; Tailwind v4 is wired through `@tailwindcss/vite` in `astro.config.mjs`, with no `tailwind.config.*` file.

## SEO And Assets
- The production site URL is `https://lucasdeprit.dev` in `astro.config.mjs`; keep page `canonical` values and `public/robots.txt` sitemap URL aligned with it.
- `@astrojs/sitemap` writes sitemap files during `npm run build`; do not hand-edit generated files under `dist/`.
- Do not edit `.astro/` or `dist/`; both are generated and ignored by git.

## UI Gotchas
- Theme state uses `document.documentElement.dataset.theme` and `localStorage` key `theme`; the initial read is in `BaseLayout.astro`, while the homepage toggle behavior is in `src/pages/index.astro`.
- The design relies heavily on CSS variables from `global.css` and arbitrary Tailwind classes in Astro markup; preserve the existing editorial/brutalist visual language instead of introducing generic component styling.

## OpenCode Loops
- Local OpenCode loop config lives in `opencode.json` and `.opencode/`; restart OpenCode after changing those files because config is loaded only at startup.
- Use `/goal-loop <goal>` or the `maker-checker` agent for bounded code/post iterations; the hard stop is fidelity `>= 9/10`, 8 iterations, 30 minutes, marginal returns, or blocked verification.
