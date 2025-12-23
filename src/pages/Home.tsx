import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import CountriesSection from "@/components/CountriesSection";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <HeroCarousel />
        <WhyChooseUs />
        <CountriesSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
