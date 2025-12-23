"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const eVisaIntroTitle =
  "E-Visa Services – Fast, reliable, and hassle-free online visa assistance";

const eVisaIntroText = `
Whether you are traveling for business, leisure, or family visits, EGS Group offers seamless e-Visa services for some of the world's most popular destinations including Oman, Dubai, Qatar, Singapore, Jordan, and Egypt. We manage the entire application process online, from eligibility checks and form filling to document uploads and approvals. With our reliable support, you can focus on planning your journey while we ensure your e-Visa is processed quickly and efficiently.
`;

const eVisaServices = [
  {
    title: "Destination Coverage",
    description:
      "E-Visa support for Oman, Dubai, Qatar, Singapore, Jordan, and Egypt.",
    imageSrc: "/visa/destinationcovrage.jpeg",
  },
  {
    title: "Eligibility Guidance",
    description:
      "Clear advice on requirements for business, tourism, and family visits.",
    imageSrc: "/visa/eligibility.jpg",
  },
  {
    title: "Accurate Application Filing",
    description:
      "Error-free form submission and document uploads handled by our team.",
    imageSrc: "/visa/appfiling.jpg",
  },
  {
    title: "Quick Processing",
    description:
      "Streamlined handling of e-Visa files to support timely approvals.",
    imageSrc: "/visa/process.jpg",
  },
  {
    title: "Secure & Confidential",
    description:
      "Data privacy, secure handling of documents, and compliance with international standards.",
    imageSrc: "/visa/secure.jpg",
  },
  {
    title: "24/7 Assistance",
    description:
      "Dedicated support for queries before, during, and after the application process.",
    imageSrc: "/visa/assistance.jpg",
  },
];

const EVisaServices: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // repeat on scroll
      offset: 120,
      easing: "ease-out",
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1
          data-aos="fade-left"
          className="text-center py-[40px] md:text-5xl text-3xl font-bold"
        >
          {eVisaIntroTitle}
        </h1>

        {/* Description */}
        <p
          data-aos="fade-right"
          className="text-center mb-[40px] text-slate-600 max-w-4xl mx-auto leading-relaxed"
        >
          {eVisaIntroText}
        </p>

        {/* Services cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {eVisaServices.map((service, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 120}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Circle image card */}
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] flex items-center justify-center overflow-hidden">
                <img
                  src={service.imageSrc}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  height={100}
                  width={100}
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

export default EVisaServices;
