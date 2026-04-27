"use client";

import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Stamp,
  ShieldCheck,
  Languages,
  Ticket,
  Briefcase,
  FileCheck2,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

type Service = {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  pill: string;
  id: string;
};

const SERVICES: Service[] = [
  {
    id: "visa",
    title: "Visa Services",
    subtitle: "Sticker Visa + E-Visa",
    description: "Country-specific guidance, accurate filing, document validation, and end-to-end coordination for both Sticker Visa and E-Visa categories.",
    icon: BadgeCheck,
    pill: "Visa",
  },
  {
    id: "mea",
    title: "MEA Attestation",
    subtitle: "Government authentication",
    description: "Support for document attestation through MEA workflows with clear checklists, verification steps, and status coordination.",
    icon: Stamp,
    pill: "Attestation",
  },
  {
    id: "pcc",
    title: "PCC Legalisation & Apostille",
    subtitle: "Police clearance + legalization",
    description: "Assistance with PCC preparation and legalization / apostille requirements as per destination country rules.",
    icon: FileCheck2,
    pill: "Legalisation",
  },
  {
    id: "translation",
    title: "Translation Services",
    subtitle: "Accurate & compliant formatting",
    description: "Professional translation support with consistent formatting to match embassy/VFS submission expectations.",
    icon: Languages,
    pill: "Translation",
  },
  {
    id: "embassy",
    title: "Embassy & Consular Services",
    subtitle: "Appointments + submission support",
    description: "End-to-end assistance for appointment submission, document readiness, biometrics guidance, and embassy/VFS procedures.",
    icon: Briefcase,
    pill: "Embassy",
  },
  {
    id: "hrd",
    title: "HRD Attestation",
    subtitle: "Educational document attestation",
    description: "State HRD verification workflow support for degrees, diplomas, transcripts for overseas acceptance.",
    icon: ShieldCheck,
    pill: "HRD",
  },
  {
    id: "insurance",
    title: "Insurance & Dummy Ticket",
    subtitle: "Visa-friendly documentation",
    description: "Dummy ticket reservations and travel insurance assistance aligned with visa documentation needs.",
    icon: Ticket,
    pill: "Travel",
  }
];

export default function WhatWeDo() {
  const [active, setActive] = useState<string>("visa");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const activeService = useMemo(
    () => SERVICES.find((s) => s.id === active) ?? SERVICES[0],
    [active]
  );

  const firstRow = SERVICES.slice(0, 4);
  const secondRow = SERVICES.slice(4);

  return (
    <section className="py-16 md:py-24 bg-[#f5f6f8] relative">
      {/* Dots Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>What We Do</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Services That Make Your Journey Simple
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            All major visa, attestation, legalization, and on-ground support services—managed 
            with accuracy-first workflows and clear communication.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Left - Spotlight */}
          <div data-aos="fade-right">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://www.fantasticoindia.com/assets/front/img/visa_assis.jpg"
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{activeService.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: PRIMARY_COLOR }}>
                    {activeService.pill}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">{activeService.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{activeService.description}</p>
              </div>
            </div>
          </div>
          
          {/* Right - First 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-aos="fade-left">
            {firstRow.map((service) => {
              const Icon = service.icon;
              const isActive = service.id === active;
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActive(service.id)}
                  className={`text-left p-4 rounded-xl transition-all duration-300 border ${
                    isActive
                      ? 'border-[#294d6b]/30 shadow-md'
                      : 'border-gray-100 hover:shadow-md'
                  }`}
                  style={{ backgroundColor: isActive ? `${PRIMARY_COLOR}05` : 'white' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                      <Icon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{service.title}</h4>
                      <p className="text-xs text-gray-500">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2">{service.description}</p>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Second Row - Remaining Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-aos="fade-up">
          {secondRow.map((service) => {
            const Icon = service.icon;
            const isActive = service.id === active;
            
            return (
              <button
                key={service.id}
                onClick={() => setActive(service.id)}
                className={`text-left p-4 rounded-xl transition-all duration-300 border ${
                  isActive
                    ? 'border-[#294d6b]/30 shadow-md'
                    : 'border-gray-100 hover:shadow-md'
                }`}
                style={{ backgroundColor: isActive ? `${PRIMARY_COLOR}05` : 'white' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                    <Icon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{service.title}</h4>
                    <p className="text-xs text-gray-500">{service.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2">{service.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}