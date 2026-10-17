import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apparelReferences } from "@/data/apparel";
import AddToPreviewBag from "@/components/add-to-preview-bag";

export function generateStaticParams() { return apparelReferences.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = apparelReferences.find((product) => product.slug === slug);
  return item ? { title: item.name, description: item.description, robots: { index: false, follow: false } } : { title: "Concept not found" };
}
export default async function ApparelConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = apparelReferences.find((product) => product.slug === slug);
  if (!item) notFound();
  return <main id="main-content" className="product-page">
    <div className="product-page-image">
      <Image src={item.image} alt={item.alt} fill priority unoptimized sizes="(max-width: 760px) 100vw, 55vw" className="product-page-photo" />
      <span className="product-image-note">Editorial reference / Not the final garment</span>
    </div>
    <section className="product-page-copy">
      <p className="eyebrow">Apparel direction / {item.number}</p>
      <h1>{item.name}</h1>
      <p className="product-status">Concept in development</p>
      <p className="text-lead">{item.description}</p>
      <div className="product-divider" />
      <h2>What is confirmed?</h2>
      <p>The direction is being explored. A finished garment, final fit, fabric specification, measurements, price, stock, and delivery details are not confirmed yet.</p>
      <AddToPreviewBag slug={item.slug} />
      <div className="product-divider" />
      <h2>Reference, not representation</h2>
      <p>This editorial photograph communicates a broad clothing direction only. It is not a KROVINOX product image and does not represent a final design, construction, material, or fit.</p>
      <Link className="text-link product-back-link" href="/shop">Back to all apparel directions</Link>
    </section>
  </main>;
}
