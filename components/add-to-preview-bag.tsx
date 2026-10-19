"use client";

import { useState } from "react";
import Link from "next/link";
import { usePreviewBag } from "@/components/preview-bag";

export default function AddToPreviewBag({ slug }: { slug: string }) {
  const { addItem } = usePreviewBag();
  const [added, setAdded] = useState(false);
  return <div className="preview-bag-action">
    <button className="button button-primary" type="button" onClick={() => { addItem(slug); setAdded(true); }}>
      Add to demo bag <span className="arrow-mark" aria-hidden="true" />
    </button>
    <p className="preview-bag-disclaimer" aria-live="polite">
      {added ? "Saved to the portfolio demo bag. This is not a purchase or an order for the referenced retailer item." : "Demo only. The displayed price is illustrative, and no goods will be supplied."}
    </p>
    {added ? <Link className="text-link" href="/bag">View demo bag</Link> : null}
  </div>;
}
