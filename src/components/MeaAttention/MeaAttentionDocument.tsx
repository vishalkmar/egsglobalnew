"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  GraduationCap, 
  Heart, 
  Briefcase, 
  FileCheck, 
  Sparkles,
  ChevronRight,
  CheckCircle,
  Shield,
  Globe
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const documentsRequired = [
  { icon: FileCheck, text: "Original Documents" },
  { icon: Shield, text: "Passport Copy" }
];

const categories = [
  {
    title: "Educational Documents",
    icon: GraduationCap,
    items: [
      "Degree certificate",
      "Diploma certificate",
      "Mark sheets",
      "Transfer Certificate",
      "Nursing Certificate"
    ]
  },
  {
    title: "Personal Documents",
    icon: Heart,
    items: [
      "Birth certificate",
      "Marriage certificate",
      "Death certificate",
      "Divorce certificate",
      "PCC Certificate"
    ]
  },
  {
    title: "Commercial Documents",
    icon: Briefcase,
    items: [
      "Power of Attorney",
      "Company Invoices",
      "Export Documentation",
      "Certificates of Incorporation",
      "Memorandum of Association"
    ]
  }
];

export default function MeaDocumentsSection() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#f5f6f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-4 shadow-sm border border-gray-100">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Document Checklist</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Documents Required For MEA Attestation
          </h2>
          
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            The documents required for MEA attestation are broadly classified into educational, 
            personal and commercial categories.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Required Documents Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
          {documentsRequired.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                <Icon className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                <span className="text-gray-700 text-sm">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Sub Header */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Types of Documents That Need MEA Attestation
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Below is an overview of the documents that are commonly attested for use abroad
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <div
                key={category.title}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                      <Icon className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{category.title}</h3>
                      <p className="text-xs text-gray-500">{category.items.length} document types</p>
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-5">
                  <div className="space-y-2">
                    {category.items.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                        <span className="text-gray-600 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Card Footer */}
                <div className="px-5 pb-5">
                  {/* <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1" style={{ backgroundColor: `${PRIMARY_COLOR}10`, color: PRIMARY_COLOR }}>
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Info Note */}
        <div className="mt-10 p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center" data-aos="fade-up">
          <p className="text-xs text-gray-500">
            EGS helps you prepare and submit the right documents for MEA attestation based on your destination country's requirements.
          </p>
        </div>
      </div>
    </section>
  );
}