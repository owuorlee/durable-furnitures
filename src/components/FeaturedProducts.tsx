import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Heart, Search, Repeat2, Check } from "lucide-react";

import img1 from "@/assets/cat-l-shaped-sofa.jpg";
import img2 from "@/assets/cat-5-seater-sofa.jpg";
import img3 from "@/assets/cat-chester-bed.jpg";
import img4 from "@/assets/cat-chester-seat.jpg";
import img5 from "@/assets/cat-wooden-bed.jpg";
import img6 from "@/assets/cat-dining-set.jpg";
import img7 from "@/assets/cat-coffee-table.jpg";
import img8 from "@/assets/cat-tv-stand.jpg";
import img9 from "@/assets/featured-chester-bed.jpg";
import img10 from "@/assets/hero-living-room.jpg";

type Product = {
  id: string;
  name: string;
  image: string;
  rating: number;
  original: number;
  sale: number;
  hot?: boolean;
};

const productData: Record<string, Product[]> = {
  NEW: [
    { id: "1", name: "Classic Grey 3-Seater Sofa", image: img1, rating: 5, original: 36000, sale: 32000 },
    { id: "2", name: "Helsinki 7-Seater Dark Grey", image: img2, rating: 5, original: 68000, sale: 62000 },
    { id: "3", name: "6×6 White Bed With Storage Drawers", image: img3, rating: 4.5, original: 58000, sale: 56000 },
    { id: "4", name: "6-Seater Brown L-Shaped", image: img4, rating: 4, original: 64000, sale: 58000, hot: true },
    { id: "5", name: "Austin 3-Seater Classic Sofa", image: img5, rating: 4.5, original: 34000, sale: 32000 },
  ],
  FEATURED: [
    { id: "6", name: "Snow White Sofa Bed", image: img6, rating: 4, original: 28000, sale: 26000 },
    { id: "7", name: "6-Seater Black Dining Table Set", image: img7, rating: 4.5, original: 74000, sale: 68000 },
    { id: "8", name: "Alexandria 6-Seater Grey L", image: img8, rating: 4, original: 60000, sale: 56000, hot: true },
    { id: "9", name: "Canterbury 5×6 Chester Bed", image: img9, rating: 4.5, original: 42000, sale: 36000 },
    { id: "10", name: "6-Seater Black Mahogany Set", image: img10, rating: 5, original: 74000, sale: 68000 },
  ],
  "TOP SELLERS": [
    { id: "11", name: "Sovereign Tufted Chester Bed", image: img9, rating: 5, original: 320000, sale: 285000, hot: true },
    { id: "12", name: "Heritage Mahogany Coffee Table", image: img7, rating: 5, original: 48000, sale: 42000 },
    { id: "13", name: "Royal L-Shaped Velvet Sofa", image: img1, rating: 4.5, original: 145000, sale: 128000 },
    { id: "14", name: "Atelier Wooden King Bed", image: img5, rating: 5, original: 88000, sale: 76000 },
    { id: "15", name: "Manor 8-Seater Dining Suite", image: img6, rating: 4.5, original: 195000, sale: 168000, hot: true },
  ],
};

const tabs = ["NEW", "FEATURED", "TOP SELLERS"] as const;
type Tab = (typeof tabs)[number];

const formatKsh = (n: number) =>
  `KSh ${n.toLocaleString("en-KE", { minimumFractionDigits: 0 })}`;

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i <= Math.floor(rating)
            ? "fill-gold text-gold"
            : i - 0.5 <= rating
            ? "fill-gold/50 text-gold"
            : "fill-none text-muted-foreground/40"
        }`}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const discount = Math.round(((product.original - product.sale) / product.original) * 100);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* Discount badge */}
        <span className="absolute left-0 top-3 z-10 bg-gold px-2.5 py-1 font-body text-[11px] font-semibold text-obsidian">
          -{discount}%
        </span>
        {product.hot && (
          <span className="text-cta absolute left-0 top-12 z-10 bg-destructive px-2.5 py-1 text-[10px] text-destructive-foreground">
            Hot
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover icon stack */}
        <div className="absolute right-3 top-3 z-10 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          {[
            { icon: Repeat2, label: "Compare" },
            { icon: Search, label: "Quick view" },
            { icon: Heart, label: "Wishlist" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center bg-background text-foreground shadow-md transition-colors hover:bg-gold hover:text-obsidian"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] font-body text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-gold">
          {product.name}
        </h3>

        <StarRating rating={product.rating} />

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={2.5} />
          <span className="font-body text-green-700">In stock</span>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="font-body text-xs text-muted-foreground line-through">
            {formatKsh(product.original)}
          </span>
          <span className="font-body text-base font-bold text-gold">
            {formatKsh(product.sale)}
          </span>
        </div>

        <button className="text-cta mt-4 w-full bg-foreground py-3 text-[11px] text-primary-foreground transition-colors hover:bg-gold hover:text-obsidian">
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
};

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<Tab>("NEW");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-cta relative px-4 py-2 text-[11px] transition-colors ${
                  activeTab === tab
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute -bottom-px left-0 right-0 h-px bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {productData[activeTab].map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
