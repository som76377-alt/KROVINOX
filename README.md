# KROVINOX

An experimental, design-led clothing storefront. This repository is being rebuilt from a verified empty application baseline, in small stages governed by the master PRD.

## Source of truth

- [Project Blueprint](BLUEPRINT.md) — locked architecture and implementation order.
- [Master PRD v1.0](docs/product/KROVINOX_Master_PRD_v1.0.md) — complete product requirements, user journeys, design system, architecture, launch gates, and appended historical support documents.
- [Rebuild baseline](docs/REBUILD_BASELINE.md) — what was actually found in GitHub and what could not be verified.

## Status

**Automated checks pass on the rebuild branch through commit `82c33b6`.** The shared preview shell and isolated catalogue contract are implemented, but the root page is still an internal design-foundation preview, not a storefront. Dependency reproducibility and owner visual sign-off remain open.

## Planned technical direction

Next.js App Router, TypeScript, Tailwind CSS v4, server rendering by default, local catalog data, and minimal client-side code. Exact versions and scripts are declared in `package.json`; CI has passed lint, typecheck, token checks, catalogue validation, unit tests, production build, and Playwright browser checks. A committed `package-lock.json` is still outstanding; CI currently generates a temporary lockfile artifact.

## Current preview

The `/` route is a design-system specimen covering the color palette, typography, spacing and basic accessible controls. It intentionally contains no catalog, bag/cart, payment form or order flow. Its metadata marks it noindex/nofollow.

## Product-truth and launch boundary

Any eventual demo products must be unmistakably illustrative and isolated from approved saleable products. Demo checkout must not collect payment data, place real orders, or show false purchase success. Live orders remain blocked until product, business, operational, legal, security, and payment-provider launch gates pass.

## Working discipline

Build one bounded phase at a time. Record actual checks and evidence. Never mark a check PASS if it was not run. Review mobile and desktop rendering, accessibility, behavior, performance, content truth, asset rights, and the full diff before calling a milestone complete.
