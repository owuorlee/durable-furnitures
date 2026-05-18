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
  { name: "L-Shaped Sofas", image: catLShaped },
  { name: "5-Seater Sofa Designs", image: cat5Seater },
  { name: "Chester Beds", image: catChesterBed },
  { name: "Wooden Beds", image: catWoodenBed },
  { name: "Coffee Tables", image: catCoffeeTable },
  { name: "TV Stands", image: catTvStand },
  { name: "Chester Seats", image: catChesterSeat },
  { name: "Dining Tables", image: catDiningSet },
  { name: "Dining Sets", image: catDiningSet },
];

const CategoryGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="categories" className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-light tracking-wide text-foreground md:text-4xl">
            Our Collections
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-obsidian/30 transition-all duration-500 group-hover:bg-obsidian/50" />
              <div className="absolute inset-0 flex items-end p-4 md:p-6">
                <h3 className="font-display text-base font-light tracking-wide text-ivory md:text-lg">
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
