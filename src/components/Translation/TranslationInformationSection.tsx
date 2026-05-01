"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FileText, 
  Award, 
  Shield, 
  Clock, 
  CheckCircle,
  Sparkles,
  Globe,
  Users,
  ArrowRight,
  Languages,
  BookOpen
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

type TabKey = "what" | "benefits" | "why";

interface TabContent {
  heading: string;
  content: React.ReactNode;
  features?: string[];
}

const ImmigrationTabs: Record<TabKey, TabContent> = {
  what: {
    heading: "What Is Immigration Translation?",
    features: ["Official Documents", "Legal Compliance", "Certified Translation"],
    content: (
      <>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Immigration translation is the translation of documents needed for immigration purposes, 
          such as birth certificates, marriage certificates, divorce decrees, educational transcripts 
          and employment records. These documents must be accurately translated to support an immigration application.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Professional translation services, employing translators fluent in both the source and target 
          languages and experienced in translating official documents, typically perform immigration translation.
        </p>
      </>
    ),
  },
  benefits: {
    heading: "Benefits of Immigration Translation",
    features: ["Accuracy", "Legality", "Speed", "Quality", "Convenience"],
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {["Accuracy - Precise, faithful translations", "Legality - Meets immigration standards", "Speed - Quick turnaround", "Quality - Clear and precise content", "Convenience - Single point of contact"].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-gray-600 text-sm">{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  why: {
    heading: "Why EGS Group for Immigration Translation?",
    features: ["Expert Translators", "Embassy Approved", "Fast Delivery"],
    content: (
      <>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          EGS Group understands the unique challenges individuals and businesses face when navigating 
          immigration processes. That's why we offer translation solutions tailored to each client's specific needs.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Our team delivers high-quality, legally compliant translations and collaborates closely with 
          clients to strengthen every immigration file.
        </p>
      </>
    ),
  },
};

const CertificateTabs: Record<TabKey, TabContent> = {
  what: {
    heading: "What Is Certificate Translation?",
    features: ["Official Documents", "Legal Verification", "Certified Service"],
    content: (
      <>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Certificate translation involves converting an official document from one language to another. 
          This service is often required when a foreign-language certificate must be presented for a job 
          application, immigration process or any legal or official purpose.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Professional translation companies like EGS Group perform certificate translation using translators 
          proficient in both languages and experienced with official documents.
        </p>
      </>
    ),
  },
  benefits: {
    heading: "Benefits of Certificate Translation",
    features: ["Accuracy", "Legality", "Speed", "Quality", "Convenience"],
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {["Accuracy - Faithful translations", "Legality - Meets official standards", "Speed - Urgent translations available", "Quality - Natural readability", "Convenience - Hassle-free process"].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-gray-600 text-sm">{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  why: {
    heading: "Why EGS Group for Certificate Translation?",
    features: ["Expert Team", "Quality Assurance", "Timely Delivery"],
    content: (
      <>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Certificates are crucial for careers, studies and legal procedures. EGS Group helps bridge 
          communication gaps when documents are in a different language.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Our translators combine linguistic expertise with industry knowledge, focusing on clarity, 
          compliance and presentation so documents are accepted confidently.
        </p>
      </>
    ),
  },
};

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ 
  label, 
  active, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active 
        ? "text-white shadow-md" 
        : "text-gray-500 hover:text-gray-700"
    }`}
    style={{ backgroundColor: active ? PRIMARY_COLOR : "transparent" }}
  >
    {label}
  </button>
);

export default function TranslationInfoSections() {
  const [immigrationTab, setImmigrationTab] = useState<TabKey>("what");
  const [certificateTab, setCertificateTab] = useState<TabKey>("what");

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
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Languages className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Translation Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Professional Translation Services
          </h2>
          
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Accurate, certified translations for immigration and official documents, accepted by embassies worldwide
          </p>
          
          <div className="flex justify-center mt-5">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Immigration Translation Section */}
        <div className="mb-16" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
              <Globe className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Immigration Translation Services
            </h3>
          </div>
          
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Tabs */}
            <div className="flex gap-2 px-6 pt-4 pb-2 border-b border-gray-100">
              <TabButton label="What It Is" active={immigrationTab === "what"} onClick={() => setImmigrationTab("what")} />
              <TabButton label="Benefits" active={immigrationTab === "benefits"} onClick={() => setImmigrationTab("benefits")} />
              <TabButton label="Why Us?" active={immigrationTab === "why"} onClick={() => setImmigrationTab("why")} />
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                {ImmigrationTabs[immigrationTab].heading}
              </h4>
              
              {/* Features Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {ImmigrationTabs[immigrationTab].features?.map((feature, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="text-gray-600 text-sm leading-relaxed">
                {ImmigrationTabs[immigrationTab].content}
              </div>
              
              <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-2" style={{ color: PRIMARY_COLOR }}>
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Translation Section */}
        <div data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
              <FileText className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Certificate Translation Services
            </h3>
          </div>
          
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Tabs */}
            <div className="flex gap-2 px-6 pt-4 pb-2 border-b border-gray-100">
              <TabButton label="What It Is" active={certificateTab === "what"} onClick={() => setCertificateTab("what")} />
              <TabButton label="Benefits" active={certificateTab === "benefits"} onClick={() => setCertificateTab("benefits")} />
              <TabButton label="Why Us?" active={certificateTab === "why"} onClick={() => setCertificateTab("why")} />
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                {CertificateTabs[certificateTab].heading}
              </h4>
              
              {/* Features Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {CertificateTabs[certificateTab].features?.map((feature, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="text-gray-600 text-sm leading-relaxed">
                {CertificateTabs[certificateTab].content}
              </div>
              
              <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-2" style={{ color: PRIMARY_COLOR }}>
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}