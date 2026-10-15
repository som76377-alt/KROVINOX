# KROVINOX

An experimental, design-led clothing storefront. This repository is being rebuilt from a verified empty application baseline, in small stages governed by the master PRD.

## Source of truth

- [Project Blueprint](BLUEPRINT.md) — locked architecture and implementation order.
- [Master PRD v1.0](docs/product/KROVINOX_Master_PRD_v1.0.md) — complete product requirements, user journeys, design system, architecture, launch gates, and appended historical support documents.
- [Rebuild baseline](docs/REBUILD_BASELINE.md) — what was actually found in GitHub and what could not be verified.

## Status

**Verified foundation and catalogue isolation are complete; homepage implementation is in progress.** The rebuild branch has a committed package lockfile and CI passed a clean install, all configured checks, production build and Playwright tests on the prior commit. This branch is still a design preview, not a live shop.

## Planned technical direction

Next.js App Router, TypeScript, Tailwind CSS v4, server rendering by default, local catalog data, and minimal client-side code. Exact versions and scripts are declared in `package.json`; CI has passed lint, typecheck, token checks, catalogue validation, unit tests, production build, and Playwright browser checks. A committed `package-lock.json` is still outstanding; CI currently generates a temporary lockfile artifact. The production-only dependency audit reports zero vulnerabilities, but the full dev-tooling audit has five high findings from one unpatched `braces` advisory; see `docs/DEPENDENCY_AUDIT.md`. Release security status is not cleared.

## Current preview

The `/` route is a design-system specimen covering the color palette, typography, spacing and basic accessible controls. It intentionally contains no catalog, bag/cart, payment form or order flow. Its metadata marks it noindex/nofollow.

## Product-truth and launch boundary

Any eventual demo products must be unmistakably illustrative and isolated from approved saleable products. Demo checkout must not collect payment data, place real orders, or show false purchase success. Live orders remain blocked until product, business, operational, legal, security, and payment-provider launch gates pass.

## Working discipline

Build one bounded phase at a time. Record actual checks and evidence. Never mark a check PASS if it was not run. Review mobile and desktop rendering, accessibility, behavior, performance, content truth, asset rights, and the full diff before calling a milestone complete.
