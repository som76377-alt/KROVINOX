# Phase 1 — Design foundation acceptance

**Status:** Implemented in source; remote CI verification pending. Do not mark the phase PASS until the workflow is green and the lockfile is committed.

## Scope

- Establish an exact-version Next.js App Router, TypeScript, Tailwind CSS v4 toolchain.
- Add centralized semantic color, typography, spacing, control, content-width, and product-ratio tokens.
- Load Manrope as the primary typeface and reserve IBM Plex Mono for technical metadata.
- Provide visible keyboard focus, a skip link, semantic labels, reduced-motion handling, and appropriate contrast checks.
- Add a deliberately non-commerce foundation preview with no products, cart, payment, order flow, or live-shop implication.
- Add token assertions, responsive/keyboard/browser tests, and a CI workflow.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Token values and canonical declarations | `scripts/check-design-tokens.mjs` | NOT RUN locally |
| Text contrast checks for approved text pairs | Contrast assertions in token script | NOT RUN locally |
| TypeScript strict check | `npm run typecheck` in CI | NOT RUN |
| ESLint | `npm run lint` in CI | NOT RUN |
| Production build | `npm run build` in CI | NOT RUN |
| 390px and 1440px layout / keyboard tests | Playwright Chromium suite | NOT RUN |
| Dependency reproducibility | Committed `package-lock.json` | BLOCKED pending CI-generated lockfile review |
| Manual art-direction sign-off | Owner inspection at real device sizes | NOT RUN |

## Explicit non-goals

No navigation/footer shell, catalog, product cards, product details, bag, checkout, live product records, CMS, database, analytics, policy pages, invented product photography, or business claims are implemented in this phase.

## Required honesty

A successful build does not prove visual quality or launch readiness. CI results and browser screenshots must be reviewed, and the owner must inspect the actual page. No check is PASS until there is observable evidence.
