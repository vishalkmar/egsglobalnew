"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ----------------------------- Types ----------------------------- */
type Category = {
  title: string;
  items: string[];
};

type TranslationCard = {
  id: string;
  heading: string;
  tagLine: string;
  description: string;
  categories: Category[];
};

/* ------------------------ Data Definitions ------------------------ */
const CERTIFICATE_TRANSLATION: Category[] = [
  {
    title: "Personal Certificates",
    items: [
      "Marriage Certificate",
      "Birth Certificate",
      "Death Certificate",
      "Leaving Certificate",
      "Police Clearance Certificate",
    ],
  },
  {
    title: "Commercial Documents",
    items: [
      "Certificate of Origin",
      "Certificate of Incorporation",
      "Commercial Invoices",
    ],
  },
  {
    title: "Educational Certificates",
    items: [
      "School Leaving Certificate",
      "College Leaving Certificate",
      "Degree Certificate",
      "Academic Mark Sheets",
      "Bonafide Certificate",
      "Post-Graduate Degree Certificate",
    ],
  },
];

const IMMIGRATION_TRANSLATION: Category[] = [
  {
    title: "Visa & Residency Applications",
    items: [
      "Visa Application Forms",
      "Permanent Residency Documents",
      "Invitation Letters",
      "Employment Contracts",
    ],
  },
  {
    title: "Identity & Civil Status",
    items: [
      "Passport & National ID",
      "Residence Permit",
      "Police Clearance Certificate (PCC)",
      "Civil Status Certificates",
    ],
  },
  {
    title: "Supporting Documents",
    items: [
      "Bank Statements",
      "Salary Slips",
      "Sponsorship Letters",
      "Affidavits & Declarations",
    ],
  },
];

const TRANSLATION_CARDS: TranslationCard[] = [
  {
    id: "certificate-translation",
    heading: "Certificate Translation",
    tagLine: "Personal • Educational • Commercial",
    description:
      "Professionally translated certificates with accurate formatting and terminology, accepted by embassies, universities, and international authorities.",
    categories: CERTIFICATE_TRANSLATION,
  },
  {
    id: "immigration-translation",
    heading: "Immigration Translation",
    tagLine: "Visa • PR • Residency",
    description:
      "Specialised immigration translations aligned with consulate, embassy, and visa processing standards across global destinations.",
    categories: IMMIGRATION_TRANSLATION,
  },
];

/* --------------------------- Component --------------------------- */
const TranslationServicesAtGlance: React.FC = () => {
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
    <section
      className="
        w-full py-20
        bg-gradient-to-b
        from-[#f6f2eb]
        via-[#f1ede6]
        to-[#ebe6dd]
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ------------------------- Heading ------------------------- */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span
            data-aos="fade-down"
            className="
              inline-block px-5 py-2 rounded-full
              text-xs font-semibold tracking-widest uppercase
              bg-[#2e2e2e] text-[#f3e8d5]
            "
          >
            Translation Services Overview
          </span>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="
              text-3xl md:text-4xl lg:text-5xl
              font-semibold text-[#2b2b2b]
            "
          >
            Professional Translation Solutions by EGS Group
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="180"
            className="text-sm md:text-base text-[#555555]"
          >
            High-accuracy translation services designed for legal validation,
            embassy submission, and immigration compliance.
          </p>
        </div>

        {/* -------------------------- Cards -------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {TRANSLATION_CARDS.map((card, cardIndex) => (
            <div
              key={card.id}
              data-aos={cardIndex === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={cardIndex * 120}
              className="
                relative rounded-3xl
                bg-[#fffdfa]
                border border-[#d6c6a8]
                shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                overflow-hidden
              "
            >
              {/* Decorative Accent */}
              <div
                className="
                  absolute top-0 right-0
                  h-40 w-40
                  bg-gradient-to-br
                  from-[#c9a24d]/30
                  to-transparent
                "
              />

              <div className="relative p-8 space-y-8">
                {/* Card Header */}
                <div className="space-y-3">
                  <span
                    data-aos="zoom-in"
                    data-aos-delay={cardIndex * 120 + 140}
                    className="
                      inline-block px-4 py-1.5 rounded-full
                      text-[11px] font-semibold tracking-wide
                      bg-[#2e2e2e] text-[#f5ead6]
                    "
                  >
                    {card.tagLine}
                  </span>

                  <h3
                    data-aos="fade-up"
                    data-aos-delay={cardIndex * 120 + 180}
                    className="text-2xl font-semibold text-[#2b2b2b]"
                  >
                    {card.heading}
                  </h3>

                  <p
                    data-aos="fade-up"
                    data-aos-delay={cardIndex * 120 + 240}
                    className="text-sm text-[#5a5a5a] leading-relaxed"
                  >
                    {card.description}
                  </p>
                </div>

                {/* Categories */}
                <div className="space-y-5">
                  {card.categories.map((cat, catIndex) => (
                    <div
                      key={cat.title}
                      data-aos="zoom-in"
                      data-aos-delay={cardIndex * 120 + 260 + catIndex * 140}
                      className="
                        group relative overflow-hidden
                        rounded-2xl px-6 py-5
                        border border-white/10
                        bg-gradient-to-br from-[#0b3a3a] via-[#0e4a4b] to-[#0f5b57]
                        shadow-[0_16px_40px_rgba(0,0,0,0.22)]
                        transition-all duration-300 ease-out
                        hover:-translate-y-1
                        hover:shadow-[0_26px_70px_rgba(16,185,129,0.22)]
                        hover:border-emerald-300/40
                      "
                    >
                      {/* Soft shine on hover */}
                      <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-300/12 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <h4 className="text-sm font-semibold text-white/95 mb-3">
                        {cat.title}
                      </h4>

                      <ul className="space-y-2">
                        {cat.items.map((item, itemIndex) => (
                          <li
                            key={item}
                            data-aos="fade-up"
                            data-aos-delay={
                              cardIndex * 120 + 320 + catIndex * 140 + itemIndex * 35
                            }
                            className="flex items-start gap-3 text-sm text-white/90"
                          >
                            <span
                              className="
                                mt-[7px] h-2 w-2 rounded-full
                                bg-emerald-300 flex-shrink-0
                                shadow-[0_0_0_3px_rgba(16,185,129,0.14)]
                              "
                            />
                            <span className="transition-colors duration-200 group-hover:text-white">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div
                  data-aos="fade-up"
                  data-aos-delay={cardIndex * 120 + 720}
                  className="pt-4 border-t border-[#e1d6bf]"
                >
                  <p className="text-xs text-[#6a6a6a]">
                    All translations are handled by EGS Group’s certified
                    linguists and undergo multi-level quality checks.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TranslationServicesAtGlance;
