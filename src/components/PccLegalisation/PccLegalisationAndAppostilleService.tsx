"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const pccServices = [
  {
    title: "Document Verification",
    description:
      "Thorough check of all PCC and supporting documents before submission to authorities and embassies.",
    imageSrc: "/pcclegalisation/varification.jpg",
  },
  {
    title: "Embassy Coordination",
    description:
      "Direct liaison with relevant embassies and consulates for PCC authentication and legalization.",
    imageSrc: "/pcclegalisation/embassycordinator.jpg",
  },
  {
    title: "Educational Document Legalisation",
    description:
      "Legalisation of degrees, diplomas and academic certificates linked to your PCC for overseas studies or employment.",
    imageSrc: "/pcclegalisation/education.jpg",
  },
  {
    title: "Personal Document Legalisation",
    description:
      "Legalisation of birth, marriage and other personal records often required along with PCC for family or dependent visas.",
    imageSrc: "/pcclegalisation/personaldocument.jpg",
  },
  {
    title: "Commercial & Business Document Legalisation",
    description:
      "Certification of company documents, contracts and agreements connected with corporate or business-related background checks.",
    imageSrc: "/pcclegalisation/commercial.jpg",
  },
  {
    title: "Timely & Reliable Service",
    description:
      "Quick processing with clear updates at every stage, maintaining full compliance with destination country requirements.",
    imageSrc: "/pcclegalisation/timely.jpg",
  },
];

const PccLegalizationApostilleService: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false, // repeat when scroll in/out
      offset: 120,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 sm:mb-12" data-aos="fade-right">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            PCC Legalization & Apostille Services
          </h2>
          <div className="h-[2px] w-20 bg-sky-500 mt-2" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {pccServices.map((service, index) => (
            <div
              key={service.title}
              data-aos="zoom-in"
              data-aos-delay={index * 120} // ✅ ek-ek karke show
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Circle Image */}
              <div className="w-44 h-44 sm:w-44 sm:h-44 rounded-full bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] flex items-center justify-center overflow-hidden">
                <img
                  src={service.imageSrc}
                  alt={service.title}
                  className="w-full h-full object-cover"
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

export default PccLegalizationApostilleService;
