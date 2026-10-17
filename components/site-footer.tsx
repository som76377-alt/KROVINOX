import Link from "next/link";
export default function SiteFooter() {
 return <footer className="site-footer"><div className="footer-top"><Link href="/" className="wordmark footer-wordmark">KROVINOX<span className="wordmark-dot">.</span></Link><p>Independent clothing.<br />Developed with intent.</p><Link href="/#apparel" className="footer-cta">Return to apparel <span className="arrow-mark" aria-hidden="true" /></Link></div><div className="footer-bottom"><span>© 2026 KROVINOX</span><nav aria-label="Legal navigation"><Link href="/terms">Terms &amp; Conditions</Link><Link href="/privacy">Privacy Policy</Link><Link href="/about">About</Link></nav><span className="footer-status">Preview, not open for orders</span></div></footer>;
}
