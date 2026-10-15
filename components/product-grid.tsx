import type { Product } from "@/lib/products/types";
import ProductCard from "@/components/product-card";

type ProductGridProps = {
  products: Product[];
  label: string;
};

export default function ProductGrid({ products, label }: ProductGridProps) {
  return (
    <ul className="product-grid" aria-label={label}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
