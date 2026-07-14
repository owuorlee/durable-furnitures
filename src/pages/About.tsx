import { motion } from "framer-motion";
import { Hammer, Sparkles, Truck, Wallet, Phone, MapPin, Clock } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import aboutHero from "@/assets/about-hero.jpg";

const PHONE_DISPLAY = "+254 741 530 539";
const PHONE_TEL = "+254741530539";
const PHONE_WA = "254741530539";

const values = [
  { icon: Hammer, title: "Quality Craftsmanship", desc: "Every piece is handcrafted by skilled artisans using premium materials that last generations." },
  { icon: Sparkles, title: "Affordable Luxury", desc: "Bespoke, showroom-grade furniture at prices designed for the Kenyan home." },
  { icon: Wallet, title: "Payment on Delivery", desc: "Inspect your order at your doorstep and pay only when you're completely satisfied." },
  { icon: Truck, title: "Free Delivery", desc: "Complimentary delivery and installation across Nairobi & Kiambu on every order." },
];

const About = () => {
  return (
    <main className="min-h-screen">
      <UtilityBar />
      <MainHeader />
      <CategoryNav />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={aboutHero}
          alt="Durable Furniture House showroom"
          width={1920}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/60" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-cta mb-4 text-[10px] text-gold">Our Story</p>
          <h1 className="font-display text-4xl font-light leading-tight text-ivory md:text-6xl">
            About Durable Furniture House
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        </motion.div>
      </section>

      {/* Story */}
      <section className="bg-background px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-cta text-[10px] text-gold">Who We Are</p>
            <h2 className="mt-3 font-display text-3xl font-light text-foreground md:text-4xl">
              Kenyan-made. Built to last.
            </h2>
          </div>
          <div className="space-y-5 font-body text-base leading-relaxed text-foreground/80">
            <p>
              Durable Furniture House is a premium Kenyan furniture brand rooted in the belief
              that great design belongs in every home. From our workshops to your living room,
              we craft bespoke sofas, beds, dining sets and statement pieces that balance
              timeless silhouettes with modern comfort.
            </p>
            <p>
              We serve clients across Nairobi and Kiambu with a commitment to quality that shows
              in every stitch, every joint and every finish. Whether you're furnishing a first
              apartment or a forever home, our team works closely with you to deliver pieces
              that feel personal, considered and made to endure.
            </p>
            <p>
              Beautiful furniture shouldn't be complicated. That's why we've built our business
              around clear pricing, honest craftsmanship, free delivery and payment on delivery —
              so you can shop with confidence, every time.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-light text-foreground md:text-4xl">Why Choose Us</h2>
            <div className="mx-auto mt-4 h-px w-12 bg-gold" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border bg-background p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30">
                  <v.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-display text-lg text-foreground">{v.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-background px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-cta text-[10px] text-gold">Get in Touch</p>
          <h2 className="mt-3 font-display text-3xl font-light text-foreground md:text-4xl">
            Visit us or reach out
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-3">
            <div className="border border-border bg-muted/30 p-6">
              <Phone className="mx-auto h-5 w-5 text-gold" strokeWidth={1.5} />
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
              <p className="mt-1 font-body text-sm text-foreground">{PHONE_DISPLAY}</p>
            </div>
            <div className="border border-border bg-muted/30 p-6">
              <Clock className="mx-auto h-5 w-5 text-gold" strokeWidth={1.5} />
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Hours</p>
              <p className="mt-1 font-body text-sm text-foreground">8AM – 6PM</p>
            </div>
            <div className="border border-border bg-muted/30 p-6">
              <MapPin className="mx-auto h-5 w-5 text-gold" strokeWidth={1.5} />
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Address</p>
              <p className="mt-1 font-body text-sm text-foreground">Nairobi, Kenya</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-cta flex items-center justify-center gap-2 bg-foreground px-8 py-3.5 text-[11px] text-primary-foreground transition-colors hover:bg-gold hover:text-obsidian"
            >
              <Phone className="h-4 w-4" /> Call Us
            </a>
            <a
              href={`https://wa.me/${PHONE_WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta flex items-center justify-center gap-2 bg-emerald-600 px-8 py-3.5 text-[11px] text-white transition-colors hover:bg-emerald-700"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
