import type { Metadata } from "next";
import ShopBrowser from "@/components/shop-browser";

export const metadata: Metadata = {
  title: "Shop / Reference Catalog",
  description: "A curated fashion-reference catalog documenting silhouettes, materials and garment construction for the KROVINOX portfolio concept.",
  robots: { index: false, follow: false },
};

export default function ShopPage() {
  return <main id="main-content" className="shop-page catalog-page">
    <header className="shop-heading catalog-intro">
      <p className="eyebrow">KROVINOX / Reference catalog</p>
      <h1>Study the garment.</h1>
      <p className="text-lead">Browse selected garments photographed by their original retailers. Each card links to the source used for that specific reference. This is a portfolio concept, not an inventory of products manufactured or fulfilled by KROVINOX.</p>
      <div className="catalog-truth"><span className="truth-mark" aria-hidden="true"></span><p>Prices shown are illustrative KROVINOX concept estimates. They are not the retailer's price, a live offer, or an offer to sell the referenced garment. Material details are only stated where the linked source supports them. No real order or live payment is available.</p></div>
    </header>
    <ShopBrowser />
  </main>;
}
