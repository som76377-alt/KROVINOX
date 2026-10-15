export const CART_SCHEMA_VERSION = 1;
export const CART_MAX_QUANTITY = 10;
export const CART_MAX_LINES = 50;

const VALID_MODES = new Set(["preview", "live"]);
const SAFE_LOCAL_PATH = (value) =>
  typeof value === "string" &&
  value.startsWith("/") &&
  !value.startsWith("//") &&
  !value.includes("..") &&
  !value.includes("\\");

function assertMode(mode) {
  if (!VALID_MODES.has(mode)) {
    throw new TypeError('Cart mode must be "preview" or "live".');
  }
}

function makeLineKey(productId, variantId) {
  return JSON.stringify([productId, variantId]);
}

function lineIsValid(line) {
  if (!line || typeof line !== "object") return false;
  if (typeof line.productId !== "string" || !line.productId) return false;
  if (typeof line.slug !== "string" || !line.slug) return false;
  if (typeof line.name !== "string" || !line.name) return false;
  if (typeof line.variantId !== "string" || !line.variantId) return false;
  if (line.key !== makeLineKey(line.productId, line.variantId)) return false;
  if (typeof line.variantLabel !== "string" || !line.variantLabel) return false;
  if (!SAFE_LOCAL_PATH(line.imageSrc)) return false;
  if (typeof line.imageAlt !== "string" || !line.imageAlt) return false;
  if (!Number.isInteger(line.imageWidth) || line.imageWidth <= 0) return false;
  if (!Number.isInteger(line.imageHeight) || line.imageHeight <= 0) return false;
  if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > CART_MAX_QUANTITY) return false;
  if (!VALID_MODES.has(line.mode)) return false;
  if (line.mode === "preview") return line.isDemo === true && line.unitPricePaise === null;
  return line.isDemo === false && Number.isInteger(line.unitPricePaise) && line.unitPricePaise > 0;
}

export function createCartLine(product, variant, mode) {
  assertMode(mode);

  if (!product || typeof product !== "object" || !Array.isArray(product.variants) || !product.variants.some((item) => item.id === variant?.id)) {
    throw new TypeError("Select a variant that belongs to this product.");
  }
  if (!variant || typeof variant.id !== "string" || !variant.id || typeof variant.label !== "string" || !variant.label) {
    throw new TypeError("A valid product variant must be selected.");
  }

  const image = Array.isArray(product.images) ? product.images[0] : null;
  if (!image || !SAFE_LOCAL_PATH(image.src) || typeof image.alt !== "string" || !image.alt ||
      !Number.isInteger(image.width) || image.width <= 0 ||
      !Number.isInteger(image.height) || image.height <= 0) {
    throw new TypeError("The product needs a registered local image before it can be added.");
  }

  let unitPricePaise = null;
  if (mode === "preview") {
    if (product.lifecycle !== "demo" || product.isPlaceholder !== true) {
      throw new Error("Only isolated demo fixtures can be added to the preview bag.");
    }
  } else {
    if (product.lifecycle !== "approved" || product.isPlaceholder === true) {
      throw new Error("Only approved, non-placeholder products can enter a live bag.");
    }
    if (variant.availability !== "available" && variant.availability !== "made_to_order") {
      throw new Error("This variant is not currently orderable.");
    }
    unitPricePaise = variant.pricePaise ?? product.pricePaise;
    if (!Number.isInteger(unitPricePaise) || unitPricePaise <= 0) {
      throw new Error("A verified, positive price is required before a live item can be added.");
    }
    if (product.currency !== "INR") {
      throw new Error("Only the approved INR catalogue is supported in this cart.");
    }
  }

  const line = {
    key: makeLineKey(product.id, variant.id),
    productId: product.id,
    slug: product.slug,
    name: product.name,
    imageSrc: image.src,
    imageAlt: image.alt,
    imageWidth: image.width,
    imageHeight: image.height,
    variantId: variant.id,
    variantLabel: variant.label,
    size: typeof variant.size === "string" && variant.size.trim() ? variant.size : null,
    quantity: 1,
    unitPricePaise,
    currency: "INR",
    mode,
    isDemo: mode === "preview",
  };

  if (!lineIsValid(line)) throw new TypeError("Product data could not be converted into a safe cart line.");
  return line;
}

