import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, MessageCircle, Package, Search } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Order, ORDER_STAGES, orders as staticOrders } from "@/data/orders";

const PHONE_WA = "254741530539";

// Look an order up in BOTH the manually maintained list (src/data/orders.ts)
// and the localStorage store where the app auto-saves orders created by the
// checkout flow.
const findOrder = (id: string): Order | null => {
  const key = id.trim().toUpperCase();
  const fromStatic = staticOrders.find((o) => o.id.toUpperCase() === key);
  if (fromStatic) return fromStatic;
  try {
    const raw = localStorage.getItem("durable-orders");
    if (!raw) return null;
    const list: Order[] = JSON.parse(raw);
    return list.find((o) => o.id.toUpperCase() === key) ?? null;
  } catch {
    return null;
  }
};

const TrackOrder = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    setSearched(true);
    setTimeout(() => {
      const found = findOrder(input);
      if (found) setOrder(found);
      else setError("We couldn't find an order with that ID. Please check and try again.");
      setLoading(false);
    }, 500);
  };

  const activeIdx = order ? ORDER_STAGES.findIndex((s) => s.key === order.status) : -1;

  return (
    <main className="min-h-screen">
      <UtilityBar />
      <MainHeader />
      <CategoryNav />

      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-cta text-[10px] text-gold">Order Tracking</p>
          <h1 className="mt-3 font-display text-3xl font-light text-foreground md:text-5xl">
            Track Your Order
          </h1>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />
          <p className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
            Enter the Order ID from your confirmation to see the latest status of your delivery.
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. DFH-A9F3K2"
                className="w-full border border-border bg-background py-3.5 pl-11 pr-4 font-body text-sm tracking-wider text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-cta flex items-center justify-center gap-2 bg-foreground px-8 py-3.5 text-[11px] text-primary-foreground transition-colors hover:bg-gold hover:text-obsidian disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Track Order"}
            </button>
          </form>

          {searched && !loading && (
            <p className="mt-4 font-body text-xs text-muted-foreground">
              Try demo IDs: <span className="text-gold">DFH-DEMO01</span> or{" "}
              <span className="text-gold">DFH-DEMO02</span>
            </p>
          )}
        </div>

        {error && (
          <div className="mx-auto mt-10 max-w-xl border border-destructive/30 bg-destructive/5 p-5 text-center">
            <p className="font-body text-sm text-destructive">{error}</p>
          </div>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-14 max-w-3xl"
          >
            {/* Timeline */}
            <div className="border border-border bg-muted/20 p-6 md:p-10">
              <div className="mb-8 flex items-center gap-3">
                <Package className="h-5 w-5 text-gold" />
                <h2 className="font-display text-xl text-foreground">Order Progress</h2>
              </div>

              <ol className="space-y-6">
                {ORDER_STAGES.map((stage, i) => {
                  const isDone = i < activeIdx;
                  const isActive = i === activeIdx;
                  return (
                    <li key={stage.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            isDone
                              ? "border-gold bg-gold text-obsidian"
                              : isActive
                                ? "border-gold bg-background text-gold"
                                : "border-border bg-background text-muted-foreground/50"
                          }`}
                        >
                          {isDone ? (
                            <Check className="h-4 w-4" strokeWidth={3} />
                          ) : (
                            <span className="font-body text-xs font-semibold">{i + 1}</span>
                          )}
                        </div>
                        {i < ORDER_STAGES.length - 1 && (
                          <div className={`mt-1 h-10 w-px ${isDone ? "bg-gold" : "bg-border"}`} />
                        )}
                      </div>
                      <div className={`flex-1 pb-2 text-left ${isActive ? "" : "opacity-70"}`}>
                        <p
                          className={`font-body text-sm font-semibold ${
                            isActive ? "text-gold" : isDone ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {stage.label}
                          {isActive && (
                            <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                              Current
                            </span>
                          )}
                        </p>
                        <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground">
                          {stage.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Summary */}
            <div className="mt-6 border border-border bg-background p-6 md:p-8">
              <h3 className="font-display text-lg text-foreground">Order Summary</h3>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Order ID</dt>
                  <dd className="mt-1 font-body text-sm font-semibold tracking-wider text-gold">{order.id}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Product</dt>
                  <dd className="mt-1 font-body text-sm text-foreground">{order.productName}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Delivery Address</dt>
                  <dd className="mt-1 font-body text-sm text-foreground">{order.address}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Estimated Delivery</dt>
                  <dd className="mt-1 font-body text-sm text-foreground">{order.estimatedDelivery}</dd>
                </div>
              </dl>

              <a
                href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                  `Hello, I would like to inquire about my order ID: ${order.id}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta mt-8 flex w-full items-center justify-center gap-2 bg-emerald-600 py-3.5 text-[11px] text-white transition-colors hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Us About This Order
              </a>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default TrackOrder;
