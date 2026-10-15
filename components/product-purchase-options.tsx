"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/lib/products/types";
import { useCart } from "@/components/cart/cart-provider";

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
  const [actionMessage, setActionMessage] = useState("");
  const cart = useCart();
  const isDemo = mode === "preview" && product.lifecycle === "demo";
  const isSaleableRecord = mode === "live" && product.lifecycle === "approved";
  const sizedVariants = isSaleableRecord
    ? product.variants.filter((variant) => typeof variant.size === "string" && variant.size.trim() !== "")
    : [];
  const selectedVariant = isDemo
    ? product.variants.find((variant) => variant.id === selectedVariantId)
    : sizedVariants.find((variant) => variant.id === selectedVariantId);

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

  function handleAdd() {
    if (!selectedVariant) {
      setActionMessage(isDemo
        ? "Choose a preview state first."
        : "Choose an available, verified size first.");
      return;
    }
    const result = cart.addItem(product.id, selectedVariant.id);
    setActionMessage(result.message);
  }

  return (
    <section className="product-options" aria-labelledby="product-options-title">
      <h2 id="product-options-title" className="product-options-title">
        {isDemo ? "Demo bag" : "Size & ordering"}
      </h2>

      {isDemo ? (
        <>
          <p className="product-options-note">
            This is a concept fixture. These are interface-test states, not sizes, stock states or orderable options.
          </p>
          <fieldset className="product-size-fieldset">
            <legend>Choose a preview state. This is not a size or availability option.</legend>
            <div className="product-size-options">
              {product.variants.map((variant) => {
                const inputId = "preview-state-" + product.id + "-" + variant.id;
                return (
                  <label className="product-size-option preview-state-option" htmlFor={inputId} key={variant.id}>
                    <input
                      id={inputId}
                      type="radio"
                      name={"preview-state-" + product.id}
                      value={variant.id}
                      checked={selectedVariantId === variant.id}
                      onChange={() => {
                        setSelectedVariantId(variant.id);
                        setActionMessage("");
                      }}
                    />
                    <span className="product-size-option-value">{variant.label}</span>
                    <span className="product-size-option-status">Preview state only</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <p className="product-options-status" role="note">
            No size, stock, price or purchase meaning is attached to the selected state.
          </p>
        </>
      ) : isSaleableRecord && sizedVariants.length > 0 ? (
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
                    onChange={() => {
                      setSelectedVariantId(variant.id);
                      setActionMessage("");
                    }}
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
          {product.lifecycle === "demo"
            ? "Preview states are not sizes or stock states. No approved size, fit or measurement data has been published."
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
        className="sample-button product-add-button"
        type="button"
        disabled={!cart.ready || (isDemo ? !selectedVariant : (!isSaleableRecord || !selectedVariant ||
          (selectedVariant.availability !== "available" && selectedVariant.availability !== "made_to_order")))}
        onClick={handleAdd}
      >
        {isDemo ? "Add concept to demo bag" : "Add to bag"}
      </button>
      <p className="product-options-live-region" role="status" aria-live="polite" aria-atomic="true">
        {actionMessage || (isDemo
          ? "The demo bag stores only this fixture and its preview state. It cannot create an order or payment."
          : "Checkout is not enabled in this release. No order or payment can be accepted.")}
      </p>
    </section>
  );
}
