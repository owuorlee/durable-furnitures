import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PHONE_WA } from "@/lib/seo";

const CTABanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-obsidian px-6 py-20 md:py-28" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="mb-8 font-display text-3xl font-light tracking-wide text-ivory md:text-4xl">
          Ready to Transform Your Space?
        </h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#categories"
            className="text-cta border border-gold px-8 py-3.5 text-xs text-gold transition-all duration-500 hover:bg-gold hover:text-obsidian"
          >
            Browse the Collection
          </a>
          <a
            href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent("Hello Durable Furniture House, I would like to book a free furniture consultation.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cta bg-gold px-8 py-3.5 text-xs text-obsidian transition-all duration-500 hover:bg-gold/80"
          >
            Book a Free Consultation
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
