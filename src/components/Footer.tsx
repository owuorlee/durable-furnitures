import { Instagram, Facebook, MessageCircle } from "lucide-react";
import BrandMark from "@/components/BrandMark";

const Footer = () => {
  return (
    <footer className="bg-foreground px-6 py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <BrandMark className="h-9 w-9 text-ivory" />
              <div>
                <h3 className="font-display text-lg font-light tracking-[0.15em] text-ivory">
                  DURABLE
                </h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                  Furniture House
                </p>
              </div>
            </div>
            <p className="font-body text-xs leading-relaxed text-ivory/60">
              Kenya's Premier Luxury Furniture House. Crafting timeless pieces since 2018.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-cta mb-4 text-xs text-ivory/80">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm text-ivory/50">
              <li><a href="#categories" className="transition-colors hover:text-gold">Collections</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">About Us</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">Delivery Info</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">Contact</a></li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="text-cta mb-4 text-xs text-ivory/80">Payment Methods</h4>
            <div className="flex gap-4 font-body text-xs text-ivory/50">
              <span className="rounded border border-ivory/20 px-3 py-1.5">M-Pesa</span>
              <span className="rounded border border-ivory/20 px-3 py-1.5">Visa</span>
              <span className="rounded border border-ivory/20 px-3 py-1.5">Mastercard</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cta mb-4 text-xs text-ivory/80">Get in Touch</h4>
            <p className="mb-3 font-body text-sm text-ivory/50">Nairobi, Kenya</p>
            <div className="mb-4 flex items-center gap-2 text-ivory/50">
              <MessageCircle className="h-4 w-4" />
              <span className="font-body text-sm">+254 7XX XXX XXX</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-ivory/40 transition-colors hover:text-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-ivory/40 transition-colors hover:text-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-ivory/40 transition-colors hover:text-gold">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.8.1V9a6.33 6.33 0 00-.8-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.21 8.21 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-ivory/10 pt-8 text-center">
          <p className="font-body text-xs text-ivory/40">
            © 2026 Durable Furniture Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
