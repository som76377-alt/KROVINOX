# KROVINOX visual and interaction system

Status: portfolio build in progress. The site is a fashion research and design-development portfolio, not an operating retailer.

## Art direction

KROVINOX uses mineral paper, deep pine, signal chartreuse and a restrained oxidation-red accent. The type system pairs Bodoni Moda's editorial contrast with Manrope's readable geometry and IBM Plex Mono for technical metadata. Rectangular controls, purposeful negative space and real product-specific photography are preferred over a generic luxury template.

Abstract research references:
- [ACRNM digital lookbook concept, Behance](https://www.behance.net/gallery/188505207/ACRNM-E-commerce-website)
- [Holt Renfrew Summer in Motion, Behance](https://www.behance.net/gallery/166236927/Holt-Renfrew-Summer-2022-Campaign)
- [Iriedaily Webshop Redesign, Menschlabor](https://menschlabor.info/project/iriedaily-webshop-redesign/)
- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [W3C WAI: reduced motion](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html)

## Product truth and image continuity

- Each catalog entry owns one image URL, an image-specific alt description, a source URL and a note about source confidence.
- The catalog image, detail-page image and home feature image use the same product record rather than looking up images independently.
- Category pages are explicitly labelled as broad references when the exact product cannot be verified. Composition claims are marked unconfirmed unless the linked source supports them.
- The prices in this portfolio are illustrative concept estimates, not retailer prices, not prices charged by KROVINOX and not offers to sell.
- Reference photography is attributed to its origin. Before a commercial launch, usage rights must be reviewed and imagery replaced or cleared as appropriate.
- No fake social proof, stock scarcity, delivery promises or unverified performance claims.
- The demo bag is not a retailer cart. Any payment is a Razorpay test-mode demonstration and cannot create a real sale or fulfilment.
- Payment endpoints reject requests without KROVINOX_PAYMENT_MODE=test, a Razorpay test key ID beginning rzp_test_, and a server-side test secret. Live keys are not supported in this portfolio flow.
- Keep site metadata noindex until product, legal, source-asset and business information has been reviewed for launch.

## Motion system

- The home garment study uses one exact source photograph for every crop layer. It is a 2D editorial disassembly effect, not a 3D scan or representation of hidden garment construction.
- Where supported, CSS scroll-linked timelines scrub the crop movement in both directions. Fallbacks retain readable static content.
- All decorative and scroll-linked motion must respect prefers-reduced-motion.
- The decorative atmosphere has pointer-events disabled and cannot block controls.
- Avoid one-shot animation where the intended interaction is scroll position.

## Validation checklist

- [ ] Run lint, TypeScript, production build and Playwright.
- [ ] Inspect 1440px, 390px and 320px layouts with screenshot evidence.
- [ ] Verify all 50 target combinations: 5 garment categories x 5 items x 2 audiences.
- [ ] Click through product cards and confirm each detail view keeps the exact item image and source attached.
- [ ] Test missing credential behaviour; checkout must stay disabled rather than simulate success.
- [ ] Confirm test order creation and payment signature validation with Razorpay test credentials only.
- [ ] Confirm no live key can enable the demo checkout.
