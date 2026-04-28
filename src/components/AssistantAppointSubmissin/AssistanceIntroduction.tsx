"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Building2, 
  Globe, 
  FileCheck, 
  Calendar, 
  Fingerprint, 
  BookText,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

export default function EmbassyConsularIntro() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const procedures = [
    {
      icon: FileCheck,
      text: "Submitting visa applications for tourism, business, study, work, or long-term stay"
    },
    {
      icon: Fingerprint,
      text: "Providing biometrics such as fingerprints and photographs"
    },
    {
      icon: Calendar,
      text: "Scheduling appointments at the Embassy, Consulate, or VFS centre"
    },
    {
      icon: BookText,
      text: "Submitting passports and supporting documents for verification"
    },
    {
      icon: Shield,
      text: "Applying for consular services such as passport renewal, attestation, document verification, and emergency travel permissions"
    }
  ];

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#294d6b]/3 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Building2 className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Embassy & Consular Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            What Are Embassy and Consular Services?
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            A neutral explanation of how official embassies, consulates and visa centres handle international travel and documentation processes.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8" data-aos="fade-up">
          
          {/* Left Side - Procedures */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                  <FileCheck className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Typical Procedures Involved</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-6">
                In most cases, applicants must follow a defined procedure that includes:
              </p>
              
              <div className="space-y-4">
                {procedures.map((procedure, idx) => {
                  const Icon = procedure.icon;
                  return (
                    <div key={idx} className="flex gap-3 group">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                          <Icon className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">
                        {procedure.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Right Side - Info Box */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                    <Globe className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">How Embassies and Consulates Operate</h3>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Embassies and Consulates operate under strict international and government guidelines. 
                  Each country has its own requirements, document checklists, timelines, eligibility rules, 
                  and jurisdiction restrictions. Appointment availability is controlled directly by the 
                  concerned Embassy or visa centre, and applicants must follow the official process to secure a slot.
                </p>
                
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${PRIMARY_COLOR}05`, borderLeft: `3px solid ${PRIMARY_COLOR}` }}>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong className="font-semibold" style={{ color: PRIMARY_COLOR }}>In simple terms,</strong> Embassy and Consular Services are the official 
                    gateway through which international travellers complete visa, document, and 
                    identity-related procedures before travelling to another country.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Clock, value: "10-15 Days", label: "Avg Processing" },
                  { icon: Users, value: "50+", label: "Countries Served" },
                  { icon: CheckCircle, value: "98%", label: "Success Rate" }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="text-center group">
                      <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <Icon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div className="text-base font-bold text-gray-800">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Note */}
        <div className="mt-8 text-center" data-aos="fade-up">
          <p className="text-xs text-gray-400">
            This section is for general informational purposes and does not replace official guidance from any Embassy, 
            Consulate, or authorised visa centre.
          </p>
        </div>
      </div>
    </section>
  );
}
