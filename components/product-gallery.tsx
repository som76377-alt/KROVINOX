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
    return <div className="product-gallery-empty" role="status">No product photos are available yet.</div>;
  }

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const activeImage = images[safeIndex];

  return (
    <section className="product-gallery" aria-label={productName + " photos"}>
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
        {isDemo ? "Reference photo " + (safeIndex + 1) + " of " + images.length : "Photo " + (safeIndex + 1) + " of " + images.length}
      </p>

      {images.length > 1 ? (
        <div className="product-gallery-thumbnails" role="group" aria-label="Choose a photo">
          {images.map((image, index) => (
            <button
              className="product-gallery-thumb"
              key={image.id}
              type="button"
              aria-label={"View photo " + (index + 1)}
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
              <span className="product-gallery-thumb-caption">Photo {index + 1}</span>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
