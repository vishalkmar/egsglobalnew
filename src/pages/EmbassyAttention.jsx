import MeaAttestationHero from '../components/MeaAttention/MeaAttentionBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MeaDocumentsSection from '../components/MeaAttention/MeaAttentionDocument';
import MeaAttestationProcedureFlow from '../components/MeaAttention/MeaAttestationProcedure';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EmbassyAttention() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <Header />
      <MeaAttestationHero />

      {/* MEA Information Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 mb-6" data-aos="fade-down">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#294d6b" }} />
            <span className="text-sm font-medium" style={{ color: "#294d6b" }}>Government Authority</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: "#294d6b" }} data-aos="fade-up">
            Ministry of External Affairs (MEA)
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4" data-aos="fade-up" data-aos-delay="100">
            The Ministry of External Affairs is the apex authority in India for
            authenticating documents issued within the country. To make Indian
            documents valid for use in India and abroad, MEA either attests them
            or issues an Apostille stamp, depending on the destination country and
            the applicant's requirement.
          </p>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            As a central government body managing international relations, MEA
            attestation is considered a key step in the document legalization
            process. Since 1 March 2012, the collection and delivery of documents
            for Attestation and Apostille services has been outsourced to
            MEA-approved agencies, and individuals now submit their originals only
            through these authorised service providers.
          </p>

          <div className="flex justify-center mt-8" data-aos="fade-up" data-aos-delay="300">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: "#294d6b" }} />
          </div>
        </div>
      </section>

      <MeaDocumentsSection />
      <MeaAttestationProcedureFlow />
      <Footer />
    </>
  );
}