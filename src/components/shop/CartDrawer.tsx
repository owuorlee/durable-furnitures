import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useShop } from "@/context/ShopContext";
import { formatKsh } from "@/data/products";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { cartOpen, setCartOpen, cartItemsResolved, updateQty, removeFromCart, cartSubtotal } = useShop();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="font-display text-xl font-light tracking-wide">
            Your Cart ({cartItemsResolved.length})
          </SheetTitle>
        </SheetHeader>

        {cartItemsResolved.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40" strokeWidth={1} />
            <p className="font-body text-sm text-muted-foreground">Your cart is empty</p>
            <button
              onClick={() => setCartOpen(false)}
              className="text-cta mt-2 bg-foreground px-6 py-3 text-[11px] text-primary-foreground hover:bg-gold hover:text-obsidian"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-border">
                {cartItemsResolved.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-4 py-4">
                    <Link to={`/product/${product.slug}`} onClick={() => setCartOpen(false)} className="flex-shrink-0">
                      <img src={product.image} alt={product.name} className="h-20 w-20 object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="font-body text-sm font-semibold leading-tight text-foreground hover:text-gold"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          aria-label="Remove"
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQty(product.id, qty - 1)}
                            className="p-2 hover:bg-muted"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-body text-sm">{qty}</span>
                          <button
                            onClick={() => updateQty(product.id, qty + 1)}
                            className="p-2 hover:bg-muted"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-body text-sm font-bold text-gold">
                          {formatKsh(product.sale * qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-sm text-foreground">Subtotal</span>
                <span className="font-display text-xl text-gold">{formatKsh(cartSubtotal)}</span>
              </div>
              <button className="text-cta w-full bg-gold py-3 text-[11px] text-obsidian transition-colors hover:bg-foreground hover:text-primary-foreground">
                Proceed to Checkout
              </button>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-2 w-full py-2 font-body text-xs text-muted-foreground hover:text-foreground"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
