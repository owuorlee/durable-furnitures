import { Search, Heart, Repeat2, ShoppingBag } from "lucide-react";

const IconWithBadge = ({
  icon: Icon,
  count,
  label,
}: {
  icon: typeof Heart;
  count: number;
  label: string;
}) => (
  <button
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
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:gap-6">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <h1 className="font-display text-2xl font-light tracking-[0.15em] text-foreground">
            DURABLE
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Furniture House
          </p>
        </a>

        {/* Tagline / hours */}
        <div className="hidden lg:block lg:flex-shrink-0">
          <div className="border-l border-border pl-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Open Today
            </p>
            <p className="font-body text-sm text-foreground">
              9AM – <span className="text-gold">6PM</span>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 md:px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for sofas, beds, dining sets..."
              className="text-cta h-11 w-full border border-border bg-muted/30 pl-11 pr-4 text-xs font-normal normal-case tracking-normal text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              style={{ letterSpacing: 0 }}
            />
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-6 md:flex-shrink-0">
          <IconWithBadge icon={Heart} count={2} label="Wishlist" />
          <IconWithBadge icon={Repeat2} count={0} label="Compare" />
          <IconWithBadge icon={ShoppingBag} count={3} label="Cart" />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
