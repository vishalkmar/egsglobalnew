import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import CountriesSection from "@/components/CountriesSection";
import ServicesSection from "@/components/ServicesSection";
import ContactFormSection from "@/components/ContactFormSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <HeroCarousel />
        <WhyChooseUs />
        <CountriesSection />
        <ServicesSection />
        <ContactFormSection
          compact
          title="Let us plan the right service for you"
          description="Home page se hi direct enquiry bhej do. Visa, attestation, insurance ya document courier support ke liye team aapse jaldi connect karegi."
        />
      </main>
      <Footer />
    </div>
  );
}
