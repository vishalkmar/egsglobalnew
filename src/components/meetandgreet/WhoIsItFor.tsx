"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  User, 
  Heart, 
  Briefcase, 
  Users,
  Shield,
  BadgeCheck,
  Clock,
  CheckCircle,
  Sparkles,
  Award,
  Lock,
  FileCheck
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const audienceTypes = [
  {
    id: 1,
    title: "First-Time Travelers",
    description: "Jo pehli baar bahar ja rahe hain aur ghabra rahe hain. Hum unhe har step par guidance dete hain.",
    icon: User,
    bgColor: "from-blue-500 to-cyan-500",
    features: ["Step-by-step guidance", "Airport navigation help", "Stress-free experience"]
  },
  {
    id: 2,
    title: "Elderly & Kids",
    description: "Senior citizens aur akele safar karne wale bachon ke liye special care and assistance.",
    icon: Heart,
    bgColor: "from-rose-500 to-pink-500",
    features: ["Wheelchair assistance", "Extra care & attention", "Safe handover to family"]
  },
  {
    id: 3,
    title: "Business Travelers",
    description: "Jinko jaldi nikalna hai. Fast-track entry aur priority clearance for time-saving.",
    icon: Briefcase,
    bgColor: "from-indigo-500 to-purple-500",
    features: ["Priority immigration", "Express baggage claim", "Time-efficient process"]
  },
  {
    id: 4,
    title: "Large Families",
    description: "Jinke paas zyada saaman hai. Extra luggage assistance aur group coordination.",
    icon: Users,
    bgColor: "from-emerald-500 to-teal-500",
    features: ["Group coordination", "Extra luggage help", "Family-friendly service"]
  }
];

const safetyFeatures = [
  {
    icon: Shield,
    title: "Verified Staff",
    description: "All our staff members are thoroughly background verified and professionally trained."
  },
  {
    icon: BadgeCheck,
    title: "Airport Access Permit (AEP)",
    description: "Our team holds valid AEP credentials for authorized airport access and assistance."
  },
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description: "Live flight tracking and coordination for timely assistance upon arrival."
  },
  {
    icon: FileCheck,
    title: "Document Safety",
    description: "Your documents are handled with utmost care and confidentiality."
  }
];

export default function WhoItsFor() {
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
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Who We Serve</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Who Is It For?
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Our meet & greet services are designed for every type of traveler — 
            providing care, comfort, and convenience at every step.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {audienceTypes.map((audience, idx) => {
            const Icon = audience.icon;
            
            return (
              <div
                key={audience.id}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${PRIMARY_COLOR}10` }}
                >
                  <Icon className="w-8 h-8" style={{ color: PRIMARY_COLOR }} />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#294d6b] transition-colors">
                  {audience.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  {audience.description}
                </p>
                
                {/* Features */}
                <div className="border-t border-gray-100 pt-3 mt-2">
                  {audience.features.map((feature, i) => (
                    <div key={i} className="flex items-center justify-center gap-1 text-xs text-gray-500 py-0.5">
                      <CheckCircle className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety & Security Section */}
        <div className="relative" data-aos="fade-up">
          {/* Decorative Top Border */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            {/* Header */}
            <div className="text-center py-8 px-4" style={{ backgroundColor: `${PRIMARY_COLOR}05` }}>
              <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-4">
                <Shield className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Safety & Security</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Your Safety is Our Priority
              </h3>
              
              <p className="text-gray-500 max-w-2xl mx-auto">
                We ensure the highest standards of safety and security for all our clients
              </p>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-8">
              {safetyFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                
                return (
                  <div key={idx} className="text-center group" data-aos="fade-up" data-aos-delay={idx * 100}>
                    <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${PRIMARY_COLOR}10` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
            
            {/* Security Badges */}
            <div className="flex flex-wrap justify-center gap-4 p-6 pt-0 pb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                <Lock className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Data Protected</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
                <BadgeCheck className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">AEP Certified</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-10" data-aos="fade-up">
          <p className="text-gray-600 mb-4">Still have questions about our service?</p>
          <button 
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Contact Our Support Team
          </button>
        </div>
      </div>
    </section>
  );
}