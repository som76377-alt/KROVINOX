import approvedRecords from "@/data/products.json";
import demoRecords from "@/data/demo-products.json";
import type { Product } from "@/lib/products/types";
import { assertProductionSafe } from "./catalogue-validation.mjs";
import { resolveCatalogueMode } from "./catalogue-mode.mjs";

export function getCatalogueMode(): "preview" | "live" {
  return resolveCatalogueMode(
    process.env.KROVINOX_CATALOGUE_MODE,
    process.env.NODE_ENV,
    process.env.KROVINOX_RELEASE === "true"
  );
}

export function getCatalogueProducts(): Product[] {
  const mode = getCatalogueMode();
  const records = (mode === "preview" ? demoRecords : approvedRecords) as Product[];

  if (mode === "live") {
    assertProductionSafe(records, { mode: process.env.NODE_ENV });
  }

  return records;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getCatalogueProducts().find((product) => product.slug === slug);
}
