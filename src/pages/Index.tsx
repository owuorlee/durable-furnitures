import HeroSection from "@/components/HeroSection";
import BrandStatement from "@/components/BrandStatement";
import CategoryGrid from "@/components/CategoryGrid";
import ValueProps from "@/components/ValueProps";
import FeaturedProduct from "@/components/FeaturedProduct";
import Testimonials from "@/components/Testimonials";
import LifestyleGallery from "@/components/LifestyleGallery";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <BrandStatement />
      <CategoryGrid />
      <ValueProps />
      <FeaturedProduct />
      <Testimonials />
      <LifestyleGallery />
      <CTABanner />
      <Footer />
    </main>
  );
};

export default Index;
