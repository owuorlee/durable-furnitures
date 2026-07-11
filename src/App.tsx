import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/context/ShopContext";
import CartDrawer from "@/components/shop/CartDrawer";
import Index from "./pages/Index.tsx";
import Category from "./pages/Category.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import About from "./pages/About.tsx";
import TrackOrder from "./pages/TrackOrder.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShopProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartDrawer />
        </BrowserRouter>
      </ShopProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
