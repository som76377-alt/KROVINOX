# Phase 3 — ProductCard, ProductGrid and homepage acceptance

**Status:** PASS on commit `8ea76dc154ca81de8c2f11a1f39f15e14f62f30f`. [GitHub Actions run 38761992828](https://github.com/som76377-alt/KROVINOX/actions/runs/38761992828) passed clean `npm ci`, production dependency audit, lint, typecheck, token and catalogue checks, unit tests, production build and the Playwright suite.

## Task contract
Deliver a functional homepage and shared product-card/grid using only the isolated preview catalogue, with valid Shop/About/product routes and explicit not-for-sale status. Live mode must read only the approved catalogue. No fabricated price, garment specification, stock or purchase functionality may appear for demo fixtures.

## Scope
- Replace the internal token specimen at / with an editorial homepage and product-first hierarchy.
- Reusable product card and grid; stable 4:5 media aspect ratio, 2-column mobile and 3-column desktop layout.
- Product image fallback if an asset fails to load.
- Shop listing route, demo-only product-detail route and truthful About page so every new card/navigation link has a destination.
- Runtime preview/live catalogue selection; preview cannot be used when KROVINOX_RELEASE=true; live mode displays approved records only.
- Central INR price formatting for approved products; no displayed zero/demo prices.
- Update CI to use committed lockfile via npm ci and enforce production-only audit findings.
- Unit and Playwright coverage for card routing, grid layout, noindex preview, no fake claims, mobile menu and 404 recovery.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Clean lockfile install and least-privilege CI | `npm ci`, read-only workflow token | PASS before this stage |
| Homepage is product-first and responsive | Playwright at 390px and 1440px | PASS at commit `8ea76dc` |
| Two-column mobile and three-column desktop grid | Computed browser layout | Pending |
| Card and hero links have real destinations | Shop and product-route E2E | Pending |
| Missing product returns helpful 404 | Playwright invalid-slug test | Pending |
| Demo price, stock and purchase claims cannot leak | Unit + E2E | Pending |
| Image error fallback works | ProductImage state fallback; browser review | Pending |
| Catalogue, typecheck, lint, contrast, build, browser suites | GitHub Actions | Pending |

## Explicit non-goals
No bag/cart, checkout, payment integration, product gallery/zoom, size selector, final garment imagery, reviews, discounts, stock claims or production SEO.

## Deferred
Final artwork, garment manufacturing and measurements, final pricing, stock/orderability, fulfilment, policies and business setup are not assumed by these fixtures.
