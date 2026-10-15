"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export default function SiteFooter() {
  const { itemCount } = useCart();

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
          <Link href="/bag" aria-label={"Bag (" + itemCount + ")"}>Bag ({itemCount})</Link>
          <Link href="/">Home</Link>
        </nav>
      </div>
    </footer>
  );
}
