# OpenCode Agent Loops

## Use Cases
- Use `maker-checker` for bounded iterations on general code, UI, and portfolio post/knowledge work.
- Use `loop-architect` when a task needs a loop design before implementation.
- Use `/goal-loop <goal>` to start a bounded Maker-Checker run with the repo defaults.
- Use `/review-post <slug and requested changes>` to review and improve an existing article with prose, metadata, build verification and optional visual QA.

## Default Loop
- Maker: implement the smallest highest-value change.
- Checker: score the result against objective criteria and identify the weakest point.
- Stop: fidelity score `>= 9/10`, 8 iterations, 30 minutes, marginal returns, or blocked verification.

## Verification
- Default command: `npm run build`.
- For visual/UI work, use the configured Playwright MCP browser tools after a successful build when they are available: open the relevant local route, inspect desktop and mobile layout, and take screenshots if useful.
- If browser tools are not available in the current session, state that limitation instead of claiming visual verification.
- There are no lint, formatter, typecheck, or test scripts in `package.json`.
- Do not edit generated `.astro/` or `dist/` output.

## Code Criteria
- Keep diffs minimal and aligned with existing Astro patterns.
- Preserve Tailwind v4 usage through `@tailwindcss/vite`; do not add a Tailwind config unless the task requires it.
- Preserve the existing editorial/brutalist visual language.

## Post Criteria
- Keep post metadata in `src/data/posts.ts` aligned with generated routes and homepage links.
- Store published article bodies as `src/posts/<slug>.astro`; the dynamic route discovers them by slug filename.
- Keep canonical URLs under `https://lucasdeprit.dev/posts/:slug/`.
- Prefer verified, specific prose over generic filler.
- Label uncertain claims as assumptions or ask one blocking question.

## Tooling Limits
- Browser and screenshot checks are available only after OpenCode loads the configured Playwright MCP server. If no browser tool is available, report that limitation instead of claiming visual verification.
- OpenCode config is loaded at startup; restart OpenCode after editing `opencode.json`, `.opencode/agents/*`, or `.opencode/skills/*`.
