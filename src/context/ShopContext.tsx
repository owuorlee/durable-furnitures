import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { products as ALL, Product } from "@/data/products";

type CartItem = { productId: string; qty: number };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartItemsResolved: { product: Product; qty: number }[];
};

const ShopContext = createContext<ShopState | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => load("durable-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("durable-wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => localStorage.setItem("durable-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("durable-wishlist", JSON.stringify(wishlist)), [wishlist]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { productId, qty }];
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

  const value: ShopState = {
    cart,
    wishlist,
    cartCount: cart.reduce((a, i) => a + i.qty, 0),
    wishlistCount: wishlist.length,
    cartSubtotal: cartItemsResolved.reduce((a, i) => a + i.product.sale * i.qty, 0),
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    toggleWishlist,
    isWishlisted,
    cartItemsResolved,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
};
