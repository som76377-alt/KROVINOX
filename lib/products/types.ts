export type ProductLifecycle = "draft" | "demo" | "approved" | "archived";
export type ProductImageRole = "primary" | "gallery" | "detail" | "fit" | "packaging";
export type Availability = "unknown" | "available" | "unavailable" | "made_to_order";

export type ProductImage = {
  id: string;
  src: string;
  alt: string;
  role: ProductImageRole;
  width: number;
  height: number;
  assetRegisterId: string;
};

export type ProductVariant = {
  id: string;
  sku?: string;
  label: string;
  size?: string;
  availability: Availability;
  pricePaise?: number;
  measurements?: Record<string, number | string>;
};

export type Product = {
  id: string;
  slug: string;
  lifecycle: ProductLifecycle;
  name: string;
  shortDescription: string;
  description?: string;
  /** Omit until an approved product has a verified price. Demo records must never use a placeholder amount. */
  pricePaise?: number;
  currency: "INR";
  images: ProductImage[];
  variants: ProductVariant[];
  material?: string;
  fit?: string;
  care?: string;
  countryOfOrigin?: string;
  productionMethod?: string;
  productionLeadTime?: string;
  shippingPolicyId?: string;
  returnPolicyId?: string;
  approvalRecordId?: string;
  isPlaceholder?: boolean;
  demoStatus?: "illustrative" | "layout-test";
};
