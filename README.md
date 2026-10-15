# KROVINOX

An experimental, design-led clothing storefront, rebuilt in small verified stages against the Master PRD.

## Source of truth

- [Project Blueprint](BLUEPRINT.md) — locked architecture and implementation order.
- [Master PRD v1.0](docs/product/KROVINOX_Master_PRD_v1.0.md) — product requirements, journeys, design system, architecture and launch gates.
- [Rebuild baseline](docs/REBUILD_BASELINE.md) — repository inspection evidence and known limitations.
- [Dependency audit record](docs/DEPENDENCY_AUDIT.md) — dependency risk and release disposition.

## Current verified state

**Phase 3 — homepage and reusable product grid: PASS.** [CI run 38761992828](https://github.com/som76377-alt/KROVINOX/actions/runs/38761992828) passed clean `npm ci`, the production dependency audit, lint, TypeScript, token and catalogue checks, unit tests, production build and Playwright tests.

**Phase 4 — product gallery and size/order states: PASS.** [CI run 38762783818](https://github.com/som76377-alt/KROVINOX/actions/runs/38762783818) passed those gates plus 13 browser tests, including keyboard gallery selection, image-error fallback, and truthful size-measurement states.

**Phase 5 — bag/cart mechanics: implementation committed; CI verification pending.** The bag uses a versioned, mode-isolated browser store containing only product/variant IDs and quantities. Demo lines have no approved price, subtotal is reported as unavailable, and checkout stays disabled. There is no order, payment, reservation or personal-data collection.

The approved catalogue is empty. The abstract vector assets are only layout/concept fixtures, not product photography. The rebuild branch is not a live shop or launch candidate.

## Technical stack and reproducibility

Next.js App Router, TypeScript, Tailwind CSS v4, local JSON catalogues, Server Components by default, and minimal client code for genuine interactions. Exact dependencies are pinned in `package.json` and `package-lock.json`; CI installs with `npm ci`.

The production-only dependency audit is a CI gate and has reported zero high-severity production findings. The full development-tooling audit has five high audit entries stemming from one upstream `braces` advisory with no patched release listed at audit time. See `docs/DEPENDENCY_AUDIT.md`; this is documented, not claimed fixed.

## Product truth and launch boundary

Demo fixtures remain separate from `data/products.json` and are only for the preview catalogue. Final designs, sizes, measurements, material/fit/care facts, price, availability, manufacturing, supplier, shipping, returns, business/legal setup and payment integration are not invented. Checkout is not implemented; the preview is marked noindex/nofollow.

## Remaining gates and next stage

Phase 5 must pass the full clean-install, production audit, lint, type, catalogue, unit, build and browser suite. After that, Phase 6 is editorial/trust-content page work under the PRD. Manual visual review on real phone and desktop sizes remains outstanding. The full development-tooling advisory must stay documented until safely remediated or explicitly risk-accepted.

## Working discipline

Build one bounded stage at a time. Record checks as PASS/FAIL/NOT RUN/BLOCKED based on evidence. Passing CI does not replace the owner's visual review or authorize a commercial launch.
