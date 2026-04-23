import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products, formatKsh } from "@/data/products";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = query.length >= 3
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  const showDropdown = open && query.length >= 3;

  const goTo = (slug: string) => {
    navigate(`/product/${slug}`);
    setOpen(false);
    setQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[0]) goTo(results[0].slug);
  };

  return (
    <div className="relative" ref={ref}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for sofas, beds, dining sets..."
          className="text-cta h-11 w-full border border-border bg-muted/30 pl-11 pr-4 text-xs font-normal normal-case tracking-normal text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          style={{ letterSpacing: 0 }}
        />
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-y-auto border border-border bg-background shadow-xl">
          {results.length > 0 ? (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => goTo(p.slug)}
                    className="flex w-full items-center gap-3 border-b border-border px-3 py-2.5 text-left transition-colors hover:bg-muted"
                  >
                    <img src={p.image} alt={p.name} className="h-12 w-12 flex-shrink-0 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="font-body text-xs text-gold">{formatKsh(p.sale)}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center font-body text-xs text-muted-foreground">
              No products found for "{query}". Try browsing categories.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
