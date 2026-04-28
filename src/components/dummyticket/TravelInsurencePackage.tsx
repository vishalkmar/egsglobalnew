"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  GraduationCap, 
  Plane, 
  Shield, 
  Heart, 
  Clock, 
  CheckCircle,
  Sparkles,
  Euro,
  Globe,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Umbrella,
  Ambulance,
  Luggage,
  Headphones
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const insurancePackages = [
  {
    id: 1,
    title: "Student Insurance",
    icon: GraduationCap,
    tagline: "Long-term & Affordable Coverage",
    description: "Comprehensive insurance designed specifically for international students studying abroad. Perfect for semester programs and long-term courses.",
    features: [
      { text: "Medical Emergency Coverage", icon: Ambulance },
      { text: "Accident Protection", icon: Shield },
      { text: "Baggage Loss Coverage", icon: Luggage },
      { text: "Trip Cancellation Protection", icon: Umbrella },
      { text: "24/7 Student Helpline", icon: Headphones },
      { text: "Mental Health Support", icon: Heart }
    ],
    badge: "Most Popular for Students",
    bgGradient: "from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    title: "Travel Insurance",
    icon: Plane,
    tagline: "Schengen & European Visas",
    description: "Meets all Schengen visa requirements with comprehensive medical coverage. Ideal for tourists and business travelers.",
    features: [
      { text: "€30,000+ Medical Coverage", icon: Euro },
      { text: "Schengen Visa Compliant", icon: Award },
      { text: "COVID-19 Coverage", icon: Shield },
      { text: "Trip Cancellation Protection", icon: Umbrella },
      { text: "Baggage & Delay Coverage", icon: Luggage },
      { text: "Emergency Evacuation", icon: Ambulance }
    ],
    badge: "Schengen Compliant",
    bgGradient: "from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  }
];

export default function TravelInsurancePackages() {
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
            <Shield className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Insurance Packages</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Travel Insurance Packages
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Choose the perfect insurance plan for your journey - from student coverage to Schengen visa compliant plans
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Cards Grid - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8">
          {insurancePackages.map((pkg, index) => {
            const PackageIcon = pkg.icon;
            
            return (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Top Gradient Bar */}
                <div className="h-2 w-full bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(90deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR}dd 100%)` }} />
                
                {/* Header Section */}
                <div className="p-6 pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${pkg.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                      <PackageIcon className={`w-7 h-7 ${pkg.iconColor}`} />
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${PRIMARY_COLOR}10`, color: PRIMARY_COLOR }}>
                      {pkg.badge}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {pkg.title}
                  </h3>
                  <p className="text-sm" style={{ color: PRIMARY_COLOR }}>
                    {pkg.tagline}
                  </p>
                </div>
                
                {/* Description */}
                <div className="px-6 pt-2 pb-4">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-100 mx-6" />
                
                {/* Features Section */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                    What's Included
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {pkg.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={idx} className="flex items-center gap-2 group/feature">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover/feature:scale-110" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                            <FeatureIcon className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                          </div>
                          <span className="text-xs text-gray-600 group-hover/feature:text-[#294d6b] transition-colors">
                            {feature.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="px-6 pb-6">
                  <button 
                    className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 group/btn"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    Get This Insurance
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 pt-6 border-t border-gray-200" data-aos="fade-up">
          {[
            { icon: Shield, text: "98.5% Claim Settlement" },
            { icon: Clock, text: "24/7 Customer Support" },
            { icon: Globe, text: "Worldwide Coverage" },
            { icon: Heart, text: "No Hidden Charges" },
            { icon: Users, text: "50,000+ Happy Customers" }
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