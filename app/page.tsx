import Image from "next/image";
import Link from "next/link";

const references = [
  { number: "01", category: "Everyday base", name: "The oversized tee", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85", alt: "Cotton T-shirt photographed as a clothing reference" },
  { number: "02", category: "Outer layer", name: "The utility layer", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85", alt: "Structured jacket photographed as a clothing reference" },
  { number: "03", category: "Daily uniform", name: "The wide-leg trouser", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=85", alt: "Denim trousers photographed as a clothing reference" },
];

export default function HomePage() {
  return <main id="main-content">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Independent clothing / First release in development</p>
        <h1 id="hero-title">Utility,<br />cut with intent.</h1>
        <p className="hero-description">KROVINOX is an independent clothing label developing oversized essentials, hard-wearing layers, and considered details for people who want function without looking uniform.</p>
        <div className="hero-actions"><Link className="button button-primary" href="#apparel">Explore the apparel direction <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/about">How we approach clothing</Link></div>
        <p className="hero-note">Photography on this preview is reference material, not KROVINOX product photography.</p>
      </div>
      <div className="hero-image-wrap">
        <Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90" alt="Streetwear styling photographed outdoors as an editorial reference" fill priority unoptimized sizes="(max-width: 640px) 100vw, 52vw" className="hero-image" />
        <div className="image-index"><span>Campaign reference</span><span>Not for sale</span></div>
      </div>
    </section>
    <section className="collection section-wrap" id="apparel" aria-labelledby="collection-title">
      <div className="section-heading"><div><p className="eyebrow">Apparel / Direction 01</p><h2 id="collection-title">A wardrobe with purpose.</h2></div><p className="section-intro">Three starting points for the first clothing release. Final garments, materials, fit, and prices will be shown only after samples are confirmed.</p></div>
      <div className="reference-grid">{references.map((item) => <article className="reference-item" key={item.number}>
        <Link href="/about" className="reference-image-link" aria-label={`Read about the ${item.name} direction`}><div className="reference-image-frame"><Image src={item.image} alt={item.alt} fill unoptimized sizes="(max-width: 640px) 90vw, (max-width: 980px) 45vw, 30vw" className="reference-image" /><span className="image-number">{item.number}</span></div></Link>
        <div className="reference-meta"><span>{item.category}</span><span>Reference only</span></div><h3>{item.name}</h3>
      </article>)}</div>
    </section>
    <section className="design-note" aria-labelledby="design-note-title">
      <div className="design-note-image"><Image src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=85" alt="Clothing displayed in a fashion retail setting as visual reference" fill unoptimized sizes="(max-width: 760px) 100vw, 48vw" className="design-note-photo" /></div>
      <div className="design-note-copy"><p className="eyebrow">Design approach</p><h2 id="design-note-title">Start with the garment. Keep the noise out.</h2><p>We are developing the first pieces around silhouette, wearability, fabric hand-feel, and useful construction. Branding should support the garment, not compete with it.</p><Link className="button button-outline" href="/about">Read the approach <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className="release-band"><div><p className="eyebrow">Before the first release</p><h2>Real samples first.<br />Then the details.</h2></div><p>Measurements, material information, pricing, and purchase options will be published when verified. No placeholder product is offered for sale.</p></section>
  </main>;
}
