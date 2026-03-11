import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import featuredImage from "@/assets/featured-chester-bed.jpg";

const FeaturedProduct = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <img
              src={featuredImage}
              alt="The Sovereign Chester Bed"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <p className="text-cta mb-4 text-xs text-gold">Signature Piece</p>
            <h2 className="mb-4 font-display text-3xl font-light tracking-wide text-foreground md:text-4xl">
              The Sovereign Chester Bed
            </h2>
            <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">
              A masterwork of tufted leather and precision joinery. Hand-finished by our Nairobi artisans, 
              the Sovereign embodies timeless elegance — designed to be the centrepiece of your bedroom 
              for generations to come.
            </p>
            <p className="mb-8 font-display text-xl text-foreground">
              From KES 285,000
            </p>
            <a
              href="#"
              className="text-cta inline-block self-start border border-foreground px-8 py-3.5 text-xs text-foreground transition-all duration-500 hover:border-gold hover:bg-gold hover:text-obsidian"
            >
              View Details
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
