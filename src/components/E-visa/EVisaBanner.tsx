"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Send
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

export default function VisaBanner() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Fast. Simple. Reliable.";

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
    <section className="relative overflow-hidden  bg-gradient-to-br from-white via-slate-50 to-[#f0f4f8]">
      
      {/* Subtle Dots Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      {/* Decorative Circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#294d6b]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#1a3650]/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#294d6b]/3 blur-3xl" />
      
      {/* Content Container - Centered */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6 border border-gray-100" data-aos="fade-down">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>E-Visa & Travel Assistance</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-gray-800" data-aos="fade-up">
            E-Visa & Travel
            <span className="block mt-2" style={{ color: PRIMARY_COLOR }}>Assistance</span>
          </h1>
          
          {/* Typed Subheading */}
          <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-500">
              {typedText}
            </span>
            <span className={`inline-block w-[2px] h-7 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
          
          {/* Description */}
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8" data-aos="fade-up" data-aos-delay="200">
            Apply online with expert guidance. We help you submit the right documents, 
            avoid rejections, and track your application end-to-end.
          </p>
          
          {/* Feature List - Centered */}
          <div className="flex flex-wrap justify-center gap-5 mb-10" data-aos="fade-up" data-aos-delay="300">
            {[
              "Expert document review",
              "End-to-end tracking",
              "Avoid common rejections"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                  <CheckCircle className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                </div>
                <span className="text-gray-600 text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="400">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-lg group" style={{ backgroundColor: PRIMARY_COLOR }}>
              Apply for E-Visa
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-semibold hover:border-[#294d6b] hover:text-[#294d6b] transition-all duration-300">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Simple Wave Bottom */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" fill="#f5f6f8">
          <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
        </svg>
      </div>
    </section>
  );
}