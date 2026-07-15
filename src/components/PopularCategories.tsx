import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { categories, getProductsByCategory } from "@/data/products";

const PopularCategories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="categories" className="bg-background px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="text-cta mb-2 text-[10px] text-gold">Curated for you</p>
            <h2 className="font-display text-3xl font-light tracking-wide text-foreground md:text-4xl">
              Popular Categories
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const count = getProductsByCategory(cat.slug).length;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group block bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={cat.image}
                      alt={`${cat.name} for sale in Nairobi, Kenya — Durable Furniture House`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="border-x border-b border-border p-4 text-center">
                    <h3 className="font-display text-base font-normal text-foreground transition-colors group-hover:text-gold">
                      {cat.name}
                    </h3>
                    <p className="mt-1 font-body text-xs text-muted-foreground">{count} products</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
