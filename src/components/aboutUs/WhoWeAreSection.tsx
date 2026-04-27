"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CheckCircle, Shield, Target, Heart, TrendingUp, Users, Clock, Award } from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

export default function WhoWeAre() {
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Image */}
          <div data-aos="fade-right">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPbSG3CQwufIDy95d5VFRqfutyILa49PFefQ&s"
                  alt="EGS Group Team"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                    <Award className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>10+ Years</div>
                    <div className="text-xs text-gray-500">Of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div data-aos="fade-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
              <Shield className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
              <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Who We Are</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
              Redefining Global Travel & Documentation Services
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              At EGS Group, we go beyond being just a service provider—we are your trusted partner 
              in simplifying global travel and documentation requirements. Based in the heart of Delhi, 
              we specialize in crafting high-quality, exam-accurate solutions for travelers worldwide.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              With years of expertise, a dedicated team of professionals, and a client-first approach, 
              we ensure every service is delivered with accuracy, transparency, and efficiency.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                <span className="text-gray-700 text-sm">100% Transparency</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                <span className="text-gray-700 text-sm">Expert Guidance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                <span className="text-gray-700 text-sm">Fast Processing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                <span className="text-gray-700 text-sm">Best Price Guarantee</span>
              </div>
            </div>
            
            <button 
              className="px-6 py-2.5 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}