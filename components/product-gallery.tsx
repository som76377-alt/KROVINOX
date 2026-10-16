"use client";

import { useState } from "react";
import ProductImage from "@/components/product-image";
import type { ProductImage as CatalogueImage } from "@/lib/products/types";

type ProductGalleryProps = {
  images: CatalogueImage[];
  productName: string;
  isDemo: boolean;
};

export default function ProductGallery({ images, productName, isDemo }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="product-gallery-empty" role="status">
        No registered image is available for this catalogue record.
      </div>
    );
  }

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const activeImage = images[safeIndex];

  return (
    <section className="product-gallery" aria-label={productName + " image gallery"}>
      <div className="product-gallery-main">
        <ProductImage
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          width={activeImage.width}
          height={activeImage.height}
          sizes="(max-width: 759px) 100vw, 56vw"
          priority
          variant="detail"
        />
      </div>

      <p className="product-gallery-caption" aria-live="polite">
        {isDemo
          ? `Reference ${safeIndex + 1} of ${images.length} · Third-party fashion imagery; not a KROVINOX product.`
          : `Image ${safeIndex + 1} of ${images.length} · Registered catalogue image.`}
      </p>

      {images.length > 1 ? (
        <div className="product-gallery-thumbnails" role="group" aria-label="Choose reference image">
          {images.map((image, index) => (
            <button
              className="product-gallery-thumb"
              key={image.id}
              type="button"
              aria-label={(isDemo ? "View reference image " : "View product image ") + (index + 1)}
              aria-pressed={index === safeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <ProductImage
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                sizes="84px"
                variant="thumbnail"
              />
              <span className="product-gallery-thumb-caption">
                {isDemo ? "Reference " + (index + 1) : "Image " + (index + 1)}
                {index === safeIndex ? " · Selected" : ""}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
