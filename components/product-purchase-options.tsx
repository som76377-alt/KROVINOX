"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/lib/products/types";

type ProductPurchaseOptionsProps = {
  product: Product;
  mode: "preview" | "live";
};

function availabilityLabel(availability: ProductVariant["availability"]): string {
  switch (availability) {
    case "available":
      return "Available";
    case "unavailable":
      return "Unavailable";
    case "made_to_order":
      return "Made to order";
    default:
      return "Availability unconfirmed";
  }
}

export default function ProductPurchaseOptions({ product, mode }: ProductPurchaseOptionsProps) {
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const isSaleableRecord = mode === "live" && product.lifecycle === "approved";
  const isDemo = product.lifecycle === "demo";
  const sizedVariants = product.variants.filter((variant) => typeof variant.size === "string" && variant.size.trim() !== "");
  const selectedVariant = sizedVariants.find((variant) => variant.id === selectedVariantId);

  const measuredVariants = isSaleableRecord
    ? product.variants.filter((variant) =>
        typeof variant.size === "string" &&
        variant.size.trim() !== "" &&
        variant.measurements !== undefined &&
        Object.keys(variant.measurements).length > 0
      )
    : [];
  const measurementLabels = Array.from(
    new Set(measuredVariants.flatMap((variant) => Object.keys(variant.measurements ?? {})))
  );

  return (
    <section className="product-options" aria-labelledby="product-options-title">
      <h2 id="product-options-title" className="product-options-title">Size & ordering</h2>

      {isSaleableRecord && sizedVariants.length > 0 ? (
        <fieldset className="product-size-fieldset">
          <legend>Choose a size. No size is preselected.</legend>
          <div className="product-size-options">
            {sizedVariants.map((variant) => {
              const canSelect = variant.availability === "available" || variant.availability === "made_to_order";
              const inputId = "size-" + product.id + "-" + variant.id;

              return (
                <label
                  className={canSelect ? "product-size-option" : "product-size-option is-unavailable"}
                  htmlFor={inputId}
                  key={variant.id}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name={"size-" + product.id}
                    value={variant.id}
                    checked={selectedVariantId === variant.id}
                    disabled={!canSelect}
                    onChange={() => setSelectedVariantId(variant.id)}
                  />
                  <span className="product-size-option-value">{variant.size}</span>
                  <span className="product-size-option-status">{availabilityLabel(variant.availability)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <p className="product-options-note">
          {isDemo
            ? "This is a concept fixture. No approved sizes, fit details or measurements have been published."
            : "No verified size options are available for this catalogue record."}
        </p>
      )}

      {isSaleableRecord && sizedVariants.length > 0 ? (
        <p className="product-options-status" role="status" aria-live="polite">
          {selectedVariant
            ? "Selected size " + selectedVariant.size + ". Checkout is not enabled in this release."
            : "No size is selected. Choose an available size to review its state."}
        </p>
      ) : null}

      <details className="product-size-guide">
        <summary>Size guide & measurements</summary>
        {measuredVariants.length > 0 ? (
          <div className="product-measurement-table-wrap">
            <table className="product-measurement-table">
              <caption>Measurements published for {product.name}</caption>
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  {measurementLabels.map((label) => <th scope="col" key={label}>{label}</th>)}
                </tr>
              </thead>
              <tbody>
                {measuredVariants.map((variant) => (
                  <tr key={variant.id}>
                    <th scope="row">{variant.size}</th>
                    {measurementLabels.map((label) => (
                      <td key={label}>{String(variant.measurements?.[label] ?? "—")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="product-options-note">
            No verified garment measurements have been published. Do not use this preview as size guidance.
          </p>
        )}
      </details>

      <button
        className="sample-button product-purchase-disabled"
        type="button"
        disabled
        aria-describedby="product-purchase-unavailable-note"
      >
        {isDemo ? "Purchase unavailable — not for sale" : "Add to bag — unavailable in this build"}
      </button>
      <p id="product-purchase-unavailable-note" className="product-purchase-unavailable-note">
        {isDemo
          ? "This concept fixture cannot be purchased. No order or payment can be accepted."
          : "The bag and checkout workflow has not been implemented. No order or payment can be accepted."}
      </p>
    </section>
  );
}
