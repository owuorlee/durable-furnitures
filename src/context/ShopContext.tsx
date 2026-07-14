import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { toast } from "sonner";
import { products as ALL, Product } from "@/data/products";
import { generateOrderId, Order } from "@/data/orders";

type CartItem = { productId: string; qty: number };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  compare: string[];
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  cartSubtotal: number;
  cartOpen: boolean;
  currentOrderId: string | null;
  setCartOpen: (v: boolean) => void;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  isCompared: (productId: string) => boolean;
  clearCompare: () => void;
  cartItemsResolved: { product: Product; qty: number }[];
};

// Comparison works best side-by-side; cap the tray at 4 products.
export const COMPARE_LIMIT = 4;

const ShopContext = createContext<ShopState | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

// Persist a lightweight order record so the Track Order page can look it up.
const saveOrder = (id: string, product: Product, qty: number) => {
  try {
    const raw = localStorage.getItem("durable-orders");
    const list: Order[] = raw ? JSON.parse(raw) : [];
    if (list.some((o) => o.id === id)) return;
    const today = new Date();
    const eta = new Date(today.getTime() + 5 * 86400000);
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    list.unshift({
      id,
      productName: `${qty} × ${product.name}`,
      address: "To be confirmed",
      estimatedDelivery: fmt(eta),
      status: "received",
      createdAt: fmt(today),
    });
    localStorage.setItem("durable-orders", JSON.stringify(list.slice(0, 50)));
  } catch {
    /* ignore */
  }
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => load("durable-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("durable-wishlist", []));
  const [compare, setCompare] = useState<string[]>(() => load("durable-compare", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(() =>
    load<string | null>("durable-current-order", null),
  );

  useEffect(() => localStorage.setItem("durable-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("durable-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("durable-compare", JSON.stringify(compare)), [compare]);
  useEffect(() => {
    localStorage.setItem("durable-current-order", JSON.stringify(currentOrderId));
  }, [currentOrderId]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { productId, qty }];
    });

    // Generate an Order ID on first add. Reuse it for subsequent adds within
    // the same session so a single cart maps to a single trackable order.
    const product = ALL.find((p) => p.id === productId);
    setCurrentOrderId((prev) => {
      const id = prev ?? generateOrderId();
      if (product) saveOrder(id, product, qty);
      if (!prev) {
        toast.success(`Order created: ${id}`, {
          description: "Save this Order ID to track your order.",
          duration: 7000,
        });
      }
      return id;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) return setCart((prev) => prev.filter((i) => i.productId !== productId));
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const toggleCompare = useCallback((productId: string) => {
    setCompare((prev) => {
      if (prev.includes(productId)) return prev.filter((id) => id !== productId);
      if (prev.length >= COMPARE_LIMIT) {
        toast.error(`You can compare up to ${COMPARE_LIMIT} products`, {
          description: "Remove one from your compare list to add another.",
        });
        return prev;
      }
      return [...prev, productId];
    });
  }, []);

  const isCompared = useCallback((id: string) => compare.includes(id), [compare]);

  const clearCompare = useCallback(() => setCompare([]), []);

  const cartItemsResolved = useMemo(
    () =>
      cart
        .map((i) => {
          const product = ALL.find((p) => p.id === i.productId);
          return product ? { product, qty: i.qty } : null;
        })
        .filter((x): x is { product: Product; qty: number } => x !== null),
    [cart],
  );

  // Reset the current order once the cart is fully cleared.
  useEffect(() => {
    if (cart.length === 0 && currentOrderId) setCurrentOrderId(null);
  }, [cart.length, currentOrderId]);

  const value: ShopState = {
    cart,
    wishlist,
    compare,
    cartCount: cart.reduce((a, i) => a + i.qty, 0),
    wishlistCount: wishlist.length,
    compareCount: compare.length,
    cartSubtotal: cartItemsResolved.reduce((a, i) => a + i.product.sale * i.qty, 0),
    cartOpen,
    currentOrderId,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    toggleWishlist,
    isWishlisted,
    toggleCompare,
    isCompared,
    clearCompare,
    cartItemsResolved,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
};
