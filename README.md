# KROVINOX

An experimental, design-led clothing storefront. This repository is being rebuilt from a verified empty application baseline, in small stages governed by the master PRD.

## Source of truth

- [Project Blueprint](BLUEPRINT.md) — locked architecture and implementation order.
- [Master PRD v1.0](docs/product/KROVINOX_Master_PRD_v1.0.md) — complete product requirements, user journeys, design system, architecture, launch gates, and appended historical support documents.
- [Rebuild baseline](docs/REBUILD_BASELINE.md) — what was actually found in GitHub and what could not be verified.

## Status

**Phase 0 audit recorded. Application implementation has not started.** There is not yet a runnable storefront in this branch. Do not treat this repository or any demo state as production-ready.

## Planned technical direction

Next.js App Router, TypeScript, Tailwind CSS v4, server rendering by default, local catalog data, and minimal client-side code. Exact dependency versions, scripts, and package manager must be deliberately selected and verified in a separate implementation step; none have been verified by this baseline audit.

## Product-truth and launch boundary

Any eventual demo products must be unmistakably illustrative and isolated from approved saleable products. Demo checkout must not collect payment data, place real orders, or show false purchase success. Live orders remain blocked until product, business, operational, legal, security, and payment-provider launch gates pass.

## Working discipline

Build one bounded phase at a time. Record actual checks and evidence. Never mark a check PASS if it was not run. Review mobile and desktop rendering, accessibility, behavior, performance, content truth, asset rights, and the full diff before calling a milestone complete.
