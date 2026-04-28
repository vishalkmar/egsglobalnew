"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Globe,
  Users,
  FileText,
  Clock,
  MapPin,
  Sparkles,
  Award,
  ArrowRight
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const indiaImg = "https://flagcdn.com/w320/in.png";
const bangladeshImg = "https://flagcdn.com/w320/bd.png";
const nepalImg = "https://flagcdn.com/w320/np.png";

export default function KeyConsiderationsSection() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const cards = [
    {
      img: indiaImg,
      alt: "India",
      title: "Indian Citizens",
      subtitle: "Applicants residing in India",
      color: "#FF9933",
      borderColor: "from-orange-400 to-orange-600",
      points: [
        "Correct visa category – Tourist / Business / Student / Work / Transit must match travel purpose",
        "Accurate passport details – Name, DOB, passport number exactly as in passport",
        "Jurisdiction check – Ensure Delhi VFS / Embassy is correct for your state of residence",
        "Previous travel history – Declare all Schengen / US / UK / other visas honestly",
        "Passport validity – Ideally 6+ months beyond travel date with blank pages",
        "Active contact details – Working email and Indian mobile number for OTPs",
        "Biometrics history – Check if old biometrics are valid or new ones required"
      ]
    },
    {
      img: bangladeshImg,
      alt: "Bangladesh",
      title: "Bangladesh Citizens",
      subtitle: "Applicants residing in India",
      color: "#006A4E",
      borderColor: "from-emerald-400 to-teal-600",
      points: [
        "Correct visa category – Tourist / Business / Student / Work / Transit must match purpose",
        "Embassy / VFS eligibility – Confirm Delhi embassy accepts Bangladeshi nationals in India",
        "Additional scrutiny – Some countries may have extra checks or longer processing",
        "Passport condition – Clean, undamaged with 6+ months validity and blank pages",
        "Data consistency – Nationality, place of birth must match passport",
        "Past visa issues – Any refusal or overstay must be declared honestly"
      ]
    },
    {
      img: nepalImg,
      alt: "Nepal",
      title: "Nepal Citizens",
      subtitle: "Applicants residing in India",
      color: "#DC143C",
      borderColor: "from-red-400 to-rose-600",
      points: [
        "Correct visa category – Tourist / Business / Student / Work / Transit must match purpose",
        "Jurisdiction confirmation – Check if embassy allows Nepalese to apply from Delhi",
        "Country-specific rules – Some destinations may have extra verification for Nepalese",
        "Passport requirements – Clean, undamaged with 6+ months validity and blank pages",
        "Past travel / refusals – Any previous issues must be declared truthfully"
      ]
    }
  ];

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
            <Shield className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Important Guidelines</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Country-wise Guidelines
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Review the important points below before booking an appointment for Indian, Bangladeshi, or Nepalese applicants residing in India.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Top Gradient Bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${card.borderColor}`} />
              
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
                      <img
                        src={card.img}
                        alt={card.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="px-6 pb-6">
                <div className="space-y-2.5">
                  {card.points.map((point, pointIdx) => (
                    <div key={pointIdx} className="flex gap-2 group/point">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                          <CheckCircle className="w-2.5 h-2.5" style={{ color: PRIMARY_COLOR }} />
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed group-hover/point:text-gray-800 transition-colors">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-gray-100 mt-2">
                <button className="flex items-center gap-1 text-xs font-medium transition-all duration-300 hover:gap-2" style={{ color: PRIMARY_COLOR }}>
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Note */}
        <div className="mt-8 text-center" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
            <AlertCircle className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
            <p className="text-xs text-gray-400">
              These are general guidelines. Exact requirements may vary by country, embassy / consulate and the latest visa rules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}