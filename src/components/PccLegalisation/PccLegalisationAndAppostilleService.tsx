"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FileCheck, 
  Building2, 
  GraduationCap, 
  Heart, 
  Briefcase, 
  Clock,
  Sparkles,
  CheckCircle,
  Shield,
  Globe
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const pccServices = [
  {
    id: 1,
    title: "Document Verification",
    description: "Thorough check of all PCC and supporting documents before submission to authorities and embassies.",
    imageSrc: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: FileCheck,
    features: ["Pre-submission check", "Error-free docs", "Embassy ready"]
  },
  {
    id: 2,
    title: "Embassy Coordination",
    description: "Direct liaison with relevant embassies and consulates for PCC authentication and legalization.",
    imageSrc: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Building2,
    features: ["Direct liaison", "Fast processing", "Official channels"]
  },
  {
    id: 3,
    title: "Educational Document Legalisation",
    description: "Legalisation of degrees, diplomas and academic certificates linked to your PCC for overseas studies or employment.",
    imageSrc: "https://images.pexels.com/photos/2565581/pexels-photo-2565581.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: GraduationCap,
    features: ["Degree certificate", "Diploma verification", "Academic records"]
  },
  {
    id: 4,
    title: "Personal Document Legalisation",
    description: "Legalisation of birth, marriage and other personal records often required along with PCC for family or dependent visas.",
    imageSrc: "https://images.pexels.com/photos/719634/pexels-photo-719634.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Heart,
    features: ["Birth certificate", "Marriage certificate", "Personal records"]
  },
  {
    id: 5,
    title: "Commercial & Business Document Legalisation",
    description: "Certification of company documents, contracts and agreements connected with corporate or business-related background checks.",
    imageSrc: "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Briefcase,
    features: ["Company documents", "Contracts", "Business agreements"]
  },
  {
    id: 6,
    title: "Timely & Reliable Service",
    description: "Quick processing with clear updates at every stage, maintaining full compliance with destination country requirements.",
    imageSrc: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Clock,
    features: ["Quick processing", "Real-time updates", "Full compliance"]
  }
];

export default function PccLegalizationApostilleService() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#f5f6f8] relative">
      {/* Subtle Dots Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      {/* Decorative Circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#294d6b]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#1a3650]/5 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            PCC Legalization & Apostille Services
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Complete PCC legalization support for employment, immigration, and long-term visa requirements
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pccServices.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div
                key={service.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#294d6b] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  
                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* Learn More Link */}
                  <button 
                    className="inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:gap-2 mt-1"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    Learn More
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Additional Info Banner */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-100" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                <Shield className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Need PCC Legalization Urgently?</h4>
                <p className="text-sm text-gray-500">Get your PCC attested with our express processing service</p>
              </div>
            </div>
            <button 
              className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Request Express Service
            </button>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-4" data-aos="fade-up">
          {[
            { icon: Shield, text: "MEA Recognized" },
            { icon: Globe, text: "Worldwide Acceptance" },
            { icon: CheckCircle, text: "100% Success Rate" },
            { icon: Clock, text: "Fast Turnaround" }
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                  <ItemIcon className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                </div>
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}