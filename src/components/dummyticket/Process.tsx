"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Plane, 
  FileText, 
  CreditCard, 
  ThumbsUp,
  Sparkles,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const steps = [
  {
    id: "01",
    title: "Select Your Destination",
    description: "Choose your origin, destination and desired travel date.",
    icon: Plane,
    details: ["Origin & Destination", "Travel Date", "Flight Preference"]
  },
  {
    id: "02",
    title: "Fill Your Details",
    description: "Enter traveller details like name (as per passport), email, mobile and DOB.",
    icon: FileText,
    details: ["Passport Name", "Email & Mobile", "Date of Birth"]
  },
  {
    id: "03",
    title: "Pay Booking Amount",
    description: "Secure your reservation by completing the required booking payment.",
    icon: CreditCard,
    details: ["Secure Payment", "Multiple Options", "Instant Confirmation"]
  },
  {
    id: "04",
    title: "Get Your Ticket",
    description: "Receive your dummy ticket and be ready to submit it with your visa file.",
    icon: ThumbsUp,
    details: ["Email Delivery", "Verifiable PNR", "VFS Accepted"]
  }
];

export default function DummyTicketProcess() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-4 border border-gray-100">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Simple Process</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Booking Process
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            A simple four-step process to get your dummy ticket issued quickly and accurately for your visa application.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Tracking Style Progress */}
        <div className="relative mb-12">
          {/* Desktop Progress Line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-1 bg-gray-200 rounded-full">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
                backgroundColor: PRIMARY_COLOR 
              }} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx + 1;
              const isCompleted = activeStep > idx + 1;
              
              return (
                <div
                  key={step.id}
                  className="relative group cursor-pointer"
                  onClick={() => setActiveStep(idx + 1)}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  {/* Step Circle */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div 
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive || isCompleted ? 'shadow-lg' : ''
                        } ${isCompleted ? 'scale-105' : ''}`}
                        style={{ 
                          backgroundColor: isActive || isCompleted ? PRIMARY_COLOR : `${PRIMARY_COLOR}15`,
                          boxShadow: isActive ? `0 0 0 4px ${PRIMARY_COLOR}20` : 'none'
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-8 h-8 text-white" />
                        ) : (
                          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? 'white' : PRIMARY_COLOR }} />
                        )}
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold" style={{ color: PRIMARY_COLOR }}>
                        {step.id}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className={`text-lg font-bold mb-2 transition-colors ${isActive ? 'text-[#294d6b]' : 'text-gray-800'}`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Details on Hover/Active */}
                    <div className={`mt-3 pt-3 border-t border-gray-100 transition-all duration-300 overflow-hidden ${
                      isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100'
                    }`}>
                      <div className="space-y-1">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-center justify-center gap-1 text-xs text-gray-500">
                            <CheckCircle className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Current Step Info Card */}
        <div className="mt-8 p-6 bg-[#f5f6f8] rounded-2xl" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                {steps[activeStep - 1] && (() => {
                  const Icon = steps[activeStep - 1].icon;
                  return <Icon className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />;
                })()}
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Step</p>
                <p className="text-lg font-semibold text-gray-800">
                  Step {activeStep}: {steps[activeStep - 1]?.title}
                </p>
              </div>
            </div>
            <button 
              className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Continue to Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-gray-100" data-aos="fade-up">
          {[
            { label: "Average Process Time", value: "10-15 mins" },
            { label: "Ticket Delivery", value: "2-4 hours" },
            { label: "Success Rate", value: "99.9%" },
            { label: "Customer Support", value: "24/7" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-sm font-bold" style={{ color: PRIMARY_COLOR }}>{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}