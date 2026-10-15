import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <div>
          <Link className="site-wordmark site-footer-wordmark" href="/">KROVINOX</Link>
          <p className="site-footer-note">Design preview · No products for sale · No orders or payment accepted.</p>
        </div>
        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/">Home</Link>
        </nav>
      </div>
    </footer>
  );
}
