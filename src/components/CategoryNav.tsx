import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navStructure, categories } from "@/data/products";

const CategoryNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gold/30 bg-gold shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-cta flex items-center gap-2 py-3 text-xs text-obsidian md:hidden"
        >
          <Menu className="h-4 w-4" />
          Browse Categories
        </button>

        <ul className="hidden items-center md:flex">
          {navStructure.map((item) => {
            const childCats = item.children
              .map((slug) => categories.find((c) => c.slug === slug))
              .filter(Boolean) as typeof categories;
            const targetSlug = childCats[0]?.slug;
            return (
              <li key={item.slug} className="group relative">
                <Link
                  to={targetSlug ? `/category/${targetSlug}` : "/"}
                  className="text-cta flex items-center gap-1.5 px-5 py-4 text-[11px] text-obsidian transition-colors hover:bg-obsidian/10"
                >
                  {item.name}
                  {childCats.length > 0 && (
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {childCats.length > 0 && (
                  <div className="invisible absolute left-0 top-full min-w-[220px] border border-border bg-background opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <ul className="py-2">
                      {childCats.map((child) => (
                        <li key={child.slug}>
                          <Link
                            to={`/category/${child.slug}`}
                            className="block px-5 py-2.5 font-body text-sm text-foreground transition-colors hover:bg-muted hover:text-gold"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {mobileOpen && (
          <ul className="border-t border-obsidian/10 pb-2 md:hidden">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/category/${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-cta block py-2.5 text-xs text-obsidian"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default CategoryNav;
