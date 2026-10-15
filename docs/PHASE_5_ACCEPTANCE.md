# Phase 5 — Bag/cart mechanics and demo checkout boundary

**Status:** Implementation committed; automated verification pending.

## Task contract
Implement persistent local bag state, variant-aware line merging, quantity update/removal, empty state, and clear totals semantics. Demo fixtures may be added only to an explicitly non-saleable preview bag. A demo fixture does not get a fabricated price, size, stock state, or order button. No customer, address, or payment data may be collected or stored.

## Scope
- Pure cart utilities for creating, merging, updating and removing variant-specific lines with caps (10 units per line; 50 distinct lines).
- Local storage schema versioned at v1 and separately keyed by `preview` and `live` mode.
- Browser storage persists only version, mode, product IDs, variant IDs and quantities. On hydration, line titles, images and prices are rederived from current server-provided catalog data; browser-supplied prices are ignored.
- Demo variants are called "preview states", explicitly not sizes or stock states. Demo lines carry no price and never show a currency amount; subtotal is stated as unavailable when a demo line is present.
- INR arithmetic uses integer paise for controlled unit tests; real live lines may only be created from approved records and available/made-to-order variants with a verified positive price.
- Header and footer bag links show the actual total unit count. Product preview can add the selected concept state to the demo bag; this is not a purchase action.
- Empty state, quantity decrement/increment, removal, line merging, refresh persistence, malformed storage, mode isolation, subtotal and quantity caps are covered by tests.
- Checkout remains explicitly disabled. No order, payment, reservation or success state exists.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Price is not trusted from browser storage | Unit test reconstructs live prices from server catalogue | Pending CI |
| Preview lines never carry a price | Cart utility tests and UI assertions | Pending CI |
| Storage saves identifiers/quantity only | Unit test inspects serialized schema | Pending CI |
| Preview and live storage keys do not cross-populate | Normalization unit and browser tests | Pending CI |
| Repeated add merges lines; max quantity/line count enforced | Unit and Playwright tests | Pending CI |
| Quantity updates, line removal and empty state work | Playwright journey | Pending CI |
| Bag is retained after refresh when browser storage is available | Playwright reload test | Pending CI |
| Checkout cannot be invoked; no order/payment is implied | Disabled control and browser assertions | Pending CI |
| Clean install, production-only dependency audit, lint/types/catalogue, unit tests, build and all E2E checks | GitHub Actions | Pending CI |

## Explicit non-goals
No live checkout, payment processing, order creation, stock reservation, customer accounts, customer/address data, shipping/tax calculation, or transaction-success page. This is local interaction state only, not an inventory or price authority.

## Deferred
Real approved products, real variants/SKUs, price approvals, inventory integration, provider selection, shipping/returns rules, and business/legal setup remain launch gates.
