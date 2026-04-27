"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, MapPin, CheckCircle, Sparkles } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PRIMARY_COLOR = "#294d6b";

type CountryServiceConfig = {
  name: string;
  flag: string;
  heroImage: string;
  tagline: string;
  description: string;
  services: string[];
};

const NATIONALITIES = ["India", "Nepal", "Bangladesh"];

const countries: CountryServiceConfig[] = [
  {
    name: "North Macedonia",
    flag: "🇲🇰",
    heroImage: "/northmesodonia.jpg",
    tagline: "Rising study and work destination in the Balkans.",
    description:
      "Assistance for North Macedonia visa appointments and document submissions for students, workers and family visitors.",
    services: ["PCC Legalisation", "Appointment Submission"],
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    heroImage: "/romania.jpg",
    tagline: "Historic cities, universities and industrial hubs.",
    description:
      "Dedicated appointment booking and file submission support for Romania visas across major categories.",
    services: ["Appointment Submission"],
  },
  {
    name: "Serbia",
    flag: "🇷🇸",
    heroImage: "/serbia.jpg",
    tagline: "Popular for studies, work permits and tourism.",
    description:
      "End-to-end help for Serbia visa appointments, PCC legalisation and file submission for long and short stays.",
    services: ["PCC Legalisation", "Appointment Submission"],
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    heroImage: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Top destination for tourism, study and skilled jobs.",
    description:
      "Guidance on Italy visa requirements, PCC legalisation and appointment handling for applicants from India and neighbouring countries.",
    services: ["PCC Legalisation", "Appointment Submission"],
  },
  {
    name: "Croatia",
    flag: "🇭🇷",
    heroImage: "/cortia.jpg",
    tagline: "Schengen coastline with growing job and study options.",
    description:
      "Support for Croatia visa appointments, document checks and PCC legalisation for tourism, work and study plans.",
    services: ["PCC Legalisation", "Appointment Submission"],
  },
];

export default function CountriesSection() {
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Global Reach</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Countries We Serve
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Visa appointment handling, PCC legalisation and documentation support
            for key European destinations, tailored for South Asian applicants.
          </p>
          
          {/* Decorative Line */}
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {countries.map((country, index) => {
            const pos = index % 3;
            const aosType = pos === 0 ? "fade-right" : pos === 1 ? "fade-up" : "fade-left";
            const aosDelay = pos * 100;

            return (
              <Card
                key={country.name}
                data-aos={aosType}
                data-aos-delay={aosDelay}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-0 flex flex-col h-full"
              >
                {/* Hero Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={country.heroImage}
                    alt={`${country.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Simple Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  {/* Flag Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xl shadow-md">
                      {country.flag}
                    </div>
                  </div>
                  
                  {/* Country Name */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">
                      {country.name}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 line-clamp-1">
                      {country.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {country.description}
                  </p>

                  {/* Services & Nationalities */}
                  <div className="mb-5">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Services */}
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <Globe className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                          Services
                        </p>
                        <ul className="space-y-1.5">
                          {country.services.map((service) => (
                            <li key={service} className="flex items-center gap-1.5">
                              <CheckCircle className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                              <span className="text-xs text-gray-600">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Nationalities */}
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                          Nationalities
                        </p>
                        <ul className="space-y-1.5">
                          {NATIONALITIES.map((nat) => (
                            <li key={nat} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
                              <span className="text-xs text-gray-600">{nat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full mt-auto text-white font-medium py-2 transition-all duration-300 hover:opacity-90 group/btn"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}