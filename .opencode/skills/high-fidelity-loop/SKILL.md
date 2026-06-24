---
name: high-fidelity-loop
description: Use when the user asks for agent loops, Maker-Checker, iterative quality, visual QA, code refinement, or portfolio post knowledge work in OpenCode.
---

# High Fidelity Loop

Use this skill to run bounded Maker-Checker loops for code and knowledge work.

## Core Protocol

Every loop has three parts:

- Trigger: the user goal or failing verification.
- Action: the Maker's smallest useful change.
- Stop condition: the objective reason to stop.

The loop must never be open-ended. Default hard caps are 8 iterations and 30 minutes.

## Maker Duties

- Change only what is needed for the current iteration.
- Prefer minimal diffs and repo conventions over new abstractions.
- For this Astro portfolio, preserve the editorial/brutalist visual language.
- For posts, keep route metadata and homepage links aligned.

## Checker Duties

- Score the result from 0 to 10.
- Cite concrete evidence: build result, file checks, route checks, prose consistency, or visual inspection.
- Identify the single weakest point before iterating.
- Do not claim screenshots, browser checks, or accessibility tooling unless those tools were actually used.

## Default Rúbricas

Code:

- Correctness: the change works for the requested behavior.
- Integration: imports, routes, metadata, and generated-output assumptions are consistent.
- Verification: `npm run build` passes unless a narrower verified check is more appropriate.
- Maintainability: the diff is small and easy to reason about.
- Regression risk: no unrelated files or generated outputs were edited.

Portfolio posts and knowledge work:

- Factuality: claims are verified or clearly marked as assumptions.
- Structure: title, topic, description, slug, canonical, and homepage links agree.
- Voice: concise, technical, personal-portfolio tone without generic filler.
- Usefulness: each section adds actionable or specific insight.
- SEO: canonical URLs and sitemap-relevant routes remain valid.

Visual/UI work:

- Consistency: matches the existing CSS variables, type system, borders, and editorial layout.
- Responsive behavior: desktop and mobile breakpoints are considered.
- Contrast: obvious text/background contrast problems are fixed; use WCAG tooling if available.
- Curiosity: the page has a distinctive visual idea, not generic component styling.

## Stop Rules

Stop when one condition is met:

- Fidelity score is 9/10 or higher.
- 8 iterations have completed.
- 30 minutes have elapsed.
- The remaining improvement is lower value than the risk.
- A missing tool or user decision blocks honest verification.

## Reporting

Final reports must include:

- What changed.
- Number of iterations and final score.
- Files changed.
- Verification performed.
- Limitations or residual risks.
