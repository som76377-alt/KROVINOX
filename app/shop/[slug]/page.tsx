import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalogProducts, demoPriceLabel, productBySlug } from "@/data/catalog";
import AddToPreviewBag from "@/components/add-to-preview-bag";

export function generateStaticParams() { return catalogProducts.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  return product ? {
    title: product.name,
    description: `${product.name}: source-attributed fashion reference and design notes.`,
    robots: { index: false, follow: false },
  } : { title: "Reference not found", robots: { index: false, follow: false } };
}

export default async function ReferenceProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  const related = catalogProducts.filter((item) => item.slug !== product.slug && item.audience === product.audience && item.category === product.category).slice(0, 3);
  return <main id="main-content" className="product-page catalog-product-page">
    <div className="product-page-image catalog-product-image">
      <Image src={product.image} alt={product.alt} fill priority unoptimized sizes="(max-width: 760px) 100vw, 55vw" className="product-page-photo" />
      <span className="product-image-note">Original retailer image / reference only</span>
      <a className="source-image-link" href={product.sourceUrl} target="_blank" rel="noreferrer">View source listing ↗</a>
    </div>
    <section className="product-page-copy catalog-product-copy">
      <p className="eyebrow">{product.audience} / {product.category} / {product.sku}</p>
      <h1>{product.name}</h1>
      <p className="product-status">Market reference / Not KROVINOX inventory</p>
      <p className="text-lead">{product.designNote}</p>
      <div className="catalog-price-detail"><strong>{demoPriceLabel(product.priceInr)}</strong><span>Illustrative portfolio price, not an offer to sell</span></div>
      <div className="product-divider" />
      <h2>Material information</h2>
      <p>{product.composition}</p>
      <h2>Visible construction</h2>
      <ul className="construction-list">{product.construction.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      <div className="product-divider" />
      <h2>Design direction</h2>
      <p>{product.designNote} The potential improvement for a future KROVINOX version would be defined in a separate product brief, then checked on physical samples. We do not claim this reference is better than other clothing or that KROVINOX has made it.</p>
      <p className="product-source-note"><strong>Image and details:</strong> {product.retailer}. {product.sourceType === "category" ? "This is a category-level reference; the exact individual product and composition are not confirmed." : "The linked source is the reference for the item shown. Regional pricing, stock, and product details can change."}</p>
      <div className="source-actions"><a className="button button-outline" href={product.sourceUrl} target="_blank" rel="noreferrer">Open original retailer page <span className="arrow-mark" aria-hidden="true" /></a></div>
      <AddToPreviewBag slug={product.slug} />
    </section>
    {related.length ? <section className="related-references"><p className="eyebrow">Related references / {product.category}</p><div className="related-reference-grid">{related.map((item) => <Link href={`/shop/${item.slug}`} key={item.slug}><div className="related-reference-image"><Image src={item.image} alt={item.alt} fill unoptimized sizes="25vw" /></div><span>{item.name}</span></Link>)}</div></section> : null}
  </main>;
}
