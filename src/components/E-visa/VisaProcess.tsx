"use client";

import React, { useEffect } from "react";
import { Lock, FilePenLine, CreditCard, BadgeCheck, CheckCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const PRIMARY_COLOR = "#294d6b";

const topSteps = [
  { step: 1, label: "Enter itinerary information" },
  { step: 2, label: "Bulk upload all your documents" },
  { step: 3, label: "Be relaxed and wait for your Visa" },
];

const bottomSteps = [
  { step: "STEP 1", title: "Sign Up & Login", icon: Lock },
  { step: "STEP 2", title: "Submit Document", icon: FilePenLine },
  { step: "STEP 3", title: "Pay Online", icon: CreditCard },
  { step: "STEP 4", title: "Receive Visa", icon: BadgeCheck },
];

export default function VisaProcess() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="py-16 md:py-20 bg-[#f5f6f8] relative">
      {/* Subtle Dots Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      {/* Decorative Circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#294d6b]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#1a3650]/5 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section - 3 Steps */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <CheckCircle className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Quick Process</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Apply for a Visa within{" "}
            <span className="text-white bg-[#294d6b] px-4 py-1 rounded-full inline-block">2-minutes</span>
          </h2>
          
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Top Horizontal Steps */}
        <div className="relative mb-16" data-aos="fade-up">
          <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-200 rounded-full">
            <div className="h-full w-full rounded-full" style={{ backgroundColor: `${PRIMARY_COLOR}30` }} />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {topSteps.map((item, index) => (
              <div key={item.step} className="relative flex flex-col items-center text-center md:w-1/3">
                <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{ backgroundColor: PRIMARY_COLOR }}>
                  {item.step}
                </div>
                <div className="mt-3 w-8 h-0.5 rounded-full md:hidden" style={{ backgroundColor: `${PRIMARY_COLOR}30` }} />
                <p className="mt-3 text-gray-700 font-medium text-sm md:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section Heading */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            <span style={{ color: PRIMARY_COLOR }}>Automate</span>{" "}
            <span className="text-gray-800">Visa Bookings</span>
          </h3>
          <div className="flex justify-center mt-3">
            <div className="w-16 h-0.5 rounded-full" style={{ backgroundColor: `${PRIMARY_COLOR}40` }} />
          </div>
        </div>

        {/* Bottom Cards - 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomSteps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div
                key={step.step}
                className="relative group bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Top Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ backgroundColor: PRIMARY_COLOR }} />
                
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                  <Icon className="w-7 h-7" style={{ color: PRIMARY_COLOR }} />
                </div>
                
                {/* Step Label */}
                <p className="text-xs font-semibold tracking-wider mb-2" style={{ color: PRIMARY_COLOR }}>
                  {step.step}
                </p>
                
                {/* Title */}
                <h4 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}