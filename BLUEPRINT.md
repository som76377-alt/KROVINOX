# KROVINOX — Project Blueprint

**Status:** Phase 1 foundation files drafted on the rebuild branch; workflow verification and a committed lockfile are still pending.  
**Authority:** `docs/product/KROVINOX_Master_PRD_v1.0.md` is the complete product specification.  
**Market assumption:** India-first, INR presentation; legal and operational details remain launch-gated.  
**Last audited:** 15 October 2026.

## 1. Product definition

KROVINOX is an experimental, design-led clothing brand. The first release is a focused storefront for original clothing, not a generic luxury template and not a multi-category marketplace. The first assortment may begin with roughly three or four original tee designs, but this remains a hypothesis until garment designs, production capability, prices, and assets are approved.

The site must combine distinctive art direction with predictable, accessible shopping. Product claims, materials, fit, price, stock, manufacturing, shipping, and customer proof must be supported by verified facts. No fake reviews, fake scarcity, invented founder story, unsupported sustainability claim, or fictitious order success.

## 2. Locked decisions

- Brand: **KROVINOX**.
- Product focus: design-led clothing; unrelated dropship products and the previously explored 3D-printed decor line are out of initial scope.
- Planned stack: Next.js App Router, TypeScript, Tailwind CSS v4. Exact compatible versions and package manager are chosen only after the implementation environment is established.
- Default to React Server Components and static/local data. Use narrow Client Component boundaries only for necessary interaction.
- Central design tokens: canvas `#F4F2ED`, ink `#0C0D0C`, secondary text `#6C6D69`, border `#D8D5CD`, and dark-surface text `#F4F2ED`. Check every actual contrast pairing; tokens are not a substitute for testing.
- Typography: Manrope as the primary family; IBM Plex Mono only for limited technical metadata. Use optimized/local font loading as compatible with the selected framework version.
- Product-first homepage; three-column desktop product grid and two-column mobile starting point; product image ratio begins at 4:5.
- Local catalog data first. No database, CMS, account system, custom card handling, search/filter system, or analytics platform without an approved, demonstrated need.
- Placeholder records must be isolated from approved saleable product records. Demo mode must never create real orders, collect payment details, or imply a successful purchase.
- Live checkout, real policy claims, and production sales remain disabled until their provider, business facts, content, and release gates are verified.

## 3. Required user-facing route plan

| Route | Requirement / guard |
|---|---|
| `/` | Editorial homepage, clear collection CTA, product preview before long brand copy |
| `/shop` | Product listing; counts derived from the active data source |
| `/products/[slug]` | Product detail; unknown slugs return genuine not-found |
| `/bag` | Correct items, quantities, removal, totals, and explicit demo/checkout state |
| `/about` | Authentic brand context only; no invented founder or production claims |
| `/contact` | Enable only with a real destination and error handling |
| `/shipping-returns`, `/privacy`, `/terms` | Launch-gated; never publish guessed policy/legal copy as real |
| `/size-guide` or product-specific size panel | Illustrative data clearly marked in demo; verified measurements required at launch |
| `/faq` | Only useful, substantiated answers; launch-gate operational claims |

No journal, objects, accounts, wishlist, order-status, chatbot, or other deferred route should be added without an explicit approved need.

## 4. Architecture boundaries

Keep a single source of truth for each product fact, price, variant state, route metadata, and design token. Separate data from presentation. Keep cart arithmetic and catalog validation in small, testable pure modules. Do not create every proposed folder up front: introduce a module only when the next approved stage needs it.

Planned logical boundaries, to be created incrementally:

- `app/`: routes, layouts, framework error/not-found boundaries, metadata.
- `components/site/`: genuinely shared header, footer, and layout pieces.
- `components/product/`: product card/grid/gallery/information controls.
- `components/cart/`: bag line items and totals.
- `components/demo/`: explicit preview state and demo restrictions.
- `lib/catalog/`, `lib/cart/`, `lib/seo/`: focused logic, not oversized service layers.
- `data/demo-products.json`: visibly illustrative fixtures and edge-case test data.
- `data/products.json`: approved saleable products only; never silently merge with demo fixtures.
- `public/images/placeholders/`: neutral, correctly proportioned preview assets with recorded provenance.
- `tests/`: unit, component, and end-to-end coverage selected after tooling is available.
- `docs/`: requirements, decisions, evidence, and change records.

## 5. Build order and gates

1. **Phase 0 — Baseline audit:** repository, branches, files, scripts, tests, CI, deployment and known limitations. Record what cannot be checked.
2. **Phase 1 — Design tokens and typography:** central tokens, fonts, type scale, spacing, controls, focus, image ratios and reduced motion.
3. **Phase 2 — Global shell:** root layout, metadata baseline, navigation/menu and footer.
4. **Phase 3 — Catalog contract and demo isolation:** validation, integer minor-unit prices, unique identifiers, fixture/production separation and fail-closed guards.
5. **Phase 4 — Product card and grid.**
6. **Phase 5 — Homepage and Shop.**
7. **Phase 6 — Product detail, gallery, size information and variant states.**
8. **Phase 7 — Bag/cart and disabled demo-checkout boundary.**
9. **Phase 8 — Trust and information routes.**
10. **Phase 9 — SEO, media, accessibility and performance.**
11. **Phase 10+ — Checkout/provider, real product/manufacturing validation, then release candidate.**

Each phase is a bounded commit or small sequence of commits. Do not advance while prior-phase requirements are failing. Report each check as PASS, FAIL, NOT RUN, BLOCKED, or NOT APPLICABLE and include evidence. A build passing does not establish visual quality or release readiness.

## 6. Verification and scope control

- Inspect current files, scripts, lockfile, and tests before changing them. Never infer setup from memory.
- Define user-visible acceptance criteria before implementation; test happy, failure, boundary, mobile, and keyboard/accessibility states where relevant.
- Never add dependencies, broaden scope, update snapshots blindly, weaken tests, suppress errors, invent facts, or refactor unrelated files for convenience.
- Review the complete diff. Test configuration, CI, dependencies, and policy files require explicit justification.
- Inspect actual rendered pages at required mobile and desktop widths. Browser screenshots and manual human art-direction review are mandatory for visual claims.
- Keep secret material out of source, client bundles, prompts, logs, and screenshots.
- Demo pages should be noindex and excluded from production sitemap, product structured data, and feeds. Production build guards must fail if placeholders leak into the saleable catalog.
- Live sales require owner approval plus verified product and asset rights, sample/manufacturing feasibility, pricing, fulfillment, shipping/returns, seller details, privacy/terms, payment provider, and a safe end-to-end rehearsal.

## 7. Guardrails package boundary

The standalone `KROVINOX_AI_Quality_Guardrails.zip` and its source files remain unchanged and separate during this milestone, in accordance with the PRD's explicit instruction. This blueprint and the master PRD record relevant project decisions; they do not claim that standalone guardrail files or automated CI enforcement have been installed. Any future integration requires its own bounded task and review.

## 8. Current status

Phase 0 established that the pre-rebuild application branch had no application runtime. Phase 1 now drafts the toolchain, typography/design tokens, a no-commerce foundation preview, a token-check script, Playwright browser tests, and a GitHub Actions workflow on `rebuild/krovinox-clean-start`. The workflow has not yet been verified. A generated dependency lockfile must be reviewed and committed before dependency reproducibility can pass. No claim is made that lint, typechecking, production build, browser tests, or visual art-direction review have passed. The `main` branch remains unchanged.
