import Image from "next/image";
import Link from "next/link";
import { catalogProducts, productBySlug, featuredProducts, demoPriceLabel } from "@/data/catalog";

const hero = productBySlug("mens-beige-100-linen-shirt")!;
const study = productBySlug("mens-indigo-linen-cotton-blazer")!;
const sampleNotes = [
  { title: "Surface and hand-feel", text: "The linked source identifies linen for this shirt. The visible irregular texture is consistent with linen, but a photograph cannot establish fibre composition by itself." },
  { title: "Proportion and line", text: "Compare where the shoulder seam sits, how much room the body has, and where the hem lands. Those are fit decisions, not evidence that one product is universally better." },
  { title: "Construction details", text: "Buttons, pocket placement, cuffs, collars and visible seams give a garment its use and character. We describe only details that can be seen or verified in the linked reference." },
];

export default function HomePage() {
  const selected = featuredProducts.slice(0, 4);
  return <main id="main-content" className="home-editorial">
    <section className="hero hero--catalog" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">KROVINOX / Apparel research and design direction</p>
        <h1 id="hero-title">Look closer.<br />Design with evidence.</h1>
        <p className="hero-description">A fashion portfolio built around real garments, specific reference photography and the construction choices behind the silhouette. The first step is learning what works, then developing original KROVINOX pieces from a clear brief.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/shop">Explore the reference catalog <span className="arrow-mark" aria-hidden="true" /></Link>
          <Link className="text-link" href="#construction-study">See the scroll study</Link>
        </div>
        <p className="hero-note">Reference garments and retailer photography are credited to their source. KROVINOX has not claimed these as manufactured products.</p>
      </div>
      <div className="hero-image-wrap hero-image-wrap--catalog">
        <Image src={hero.image} alt={hero.alt} fill priority unoptimized sizes="(max-width: 640px) 100vw, 54vw" className="hero-image" />
        <div className="hero-image-spec" aria-hidden="true"><span>Ref / M-SH-01</span><span>100% linen stated by source</span></div>
        <div className="image-index"><span>Source: {hero.retailer}</span><a href={hero.sourceUrl} target="_blank" rel="noreferrer">View original listing ↗</a></div>
      </div>
    </section>

    <div className="editorial-caption" aria-label="Catalog notes">
      <div className="editorial-caption-track">
        <div className="editorial-caption-group"><span>01 / Exact image-to-item mapping</span><span>02 / Source-linked material notes</span><span>03 / Proposed design improvements</span><span>04 / Demo checkout only</span></div>
        <div className="editorial-caption-group editorial-caption-group--duplicate" aria-hidden="true"><span>01 / Exact image-to-item mapping</span><span>02 / Source-linked material notes</span><span>03 / Proposed design improvements</span><span>04 / Demo checkout only</span></div>
      </div>
    </div>

    <section id="construction-study" className="construction-study" aria-labelledby="study-title">
      <div className="study-intro">
        <p className="eyebrow">Scroll-controlled image study / 01</p>
        <h2 id="study-title">One garment.<br />A closer read.</h2>
        <p>The photograph below stays tied to one reference item while the crop layers separate and return as you scroll. This is a reversible 2D editorial effect, not a true 3D scan or a claim about hidden internal construction.</p>
        <Link className="text-link" href={`/shop/${hero.slug}`}>Open the exact referenced garment <span className="arrow-mark" aria-hidden="true" /></Link>
      </div>
      <div className="study-scroll-track">
        <div className="study-sticky">
          <div className="study-photo-stack">
            <Image src={hero.image} alt={hero.alt} fill unoptimized sizes="(max-width: 760px) 90vw, 52vw" className="study-photo study-photo--base" />
            <Image src={hero.image} alt="" aria-hidden="true" fill unoptimized sizes="(max-width: 760px) 90vw, 52vw" className="study-photo study-photo--collar" />
            <Image src={hero.image} alt="" aria-hidden="true" fill unoptimized sizes="(max-width: 760px) 90vw, 52vw" className="study-photo study-photo--body" />
            <Image src={hero.image} alt="" aria-hidden="true" fill unoptimized sizes="(max-width: 760px) 90vw, 52vw" className="study-photo study-photo--edge" />
            <span className="study-marker study-marker--one">A / Collar and neck line</span>
            <span className="study-marker study-marker--two">B / Body drape</span>
            <span className="study-marker study-marker--three">C / Sleeve and seam line</span>
            <span className="study-stamp">Same source frame / no invented close-ups</span>
          </div>
          <div className="study-caption"><span>Source image remains constant</span><span>Scroll down to separate / scroll up to return</span></div>
        </div>
      </div>
    </section>

    <section className="design-reasons section-wrap" aria-labelledby="reasons-title">
      <div className="section-heading"><div><p className="eyebrow">How product research becomes design</p><h2 id="reasons-title">Details should earn their place.</h2></div><p className="section-intro">The portfolio explains the design problem each feature could solve. It does not call an unmade garment better or claim performance that has not been tested.</p></div>
      <div className="reason-grid">
        {sampleNotes.map((note, index) => <article className="reason-item" key={note.title}><span className="reason-number">0{index + 1}</span><h3>{note.title}</h3><p>{note.text}</p></article>)}
      </div>
    </section>

    <section className="featured-edit section-wrap" aria-labelledby="featured-title">
      <div className="section-heading"><div><p className="eyebrow">Selected references</p><h2 id="featured-title">Different problems.<br />Different silhouettes.</h2></div><p className="section-intro">Selected model-worn items across casual, tailored and outerwear categories. Each image stays with its own catalog entry and source link.</p></div>
      <div className="featured-grid">
        {selected.map((product, index) => <article className={index === 1 ? "featured-item featured-item--offset" : "featured-item"} key={product.sku}>
          <Link href={`/shop/${product.slug}`} className="featured-image-link"><div className="featured-image-frame"><Image src={product.image} alt={product.alt} fill unoptimized sizes="(max-width: 640px) 88vw, 24vw" className="featured-image" /><span>{product.sku}</span></div></Link>
          <div className="featured-meta"><span>{product.audience} / {product.category}</span><span>{product.color}</span></div>
          <h3><Link href={`/shop/${product.slug}`}>{product.name}</Link></h3>
          <p>{product.designNote}</p>
          <Link className="text-link" href={`/shop/${product.slug}`}>Study this garment <span className="arrow-mark" aria-hidden="true" /></Link>
        </article>)}
      </div>
      <div className="collection-footer"><span>{catalogProducts.length} source-attributed reference entries in this build</span><Link className="text-link" href="/shop">Browse all references <span className="arrow-mark" aria-hidden="true" /></Link></div>
    </section>

    <section className="materials-editorial" aria-labelledby="materials-title">
      <div className="materials-copy"><p className="eyebrow">Materials / source notes</p><h2 id="materials-title">Know what the label says.<br />Know what we can verify.</h2><p>Linen, cotton, lyocell and wool are not interchangeable marketing words. Their feel, drape, care needs and performance differ, but a photo alone cannot tell us exact fibre percentages. The linked product detail is the authority for each source garment; unverified details stay marked as unverified.</p><Link className="button button-outline" href="/shop">See materials and construction notes <span className="arrow-mark" aria-hidden="true" /></Link></div>
      <div className="materials-list">
        <article><span>01</span><div><h3>Linen shirt reference</h3><p>Source title identifies 100% linen. Natural surface variation is visible; composition still comes from the source listing, not visual guesswork.</p></div></article>
        <article><span>02</span><div><h3>Cotton and lyocell jacket reference</h3><p>Source listing describes a cotton/lyocell blend. Exact percentages need to be checked on the live product page.</p></div></article>
        <article><span>03</span><div><h3>Cotton poplin shirt reference</h3><p>Source describes a spun-cotton main fabric and a concealed placket. Any KROVINOX version would need its own final spec and sample checks.</p></div></article>
      </div>
    </section>

    <section className="release-band release-band--catalog" aria-labelledby="release-title">
      <div><p className="eyebrow">Next in the process</p><h2 id="release-title">Research the reference.<br />Then make it ours.</h2></div>
      <p>Original KROVINOX products need approved samples, verified fabric specifications, fit measurements, source photography and real fulfilment details before they can be sold. The current cart and payment flow are portfolio demo only.</p>
      <Link className="button button-primary" href="/shop">Enter the catalog <span className="arrow-mark" aria-hidden="true" /></Link>
    </section>
  </main>;
}
