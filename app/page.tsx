import Image from "next/image";
import Link from "next/link";
import { apparelReferences } from "@/data/apparel";

export default function HomePage() {
  return <main id="main-content">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Independent clothing / First release in development</p>
        <h1 id="hero-title">Utility,<br />cut with intent.</h1>
        <p className="hero-description">KROVINOX is an independent clothing label developing oversized essentials, hard-wearing layers, and considered details for people who want function without looking uniform.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="#apparel">Explore the apparel direction <span className="arrow-mark" aria-hidden="true" /></Link>
          <Link className="text-link" href="/about">How we approach clothing</Link>
        </div>
        <p className="hero-note">Photography on this preview is reference material, not KROVINOX product photography.</p>
      </div>
      <div className="hero-image-wrap">
        <Image src="https://images.unsplash.com/photo-1773848091915-e703753f43ba?auto=format&fit=crop&w=1600&q=90" alt="A young man in a hoodie and trousers photographed outdoors, used as an editorial reference" fill priority unoptimized sizes="(max-width: 640px) 100vw, 52vw" className="hero-image" />
        <div className="image-index"><span>Campaign reference</span><span>Not for sale</span></div>
      </div>
    </section>

    <div className="editorial-caption" aria-label="Current scope">
      <span>01 / Apparel only</span><span>02 / Concepts in development</span><span>03 / No orders accepted</span>
    </div>

    <section className="collection section-wrap reveal-section" id="apparel" aria-labelledby="collection-title">
      <div className="section-heading">
        <div><p className="eyebrow">Apparel / Direction 01</p><h2 id="collection-title">A wardrobe with purpose.</h2></div>
        <p className="section-intro">Three starting points for the first clothing release. Final garments, materials, fit, and prices will be shown only after samples are confirmed.</p>
      </div>
      <div className="reference-grid">{apparelReferences.map((item) => <article className="reference-item" key={item.number}>
        <Link href={`/shop/${item.slug}`} className="reference-image-link" aria-label={`Read about the ${item.name} direction`}>
          <div className="reference-image-frame"><Image src={item.image} alt={item.alt} fill unoptimized sizes="(max-width: 640px) 90vw, (max-width: 980px) 45vw, 30vw" className="reference-image" /><span className="image-number">{item.number}</span></div>
        </Link>
        <div className="reference-meta"><span>{item.category}</span><span>Reference only</span></div>
        <h3>{item.name}</h3>
      </article>)}</div>
      <div className="collection-footer"><span>These are design directions, not finished products.</span><Link className="text-link" href="/shop">View all directions <span className="arrow-mark" aria-hidden="true" /></Link></div>
    </section>

    <section className="brand-principles reveal-section" aria-labelledby="principles-title">
      <div><p className="eyebrow">The point of view</p><h2 id="principles-title">Less noise.<br />More intention.</h2></div>
      <ol className="principle-list">
        <li><span className="principle-number">01</span><div><h3>Proportion before graphics</h3><p>Silhouette and the way a piece sits come before surface decoration.</p></div></li>
        <li><span className="principle-number">02</span><div><h3>Details with a reason</h3><p>Construction choices should make sense for the garment, not exist to look technical.</p></div></li>
        <li><span className="principle-number">03</span><div><h3>Facts before promises</h3><p>Materials, measurements, price, and availability belong here only when they are verified.</p></div></li>
      </ol>
    </section>

    <section className="design-note reveal-section" aria-labelledby="design-note-title">
      <div className="design-note-image"><Image src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=85" alt="Clothing displayed in a fashion retail setting as visual reference" fill unoptimized sizes="(max-width: 760px) 100vw, 48vw" className="design-note-photo" /></div>
      <div className="design-note-copy"><p className="eyebrow">Design approach</p><h2 id="design-note-title">Start with the garment. Keep the noise out.</h2><p>We are developing the first pieces around silhouette, wearability, fabric hand-feel, and useful construction. Branding should support the garment, not compete with it.</p><Link className="button button-outline" href="/about">Read the approach <span className="arrow-mark" aria-hidden="true" /></Link></div>
    </section>

    <section className="release-band reveal-section" aria-labelledby="release-title">
      <div><p className="eyebrow">Before the first release</p><h2 id="release-title">Real samples first.<br />Then the details.</h2></div>
      <p>Measurements, material information, pricing, and purchase options will be published when verified. No placeholder product is offered for sale.</p>
    </section>
  </main>;
}
