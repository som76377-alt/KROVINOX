import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product-gallery";
import ProductPurchaseOptions from "@/components/product-purchase-options";
import { formatPricePaise } from "@/lib/products/format-price.mjs";
import { getCatalogueMode, getProductBySlug } from "@/lib/products/catalogue";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Item not found", robots: { index: false, follow: false } };

  return {
    title: product.name,
    description: product.shortDescription,
    robots: { index: false, follow: false },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const mode = getCatalogueMode();
  const isDemo = mode === "preview" && product.lifecycle === "demo";
  const canPurchase = mode === "live" && product.lifecycle === "approved";

  return (
    <main id="main-content" className="site-page product-detail-page">
      <div className="site-container">
        <Link className="text-link product-back-link" href="/shop">← Shop</Link>

        <div className="product-detail-grid">
          <div className="product-detail-media">
            <ProductGallery key={product.id} images={product.images} productName={product.name} isDemo={isDemo} />
          </div>

          <section className="product-detail-copy" aria-labelledby="product-title">
            {isDemo ? <p className="eyebrow">Style reference</p> : null}
            <h1 id="product-title" className="product-detail-title">{product.name}</h1>

            {isDemo ? (
              <div className="product-reference-note" role="note">
                <strong>Reference photos · Not for sale</strong>
                <p>These photos are inspiration, not a KROVINOX product. They show different looks, not multiple views of one garment.</p>
              </div>
            ) : (
              <>
                {product.shortDescription ? <p className="product-detail-lede">{product.shortDescription}</p> : null}
                {product.lifecycle === "approved" && typeof product.pricePaise === "number" ? (
                  <p className="product-detail-price">{formatPricePaise(product.pricePaise)}</p>
                ) : (
                  <p className="product-detail-status">Price not available</p>
                )}
                {product.description ? <p className="product-detail-description">{product.description}</p> : null}
                {canPurchase ? <ProductPurchaseOptions product={product} mode={mode} /> : null}
              </>
            )}

            <Link className="text-link product-more-link" href="/shop">← Back to all styles</Link>
          </section>
        </div>
      </div>
    </main>
  );
}
