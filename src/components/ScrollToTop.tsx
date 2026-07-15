import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router swaps route content without touching scroll position, so a
// navigation that happens mid-page would otherwise land the user mid-page.
// Snap (not smooth-scroll) to the top on every pathname change.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
