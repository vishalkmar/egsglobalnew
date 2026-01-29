
import AOS from "aos";
import "aos/dist/aos.css";

const MeaAttestationHero = () => {
 
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-black py-14 md:pt-36 md:pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/meattestationheader.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h1
            data-aos="fade-down"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            Ministry of External Affairs – MEA Attestation
          </h1>
          <p
            data-aos="fade-left"
            className="mt-3 text-sm sm:text-base text-slate-100/90 max-w-3xl mx-auto leading-relaxed"
          >
            EGS Group provides end-to-end support for MEA attestation of personal,
            educational and commercial documents. From authentication to MEA
            stamping and safe delivery, we manage the entire process.
          </p>
        </div>


      </div>
    </section>
  );
};

export default MeaAttestationHero;
