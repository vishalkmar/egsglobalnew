"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  MapPin,
  ChevronRight,
  Globe,
  Shield,
  ArrowRight
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

type Destination = {
  name: string;
  image: string;
  badge?: string;
  visaType: string;
  stayDuration: string;
  processingTime: string;
  entryType: string;
};

const DESTINATIONS: Destination[] = [
  {
    name: "Dubai",
    image: "/visa/countries/dubai.jpg",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "4–6 days",
    entryType: "Single",
  },
  {
    name: "Oman",
    image: "/visa/countries/oman.jpg",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "1-3 days",
    entryType: "Single Entry",
  },
  {
    name: "Singapore",
    image: "/visa/countries/singapore.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "3–5 days",
    entryType: "Single / Multiple",
  },
  {
    name: "Vietnam",
    image: "/visa/countries/viatnamm.jpg",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "4–7 days",
    entryType: "Single / Multiple",
  },
  {
    name: "Russia",
    image: "/visa/countries/russia.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "15/30 days",
    processingTime: "10–15 days",
    entryType: "Single / Double",
  },
  {
    name: "Thailand",
    image: "/visa/countries/thailand.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/15/30 days",
    processingTime: "2–5 days",
    entryType: "Single / Multiple",
  },
  {
    name: "Azerbaijan",
    image: "/visa/countries/azerbaijan.jpg",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "3–7 days",
    entryType: "Single / Multiple",
  },
  {
    name: "Bahrain",
    image: "/visa/countries/bahrain.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/15/30 days",
    processingTime: "3-5 days",
    entryType: "Single Entry",
  },
  {
    name: "Armenia",
    image: "/visa/countries/armenia.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "3-5 days",
    entryType: "Single Entry",
  },
  {
    name: "Egypt",
    image: "/visa/countries/egypt.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "5–7 days",
    entryType: "Single Entry",
  },
];

function MoreCountriesCard() {
  return (
    <div className="group bg-gradient-to-br from-[#294d6b] to-[#1a3650] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
      <div className="p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">More Countries</h3>
        <p className="text-white/70 text-sm mb-4">
          Didn't find your destination? We process visas for many more countries.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80">Tourist Visa</span>
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80">Business Visa</span>
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80">E-Visa</span>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-5 py-2 rounded-full transition-all duration-300">
          Contact Us
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function PopularDestinations() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleDestinations = DESTINATIONS.slice(0, visibleCount);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const handleLoadMore = () => setVisibleCount(DESTINATIONS.length);

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
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Handpicked for you</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Popular Visa Destinations
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Browse top countries travellers are applying for right now.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDestinations.map((dest, index) => (
            <div
              key={dest.name}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 80, 400)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {dest.badge && (
                  <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700">
                    {dest.badge}
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#294d6b] transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex gap-1.5">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {dest.visaType}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {dest.entryType}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400">Stay Duration</p>
                      <p className="text-sm font-medium text-gray-700">{dest.stayDuration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-[10px] text-gray-400">Processing</p>
                      <p className="text-sm font-medium text-gray-700">{dest.processingTime}</p>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 w-full py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1" style={{ backgroundColor: `${PRIMARY_COLOR}10`, color: PRIMARY_COLOR }}>
                  Apply Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {/* More Countries Card */}
          <div className="hidden lg:block">
            <MoreCountriesCard />
          </div>
        </div>
        
        {/* Load More */}
        {visibleCount < DESTINATIONS.length && (
          <div className="flex justify-center mt-10" data-aos="fade-up">
            <button
              onClick={handleLoadMore}
              className="px-8 py-2.5 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90 shadow-md"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Load More Destinations
            </button>
          </div>
        )}
      </div>
    </section>
  );
}