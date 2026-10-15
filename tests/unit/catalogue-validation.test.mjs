import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { assertProductionSafe, validateCatalogue } from "../../lib/products/catalogue-validation.mjs";
import { resolveCatalogueMode } from "../../lib/products/catalogue-mode.mjs";
import { formatPricePaise } from "../../lib/products/format-price.mjs";

const rootDir = process.cwd();
const approved = JSON.parse(readFileSync("data/products.json", "utf8"));
const demo = JSON.parse(readFileSync("data/demo-products.json", "utf8"));

test("approved and demo source files satisfy the product contract", () => {
  assert.deepEqual(validateCatalogue(approved, { rootDir, approvedOnly: true }), []);
  assert.deepEqual(validateCatalogue(demo, { rootDir, demoOnly: true }), []);
  assert.deepEqual(validateCatalogue([...approved, ...demo], { rootDir }), []);
  assert.ok(demo.every((product) => !Object.hasOwn(product, "pricePaise")),
    "demo fixtures must omit price entirely rather than encode an invented zero price");
});

test("approved products cannot be inserted into the demo fixture file", () => {
  const records = structuredClone(demo);
  records[0].lifecycle = "approved";
  records[0].isPlaceholder = false;
  const errors = validateCatalogue(records, { rootDir, demoOnly: true });
  assert.ok(errors.some((message) => message.includes('only lifecycle "demo" is allowed')));
});

test("duplicate product IDs and slugs fail with actionable errors", () => {
  const records = structuredClone(demo);
  records[1].id = records[0].id;
  records[1].slug = records[0].slug;
  const errors = validateCatalogue(records, { rootDir, label: "test fixtures" });
  assert.ok(errors.some((message) => message.includes("duplicates product id")));
  assert.ok(errors.some((message) => message.includes("duplicates slug")));
});

test("missing alt text and missing image files are rejected", () => {
  const records = structuredClone(demo);
  records[0].images[0].alt = "";
  records[0].images[0].src = "/placeholders/does-not-exist.svg";
  const errors = validateCatalogue(records, { rootDir });
  assert.ok(errors.some((message) => message.includes('missing required field "alt"')));
  assert.ok(errors.some((message) => message.includes("asset does not exist")));
});

test("unknown asset-register IDs are rejected", () => {
  const records = structuredClone(demo);
  records[0].images[0].assetRegisterId = "ASSET-NOT-REGISTERED";
  const errors = validateCatalogue(records, { rootDir });
  assert.ok(errors.some((message) => message.includes("assetRegisterId is not present in the asset register")));
});

test("demo fixtures cannot claim sale availability", () => {
  const records = structuredClone(demo);
  records[0].variants[0].availability = "available";
  const errors = validateCatalogue(records, { rootDir });
  assert.ok(errors.some((message) => message.includes("demo variants cannot be marked available for sale")));
});

test("production guard rejects demo and draft records", () => {
  assert.throws(() => assertProductionSafe([demo[0]], { mode: "production" }), /Production catalogue contains non-approved or placeholder product/);
  assert.throws(() => assertProductionSafe([{ id: "draft-1", lifecycle: "draft" }], { mode: "production" }), /Production catalogue contains non-approved or placeholder product/);
});

test("production guard permits an empty approved catalogue while products are deferred", () => {
  assert.doesNotThrow(() => assertProductionSafe([], { mode: "production" }));
});

test("approved zero-price records fail without explicit approval", () => {
  const records = [{
    ...demo[0], lifecycle: "approved", isPlaceholder: false, demoStatus: undefined, pricePaise: 0,
    approvalRecordId: "approval-1", material: "verified", fit: "verified", care: "verified", countryOfOrigin: "verified",
    variants: [{ id: "sku-1", sku: "KX-001", label: "Sample", availability: "available", pricePaise: 0 }],
  }];
  const errors = validateCatalogue(records, { rootDir, approvedOnly: true });
  assert.ok(errors.some((message) => message.includes("approved saleable products cannot have a zero price")));
  assert.ok(errors.some((message) => message.includes("approved variants cannot have a zero price")));
});

test("catalogue mode defaults to preview in development and live in production", () => {
  assert.equal(resolveCatalogueMode(undefined, "development"), "preview");
  assert.equal(resolveCatalogueMode(undefined, "production"), "live");
});

test("release mode refuses an explicitly configured preview catalogue", () => {
  assert.throws(() => resolveCatalogueMode("preview", "production", true), /release build cannot use preview catalogue mode/);
  assert.equal(resolveCatalogueMode("live", "production", true), "live");
  assert.throws(() => resolveCatalogueMode("unexpected", "production"), /must be "preview" or "live"/);
});

test("price formatting is centralised and rejects malformed minor-unit amounts", () => {
  assert.match(formatPricePaise(199900), /1,999/);
  assert.throws(() => formatPricePaise(-1), /non-negative integer number of paise/);
  assert.throws(() => formatPricePaise(2.5), /non-negative integer number of paise/);
});

test("the second concept panel is registered and not presented as a product view", () => {
  assert.equal(demo[0].images.length, 2);
  assert.equal(demo[0].images[1].role, "gallery");
  assert.match(demo[0].images[1].alt, /not a product view or photograph/i);
  const errors = validateCatalogue(demo, { rootDir, demoOnly: true });
  assert.deepEqual(errors, []);
});

test("demo fixtures without prices are rendered as non-saleable concepts", () => {
  const raw = readFileSync("components/product-card.tsx", "utf8");
  assert.match(raw, /product\.lifecycle === "demo"/);
  assert.match(raw, /Illustrative fixture · Not for sale/);
  assert.match(raw, /typeof product\.pricePaise === "number"/);
});

test("demo price fields are rejected even if a zero value is supplied", () => {
  const records = structuredClone(demo);
  records[0].pricePaise = 0;
  const errors = validateCatalogue(records, { rootDir, demoOnly: true });
  assert.ok(errors.some((message) => message.includes("demo fixtures must omit pricePaise")));
});
