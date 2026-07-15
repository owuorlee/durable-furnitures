import UtilityBar from "@/components/UtilityBar";
import MainHeader from "@/components/MainHeader";
import CategoryNav from "@/components/CategoryNav";
import PromoHero from "@/components/PromoHero";
import PopularCategories from "@/components/PopularCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Gallery from "@/components/Gallery";
import ValueProps from "@/components/ValueProps";

import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, localBusinessSchema, websiteSchema } from "@/lib/seo";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Seo
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        path="/"
        jsonLd={[websiteSchema(), localBusinessSchema()]}
      />
      <UtilityBar />
      <MainHeader />
      <CategoryNav />
      <PromoHero />
      <PopularCategories />
      <FeaturedProducts />
      <Gallery />
      <ValueProps />
      
      <Testimonials />
      
      <CTABanner />
      <Footer />
    </main>
  );
};

export default Index;
