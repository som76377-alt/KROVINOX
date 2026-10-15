import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  CART_MAX_LINES,
  CART_MAX_QUANTITY,
  addCartLine,
  calculateSubtotalPaise,
  createCartLine,
  getCartCount,
  normalizeCart,
  removeCartLine,
  serializeCart,
  updateCartQuantity,
} from "../../lib/cart/cart.mjs";

const demoProducts = JSON.parse(readFileSync("data/demo-products.json", "utf8"));
const demoProduct = demoProducts[0];
const demoVariant = demoProduct.variants[0];

function approvedFixture(id, variantId, pricePaise) {
  const image = demoProduct.images[0];
  const variant = {
    id: variantId,
    sku: "TEST-" + variantId,
    label: "Test size M",
    size: "M",
    availability: "available",
    pricePaise,
  };
  return {
    id,
    slug: "test-" + id,
    lifecycle: "approved",
    isPlaceholder: false,
    name: "Approved test fixture " + id,
    shortDescription: "Internal test fixture only.",
    pricePaise,
    currency: "INR",
    images: [{ ...image, id: id + "-image" }],
    variants: [variant],
    material: "Verified test fixture",
    fit: "Verified test fixture",
    care: "Verified test fixture",
    countryOfOrigin: "Test-only",
    approvalRecordId: "TEST-ONLY",
  };
}

test("preview cart lines are concept-only and never carry a sale price", () => {
  const line = createCartLine(demoProduct, demoVariant, "preview");
  assert.equal(line.mode, "preview");
  assert.equal(line.isDemo, true);
  assert.equal(line.unitPricePaise, null);
  assert.equal(line.variantLabel, demoVariant.label);
  assert.equal(line.size, null);
  assert.equal(calculateSubtotalPaise([line]), null);
});

test("preview cannot accept approved catalogue records and live mode cannot accept demo fixtures", () => {
  const approved = approvedFixture("approved-1", "approved-variant-1", 199900);
  assert.throws(() => createCartLine(approved, approved.variants[0], "preview"), /Only isolated demo fixtures/);
  assert.throws(() => createCartLine(demoProduct, demoVariant, "live"), /Only approved, non-placeholder products/);
});

test("live line prices come from the approved catalogue, not a saved browser price", () => {
  const product = approvedFixture("approved-price", "variant-price", 199900);
  const line = createCartLine(product, product.variants[0], "live");
  assert.equal(line.unitPricePaise, 199900);

  const snapshot = {
    version: 1,
    mode: "live",
    lines: [{
      productId: product.id,
      variantId: product.variants[0].id,
      quantity: 1,
      unitPricePaise: 1,
      name: "Tampered browser title",
      imageSrc: "//unsafe.example/image.png",
    }],
  };
  const normalized = normalizeCart(snapshot, "live", [product]);
  assert.equal(normalized.length, 1);
  assert.equal(normalized[0].unitPricePaise, 199900);
  assert.equal(normalized[0].name, product.name);
  assert.equal(normalized[0].imageSrc, product.images[0].src);
});

test("live cart rejects unknown or unavailable inventory states", () => {
  const product = approvedFixture("unavailable-product", "unavailable-variant", 199900);
  product.variants[0].availability = "unknown";
  assert.throws(() => createCartLine(product, product.variants[0], "live"), /not currently orderable/);
  product.variants[0].availability = "unavailable";
  assert.throws(() => createCartLine(product, product.variants[0], "live"), /not currently orderable/);
});

test("adding a repeated variant merges quantity and enforces the quantity limit", () => {
  const line = createCartLine(demoProduct, demoVariant, "preview");
  let lines = [];
  for (let quantity = 0; quantity < CART_MAX_QUANTITY; quantity += 1) {
    lines = addCartLine(lines, line);
  }
  assert.equal(lines.length, 1);
  assert.equal(lines[0].quantity, CART_MAX_QUANTITY);
  assert.equal(getCartCount(lines), CART_MAX_QUANTITY);
  assert.throws(() => addCartLine(lines, line), /maximum quantity/);
});

