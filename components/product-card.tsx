import Link from "next/link";
import type { Product } from "@/lib/products/types";
import ProductImage from "@/components/product-image";
import { formatPricePaise } from "@/lib/products/format-price.mjs";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  const isDemo = product.lifecycle === "demo";

  return (
    <li className="product-grid-item">
      <article className="product-card">
        <Link className="product-card-link" href={"/products/" + product.slug} aria-label={"View " + product.name}>
          <div className="product-card-media">
            <ProductImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              variant="card"
            />
          </div>
          <div className="product-card-copy">
            <h3 className="product-card-title">{product.name}</h3>
            {isDemo ? (
              <p className="product-card-status">Style reference</p>
            ) : typeof product.pricePaise === "number" ? (
              <p className="product-card-price">{formatPricePaise(product.pricePaise)}</p>
            ) : (
              <p className="product-card-status">Price not available</p>
            )}
          </div>
        </Link>
      </article>
    </li>
  );
}
