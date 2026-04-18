import { User } from "lucide-react";

const UtilityBar = () => {
  return (
    <div className="hidden border-b border-border bg-obsidian text-ivory md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
        <p className="font-body tracking-wide text-ivory/80">
          Free delivery in Nairobi on orders above{" "}
          <span className="text-gold">KSh 50,000</span>
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="font-body text-ivory/80 transition-colors hover:text-gold">
            About Us
          </a>
          <a href="#" className="font-body text-ivory/80 transition-colors hover:text-gold">
            Track Order
          </a>
          <a href="#" aria-label="Account" className="text-ivory/80 transition-colors hover:text-gold">
            <User className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
