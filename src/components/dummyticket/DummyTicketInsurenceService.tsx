"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    title: "Embassy-Compliant Dummy Tickets",
    description:
      "Genuine and verifiable flight reservations accepted by embassies and VFS centers.",
    imageSrc: "/dummyticket/dummyticket.webp",
  },
  {
    title: "Quick Issuance",
    description:
      "Prompt delivery of dummy tickets to meet urgent visa application requirements.",
    imageSrc: "/dummyticket/quick.jpg",
  },
  {
    title: "Customizable Options",
    description:
      "One-way, round-trip, or multi-city bookings based on travel needs.",
    imageSrc: "/dummyticket/costomize.jpg",
  },
  {
    title: "Tailored Insurance Plans",
    description: "Comprehensive insurance plan as per individual request.",
    imageSrc: "/dummyticket/tailored.jpg",
  },
];

const DummyTicketInsuranceService: React.FC = () => {
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
            Dummy Ticket &amp; Insurance Services
          </h2>
          <div
            className="h-[2px] w-20 bg-sky-500 mt-2"
            data-aos="fade-right"
            data-aos-delay="120"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
              data-aos="zoom-in"
              data-aos-delay={140 + index * 120}
            >
              {/* Circle Image */}
              <div
                style={{ borderRadius: "50%", overflow: "hidden" }}
                className="w-40 h-40 sm:w-44 sm:h-44 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] flex items-center justify-center"
              >
                <img
                  src={service.imageSrc}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.04]"
                />
              </div>

              {/* Text */}
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

export default DummyTicketInsuranceService;
