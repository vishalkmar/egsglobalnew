"use client";

import React, { useEffect } from "react";
const embassyImg = "/images/embassy_legalization_service.png";
const attestationImg = "/images/attestation_certificate_service.png";
const insuranceImg = "/images/travel_insurance_documents.png";
const meetGreetImg = "/images/meet_and_greet_service.png";
const accommodationImg = "/images/accommodation_service.png";
const visaImg = "/images/visa_approval_service.png";


import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    image: embassyImg,
    title: "Embassy and consular services",
    description:
      "Complete embassy legalization and document authentication services for international use.",
    path: "/embassy-legalization",
  },
  {
    image: attestationImg,
    title: "Attestation & Apostille",
    description:
      "Professional attestation and apostille services for educational and official documents.",
    path: "/attestation-apostille",
  },
  {
    image: insuranceImg,
    title: "Insurance & Dummy Ticket",
    description:
      "Travel insurance and flight reservation services for visa applications.",
    path: "/insurance-dummy-ticket",
  },
  {
    image: meetGreetImg,
    title: "Meet & Greet Services In Delhi",
    description:
      "Airport assistance and personalized meet & greet services for smooth arrivals.",
    path: "/meet-greet",
  },
  {
    image: accommodationImg,
    title: "Accommodation & Assistance In Delhi",
    description:
      "Help with booking accommodations and personal assistance throughout your journey.",
    path: "/accommodation-assistant",
  },
  {
    image: visaImg,
    title: "Visa Services",
    description:
      "Comprehensive visa processing including normal visas and e-visa services.",
    path: "/visa/normal",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
      offset: 120,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-white overflow-hidden text-gray-700 relative">
      {/* subtle top gradient hint */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-50 via-white to-transparent pointer-events-none" />

      {/* ---------- HEADER SECTION ---------- */}
      <div className="w-full text-center py-10 px-4 relative z-10" data-aos="fade-right">
        <h1 className="text-4xl text-center md:text-5xl font-bold md:py-16 text-sky-600 tracking-wide">
          Services We Provide
        </h1>
        <p
          data-aos="fade-left"
          className="text-gray-600 text-[1rem] sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          EGS Group provides seamless global travel and documentation support,
          offering visas, legalization, insurance, airport assistance, and
          accommodation with expert, reliable service.
        </p>
      </div>

      {/* ---------- SERVICES SECTION ---------- */}
      <div className="py-6 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 text-center">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 120} // ✅ one-by-one (stagger)
              data-aos-duration="650"
              className="flex flex-col items-center relative hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative mb-12 flex flex-col items-center">
                {/* Curved Cap */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                  <svg
                    width="200"
                    height="80"
                    viewBox="0 0 200 80"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10,70 Q100,0 190,70"
                      fill="none"
                      stroke="#13dde8ff"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Circle Image */}
                <div className="w-52 h-52 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full overflow-hidden border-[4px] border-emerald-100 shadow-md relative z-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold uppercase mb-4 text-sky-600 tracking-wide">
                {service.title}
              </h3>

              {/* Description */}
              <ul className="text-base text-gray-600 space-y-2 leading-relaxed max-w-xs">
                <li className="text-[1rem]">{service.description}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom soft gradient touch */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-teal-50 via-white to-transparent pointer-events-none" />
    </section>
  );
};

export default Services;
