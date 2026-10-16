import Link from "next/link";
import ProductGrid from "@/components/product-grid";
import ProductImage from "@/components/product-image";
import { getCatalogueMode, getCatalogueProducts } from "@/lib/products/catalogue";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const isPreview = getCatalogueMode() === "preview";
  const products = getCatalogueProducts();
  const leadImage = products[0]?.images[1] ?? products[0]?.images[0];
  const studioImage = products[1]?.images[2] ?? products[1]?.images[1] ?? products[1]?.images[0];

  return (
    <main id="main-content" className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-hero-kicker">
            {isPreview ? "The first KROVINOX collection" : "The KROVINOX collection"}
          </p>
          <h1 id="home-title" className="home-hero-title">Streetwear, reworked.</h1>
          <p className="home-hero-description">
            Oversized proportions, dark layers and utility details set the direction for the first collection.
          </p>
          <div className="home-hero-actions">
            <Link className="button-link button-link--inverse" href="/shop">
              Explore the styles <span aria-hidden="true">→</span>
            </Link>
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
              sizes="(max-width: 759px) 100vw, 58vw"
              priority
              variant="hero"
            />
          ) : (
            <div className="home-empty-visual"><span>No product photos yet.</span></div>
          )}
          {leadImage ? (
            <div className="home-visual-caption">
              <span>{isPreview ? "Styling reference · Not a KROVINOX product" : products[0].name}</span>
            </div>
          ) : null}
        </div>
      </section>

      <section className="home-collection" aria-labelledby="styles-heading">
        <div className="site-container">
          <header className="home-collection-heading">
            <h2 id="styles-heading" className="section-title">
              {isPreview ? "Styles we're exploring" : "Shop the collection"}
            </h2>
            <p>
              {isPreview
                ? "Three styling directions for the original garments we're developing."
                : "Explore the current KROVINOX collection."}
            </p>
          </header>

          {products.length > 0 ? (
            <ProductGrid
              products={products}
              label={isPreview ? "KROVINOX style references" : "KROVINOX products"}
            />
          ) : (
            <div className="empty-catalogue" role="status">
              <h3>The first collection is on its way.</h3>
              <p>Products will appear here once the designs and details are ready.</p>
            </div>
          )}
        </div>
      </section>

      {isPreview && studioImage ? (
        <section className="home-studio-note" aria-labelledby="studio-note-title">
          <div className="site-container home-studio-note-inner">
            <div className="home-studio-note-copy">
              <p className="home-studio-kicker">What comes next</p>
              <h2 id="studio-note-title">Original garments are in development.</h2>
              <p>
                Fit, fabric, measurements and pricing will be published once the designs and samples are confirmed.
              </p>
              <Link className="text-link home-about-link" href="/about">
                About KROVINOX <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="home-studio-visual">
              <ProductImage
                key={studioImage.src}
                src={studioImage.src}
                alt={studioImage.alt}
                width={studioImage.width}
                height={studioImage.height}
                sizes="(max-width: 759px) 88vw, 32vw"
                variant="card"
              />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
