import type { Metadata } from "next";
import ProductGrid from "@/components/product-grid";
import { getCatalogueMode, getCatalogueProducts } from "@/lib/products/catalogue";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore the styles and silhouettes being considered for the first KROVINOX collection.",
  robots: { index: false, follow: false },
};

export default function ShopPage() {
  const isPreview = getCatalogueMode() === "preview";
  const products = getCatalogueProducts();

  return (
    <main id="main-content" className="site-page shop-page">
      <div className="site-container">
        <header className="page-intro">
          <h1 className="page-title">Shop</h1>
          <p className="page-description">
            {isPreview
              ? "A first look at the styles we're considering. These photos are references, not KROVINOX products."
              : "Explore the current KROVINOX collection."}
          </p>
        </header>

        {products.length > 0 ? (
          <ProductGrid products={products} label={isPreview ? "KROVINOX style references" : "KROVINOX products"} />
        ) : (
          <div className="empty-catalogue" role="status">
            <h2>The first collection is on its way.</h2>
            <p>Products will appear here once the designs and details are ready.</p>
          </div>
        )}
      </div>
    </main>
  );
}
