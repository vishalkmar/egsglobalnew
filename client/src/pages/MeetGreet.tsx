"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeetGreetServices from "@/components/meetandgreet/MeetandGreetServices";
import MeetAndGreetForm from "@/components/meetandgreet/MeetAndGreetForm";

const HEADING_TEXT = "“Premium Guest Handling";

const MeetGreetBanner: React.FC = () => {
  const [typedHeading, setTypedHeading] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedHeading(HEADING_TEXT.slice(0, index + 1));
      index++;
      if (index >= HEADING_TEXT.length) {
        clearInterval(interval);
      }
    }, 70); // typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <section className="relative py-[100px] min-h-[80vh] w-full bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: Text content */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 order-1">
              {/* Main heading with typing effect */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
                <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {typedHeading}
                </span>
                <span className="inline-block w-[10px] ml-[2px] bg-sky-500/80 animate-pulse rounded-sm align-middle" />
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl font-normal text-slate-900">
                Personalized facilitation for stress-free travel experiences
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-slate-800 font-light max-w-2xl leading-relaxed">
                Travel with comfort and confidence through our premium meet
                &amp; greet services. EGS Group arranges professional airport
                pick-up and drop-off solutions, as well as hotel-to-VFS return
                transfers for visa appointments. From arrival assistance to
                secure, punctual transport, our services are designed to make
                your travel experience seamless, stress-free, and personalized.
              </p>

              {/* CTA button */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 px-7 py-2.5 text-sm sm:text-base font-semibold shadow-lg hover:from-sky-600 hover:via-blue-700 hover:to-purple-700 transition text-white">
                  Enquire for Meet &amp; Greet
                </button>
              </div>
            </div>

            {/* RIGHT: Image */}
            <div className="order-2 lg:order-2">
              <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="/meetandgreat.jpg"
                  alt="Meet and greet airport assistance"
                  className="w-full h-full"
                  width={100}
                   height={100}
                  />
              </div>
            </div>
          </div>
        </div>
      </section>
      <MeetAndGreetForm/>
      <MeetGreetServices/>
      <Footer />
    </>
  );
};

export default MeetGreetBanner;
