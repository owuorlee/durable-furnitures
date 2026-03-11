import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-living-room.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury living room by Durable Furniture Store"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="mb-6 font-display text-4xl font-light tracking-[0.08em] text-ivory md:text-6xl lg:text-7xl">
            DURABLE FURNITURE STORE
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mb-10 font-body text-lg font-light tracking-wide text-ivory/90 md:text-xl"
        >
          Kenya's Premier Luxury Furniture House
        </motion.p>

        <motion.a
          href="#categories"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-cta border border-ivory/60 px-10 py-4 text-sm text-ivory transition-all duration-500 hover:border-gold hover:bg-gold hover:text-obsidian"
        >
          Explore the Collection
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 animate-scroll-hint text-ivory/70" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
