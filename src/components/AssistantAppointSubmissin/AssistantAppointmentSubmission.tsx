"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Sparkles, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  FileText,
  Globe,
  Users,
  Clock,
  Briefcase,
  Plane,
  MapPin,
  Award,
  TrendingUp
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

export default function AppointmentSubmissionHero() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const countries = ["North Macedonia", "Romania", "Serbia", "Italy", "Croatia"];

  const stats = [
    {
      icon: Calendar,
      value: "30+",
      label: "Daily Appointments",
      progress: 75,
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: FileText,
      value: "98%",
      label: "Success Rate",
      progress: 98,
      color: "from-emerald-400 to-teal-400"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Support Available",
      progress: 100,
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: Users,
      value: "10K+",
      label: "Happy Clients",
      progress: 85,
      color: "from-orange-400 to-red-400"
    }
  ];

  return (
    <>
      {/* Full Width Hero Banner */}
      <section className="relative w-full min-h-[90vh] overflow-hidden pt-20 md:pt-24" style={{ backgroundColor: PRIMARY_COLOR }}>
        
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
                  <span className="text-white/90 text-sm font-medium">Visa Support Services</span>
                </div>
                
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                  Assistance in
                  <span className="block mt-2">Appointment &</span>
                  <span className="block text-white/90">Submission</span>
                </h1>
                
                {/* Subheading */}
                <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl">
                  EGS Group helps you with visa appointment bookings and document submission for European Countries. 
                  Share your preferred submission date, country and visa type, and our team will coordinate the next steps with you.
                </p>
                
                {/* Features List */}
                <div className="space-y-2.5 mb-8">
                  {[
                    "Appointment booking support for selected embassies",
                    "Guided document submission for work, business and tourist visas",
                    "Dedicated assistance for applicants from India, Nepal and Bangladesh"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Countries Served */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-white/70" />
                    <span className="text-white/80 text-sm font-medium">Countries We Serve:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {countries.map((country, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs hover:bg-white/20 transition-all duration-300">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-xl group bg-white text-gray-800">
                    Enquire Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300">
                    Learn Process
                  </button>
                </div>
              </div>
              
              {/* Right Side - Beautiful Circular Stats Cards */}
              <div data-aos="fade-left">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="relative group">
                        {/* Animated Outer Glow */}
                        <div className="absolute -inset-2 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Circular Card */}
                        <div className="relative flex flex-col items-center text-center p-4">
                          {/* Animated Progress Circle */}
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                              {/* Background Ring */}
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="4"
                              />
                              {/* Gradient Progress Ring */}
                              <defs>
                                <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" className="stop-color" />
                                  <stop offset="100%" className="stop-color" />
                                </linearGradient>
                              </defs>
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke={`url(#grad-${idx})`}
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 52}`}
                                strokeDashoffset={`${2 * Math.PI * 52 * (1 - stat.progress / 100)}`}
                                className="transition-all duration-1000 ease-out"
                              />
                              {/* Rotating Dashed Border */}
                              <circle
                                cx="60"
                                cy="60"
                                r="56"
                                fill="none"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="1.5"
                                strokeDasharray="6 10"
                                className="animate-spin-slow"
                              />
                            </svg>
                            
                            {/* Icon Inside Circle */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Value & Label */}
                          <div className="mt-4 text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">
                              {stat.value}
                            </div>
                            <div className="text-xs text-white/70 mt-1 max-w-[80px] mx-auto">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Visa Types Badge */}
                <div className="mt-8 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-white/70" />
                    <span className="text-white/80 text-sm font-medium">Visa Support For:</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10">
                      <Briefcase className="w-3.5 h-3.5 text-white/80" />
                      <span className="text-white/80 text-xs">Work Visa</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10">
                      <Plane className="w-3.5 h-3.5 text-white/80" />
                      <span className="text-white/80 text-xs">Business Visa</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10">
                      <MapPin className="w-3.5 h-3.5 text-white/80" />
                      <span className="text-white/80 text-xs">Tourist Visa</span>
                    </div>
                  </div>
                </div>
                
                {/* Trust Badge */}
                <div className="mt-5 flex items-center justify-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/70 text-xs ml-2">Trusted by 10,000+ travelers</span>
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
          animation: spin-slow 6s linear infinite;
        }
        .stop-color {
          stop-color: white;
        }
      `}</style>
    </>
  );
}