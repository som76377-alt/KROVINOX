import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apparelReferences } from "@/data/apparel";
export function generateStaticParams() { return apparelReferences.map((item)=>({slug:item.slug})); }
export default async function ApparelConceptPage({ params }: { params: Promise<{slug:string}> }) {
 const {slug}=await params;
 const item=apparelReferences.find((product)=>product.slug===slug);
 if(!item) notFound();
 return <main id="main-content" className="product-page"><div className="product-page-image"><Image src={item.image} alt={item.alt} fill priority unoptimized sizes="(max-width: 760px) 100vw, 55vw" className="product-page-photo"/><span className="product-image-note">Editorial reference / Not the final garment</span></div><section className="product-page-copy"><p className="eyebrow">Apparel direction / {item.number}</p><h1>{item.name}</h1><p className="product-status">In development</p><p className="text-lead">{item.description}</p><div className="product-divider"/><h2>Before release</h2><p>Final product photography, fabric information, sizing, measurements, pricing, and availability will be published after the sample is confirmed. This concept is not for sale.</p><Link className="button button-primary" href="/shop">Back to apparel <span aria-hidden="true">↗</span></Link><Link className="text-link product-back-link" href="/about">Read the KROVINOX approach</Link></section></main>;
}
