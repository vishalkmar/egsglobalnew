"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  Landmark, 
  Globe,
  FileCheck,
  Shield,
  Sparkles
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

interface FlowStep {
  label: string;
  sub?: string;
  icon?: React.ElementType;
}

interface FlowType {
  title: string;
  highlight: string;
  description: string;
  steps: FlowStep[];
  icon: React.ElementType;
}

const flows: FlowType[] = [
  {
    title: "PCC Legalization",
    highlight: "PCC → State → MEA → Embassy",
    description: "For Bangladesh & Nepal: PCC processed through state verification followed by MEA attestation, ensuring validity for official use.",
    icon: Shield,
    steps: [
      { label: "PCC Issuance", sub: "Local Police Station / PSK / Passport Office", icon: FileCheck },
      { label: "State Authentication", sub: "Home / General Administration Department", icon: Building2 },
      { label: "MEA Attestation", sub: "Ministry of External Affairs, New Delhi", icon: Landmark },
      { label: "Embassy Attestation", sub: "Embassy / Consulate of destination", icon: Globe },
    ],
  },
  {
    title: "PCC Apostille",
    highlight: "PCC → State → MEA Apostille",
    description: "For India: PCC processed through State Home Department authentication followed by MEA Apostille, valid internationally.",
    icon: Globe,
    steps: [
      { label: "PCC Issuance", sub: "Local Police Station / PSK / Passport Office", icon: FileCheck },
      { label: "State Authentication", sub: "State Home / General Administration Department", icon: Building2 },
      { label: "MEA Apostille", sub: "Apostille by Ministry of External Affairs", icon: Landmark },
    ],
  },
];

const StepCard: React.FC<{ step: FlowStep; index: number; total: number; isLast: boolean }> = ({ 
  step, 
  index, 
  total, 
  isLast 
}) => {
  const Icon = step.icon || CheckCircle;
  
  return (
    <div className="relative flex-1 group">
      {/* Step Circle with Pulse Effect */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" 
            style={{ borderColor: PRIMARY_COLOR }}>
            <span className="text-sm font-bold" style={{ color: PRIMARY_COLOR }}>{index + 1}</span>
          </div>
          {!isLast && (
            <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2" 
              style={{ background: `linear-gradient(90deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR}40 100%)` }} />
          )}
        </div>
        
        <div className="mt-4 text-center max-w-[180px] mx-auto">
          <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center" 
            style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
            <Icon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
          </div>
          <p className="text-sm font-semibold text-gray-800">{step.label}</p>
          <p className="text-xs text-gray-500 mt-1">{step.sub}</p>
        </div>
      </div>
    </div>
  );
};

export default function PccLegalizationApostilleFlow() {
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
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Procedure Guide</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            PCC Legalization & Apostille Procedure
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Complete step-by-step guide for PCC legalization and apostille process
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Flow Cards */}
        <div className="space-y-10">
          {flows.map((flow, flowIndex) => {
            const FlowIcon = flow.icon;
            
            return (
              <div
                key={flow.title}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={flowIndex * 150}
              >
                {/* Card Header */}
                <div className="p-6 pb-4 border-b border-gray-100" style={{ backgroundColor: `${PRIMARY_COLOR}05` }}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <FlowIcon className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{flow.title}</h3>
                        <p className="text-gray-500 text-sm mt-1 max-w-2xl">{flow.description}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: PRIMARY_COLOR }}>
                      {flow.highlight}
                    </span>
                  </div>
                </div>
                
                {/* Steps Roadmap */}
                <div className="p-6">
                  <div className="relative">
                    {/* Desktop Connecting Line */}
                    <div className="hidden lg:block absolute top-16 left-[15%] right-[15%] h-0.5 rounded-full" 
                      style={{ backgroundColor: `${PRIMARY_COLOR}20` }} />
                    
                    <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4">
                      {flow.steps.map((step, idx) => {
                        const StepIcon = step.icon || CheckCircle;
                        const isLast = idx === flow.steps.length - 1;
                        
                        return (
                          <div key={idx} className="relative flex-1 group">
                            {/* Step Number Circle */}
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" 
                                  style={{ borderColor: PRIMARY_COLOR }}>
                                  <span className="text-base font-bold" style={{ color: PRIMARY_COLOR }}>{idx + 1}</span>
                                </div>
                                {/* Animated Pulse Ring */}
                                <div className="absolute inset-0 rounded-full animate-ping opacity-20" 
                                  style={{ backgroundColor: PRIMARY_COLOR }} />
                              </div>
                              
                              {/* Connecting Arrow (between steps) */}
                              {!isLast && (
                                <div className="hidden lg:block absolute top-1/2 left-full w-8 -translate-y-1/2">
                                  <ArrowRight className="w-5 h-5" style={{ color: `${PRIMARY_COLOR}50` }} />
                                </div>
                              )}
                              
                              <div className="mt-4 text-center max-w-[200px] mx-auto">
                                <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center" 
                                  style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                                  <StepIcon className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
                                </div>
                                <p className="text-sm font-semibold text-gray-800">{step.label}</p>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.sub}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Footer Note */}
                <div className="px-6 pb-6 pt-2">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${PRIMARY_COLOR}05` }}>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" style={{ color: PRIMARY_COLOR }} />
                      EGS supports you at each stage – from issuance to final attestation
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}