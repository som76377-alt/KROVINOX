import { catalogProducts } from "@/data/catalog";

// Compatibility adapter for existing pages/components while the catalog migration is in progress.
export const apparelReferences = catalogProducts.map((item, index) => ({
  ...item,
  number: String(index + 1).padStart(2, "0"),
  description: `${item.designNote} Composition note: ${item.composition}`,
}));
