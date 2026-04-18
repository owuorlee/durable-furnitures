import { motion } from "framer-motion";
import heroImage from "@/assets/hero-living-room.jpg";

const PromoHero = () => {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "600px" }}>
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Curated luxury furniture lifestyle by Durable"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-obsidian/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-6" style={{ minHeight: "600px" }}>
        <div className="max-w-xl py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cta mb-5 text-xs text-gold"
          >
            ✦ New Season Collection
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 font-display text-5xl font-light leading-[1.05] tracking-tight text-ivory md:text-7xl"
          >
            Elevate
            <br />
            <span className="italic text-gold">Your Space</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10 font-body text-lg font-light text-ivory/85 md:text-xl"
          >
            Up to <span className="font-semibold text-gold">60% OFF</span> on hand-crafted new arrivals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="text-cta inline-block bg-gold px-10 py-4 text-xs text-obsidian transition-all duration-300 hover:bg-ivory hover:shadow-lg"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="text-cta inline-block border border-ivory/40 px-10 py-4 text-xs text-ivory transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Browse Collection
            </a>
          </motion.div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <span className="h-2 w-8 bg-gold" />
        <span className="h-2 w-2 bg-ivory/50" />
        <span className="h-2 w-2 bg-ivory/50" />
      </div>
    </section>
  );
};

export default PromoHero;
