"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { catalogProducts, demoPriceLabel, type Audience, type GarmentCategory } from "@/data/catalog";

const categories: (GarmentCategory | "All pieces")[] = ["All pieces", "T-shirts", "Shirts", "Blazers", "Trousers", "Jackets"];
const audiences: ("Everyone" | Audience)[] = ["Everyone", "Men", "Women"];

export default function ShopBrowser() {
  const [audience, setAudience] = useState<(typeof audiences)[number]>("Everyone");
  const [category, setCategory] = useState<(typeof categories)[number]>("All pieces");
  const visibleProducts = useMemo(() => catalogProducts.filter((product) =>
    (audience === "Everyone" || product.audience === audience) &&
    (category === "All pieces" || product.category === category)
  ), [audience, category]);

  return <div className="shop-browser">
    <div className="shop-filters" aria-label="Filter reference catalog">
      <div className="filter-group" aria-label="Audience">
        {audiences.map((option) => <button key={option} type="button" className={audience === option ? "filter-button is-active" : "filter-button"} aria-pressed={audience === option} onClick={() => setAudience(option)}>{option}</button>)}
      </div>
      <div className="filter-group filter-group--categories" aria-label="Garment category">
        {categories.map((option) => <button key={option} type="button" className={category === option ? "filter-button is-active" : "filter-button"} aria-pressed={category === option} onClick={() => setCategory(option)}>{option}</button>)}
      </div>
      <p className="results-count" aria-live="polite">{visibleProducts.length} reference pieces</p>
    </div>

    {visibleProducts.length === 0 ? <p>No reference pieces match both filters.</p> : <div className="catalog-grid">
      {visibleProducts.map((product, index) => <article className="catalog-item" key={product.sku}>
        <Link href={`/shop/${product.slug}`} className="catalog-image-link" aria-label={`View ${product.name}`}>
          <div className="catalog-image-frame">
            <Image src={product.image} alt={product.alt} fill unoptimized sizes="(max-width: 640px) 47vw, (max-width: 950px) 31vw, 24vw" className="catalog-image" />
            <span className="catalog-index">{String(index + 1).padStart(2, "0")}</span>
          </div>
        </Link>
        <div className="catalog-meta"><span>{product.audience}</span><span>{product.category}</span></div>
        <h2><Link href={`/shop/${product.slug}`}>{product.name}</Link></h2>
        <p className="catalog-color">{product.color}</p>
        <div className="catalog-price-row"><strong>{demoPriceLabel(product.priceInr)}</strong><span>Concept estimate</span></div>
        <Link className="catalog-detail-link" href={`/shop/${product.slug}`}>View reference <span aria-hidden="true">↗</span></Link>
      </article>)}
    </div>}
  </div>;
}
