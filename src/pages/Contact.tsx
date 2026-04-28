import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactFormSection from "@/components/ContactFormSection";

const PRIMARY_COLOR = "#294d6b";

export default function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8]">
      <Header />
      <main className="flex-1 ">
        
        {/* Hero Banner - Increased Height */}
        <section className="relative overflow-hidden" style={{ backgroundColor: PRIMARY_COLOR }}>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center" data-aos="fade-up">
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white/90 text-sm font-medium">Get in Touch</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Let's Talk About Your
                <span className="block mt-2">Travel & Documentation Needs</span>
              </h1>
              
              <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
                Whether you need visa assistance, document attestation, or travel support — 
                our experts are ready to guide you.
              </p>
            </div>
          </div>
          
          {/* Curved Bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" fill="#f5f6f8">
              <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
            </svg>
          </div>
        </section>

        {/* Contact Form & Info Section - Equal Height */}
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
