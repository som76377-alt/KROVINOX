import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const header = await readFile(new URL("../components/site-header.tsx", import.meta.url), "utf8");
const footer = await readFile(new URL("../components/site-footer.tsx", import.meta.url), "utf8");
const catalogue = await readFile(new URL("../lib/products/catalogue.ts", import.meta.url), "utf8");
const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

function declaration(property) {
  const match = css.match(new RegExp("(^|\\s)" + property + "\\s*:\\s*([^;]+);"));
  assert.ok(match, "Missing CSS token declaration: " + property);
  return match[2].trim();
}

function contrastRatio(a, b) {
  const luminance = (hex) => {
    const parts = hex.match(/[0-9a-f]{2}/gi);
    assert.equal(parts?.length, 3, "Expected hex color, received " + hex);
    const channels = parts.map((part) => parseInt(part, 16) / 255).map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    );
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const first = luminance(a);
  const second = luminance(b);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

const expected = {
  "--color-canvas": "#F4F2ED",
  "--color-ink": "#0C0D0C",
  "--color-text-secondary": "#6C6D69",
  "--color-border": "#D8D5CD",
  "--color-muted-metallic": "#A5A7A3",
  "--color-control-border": "#6C6D69",
};

for (const [property, value] of Object.entries(expected)) {
  assert.equal(declaration(property), value, property + " drifted from the approved token value");
  const count = [...css.matchAll(new RegExp(property + "\\s*:\\s*[^;]+;", "g"))].length;
  assert.equal(count, 1, property + " should have one canonical declaration, found " + count);
}

assert.ok(contrastRatio("#0C0D0C", "#F4F2ED") >= 7, "Primary text/background should meet WCAG AAA contrast.");
assert.ok(contrastRatio("#6C6D69", "#F4F2ED") >= 4.5, "Secondary text/background must meet WCAG AA contrast.");
assert.ok(contrastRatio("#F4F2ED", "#0C0D0C") >= 7, "Light-on-dark text pairing should meet WCAG AAA contrast.");
assert.match(css, /:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--color-ink\)/s, "Visible keyboard focus is required.");
assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/, "Reduced-motion handling is required.");
assert.match(css, /--aspect-product:\s*4\s*\/\s*5;/, "Product media ratio must be centralized at 4:5.");
assert.match(css, /--font-size-hero:\s*clamp\(2\.5rem,\s*5vw,\s*5rem\);/, "Hero typography must remain fluid within its approved bounds.");
assert.match(layout, /index:\s*false/);
assert.match(layout, /follow:\s*false/);
assert.match(header, /First collection in progress · Nothing for sale yet/);
assert.match(header, /href: "\/shop"/);
assert.match(header, /href: "\/about"/);
assert.match(header, /aria-current/);
assert.match(footer, /previewMode/);
assert.match(layout, /className="skip-link"/);
assert.match(page, /<ProductGrid/);
assert.match(page, /getCatalogueProducts/);
assert.match(catalogue, /assertProductionSafe/);
assert.match(catalogue, /resolveCatalogueMode/);
assert.equal(pkg.scripts["check:tokens"], "node scripts/check-design-tokens.mjs");
assert.equal(pkg.scripts.prebuild, "npm run check:catalogue");

for (let i = 1; i <= 12; i += 1) {
  assert.ok(css.includes("--spacing-kx-" + i + ":"), "Missing spacing scale step kx-" + i);
}

console.log("Design token checks passed: palette, contrast, spacing, type, ratio, focus, reduced motion, preview status and catalogue guard.");
