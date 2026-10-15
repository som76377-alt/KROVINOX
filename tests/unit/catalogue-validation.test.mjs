import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { assertProductionSafe, validateCatalogue } from "../../lib/products/catalogue-validation.mjs";

const rootDir = process.cwd();
const approved = JSON.parse(readFileSync("data/products.json", "utf8"));
const demo = JSON.parse(readFileSync("data/demo-products.json", "utf8"));

test("approved and demo source files satisfy the product contract", () => {
  assert.deepEqual(validateCatalogue(approved, { rootDir, approvedOnly: true }), []);
  assert.deepEqual(validateCatalogue(demo, { rootDir }), []);
  assert.deepEqual(validateCatalogue([...approved, ...demo], { rootDir }), []);
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

test("production guard rejects demo, draft and archived records", () => {
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
