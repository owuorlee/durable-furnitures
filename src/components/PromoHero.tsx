import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import heroImage from "@/assets/hero-living-room.jpg";
import heroLounge from "@/assets/hero-lounge-golden.jpg";
import heroBedroom from "@/assets/hero-bedroom-emerald.jpg";

type Slide = {
  image: string;
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  subtitle: React.ReactNode;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const slides: Slide[] = [
  {
    image: heroImage,
    eyebrow: "✦ New Season Collection",
    titleTop: "Elevate",
    titleBottom: "Your Space",
    subtitle: (
      <>
        Up to <span className="font-semibold text-gold">40% OFF</span> on selected pieces.
      </>
    ),
    primary: { label: "Shop Now", href: "#products" },
    secondary: { label: "Browse Collection", href: "#categories" },
  },
  {
    image: heroLounge,
    eyebrow: "✦ The Living Room, Reimagined",
    titleTop: "Where Comfort",
    titleBottom: "Meets Craft",
    subtitle: (
      <>
        Bespoke sofas built for the moments that matter — designed in Nairobi, made to last a lifetime.
      </>
    ),
    primary: { label: "Explore Sofas", href: "/category/l-shaped-sofas" },
    secondary: { label: "See Coffee Tables", href: "/category/coffee-tables" },
  },
  {
    image: heroBedroom,
    eyebrow: "✦ Signature Bedroom Series",
    titleTop: "Wake Up in",
    titleBottom: "Quiet Luxury",
    subtitle: (
      <>
        Hand-tufted chester beds and heirloom wooden frames — the sanctuary you deserve.
      </>
    ),
    primary: { label: "Shop Chester Beds", href: "/category/chester-beds" },
    secondary: { label: "View Wooden Beds", href: "/category/wooden-beds" },
  },
];

const AUTO_MS = 6500;

const PromoHero = () => {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [index, tick]);

  const slide = slides[index];

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "600px" }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt="Curated luxury furniture lifestyle by Durable"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-obsidian/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-6" style={{ minHeight: "600px" }}>
        <AnimatePresence mode="wait">
          <div key={index} className="max-w-xl py-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-cta mb-5 text-xs text-gold"
            >
              {slide.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 font-display text-5xl font-light leading-[1.05] tracking-tight text-ivory md:text-7xl"
            >
              {slide.titleTop}
              <br />
              <span className="italic text-gold">{slide.titleBottom}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-10 font-body text-lg font-light text-ivory/85 md:text-xl"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={slide.primary.href}
                className="text-cta inline-block bg-gold px-10 py-4 text-xs text-obsidian transition-all duration-300 hover:bg-ivory hover:shadow-lg"
              >
                {slide.primary.label}
              </a>
              <a
                href={slide.secondary.href}
                className="text-cta inline-block border border-ivory/40 px-10 py-4 text-xs text-ivory transition-all duration-300 hover:border-gold hover:text-gold"
              >
                {slide.secondary.label}
              </a>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      {/* Prev/next arrows — goTo() bumps the tick, which restarts the
          auto-advance timer so a manual click always gets a full interval. */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-obsidian/30 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:bg-obsidian/50 hover:text-gold md:left-6 md:h-12 md:w-12"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-obsidian/30 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:bg-obsidian/50 hover:text-gold md:right-6 md:h-12 md:w-12"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 ${
              i === index ? "h-2 w-8 bg-gold" : "h-2 w-2 bg-ivory/50 hover:bg-ivory/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PromoHero;