export function addCartLine(lines, newLine) {
  if (!Array.isArray(lines)) throw new TypeError("Cart lines must be an array.");
  if (!lineIsValid(newLine)) throw new TypeError("The cart line is invalid.");
  if (lines.length > CART_MAX_LINES) throw new RangeError("The cart contains too many lines.");

  const currentMode = lines[0]?.mode;
  if (currentMode && currentMode !== newLine.mode) {
    throw new Error("Preview and live cart items cannot be mixed.");
  }

  const existingIndex = lines.findIndex((line) => line.key === newLine.key);
  if (existingIndex >= 0) {
    const nextQuantity = lines[existingIndex].quantity + newLine.quantity;
    if (nextQuantity > CART_MAX_QUANTITY) {
      throw new RangeError("The maximum quantity for one variant is " + CART_MAX_QUANTITY + ".");
    }
    return lines.map((line, index) =>
      index === existingIndex ? { ...line, quantity: nextQuantity } : line
    );
  }

  if (lines.length >= CART_MAX_LINES) throw new RangeError("The bag can hold at most " + CART_MAX_LINES + " different variants.");
  return [...lines, { ...newLine }];
}

export function updateCartQuantity(lines, key, quantity) {
  if (!Array.isArray(lines)) throw new TypeError("Cart lines must be an array.");
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > CART_MAX_QUANTITY) {
    throw new RangeError("Quantity must be an integer from 0 to " + CART_MAX_QUANTITY + ".");
  }
  if (!lines.some((line) => line.key === key)) throw new Error("That bag item no longer exists.");
  if (quantity === 0) return lines.filter((line) => line.key !== key);
  return lines.map((line) => line.key === key ? { ...line, quantity } : line);
}

export function removeCartLine(lines, key) {
  if (!Array.isArray(lines)) throw new TypeError("Cart lines must be an array.");
  return lines.filter((line) => line.key !== key);
}

export function getCartCount(lines) {
  if (!Array.isArray(lines)) return 0;
  return lines.reduce((count, line) => count + (Number.isInteger(line?.quantity) && line.quantity > 0 ? line.quantity : 0), 0);
}

export function calculateSubtotalPaise(lines) {
  if (!Array.isArray(lines)) throw new TypeError("Cart lines must be an array.");
  if (lines.length === 0) return 0;
  if (lines.some((line) => line?.unitPricePaise === null)) return null;
  return lines.reduce((sum, line) => {
    if (!lineIsValid(line) || !Number.isInteger(line.unitPricePaise) || line.unitPricePaise <= 0) {
      throw new TypeError("A valid, verified price is required to calculate a subtotal.");
    }
    const next = sum + line.unitPricePaise * line.quantity;
    if (!Number.isSafeInteger(next)) throw new RangeError("Cart subtotal exceeds the safe integer range.");
    return next;
  }, 0);
}

export function serializeCart(lines, mode) {
  assertMode(mode);
  if (!Array.isArray(lines) || lines.some((line) => !lineIsValid(line) || line.mode !== mode)) {
    throw new TypeError("Only valid lines for the current cart mode can be persisted.");
  }
  return {
    version: CART_SCHEMA_VERSION,
    mode,
    lines: lines.map((line) => ({
      productId: line.productId,
      variantId: line.variantId,
      quantity: line.quantity,
    })),
  };
}

export function normalizeCart(snapshot, mode, products) {
  assertMode(mode);
  if (!snapshot || typeof snapshot !== "object" || snapshot.version !== CART_SCHEMA_VERSION ||
      snapshot.mode !== mode || !Array.isArray(snapshot.lines) || snapshot.lines.length > CART_MAX_LINES ||
      !Array.isArray(products)) {
    return [];
  }

  let lines = [];
  for (const savedLine of snapshot.lines) {
    if (!savedLine || typeof savedLine !== "object" ||
        typeof savedLine.productId !== "string" || typeof savedLine.variantId !== "string" ||
        !Number.isInteger(savedLine.quantity) || savedLine.quantity < 1 || savedLine.quantity > CART_MAX_QUANTITY) {
      continue;
    }

    const product = products.find((item) => item.id === savedLine.productId);
    const variant = product?.variants?.find((item) => item.id === savedLine.variantId);
    if (!product || !variant) continue;

    try {
      const baseLine = createCartLine(product, variant, mode);
      const line = { ...baseLine, quantity: savedLine.quantity };
      lines = addCartLine(lines, line);
    } catch {
      // Stored cart state is untrusted. Drop stale or invalid lines rather than render them.
    }
  }
  return lines;
}
