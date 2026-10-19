"use client";

import Image from "next/image";
import Link from "next/link";
import { apparelReferences } from "@/data/apparel";
import { demoPriceLabel } from "@/data/catalog";
import { usePreviewBag } from "@/components/preview-bag";

export default function PreviewBagPage() {
  const { items, count, setQuantity, removeItem } = usePreviewBag();
  const entries = apparelReferences.filter((item) => items[item.slug] > 0);
  const total = entries.reduce((sum, item) => sum + item.priceInr * (items[item.slug] ?? 0), 0);
  return <main id="main-content" className="bag-page">
    <header className="bag-heading">
      <p className="eyebrow">KROVINOX / Demo bag</p>
      <h1>Your saved references.</h1>
      <p className="text-lead">This bag is for testing the portfolio checkout experience. The displayed items are reference garments from other retailers, not products sold or fulfilled by KROVINOX.</p>
    </header>
    {entries.length === 0 ? <section className="bag-empty" aria-labelledby="bag-empty-title">
      <p className="eyebrow">Nothing saved yet</p>
      <h2 id="bag-empty-title">Start with a reference.</h2>
      <p>Explore garments and read the linked source notes before adding a demo item.</p>
      <Link className="button button-primary" href="/shop">Explore catalog <span className="arrow-mark" aria-hidden="true" /></Link>
    </section> : <>
      <p className="bag-count-line" aria-live="polite">{count} {count === 1 ? "demo item" : "demo items"} saved</p>
      <div className="bag-layout">
        <section className="bag-items" aria-label="Demo bag items">
          {entries.map((item) => <article className="bag-item" key={item.slug}>
            <Link href={`/shop/${item.slug}`} className="bag-item-image"><Image src={item.image} alt={item.alt} fill unoptimized sizes="140px" /></Link>
            <div className="bag-item-copy">
              <p className="eyebrow">{item.audience} / {item.category}</p>
              <h2><Link href={`/shop/${item.slug}`}>{item.name}</Link></h2>
              <p className="bag-item-status">Concept item / Not for sale</p>
              <strong>{demoPriceLabel(item.priceInr)}</strong>
              <label className="bag-quantity">Quantity
                <select value={items[item.slug]} onChange={(event) => setQuantity(item.slug, Number(event.target.value))} aria-label={`Quantity of ${item.name}`}>
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => <option value={quantity} key={quantity}>{quantity}</option>)}
                </select>
              </label>
            </div>
            <button className="bag-remove" type="button" onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.name} from demo bag`}>Remove</button>
          </article>)}
        </section>
        <aside className="bag-summary" aria-labelledby="bag-summary-title">
          <p className="eyebrow">Portfolio test transaction</p>
          <h2 id="bag-summary-title">No real order.</h2>
          <p>Amounts are illustrative. This is not a purchase offer for the source items, and no retailer order or fulfilment will be created. Checkout can only use a sandbox payment account.</p>
          <div className="bag-summary-rule" />
          <div className="bag-summary-row"><span>Demo subtotal</span><strong>{demoPriceLabel(total)}</strong></div>
          <div className="bag-summary-row"><span>Shipping</span><span>Not applicable</span></div>
          <div className="bag-summary-row"><span>Payment mode</span><span>Test only</span></div>
          <Link className="button button-primary" href="/checkout">Continue to sandbox checkout <span className="arrow-mark" aria-hidden="true" /></Link>
          <p className="preview-bag-disclaimer">No live payment keys are accepted by this checkout. No goods will be shipped.</p>
        </aside>
      </div>
    </>}
  </main>;
}
