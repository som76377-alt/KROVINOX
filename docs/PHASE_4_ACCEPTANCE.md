# Phase 4 — Product detail, gallery and size information

**Status:** PASS at commit `2568a3c2586121512e075d0eb511cf389f67132e`. [GitHub Actions run 38762783818](https://github.com/som76377-alt/KROVINOX/actions/runs/38762783818) passed the clean install, production dependency audit, lint, strict types, token and catalogue validation, unit tests, production build, and all 13 Playwright tests. This phase made product detail routes usable while preserving the distinction between concept artwork and a manufactured garment. Phase 5 now adds a separate non-purchasable demo-bag simulation; this does not enable purchases or change the historical Phase 4 result.

## Task contract
Build the first product-detail interaction layer from the existing validated product contract. Gallery selection must work with touch, pointer and keyboard; image failure must not break layout. Product options must use only approved size/availability/measurement records. A demo fixture must never show invented measurements or a working purchase action.

## Scope
- Shared product-gallery component with selected-thumbnail state and descriptive accessible labels.
- Original abstract concept panel added solely to exercise gallery selection; asset register explicitly excludes sale approval.
- Accessible unavailable-image fallback maintained in the main gallery and thumbnails.
- Size guide that renders measurements only for approved, live catalogue records with recorded size and measurement fields.
- No default size selection; unavailable or unknown variants cannot be selected.
- Preview concept records show no fabricated size/fit/measurement values. The later demo-bag action is only a state-testing control, not a purchase or checkout action.
- Unit and Playwright coverage for gallery keyboard selection, selected state, missing-image fallback, absent size data and disabled purchase workflow.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Gallery changes the main image and reports selected thumbnail | Playwright keyboard interaction | PASS at commit `2568a3c` |
| Gallery selection is reachable with named, focusable controls | Playwright plus semantic button state | PASS at commit `2568a3c` |
| Broken active image displays fallback and keeps layout usable | Playwright network-abort test | PASS at commit `2568a3c` |
| Demo content never invents sizes or measurements | Unit and Playwright assertions | PASS at commit `2568a3c` |
| Size guide reveals a truthful no-measurement state | Playwright details/summary test | PASS at commit `2568a3c` |
| No real purchase or checkout action exists for demo records | Playwright test; Phase 5 adds only an explicitly non-purchasable demo bag | PASS at commit `2568a3c`; continued by Phase 5 tests |
| Catalogue, asset register, lint/types, build and full browser suite | GitHub Actions | PASS at commit `2568a3c` |

## Explicit non-goals
Phase 4 itself did not add live bag/cart, checkout, or payment. Phase 5 implements a separate preview-only bag. Image zoom/lightbox, swipe-only navigation, invented size charts, and final garment photography remain out of scope.

## Deferred
Final garment designs and approved images, sizes and measurements, actual prices, size-specific inventory, supplier and production facts, fulfilment policies and checkout integration remain unresolved.
