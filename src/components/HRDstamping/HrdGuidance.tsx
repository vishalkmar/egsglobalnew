// HRDRequirementsGuidelines.tsx
"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FileText,
  ClipboardCheck,
  IndianRupee,
  HeadphonesIcon,
} from "lucide-react";

const REQUIREMENT_BLOCKS = [
  {
    title: "Document Eligibility",
    icon: FileText,
    highlight:
      "Educational certificates, degrees & diplomas issued by recognised institutions.",
    description:
      "Only academic documents from recognised boards, universities or professional institutes are considered for HRD attestation. This generally includes mark sheets, provisional and final degree certificates, diplomas and transcripts.",
  },
  {
    title: "Pre-Requisites for Submission",
    icon: ClipboardCheck,
    highlight: "Notarisation, institutional verification & valid ID proof are mandatory.",
    description:
      "Before applying for HRD attestation, documents must be notarised and verified by the issuing educational institution. Applicants should also provide a valid identity proof (such as passport, Aadhaar or PAN) along with the original documents and photocopies.",
  },
  {
    title: "HRD Attestation Fees & Pricing",
    icon: IndianRupee,
    highlight: "Pricing varies by document type, state and additional services.",
    description:
      "The overall cost depends on the nature of the document, the state HRD department involved, and whether extra services such as pick-up, drop, translation or urgent processing are required. EGS Group shares a clear breakup of official fees and service charges before you proceed.",
  },
  {
    title: "Contact Us for HRD Attestation",
    icon: HeadphonesIcon,
    highlight: "Dedicated EGS Group support to guide you through each step.",
    description:
      "EGS Group focuses on transparency at every stage of the attestation journey. Our team helps you understand requirements, timelines and documentation, while support executives remain available to answer queries and track the status of your application.",
  },
];

export default function HRDRequirementsGuidelines() {
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
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-semibold text-slate-900"
          >
            HRD Attestation Requirements & Guidelines
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="120"
            className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto"
          >
            Understand what you need to prepare before starting the HRD attestation
            process with EGS Group.
          </p>
        </div>

        {/* 2x2 Card Grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {REQUIREMENT_BLOCKS.map((item, idx) => {
            const Icon = item.icon;
            const delay = idx * 120;

            return (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* subtle gradient corner highlight */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/30 via-indigo-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-5 md:p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      data-aos="zoom-in"
                      data-aos-delay={delay + 80}
                      className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md"
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-sky-700 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2">
                    {item.highlight}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
