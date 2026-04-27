import { Award, Clock, Target, Heart } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PRIMARY_COLOR = "#294d6b";

const reasons = [
  {
    icon: Award,
    title: "Professional Expertise",
    description: "A team well-versed with embassy protocols, legal formalities and international travel standards.",
  },
  {
    icon: Clock,
    title: "Seamless Processes",
    description: "Streamlined services designed to save you time, reduce stress and increase approval success rates.",
  },
  {
    icon: Target,
    title: "Global Reach",
    description: "Tailored solutions for Indian, Nepalese and Bangladeshi residents, covering multiple destinations worldwide.",
  },
  {
    icon: Heart,
    title: "Trusted Support",
    description: "Reliable, compliant and customer-focused services that you can count on.",
  },
];

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <section className="pt-16 md:pt-24 bg-[#f5f6f8] relative">
      {/* Subtle Dots Pattern - Same as image */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      {/* Main Heading */}
      <div className="relative text-center px-4 mb-12 md:mb-16 z-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
          Why Choose EGS Group?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Your trusted partner for global travel & documentation services
        </p>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* LEFT SIDE - Image */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <div className="relative">
              {/* Simple Hexagon Shape - No gradient overlay */}
              <div
                className="w-full max-w-md mx-auto overflow-hidden shadow-lg"
                style={{
                  clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                }}
              >
                <img
                  src="/whychooseus.jpg"
                  alt="EGS Group Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Text Content */}
          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Your Gateway to{" "}
              <span style={{ color: PRIMARY_COLOR }}>
                Effortless Travel
              </span>
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              At EGS Group, we go beyond being just a service provider—we are
              your trusted partner in simplifying global travel and
              documentation requirements. With years of expertise, a dedicated
              team of professionals, and a client-first approach, we ensure
              every service is delivered with accuracy, transparency, and
              efficiency.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              We understand that visa processes, document authentication, and
              travel preparations can often feel overwhelming. That's why we
              have built end-to-end solutions under one roof—ranging from visa
              assistance and document legalization to travel insurance,
              airport facilitation, and accommodation support.
            </p>

            <button 
              className="px-6 py-2.5 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Learn More About Us
            </button>
          </div>
        </div>

        {/* Reasons Section - Simple Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 md:mt-20">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                  <Icon className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {reason.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}