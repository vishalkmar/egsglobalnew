// HRDStampingServices.tsx
"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const hrdStampingSteps = [
  {
    title: "State HRD Verification",
    description:
      "Official authentication of educational certificates through respective State HRD departments.",
    imageSrc: "/hrd/varification.jpeg",
  },
  {
    title: "Degree & Diploma Stamping",
    description:
      "Verification for university degrees, diplomas, transcripts, and mark sheets.",
    imageSrc: "/hrd/degree.jpg",
  },
  {
    title: "Mandatory Attestation for Abroad",
    description:
      "Required for higher education, skilled employment, professional licensing, and migration.",
    imageSrc: "/hrd/mendatory.jpg",
  },
  {
    title: "University Verification Assistance",
    description:
      "Coordination with universities and boards for prior verification if required by HRD.",
    imageSrc: "/hrd/university.jpg",
  },
  {
    title: "Complete Documentation Support",
    description:
      "Guidance on paperwork, forms, fees, and supporting documents needed for HRD stamping.",
    imageSrc: "/hrd/docsupport.jpg",
  },
  {
    title: "Hassle-Free Processing",
    description:
      "End-to-end management from submission to collection, ensuring speed and accuracy.",
    imageSrc: "/hrd/hassle.jpg",
  },
];

const HRDStampingServices: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,          // repeat on scroll
      offset: 90,
      easing: "ease-out",
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className="mb-10 sm:mb-12"
          data-aos="fade-right"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            HRD Stamping Services
          </h2>
          <div className="h-[2px] w-20 bg-sky-500 mt-2" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {hrdStampingSteps.map((step, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 120} // ✅ one-by-one delay
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Circle image card */}
              <div
                className="
                  w-40 h-40 sm:w-44 sm:h-44
                  rounded-full overflow-hidden
                  bg-white
                  shadow-[0_18px_45px_rgba(15,23,42,0.08)]
                  flex items-center justify-center
                  transition-transform duration-300
                  hover:scale-105
                "
              >
                <img
                  src={step.imageSrc}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div
                className="space-y-2"
                data-aos="fade-up"
                data-aos-delay={idx * 120 + 120}
              >
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

export default HRDStampingServices;
