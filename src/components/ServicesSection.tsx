"use client";

import React, { useEffect } from "react";
import { 
  Building2, 
  Stamp, 
  Shield, 
  Handshake, 
  Hotel, 
  Briefcase,
  ChevronRight
} from "lucide-react";

const embassyImg = "/images/embassy_legalization_service.png";
const attestationImg = "/images/attestation_certificate_service.png";
const insuranceImg = "/images/travel_insurance_documents.png";
const meetGreetImg = "/images/meet_and_greet_service.png";
const accommodationImg = "/images/accommodation_service.png";
const visaImg = "/images/visa_approval_service.png";

import AOS from "aos";
import "aos/dist/aos.css";

const PRIMARY_COLOR = "#294d6b";

const services = [
  {
    image: embassyImg,
    title: "Embassy & Consular Services",
    description: "Complete embassy legalization and document authentication services for international use.",
    icon: Building2,
    path: "/embassy-legalization",
  },
  {
    image: attestationImg,
    title: "Attestation & Apostille",
    description: "Professional attestation and apostille services for educational and official documents.",
    icon: Stamp,
    path: "/attestation-apostille",
  },
  {
    image: insuranceImg,
    title: "Insurance & Dummy Ticket",
    description: "Travel insurance and flight reservation services for visa applications.",
    icon: Shield,
    path: "/insurance-dummy-ticket",
  },
  {
    image: meetGreetImg,
    title: "Meet & Greet Services",
    description: "Airport assistance and personalized meet & greet services for smooth arrivals.",
    icon: Handshake,
    path: "/meet-greet",
  },
  {
    image: accommodationImg,
    title: "Accommodation Assistance",
    description: "Help with booking accommodations and personal assistance throughout your journey.",
    icon: Hotel,
    path: "/accommodation-assistant",
  },
  {
    image: visaImg,
    title: "Visa Services",
    description: "Comprehensive visa processing including normal visas and e-visa services.",
    icon: Briefcase,
    path: "/visa/normal",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#f5f6f8] relative">
      {/* Subtle Dots Pattern - Like in the image */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      {/* Header */}
      <div className="relative text-center px-4 mb-12 md:mb-16 z-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
          Services We Provide
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          EGS Group provides seamless global travel and documentation support,
          offering visas, legalization, insurance, airport assistance, and
          accommodation with expert, reliable service.
        </p>
      </div>

      {/* Services Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                      <Icon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  
                  <button 
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:gap-2"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;