"use client";

import React, { useEffect } from "react";
import { Lock, FilePenLine, CreditCard, BadgeCheck } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const topSteps = [
  { step: 1, label: "Enter itinerary information" },
  { step: 2, label: "Bulk upload all your documents" },
  { step: 3, label: "Be relaxed and wait for your Visa" },
];

const bottomSteps = [
  { step: "STEP 1", title: "Sign Up & Login", icon: Lock },
  { step: "STEP 2", title: "Submit Document", icon: FilePenLine },
  { step: "STEP 3", title: "Pay Online", icon: CreditCard },
  { step: "STEP 4", title: "Receive Visa", icon: BadgeCheck },
];

const VisaProcess: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 750,
      once: false,
      offset: 120,
      easing: "ease-out",
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            data-aos="fade-down"
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900"
          >
            Apply for a Visa within{" "}
            <span className="text-rose-500">2-minutes</span>
          </h2>

          {/* Top horizontal steps */}
          <div className="mt-8">
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* connecting line (desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-rose-200 -translate-y-1/2" />

              {topSteps.map((item, index) => (
                <div
                  key={item.step}
                  data-aos="zoom-in"
                  data-aos-delay={index * 140}
                  className="relative flex flex-col items-center text-center gap-2 md:w-1/3"
                >
                  {/* step circle */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-500 text-white text-xs sm:text-sm font-semibold shadow-md">
                    {item.step}
                  </div>
                  {/* label */}
                  <p className="text-sm sm:text-base font-medium text-slate-800">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h3
            
            className="text-2xl sm:text-3xl font-semibold text-slate-900"
          >
            <span className="text-rose-500">Automate</span>{" "}
            <span>Visa Bookings</span>
          </h3>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {bottomSteps.map((step, index) => {
            const Icon = step.icon;

            // subtle alternating directions
            const anim =
              index % 2 === 0 ? "fade-right" : "fade-left";

            return (
              <div
                key={step.step}
                data-aos={anim}
                data-aos-delay={index * 120}
                className="relative flex flex-col items-center text-center pt-10 pb-7 px-4 rounded-2xl border border-rose-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
              >
                {/* circle icon overlapping top */}
                <div className="absolute -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-white">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-blue-600 bg-white">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-500 tracking-[0.18em] mb-2">
                  {step.step}
                </p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VisaProcess;
