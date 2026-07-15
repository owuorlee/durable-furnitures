import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Filter as FilterIcon } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ProductCard from "@/components/shop/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { categories, getCategory, getProductsByCategory, formatKsh, Product, products as ALL } from "@/data/products";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { StarRating } from "@/components/shop/StarRating";
import Seo from "@/components/Seo";
import { breadcrumbSchema, categoryItemListSchema } from "@/lib/seo";

type Density = 2 | 3 | 4;
type Sort = "default" | "price-asc" | "price-desc" | "newest" | "rating";

const densityClass: Record<Density, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

const TopRatedWidget = ({ items }: { items: Product[] }) => (
  <div>
    <h3 className="mb-4 font-display text-lg font-light text-foreground">Top Rated Products</h3>
    <ul className="space-y-4">
      {items.map((p) => (
        <li key={p.id}>
          <Link to={`/product/${p.slug}`} className="group flex gap-3">
            <img src={p.image} alt={p.name} className="h-16 w-16 flex-shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-body text-xs font-semibold text-foreground group-hover:text-gold">
                {p.name}
              </p>
              <StarRating rating={p.rating} size={12} />
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-body text-[10px] text-muted-foreground line-through">
                  {formatKsh(p.original)}
                </span>
                <span className="font-body text-xs font-bold text-gold">{formatKsh(p.sale)}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SidebarFilters = ({
  range, setRange, applied, setApplied, onSale, setOnSale, inStock, setInStock, topRated, max,
}: {
  range: [number, number];
  setRange: (v: [number, number]) => void;
  applied: [number, number];
  setApplied: (v: [number, number]) => void;
  onSale: boolean;
  setOnSale: (v: boolean) => void;
  inStock: boolean;
  setInStock: (v: boolean) => void;
  topRated: Product[];
  max: number;
}) => (
  <div className="space-y-8">
    <div>
      <h3 className="mb-4 font-display text-lg font-light text-foreground">Filter By Price</h3>
      <Slider
        min={0}
        max={max}
        step={1000}
        value={range}
        onValueChange={(v) => setRange(v as [number, number])}
        className="my-6"
      />
      <p className="mb-4 font-body text-xs text-muted-foreground">
        Price: <span className="text-foreground">{formatKsh(range[0])} — {formatKsh(range[1])}</span>
      </p>
      <button
        onClick={() => setApplied(range)}
        className="text-cta bg-foreground px-6 py-2.5 text-[11px] text-primary-foreground hover:bg-gold hover:text-obsidian"
      >
        Filter
      </button>
    </div>

    <div>
      <h3 className="mb-4 font-display text-lg font-light text-foreground">Stock Status</h3>
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox checked={onSale} onCheckedChange={(v) => setOnSale(!!v)} />
          <span className="font-body text-sm text-foreground">On sale</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox checked={inStock} onCheckedChange={(v) => setInStock(!!v)} />
          <span className="font-body text-sm text-foreground">In stock</span>
        </label>
      </div>
    </div>

    <div className="border-t border-border pt-6">
      <TopRatedWidget items={topRated} />
    </div>
  </div>
);

const Category = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const category = getCategory(slug);
  const all = useMemo(() => getProductsByCategory(slug), [slug]);
  const maxPrice = useMemo(() => Math.max(50000, ...ALL.map((p) => p.original)), []);

  const [range, setRange] = useState<[number, number]>([0, maxPrice]);
  const [applied, setApplied] = useState<[number, number]>([0, maxPrice]);
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [perPage, setPerPage] = useState(9);
  const [density, setDensity] = useState<Density>(3);
  const [sort, setSort] = useState<Sort>("default");
  const [page, setPage] = useState(1);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = all.filter((p) => p.sale >= applied[0] && p.sale <= applied[1]);
    if (onSale) list = list.filter((p) => p.sale < p.original);
    if (inStock) list = list; // all are in stock in mock
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.sale - b.sale); break;
      case "price-desc": list = [...list].sort((a, b) => b.sale - a.sale); break;
      case "newest": list = [...list].sort((a, b) => Number(b.id) - Number(a.id)); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [all, applied, onSale, inStock, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * perPage, safePage * perPage);
  const topRated = useMemo(() => [...all].sort((a, b) => b.rating - a.rating).slice(0, 4), [all]);

  if (!category) {
    return (
      <main className="min-h-screen">
        <UtilityBar />
        <MainHeader />
        <CategoryNav />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="font-display text-3xl">Category not found</h1>
          <button onClick={() => navigate("/")} className="text-cta mt-6 bg-foreground px-6 py-3 text-[11px] text-primary-foreground hover:bg-gold hover:text-obsidian">
            Back to Home
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/" },
    { label: category.name },
  ];

  return (
    <main className="min-h-screen">
      <Seo
        title={`${category.name} in Nairobi, Kenya | Durable Furniture House`}
        description={category.metaDescription}
        path={`/category/${category.slug}`}
        image={category.image}
        jsonLd={[
          breadcrumbSchema([...crumbs.slice(0, 2), { label: category.name, to: `/category/${category.slug}` }]),
          categoryItemListSchema(category, all),
        ]}
      />
      <UtilityBar />
      <MainHeader />
      <CategoryNav />

      <section className="bg-muted/20 px-6 py-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 font-display text-3xl font-light tracking-wide text-foreground md:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
            {category.intro}
          </p>
          <p className="mt-2 font-body text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>
      </section>

      <section className="bg-background px-6 py-10">
        <div className="mx-auto flex max-w-7xl gap-8">
          {/* Desktop sidebar */}
          <aside className="sticky top-20 hidden h-fit w-[260px] flex-shrink-0 lg:block">
            <SidebarFilters
              range={range} setRange={setRange}
              applied={applied} setApplied={setApplied}
              onSale={onSale} setOnSale={setOnSale}
              inStock={inStock} setInStock={setInStock}
              topRated={topRated} max={maxPrice}
            />
          </aside>

          <div className="min-w-0 flex-1">
            {/* Top control bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="text-cta flex items-center gap-2 border border-border px-4 py-2 text-[11px] text-foreground lg:hidden">
                      <FilterIcon className="h-4 w-4" />
                      Filters
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto bg-background p-6">
                    <SidebarFilters
                      range={range} setRange={setRange}
                      applied={applied} setApplied={setApplied}
                      onSale={onSale} setOnSale={setOnSale}
                      inStock={inStock} setInStock={setInStock}
                      topRated={topRated} max={maxPrice}
                    />
                  </SheetContent>
                </Sheet>

                <div className="hidden items-center gap-2 font-body text-xs text-muted-foreground sm:flex">
                  Show:
                  {[9, 12, 18, 24].map((n) => (
                    <button
                      key={n}
                      onClick={() => { setPerPage(n); setPage(1); }}
                      className={`px-1 ${perPage === n ? "font-bold text-gold" : "hover:text-foreground"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-1 md:flex">
                  {([2, 3, 4] as Density[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDensity(d)}
                      aria-label={`${d} columns`}
                      className={`p-1.5 transition-colors ${density === d ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <LayoutGrid className="h-4 w-4" strokeWidth={1.5} />
                      <span className="sr-only">{d}-col</span>
                    </button>
                  ))}
                </div>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="text-cta border border-border bg-background px-3 py-2 text-[11px] text-foreground focus:border-gold focus:outline-none"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {visible.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-body text-sm text-muted-foreground">No products match your filters.</p>
              </div>
            ) : (
              <motion.div
                key={`${density}-${safePage}-${sort}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`grid gap-5 ${densityClass[density]}`}
              >
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  disabled={safePage === 1}
                  onClick={() => setPage(safePage - 1)}
                  className="text-cta border border-border px-3 py-2 text-[11px] disabled:opacity-30 hover:border-gold hover:text-gold"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`text-cta h-9 w-9 border text-[11px] transition-colors ${
                      safePage === n
                        ? "border-gold bg-gold text-obsidian"
                        : "border-border text-foreground hover:border-gold hover:text-gold"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  disabled={safePage === totalPages}
                  onClick={() => setPage(safePage + 1)}
                  className="text-cta border border-border px-3 py-2 text-[11px] disabled:opacity-30 hover:border-gold hover:text-gold"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </main>
  );
};

export default Category;
