import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (process.env.KROVINOX_PAYMENT_MODE !== "test" || !keyId?.startsWith("rzp_test_") || !secret) {
    return NextResponse.json({ error: "Sandbox payment verification is not configured. Live mode is unsupported." }, { status: 503 });
  }

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid verification payload." }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid verification payload." }, { status: 400 });
  const item = body as { razorpay_order_id?: unknown; razorpay_payment_id?: unknown; razorpay_signature?: unknown };
  if (typeof item.razorpay_order_id !== "string" || !/^order_[A-Za-z0-9]+$/.test(item.razorpay_order_id) ||
      typeof item.razorpay_payment_id !== "string" || !/^pay_[A-Za-z0-9]+$/.test(item.razorpay_payment_id) ||
      typeof item.razorpay_signature !== "string" || !/^[a-f0-9]{64}$/i.test(item.razorpay_signature)) {
    return NextResponse.json({ error: "Payment verification fields are invalid." }, { status: 400 });
  }

  const expected = createHmac("sha256", secret).update(`${item.razorpay_order_id}|${item.razorpay_payment_id}`).digest();
  const received = Buffer.from(item.razorpay_signature, "hex");
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return NextResponse.json({ error: "Test payment signature verification failed." }, { status: 400 });
  }

  // The signature must be valid and the provider must confirm the test payment belongs to this order.
  // We deliberately do not create an order with the source retailer or trigger any fulfilment.
  try {
    const providerResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(item.razorpay_payment_id)}`, {
      method: "GET",
      headers: { "Authorization": `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}` },
      cache: "no-store",
    });
    if (!providerResponse.ok) {
      return NextResponse.json({ error: "The payment provider could not confirm this sandbox payment." }, { status: 502 });
    }
    const payment = await providerResponse.json() as { id?: string; order_id?: string; status?: string; currency?: string };
    if (payment.id !== item.razorpay_payment_id || payment.order_id !== item.razorpay_order_id ||
        !["authorized", "captured"].includes(payment.status ?? "") || payment.currency !== "INR") {
      return NextResponse.json({ error: "Provider payment details do not match the sandbox order." }, { status: 400 });
    }
    return NextResponse.json({ verified: true, environment: "test", fulfilment: "none", message: "Test payment confirmed; no live charge, retailer order, or goods fulfilment." });
  } catch {
    return NextResponse.json({ error: "The sandbox provider could not confirm the payment. No order was created." }, { status: 502 });
  }
}
