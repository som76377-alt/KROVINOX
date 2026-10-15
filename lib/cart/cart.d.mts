export type CartMode = "preview" | "live";

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  variantId: string;
  variantLabel: string;
  size: string | null;
  quantity: number;
  unitPricePaise: number | null;
  currency: "INR";
  mode: CartMode;
  isDemo: boolean;
};

export declare const CART_SCHEMA_VERSION: 1;
export declare const CART_MAX_QUANTITY: 10;
export declare const CART_MAX_LINES: 50;

export declare function createCartLine(
  product: import("../products/types").Product,
  variant: import("../products/types").ProductVariant,
  mode: CartMode
): CartLine;
export declare function addCartLine(lines: CartLine[], line: CartLine): CartLine[];
export declare function updateCartQuantity(lines: CartLine[], key: string, quantity: number): CartLine[];
export declare function removeCartLine(lines: CartLine[], key: string): CartLine[];
export declare function getCartCount(lines: CartLine[]): number;
export declare function calculateSubtotalPaise(lines: CartLine[]): number | null;
export declare function serializeCart(
  lines: CartLine[],
  mode: CartMode
): {
  version: 1;
  mode: CartMode;
  lines: Array<{ productId: string; variantId: string; quantity: number }>;
};
export declare function normalizeCart(
  snapshot: unknown,
  mode: CartMode,
  products: import("../products/types").Product[]
): CartLine[];
