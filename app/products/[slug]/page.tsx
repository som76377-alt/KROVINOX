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

  if (!product) {
    return {
      title: "Concept not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: product.name + " preview",
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

  return (
    <main id="main-content" className="site-page product-detail-page">
      <div className="site-container">
        <Link className="text-link product-back-link" href="/shop">← Back to shop</Link>

        <div className="product-detail-grid">
          <div className="product-detail-media">
            <ProductGallery
              key={product.id}
              images={product.images}
              productName={product.name}
              isDemo={isDemo}
            />
          </div>

          <section className="product-detail-copy" aria-labelledby="product-title">
            <p className="eyebrow">{isDemo ? "FORM STUDY / NOT FOR SALE" : "KROVINOX / PRODUCT PREVIEW"}</p>
            <h1 id="product-title" className="product-detail-title">{product.name}</h1>
            <p className="product-detail-lede">{product.shortDescription}</p>

            {product.lifecycle === "approved" && !isDemo ? (
              <p className="product-detail-price">{formatPricePaise(product.pricePaise)}</p>
            ) : (
              <p className="product-detail-status">Concept fixture · Not for sale</p>
            )}

            {product.description ? <p className="product-detail-description">{product.description}</p> : null}

            <ProductPurchaseOptions product={product} mode={mode} />

            <div className="product-truth-note" role="note">
              <h2>Preview status</h2>
              {isDemo ? (
                <p>
                  This graphic is an interface fixture, not a photograph or prototype of a manufactured garment.
                  Material, fit, measurements, size, price, stock and orderability have not been established.
                </p>
              ) : (
                <p>
                  Checkout is not enabled in this release. No order, payment or fulfilment action can be completed here.
                </p>
              )}
            </div>

            <Link className="button-link" href="/shop">Return to shop <span aria-hidden="true">↗</span></Link>
          </section>
        </div>
      </div>
    </main>
  );
}
