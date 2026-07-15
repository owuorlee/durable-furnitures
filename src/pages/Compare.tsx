import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Repeat2, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import UtilityBar from "@/components/UtilityBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { StarRating } from "@/components/shop/StarRating";
import { products, formatKsh, Product } from "@/data/products";
import { useShop, COMPARE_LIMIT } from "@/context/ShopContext";
import Seo from "@/components/Seo";

const Compare = () => {
  const { compare, toggleCompare, clearCompare, addToCart } = useShop();

  const items = useMemo(
    () => compare.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p)),
    [compare],
  );

  // One row per attribute label across all compared products, in first-seen order.
  const attributeLabels = useMemo(() => {
    const labels: string[] = [];
    items.forEach((p) =>
      p.attributes.forEach((a) => {
        if (!labels.includes(a.label)) labels.push(a.label);
      }),
    );
    return labels;
  }, [items]);

  const attr = (p: Product, label: string) =>
    p.attributes.find((a) => a.label === label)?.value ?? "—";

  return (
    <main className="min-h-screen">
      <Seo
        title="Compare Products | Durable Furniture House"
        description="Compare furniture side by side at Durable Furniture House."
        path="/compare"
        noindex
      />
      <UtilityBar />
      <MainHeader />
      <CategoryNav />

      <section className="bg-background px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-cta text-[10px] text-gold">Side by Side</p>
            <h1 className="mt-3 font-display text-3xl font-light text-foreground md:text-5xl">
              Compare Products
            </h1>
            <div className="mx-auto mt-4 h-px w-12 bg-gold" />
            {items.length > 0 && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <p className="font-body text-sm text-muted-foreground">
                  Comparing {items.length} of {COMPARE_LIMIT} products
                </p>
                <button
                  onClick={() => {
                    clearCompare();
                    toast("Compare list cleared");
                  }}
                  className="font-body text-xs text-muted-foreground underline transition-colors hover:text-destructive"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center"
            >
              <Repeat2 className="h-14 w-14 text-muted-foreground/30" strokeWidth={1} />
              <p className="font-display text-xl font-light text-foreground">
                Nothing to compare yet
              </p>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                Hover over any product and tap the compare icon to line up to {COMPARE_LIMIT} pieces
                side by side — sizes, materials, prices and more.
              </p>
              <Link
                to="/"
                className="text-cta mt-4 bg-gold px-8 py-3.5 text-[11px] text-obsidian transition-colors hover:bg-foreground hover:text-primary-foreground"
              >
                Browse Our Collection
              </Link>
            </motion.div>
          ) : (
            <div className="-mx-6 overflow-x-auto px-6 pb-4">
              <table className="w-full min-w-[640px] border-collapse border border-border">
                <thead>
                  <tr>
                    <th className="w-32 border border-border bg-muted/30 p-4 text-left align-bottom font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground md:w-40">
                      Product
                    </th>
                    {items.map((p) => (
                      <th key={p.id} className="border border-border p-4 align-top font-normal">
                        <div className="relative">
                          <button
                            onClick={() => {
                              toggleCompare(p.id);
                              toast("Removed from compare", { description: p.name });
                            }}
                            aria-label={`Remove ${p.name} from compare`}
                            className="absolute -right-1 -top-1 z-10 flex h-7 w-7 items-center justify-center bg-background text-muted-foreground shadow-md transition-colors hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <Link to={`/product/${p.slug}`}>
                            <img
                              src={p.image}
                              alt={p.name}
                              className="mx-auto aspect-square w-full max-w-[180px] object-cover"
                            />
                            <p className="mt-3 line-clamp-2 text-left font-body text-sm font-semibold leading-tight text-foreground transition-colors hover:text-gold">
                              {p.name}
                            </p>
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="border border-border p-4 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Price
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="border border-border p-4">
                        <span className="mr-2 font-body text-xs text-muted-foreground line-through">
                          {formatKsh(p.original)}
                        </span>
                        <span className="font-body text-base font-bold text-gold">{formatKsh(p.sale)}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      You Save
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="border border-border p-4 font-body text-sm text-foreground">
                        {formatKsh(p.original - p.sale)} (
                        {Math.round(((p.original - p.sale) / p.original) * 100)}%)
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border border-border p-4 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Rating
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="border border-border p-4">
                        <div className="flex items-center gap-2">
                          <StarRating rating={p.rating} />
                          <span className="font-body text-xs text-muted-foreground">({p.reviewCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Category
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="border border-border p-4 font-body text-sm text-foreground">
                        <Link to={`/category/${p.category}`} className="transition-colors hover:text-gold">
                          {p.categoryName}
                        </Link>
                      </td>
                    ))}
                  </tr>
                  {attributeLabels.map((label, i) => (
                    <tr key={label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                      <td className="border border-border p-4 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {label}
                      </td>
                      {items.map((p) => (
                        <td key={p.id} className="border border-border p-4 font-body text-sm text-foreground">
                          {attr(p, label)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="border border-border p-4" />
                    {items.map((p) => (
                      <td key={p.id} className="border border-border p-4">
                        <button
                          onClick={() => {
                            addToCart(p.id, 1);
                            toast.success("Added to cart ✓", { description: p.name });
                          }}
                          className="text-cta flex w-full items-center justify-center gap-2 bg-foreground py-3 text-[11px] text-primary-foreground transition-colors hover:bg-gold hover:text-obsidian"
                        >
                          <ShoppingBag className="h-4 w-4" /> Add to Cart
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Compare;
