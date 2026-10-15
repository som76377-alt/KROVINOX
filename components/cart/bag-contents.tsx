"use client";

import Link from "next/link";
import ProductImage from "@/components/product-image";
import { useCart } from "@/components/cart/cart-provider";
import { formatPricePaise } from "@/lib/products/format-price.mjs";

export default function BagContents() {
  const { mode, lines, itemCount, subtotalPaise, ready, notice, updateQuantity, removeItem } = useCart();
  const isPreview = mode === "preview";

  return (
    <main id="main-content" className="site-page bag-page">
      <div className="site-container">
        <header className="page-intro bag-intro">
          <p className="eyebrow">KROVINOX / {isPreview ? "PREVIEW BAG" : "BAG"}</p>
          <div className="bag-title-row">
            <h1 className="page-title">Bag</h1>
            <span className="bag-count" aria-label={itemCount + " items in bag"}>{itemCount}</span>
          </div>
          <p className="page-description">
            {isPreview
              ? "This temporary demo bag helps test quantity and removal behaviour. It does not reserve products or create an order."
              : "This bag is a local review of approved catalogue items. Checkout is not enabled in this release."}
          </p>
        </header>

        {!ready ? (
          <p className="bag-status" role="status">Loading bag…</p>
        ) : lines.length === 0 ? (
          <section className="bag-empty" aria-labelledby="bag-empty-title">
            <p className="eyebrow">BAG / 00</p>
            <h2 id="bag-empty-title">Your bag is empty.</h2>
            <p>
              {isPreview
                ? "Choose a clearly labelled concept state on a product preview to test this bag. Nothing here is for sale."
                : "No approved items have been added to this bag."}
            </p>
            <Link className="button-link" href="/shop">Continue shopping <span aria-hidden="true">↗</span></Link>
          </section>
        ) : (
          <div className="bag-layout">
            <section className="bag-lines" aria-labelledby="bag-lines-title">
              <h2 id="bag-lines-title" className="bag-section-title">
                {isPreview ? "Concept fixtures" : "Items"} <span>({lines.length} {lines.length === 1 ? "line" : "lines"})</span>
              </h2>
              <ul className="bag-line-list">
                {lines.map((line) => (
                  <li className="bag-line" key={line.key}>
                    <Link className="bag-line-image-link" href={"/products/" + line.slug} aria-label={"View " + line.name}>
                      <ProductImage
                        src={line.imageSrc}
                        alt={line.imageAlt}
                        width={line.imageWidth}
                        height={line.imageHeight}
                        sizes="112px"
                        variant="thumbnail"
                      />
                    </Link>
                    <div className="bag-line-content">
                      <div className="bag-line-header">
                        <div>
                          <p className="bag-line-kicker">{line.isDemo ? "CONCEPT FIXTURE · NOT FOR SALE" : "APPROVED CATALOGUE ITEM"}</p>
                          <h3 className="bag-line-name"><Link href={"/products/" + line.slug}>{line.name}</Link></h3>
                          <p className="bag-line-variant">
                            {line.isDemo
                              ? "Preview state (not a size): " + line.variantLabel
                              : line.size
                                ? "Size: " + line.size
                                : "Variant: " + line.variantLabel}
                          </p>
                        </div>
                        <p className="bag-line-price" aria-label={line.isDemo ? "No approved price" : "Line total"}>
                          {line.unitPricePaise === null
                            ? "No approved price"
                            : formatPricePaise(line.unitPricePaise * line.quantity)}
                        </p>
                      </div>

                      <div className="bag-line-actions">
                        <div className="bag-quantity-control" role="group" aria-label={"Quantity for " + line.name}>
                          <button
                            type="button"
                            className="bag-quantity-button"
                            aria-label={"Decrease quantity of " + line.name}
                            disabled={line.quantity <= 1}
                            onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          >
                            −
                          </button>
                          <output className="bag-quantity-value" aria-label="Quantity">{line.quantity}</output>
                          <button
                            type="button"
                            className="bag-quantity-button"
                            aria-label={"Increase quantity of " + line.name}
                            disabled={line.quantity >= 10}
                            onClick={() => updateQuantity(line.key, line.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="bag-remove-button"
                          type="button"
                          aria-label={"Remove " + line.name + " from bag"}
                          onClick={() => removeItem(line.key)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="bag-summary" aria-labelledby="bag-summary-title">
              <h2 id="bag-summary-title" className="bag-section-title">Summary</h2>
              <div className="bag-summary-row">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="bag-summary-row bag-subtotal-row">
                <span>Subtotal</span>
                <span>{subtotalPaise === null ? "Unavailable" : formatPricePaise(subtotalPaise)}</span>
              </div>
              {subtotalPaise === null ? (
                <p className="bag-summary-note">
                  No approved prices exist for these concept fixtures, so a currency total cannot be calculated.
                </p>
              ) : null}
              <button className="sample-button bag-checkout-button" type="button" disabled>
                Checkout unavailable
              </button>
              <p className="bag-summary-note">
                {isPreview
                  ? "Demo only. This bag does not reserve inventory, accept payment or create an order."
                  : "Checkout integration is not enabled. No order or payment can be accepted."}
              </p>
              <Link className="bag-continue-link" href="/shop">Continue shopping</Link>
            </aside>
          </div>
        )}

        <p className="bag-live-region" role="status" aria-live="polite" aria-atomic="true">
          {notice}
        </p>
      </div>
    </main>
  );
}
