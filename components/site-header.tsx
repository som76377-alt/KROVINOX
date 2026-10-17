"use client";

import Link from "next/link";
import { useState } from "react";
import { usePreviewBag } from "@/components/preview-bag";

const links = [{ href: "/shop", label: "Shop" }, { href: "/about", label: "Approach" }];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = usePreviewBag();
  return <header className="site-header">
    <div className="topline"><span>Independent clothing label</span><span>First release in development</span></div>
    <div className="header-inner">
      <Link href="/" className="wordmark" aria-label="KROVINOX home">KROVINOX<span className="wordmark-dot">.</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        <Link href="/bag" aria-label={`Preview bag, ${count} items`}>Bag <span className="bag-count">{count}</span></Link>
      </nav>
      <Link href="/shop" className="header-action">Explore apparel <span className="arrow-mark" aria-hidden="true" /></Link>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
    </div>
    {menuOpen ? <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
      {links.map((link) => <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
      <Link href="/bag" onClick={() => setMenuOpen(false)}>Preview bag ({count})</Link>
    </nav> : null}
  </header>;
}
