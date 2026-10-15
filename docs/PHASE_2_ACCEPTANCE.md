# Catalogue contract and demo isolation — acceptance

**Status:** Catalogue contract, asset-register cross-checks, unit tests, production build, and browser checks all pass in CI at commit `82c33b6`. The approved catalogue remains empty, and demo fixtures are not rendered in the UI.

## Scope
- Typed product, variant, image, lifecycle, and availability contracts.
- Separate approved catalogue (data/products.json) and isolated demo fixtures (data/demo-products.json).
- Neutral original SVG layout fixtures, each marked concept-only and not for sale.
- Asset register entries for every placeholder asset.
- Runtime validation for IDs/slugs, currency and integer minor-unit prices, variants, availability, alt text, image dimensions, asset existence, lifecycle rules, and approved-product facts.
- A production guard that rejects demo/draft/archived/placeholder records in the approved catalogue.
- Automated valid/invalid fixture tests wired into the project check and CI.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Type contract aligns with the PRD | lib/products/types.ts | PASS in CI at commit `82c33b6` |
| Approved and demo records remain separate | data/products.json, data/demo-products.json | PASS in CI at commit `82c33b6` |
| Referenced placeholder assets exist and are registered | public/placeholders/*, docs/ASSET_REGISTER_TEMPLATE.csv | PASS in CI at commit `82c33b6` |
| Duplicate IDs/slugs, missing alt/assets, saleable demo state fail | tests/unit/catalogue-validation.test.mjs | PASS in CI at commit `82c33b6` |
| Production guard rejects non-approved records | assertProductionSafe unit tests and CLI check | PASS in CI at commit `82c33b6` |
| Build remains safe with no approved products | Production build and catalogue CLI | PASS in CI at commit `82c33b6` |
| Demo fixtures are not rendered as saleable products | No product UI exists in this phase; approved catalogue remains empty | Verified by source separation; recheck when UI is added |

## Non-goals
No product cards, homepage catalogue, product details, price display, checkout, inventory claims, live product records, or real garment assets.

## Deferred
Actual garment designs, pricing, measurements, material/fit/care claims, production method, supplier, inventory, shipping/returns, and approval records remain unresolved. Do not invent these to fill the schema.
