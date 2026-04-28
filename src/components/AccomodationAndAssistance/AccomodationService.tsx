"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Calendar, 
  Wallet, 
  Headphones, 
  Shield, 
  Home, 
  Users,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const services = [
  {
    id: 1,
    title: "Short-Term Accommodation",
    description: "Support in booking hotels or serviced apartments for short visits. Perfect for business trips and quick getaways.",
    imageSrc: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Calendar,
    features: ["Daily/Weekly stays", "Near metro stations", "Budget friendly"]
  },
  {
    id: 2,
    title: "Budget-Friendly Options",
    description: "Tailored recommendations that fit individual financial preferences without compromising on quality and safety.",
    imageSrc: "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Wallet,
    features: ["₹599 onwards", "Verified listings", "No hidden charges"]
  },
  {
    id: 3,
    title: "End-to-End Support",
    description: "Guidance from booking to check-in for a hassle-free living experience. We handle everything for you.",
    imageSrc: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Headphones,
    features: ["24/7 assistance", "Check-in support", "Issue resolution"]
  },
  {
    id: 4,
    title: "Safe & Verified Stays",
    description: "Accommodation in secure, verified localities with proper safety measures and good neighborhood ratings.",
    imageSrc: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Shield,
    features: ["Verified areas", "Security cameras", "Female-friendly"]
  },
  {
    id: 5,
    title: "Long-Term Rentals",
    description: "Assistance with finding monthly rental apartments for extended stays, internships, or relocations.",
    imageSrc: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Home,
    features: ["Monthly leases", "Furnished options", "Close to offices"]
  },
  {
    id: 6,
    title: "Group Accommodation",
    description: "Special arrangements for families, students, or corporate groups traveling together to Delhi.",
    imageSrc: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Users,
    features: ["Group discounts", "Multi-room booking", "Coordinated check-in"]
  }
];

export default function AccommodationServices() {
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Accommodation Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Accommodation Services in Delhi
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            We help you find the perfect stay - from budget-friendly options to premium accommodations, 
            with end-to-end support throughout your journey.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Services Grid - 6 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
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
                <Clock className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Need Urgent Accommodation?</h4>
                <p className="text-sm text-gray-500">We provide same-day booking assistance for emergency stays</p>
              </div>
            </div>
            <button 
              className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Request Immediate Help
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}