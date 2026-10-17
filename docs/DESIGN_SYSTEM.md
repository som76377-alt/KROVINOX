# KROVINOX visual system

Status: approved for the storefront preview. This is a design-system record, not a claim that the clothing designs are final.

## Reference direction

Use editorial fashion commerce rather than a generic template. Study these references for their *layout and interaction principles*, not to copy their branding or assets:

- [Iriedaily Webshop Redesign, Menschlabor](https://menschlabor.info/project/iriedaily-webshop-redesign/): collection, editorial storytelling, and shop work together without competing for attention.
- [Twelvth Edit streetwear storefront, Emerge Digital](https://emergedigital.co/portfolio/elevated-streetwear-ecommerce-website-creation-for-twelvthedit-minimal-ui-ux/): restrained navigation, editorial-led product presentation, and a clear shopping path.
- [Off-White e-commerce concept, Wavespace](https://www.behance.net/gallery/229351021/ECommerce-Website-Mobile-App-OffWhite-Fashion): product-led hierarchy and consistent mobile/desktop structure. This is a design case study, not a claim about Off-White's current live site.

KROVINOX borrows the principle of a magazine-like narrative with predictable navigation. It does not copy another brand's logo, layouts pixel-for-pixel, photography, or product graphics.

## Tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Primary surface | `--paper` | `#f1efe8` | Main page background |
| Secondary surface | `--paper-deep` | `#e5e1d8` | Editorial panels and image backing |
| Primary text | `--ink` | `#111210` | Headlines, body, and controls |
| Secondary text | `--muted` | `#666760` | Supporting copy and metadata |
| Borders | `--line` | `#c9c6bd` | Dividers and control boundaries |
| Accent | `--signal` | `#e74727` | Selected emphasis, status strips, and focus |

- Display and body family: Manrope.
- Utility/metadata family: IBM Plex Mono.
- Headings use tight tracking and compressed line-height; body copy prioritizes readable measure.
- Buttons are rectangular. Cards are not wrapped in decorative shells by default.
- Page gutter: responsive `clamp(1.1rem, 4.3vw, 4.8rem)`; maximum content width: 1440px.
- Motion: one restrained scroll reveal (18px vertical travel), brief hover/press transitions, and no motion required to understand content.
- Reduced-motion preference disables the scroll reveal and shortens transitions.

## Product truth

- Apparel only in this release.
- Unsplash/editorial photos are explicitly labelled as references, not KROVINOX product photography.
- No invented prices, stock, reviews, delivery promises, certifications, or scarcity.
- The preview bag stores concept selections only. It cannot initiate checkout, orders, or payments.
- Keep the site no-index until a reviewed launch decision is made.

## Review checklist

- [ ] Inspect 1440px, 390px, and 320px layouts after meaningful visual changes.
- [ ] Check contrast, image crops, keyboard focus, and mobile navigation.
- [ ] Respect `prefers-reduced-motion`.
- [ ] Inspect fresh browser screenshots; source code or a successful build alone is not visual approval.
- [ ] Replace editorial references only with approved original product photography and verified product information.
