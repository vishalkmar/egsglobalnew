"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Shield, 
  GraduationCap, 
  Globe, 
  Building2, 
  FileText, 
  Zap,
  Sparkles,
  CheckCircle,
  Award,
  Clock,
  Users
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const hrdStampingSteps = [
  {
    id: 1,
    title: "State HRD Verification",
    description: "Official authentication of educational certificates through respective State HRD departments.",
    imageSrc: "/hrd/varification.jpeg",
    icon: Shield,
    features: ["Govt. Authorized", "State Level", "Official Seal"]
  },
  {
    id: 2,
    title: "Degree & Diploma Stamping",
    description: "Verification for university degrees, diplomas, transcripts, and mark sheets.",
    imageSrc: "/hrd/degree.jpg",
    icon: GraduationCap,
    features: ["All Universities", "All Degrees", "Transcripts Included"]
  },
  {
    id: 3,
    title: "Mandatory Attestation for Abroad",
    description: "Required for higher education, skilled employment, professional licensing, and migration.",
    imageSrc: "/hrd/mendatory.jpg",
    icon: Globe,
    features: ["Visa Required", "Worldwide Accepted", "Legal Compliance"]
  },
  {
    id: 4,
    title: "University Verification Assistance",
    description: "Coordination with universities and boards for prior verification if required by HRD.",
    imageSrc: "/hrd/university.jpg",
    icon: Building2,
    features: ["University Liaison", "Priority Processing", "Document Ready"]
  },
  {
    id: 5,
    title: "Complete Documentation Support",
    description: "Guidance on paperwork, forms, fees, and supporting documents needed for HRD stamping.",
    imageSrc: "/hrd/docsupport.jpg",
    icon: FileText,
    features: ["Paperwork Help", "Form Filling", "Fee Guidance"]
  },
  {
    id: 6,
    title: "Hassle-Free Processing",
    description: "End-to-end management from submission to collection, ensuring speed and accuracy.",
    imageSrc: "/hrd/hassle.jpg",
    icon: Zap,
    features: ["Fast Tracking", "Real-Time Updates", "Door Delivery"]
  }
];

export default function HRDStampingServices() {
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
            HRD Stamping Services
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Get your educational documents attested by State HRD authorities for overseas education, employment, and visa purposes.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Services Grid - 6 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {hrdStampingSteps.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div
                key={service.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
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
                <Award className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Need HRD Attestation Urgently?</h4>
                <p className="text-sm text-gray-500">Get your documents attested with our express processing service</p>
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
            { icon: Shield, text: "Govt. Approved Process" },
            { icon: Clock, text: "Fast Turnaround" },
            { icon: CheckCircle, text: "100% Success Rate" },
            { icon: Users, text: "10,000+ Documents Attested" }
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