import UtilityBar from "@/components/UtilityBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import PromoHero from "@/components/PromoHero";
import PopularCategories from "@/components/PopularCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Gallery from "@/components/Gallery";
import ValueProps from "@/components/ValueProps";

import Testimonials from "@/components/Testimonials";
import LifestyleGallery from "@/components/LifestyleGallery";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <UtilityBar />
      <MainHeader />
      <CategoryNav />
      <PromoHero />
      <PopularCategories />
      <FeaturedProducts />
      <Gallery />
      <ValueProps />
      
      <Testimonials />
      <LifestyleGallery />
      <CTABanner />
      <Footer />
    </main>
  );
};

export default Index;
