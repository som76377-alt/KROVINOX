# KROVINOX

An experimental, design-led clothing storefront, rebuilt in small verified stages against the Master PRD.

## Source of truth

- [Project Blueprint](BLUEPRINT.md) — locked architecture and implementation order.
- [Master PRD v1.0](docs/product/KROVINOX_Master_PRD_v1.0.md) — product requirements, journeys, design system, architecture and launch gates.
- [Rebuild baseline](docs/REBUILD_BASELINE.md) — repository inspection evidence and known limitations.
- [Dependency audit record](docs/DEPENDENCY_AUDIT.md) — dependency risk and release disposition.

## Current verified state

**Phase 3 — homepage and reusable product grid: PASS.** [The CI run for commit `8ea76dc`](https://github.com/som76377-alt/KROVINOX/actions/runs/38761992828) passed `npm ci`, the production-only security audit, ESLint, TypeScript, design-token and catalogue validation, unit tests, production build, and Playwright browser tests.

Phase 4 is extending the product-detail page with accessible gallery and honest size/availability states. The preview images are original abstract vector fixtures, not product photography. The approved catalogue remains empty.

## Technical stack and reproducibility

Next.js App Router, TypeScript, Tailwind CSS v4, local JSON catalogues, Server Components by default, and minimal client code for genuine interactions. Exact dependencies are pinned in `package.json` and `package-lock.json`; CI installs using `npm ci`.

The production-only dependency audit is a CI gate and has reported zero high-severity production findings. The full development-tooling audit has five high audit entries stemming from one upstream `braces` advisory with no patched release listed at audit time. See `docs/DEPENDENCY_AUDIT.md`; this remains documented rather than being misrepresented as fixed.

## Product truth and launch boundary

Demo fixtures remain separate from `data/products.json` and are only for the preview catalogue. Final designs, sizes, measurements, material/fit/care facts, price, availability, manufacturing, supplier, shipping, returns, business/legal setup and payment integration are not invented. There is no cart, checkout or order flow, and the preview is marked noindex/nofollow.

## Working discipline

Build one bounded stage at a time. Record checks as PASS/FAIL/NOT RUN/BLOCKED based on evidence. Passing CI does not substitute for the owner's visual review on actual phone and desktop sizes or authorize a commercial launch.
