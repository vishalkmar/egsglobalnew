"use client";

import React from "react";

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
  {
    bg: "bg-slate-600",
    sub: "text-slate-50/90",
    dotBorder: "border-slate-300",
  },
  {
    bg: "bg-amber-500",
    sub: "text-amber-50/90",
    dotBorder: "border-amber-300",
  },
  {
    bg: "bg-sky-600",
    sub: "text-sky-50/90",
    dotBorder: "border-sky-300",
  },
  {
    bg: "bg-emerald-600",
    sub: "text-emerald-50/90",
    dotBorder: "border-emerald-300",
  },
];

const PccLegalizationApostilleFlow: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN HEADING + INTRO */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
            Procedure for PCC Legalization & Apostille
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We provide PCC legalization services for Bangladesh and Nepal, which
            are completed through state authentication followed by MEA
            attestation. For India, PCC is processed through State Home
            Department authentication and MEA Apostille, making it valid for
            international use.
          </p>
        </div>

        {/* FLOW CARDS */}
        <div className="space-y-8 md:space-y-10">
          {flows.map((flow) => (
            <div
              key={flow.title}
              className={`rounded-2xl border bg-slate-50/70 border-slate-200 shadow-sm p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col gap-4 md:gap-5 border-l-4 ${flow.color}`}
            >
              {/* TITLE + SHORT LINE */}
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                    {flow.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">
                    {flow.description}
                  </p>
                </div>
                <span className="mt-1 inline-flex items-center justify-center self-start md:self-center rounded-full bg-slate-900/5 text-[11px] sm:text-xs px-3 py-1 font-medium text-slate-700">
                  {flow.highlight}
                </span>
              </div>

              {/* SNAKE / LINE-LIKE STEP FLOW */}
              <div className="mt-2">
                <div className="relative">
                  {/* horizontal snake line behind cards (desktop only) */}
                  <div className="hidden md:block absolute top-1/2 left-4 right-4 h-[2px] bg-gradient-to-r from-slate-300 via-amber-300 via-sky-300 to-emerald-300 -translate-y-1/2 pointer-events-none" />

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-3 relative z-10">
                    {flow.steps.map((step, index) => {
                      const palette =
                        STEP_COLORS[index] ??
                        STEP_COLORS[STEP_COLORS.length - 1];
                      const stepBgClass = palette.bg;
                      const stepSubTextClass = palette.sub;
                      const dotBorderClass = palette.dotBorder;
                      const stepLabelTextClass = "text-white/80";
                      const stepTitleTextClass = "text-white";

                      return (
                        <React.Fragment key={step.label}>
                          {/* STEP CARD */}
                          <div className="flex-1">
                            <div className="relative max-w-xs md:max-w-none mx-auto">
                              {/* small connector dot (for snake feel) */}
                              <span
                                className={`hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-white border ${dotBorderClass}`}
                              />
                              <div
                                className={`rounded-xl ${stepBgClass} shadow-sm border border-white/10 px-3.5 py-3 sm:px-4 sm:py-3.5 text-center`}
                              >
                                <p
                                  className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-1 ${stepLabelTextClass}`}
                                >
                                  Step {index + 1}
                                </p>
                                <p
                                  className={`text-sm sm:text-[0.98rem] font-medium ${stepTitleTextClass}`}
                                >
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

                          {/* ARROW BETWEEN STEPS (desktop + mobile) */}
                          {index < flow.steps.length - 1 && (
                            <div className="flex md:flex-col items-center justify-center md:justify-start">
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
              <p className="mt-3 text-[11px] sm:text-xs text-gray-500">
                EGS supports you at each stage of the PCC process – from
                issuance and state authentication to MEA attestation / Apostille
                and, where required, embassy attestation – so that your Police
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
