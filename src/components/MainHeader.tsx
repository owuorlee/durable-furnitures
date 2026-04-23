import { Heart, Repeat2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "@/context/ShopContext";
import SearchBar from "@/components/shop/SearchBar";

const IconWithBadge = ({
  icon: Icon,
  count,
  label,
  onClick,
}: {
  icon: typeof Heart;
  count: number;
  label: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="relative text-foreground transition-colors hover:text-gold"
  >
    <Icon className="h-5 w-5" strokeWidth={1.5} />
    {count > 0 && (
      <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-obsidian">
        {count}
      </span>
    )}
  </button>
);

const MainHeader = () => {
  const { wishlistCount, cartCount, setCartOpen } = useShop();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:gap-6">
        <Link to="/" className="flex-shrink-0">
          <h1 className="font-display text-2xl font-light tracking-[0.15em] text-foreground">
            DURABLE
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Furniture House
          </p>
        </Link>

        <div className="hidden lg:block lg:flex-shrink-0">
          <div className="border-l border-border pl-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Open Today</p>
            <p className="font-body text-sm text-foreground">
              9AM – <span className="text-gold">6PM</span>
            </p>
          </div>
        </div>

        <div className="flex-1 md:px-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-6 md:flex-shrink-0">
          <IconWithBadge icon={Heart} count={wishlistCount} label="Wishlist" />
          <IconWithBadge icon={Repeat2} count={0} label="Compare" />
          <IconWithBadge icon={ShoppingBag} count={cartCount} label="Cart" onClick={() => setCartOpen(true)} />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
