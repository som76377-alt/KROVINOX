# Phase 1 — Design foundation and global shell acceptance

**Status:** Automated foundation, responsive shell, keyboard navigation, clean dependency installation and production build checks pass. Manual owner visual sign-off on real devices remains outstanding. The development-tooling audit still has a documented upstream advisory with no patched package; the production-only audit is now enforced in CI.

## Acceptance gates

| Gate | Evidence | Status |
|---|---|---|
| Token values, canonical declarations and contrast | `npm run check:tokens` | PASS |
| Strict TypeScript and lint | `npm run typecheck`, `npm run lint` | PASS |
| Shared header/footer and mobile menu | Playwright Chromium | PASS |
| Lockfile-respecting clean install | `npm ci` with committed `package-lock.json` | PASS at commit `82d0f85` |
| Production build | `npm run build` | PASS |
| Production dependency audit | `npm audit --omit=dev --audit-level=high` | Enforced in CI; prior audit snapshot had zero production findings |
| Full dev dependency audit | `docs/DEPENDENCY_AUDIT.md` | BLOCKED: one upstream `braces` advisory propagated through five dev-toolchain audit entries; no patched release listed |
| Manual art-direction sign-off | Owner inspection at real phone/desktop sizes | NOT RUN |

## Non-goals
No live orders, payment collection, production policy claims, or launch authorization.

## Required honesty
Automated passes do not prove visual quality or launch readiness. The owner must still inspect the current page at real device sizes, and the development-toolchain advisory must remain visible until a safe upstream remediation is available or a documented exception is approved.
