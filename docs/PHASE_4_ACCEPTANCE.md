# Phase 4 — Product detail, gallery and size information

**Status:** Implementation committed; CI verification pending. This phase makes product detail routes usable while preserving the distinction between concept artwork and a manufactured garment.

## Task contract
Build the first product-detail interaction layer from the existing validated product contract. Gallery selection must work with touch, pointer and keyboard; image failure must not break layout. Product options must use only approved size/availability/measurement records. A demo fixture must never show invented measurements or a working purchase action.

## Scope
- Shared product-gallery component with selected-thumbnail state and descriptive accessible labels.
- Original abstract concept panel added solely to exercise gallery selection; asset register explicitly excludes sale approval.
- Accessible unavailable-image fallback maintained in the main gallery and thumbnails.
- Size guide that renders measurements only for approved, live catalogue records with recorded size and measurement fields.
- No default size selection; unavailable or unknown variants cannot be selected.
- Preview concept records show no fabricated size/fit/measurement values and a clearly disabled purchase control.
- Unit and Playwright coverage for gallery keyboard selection, selected state, missing-image fallback, absent size data and disabled purchase workflow.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Gallery changes the main image and reports selected thumbnail | Playwright keyboard interaction | Pending CI |
| Gallery selection is reachable with named, focusable controls | Playwright plus semantic button state | Pending CI |
| Broken active image displays fallback and keeps layout usable | Playwright network-abort test | Pending CI |
| Demo content never invents sizes or measurements | Unit and Playwright assertions | Pending CI |
| Size guide reveals a truthful no-measurement state | Playwright details/summary test | Pending CI |
| Purchase control remains disabled for demo records | Playwright test | Pending CI |
| Catalogue, asset register, lint/types, build and full browser suite | GitHub Actions | Pending CI |

## Explicit non-goals
No live add-to-bag, cart persistence, checkout, payment, image zoom/lightbox, swipe-only navigation, invented size chart, or final garment photography.

## Deferred
Final garment designs and approved images, sizes and measurements, actual prices, size-specific inventory, supplier and production facts, fulfilment policies and checkout integration remain unresolved.
