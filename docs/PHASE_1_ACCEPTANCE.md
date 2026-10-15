# Phase 1 — Design foundation and global shell acceptance

**Status:** The initial design-token and build checks passed; the shell integration exposed a stale assertion that expected the preview status to live in the page instead of the shared header. That assertion has been corrected to verify the actual shared components. Mobile-menu and shell browser checks must pass before Phase 1 is closed. Dependency lockfile review and manual visual sign-off remain required.

## Scope
- Exact-version Next.js App Router, TypeScript, and Tailwind CSS v4 toolchain.
- Central semantic color, typography, spacing, control, content-width, and product-ratio tokens.
- Manrope primary typography and IBM Plex Mono for limited technical metadata.
- Shared header, accessible responsive navigation/menu, footer, and consistent container tokens.
- Visible keyboard focus, skip link, semantic labels, reduced-motion handling, and contrast assertions.
- Deliberately non-commerce foundation preview with no products, bag, payment, or order flow.
- Token assertions, responsive/keyboard/browser tests, and CI workflow.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Token values, canonical declarations, contrast, spacing, type and focus | `scripts/check-design-tokens.mjs` | PASS in CI at commit `7bc23e4` |
| TypeScript strict check | `npm run typecheck` | PASS in CI at commit `7bc23e4` |
| ESLint | `npm run lint` | PASS in CI at commit `7bc23e4` |
| Production build | `npm run build` | PASS in CI at commit `7bc23e4` |
| Mobile/desktop layout and keyboard navigation | Playwright Chromium suite | PASS in CI at commit `c0c14b9` before shell expansion |
| Mobile menu open/Escape/focus restoration | Playwright Chromium suite | PENDING after shell expansion |
| Dependency reproducibility | Committed `package-lock.json` | BLOCKED; CI currently creates a temporary lockfile artifact |
| Manual art-direction sign-off | Owner inspection at real device sizes | NOT RUN |

## Explicit non-goals
No catalogue, product cards, product details, live product records, bag, checkout, CMS, database, analytics, policy pages, invented product photography, or business claims.

## Required honesty
A successful build does not prove visual quality or launch readiness. CI results and browser screenshots must be reviewed, and the owner must inspect the actual page. No check is PASS without observable evidence.
