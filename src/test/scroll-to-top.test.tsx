import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

// A minimal page that links onward, so we can walk the same navigation
// chains a shopper follows on the real site.
const Page = ({ name, next }: { name: string; next: string }) => (
  <div>
    <h1>{name}</h1>
    <Link to={next}>next-link</Link>
  </div>
);

const renderApp = () =>
  render(
    <MemoryRouter initialEntries={["/"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Page name="home" next="/category/coffee-tables" />} />
        <Route path="/category/:slug" element={<Page name="category" next="/product/first" />} />
        <Route path="/product/first" element={<Page name="product-1" next="/product/related" />} />
        <Route path="/product/related" element={<Page name="product-2" next="/about" />} />
        <Route path="/about" element={<Page name="about" next="/track-order" />} />
        <Route path="/track-order" element={<Page name="track" next="/wishlist" />} />
        <Route path="/wishlist" element={<Page name="wishlist" next="/product/first" />} />
      </Routes>
    </MemoryRouter>,
  );

describe("ScrollToTop", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it("scrolls to the very top instantly on every route navigation", () => {
    renderApp();
    const scrollTo = window.scrollTo as ReturnType<typeof vi.fn>;
    const countAfterMount = scrollTo.mock.calls.length;

    // Walk: home -> category -> product -> related product -> about
    //       -> track order -> wishlist -> product  (7 navigations)
    const hops = [
      "category",
      "product-1",
      "product-2",
      "about",
      "track",
      "wishlist",
      "product-1",
    ];
    hops.forEach((expectedPage, i) => {
      fireEvent.click(screen.getByText("next-link"));
      expect(screen.getByRole("heading", { name: expectedPage })).toBeInTheDocument();
      expect(scrollTo).toHaveBeenCalledTimes(countAfterMount + i + 1);
      expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: "instant" });
    });
  });

  it("does not scroll again when the pathname is unchanged", () => {
    renderApp();
    const scrollTo = window.scrollTo as ReturnType<typeof vi.fn>;
    const countAfterMount = scrollTo.mock.calls.length;

    // Re-render without navigation must not re-trigger the effect.
    fireEvent.click(screen.getByRole("heading", { name: "home" }));
    expect(scrollTo).toHaveBeenCalledTimes(countAfterMount);
  });
});
