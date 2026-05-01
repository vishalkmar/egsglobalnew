"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  ShieldCheck, 
  Stamp, 
  Globe2, 
  CheckCircle2, 
  FileCheck,
  AlertCircle,
  Sparkles,
  Download,
  Clock
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

interface PccVariant {
  title: string;
  badge: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  required: string[];
  optional: string[];
}

const pccVariants: PccVariant[] = [
  {
    title: "PCC Legalization",
    badge: "Bangladesh · Nepal",
    icon: ShieldCheck,
    required: [
      "Original Police Clearance Certificate (PCC) – issued by PSK / Passport Office / Local Police Station",
      "Clear passport copy – front & back page",
      "Valid PCC within the acceptable time frame (usually 3–6 months)",
    ],
    optional: [
      "University admission letter (for students)",
      "Visa copy or approval letter, if available",
      "Passport-size photographs (only for a few embassies)",
    ],
  },
  {
    title: "PCC Apostille",
    badge: "India",
    icon: Stamp,
    required: [
      "Original Police Clearance Certificate (PCC) from PSK / Passport Office / Local Police",
      "Passport copy – front & back page",
      "PCC issued as per the format accepted by destination country",
    ],
    optional: [
      "University admission letter (for students)",
      "Employment contract / offer letter (for job seekers)",
      "Visa appointment / application proof, if any",
    ],
  },
];

export default function PccDocumentsRequired() {
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
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Document Checklist</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Documents Required for PCC Legalization & Apostille
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            PCC attestation process starts with verification from the issuing authority (PSK / Passport Office or Local Police). 
            After verification, the document is authenticated at the state level and then submitted to MEA for Apostille or Attestation.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {pccVariants.map((variant, index) => {
            const Icon = variant.icon;
            
            return (
              <div
                key={variant.title}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Card Header */}
                <div className="p-6 pb-4" style={{ backgroundColor: `${PRIMARY_COLOR}05` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}15` }}>
                      <Icon className="w-7 h-7" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{variant.title}</h3>
                      <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${PRIMARY_COLOR}10`, color: PRIMARY_COLOR }}>
                        <Globe2 className="w-3 h-3" />
                        <span>{variant.badge}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Required Documents */}
                <div className="p-6 pb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                      <FileCheck className="w-3.5 h-3.5" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <h4 className="font-semibold text-gray-800">Mandatory Documents</h4>
                  </div>
                  <ul className="space-y-2">
                    {variant.required.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: PRIMARY_COLOR }} />
                        <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Optional Documents */}
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                      <AlertCircle className="w-3.5 h-3.5" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <h4 className="font-semibold text-gray-800">Supporting / Optional Documents</h4>
                  </div>
                  <ul className="space-y-2">
                    {variant.optional.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
                        </div>
                        <span className="text-gray-500 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Processing: 5-7 days</span>
                    </div>
                    <button className="text-sm font-medium flex items-center gap-1 transition-all duration-300 hover:gap-2" style={{ color: PRIMARY_COLOR }}>
                      Download Checklist
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer Note */}
        <div className="mt-8 text-center" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: PRIMARY_COLOR }} />
            <p className="text-xs text-gray-500">
              EGS helps you verify the exact requirement as per your destination country's latest rules before starting the process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}