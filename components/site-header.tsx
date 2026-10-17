"use client";
import Link from "next/link";
import { useState } from "react";
const links = [{ href: "/#apparel", label: "Apparel" }, { href: "/about", label: "Approach" }];
export default function SiteHeader() {
 const [menuOpen, setMenuOpen] = useState(false);
 return <header className="site-header"><div className="topline"><span>Independent clothing label</span><span>First release in development</span></div><div className="header-inner"><Link href="/" className="wordmark" aria-label="KROVINOX home">KROVINOX<span className="wordmark-dot">.</span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav><Link href="/#apparel" className="header-action">Explore apparel <span aria-hidden="true">↗</span></Link><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button></div>{menuOpen ? <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{links.map((link) => <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}</nav> : null}</header>;
}
