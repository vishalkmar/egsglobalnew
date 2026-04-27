"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FileText, Upload, CreditCard, CheckCircle, ArrowRight } from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const steps = [
  {
    id: 1,
    title: "Register",
    description: "Create an account and provide your basic details to get started with our services.",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Apply Form & Upload Documents",
    description: "Fill out the application form and upload all required documents securely.",
    icon: Upload,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    title: "Pay & Submit",
    description: "Complete the payment process and submit your application for processing.",
    icon: CreditCard,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "Get Your Document",
    description: "Receive your processed documents with tracking and delivery support.",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-500",
  },
];

export default function HowWeProcess() {
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
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-4 border border-gray-100">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>How We Process</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Simple 4-Step Process
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            We've streamlined our process to make it easy, fast, and transparent for you.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Steps - Progress Line */}
        <div className="relative mb-12">
          {/* Desktop Progress Line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200">
            <div className="h-full transition-all duration-500 rounded-full" style={{ 
              width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
              backgroundColor: PRIMARY_COLOR 
            }} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              const isCompleted = activeStep > step.id;
              
              return (
                <div
                  key={step.id}
                  className="relative text-center group cursor-pointer"
                  onClick={() => setActiveStep(step.id)}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  {/* Step Number Circle */}
                  <div className="relative inline-flex mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 mx-auto
                      ${isActive ? 'shadow-lg scale-110' : ''}
                      ${isCompleted ? 'bg-opacity-100' : 'bg-opacity-20'}
                    `}
                    style={{ 
                      backgroundColor: isActive || isCompleted ? PRIMARY_COLOR : `${PRIMARY_COLOR}20`,
                      boxShadow: isActive ? `0 0 0 4px ${PRIMARY_COLOR}20` : 'none'
                    }}>
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <span className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                          {step.id}
                        </span>
                      )}
                    </div>
                    {/* Mobile Connector Line */}
                    {idx < steps.length - 1 && (
                      <div className="hidden md:block absolute -right-3 top-8 w-6 h-0.5 bg-gray-200" />
                    )}
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-2 transition-colors ${isActive ? 'text-[#294d6b]' : 'text-gray-700'}`}>
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed px-4">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12" data-aos="fade-up">
          <button 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}