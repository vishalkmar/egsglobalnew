"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  MapPin, 
  Star, 
  Sparkles,
  Hotel,
  Shield,
  Clock,
  Heart,
  ArrowRight
} from "lucide-react";

const PRIMARY_COLOR = "#294d6b";

const hotels = [
  {
    id: 1,
    name: "The Leela Palace",
    location: "Chanakyapuri, New Delhi",
    price: "₹25,000/night",
    rating: 4.9,
    reviews: 2145,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tagline: "Luxury Redefined in the Heart of Delhi"
  },
  {
    id: 2,
    name: "The Oberoi",
    location: "Connaught Place, New Delhi",
    price: "₹22,000/night",
    rating: 4.8,
    reviews: 1876,
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tagline: "Iconic Luxury Overlooking Delhi Golf Course"
  },
  {
    id: 3,
    name: "Taj Mahal Hotel",
    location: "Lutyens' Delhi, New Delhi",
    price: "₹20,000/night",
    rating: 4.7,
    reviews: 2341,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tagline: "Heritage Charm with Modern Luxury"
  },
  {
    id: 4,
    name: "Andaz Delhi",
    location: "Aerocity, New Delhi",
    price: "₹15,000/night",
    rating: 4.6,
    reviews: 1567,
    image: "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tagline: "Contemporary Design Near Airport"
  }
];

export default function HotelFullWidthBanner() {
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
      setCurrentIndex((prev) => (prev + 1) % hotels.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentHotel = hotels[currentIndex];

  return (
    <>
      {/* Full Width Hero Section */}
      <section className="relative w-full h-screen min-h-[550px] max-h-[700px] overflow-hidden">
        
        {/* Background Image with Transition */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${currentHotel.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Content Container */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl" data-aos="fade-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Hotel className="w-4 h-4 text-white" />
                <span className="text-white/90 text-sm font-medium">Premium Stays in Delhi</span>
              </div>
              
              {/* Hotel Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {currentHotel.name}
              </h1>
              
              {/* Tagline */}
              <p className="text-white/80 text-base md:text-lg mb-3">
                {currentHotel.tagline}
              </p>
              
              {/* Location & Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-sm">{currentHotel.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white/70 text-sm">({currentHotel.reviews} reviews)</span>
                </div>
              </div>
              
              {/* Price & CTA */}
              <div className="flex items-center gap-4 mb-8">
                <div>
                  <span className="text-2xl md:text-3xl font-bold text-white">{currentHotel.price}</span>
                  <span className="text-white/60 text-sm"> + taxes</span>
                </div>
                <button 
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-gray-800 font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  View Details
                </button>
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, text: "Safe & Secure" },
                  { icon: Clock, text: "24/7 Support" },
                  { icon: Heart, text: "Best Price Guarantee" },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/80 text-xs">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Dots Indicator */}
              <div className="flex gap-2 mt-8">
                {hotels.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIndex
                        ? "w-8 h-2 bg-white"
                        : "w-2 h-2 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => {
            setIsAutoPlaying(false);
            setCurrentIndex((prev) => (prev - 1 + hotels.length) % hotels.length);
            setTimeout(() => setIsAutoPlaying(true), 10000);
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => {
            setIsAutoPlaying(false);
            setCurrentIndex((prev) => (prev + 1) % hotels.length);
            setTimeout(() => setIsAutoPlaying(true), 10000);
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Hotel Counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-white text-sm font-medium">
            {String(currentIndex + 1).padStart(2, '0')} / {String(hotels.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* Simple Wave Curve Below - Matching Contact Page */}
      <div className="relative -mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" fill="#f5f6f8">
          <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
        </svg>
      </div>
    </>
  );
}