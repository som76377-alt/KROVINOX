import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About KROVINOX",
  description: "The story behind the KROVINOX clothing project.",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="site-page about-page">
      <div className="site-container about-content">
        <h1 className="page-title">About KROVINOX</h1>
        <p className="about-lede">
          We're building a clothing label focused on expressive streetwear and original garment design.
        </p>
        <div className="about-rule" />
        <section aria-labelledby="collection-status">
          <h2 id="collection-status" className="section-title">The first collection is in progress.</h2>
          <p>
            The photos on this site are styling references, not KROVINOX products. Original designs, fit, materials and prices will be shown once they're ready.
          </p>
        </section>
        <Link className="button-link" href="/shop">Browse the styles <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
