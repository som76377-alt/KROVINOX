# Dependency audit record — 15 October 2026

**Evidence run:** [GitHub Actions run 38757545282](https://github.com/som76377-alt/KROVINOX/actions/runs/38757545282), commit `9a2999f7539b37c5439c90a6d3bfca177789ed78`.

## Results

- `npm audit --omit=dev`: **0 vulnerabilities** in the production dependency tree at audit time.
- `npm audit`: **5 high-severity package findings**, all part of one development-tooling dependency chain:
  `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`.
- The underlying advisory is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) / CVE-2026-93687. It affects `braces` versions through 3.0.3 and the advisory listed no patched version at the time of this audit. The reported issue concerns stack exhaustion from deeply nested brace patterns.

## Disposition

**Release security status: BLOCKED, not cleared.**

The vulnerable chain is in development/lint tooling, and the production-only audit returned zero findings. That reduces direct runtime exposure, but it does not make the development-tooling finding disappear or justify claiming the full dependency tree is clean.

Do not run `npm audit fix --force` blindly. npm proposed downgrading `eslint-config-next` to 14.2.35, which is a major-version mismatch for this Next.js 16 project. Do not apply an arbitrary override to a package for which the advisory lists no patched release.

Before release, either:
1. Replace the affected lint-tool dependency chain with a compatible, audited alternative and rerun all checks; or
2. Have the repository owner explicitly approve a narrowly scoped, time-bounded development-only exception, with an owner and expiry, while continuing to monitor for a patched upstream release.

## Reproducibility caveat

This audit was generated from a temporary lockfile created by CI because `package-lock.json` is not committed yet. The audit result is useful evidence for this dependency resolution, but it is not a reproducible, immutable dependency snapshot. The missing committed lockfile remains a separate open item.
