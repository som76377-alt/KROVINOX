"use client";

import { useRef } from "react";

const previewLinks = [
  { href: "#main-content", label: "Preview overview" },
  { href: "#colors-heading", label: "Color system" },
  { href: "#type-heading", label: "Typography" },
  { href: "#spacing-heading", label: "Spacing scale" },
  { href: "#controls-heading", label: "Controls and focus" },
];

export default function SiteHeader() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function openMenu() {
    dialogRef.current?.showModal();
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <a className="site-wordmark" href="#main-content" aria-label="KROVINOX preview home">
          KROVINOX
        </a>

        <nav className="site-desktop-nav" aria-label="Preview sections">
          {previewLinks.map((link) => (
            <a href={link.href} key={link.href}>{link.label}</a>
          ))}
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
            <span id="site-mobile-menu-title">Preview navigation</span>
            <button className="site-menu-close" type="button" onClick={closeMenu}>
              Close
            </button>
          </div>
          <nav className="site-mobile-nav" aria-label="Mobile preview sections">
            {previewLinks.map((link) => (
              <a href={link.href} key={link.href} onClick={closeMenu}>{link.label}</a>
            ))}
          </nav>
        </dialog>
      </div>
    </header>
  );
}
