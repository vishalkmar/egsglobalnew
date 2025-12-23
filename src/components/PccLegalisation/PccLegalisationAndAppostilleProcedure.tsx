"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface FlowStep {
  label: string;
  sub?: string;
}

interface FlowType {
  title: string;
  highlight: string;
  description: string;
  color: string; // left border colour
  steps: FlowStep[];
}

const flows: FlowType[] = [
  {
    title: "PCC Legalization",
    highlight: "PCC → State → MEA → Embassy",
    description:
      "PCC for Bangladesh and Nepal is processed through state verification followed by MEA attestation, ensuring the document is valid for official use.",
    color: "border-sky-500",
    steps: [
      {
        label: "PCC Issuance",
        sub: "Local Police Station / PSK / Passport Office",
      },
      {
        label: "State Home Department Authentication",
        sub: "Home / General Administration Department (State Govt.)",
      },
      {
        label: "MEA Attestation",
        sub: "Ministry of External Affairs, New Delhi",
      },
      {
        label: "Embassy Attestation",
        sub: "Embassy / Consulate of destination Bangladesh & Nepal",
      },
    ],
  },
  {
    title: "PCC Apostille",
    highlight: "PCC → State → MEA Apostille",
    description:
      "For India, the PCC is processed through State Home Department authentication followed by MEA Apostille, making it valid for international use without further attestation.",
    color: "border-emerald-500",
    steps: [
      {
        label: "PCC Issuance",
        sub: "Local Police Station / PSK / Passport Office",
      },
      {
        label: "State Authentication",
        sub: "State Home / General Administration Department",
      },
      {
        label: "MEA Apostille",
        sub: "Apostille by Ministry of External Affairs, New Delhi",
      },
    ],
  },
];

// step-wise colour palette
const STEP_COLORS = [
  { bg: "bg-slate-600", sub: "text-slate-50/90", dotBorder: "border-slate-300" },
  { bg: "bg-amber-500", sub: "text-amber-50/90", dotBorder: "border-amber-300" },
  { bg: "bg-sky-600", sub: "text-sky-50/90", dotBorder: "border-sky-300" },
  {
    bg: "bg-emerald-600",
    sub: "text-emerald-50/90",
    dotBorder: "border-emerald-300",
  },
];

const PccLegalizationApostilleFlow: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 750,
      once: false,
      offset: 120,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN HEADING + INTRO */}
        <div className="text-center mb-8 md:mb-10">
          <h2
            data-aos="fade-down"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800"
          >
            Procedure for PCC Legalization & Apostille
          </h2>
          <p
            data-aos="fade-left"
            data-aos-delay="120"
            className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            We provide PCC legalization services for Bangladesh and Nepal, which
            are completed through state authentication followed by MEA
            attestation. For India, PCC is processed through State Home
            Department authentication and MEA Apostille, making it valid for
            international use.
          </p>
        </div>

        {/* FLOW CARDS */}
        <div className="space-y-8 md:space-y-10">
          {flows.map((flow, flowIndex) => (
            <div
              key={flow.title}
              data-aos="fade-up"
              data-aos-delay={flowIndex * 120}
              className={`rounded-2xl border bg-slate-50/70 border-slate-200 shadow-sm p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col gap-4 md:gap-5 border-l-4 ${flow.color}`}
            >
              {/* TITLE + SHORT LINE */}
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3
                    data-aos="fade-right"
                    data-aos-delay={flowIndex * 120 + 100}
                    className="text-lg sm:text-xl font-semibold text-slate-800"
                  >
                    {flow.title}
                  </h3>
                  <p
                    data-aos="fade-left"
                    data-aos-delay={flowIndex * 120 + 140}
                    className="mt-1 text-xs sm:text-sm text-gray-600"
                  >
                    {flow.description}
                  </p>
                </div>

                <span
                  data-aos="zoom-in"
                  data-aos-delay={flowIndex * 120 + 180}
                  className="mt-1 inline-flex items-center justify-center self-start md:self-center rounded-full bg-slate-900/5 text-[11px] sm:text-xs px-3 py-1 font-medium text-slate-700"
                >
                  {flow.highlight}
                </span>
              </div>

              {/* STEP FLOW */}
              <div className="mt-2">
                <div className="relative">
                  {/* line behind cards */}
                  <div
                    data-aos="fade-up"
                    data-aos-delay={flowIndex * 120 + 220}
                    className="hidden md:block absolute top-1/2 left-4 right-4 h-[2px] bg-gradient-to-r from-slate-300 via-amber-300 via-sky-300 to-emerald-300 -translate-y-1/2 pointer-events-none"
                  />

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-3 relative z-10">
                    {flow.steps.map((step, index) => {
                      const palette =
                        STEP_COLORS[index] ??
                        STEP_COLORS[STEP_COLORS.length - 1];

                      const stepBgClass = palette.bg;
                      const stepSubTextClass = palette.sub;
                      const dotBorderClass = palette.dotBorder;

                      // ✅ step animations: 1st fade-right, 2nd zoom-in, 3rd fade-up, 4th fade-left
                      const stepAos =
                        index === 0
                          ? "fade-right"
                          : index === 1
                          ? "zoom-in"
                          : index === flow.steps.length - 1
                          ? "fade-left"
                          : "fade-up";

                      const delayBase = flowIndex * 120 + 280 + index * 140;

                      return (
                        <React.Fragment key={step.label}>
                          {/* STEP CARD */}
                          <div className="flex-1">
                            <div className="relative max-w-xs md:max-w-none mx-auto">
                              {/* connector dot */}
                              <span
                                data-aos="zoom-in"
                                data-aos-delay={delayBase + 60}
                                className={`hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-white border ${dotBorderClass}`}
                              />

                              <div
                                data-aos={stepAos}
                                data-aos-delay={delayBase}
                                data-aos-duration="650"
                                className={`rounded-xl ${stepBgClass} shadow-sm border border-white/10 px-3.5 py-3 sm:px-4 sm:py-3.5 text-center`}
                              >
                                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-1 text-white/80">
                                  Step {index + 1}
                                </p>
                                <p className="text-sm sm:text-[0.98rem] font-medium text-white">
                                  {step.label}
                                </p>
                                {step.sub && (
                                  <p
                                    className={`mt-1 text-[11px] sm:text-xs ${stepSubTextClass}`}
                                  >
                                    {step.sub}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* ARROW BETWEEN STEPS */}
                          {index < flow.steps.length - 1 && (
                            <div
                              data-aos="zoom-in"
                              data-aos-delay={delayBase + 80}
                              className="flex md:flex-col items-center justify-center md:justify-start"
                            >
                              <span className="md:hidden text-slate-400 text-lg">
                                →
                              </span>
                              <span className="hidden md:inline-block h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 text-base shadow-sm">
                                →
                              </span>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* FOOTNOTE */}
              <p
                data-aos="fade-up"
                data-aos-delay={flowIndex * 120 + 900}
                className="mt-3 text-[11px] sm:text-xs text-gray-500"
              >
                EGS supports you at each stage of the PCC process – from issuance
                and state authentication to MEA attestation / Apostille and,
                where required, embassy attestation – so that your Police
                Clearance Certificate is accepted confidently by foreign
                authorities.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PccLegalizationApostilleFlow;
