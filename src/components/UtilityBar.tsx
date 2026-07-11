import { User } from "lucide-react";
import { Link } from "react-router-dom";

const UtilityBar = () => {
  return (
    <div className="border-b border-border bg-obsidian text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-1.5 px-6 py-2 text-xs md:flex-row md:justify-between md:gap-4">
        <p className="text-center font-body tracking-wide text-ivory/80 md:text-left">
          Free delivery within Nairobi & Kiambu <span className="mx-2 text-gold/60">|</span> Payment on Delivery
        </p>
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/about" className="font-body text-ivory/80 transition-colors hover:text-gold">
            About Us
          </Link>
          <Link to="/track-order" className="font-body text-ivory/80 transition-colors hover:text-gold">
            Track Order
          </Link>
          <a href="#" aria-label="Account" className="text-ivory/80 transition-colors hover:text-gold">
            <User className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
