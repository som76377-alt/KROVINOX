import { existsSync } from "node:fs";
import path from "node:path";

const LIFECYCLES = new Set(["draft", "demo", "approved", "archived"]);
const IMAGE_ROLES = new Set(["primary", "gallery", "detail", "fit", "packaging"]);
const AVAILABILITY = new Set(["unknown", "available", "unavailable", "made_to_order"]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateCatalogue(records, options = {}) {
  const label = options.label ?? "catalogue";
  const rootDir = options.rootDir ?? process.cwd();
  const approvedOnly = options.approvedOnly ?? false;
  const errors = [];
  if (!Array.isArray(records)) return [label + ": expected an array of product records."];

  const productIds = new Set();
  const slugs = new Set();
  const variantIds = new Set();
  const error = (message) => errors.push(label + ": " + message);

  for (const [index, product] of records.entries()) {
    const prefix = "product[" + index + "]";
    if (!product || typeof product !== "object" || Array.isArray(product)) {
      error(prefix + " must be an object.");
      continue;
    }

    for (const field of ["id", "slug", "name", "shortDescription"]) {
      if (typeof product[field] !== "string" || product[field].trim() === "") {
        error(prefix + ' is missing required text field "' + field + '".');
      }
    }

    if (typeof product.id === "string" && product.id.trim()) {
      if (productIds.has(product.id)) error(prefix + ' duplicates product id "' + product.id + '".');
      productIds.add(product.id);
    }
    if (typeof product.slug === "string" && product.slug.trim()) {
      if (!SLUG_PATTERN.test(product.slug)) error(prefix + ' has invalid slug "' + product.slug + '". Use lowercase kebab-case.');
      if (slugs.has(product.slug)) error(prefix + ' duplicates slug "' + product.slug + '".');
      slugs.add(product.slug);
    }

    if (!LIFECYCLES.has(product.lifecycle)) error(prefix + ' has invalid lifecycle "' + product.lifecycle + '".');
    if (approvedOnly && product.lifecycle !== "approved") {
      error(prefix + " is not approved; only approved records may live in data/products.json.");
    }
    if (product.currency !== "INR") error(prefix + ' must declare currency "INR".');
    if (!Number.isInteger(product.pricePaise) || product.pricePaise < 0) {
      error(prefix + " pricePaise must be a non-negative integer in minor currency units.");
    }

    if (product.lifecycle === "demo") {
      if (product.isPlaceholder !== true) error(prefix + " demo records must set isPlaceholder=true.");
      if (!["illustrative", "layout-test"].includes(product.demoStatus)) {
        error(prefix + ' demo records need demoStatus "illustrative" or "layout-test".');
      }
    } else if (product.isPlaceholder === true) {
      error(prefix + ' placeholder records must use lifecycle "demo", not "' + product.lifecycle + '".');
    }

    if (product.lifecycle === "approved") {
      if (product.pricePaise === 0) error(prefix + " approved saleable products cannot have a zero price without explicit owner approval.");
      for (const field of ["material", "fit", "care", "countryOfOrigin", "approvalRecordId"]) {
        if (typeof product[field] !== "string" || product[field].trim() === "") {
          error(prefix + ' approved records require verified "' + field + '".');
        }
      }
    }

    if (!Array.isArray(product.images) || product.images.length === 0) {
      error(prefix + " must include at least one registered image/placeholder.");
    } else {
      for (const [imageIndex, image] of product.images.entries()) {
        const imagePrefix = prefix + ".images[" + imageIndex + "]";
        if (!image || typeof image !== "object") {
          error(imagePrefix + " must be an object.");
          continue;
        }
        for (const field of ["id", "src", "alt", "assetRegisterId"]) {
          if (typeof image[field] !== "string" || image[field].trim() === "") {
            error(imagePrefix + ' is missing required field "' + field + '".');
          }
        }
        if (typeof image.alt === "string" && /^(image|photo|picture) of\s*$/i.test(image.alt.trim())) {
          error(imagePrefix + " alt text is not descriptive enough.");
        }
        if (!IMAGE_ROLES.has(image.role)) error(imagePrefix + ' has invalid image role "' + image.role + '".');
        if (!Number.isInteger(image.width) || image.width <= 0 || !Number.isInteger(image.height) || image.height <= 0) {
          error(imagePrefix + " width and height must be positive integers.");
        }

        if (typeof image.src === "string") {
          if (!image.src.startsWith("/") || image.src.startsWith("//") || image.src.includes("..") || image.src.includes("\\")) {
            error(imagePrefix + " src must be a safe local public path.");
          } else {
            const publicRoot = path.resolve(rootDir, "public");
            const assetPath = path.resolve(publicRoot, image.src.slice(1));
            if (!assetPath.startsWith(publicRoot + path.sep)) {
              error(imagePrefix + " resolves outside the public asset directory.");
            } else if (!existsSync(assetPath)) {
              error(imagePrefix + " asset does not exist: public" + image.src);
            }
          }
        }
      }
    }

    if (!Array.isArray(product.variants) || product.variants.length === 0) {
      error(prefix + " must include at least one variant/state fixture.");
    } else {
      for (const [variantIndex, variant] of product.variants.entries()) {
        const variantPrefix = prefix + ".variants[" + variantIndex + "]";
        if (!variant || typeof variant !== "object") {
          error(variantPrefix + " must be an object.");
          continue;
        }
        if (typeof variant.id !== "string" || !variant.id.trim()) {
          error(variantPrefix + " is missing required id.");
        } else {
          if (variantIds.has(variant.id)) error(variantPrefix + ' duplicates variant id "' + variant.id + '".');
          variantIds.add(variant.id);
        }
        if (typeof variant.label !== "string" || !variant.label.trim()) error(variantPrefix + " is missing label.");
        if (!AVAILABILITY.has(variant.availability)) error(variantPrefix + ' has invalid availability "' + variant.availability + '".');
        if (variant.pricePaise !== undefined && (!Number.isInteger(variant.pricePaise) || variant.pricePaise < 0)) {
          error(variantPrefix + " pricePaise must be a non-negative integer.");
        }
        if (product.lifecycle === "demo" && variant.availability === "available") {
          error(variantPrefix + " demo variants cannot be marked available for sale.");
        }
        if (product.lifecycle === "approved") {
          if (typeof variant.sku !== "string" || !variant.sku.trim()) error(variantPrefix + " approved variants require a verified SKU.");
          if (variant.availability === "unknown") error(variantPrefix + " approved variants cannot have unknown availability.");
          if (variant.pricePaise === 0) error(variantPrefix + " approved variants cannot have a zero price without explicit owner approval.");
        }
      }
    }
  }
  return errors;
}

export function assertProductionSafe(records, options = {}) {
  const mode = options.mode ?? process.env.NODE_ENV;
  if (mode !== "production") return;
  const unsafe = records.filter((product) => !product || product.lifecycle !== "approved" || product.isPlaceholder === true);
  if (unsafe.length > 0) {
    const identifiers = unsafe.map((product) => product?.id ?? "(unknown id)").join(", ");
    throw new Error("Production catalogue contains non-approved or placeholder product(s): " + identifiers);
  }
}
