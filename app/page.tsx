import Link from "next/link";
import ProductGrid from "@/components/product-grid";
import ProductImage from "@/components/product-image";
import { getCatalogueMode, getCatalogueProducts } from "@/lib/products/catalogue";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const mode = getCatalogueMode();
  const isPreview = mode === "preview";
  const products = getCatalogueProducts();
  const leadImage = products[0]?.images[1] ?? products[0]?.images[0];

  return (
    <main id="main-content" className="home-page">
      <div className="site-container">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-copy">
            <p className="eyebrow">{isPreview ? "First collection in development" : "The KROVINOX collection"}</p>
            <h1 id="home-title" className="home-hero-title">Streetwear, with a point of view.</h1>
            <p className="home-hero-description">
              {isPreview
                ? "We're working on the first KROVINOX pieces. Browse the styles we're exploring; the photos are references, not products for sale."
                : "Explore the current KROVINOX collection."}
            </p>
            <div className="home-hero-actions">
              <Link className="button-link" href="/shop">Browse the styles <span aria-hidden="true">→</span></Link>
              {isPreview ? <span className="home-hero-note">First collection in progress</span> : null}
            </div>
          </div>

          <div className="home-hero-visual">
            {leadImage ? (
              <ProductImage
                key={leadImage.src}
                src={leadImage.src}
                alt={leadImage.alt}
                width={leadImage.width}
                height={leadImage.height}
                sizes="(max-width: 759px) 100vw, 46vw"
                priority
                variant="hero"
              />
            ) : (
              <div className="home-empty-visual"><span>No product photos yet.</span></div>
            )}
            {leadImage ? (
              <div className="home-visual-caption">
                <span>{isPreview ? "Oversized T-shirt styling" : products[0].name}</span>
                {isPreview ? <span>Reference photo</span> : null}
              </div>
            ) : null}
          </div>
        </section>

        <section className="home-studies" aria-labelledby="styles-heading">
          <div className="section-heading-row">
            <h2 id="styles-heading" className="section-title">
              {isPreview ? "Styles we're exploring" : "Shop the collection"}
            </h2>
            <Link className="text-link" href="/shop">See all <span aria-hidden="true">→</span></Link>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} label={isPreview ? "KROVINOX style references" : "KROVINOX products"} />
          ) : (
            <div className="empty-catalogue" role="status">
              <h3>The first collection is on its way.</h3>
              <p>Products will appear here once the designs and details are ready.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
