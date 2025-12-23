"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShieldCheck, Stamp, Globe2, CheckCircle2 } from "lucide-react";

interface PccVariant {
  title: string;
  badge: string;
  color: string; // border / accent
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  required: string[];
  optional: string[];
}

const pccVariants: PccVariant[] = [
  {
    title: "PCC Legalization",
    badge: "Bangladesh · Nepal",
    color: "border-sky-500",
    icon: ShieldCheck,
    required: [
      "Original Police Clearance Certificate (PCC) – issued by PSK / Passport Office / Local Police Station",
      "Clear passport copy – front & back page",
      "Valid PCC within the acceptable time frame (usually 3–6 months)",
    ],
    optional: [
      "University admission letter (for students)",
      "Visa copy or approval letter, if available",
      "Passport-size photographs (only for a few embassies)",
    ],
  },
  {
    title: "PCC Apostille",
    badge: "India",
    color: "border-emerald-500",
    icon: Stamp,
    required: [
      "Original Police Clearance Certificate (PCC) from PSK / Passport Office / Local Police",
      "Passport copy – front & back page",
      "PCC issued as per the format accepted by destination country",
    ],
    optional: [
      "University admission letter (for students)",
      "Employment contract / offer letter (for job seekers)",
      "Visa appointment / application proof, if any",
    ],
  },
];

const PccDocumentsRequired: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 120,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + Intro */}
        <div className="mb-8 md:mb-10 text-center">
          <h2
            data-aos="fade-down"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800"
          >
            Documents Required for PCC Legalization & Apostille
          </h2>

          <p
            data-aos="fade-left"
            data-aos-delay="120"
            className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            PCC attestation process usually starts with verification from the
            issuing authority (PSK / Passport Office or Local Police). After
            verification, the document is authenticated at the state level (as
            applicable) and then submitted to MEA for Apostille or Attestation.
            If the destination requires further stamping, we also coordinate
            Embassy / Consulate attestation and provide safe pickup & delivery
            support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pccVariants.map((variant, index) => {
            const Icon = variant.icon;

            // ✅ 1st left->right, 2nd right->left
            const cardAos = index === 0 ? "fade-right" : "fade-left";

            return (
              <div
                key={variant.title}
                data-aos={cardAos}
                data-aos-delay={index * 120}
                className={`relative rounded-2xl bg-white border ${variant.color} shadow-sm p-5 sm:p-6 lg:p-7 flex flex-col gap-4`}
              >
                {/* Accent pill */}
                <div className="absolute -top-3 left-4 inline-flex items-center rounded-full bg-slate-900 text-[11px] sm:text-xs text-white px-3 py-1 shadow-md">
                  <Globe2 className="w-3.5 h-3.5 mr-1.5" />
                  PCC for International Use
                </div>

                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-sky-50 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                      {variant.title}
                    </h3>

                    <p className="mt-2 inline-flex items-center rounded-full bg-slate-100 text-[11px] sm:text-xs text-slate-700 px-3 py-1">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                      {variant.badge}
                    </p>
                  </div>
                </div>

                {/* Required + Optional lists */}
                <div className="mt-2 space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">
                      Mandatory Documents
                    </p>
                    <ul className="space-y-1.5 text-[13px] sm:text-sm text-slate-600">
                      {variant.required.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-slate-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800 mb-1">
                      Supporting / Optional Documents
                    </p>
                    <ul className="space-y-1.5 text-[13px] sm:text-sm text-slate-600">
                      {variant.optional.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-slate-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tiny footer strip */}
        <div className="mt-8 text-center" data-aos="zoom-in" data-aos-delay="150">
          <p className="inline-block text-[11px] sm:text-xs text-slate-500 bg-white border border-dashed border-slate-200 rounded-full px-4 py-2">
            EGS helps you verify the exact requirement as per your destination
            country&apos;s latest rules before starting the process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PccDocumentsRequired;
