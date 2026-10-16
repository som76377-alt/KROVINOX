import type { Metadata } from "next";
import Link from "next/link";
import BagContents from "@/components/cart/bag-contents";
import { getCatalogueMode } from "@/lib/products/catalogue";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bag",
  description: "The KROVINOX shopping bag will be available when the first collection launches.",
  robots: { index: false, follow: false },
};

export default function BagPage() {
  if (getCatalogueMode() === "preview") {
    return (
      <main id="main-content" className="site-page bag-page">
        <div className="site-container">
          <header className="page-intro">
            <h1 className="page-title">Shopping bag</h1>
            <p className="page-description">The shopping bag will be available when the first collection launches. Nothing in this preview is for sale.</p>
          </header>
          <Link className="button-link" href="/shop">Browse the styles <span aria-hidden="true">→</span></Link>
        </div>
      </main>
    );
  }

  return <BagContents />;
}
