
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


const PccLegalizationHero = () => {



  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 120,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

 
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-black py-14 md:pt-36 md:pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
         style={{ backgroundImage: "url('/pcclegalisation/legalbanner.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h1
            data-aos="fade-down"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            PCC Legalization & Apostille
          </h1>
          <p
            data-aos="fade-left"
            className="mt-3 text-sm sm:text-base text-slate-100/90 max-w-3xl mx-auto leading-relaxed"
          >
            EGS Group provides complete PCC legalization support for
                employment, immigration, and long-term visa requirements with
                PSK, MEA and embassy coordination.
          </p>
        </div>


      </div>
    </section>
  );
};
export default PccLegalizationHero;
