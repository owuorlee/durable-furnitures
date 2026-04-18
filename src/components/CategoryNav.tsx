import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Sofas", children: ["L-Shaped Sofas", "5-Seater Sofas", "Chester Seats", "Recliners"] },
  { name: "Bedroom", children: ["Chester Beds", "Wooden Beds", "Mirror Beds", "Headboards"] },
  { name: "Living Room", children: ["Coffee Tables", "TV Stands", "Side Tables", "Wing Chairs"] },
  { name: "Chairs", children: ["Accent Chairs", "Dining Chairs", "Office Chairs"] },
  { name: "Dining Table Designs", children: ["6-Seater", "8-Seater", "Mahogany Sets"] },
  { name: "Doors & Frames", children: ["Mahogany Doors", "Oak Doors", "Frames"] },
];

const CategoryNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gold/30 bg-gold shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-cta flex items-center gap-2 py-3 text-xs text-obsidian md:hidden"
        >
          <Menu className="h-4 w-4" />
          Browse Categories
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center md:flex">
          {navItems.map((item) => (
            <li key={item.name} className="group relative">
              <button className="text-cta flex items-center gap-1.5 px-5 py-4 text-[11px] text-obsidian transition-colors hover:bg-obsidian/10">
                {item.name}
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full min-w-[220px] border border-border bg-background opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <ul className="py-2">
                  {item.children.map((child) => (
                    <li key={child}>
                      <a
                        href="#"
                        className="block px-5 py-2.5 font-body text-sm text-foreground transition-colors hover:bg-muted hover:text-gold"
                      >
                        {child}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* Mobile nav */}
        {mobileOpen && (
          <ul className="border-t border-obsidian/10 pb-2 md:hidden">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className="text-cta block py-2.5 text-xs text-obsidian"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default CategoryNav;
