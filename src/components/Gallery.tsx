import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { products, Product } from "@/data/products";

const row1Ids = [
  "ls-16", "ss-13", "cs-8", "cb-1", "wb-1", "dt-20",
  "dt-4", "ct-1", "tv-15", "ls-6", "ss-6", "cb-7",
];
const row2Ids = [
  "ls-20", "ss-20", "cs-14", "cb-11", "wb-5", "dt-2",
  "ct-5", "tv-29", "ls-9", "ss-18", "cb-19", "dt-15",
];
const row3Ids = [
  "ls-14", "ss-3", "cs-6", "cb-3", "wb-17", "dt-1",
  "ct-11", "tv-1", "ls-2", "ss-8", "cb-16", "tv-8",
];

const byId = new Map(products.map((p) => [p.id, p]));
const resolve = (ids: string[]): Product[] =>
  ids.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p));

type RowProps = {
  items: Product[];
  direction: "left" | "right";
  duration?: number;
};

const ScrollingRow = ({ items, direction, duration = 60 }: RowProps) => {
  // Duplicate to create a seamless loop
  const loop = [...items, ...items];
  const animClass =
    direction === "left" ? "animate-gallery-left" : "animate-gallery-right";

  return (
    <div className="group/row relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-muted/40 to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-muted/40 to-transparent md:w-24" />

      <div
        className={`flex w-max gap-3 md:gap-4 ${animClass} md:group-hover/row:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((p, i) => (
          <Link
            key={`${p.id}-${i}`}
            to={`/product/${p.slug}`}
            aria-label={p.name}
            className="group/card relative block h-40 w-40 shrink-0 overflow-hidden rounded-md bg-card shadow-md transition-shadow duration-300 hover:shadow-xl sm:h-48 sm:w-48 md:h-56 md:w-56"
          >
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-obsidian/0 transition-colors duration-300 group-hover/card:bg-obsidian/40">
              <Eye
                className="h-6 w-6 text-ivory opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                strokeWidth={1.25}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const row1 = resolve(row1Ids);
  const row2 = resolve(row2Ids);
  const row3 = resolve(row3Ids);

  return (
    <section className="bg-muted/40 py-16 md:py-20" aria-label="Gallery">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="text-cta mb-2 text-[10px] text-gold">Explore Our Collection</p>
          <h2 className="font-display text-3xl font-light tracking-wide text-foreground md:text-4xl">
            Gallery
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 md:gap-5">
        <ScrollingRow items={row1} direction="left" duration={60} />
        <ScrollingRow items={row2} direction="right" duration={70} />
        <ScrollingRow items={row3} direction="left" duration={65} />
      </div>
    </section>
  );
};

export default Gallery;
