// HRDAttestationProcess.tsx
"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CheckCircle2, Stamp, Building2, Landmark, Globe2 } from "lucide-react";

const STEPS = [
  {
    title: "Notary Public Verification",
    icon: Stamp,
    description:
      "Initiate the process with notarisation by a Notary Public. This step involves validating the authenticity of the document's content.",
  },
  {
    title: "Educational Institution Verification",
    icon: Building2,
    description:
      "Following notarisation, the educational institution that issued the document will verify its content to ensure accuracy and legitimacy.",
  },
  {
    title: "State HRD Department Attestation",
    icon: Landmark,
    description:
      "The document then undergoes attestation by the State HRD Department, obtaining state-level recognition of the educational certificate.",
  },
  {
    title: "Ministry of External Affairs (MEA) Attestation",
    icon: Globe2,
    description:
      "The MEA, as the central authority, attests educational documents for international acceptance as the next level of verification.",
  },
  {
    title: "Embassy Attestation",
    icon: CheckCircle2,
    description:
      "If required by the destination country, the document is submitted to the respective embassy for final authentication.",
  },
];

export default function HRDAttestationProcess() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 90,
      easing: "ease-out",
      once: false, // scroll in/out pe repeat
      mirror: true,
    });
  }, []);

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2
            data-aos="fade-down"
            className="text-3xl md:text-4xl font-semibold text-slate-900"
          >
            HRD Attestation Process
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="120"
            className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto"
          >
            A clear step-by-step path to get your educational documents attested
            and accepted abroad.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sky-300 via-slate-200 to-indigo-300" />

          <div className="space-y-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const delay = index * 140; // ✅ one-by-one

              return (
                <div
                  key={step.title}
                  className="relative flex gap-4 md:gap-6"
                  data-aos="fade-up"
                  data-aos-delay={delay}
                >
                  {/* Icon + step number */}
                  <div
                    className="flex flex-col items-center shrink-0"
                    data-aos="zoom-in"
                    data-aos-delay={delay}
                  >
                    <div className="h-12 w-12 rounded-full bg-white shadow-md border border-sky-100 flex items-center justify-center text-sky-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-slate-500">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="flex-1">
                    <div
                      className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 md:p-5"
                      data-aos="fade-up"
                      data-aos-delay={delay + 90} // ✅ icon ke baad card open feel
                    >
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-[0.95rem] text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
