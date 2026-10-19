import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About", description: "How KROVINOX approaches garment research and design development." };
export default function AboutPage() {
 return <main id="main-content" className="text-page"><p className="eyebrow">About KROVINOX</p><h1>Study the garment. Then design.</h1><p className="text-lead">KROVINOX is an apparel design portfolio exploring useful silhouettes, deliberate proportions, and details that have a reason to exist.</p><div className="text-rule" />
 <section><h2>Reference and original design</h2><p>The catalog uses clearly credited reference garments to study fit, fabric appearance, panel layout and visible construction. These items are made and sold by their original brands or retailers, not by KROVINOX. The reference gives a starting point, not permission to pass another brand's work off as ours.</p></section>
 <section><h2>How material claims work</h2><p>Fibre composition comes from a linked product specification when available. Images can show colour, drape and surface but cannot reliably identify exact percentages, finishes or performance. Unverified details are labelled as such rather than guessed.</p></section>
 <section><h2>What “better” needs to mean</h2><p>A future KROVINOX product needs a written design brief and physical samples. Claims about durability, comfort, sustainability, breathability or performance should follow evidence such as supplier documentation, construction review, fit testing and appropriate material tests. A reference garment is not proof that our not-yet-made product outperforms it.</p></section>
 <section><h2>Current status</h2><p>This site is a portfolio preview. Price figures are illustrative concept estimates, not product listings or purchase offers. The demo bag does not create retailer orders, and any payment flow is sandbox-only when provider test credentials are configured.</p></section>
 <Link className="button button-primary" href="/shop">Browse the reference catalog <span className="arrow-mark" aria-hidden="true" /></Link></main>;
}
