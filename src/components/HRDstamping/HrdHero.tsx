"use client";

import React, { useEffect } from "react";
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
  GraduationCap,
  Briefcase,
  Globe
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

export default function HRDAttestationBanner() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const stats = [
    {
      icon: GraduationCap,
      value: "10,000+",
      label: "Students Served",
      progress: 85
    },
    {
      icon: Briefcase,
      value: "5,000+",
      label: "Professionals",
      progress: 70
    },
    {
      icon: Globe,
      value: "50+",
      label: "Countries",
      progress: 60
    },
    {
      icon: Clock,
      value: "5-7 Days",
      label: "Processing Time",
      progress: 90
    }
  ];

  return (
    <>
      {/* Full Width Hero Banner - No Image, Only Theme Color */}
      <section className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden pt-20 md:pt-24" style={{ backgroundColor: PRIMARY_COLOR }}>
        
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Decorative Animated Blobs */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Content Container */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Content */}
              <div data-aos="fade-right">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white/90 text-sm font-medium">HRD Attestation by EGS Group</span>
                </div>
                
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                  Seamless HRD Attestation
                  <span className="block mt-2">for Students &</span>
                  <span className="block text-white/90">Professionals</span>
                </h1>
                
                {/* Subheading */}
                <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl">
                  Get your educational documents attested by State HRD authorities for overseas education, employment, and visa purposes. Fast, reliable & government-approved.
                </p>
                
                {/* Quick Features */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    { icon: Shield, text: "Govt. Approved" },
                    { icon: Clock, text: "Fast Processing" },
                    { icon: FileCheck, text: "100% Genuine" },
                    { icon: Users, text: "10K+ Happy Clients" }
                  ].map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                          <Icon className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-white/80 text-xs">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-xl group bg-white text-gray-800">
                    Get HRD Attestation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300">
                    Learn Process
                  </button>
                </div>
                
                {/* Trust Badge */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex flex-wrap items-center gap-4 text-white/60 text-xs">
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>ISO Certified</span>
                    </div>
                    <div className="hidden sm:block w-4 h-px bg-white/20" />
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>MEA Recognized</span>
                    </div>
                    <div className="hidden sm:block w-4 h-px bg-white/20" />
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Data Protected</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Animated Circular Stats Cards */}
              <div data-aos="fade-left">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="relative group">
                        {/* Animated Border Circle */}
                        <div className="relative flex flex-col items-center justify-center p-4">
                          {/* Outer Glow Ring */}
                          <div className="absolute inset-0 rounded-full bg-white/5 blur-xl group-hover:blur-2xl transition-all duration-500" />
                          
                          {/* Rotating Border Circle */}
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                            {/* SVG Circle with Progress */}
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                              {/* Background Circle */}
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="3"
                              />
                              {/* Animated Progress Circle */}
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 52}`}
                                strokeDashoffset={`${2 * Math.PI * 52 * (1 - stat.progress / 100)}`}
                                className="transition-all duration-1000 ease-out"
                                style={{ stroke: "white" }}
                              />
                              {/* Animated Rotating Dashed Border */}
                              <circle
                                cx="60"
                                cy="60"
                                r="56"
                                fill="none"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="1.5"
                                strokeDasharray="8 12"
                                className="animate-spin-slow"
                              />
                            </svg>
                            
                            {/* Icon inside circle */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Value & Label */}
                          <div className="text-center mt-4">
                            <div className="text-xl sm:text-2xl font-bold text-white">
                              {stat.value}
                            </div>
                            <div className="text-xs text-white/70 mt-1">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Floating Trust Badge */}
                <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white/80 text-sm">Trusted by 15,000+ customers</span>
                  </div>
                </div>
              </div>
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

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </>
  );
}