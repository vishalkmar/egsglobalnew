"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  MapPin, 
  Star, 
  Wifi, 
  Coffee, 
  CarFront, 
  Dumbbell, 
  Utensils, 
  Waves,
  Sparkles,
  Eye,
  X
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
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar"],
    description: "Luxury 5-star hotel offering world-class amenities and exceptional service in the heart of Delhi's diplomatic enclave."
  },
  {
    id: 2,
    name: "The Oberoi",
    location: "Connaught Place, New Delhi",
    price: "₹22,000/night",
    rating: 4.8,
    reviews: 1876,
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym"],
    description: "Iconic luxury hotel overlooking Delhi Golf Course, known for impeccable service and elegant rooms."
  },
  {
    id: 3,
    name: "Taj Mahal Hotel",
    location: "Lutyens' Delhi, New Delhi",
    price: "₹20,000/night",
    rating: 4.7,
    reviews: 2341,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Business Center"],
    description: "Heritage hotel blending old-world charm with modern luxury, located near India Gate."
  },
  {
    id: 4,
    name: "Andaz Delhi",
    location: "Aerocity, New Delhi",
    price: "₹15,000/night",
    rating: 4.6,
    reviews: 1567,
    image: "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["WiFi", "Pool", "Restaurant", "Bar", "Gym"],
    description: "Modern lifestyle hotel near airport with contemporary design and vibrant atmosphere."
  },
  {
    id: 5,
    name: "Radisson Blu",
    location: "Paschim Vihar, New Delhi",
    price: "₹8,500/night",
    rating: 4.5,
    reviews: 987,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Parking"],
    description: "Premium business hotel with excellent conference facilities and comfortable rooms."
  },
  {
    id: 6,
    name: "Crowne Plaza",
    location: "Rohini, New Delhi",
    price: "₹7,500/night",
    rating: 4.4,
    reviews: 876,
    image: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Concierge"],
    description: "Full-service hotel ideal for both business and leisure travelers with modern amenities."
  },
  {
    id: 7,
    name: "Hyatt Regency",
    location: "Bhikaji Cama Place, New Delhi",
    price: "₹12,000/night",
    rating: 4.6,
    reviews: 1432,
    image: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym"],
    description: "Elegant hotel with spacious rooms, multiple dining options, and extensive banquet facilities."
  },
  {
    id: 8,
    name: "The Lalit",
    location: "Connaught Place, New Delhi",
    price: "₹10,000/night",
    rating: 4.5,
    reviews: 1123,
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar"],
    description: "Luxury hotel in the heart of Delhi with rich heritage architecture and modern comforts."
  }
];

export default function HotelGallery() {
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const priceRanges = [
    { label: "All Hotels", value: "all" },
    { label: "Luxury (₹15K+)", value: "luxury" },
    { label: "Premium (₹8K-15K)", value: "premium" },
    { label: "Budget (Under ₹8K)", value: "budget" },
  ];

  const filteredHotels = hotels.filter(hotel => {
    if (filter === "all") return true;
    if (filter === "luxury") return parseInt(hotel.price.replace(/[^0-9]/g, '')) >= 15000;
    if (filter === "premium") {
      const price = parseInt(hotel.price.replace(/[^0-9]/g, ''));
      return price >= 8000 && price < 15000;
    }
    if (filter === "budget") return parseInt(hotel.price.replace(/[^0-9]/g, '')) < 8000;
    return true;
  });

  return (
    <section className="py-16 md:py-24 bg-[#f5f6f8] relative">
      {/* Subtle Dots Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-[#294d6b]/10">
            <Sparkles className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
            <span className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>Luxury Stays</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Premium Hotels in Delhi
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Discover the finest accommodations Delhi has to offer - from luxury palaces to modern business hotels
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setFilter(range.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === range.value
                  ? "text-white shadow-md"
                  : "bg-white text-gray-600 hover:shadow-md border border-gray-200"
              }`}
              style={{ backgroundColor: filter === range.value ? PRIMARY_COLOR : undefined }}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={(index % 8) * 50}
              onClick={() => setSelectedHotel(hotel)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Price Tag */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-bold" style={{ color: PRIMARY_COLOR }}>{hotel.price}</span>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-white font-medium">{hotel.rating}</span>
                  <span className="text-xs text-white/70">({hotel.reviews})</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#294d6b] transition-colors">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{hotel.location}</span>
                </div>
                
                {/* Amenities Preview */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity} className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">
                      +{hotel.amenities.length - 3}
                    </span>
                  )}
                </div>
                
                {/* View Details Button */}
                <button 
                  className="w-full mt-2 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ backgroundColor: `${PRIMARY_COLOR}10`, color: PRIMARY_COLOR }}
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* No Results */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hotels found in this category</p>
          </div>
        )}
      </div>

      {/* Modal for Hotel Details */}
      {selectedHotel && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedHotel(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64 md:h-80">
              <img
                src={selectedHotel.image}
                alt={selectedHotel.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedHotel(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {selectedHotel.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500">{selectedHotel.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>
                    {selectedHotel.price}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedHotel.rating}</span>
                    <span className="text-gray-400">({selectedHotel.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {selectedHotel.description}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHotel.amenities.map((amenity) => (
                    <span key={amenity} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Book This Hotel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
