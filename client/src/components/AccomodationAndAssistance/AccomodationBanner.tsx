"use client";

import React, { useEffect, useState } from "react";


const HEADING_TEXT =
  "Accommodation Assistance for Safe & Budget-Friendly Stays";

const AccommodationAssistanceBanner: React.FC = () => {
  const [typedHeading, setTypedHeading] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedHeading(HEADING_TEXT.slice(0, index + 1));
      index++;
      if (index >= HEADING_TEXT.length) {
        clearInterval(interval);
      }
    }, 50); // typing speed thoda fast rakha hai long heading ke liye

    return () => clearInterval(interval);
  }, []);

  return (
    <>
  
      <section className="relative py-[100px] min-h-[80vh] w-full bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: Text content */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 order-1">
              {/* Main heading with typing effect */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] font-bold leading-tight max-w-3xl">
                <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {typedHeading}
                </span>
                <span className="inline-block w-[10px] ml-[2px] bg-sky-500/80 animate-pulse rounded-sm align-middle" />
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl font-normal text-slate-900">
                Accommodation Assistance in Delhi for every type of
                traveller.
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-slate-800 font-light max-w-2xl leading-relaxed">
                Finding the right place to stay abroad is essential for a
                comfortable journey. EGS Group assists travelers with short-term
                  arrangements tailored to their
                needs, preferences, and budgets. From affordable stays to
                premium housing options, we help you secure safe, reliable, and
                well-connected accommodations.
              </p>

              {/* CTA button */}
             
            </div>

            {/* RIGHT: Image */}
            <div className="order-2 lg:order-2">
              <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="/accomodation.jpg"
                  alt="Accommodation assistance and stay arrangements"
                  className="w-full h-full"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
   
    </>
  );
};

export default AccommodationAssistanceBanner;
