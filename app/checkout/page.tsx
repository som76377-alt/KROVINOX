import type { Metadata } from "next";
import CheckoutExperience from "@/components/test-checkout";

export const metadata: Metadata = {
  title: "Sandbox Checkout",
  description: "Portfolio test checkout. No products are sold and no real money is accepted.",
  robots: { index: false, follow: false },
};

function isTestCheckoutReady() {
  return process.env.KROVINOX_PAYMENT_MODE === "test" &&
    Boolean(process.env.RAZORPAY_KEY_SECRET) &&
    Boolean(process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_"));
}

export default function CheckoutPage() {
  const ready = isTestCheckoutReady();
  return <main id="main-content" className="checkout-page">
    <header className="checkout-heading">
      <p className="eyebrow">KROVINOX / Test environment</p>
      <h1>Sandbox checkout.</h1>
      <p className="text-lead">A real hosted checkout interface connected to a payment provider&apos;s test environment, when test credentials are configured. It cannot make a live charge and does not place an order with any retailer.</p>
    </header>
    <div className="checkout-safety-note"><strong>Portfolio demonstration only.</strong><p>The basket contains sourced fashion references and illustrative prices. No garment is being sold by KROVINOX, no shipping is arranged, and no real order is created. Never enter a real payment card in a test demo.</p></div>
    <CheckoutExperience keyId={ready ? process.env.RAZORPAY_KEY_ID! : null} />
  </main>;
}
