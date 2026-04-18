import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import catLShaped from "@/assets/cat-l-shaped-sofa.jpg";
import cat5Seater from "@/assets/cat-5-seater-sofa.jpg";
import catChesterBed from "@/assets/cat-chester-bed.jpg";
import catWoodenBed from "@/assets/cat-wooden-bed.jpg";
import catCoffeeTable from "@/assets/cat-coffee-table.jpg";
import catTvStand from "@/assets/cat-tv-stand.jpg";
import catChesterSeat from "@/assets/cat-chester-seat.jpg";
import catDiningSet from "@/assets/cat-dining-set.jpg";

const categories = [
  { name: "L-Shaped Sofas", image: catLShaped, count: 107 },
  { name: "Chester Beds", image: catChesterBed, count: 56 },
  { name: "Sofa Set Designs", image: cat5Seater, count: 85 },
  { name: "Chester Seats", image: catChesterSeat, count: 25 },
  { name: "Coffee Tables", image: catCoffeeTable, count: 21 },
  { name: "Dining Sets", image: catDiningSet, count: 56 },
  { name: "TV Stand Designs", image: catTvStand, count: 19 },
  { name: "Wooden Beds", image: catWoodenBed, count: 30 },
];

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
          <a
            href="#"
            className="text-cta hidden text-[11px] text-foreground transition-colors hover:text-gold md:inline-block"
          >
            View All →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group block bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="border-x border-b border-border p-4 text-center">
                <h3 className="font-display text-base font-normal text-foreground transition-colors group-hover:text-gold">
                  {cat.name}
                </h3>
                <p className="mt-1 font-body text-xs text-muted-foreground">
                  {cat.count} products
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
