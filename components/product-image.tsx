"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  variant?: "card" | "hero" | "detail" | "thumbnail";
};

export default function ProductImage({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 639px) 47vw, (max-width: 1023px) 30vw, 25vw",
  priority = false,
  variant = "card",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const frameClass = "product-image-frame product-image-frame--" + variant;

  return (
    <div className={frameClass}>
      {failed ? (
        <div className="product-image-fallback" role="img" aria-label={alt}>
          <span>Image unavailable</span>
          <small>The concept image could not be loaded.</small>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="product-image-source"
        />
      )}
    </div>
  );
}
