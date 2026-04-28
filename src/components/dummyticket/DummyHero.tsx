"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Plane, 
  Shield, 
  Clock, 
  FileText, 
  CheckCircle,
  ArrowRight,
  Ticket,
  Heart,
  Globe,
  Phone
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

export default function DummyTicketHero() {
  const [activeTab, setActiveTab] = useState<"insurance" | "ticket">("insurance");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      {/* Hero Section - Unique Split Design */}
      <section className="relative overflow-hidden pt-24 md:pt-28">
        {/* Background Gradient - Unique */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4f8] via-white to-[#e8edf2]" />
        
        {/* Decorative Circles - Unique */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#294d6b]/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#1a3650]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#294d6b]/3 blur-3xl" />
        
        {/* Dots Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          
          {/* Tab Switcher - Unique Feature */}
          <div className="flex justify-center mb-12" data-aos="fade-up">
            <div className="bg-white rounded-full p-1 shadow-md border border-gray-100">
              <button
                onClick={() => setActiveTab("insurance")}
                className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "insurance"
                    ? "text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                style={{ backgroundColor: activeTab === "insurance" ? PRIMARY_COLOR : "transparent" }}
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Travel Insurance
              </button>
              <button
                onClick={() => setActiveTab("ticket")}
                className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "ticket"
                    ? "text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                style={{ backgroundColor: activeTab === "ticket" ? PRIMARY_COLOR : "transparent" }}
              >
                <Ticket className="w-4 h-4 inline mr-2" />
                Dummy Ticket
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Dynamic Content */}
            <div data-aos="fade-right">
              {activeTab === "insurance" ? (
                <>
                  <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6 border border-gray-100">
                    <Heart className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                    <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Comprehensive Coverage</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
                    Travel Insurance
                    <span className="block mt-2" style={{ color: PRIMARY_COLOR }}>For Safe Journey</span>
                  </h1>
                  
                  <p className="text-gray-600 text-base md:text-lg mb-4">
                    Comprehensive protection for medical emergencies, trip cancellations & baggage loss
                  </p>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    EGS Group partners with leading insurance providers to offer comprehensive travel 
                    insurance plans covering medical emergencies, accidents, trip cancellations, and 
                    baggage loss. Get peace of mind for your international travel.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      "Medical Emergency", "Trip Cancellation", 
                      "Baggage Loss", "24/7 Assistance"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
                    <span style={{ backgroundColor: PRIMARY_COLOR }} className="px-6 py-3 rounded-full">
                      Get Insurance Quote
                      <ArrowRight className="w-4 h-4 inline ml-2" />
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6 border border-gray-100">
                    <Plane className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                    <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Visa Ready</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
                    Dummy Ticket
                    <span className="block mt-2" style={{ color: PRIMARY_COLOR }}>For Visa Application</span>
                  </h1>
                  
                  <p className="text-gray-600 text-base md:text-lg mb-4">
                    Embassy-compliant flight reservations for stronger visa applications
                  </p>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    Our reliable dummy ticket services meet embassy and consulate requirements for 
                    visa applications, providing genuine, verifiable bookings that strengthen your 
                    application and ensure compliance with all visa regulations.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      "Embassy Compliant", "Verifiable Booking", 
                      "Instant Delivery", "Best Price Guarantee"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
                    <span style={{ backgroundColor: PRIMARY_COLOR }} className="px-6 py-3 rounded-full">
                      Book Dummy Ticket
                      <ArrowRight className="w-4 h-4 inline ml-2" />
                    </span>
                  </button>
                </>
              )}
            </div>
            
            {/* Right Side - Animated Card */}
            <div className="relative" data-aos="fade-left">
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                {activeTab === "insurance" ? (
                  <>
                    <div className="bg-gradient-to-r from-[#294d6b] to-[#1a3650] px-6 py-4">
                      <h3 className="text-white font-bold text-lg">Insurance Plans</h3>
                      <p className="text-white/70 text-sm">Choose the best plan for your trip</p>
                    </div>
                    <div className="p-6 space-y-4">
                      {[
                        { plan: "Basic", price: "₹999", coverage: "Medical Only" },
                        { plan: "Standard", price: "₹1,999", coverage: "Medical + Trip" },
                        { plan: "Premium", price: "₹3,499", coverage: "Full Coverage" }
                      ].map((plan, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:shadow-md transition-all">
                          <div>
                            <h4 className="font-semibold text-gray-800">{plan.plan}</h4>
                            <p className="text-xs text-gray-500">{plan.coverage}</p>
                          </div>
                          <div className="text-xl font-bold" style={{ color: PRIMARY_COLOR }}>{plan.price}</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-[#294d6b] to-[#1a3650] px-6 py-4">
                      <h3 className="text-white font-bold text-lg">Dummy Ticket Package</h3>
                      <p className="text-white/70 text-sm">Get your flight reservation instantly</p>
                    </div>
                    <div className="p-6 space-y-4">
                      {[
                        { type: "Flight Hold", validity: "48 Hours", price: "₹999" },
                        { type: "Confirmed Booking", validity: "7 Days", price: "₹1,999" },
                        { type: "Premium", validity: "14 Days", price: "₹2,999" }
                      ].map((pkg, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:shadow-md transition-all">
                          <div>
                            <h4 className="font-semibold text-gray-800">{pkg.type}</h4>
                            <p className="text-xs text-gray-500">Valid for {pkg.validity}</p>
                          </div>
                          <div className="text-xl font-bold" style={{ color: PRIMARY_COLOR }}>{pkg.price}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {/* Trust Badge */}
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield className="w-3 h-3" style={{ color: PRIMARY_COLOR }} />
                    <span>Trusted by 50,000+ travelers</span>
                    <Globe className="w-3 h-3 ml-2" style={{ color: PRIMARY_COLOR }} />
                    <span>100+ countries</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Contact Card */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-lg p-3 hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                    <Phone className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Need help?</p>
                    <p className="text-sm font-semibold" style={{ color: PRIMARY_COLOR }}>+91 8199050506</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Simple Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" fill="#f5f6f8">
            <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
          </svg>
        </div>
      </section>
    </>
  );
}