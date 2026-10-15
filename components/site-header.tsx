"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useCart } from "@/components/cart/cart-provider";

const navigation = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const bagLabel = "Bag (" + itemCount + ")";

  function openMenu() {
    dialogRef.current?.showModal();
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <header className="site-header">
      <div className="site-announcement" role="note">
        <span>Design preview</span>
        <span>Not for sale · Concept fixtures only</span>
      </div>

      <div className="site-container site-header-inner">
        <Link className="site-wordmark" href="/" aria-label="KROVINOX home">KROVINOX</Link>

        <nav className="site-desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              className={pathname === item.href ? "site-nav-link is-active" : "site-nav-link"}
              href={item.href}
              key={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={pathname === "/bag" ? "site-nav-link is-active site-bag-link" : "site-nav-link site-bag-link"}
            href="/bag"
            aria-current={pathname === "/bag" ? "page" : undefined}
          >
            {bagLabel}
          </Link>
        </nav>

        <span className="site-preview-label">DESIGN PREVIEW · NOT FOR SALE</span>

        <button
          className="site-menu-trigger"
          type="button"
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-controls="site-mobile-menu"
          onClick={openMenu}
        >
          Menu
        </button>

        <dialog
          className="site-mobile-menu"
          id="site-mobile-menu"
          ref={dialogRef}
          aria-labelledby="site-mobile-menu-title"
          onClose={() => triggerRef.current?.focus()}
        >
          <div className="site-mobile-menu-header">
            <span id="site-mobile-menu-title">Navigation</span>
            <button className="site-menu-close" type="button" onClick={closeMenu}>Close</button>
          </div>
          <nav className="site-mobile-nav" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={closeMenu}
                className={pathname === item.href ? "site-nav-link is-active" : "site-nav-link"}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/bag"
              aria-current={pathname === "/bag" ? "page" : undefined}
              onClick={closeMenu}
              className={pathname === "/bag" ? "site-nav-link is-active site-bag-link" : "site-nav-link site-bag-link"}
            >
              {bagLabel}
            </Link>
          </nav>
        </dialog>
      </div>
    </header>
  );
}
