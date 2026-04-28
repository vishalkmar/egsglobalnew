"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Plane, 
  Building2, 
  Headphones, 
  Shield, 
  RefreshCw,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle,
  Car,
  Hotel,
  Users
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const meetGreetSteps = [
  {
    id: 1,
    title: "Airport Pick-Up & Drop-Off",
    description: "Comfortable and timely transfers to and from airports with professional drivers.",
    imageSrc: "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Plane,
    features: ["24/7 Availability", "Flight Tracking", "Luxury Vehicles"]
  },
  {
    id: 2,
    title: "Hotel-to-VFS / Embassy Transfers",
    description: "Hassle-free transport between your accommodation and visa application centers.",
    imageSrc: "https://images.pexels.com/photos/2565591/pexels-photo-2565591.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Building2,
    features: ["On-Time Pickup", "Document Ready", "Round Trip Option"]
  },
  {
    id: 3,
    title: "Personalized Assistance",
    description: "Dedicated staff to guide and support you at VFS/Embassy Submission.",
    imageSrc: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Headphones,
    features: ["Expert Guidance", "Queue Management", "Document Check"]
  },
  {
    id: 4,
    title: "Safety & Comfort",
    description: "Professionally trained drivers and sanitized vehicles for a secure travel experience.",
    imageSrc: "https://images.pexels.com/photos/9725174/pexels-photo-9725174.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Shield,
    features: ["Sanitized Vehicles", "Trained Drivers", "GPS Tracked"]
  },
  {
    id: 5,
    title: "End-to-End Convenience",
    description: "From arrival to departure, we manage every detail for a smooth travel experience.",
    imageSrc: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: RefreshCw,
    features: ["Seamless Coordination", "Real-Time Updates", "24/7 Support"]
  }
];

export default function MeetGreetServices() {
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
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Meet & Greet Services in Delhi
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Professional airport assistance and seamless transfers for a stress-free travel experience in Delhi.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {meetGreetSteps.map((service, index) => {
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
                <h4 className="font-semibold text-gray-800">Need Assistance at Delhi Airport?</h4>
                <p className="text-sm text-gray-500">Book our meet & greet service for a smooth arrival experience</p>
              </div>
            </div>
            <button 
              className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}