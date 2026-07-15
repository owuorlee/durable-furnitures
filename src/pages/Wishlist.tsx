import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import UtilityBar from "@/components/UtilityBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/shop/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { products, Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import Seo from "@/components/Seo";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useShop();
  const [quickView, setQuickView] = useState<Product | null>(null);

  const saved = useMemo(
    () => wishlist.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p)),
    [wishlist],
  );

  return (
    <main className="min-h-screen">
      <Seo
        title="My Wishlist | Durable Furniture House"
        description="Products you have saved for later at Durable Furniture House."
        path="/wishlist"
        noindex
      />
      <UtilityBar />
      <MainHeader />
      <CategoryNav />

      <section className="bg-background px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-cta text-[10px] text-gold">Saved for Later</p>
            <h1 className="mt-3 font-display text-3xl font-light text-foreground md:text-5xl">
              My Wishlist
            </h1>
            <div className="mx-auto mt-4 h-px w-12 bg-gold" />
            {saved.length > 0 && (
              <p className="mt-4 font-body text-sm text-muted-foreground">
                {saved.length} {saved.length === 1 ? "item" : "items"} saved
              </p>
            )}
          </div>

          {saved.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center"
            >
              <Heart className="h-14 w-14 text-muted-foreground/30" strokeWidth={1} />
              <p className="font-display text-xl font-light text-foreground">
                You have not saved any items yet
              </p>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                Tap the heart on any product to keep it here for later — then come back anytime to
                pick up where you left off.
              </p>
              <Link
                to="/"
                className="text-cta mt-4 bg-gold px-8 py-3.5 text-[11px] text-obsidian transition-colors hover:bg-foreground hover:text-primary-foreground"
              >
                Browse Our Collection
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saved.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <ProductCard product={product} onQuickView={setQuickView} />
                  <button
                    onClick={() => {
                      toggleWishlist(product.id);
                      toast("Removed from wishlist", { description: product.name });
                    }}
                    className="mt-2 flex items-center justify-center gap-2 border border-border py-2.5 font-body text-xs text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Remove from Wishlist
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </main>
  );
};

export default Wishlist;
