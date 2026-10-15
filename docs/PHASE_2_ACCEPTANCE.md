# Catalogue contract and demo isolation — acceptance

**Status:** Schema, catalogue and asset-register validation pass. The approved catalogue is empty. Concept fixtures are displayed only when catalogue mode is explicitly preview or the runtime is development; production defaults to live mode and refuses non-approved saleable records.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Product/variant/image types | `lib/products/types.ts` | PASS |
| Approved and demo source separation | `data/products.json`, `data/demo-products.json` | PASS |
| Image source, alt text, dimensions and asset register | `public/placeholders/*`, `docs/ASSET_REGISTER_TEMPLATE.csv` | PASS |
| Unique IDs/slugs and product lifecycle validation | `npm run check:catalogue` | PASS |
| Demo availability, asset approval and zero-price safeguards | Catalogue unit tests | PASS |
| Runtime catalogue mode and release guard | `lib/products/catalogue-mode.mjs` and unit tests | PASS |
| Production build cannot treat demo fixtures as live records | Live mode defaults to approved-only catalogue; prebuild validates data and assets | PASS |
| Demo fixture presentation is unmistakably non-saleable | Preview labels and end-to-end tests | PASS |

## Non-goals
No live inventory, checkout, price display for demo fixtures, customer orders, or physical garment representation.

## Deferred
Final garment designs, product pricing, sizes, measurements, material/fit/care claims, production method, supplier, stock, shipping/returns and approval records remain unresolved.
