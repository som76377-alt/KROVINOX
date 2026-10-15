import type { Metadata } from "next";
import ProductGrid from "@/components/product-grid";
import { getCatalogueMode, getCatalogueProducts } from "@/lib/products/catalogue";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop preview",
  description: "KROVINOX catalogue preview. Illustrative concept studies only; no products are for sale.",
  robots: { index: false, follow: false },
};

export default function ShopPage() {
  const mode = getCatalogueMode();
  const products = getCatalogueProducts();

  return (
    <main id="main-content" className="site-page">
      <div className="site-container">
        <header className="page-intro">
          <p className="eyebrow">KROVINOX / {mode === "preview" ? "DESIGN PREVIEW" : "CATALOGUE"}</p>
          <h1 className="page-title">Shop</h1>
          <p className="page-description">
            {mode === "preview"
              ? "These abstract concept studies are interface fixtures, not manufactured clothing or saleable products."
              : "Only approved catalogue records appear in live mode."}
          </p>
        </header>

        {products.length > 0 ? (
          <ProductGrid products={products} label="KROVINOX catalogue" />
        ) : (
          <div className="empty-catalogue" role="status">
            <h2>The approved collection is not published.</h2>
            <p>Preview fixtures are hidden in live mode. No products can be purchased from this site.</p>
          </div>
        )}
      </div>
    </main>
  );
}
