"use client";

import Script from "next/script";
import { useState } from "react";
import Link from "next/link";
import { usePreviewBag } from "@/components/preview-bag";
import { apparelReferences } from "@/data/apparel";
import { demoPriceLabel } from "@/data/catalog";

type CreateOrderReply = { id: string; amount: number; currency: string } | { error: string };
type VerifyReply = { verified: true } | { error: string; verified?: false };
type RazorpaySuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayOptions = {
  key: string; amount: number; currency: string; name: string; description: string; order_id: string;
  handler: (response: RazorpaySuccess) => void | Promise<void>;
  modal: { ondismiss: () => void };
  theme: { color: string };
};
declare global { interface Window { Razorpay?: new (options: RazorpayOptions) => { open: () => void } } }

export default function CheckoutExperience({ keyId }: { keyId: string | null }) {
  const { items, count } = usePreviewBag();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const entryMap = new Map(apparelReferences.map((item) => [item.slug, item]));
  const entries = Object.entries(items).map(([slug, quantity]) => ({ product: entryMap.get(slug), quantity })).filter((item) => item.product && item.quantity > 0);
  const total = entries.reduce((sum, item) => sum + (item.product?.priceInr ?? 0) * item.quantity, 0);

  async function startTestPayment() {
    if (!keyId || !scriptLoaded || count === 0 || busy) return;
    setBusy(true); setMessage(""); setVerified(false);
    try {
      const orderResponse = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: entries.map(({ product, quantity }) => ({ slug: product!.slug, quantity })) }),
      });
      const order = await orderResponse.json() as CreateOrderReply;
      if (!orderResponse.ok || !("id" in order)) throw new Error("error" in order ? order.error : "Unable to create a sandbox order.");
      if (!window.Razorpay) throw new Error("The provider checkout script did not load. No payment was attempted.");
      const checkout = new window.Razorpay({
        key: keyId, amount: order.amount, currency: order.currency,
        name: "KROVINOX Portfolio Demo",
        description: "Sandbox transaction only. No goods will be supplied.",
        order_id: order.id, theme: { color: "#14251F" },
        modal: { ondismiss: () => { setBusy(false); setMessage("Checkout closed. No test payment was confirmed."); } },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/checkout/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const result = await verifyResponse.json() as VerifyReply;
            if (!verifyResponse.ok || result.verified !== true) throw new Error("The test payment signature could not be verified.");
            setVerified(true); setMessage("Test payment verified. No real money was charged and no goods will be fulfilled.");
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Test payment verification failed.");
          } finally { setBusy(false); }
        },
      });
      checkout.open();
      setMessage("Sandbox checkout opened. Use only provider-issued test credentials and test card details.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sandbox checkout could not start.");
      setBusy(false);
    }
  }

  return <section className="checkout-workspace" aria-labelledby="checkout-review-title">
    {keyId ? <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" onLoad={() => setScriptLoaded(true)} onError={() => setMessage("Checkout script failed to load. No payment was attempted.")} /> : null}
    <div className="checkout-review">
      <p className="eyebrow">Review / test order</p>
      <h2 id="checkout-review-title">Your test basket</h2>
      {entries.length === 0 ? <p>Your demo bag is empty. Add a reference item first.</p> : <div className="checkout-line-items">{entries.map(({ product, quantity }) => product ? <div className="checkout-line" key={product.slug}><span>{product.name} <small>× {quantity}</small></span><strong>{demoPriceLabel(product.priceInr * quantity)}</strong></div> : null)}</div>}
      <div className="checkout-total"><span>Illustrative total</span><strong>{demoPriceLabel(total)}</strong></div>
      <Link href="/bag" className="text-link">Return to demo bag</Link>
    </div>
    <div className="checkout-provider">
      <p className="eyebrow">Payment provider</p>
      <h2>Hosted card checkout</h2>
      <p>The payment form is rendered by Razorpay Checkout. KROVINOX does not store or read card numbers, expiry dates or security codes.</p>
      <ul className="checkout-points"><li>Provider-handled card form</li><li>Server-calculated amount</li><li>Server-side signature verification</li><li>Test keys only, live keys are rejected</li></ul>
      {!keyId ? <div className="checkout-not-ready"><strong>Sandbox credentials not configured</strong><p>The pay action stays disabled until the server has a Razorpay test key ID and secret, and <code>KROVINOX_PAYMENT_MODE=test</code>. This is intentional; there is no pretend success button.</p></div> : null}
      <button className="button button-primary checkout-pay-button" type="button" disabled={!keyId || !scriptLoaded || entries.length === 0 || busy || verified} onClick={startTestPayment}>{busy ? "Opening test checkout..." : verified ? "Test payment verified" : "Open sandbox card checkout"} <span className="arrow-mark" aria-hidden="true" /></button>
      {message ? <p className={verified ? "checkout-result checkout-result--ok" : "checkout-result"} role="status">{message}</p> : null}
    </div>
  </section>;
}
