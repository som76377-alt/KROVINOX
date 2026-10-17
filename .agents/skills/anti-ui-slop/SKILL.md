---
name: anti-ui-slop
description: Use this skill whenever generating or reviewing UI/UX for web or app screens — landing pages, dashboards, forms, cards, admin panels, marketing sites. Enforces project-specific design tokens and actively blocks generic "AI slop" patterns (templated hero sections, gradient orbs, unnecessary micro-labels, default Tailwind/shadcn look). Trigger this even when the user just says "make a page/screen/component" without mentioning design explicitly — visual output quality is always in scope.
---

# Anti UI Slop

AI-generated UI tends to converge on the statistical average of its training data, which produces templated, personality-free, over-decorated results. This skill provides guardrails to avoid those patterns and produce UI with actual intent behind it.

## Core principles

1. **Fix tokens before writing any UI** — don't decide colors, fonts, or spacing ad hoc. Read `references/design-tokens.md`; if the project's tokens aren't defined yet, settle them with the user first.
2. **Check against banned patterns mechanically** — before delivering output, self-review against the list in `references/patterns-to-avoid.md`.
3. **Ask "can this label be removed?" first** — see "The unnecessary label problem" below.
4. **Anchor to a concrete reference** — instead of vaguely "looking nice," name a specific design system or product (Linear, Vercel, Stripe, etc.) and articulate which specific traits to borrow before implementing.

## The unnecessary label problem

AI tends to add a small label even when the value's meaning is already obvious from context or layout — e.g. a faint gray micro-label above or to the upper-left of a number, or a 3-word caption under an icon.

Before shipping, ask:

- Would the meaning still be clear from position, icon, ordering, or the surrounding heading without this label? → If yes, remove it.
- Is this label part of the "big number + small label + gradient" templated stat-card pattern? → Check the relevant entry in `references/patterns-to-avoid.md` and consider a different layout.
- Is this something a first-time user would actually get confused without, or just a developer's own reassurance? → If the latter, the label isn't needed.

## Workflow

1. Confirm what kind of UI is being requested (landing page, admin panel, form, etc.)
2. Read `references/design-tokens.md` and check whether this project's tokens are already defined. If not, ask and settle them first (prefer extracting from existing code or a Figma file if available).
3. Skim `references/patterns-to-avoid.md` before implementing so the common banned patterns are top of mind.
4. Implement.
5. Self-review against the pre-delivery checklist below and fix anything that matches before presenting the result.

## Pre-delivery checklist

- [ ] No gradient background or gradient orbs used without a reason
- [ ] Not just the default shadcn/ui or Tailwind color palette left as-is
- [ ] Doesn't blindly follow the templated hero → 3 cards → logo strip → pricing → FAQ structure
- [ ] No unnecessary micro-labels (see "The unnecessary label problem" above)
- [ ] Fonts match the spec or the project's tokens (not defaulting to Inter/Poppins/Geist without being asked)
- [ ] Accessibility requirements are met (contrast ratio, touch target size, etc.)

## Reference files

- `references/patterns-to-avoid.md` — concrete list of banned patterns and why
- `references/design-tokens.md` — template for defining a project's design tokens
