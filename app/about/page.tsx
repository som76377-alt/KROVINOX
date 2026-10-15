import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About KROVINOX",
  description: "The current design direction and status of the KROVINOX project preview.",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="site-page about-page">
      <div className="site-container about-content">
        <p className="eyebrow">KROVINOX / PROJECT NOTE</p>
        <h1 className="page-title">About KROVINOX</h1>
        <p className="about-lede">
          KROVINOX is being developed as an experimental, design-led clothing project.
          The interface is being built before final garments are approved.
        </p>
        <div className="about-rule" />
        <section aria-labelledby="what-is-known">
          <h2 id="what-is-known" className="section-title">What this preview represents</h2>
          <p>
            The visual system, navigation and catalogue structure are under implementation. The abstract images
            in this preview are original layout fixtures; they do not represent manufactured garments, approved
            artwork, materials or production methods.
          </p>
        </section>
        <section aria-labelledby="what-is-not-known">
          <h2 id="what-is-not-known" className="section-title">What remains unconfirmed</h2>
          <p>
            Final designs, sizes, garment measurements, material composition, manufacturing partners, prices,
            availability, shipping, returns and commercial launch details will be shown only after they are verified.
          </p>
        </section>
        <Link className="button-link" href="/shop">Explore concept studies <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
