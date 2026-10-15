import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="site-page not-found-page">
      <div className="site-container not-found-content">
        <p className="eyebrow">404 / NOT FOUND</p>
        <h1 className="page-title">This page does not exist.</h1>
        <p className="page-description">The address may be wrong, or this item is not part of the current catalogue mode.</p>
        <div className="not-found-actions">
          <Link className="button-link" href="/shop">Go to shop <span aria-hidden="true">↗</span></Link>
          <Link className="text-link" href="/">Return home</Link>
        </div>
      </div>
    </main>
  );
}
