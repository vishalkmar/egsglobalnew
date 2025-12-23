"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const meetGreetSteps = [
  {
    title: "Airport Pick-Up & Drop-Off",
    description: "Comfortable and timely transfers to and from airports.",
    imageSrc: "/meetgreet/pickup.jpg",
  },
  {
    title: "Hotel-to-VFS / Embassy Transfers",
    description:
      "Hassle-free transport between your accommodation and visa application centers.",
    imageSrc: "/meetgreet/pickup2.jpg",
  },
  {
    title: "Personalized Assistance",
    description: "Dedicated staff to guide and support you VFS/ Embassy Submission.",
    imageSrc: "/meetgreet/personalize.jpg",
  },
  {
    title: "Safety & Comfort",
    description:
      "Professionally trained drivers and sanitized vehicles for a secure travel experience.",
    imageSrc: "/meetgreet/safe.jpg",
  },
  {
    title: "End-to-End Convenience",
    description:
      "From arrival to departure, we manage every detail for a smooth travel experience.",
    imageSrc: "/meetgreet/experience.jpg",
  },
];

const MeetGreetServices: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 650,
      offset: 90,
      easing: "ease-out",
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-slate-900"
            data-aos="fade-right"
            data-aos-delay="60"
          >
            Meet &amp; Greet Services In Delhi
          </h2>
          <div
            className="h-[2px] w-20 bg-sky-500 mt-2"
            data-aos="fade-right"
            data-aos-delay="120"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {meetGreetSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-4"
              data-aos="zoom-in"
              data-aos-delay={140 + idx * 120}
            >
              {/* Circle image card */}
              <div
                style={{ borderRadius: "50%", overflow: "hidden" }}
                className="w-40 h-40 sm:w-44 sm:h-44 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] flex items-center justify-center"
              >
                <img
                  src={step.imageSrc}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.04]"
                />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-[0.9rem] text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetGreetServices;
