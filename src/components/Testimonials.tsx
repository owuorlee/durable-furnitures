import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "The craftsmanship is extraordinary. Our living room has never felt more elegant. Worth every shilling.",
    name: "James K.",
    location: "Karen, Nairobi",
  },
  {
    quote: "From selection to delivery, the experience was flawless. The white-glove service is genuinely world-class.",
    name: "Amina W.",
    location: "Westlands, Nairobi",
  },
  {
    quote: "Our Chester Bed turned our bedroom into a private sanctuary. We have never slept better. Durable truly understands luxury.",
    name: "David M.",
    location: "Runda, Nairobi",
  },
];

const Testimonials = () => {
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
            What Our Clients Say
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <span className="mb-4 block font-display text-5xl text-gold/50">"</span>
              <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
                {t.quote}
              </p>
              <p className="font-display text-sm text-foreground">{t.name}</p>
              <p className="font-body text-xs text-muted-foreground">{t.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
