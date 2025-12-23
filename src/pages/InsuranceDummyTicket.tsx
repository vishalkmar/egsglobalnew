"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DummyTicketProcess from "@/components/dummyticket/Process";
import DummyTicketBooking from "@/components/dummyticket/DummyTicketBooking";
import DummyTicketInsuranceService from "@/components/dummyticket/DummyTicketInsurenceService";

const HERO_IMAGE_URL = "/dummyticket.jpg";
const HEADING_TEXT = "Travel Insurance & Dummy Ticket Services";

const DummyTicketBanner: React.FC = () => {
  const [typedHeading, setTypedHeading] = useState("");

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

  return (
    <>
      <Header />
      <section className="relative py-[100px] min-h-[80vh] w-full overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE_URL}
            alt="Travel insurance and dummy ticket services"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {/* Main heading with typing effect */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
              <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {typedHeading}
              </span>
              <span className="inline-block w-[10px] ml-[2px] bg-sky-500/80 animate-pulse rounded-sm align-middle" />
            </h1>

            {/* Subheading – black, normal weight */}
            <p className="text-base sm:text-lg md:text-xl font-normal text-slate-900">
              Comprehensive protection and embassy-compliant bookings
            </p>

            {/* Description – black, thin */}
            <p className="text-sm sm:text-base md:text-lg text-slate-800 font-light max-w-2xl leading-relaxed">
              A safe journey begins with the right preparation. EGS Group
              partners with leading insurance providers to offer comprehensive
              travel insurance plans covering medical emergencies, accidents,
              trip cancellations, and baggage loss. Additionally, our reliable
              dummy ticket services meet embassy and consulate requirements for
              visa applications, providing genuine, verifiable bookings that
              strengthen your application and ensure compliance.
            </p>

            {/* CTA button */}
           
          </div>
        </div>
      </section>
      <DummyTicketBooking/>
      <DummyTicketInsuranceService/>
      <DummyTicketProcess/>
      <Footer />
    </>
  );
};

export default DummyTicketBanner;
