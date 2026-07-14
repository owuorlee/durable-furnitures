import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid3x3, Minus, Plus, ShoppingBag, Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ProductCard from "@/components/shop/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { StarRating } from "@/components/shop/StarRating";
import { getProduct, products, formatKsh, Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const PHONE_WA = "254741530539";

type Review = { id: string; name: string; rating: number; text: string; date: string };

const initialReviews: Review[] = [
  { id: "r1", name: "James K.", rating: 5, text: "Stunning craftsmanship — exceeded expectations.", date: "March 2026" },
  { id: "r2", name: "Wanjiru M.", rating: 4, text: "Beautiful piece, delivery was prompt to Karen.", date: "Feb 2026" },
];

const ProductPage = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const product = getProduct(slug);
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useShop();

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ name: "", email: "", text: "", rating: 5 });
  const [hoverStar, setHoverStar] = useState(0);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const related = useMemo(
    () => product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6) : [],
    [product],
  );

  // Prev/next stays within the current product's category so browsing
  // neighbours never jumps into an unrelated collection.
  const categoryProducts = useMemo(
    () => (product ? products.filter((p) => p.category === product.category) : []),
    [product],
  );
  const productIndex = useMemo(
    () => categoryProducts.findIndex((p) => p.slug === slug),
    [categoryProducts, slug],
  );
  const prev = productIndex > 0 ? categoryProducts[productIndex - 1] : null;
  const next =
    productIndex >= 0 && productIndex < categoryProducts.length - 1
      ? categoryProducts[productIndex + 1]
      : null;

  if (!product) {
    return (
      <main className="min-h-screen">
        <UtilityBar />
        <MainHeader />
        <CategoryNav />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="font-display text-3xl">Product not found</h1>
          <button onClick={() => navigate("/")} className="text-cta mt-6 bg-foreground px-6 py-3 text-[11px] text-primary-foreground hover:bg-gold hover:text-obsidian">
            Back to Home
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const discount = Math.round(((product.original - product.sale) / product.original) * 100);
  const savings = product.original - product.sale;
  const wished = isWishlisted(product.id);

  const crumbs = [
    { label: "Home", to: "/" },
    { label: product.categoryName, to: `/category/${product.category}` },
    { label: product.name },
  ];

  const aggregate = reviews.length
    ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
    : 0;
  const distribution = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => Math.round(r.rating) === s).length,
  }));

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) {
      toast.error("Please add your name and review");
      return;
    }
    setReviews([
      { id: `r${Date.now()}`, name: newReview.name, rating: newReview.rating, text: newReview.text, date: "Just now" },
      ...reviews,
    ]);
    setNewReview({ name: "", email: "", text: "", rating: 5 });
    toast.success("Review submitted ✓");
  };

  return (
    <main className="min-h-screen">
      <UtilityBar />
      <MainHeader />
      <CategoryNav />

      <section className="bg-background px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <Breadcrumbs items={crumbs} />
            <div className="flex items-center gap-1">
              <button
                disabled={!prev}
                onClick={() => prev && navigate(`/product/${prev.slug}`)}
                aria-label="Previous product"
                className="border border-border p-2 text-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <Link
                to={`/category/${product.category}`}
                aria-label="Back to grid"
                className="border border-border p-2 text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <Grid3x3 className="h-4 w-4" />
              </Link>
              <button
                disabled={!next}
                onClick={() => next && navigate(`/product/${next.slug}`)}
                aria-label="Next product"
                className="border border-border p-2 text-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[55%_45%]">
            {/* Gallery */}
            <div>
              <div className="group relative aspect-square overflow-hidden bg-muted">
                <span className="absolute right-4 top-4 z-10 bg-gold px-3 py-1.5 font-body text-xs font-semibold text-obsidian">
                  -{discount}%
                </span>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.gallery[activeImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </AnimatePresence>
              </div>
              {product.gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {product.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square overflow-hidden border-2 transition-colors ${
                        activeImage === i ? "border-gold" : "border-border hover:border-gold/50"
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="font-display text-3xl font-light leading-tight text-foreground md:text-4xl">
                {product.name}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <StarRating rating={product.rating} />
                <span className="font-body text-xs text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-body text-base text-muted-foreground line-through">
                  {formatKsh(product.original)}
                </span>
                <span className="font-display text-3xl font-light text-gold">
                  {formatKsh(product.sale)}
                </span>
              </div>
              <span className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 font-body text-xs font-semibold text-emerald-800">
                You save {formatKsh(savings)} ({discount}%)
              </span>

              <div className="mt-8 space-y-4 border-y border-border py-6">
                <div className="flex items-center gap-4">
                  <span className="w-20 font-body text-xs uppercase tracking-wider text-muted-foreground">Color</span>
                  <div className="flex gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveColor(i)}
                        aria-label={`Color ${i + 1}`}
                        className={`h-7 w-7 rounded-full border-2 transition-all ${
                          activeColor === i ? "border-gold ring-2 ring-gold/30" : "border-border"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 font-body text-xs uppercase tracking-wider text-muted-foreground">Material</span>
                  <span className="font-body text-sm text-foreground">Mahogany & Linen</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 font-body text-xs uppercase tracking-wider text-muted-foreground">Quantity</span>
                  <div className="flex items-center border border-border">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted" aria-label="Decrease">
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                      className="w-14 border-x border-border bg-background py-2 text-center font-body text-sm focus:outline-none"
                    />
                    <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-muted" aria-label="Increase">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(`Hi, I'd like to order ${qty} × ${product.name} (${formatKsh(product.sale)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cta flex w-full items-center justify-center gap-2 bg-emerald-600 py-4 text-[11px] text-white transition-colors hover:bg-emerald-700"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Order via WhatsApp
                </a>
                <button
                  onClick={() => {
                    addToCart(product.id, qty);
                    toast.success("Added to cart ✓", { description: product.name });
                  }}
                  className="text-cta flex w-full items-center justify-center gap-2 bg-foreground py-4 text-[11px] text-primary-foreground transition-colors hover:bg-foreground/90"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToCart(product.id, qty);
                    setCartOpen(true);
                  }}
                  className="text-cta w-full bg-gold py-4 text-[11px] text-obsidian transition-colors hover:bg-foreground hover:text-primary-foreground"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast(wished ? "Removed from wishlist" : "Saved to wishlist ♡");
                  }}
                  className={`w-full border py-3 font-body text-xs transition-colors ${
                    wished ? "border-gold bg-gold/10 text-gold" : "border-border text-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  {wished ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
                {[
                  { icon: Truck, label: "Free Delivery in Nairobi" },
                  { icon: ShieldCheck, label: "Secure Order" },
                  { icon: RotateCcw, label: "Easy Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                    <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="h-auto w-full justify-start rounded-none border-b border-border bg-transparent p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-3 font-body text-sm uppercase tracking-wider data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-3 font-body text-sm uppercase tracking-wider data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Reviews ({reviews.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="pt-8">
                <p className="mb-8 font-body text-sm leading-relaxed text-foreground/80">
                  {product.description}
                </p>
                <table className="w-full border-collapse border border-border">
                  <tbody>
                    {product.attributes.map((a, i) => (
                      <tr key={a.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="w-1/3 border border-border px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {a.label}
                        </td>
                        <td className="border border-border px-4 py-3 font-body text-sm text-foreground">
                          {a.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>

              <TabsContent value="reviews" className="pt-8">
                <div className="mb-8 grid gap-6 border border-border bg-muted/20 p-6 md:grid-cols-[200px_1fr]">
                  <div className="text-center">
                    <p className="font-display text-5xl text-gold">{aggregate.toFixed(1)}</p>
                    <StarRating rating={aggregate} />
                    <p className="mt-2 font-body text-xs text-muted-foreground">{reviews.length} reviews</p>
                  </div>
                  <div className="space-y-1.5">
                    {distribution.map((d) => {
                      const pct = reviews.length ? (d.count / reviews.length) * 100 : 0;
                      return (
                        <div key={d.star} className="flex items-center gap-3">
                          <span className="w-8 font-body text-xs text-muted-foreground">{d.star}★</span>
                          <div className="h-2 flex-1 bg-border">
                            <div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-8 text-right font-body text-xs text-muted-foreground">{d.count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 font-display text-lg font-light">Customer Reviews</h3>
                    {reviews.length === 0 ? (
                      <p className="font-body text-sm text-muted-foreground">No reviews yet — be the first!</p>
                    ) : (
                      <ul className="space-y-5">
                        {reviews.map((r) => (
                          <li key={r.id} className="border-b border-border pb-5">
                            <div className="flex items-center justify-between">
                              <p className="font-body text-sm font-semibold text-foreground">{r.name}</p>
                              <span className="font-body text-xs text-muted-foreground">{r.date}</span>
                            </div>
                            <StarRating rating={r.rating} size={12} />
                            <p className="mt-2 font-body text-sm text-foreground/80">{r.text}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-4 font-display text-lg font-light">Write a Review</h3>
                    <form onSubmit={submitReview} className="space-y-4">
                      <div>
                        <label className="mb-2 block font-body text-xs uppercase tracking-wider text-muted-foreground">
                          Your Rating
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onMouseEnter={() => setHoverStar(s)}
                              onMouseLeave={() => setHoverStar(0)}
                              onClick={() => setNewReview({ ...newReview, rating: s })}
                            >
                              <Star
                                className={`h-6 w-6 transition-colors ${
                                  s <= (hoverStar || newReview.rating)
                                    ? "fill-gold text-gold"
                                    : "fill-none text-muted-foreground/40"
                                }`}
                                strokeWidth={1.5}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        placeholder="Your review..."
                        rows={4}
                        className="w-full border border-border bg-background p-3 font-body text-sm focus:border-gold focus:outline-none"
                      />
                      <input
                        type="text"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder="Name"
                        className="w-full border border-border bg-background p-3 font-body text-sm focus:border-gold focus:outline-none"
                      />
                      <input
                        type="email"
                        value={newReview.email}
                        onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                        placeholder="Email"
                        className="w-full border border-border bg-background p-3 font-body text-sm focus:border-gold focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="text-cta w-full bg-gold py-3 text-[11px] text-obsidian transition-colors hover:bg-foreground hover:text-primary-foreground"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 font-display text-3xl font-light tracking-wide text-foreground">
                You Might Also Like
              </h2>
              <div className="-mx-6 overflow-x-auto px-6 pb-4">
                <div className="flex gap-5">
                  {related.map((p) => (
                    <div key={p.id} className="w-[260px] flex-shrink-0">
                      <ProductCard product={p} onQuickView={setQuickView} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </main>
  );
};

export default ProductPage;
