"use client";

import React from "react";

const services = [
  {
    title: "Short-Term Accommodation",
    description:
      "Support in booking hotels or serviced apartments for short visits.",
    imageSrc: "/accomodation/short.jpg",
  },
 
  {
    title: "Budget-Friendly Options",
    description:
      "Tailored recommendations that fit individual financial preferences.",
    imageSrc: "/accomodation/budget.jpg",
  },
 
  {
    title: "End-to-End Support",
    description:
      "Guidance from booking to check-in for a hassle-free living experience.",
    imageSrc: "/accomodation/endtoend.jpeg",
  },
];

const AccommodationServices: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Accommodation Services In Delhi
          </h2>
          <div className="h-[2px] w-20 bg-sky-500 mt-2" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Circle Image */}
             <div style={{borderRadius:"50%",overflow:'hidden'}} className="w-40 h-40 sm:w-44 sm:h-44  bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] flex items-center justify-center">
                
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
              
              </div>

              {/* Title + Description */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-[0.9rem] text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccommodationServices;
