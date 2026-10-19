# KROVINOX visual system

Status: approved for the storefront preview. This is a design-system record, not a claim that the clothing designs are final.

## Art direction

KROVINOX uses a kinetic editorial direction: mineral paper, deep pine, signal chartreuse, and a small amount of oxidation red. The identity feels like a fashion field notebook crossed with industrial instrument graphics, not a generic black-and-white luxury template.

Reference existing creative work for principles, not for copying brand assets:
- [ACRNM digital lookbook concept, Behance](https://www.behance.net/gallery/188505207/ACRNM-E-commerce-website): editorial product structure and technical-utility art direction.
- [Holt Renfrew Summer in Motion, Behance](https://www.behance.net/gallery/166236927/Holt-Renfrew-Summer-2022-Campaign): vivid campaign colour and dimensional typography.
- [Auralee SS26 campaign concept, Dribbble](https://dribbble.com/shots/26263541-Auralee-Bold-Fashion-Campaign-Ads-Marketing-Website-Design): oversized kinetic type, image contrast, and a deliberate accent colour. This is a third-party design concept, not a statement about Auralee's official website.
- [Iriedaily Webshop Redesign, Menschlabor](https://menschlabor.info/project/iriedaily-webshop-redesign/): collection, editorial storytelling, and shop work together without competing for attention.

KROVINOX borrows abstract principles only. It does not copy other brands' logos, graphics, layouts pixel-for-pixel, photography, or product artwork.

## Tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Primary surface | `--paper` | `#F2EEDF` | Warm mineral-paper background |
| Secondary surface | `--paper-deep` | `#DCE1D0` | Muted moss / editorial panels |
| Primary text | `--ink` | `#14251F` | Deep pine headlines, body and controls |
| Secondary text | `--muted` | `#526159` | Supporting copy |
| Borders | `--line` | `#BAC5B8` | Dividers and control boundaries |
| Signal | `--signal` | `#D8F36B` | Acid-chartreuse motion marks and primary actions |
| Oxidation | `--ember` | `#B9472F` | Sparse secondary details only |

- Display family: Syne, using high-weight compressed editorial headlines and tight tracking.
- Body family: DM Sans, with normal tracking and readable measure.
- Utility/metadata family: IBM Plex Mono.
- Rectangular buttons, purposeful negative space, no decorative gradients, no fake social proof, no random micro-labels, no pill-shaped controls, and no cursor effects.
- Page gutter: responsive `clamp(1.1rem, 4.3vw, 4.8rem)`; maximum content width: 1440px.

## Motion language

- A fixed, transparent orbital line system runs behind the browsing experience. Its circles rotate slowly and remain outside the main reading focus as much as possible.
- The hero carries a custom SVG orbit seal; it rotates slowly as a graphic detail, with a fixed KX/01 core.
- A continuous horizontal editorial ticker introduces the collection's real scope and values.
- Hero entrance timing is brief. Scroll effects reveal content and crop images as they enter view; the hero image moves slightly with scroll, and a top progress line follows page progress.
- CSS Scroll-Driven Animations are a progressive enhancement: pages remain fully visible and usable when `animation-timeline` is unsupported. Scroll-driven work is in CSS rather than a JavaScript scroll handler to avoid main-thread tracking.
- The fixed line artwork uses `pointer-events: none` and is decorative, not interactive.
- Every moving element must stop with `prefers-reduced-motion: reduce`; reduced-motion mode also disables the progress animation and keeps content in its resting state.

Implementation references:
- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [MDN: Scroll-driven animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)
- [W3C WAI: `prefers-reduced-motion`](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html)
- [Chrome: Motion design and performance guidance](https://github.com/GoogleChrome/modern-web-guidance-src/blob/main/guides/ui-behaviors/motion/guide.md)

## Product truth

- Apparel only in this release.
- Editorial photography is explicitly labelled as reference material, not KROVINOX product photography.
- No invented prices, stock, reviews, delivery promises, certifications, or scarcity.
- The preview bag stores concept selections only. It cannot initiate checkout, orders, or payments.
- Keep the site no-index until a reviewed launch decision is made.

## Review checklist

- [ ] Inspect 1440px, 390px, and 320px layouts after meaningful visual changes.
- [ ] Check contrast, image crops, keyboard focus, and mobile navigation.
- [ ] Verify fixed layers never obstruct pointer input.
- [ ] Respect `prefers-reduced-motion` across every motion source.
- [ ] Ensure unsupported scroll timelines leave static content visible.
- [ ] Inspect fresh browser screenshots; source code or a successful build alone is not visual approval.
- [ ] Replace editorial references only with approved original product photography and verified product information.
