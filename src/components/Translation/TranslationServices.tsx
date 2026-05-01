"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FileText, 
  Globe, 
  CheckCircle, 
  Sparkles,
  Shield,
  Clock,
  Award,
  ArrowRight,
  BookOpen,
  Users,
  Languages
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

type Category = {
  title: string;
  items: string[];
};

type TranslationCard = {
  id: string;
  heading: string;
  tagLine: string;
  description: string;
  icon: React.ElementType;
  categories: Category[];
};

const CERTIFICATE_TRANSLATION: Category[] = [
  {
    title: "Personal Certificates",
    items: ["Marriage Certificate", "Birth Certificate", "Death Certificate", "Leaving Certificate", "Police Clearance Certificate"],
  },
  {
    title: "Commercial Documents",
    items: ["Certificate of Origin", "Certificate of Incorporation", "Commercial Invoices"],
  },
  {
    title: "Educational Certificates",
    items: ["School Leaving Certificate", "College Leaving Certificate", "Degree Certificate", "Academic Mark Sheets", "Bonafide Certificate", "Post-Graduate Degree Certificate"],
  },
];

const IMMIGRATION_TRANSLATION: Category[] = [
  {
    title: "Visa & Residency Applications",
    items: ["Visa Application Forms", "Permanent Residency Documents", "Invitation Letters", "Employment Contracts"],
  },
  {
    title: "Identity & Civil Status",
    items: ["Passport & National ID", "Residence Permit", "Police Clearance Certificate (PCC)", "Civil Status Certificates"],
  },
  {
    title: "Supporting Documents",
    items: ["Bank Statements", "Salary Slips", "Sponsorship Letters", "Affidavits & Declarations"],
  },
];

const TRANSLATION_CARDS: TranslationCard[] = [
  {
    id: "certificate-translation",
    heading: "Certificate Translation",
    tagLine: "Personal • Educational • Commercial",
    description: "Professionally translated certificates with accurate formatting and terminology, accepted by embassies, universities, and international authorities.",
    icon: FileText,
    categories: CERTIFICATE_TRANSLATION,
  },
  {
    id: "immigration-translation",
    heading: "Immigration Translation",
    tagLine: "Visa • PR • Residency",
    description: "Specialised immigration translations aligned with consulate, embassy, and visa processing standards across global destinations.",
    icon: Globe,
    categories: IMMIGRATION_TRANSLATION,
  },
];

export default function TranslationServicesAtGlance() {
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
            <Languages className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Translation Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Professional Translation Solutions
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            High-accuracy translation services designed for legal validation, embassy submission, and immigration compliance.
          </p>
          
          <div className="flex justify-center mt-5">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {TRANSLATION_CARDS.map((card, cardIndex) => {
            const Icon = card.icon;
            
            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={cardIndex * 150}
              >
                {/* Card Header */}
                <div className="p-6 pb-4 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <Icon className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{card.heading}</h3>
                        <p className="text-xs text-gray-400">{card.tagLine}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">Certified</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">
                    {card.description}
                  </p>
                </div>
                
                {/* Categories */}
                <div className="p-6 space-y-5">
                  {card.categories.map((cat, catIndex) => (
                    <div key={cat.title} className="group">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
                        {cat.title}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {cat.items.map((item, itemIndex) => (
                          <div key={item} className="flex items-center gap-2 group/item">
                            <CheckCircle className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-[#294d6b] transition-colors" />
                            <span className="text-gray-600 text-xs group-hover/item:text-gray-800 transition-colors">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Certified Translation</span>
                    </div>
                    <button className="text-sm font-medium flex items-center gap-1 transition-all duration-300 hover:gap-2" style={{ color: PRIMARY_COLOR }}>
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 pt-6 border-t border-gray-200" data-aos="fade-up">
          {[
            { icon: Award, text: "Certified Translators" },
            { icon: Clock, text: "Fast Turnaround" },
            { icon: Shield, text: "Embassy Approved" },
            { icon: Users, text: "10,000+ Happy Clients" }
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                  <ItemIcon className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                </div>
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}