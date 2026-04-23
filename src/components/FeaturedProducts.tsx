import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ProductCard from "@/components/shop/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { products, Product } from "@/data/products";

const tabs = [
  { key: "new", label: "NEW" },
  { key: "featured", label: "FEATURED" },
  { key: "top", label: "TOP SELLERS" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("new");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const visible = products.filter((p) => p.tags.includes(activeTab)).slice(0, 5);

  return (
    <section id="products" className="bg-muted/30 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-cta mb-2 text-[10px] text-gold">Hand-picked</p>
            <h2 className="font-display text-3xl font-light tracking-wide text-foreground md:text-4xl">
              Featured Products
            </h2>
          </div>

          <div className="flex items-center gap-1 border-b border-border md:border-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-cta relative px-4 py-2 text-[11px] transition-colors ${
                  activeTab === tab.key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="featured-tab-indicator"
                    className="absolute -bottom-px left-0 right-0 h-px bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
};

export default FeaturedProducts;
