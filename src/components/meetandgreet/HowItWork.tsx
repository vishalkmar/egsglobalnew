"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FileText, 
  UserCheck, 
  FastForward,
  Sparkles,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const steps = [
  {
    id: 1,
    title: "Fill Your Details",
    description: "Visit our website and fill in your travel details including flight number, arrival date, time, and number of passengers.",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    details: [
      "Flight number & arrival time",
      "Number of passengers",
      "Contact information"
    ]
  },
  {
    id: 2,
    title: "Meet Our Representative",
    description: "Our professional representative will greet you at the airport entrance with a name placard for easy identification.",
    icon: UserCheck,
    color: "from-indigo-500 to-purple-500",
    details: [
      "Name placard with your name",
      "Uniformed professional staff",
      "Located at arrival gate"
    ]
  },
  {
    id: 3,
    title: "Fast-Track Assistance",
    description: "Get escorted through immigration, baggage claim, and customs with priority assistance for a smooth exit.",
    icon: FastForward,
    color: "from-purple-500 to-pink-500",
    details: [
      "Priority immigration clearance",
      "Baggage collection support",
      "Customs assistance"
    ]
  }
];

export default function HowItWorks() {
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
            How It Works
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Get seamless airport assistance in just 3 simple steps - from booking to arrival
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gray-200">
            <div className="h-full w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              
              return (
                <div
                  key={step.id}
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                >
                  {/* Step Number Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-sm" style={{ color: PRIMARY_COLOR }}>
                        {step.id}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#294d6b] transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    {/* Details List */}
                    <div className="bg-gray-50 rounded-xl p-4 text-left">
                      <p className="text-xs font-semibold text-gray-700 mb-2">What's included:</p>
                      <ul className="space-y-1.5">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-12 pt-6" data-aos="fade-up">
          <div className="inline-flex items-center gap-3 bg-white shadow-lg rounded-full px-6 py-3 border border-gray-100">
            <span className="text-gray-700">Ready for a smooth airport experience?</span>
            <button 
              className="px-5 py-1.5 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}