import Link from "next/link";
import ProductGrid from "@/components/product-grid";
import ProductImage from "@/components/product-image";
import { getCatalogueMode, getCatalogueProducts } from "@/lib/products/catalogue";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const mode = getCatalogueMode();
  const isPreview = mode === "preview";
  const products = getCatalogueProducts();
  const leadImage = products[0]?.images[0];

  return (
    <main id="main-content" className="home-page">
      <div className="site-container">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-copy">
            <p className="eyebrow">KROVINOX / {isPreview ? "DESIGN PREVIEW" : "COLLECTION"}</p>
            <h1 id="home-title" className="home-hero-title">A study in form. A discipline of detail.</h1>
            <p className="home-hero-description">
              {isPreview
                ? "KROVINOX is being developed as a design-led clothing project. These early form studies exercise the visual system only; they are not photographs of manufactured garments."
                : "Explore the published KROVINOX catalogue. Product details are drawn from the approved catalogue; checkout is not enabled in this release."}
            </p>
            <div className="home-hero-actions">
              <Link className="button-link" href="/shop">
                {isPreview ? "Explore concept studies" : "Explore the collection"} <span aria-hidden="true">↗</span>
              </Link>
              <span className="home-hero-note">
                {isPreview ? "No products for sale. No checkout." : "Catalogue view only. Checkout is not enabled."}
              </span>
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
              <div className="home-empty-visual">
                <span className="mono">COLLECTION STATUS / UNPUBLISHED</span>
                <span>No approved product imagery is available.</span>
              </div>
            )}
            <div className="home-visual-caption">
              {isPreview && leadImage ? (
                <>
                  <span>01 / ABSTRACT FORM STUDY</span>
                  <span>Concept graphic · Not product photography</span>
                </>
              ) : leadImage ? (
                <>
                  <span>FEATURED / APPROVED CATALOGUE</span>
                  <span>{products[0].name}</span>
                </>
              ) : (
                <>
                  <span>COLLECTION / UNPUBLISHED</span>
                  <span>No approved product image</span>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="home-studies" aria-labelledby="studies-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">CURRENT WORK / {isPreview ? "LAYOUT FIXTURES" : "APPROVED CATALOGUE"}</p>
              <h2 id="studies-heading" className="section-title">
                {isPreview ? "The concept studies." : "From the collection."}
              </h2>
            </div>
            <Link className="text-link" href="/shop">
              View all <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {products.length > 0 ? (
            <ProductGrid
              products={products}
              label={isPreview ? "KROVINOX concept studies" : "KROVINOX products"}
            />
          ) : (
            <div className="empty-catalogue" role="status">
              <h3>No approved products have been published.</h3>
              <p>Concept fixtures are intentionally hidden in live mode. This page will only show approved catalogue records.</p>
            </div>
          )}
        </section>
      </div>

      <section className="home-direction" aria-labelledby="direction-heading">
        <div className="site-container home-direction-inner">
          <div>
            <p className="eyebrow">DESIGN INTENT / NOT A PRODUCT CLAIM</p>
            <h2 id="direction-heading" className="home-direction-title">Build the interface around the garment—not around noise.</h2>
          </div>
          <div className="home-direction-copy">
            <p>
              The direction is experimental clothing presented through a restrained, editorial interface.
              Product design, fit, materials, pricing, manufacturing and fulfilment details remain unresolved
              until they can be verified.
            </p>
            <Link className="text-link text-link--light" href="/about">
              Read the project note <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
