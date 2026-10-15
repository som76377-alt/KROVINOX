const colorTokens = [
  { name: "Canvas", value: "#F4F2ED", variable: "--color-canvas" },
  { name: "Ink", value: "#0C0D0C", variable: "--color-ink" },
  { name: "Secondary text", value: "#6C6D69", variable: "--color-text-secondary" },
  { name: "Decorative border", value: "#D8D5CD", variable: "--color-border" },
  { name: "Muted metallic", value: "#A5A7A3", variable: "--color-muted-metallic" },
];

const spacingTokens = [
  { name: "kx-1", value: "0.25rem", width: "0.25rem" },
  { name: "kx-2", value: "0.5rem", width: "0.5rem" },
  { name: "kx-3", value: "0.75rem", width: "0.75rem" },
  { name: "kx-4", value: "1rem", width: "1rem" },
  { name: "kx-5", value: "1.25rem", width: "1.25rem" },
  { name: "kx-6", value: "1.5rem", width: "1.5rem" },
  { name: "kx-7", value: "1.75rem", width: "1.75rem" },
  { name: "kx-8", value: "2rem", width: "2rem" },
  { name: "kx-9", value: "2.5rem", width: "2.5rem" },
  { name: "kx-10", value: "3rem", width: "3rem" },
  { name: "kx-11", value: "4rem", width: "4rem" },
  { name: "kx-12", value: "5rem", width: "5rem" },
];

export default function FoundationPreviewPage() {
  return (
    <>
      <main id="main-content" className="preview-page">
          <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">Phase 1 · Design foundations</p>
          <h1 id="page-title" className="hero-title">Quiet by design. Precise by default.</h1>
          <p className="hero-copy">
            This is an internal design-system specimen, not a storefront. It makes the
            current color, typography, spacing and interaction foundations inspectable
            before shopping features are introduced. No products, bag, payment or order
            flow exists on this page.
          </p>
        </section>

        <div className="preview-grid">
          <section className="preview-section" aria-labelledby="colors-heading">
            <h2 id="colors-heading" className="section-title">01 / Color system</h2>
            <p className="section-copy">Semantic names explain intended use. Decorative borders are not approved for text or essential control boundaries.</p>
            <div className="swatch-grid">
              {colorTokens.map((token) => (
                <div className="swatch" key={token.variable}>
                  <div className="swatch-chip" style={{ backgroundColor: token.value }} />
                  <div className="swatch-label">
                    <strong>{token.name}</strong>
                    <span>{token.value}</span>
                  </div>
                </div>
              ))}
              <div className="swatch">
                <div className="swatch-chip" style={{ backgroundColor: "#0C0D0C", color: "#F4F2ED", display: "grid", placeItems: "center" }}>Aa</div>
                <div className="swatch-label">
                  <strong>Dark surface text</strong>
                  <span>#F4F2ED on #0C0D0C</span>
                </div>
              </div>
            </div>
          </section>

          <section className="preview-section" aria-labelledby="type-heading">
            <h2 id="type-heading" className="section-title">02 / Type system</h2>
            <div className="type-specimen">
              <div className="type-row">
                <span className="type-label mono">Hero · Manrope · fluid</span>
                <p className="type-hero-sample">Form follows intent.</p>
              </div>
              <div className="type-row">
                <span className="type-label mono">Heading 2 · responsive</span>
                <p className="type-h2-sample">Designed to be understood.</p>
              </div>
              <div className="type-row">
                <span className="type-label mono">Heading 3</span>
                <p className="type-h3-sample">Product details without noise</p>
              </div>
              <div className="type-row">
                <span className="type-label mono">Body · 16px / 1.5</span>
                <p className="type-body-sample">The interface gives the product room to speak, but keeps practical information easy to find and read.</p>
              </div>
              <div className="type-row">
                <span className="type-label mono">Metadata · IBM Plex Mono</span>
                <p className="type-meta-sample">SKU / MATERIAL / DETAIL</p>
              </div>
            </div>
          </section>

          <section className="preview-section" aria-labelledby="spacing-heading">
            <h2 id="spacing-heading" className="section-title">03 / Spacing scale</h2>
            <p className="section-copy">A compact 4px-rooted scale supports consistent rhythm instead of one-off spacing guesses.</p>
            <div className="token-list">
              {spacingTokens.map((token) => (
                <div className="token-line" key={token.name}>
                  <span className="mono">{token.name}</span>
                  <div className="token-demo">
                    <span className="spacing-bar" style={{ width: token.width }} />
                    <span className="mono">{token.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="preview-section" aria-labelledby="controls-heading">
            <h2 id="controls-heading" className="section-title">04 / Controls and focus</h2>
            <p className="section-copy">Essential control boundaries use a stronger token than the quiet decorative border. Keyboard focus must remain clearly visible.</p>
            <div className="control-demo">
              <div>
                <label className="control-label" htmlFor="sample-reference">Read-only reference</label>
                <input className="sample-input" id="sample-reference" value="KX-FOUNDATION-01" readOnly />
              </div>
              <div>
                <span className="control-label">Unavailable action sample</span>
                <button className="sample-button" id="sample-disabled" type="button" disabled>Checkout is not available</button>
              </div>
              <p className="section-copy">Reduced-motion preferences are respected. Interactive controls are not represented as active shopping functionality in this preview.</p>
            </div>
          </section>
        </div>

      </main>
    </>
  );
}
