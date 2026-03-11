import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";

import catLShaped from "@/assets/cat-l-shaped-sofa.jpg";
import catCoffeeTable from "@/assets/cat-coffee-table.jpg";
import catChesterBed from "@/assets/cat-chester-bed.jpg";
import catDiningSet from "@/assets/cat-dining-set.jpg";
import catChesterSeat from "@/assets/cat-chester-seat.jpg";
import featuredBed from "@/assets/featured-chester-bed.jpg";

const images = [
  { src: catLShaped, alt: "Luxury L-shaped sofa" },
  { src: catCoffeeTable, alt: "Marble coffee table" },
  { src: catChesterBed, alt: "Chester bed" },
  { src: catDiningSet, alt: "Dining set" },
  { src: catChesterSeat, alt: "Chester armchair" },
  { src: featuredBed, alt: "Featured chester bed" },
];

const LifestyleGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-light tracking-wide text-foreground md:text-4xl">
            Living with Durable
          </h2>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            Follow us @DurableFurnitureKE
          </p>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />
        </motion.div>

        <div className="columns-2 gap-4 md:columns-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative mb-4 cursor-pointer overflow-hidden break-inside-avoid"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-obsidian/0 transition-all duration-500 group-hover:bg-obsidian/40">
                <Instagram className="h-6 w-6 text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleGallery;