test("cart arithmetic uses integer minor units and quantity changes update totals", () => {
  const firstProduct = approvedFixture("product-one", "variant-one", 199900);
  const secondProduct = approvedFixture("product-two", "variant-two", 299900);
  const firstLine = createCartLine(firstProduct, firstProduct.variants[0], "live");
  const secondLine = createCartLine(secondProduct, secondProduct.variants[0], "live");

  let lines = addCartLine([], firstLine);
  lines = updateCartQuantity(lines, firstLine.key, 2);
  lines = addCartLine(lines, secondLine);
  assert.equal(calculateSubtotalPaise(lines), 699700);
  assert.equal(getCartCount(lines), 3);
});

test("quantity zero removes a line; invalid quantities are rejected", () => {
  const line = createCartLine(demoProduct, demoVariant, "preview");
  const lines = addCartLine([], line);
  assert.deepEqual(updateCartQuantity(lines, line.key, 0), []);
  assert.deepEqual(removeCartLine(lines, line.key), []);
  for (const invalid of [-1, 1.5, 11, Number.NaN]) {
    assert.throws(() => updateCartQuantity(lines, line.key, invalid), /integer from 0 to/);
  }
});

test("bag rejects mixing preview and live lines", () => {
  const previewLine = createCartLine(demoProduct, demoVariant, "preview");
  const liveProduct = approvedFixture("live-product", "live-variant", 199900);
  const liveLine = createCartLine(liveProduct, liveProduct.variants[0], "live");
  assert.throws(() => addCartLine([previewLine], liveLine), /cannot be mixed/);
});

test("maximum distinct line count is enforced", () => {
  let lines = [];
  for (let index = 0; index < CART_MAX_LINES; index += 1) {
    const product = approvedFixture("product-" + index, "variant-" + index, 10000 + index);
    lines = addCartLine(lines, createCartLine(product, product.variants[0], "live"));
  }
  assert.equal(lines.length, CART_MAX_LINES);
  const extra = approvedFixture("product-over-limit", "variant-over-limit", 25000);
  assert.throws(() => addCartLine(lines, createCartLine(extra, extra.variants[0], "live")), /at most/);
});

test("serialized storage contains only schema, mode and product/variant IDs plus quantities", () => {
  const line = createCartLine(demoProduct, demoVariant, "preview");
  const saved = serializeCart([line], "preview");
  assert.deepEqual(saved, {
    version: 1,
    mode: "preview",
    lines: [{ productId: demoProduct.id, variantId: demoVariant.id, quantity: 1 }],
  });
  assert.equal(JSON.stringify(saved).includes("unitPricePaise"), false);
  assert.equal(JSON.stringify(saved).includes("name"), false);
  assert.equal(JSON.stringify(saved).includes("imageSrc"), false);
});

test("normalization rebuilds preview lines from the trusted catalogue and discards stale or cross-mode data", () => {
  const snapshot = {
    version: 1,
    mode: "preview",
    lines: [
      { productId: demoProduct.id, variantId: demoVariant.id, quantity: 2, unitPricePaise: 990000 },
      { productId: "missing-product", variantId: "missing-variant", quantity: 1 },
      { productId: demoProduct.id, variantId: demoVariant.id, quantity: 0 },
    ],
  };
  const normalized = normalizeCart(snapshot, "preview", demoProducts);
  assert.equal(normalized.length, 1);
  assert.equal(normalized[0].quantity, 2);
  assert.equal(normalized[0].unitPricePaise, null);
  assert.deepEqual(normalizeCart(snapshot, "live", demoProducts), []);
  assert.deepEqual(normalizeCart({ version: 4, mode: "preview", lines: [] }, "preview", demoProducts), []);
});

test("preview lines from different variants are separate lines", () => {
  const first = createCartLine(demoProduct, demoProduct.variants[0], "preview");
  const second = createCartLine(demoProduct, demoProduct.variants[1], "preview");
  const lines = addCartLine(addCartLine([], first), second);
  assert.equal(lines.length, 2);
  assert.equal(getCartCount(lines), 2);
});
