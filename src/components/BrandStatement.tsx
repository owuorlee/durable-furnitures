import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const BrandStatement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-8 flex justify-center">
            <div className="h-px w-16 bg-gold" />
          </div>
          <p className="font-display text-2xl font-light leading-relaxed text-foreground md:text-3xl lg:text-4xl">
            "Where craftsmanship meets modern living. Every piece tells a story of precision, heritage, and bold design."
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-px w-16 bg-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStatement;
