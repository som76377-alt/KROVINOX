import { NextResponse } from "next/server";
import { catalogProducts } from "@/data/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function testCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const testOnly = process.env.KROVINOX_PAYMENT_MODE === "test" && Boolean(keyId?.startsWith("rzp_test_")) && Boolean(keySecret);
  return testOnly ? { keyId: keyId!, keySecret: keySecret! } : null;
}

export async function POST(request: Request) {
  const credentials = testCredentials();
  if (!credentials) return NextResponse.json({ error: "Sandbox checkout is not configured. Live payment mode is not supported." }, { status: 503 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  if (!body || typeof body !== "object" || !Array.isArray((body as { items?: unknown }).items)) {
    return NextResponse.json({ error: "A list of demo basket items is required." }, { status: 400 });
  }
  const rawItems = (body as { items: unknown[] }).items;
  if (rawItems.length < 1 || rawItems.length > 20) return NextResponse.json({ error: "Choose between 1 and 20 basket lines." }, { status: 400 });

  const lines: { slug: string; quantity: number; priceInr: number; name: string }[] = [];
  for (const raw of rawItems) {
    if (!raw || typeof raw !== "object") return NextResponse.json({ error: "Invalid basket line." }, { status: 400 });
    const { slug, quantity } = raw as { slug?: unknown; quantity?: unknown };
    if (typeof slug !== "string" || !Number.isInteger(quantity) || (quantity as number) < 1 || (quantity as number) > 10) {
      return NextResponse.json({ error: "Each line needs a valid reference slug and quantity from 1 to 10." }, { status: 400 });
    }
    const product = catalogProducts.find((item) => item.slug === slug);
    if (!product) return NextResponse.json({ error: "An item was not found in the server catalog." }, { status: 400 });
    lines.push({ slug: product.slug, quantity: quantity as number, priceInr: product.priceInr, name: product.name });
  }

  const amount = lines.reduce((sum, line) => sum + line.priceInr * line.quantity * 100, 0);
  if (!Number.isSafeInteger(amount) || amount < 100 || amount > 5_000_000) {
    return NextResponse.json({ error: "The demo total is outside the allowed test range." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${credentials.keyId}:${credentials.keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount, currency: "INR", receipt: `kx-demo-${Date.now()}`,
        notes: {
          environment: "test-only",
          purpose: "KROVINOX portfolio demonstration, no real goods or fulfilment",
          slugs: lines.map((line) => line.slug).join(",").slice(0, 250),
        },
      }),
      cache: "no-store",
    });
    const payload = await response.json() as { id?: string; amount?: number; currency?: string; error?: { description?: string } };
    if (!response.ok || !payload.id || payload.amount !== amount || payload.currency !== "INR") {
      return NextResponse.json({ error: "The provider could not create a test order. No payment was attempted." }, { status: 502 });
    }
    return NextResponse.json({ id: payload.id, amount: payload.amount, currency: payload.currency, keyId: credentials.keyId });
  } catch {
    return NextResponse.json({ error: "The sandbox provider could not be reached. No payment was attempted." }, { status: 502 });
  }
}
