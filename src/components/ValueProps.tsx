import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Paintbrush, Truck, Smartphone, Star } from "lucide-react";

const values = [
  {
    icon: Paintbrush,
    title: "Bespoke Craftsmanship",
    desc: "Every piece handcrafted to perfection",
  },
  {
    icon: Truck,
    title: "White-Glove Delivery",
    desc: "Professional delivery, assembly & installation included",
  },
  {
    icon: Smartphone,
    title: "Seamless M-Pesa Checkout",
    desc: "Pay securely via M-Pesa, card, or installments",
  },
  {
    icon: Star,
    title: "Interior Design Consultation",
    desc: "Free virtual styling with every purchase above KES 500K",
  },
];

const ValueProps = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-muted/50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-light tracking-wide text-foreground md:text-4xl">
            Why Durable
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30">
                <v.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-2 font-display text-lg font-normal text-foreground">
                {v.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
