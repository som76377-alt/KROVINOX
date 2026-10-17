"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type BagItems = Record<string, number>;
type BagContextValue = {
  items: BagItems;
  count: number;
  addItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
};
const BagContext = createContext<BagContextValue | null>(null);
const STORAGE_KEY = "krovinox-preview-bag-v1";

export function BagProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [items, setItems] = useState<BagItems>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
      if (saved && typeof saved === "object" && !Array.isArray(saved)) {
        const valid = Object.fromEntries(Object.entries(saved).filter(([key, value]) =>
          /^[a-z0-9-]+$/.test(key) && Number.isInteger(value) && Number(value) > 0 && Number(value) <= 10
        )) as BagItems;
        setItems(valid);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((slug: string) => {
    setItems((current) => ({ ...current, [slug]: Math.min(10, (current[slug] ?? 0) + 1) }));
  }, []);
  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        const next = { ...current };
        delete next[slug];
        return next;
      }
      return { ...current, [slug]: Math.min(10, Math.floor(quantity)) };
    });
  }, []);
  const removeItem = useCallback((slug: string) => {
    setItems((current) => {
      const next = { ...current };
      delete next[slug];
      return next;
    });
  }, []);
  const value = useMemo(() => ({
    items,
    count: Object.values(items).reduce((total, quantity) => total + quantity, 0),
    addItem,
    setQuantity,
    removeItem,
  }), [items, addItem, setQuantity, removeItem]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function usePreviewBag() {
  const context = useContext(BagContext);
  if (!context) throw new Error("usePreviewBag must be used inside BagProvider");
  return context;
}
