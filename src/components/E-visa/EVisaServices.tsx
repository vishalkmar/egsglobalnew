"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Globe, 
  FileCheck, 
  ClipboardCheck, 
  Zap, 
  Shield, 
  Headphones,
  Sparkles,
  CheckCircle
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const eVisaServices = [
  {
    title: "Destination Coverage",
    description: "E-Visa support for Oman, Dubai, Qatar, Singapore, Jordan, and Egypt.",
    imageSrc: "/visa/destinationcovrage.jpeg",
    icon: Globe,
    features: ["6+ Countries", "Popular Destinations", "Easy Process"]
  },
  {
    title: "Eligibility Guidance",
    description: "Clear advice on requirements for business, tourism, and family visits.",
    imageSrc: "/visa/eligibility.jpg",
    icon: FileCheck,
    features: ["Quick Check", "Document List", "Expert Advice"]
  },
  {
    title: "Accurate Application Filing",
    description: "Error-free form submission and document uploads handled by our team.",
    imageSrc: "/visa/appfiling.jpg",
    icon: ClipboardCheck,
    features: ["Zero Errors", "Document Review", "Proper Format"]
  },
  {
    title: "Quick Processing",
    description: "Streamlined handling of e-Visa files to support timely approvals.",
    imageSrc: "/visa/process.jpg",
    icon: Zap,
    features: ["Fast Track", "Priority Handling", "Timely Updates"]
  },
  {
    title: "Secure & Confidential",
    description: "Data privacy, secure handling of documents, and compliance with international standards.",
    imageSrc: "/visa/secure.jpg",
    icon: Shield,
    features: ["Data Protected", "SSL Secure", "Privacy Assured"]
  },
  {
    title: "24/7 Assistance",
    description: "Dedicated support for queries before, during, and after the application process.",
    imageSrc: "/visa/assistance.jpg",
    icon: Headphones,
    features: ["24/7 Support", "Quick Response", "Expert Help"]
  }
];

export default function EVisaServices() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="py-12 md:py-16 bg-[#f5f6f8] relative">
      {/* Subtle Dots Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      {/* Decorative Circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#294d6b]/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#1a3650]/5 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>E-Visa Services</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3" style={{ color: PRIMARY_COLOR }}>
            Fast, reliable, and hassle-free online visa assistance
          </h2>
          
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
            Whether you are traveling for business, leisure, or family visits, EGS Group offers seamless e-Visa services 
            for some of the world's most popular destinations including Oman, Dubai, Qatar, Singapore, Jordan, and Egypt. 
            We manage the entire application process online, from eligibility checks and form filling to document uploads and approvals.
          </p>
          
          <div className="flex justify-center mt-5">
            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eVisaServices.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <Icon className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-[#294d6b] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs leading-relaxed mb-2">
                    {service.description}
                  </p>
                  
                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}