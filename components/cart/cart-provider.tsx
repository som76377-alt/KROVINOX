"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products/types";
import {
  addCartLine,
  calculateSubtotalPaise,
  createCartLine,
  getCartCount,
  normalizeCart,
  removeCartLine,
  serializeCart,
  updateCartQuantity,
  type CartLine,
  type CartMode,
} from "@/lib/cart/cart.mjs";

type CartActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

type CartContextValue = {
  mode: CartMode;
  lines: CartLine[];
  itemCount: number;
  subtotalPaise: number | null;
  ready: boolean;
  notice: string;
  addItem: (productId: string, variantId: string) => CartActionResult;
  updateQuantity: (key: string, quantity: number) => CartActionResult;
  removeItem: (key: string) => CartActionResult;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function storageKey(mode: CartMode): string {
  return "krovinox:bag:" + mode + ":v1";
}

export function CartProvider({
  mode,
  products,
  children,
}: {
  mode: CartMode;
  products: Product[];
  children: ReactNode;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loadedMode, setLoadedMode] = useState<CartMode | null>(null);
  const [notice, setNotice] = useState("");
  const linesRef = useRef<CartLine[]>([]);
  const ready = loadedMode === mode;

  useEffect(() => {
    let saved: unknown = null;

    try {
      const serialized = window.localStorage.getItem(storageKey(mode));
      saved = serialized ? JSON.parse(serialized) : null;
    } catch {
      // Malformed or blocked browser storage is treated as an empty bag.
      saved = null;
    }

    const normalized = normalizeCart(saved, mode, products);
    linesRef.current = normalized;
    setLines(normalized);
    setLoadedMode(mode);
  }, [mode, products]);

  useEffect(() => {
    if (loadedMode !== mode) return;

    try {
      window.localStorage.setItem(storageKey(mode), JSON.stringify(serializeCart(lines, mode)));
    } catch {
      setNotice("This browser could not save the bag. Items may not persist after leaving this page.");
    }
  }, [lines, loadedMode, mode]);

  function addItem(productId: string, variantId: string): CartActionResult {
    if (!ready) return { ok: false, message: "The bag is still loading. Try again in a moment." };

    try {
      const product = products.find((item) => item.id === productId);
      const variant = product?.variants.find((item) => item.id === variantId);
      if (!product || !variant) throw new Error("That product option is no longer available in this catalogue.");

      const line = createCartLine(product, variant, mode);
      const next = addCartLine(linesRef.current, line);
      linesRef.current = next;
      setLines(next);
      const message = mode === "preview"
        ? "Added " + product.name + " to your demo bag. This concept is not for sale."
        : "Added " + product.name + " to your bag. Checkout is not enabled in this release.";
      setNotice(message);
      return { ok: true, message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "The item could not be added.";
      setNotice(message);
      return { ok: false, message };
    }
  }

  function updateQuantity(key: string, quantity: number): CartActionResult {
    if (!ready) return { ok: false, message: "The bag is still loading. Try again in a moment." };

    try {
      const next = updateCartQuantity(linesRef.current, key, quantity);
      linesRef.current = next;
      setLines(next);
      const message = quantity === 0
        ? "Item removed from the bag."
        : "Bag quantity updated to " + quantity + ".";
      setNotice(message);
      return { ok: true, message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "The bag quantity could not be updated.";
      setNotice(message);
      return { ok: false, message };
    }
  }

  function removeItem(key: string): CartActionResult {
    if (!ready) return { ok: false, message: "The bag is still loading. Try again in a moment." };
    if (!linesRef.current.some((line) => line.key === key)) {
      const message = "That item is no longer in the bag.";
      setNotice(message);
      return { ok: false, message };
    }

    const next = removeCartLine(linesRef.current, key);
    linesRef.current = next;
    setLines(next);
    const message = "Item removed from the bag.";
    setNotice(message);
    return { ok: true, message };
  }

  function clear(): void {
    linesRef.current = [];
    setLines([]);
    setNotice("Bag cleared.");
  }

  const value: CartContextValue = {
    mode,
    lines,
    itemCount: getCartCount(lines),
    subtotalPaise: calculateSubtotalPaise(lines),
    ready,
    notice,
    addItem,
    updateQuantity,
    removeItem,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
