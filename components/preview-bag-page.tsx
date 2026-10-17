"use client";

import Image from "next/image";
import Link from "next/link";
import { apparelReferences } from "@/data/apparel";
import { usePreviewBag } from "@/components/preview-bag";

export default function PreviewBagPage() {
  const { items, count, setQuantity, removeItem } = usePreviewBag();
  const entries = apparelReferences.filter((item) => items[item.slug] > 0);
  return <main id="main-content" className="bag-page">
    <header className="bag-heading">
      <p className="eyebrow">KROVINOX / Preview bag</p>
      <h1>Your saved directions.</h1>
      <p className="text-lead">A place to keep the concepts you want to revisit. These are not finished garments and cannot be purchased.</p>
    </header>
    {entries.length === 0 ? <section className="bag-empty" aria-labelledby="bag-empty-title">
      <p className="eyebrow">Nothing saved yet</p>
      <h2 id="bag-empty-title">Start with a direction.</h2>
      <p>Explore the current apparel concepts and save the ones you want to keep in view.</p>
      <Link className="button button-primary" href="/shop">Explore apparel <span className="arrow-mark" aria-hidden="true" /></Link>
    </section> : <>
      <p className="bag-count-line" aria-live="polite">{count} {count === 1 ? "concept" : "concepts"} saved</p>
      <div className="bag-layout">
        <section className="bag-items" aria-label="Saved concepts">
          {entries.map((item) => <article className="bag-item" key={item.slug}>
            <Link href={`/shop/${item.slug}`} className="bag-item-image">
              <Image src={item.image} alt={item.alt} fill unoptimized sizes="140px" />
            </Link>
            <div className="bag-item-copy">
              <p className="eyebrow">{item.category}</p>
              <h2><Link href={`/shop/${item.slug}`}>{item.name}</Link></h2>
              <p className="bag-item-status">Concept only / Not for sale</p>
              <label className="bag-quantity">Quantity
                <select value={items[item.slug]} onChange={(event) => setQuantity(item.slug, Number(event.target.value))} aria-label={`Quantity of ${item.name}`}>
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => <option value={quantity} key={quantity}>{quantity}</option>)}
                </select>
              </label>
            </div>
            <button className="bag-remove" type="button" onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.name} from preview bag`}>Remove</button>
          </article>)}
        </section>
        <aside className="bag-summary" aria-labelledby="bag-summary-title">
          <p className="eyebrow">Preview status</p>
          <h2 id="bag-summary-title">Not available to order.</h2>
          <p>Pricing, final product details, availability, and fulfilment have not been confirmed. No order or payment can be started from this preview.</p>
          <div className="bag-summary-rule" />
          <div className="bag-summary-row"><span>Price</span><span>Not set</span></div>
          <div className="bag-summary-row"><span>Checkout</span><span>Disabled</span></div>
          <Link className="button button-outline" href="/shop">Continue exploring <span className="arrow-mark" aria-hidden="true" /></Link>
        </aside>
      </div>
    </>}
  </main>;
}
