import { motion } from "framer-motion";
import { Heart, Search, Repeat2, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, formatKsh } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { StarRating } from "./StarRating";
import { toast } from "sonner";

type Props = {
  product: Product;
  onQuickView?: (p: Product) => void;
};

const ProductCard = ({ product, onQuickView }: Props) => {
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useShop();
  const discount = Math.round(((product.original - product.sale) / product.original) * 100);
  const wished = isWishlisted(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id, 1);
    toast.success("Added to cart ✓", { description: product.name });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <span className="absolute left-0 top-3 z-10 bg-gold px-2.5 py-1 font-body text-[11px] font-semibold text-obsidian">
          -{discount}%
        </span>
        {product.hot && (
          <span className="text-cta absolute left-0 top-12 z-10 bg-destructive px-2.5 py-1 text-[10px] text-destructive-foreground">
            Hot
          </span>
        )}

        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute right-3 top-3 z-10 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button
            aria-label="Compare"
            onClick={(e) => {
              e.preventDefault();
              toast("Added to compare", { description: product.name });
            }}
            className="flex h-9 w-9 items-center justify-center bg-background text-foreground shadow-md transition-colors hover:bg-gold hover:text-obsidian"
          >
            <Repeat2 className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Quick view"
            onClick={(e) => {
              e.preventDefault();
              onQuickView?.(product);
            }}
            className="flex h-9 w-9 items-center justify-center bg-background text-foreground shadow-md transition-colors hover:bg-gold hover:text-obsidian"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Wishlist"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
              toast(wished ? "Removed from wishlist" : "Saved to wishlist ♡");
            }}
            className={`flex h-9 w-9 items-center justify-center shadow-md transition-colors ${
              wished ? "bg-gold text-obsidian" : "bg-background text-foreground hover:bg-gold hover:text-obsidian"
            }`}
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] font-body text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} />

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <Check className="h-3.5 w-3.5 text-gold" strokeWidth={2.5} />
          <span className="font-body text-foreground/70">In stock</span>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="font-body text-xs text-muted-foreground line-through">
            {formatKsh(product.original)}
          </span>
          <span className="font-body text-base font-bold text-gold">
            {formatKsh(product.sale)}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className="text-cta mt-4 w-full bg-foreground py-3 text-[11px] text-primary-foreground transition-colors hover:bg-gold hover:text-obsidian"
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
