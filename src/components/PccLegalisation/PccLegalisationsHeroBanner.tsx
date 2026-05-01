"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Sparkles, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Award,
  Clock,
  FileCheck,
  Users,
  Globe,
  Fingerprint
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

export default function PccLegalizationHero() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "PCC Legalization & Apostille";

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      {/* Full Width Hero Banner - No Image */}
      <section className="relative w-full min-h-[75vh] md:min-h-[80vh] overflow-hidden pt-24 md:pt-28" style={{ backgroundColor: PRIMARY_COLOR }}>
        
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Decorative Animated Blobs */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Content Container - Centered */}
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20" data-aos="fade-down">
              <Fingerprint className="w-4 h-4 text-white" />
              <span className="text-white/90 text-sm font-medium">PCC Legalization Services</span>
            </div>
            
            {/* Main Heading with Typing Effect */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight" data-aos="fade-up">
              {typedText}
              <span className={`inline-block w-[3px] h-10 ml-2 align-middle bg-white/80 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
            </h1>
            
            {/* Description */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
              EGS Group provides complete PCC legalization support for employment, immigration, 
              and long-term visa requirements with PSK, MEA and embassy coordination.
            </p>
            
            {/* Features Grid */}
            <div className="flex flex-wrap justify-center gap-4 mb-10" data-aos="fade-up" data-aos-delay="200">
              {[
                { icon: Shield, text: "PSK Coordination" },
                { icon: Globe, text: "MEA Attestation" },
                { icon: Award, text: "Embassy Legalization" },
                { icon: Clock, text: "Fast Processing" }
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <Icon className="w-3.5 h-3.5 text-white/80" />
                    <span className="text-white/80 text-xs">{feature.text}</span>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="300">
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-gray-800 font-semibold transition-all duration-300 hover:shadow-xl group bg-white">
                Get PCC Legalization
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300">
                Learn Process
              </button>
            </div>
          </div>
        </div>

        {/* Curved Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" fill="#f5f6f8">
            <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
          </svg>
        </div>
      </section>
    </>
  );
}