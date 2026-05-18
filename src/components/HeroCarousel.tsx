import { useState, useEffect } from "react";
import { ArrowRight, Star, TrendingUp, Award, ChevronLeft, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

const PRIMARY_COLOR = "#294d6b";

const carouselImages = [
  {
    id: 1,
    image: "/images/airport_terminal_travelers_scene.png",
    title: "Visa Services",
    description: "Hassle-free processing",
  },
  {
    id: 2,
    image: "/images/passport_with_visa_stamps.png",
    title: "Document Attestation",
    description: "MEA & HRD certified",
  },
  {
    id: 3,
    image: "/images/happy_travelers_at_airport.png",
    title: "Travel Support",
    description: "Insurance & dummy tickets",
  },
  {
    id: 4,
    image: "/images/customer_service_consultation.png",
    title: "Expert Consultation",
    description: "24/7 guidance available",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#f8fafc] to-[#eef2f8]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#294d6b]/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#294d6b]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#294d6b]/3 blur-3xl" />
      </div>

      {/* Main Container - Reduced top padding */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 ">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - EGS Group Content */}
          <div data-aos="fade-right">
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 mb-6 border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-[#294d6b]" />
              <span className="text-sm font-semibold text-gray-700">EGS Group</span>
              <span className="text-xs text-gray-400">Since 2015</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#294d6b] to-[#1a3650] bg-clip-text text-transparent">
                India's 1st Smart Documentation
              </span>
              <br />
              <span className="relative inline-block mt-2 text-gray-800">
                Apostille / Translation Services
                <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 100 4" fill="none">
                  <path d="M0 2 L100 2" stroke={PRIMARY_COLOR} strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              We simplify your documentation and visa process with fast, reliable, and
              expert-assisted services. From form filling to document verification, our smart
              support system ensures a smooth and hassle-free experience for students, travelers,
              and professionals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="group transition-all duration-300 hover:shadow-xl"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
              >
                Explore Services
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                <span>info@evrenglobalsolutions.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                <span>+91 8199050506, +91 8199050507</span>
              </div>
            </div>
          </div>

          {/* Right Side - Circle Carousel with Images */}
          <div className="relative" data-aos="fade-left">
            {/* Main Circle Container */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#294d6b]/20 to-[#1a3650]/20 blur-2xl animate-pulse" />
              
              {/* Main Circle */}
              <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR}dd 100%)`,
                }}
              >
                {/* Images with Fade Animation */}
                {carouselImages.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      index === currentIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-110"
                    }`}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>
                    
                    {/* Text Inside Circle */}
                    <div className="absolute bottom-8 left-0 right-0 text-center px-6">
                      <h3 className="text-white text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-white/80 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}

                {/* Decorative Borders */}
                <div className="absolute inset-0 rounded-full border-4 border-white/20" />
                <div className="absolute inset-2 rounded-full border border-white/10" />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" style={{ color: PRIMARY_COLOR }} />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-10"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" style={{ color: PRIMARY_COLOR }} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? "w-6 h-1.5"
                        : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    style={{ backgroundColor: index === currentIndex ? PRIMARY_COLOR : undefined }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-xl shadow-lg p-3 animate-bounce-slow z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">Trusted by</div>
                  <div className="text-xs text-gray-500">10k+ Clients</div>
                </div>
              </div>
            </div>

            {/* Stats Row Below Circle */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>98%</div>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="w-px h-8 bg-gray-300" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>24/7</div>
                <div className="text-xs text-gray-500">Support</div>
              </div>
              <div className="text-center">
                <div className="w-px h-8 bg-gray-300" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>50+</div>
                <div className="text-xs text-gray-500">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}