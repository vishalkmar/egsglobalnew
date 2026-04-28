"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeetGreetServices from "@/components/meetandgreet/MeetandGreetServices";

import AOS from "aos";
import "aos/dist/aos.css";

import { 
  Sparkles, 
  Users, 
  Clock, 
  Shield, 
  Car, 
  MapPin, 
  Headphones,
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import HowItWorks from "@/components/meetandgreet/HowItWork";
import WhoItsFor from "@/components/meetandgreet/WhoIsItFor";


const HEADING_TEXT = "Premium Guest Handling";

interface MeetGreetFormData {
  name: string;
  email: string;
  phone: string;
  arrivalDate: string;
  submissionDate: string;
  visaType: string;
  submissionCountry: string;
}

const MeetGreetBanner: React.FC = () => {

  const PRIMARY_COLOR = "#294d6b";

  // ✅ LOGIN HELPERS (ONLY LOGIC)
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const redirectToLogin = () => {
    const next =
      typeof window !== "undefined"
        ? encodeURIComponent(window.location.pathname + window.location.search)
        : "";
    window.location.href = `/login?next=${next}`;
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // ✅ repeat on every scroll in/out
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const [typedHeading, setTypedHeading] = useState("");
  const [formData, setFormData] = useState<MeetGreetFormData>({
    name: "",
    email: "",
    phone: "",
    arrivalDate: "",
    submissionDate: "",
    visaType: "",
    submissionCountry: "",
  });

  // typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedHeading(HEADING_TEXT.slice(0, index + 1));
      index++;
      if (index >= HEADING_TEXT.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // ✅ LOGIN CHECK (ONLY ADDITION)
    const token = getToken();
    if (!token) {
      redirectToLogin();
      return;
    }

    console.log("Meet & Greet Form Data:", formData);
    alert("Meet & Greet data submitted successfully");
    // Yahan API call add kar sakte ho
  };

  return (
    <>
      <Header />

           {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-5" style={{ backgroundColor: PRIMARY_COLOR }}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/meetgreet/meetgreatbanner.jpg" 
            alt="Meet & Greet Service"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div data-aos="fade-right">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white/90 text-sm font-medium">Premium Service</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Premium Guest
                <span className="block mt-2">Handling Service</span>
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/70 text-sm">Trusted by 2,000+ travelers</span>
              </div>
              
              <p className="text-white/80 text-base md:text-lg mb-4">
                Personalized facilitation for stress-free travel experiences
              </p>
              
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Travel with comfort and confidence through our premium meet & greet services. 
                EGS Group arranges professional airport pick-up and drop-off solutions, 
                as well as hotel-to-VFS return transfers for visa appointments. From arrival 
                assistance to secure, punctual transport, our services are designed to make 
                your travel experience seamless, stress-free, and personalized.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Clock, text: "24/7 Availability" },
                  { icon: Shield, text: "Professional Staff" },
                  { icon: Car, text: "Luxury Transport" },
                  { icon: MapPin, text: "Airport to Anywhere" },
                  { icon: Headphones, text: "Dedicated Support" },
                  { icon: CheckCircle, text: "100% Reliable" },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/80 text-sm">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-gray-800 font-semibold hover:shadow-lg transition-all duration-300">
                  Enquire Now
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300">
                  View Services
                </button>
              </div>
            </div>
            
            {/* Right Side - Image */}
            <div data-aos="fade-left">
              <div className="relative">
                {/* Main Image Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/meetgreet/meetgreatbanner.jpg"
                    alt="Meet & Greet Service"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                      <Users className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: PRIMARY_COLOR }}>500+</div>
                      <div className="text-xs text-gray-500">Happy Clients</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge 2 */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                      <Clock className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: PRIMARY_COLOR }}>15 min</div>
                      <div className="text-xs text-gray-500">Response Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" fill="#f5f6f8">
            <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
          </svg>
        </div>
      </section>
      <MeetGreetServices />
      <HowItWorks/>
      <WhoItsFor/>
      <Footer />
    </>
  );
};

export default MeetGreetBanner;


