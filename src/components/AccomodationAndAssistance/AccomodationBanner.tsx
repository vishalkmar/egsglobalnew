"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Shield, 
  Clock, 
  MapPin, 
  Wifi, 
  Coffee, 
  Sparkles,
  Hotel,
  Home,
  Users
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const hotelImages = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Luxury Hotel",
    location: "Connaught Place, Delhi",
    price: "₹4,500/night",
    amenities: ["WiFi", "AC", "Restaurant", "Gym"]
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Budget Stay",
    location: "Paharganj, Delhi",
    price: "₹1,200/night",
    amenities: ["WiFi", "AC", "Free Breakfast"]
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Serviced Apartment",
    location: "South Delhi",
    price: "₹6,000/night",
    amenities: ["WiFi", "AC", "Kitchen", "Parking"]
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Hostel",
    location: "Hauz Khas, Delhi",
    price: "₹599/night",
    amenities: ["WiFi", "Bunk Bed", "Common Area"]
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Premium Hotel",
    location: "Aerocity, Delhi",
    price: "₹8,500/night",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant"]
  }
];

const stats = [
  { label: "Delhi Coverage", value: "50+ Hotels & Hostels", icon: Building2 },
  { label: "Safe Areas", value: "Verified Localities", icon: Shield },
  { label: "24/7 Support", value: "Assistance till Check-in", icon: Clock },
  { label: "Budget Options", value: "₹599 to ₹10,000+", icon: MapPin },
];

export default function AccommodationAssistanceBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hotelImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % hotelImages.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentHotel = hotelImages[currentIndex];

  return (
    <section className="relative overflow-hidden bg-[#f5f6f8]">
      
      {/* Subtle Dots Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Header */}
        <div className="text-center mb-10" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Hotel className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Accommodation Assistance</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Safe & Budget-Friendly Stays
            <span className="block mt-2 text-gray-800">in Delhi</span>
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Finding the right place to stay is essential for a comfortable journey. 
            We help travelers secure safe, reliable, and well-connected accommodations.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Side - Content */}
          <div data-aos="fade-right">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  We Make Your Stay 
                  <span className="relative inline-block ml-2" style={{ color: PRIMARY_COLOR }}>
                    Hassle-Free
                    <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 100 4" fill="none">
                      <path d="M0 2 L100 2" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h2>
                
                <p className="text-gray-600 leading-relaxed">
                  Accommodation assistance in Delhi for every type of traveller. From affordable stays 
                  to premium housing options, we help you secure safe, reliable, and well-connected 
                  accommodations tailored to your needs, preferences, and budgets.
                </p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <Icon className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                        <p className="text-sm font-semibold text-gray-800">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Amenities */}
              <div className="flex flex-wrap gap-2">
                {["Verified Areas", "Budget to Premium", "Smooth Check-in", "24/7 Support"].map((item) => (
                  <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  className="px-6 py-2.5 rounded-full text-white font-semibold transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  Find Accommodation
                </button>
                <button 
                  className="px-6 py-2.5 rounded-full border-2 font-semibold transition-all duration-300 hover:shadow-md"
                  style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
                >
                  Talk to Coordinator
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Side - Carousel */}
          <div data-aos="fade-left">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={currentHotel.url}
                    alt={currentHotel.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold" style={{ color: PRIMARY_COLOR }}>{currentHotel.price}</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{currentHotel.title}</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{currentHotel.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentHotel.amenities.map((amenity) => (
                      <span key={amenity} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
              </button>
              
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {hotelImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIndex
                        ? "w-6 h-1.5"
                        : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    style={{ backgroundColor: idx === currentIndex ? PRIMARY_COLOR : undefined }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
