"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
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
const STORAGE_UNAVAILABLE = "__KROVINOX_STORAGE_UNAVAILABLE__";
const SERVER_SNAPSHOT = "__KROVINOX_SERVER_SNAPSHOT__";
const subscribers = new Map<string, Set<() => void>>();
const cachedSnapshots = new Map<string, string>();

function storageKey(mode: CartMode): string {
  return "krovinox:bag:" + mode + ":v1";
}

/**
 * localStorage is an external store, not component state. useSyncExternalStore
 * provides a stable empty server snapshot and then reconciles to browser storage
 * after hydration without effect-driven cascading state updates.
 */
function getSnapshot(mode: CartMode): string {
  const key = storageKey(mode);
  const cached = cachedSnapshots.get(key);
  if (cached !== undefined) return cached;

  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return STORAGE_UNAVAILABLE;
  }
}

function getServerSnapshot(): string {
  return SERVER_SNAPSHOT;
}

function subscribe(mode: CartMode, listener: () => void): () => void {
  const key = storageKey(mode);
  let listeners = subscribers.get(key);
  if (!listeners) {
    listeners = new Set();
    subscribers.set(key, listeners);
  }
  listeners.add(listener);

  function onStorage(event: StorageEvent) {
    if (event.key === key || event.key === null) {
      cachedSnapshots.delete(key);
      listener();
    }
  }

  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("storage", onStorage);
    listeners?.delete(listener);
    if (listeners?.size === 0) subscribers.delete(key);
  };
}

function notifySubscribers(mode: CartMode): void {
  for (const listener of subscribers.get(storageKey(mode)) ?? []) listener();
}

function saveSnapshot(mode: CartMode, lines: CartLine[]): boolean {
  const key = storageKey(mode);
  const serialized = JSON.stringify(serializeCart(lines, mode));

  // Keep a memory-backed snapshot if storage is disabled or full. The cart can
  // still work for this page session, while the UI truthfully warns about saving.
  cachedSnapshots.set(key, serialized);
  try {
    window.localStorage.setItem(key, serialized);
    return true;
  } catch {
    return false;
  } finally {
    notifySubscribers(mode);
  }
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
  const [notice, setNotice] = useState("");
  const snapshot = useSyncExternalStore(
    (listener) => subscribe(mode, listener),
    () => getSnapshot(mode),
    getServerSnapshot,
  );
  const ready = snapshot !== SERVER_SNAPSHOT;
  const lines = useMemo(() => {
    if (snapshot === SERVER_SNAPSHOT || snapshot === STORAGE_UNAVAILABLE || snapshot === "") return [];
    try {
      return normalizeCart(JSON.parse(snapshot), mode, products);
    } catch {
      return [];
    }
  }, [snapshot, mode, products]);

  function commit(next: CartLine[], successMessage: string): void {
    const saved = saveSnapshot(mode, next);
    setNotice(saved
      ? successMessage
      : successMessage + " This browser could not save the bag; changes may be lost when you leave.");
  }

  function addItem(productId: string, variantId: string): CartActionResult {
    if (!ready) return { ok: false, message: "The bag is still loading. Try again in a moment." };

    try {
      const product = products.find((item) => item.id === productId);
      const variant = product?.variants.find((item) => item.id === variantId);
      if (!product || !variant) throw new Error("That product option is no longer available in this catalogue.");

      const line = createCartLine(product, variant, mode);
      const next = addCartLine(lines, line);
      const message = mode === "preview"
        ? "Added " + product.name + " to your demo bag. This concept is not for sale."
        : "Added " + product.name + " to your bag. Checkout is not enabled in this release.";
      commit(next, message);
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
      const next = updateCartQuantity(lines, key, quantity);
      const message = quantity === 0
        ? "Item removed from the bag."
        : "Bag quantity updated to " + quantity + ".";
      commit(next, message);
      return { ok: true, message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "The bag quantity could not be updated.";
      setNotice(message);
      return { ok: false, message };
    }
  }

  function removeItem(key: string): CartActionResult {
    if (!ready) return { ok: false, message: "The bag is still loading. Try again in a moment." };
    if (!lines.some((line) => line.key === key)) {
      const message = "That item is no longer in the bag.";
      setNotice(message);
      return { ok: false, message };
    }

    commit(removeCartLine(lines, key), "Item removed from the bag.");
    return { ok: true, message: "Item removed from the bag." };
  }

  function clear(): void {
    commit([], "Bag cleared.");
  }

  const storageNotice = snapshot === STORAGE_UNAVAILABLE
    ? "Browser storage is unavailable. Your bag can work for this page session, but cannot be restored after leaving."
    : "";
  const value: CartContextValue = {
    mode,
    lines,
    itemCount: getCartCount(lines),
    subtotalPaise: calculateSubtotalPaise(lines),
    ready,
    notice: storageNotice || notice,
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
