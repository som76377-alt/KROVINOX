"use client";

import { useState } from "react";
import Link from "next/link";
import { usePreviewBag } from "@/components/preview-bag";

export default function AddToPreviewBag({ slug }: { slug: string }) {
  const { addItem } = usePreviewBag();
  const [added, setAdded] = useState(false);
  return <div className="preview-bag-action">
    <button className="button button-primary" type="button" onClick={() => { addItem(slug); setAdded(true); }}>
      Add concept to preview bag <span className="arrow-mark" aria-hidden="true" />
    </button>
    <p className="preview-bag-disclaimer" aria-live="polite">
      {added ? "Added to your preview bag. This is a non-purchasable concept." : "Preview only. No price, checkout, or order is available."}
    </p>
    {added ? <Link className="text-link" href="/bag">View preview bag</Link> : null}
  </div>;
}
