import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Product, formatKsh } from "@/data/products";
import { Link } from "react-router-dom";
import { useShop } from "@/context/ShopContext";
import { StarRating } from "./StarRating";
import { toast } from "sonner";

type Props = { product: Product | null; onClose: () => void };

const QuickViewModal = ({ product, onClose }: Props) => {
  const { addToCart } = useShop();
  if (!product) return null;
  const discount = Math.round(((product.original - product.sale) / product.original) * 100);

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl border-border bg-background p-0">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-square bg-muted">
            <span className="absolute left-0 top-3 z-10 bg-gold px-2.5 py-1 font-body text-[11px] font-semibold text-obsidian">
              -{discount}%
            </span>
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <DialogTitle asChild>
              <h2 className="font-display text-2xl font-light leading-tight text-foreground">
                {product.name}
              </h2>
            </DialogTitle>
            <StarRating rating={product.rating} />
            <div className="flex items-baseline gap-3">
              <span className="font-body text-sm text-muted-foreground line-through">
                {formatKsh(product.original)}
              </span>
              <span className="font-body text-2xl font-bold text-gold">{formatKsh(product.sale)}</span>
            </div>
            <p className="font-body text-sm text-foreground/70 line-clamp-4">{product.description}</p>
            <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={() => {
                  addToCart(product.id, 1);
                  toast.success("Added to cart ✓", { description: product.name });
                  onClose();
                }}
                className="text-cta w-full bg-foreground py-3 text-[11px] text-primary-foreground transition-colors hover:bg-gold hover:text-obsidian"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="text-cta w-full border border-foreground py-3 text-center text-[11px] text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
