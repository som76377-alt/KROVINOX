"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

type SiteFooterProps = { previewMode: boolean };

export default function SiteFooter({ previewMode }: SiteFooterProps) {
  const { itemCount } = useCart();

  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <div>
          <Link className="site-wordmark site-footer-wordmark" href="/">KROVINOX</Link>
        </div>
        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          {!previewMode ? <Link href="/bag" aria-label={"Bag (" + itemCount + ")"}>Bag ({itemCount})</Link> : null}
        </nav>
      </div>
    </footer>
  );
}
