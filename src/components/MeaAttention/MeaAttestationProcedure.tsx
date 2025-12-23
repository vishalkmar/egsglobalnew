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
  color: string; // tailwind border color
  steps: FlowStep[];
}

const flows: FlowType[] = [
  {
    title: "For Educational Documents",
    highlight: "HRD → MEA → Embassy",
    description:
      "Educational certificates are first authenticated by the Human Resource / Education Department of the issuing state or union territory, then attested by MEA and finally by the concerned country’s embassy.",
    color: "border-sky-500",
    steps: [
      {
        label: "Human Resource Department (HRD)",
        sub: "State / UT Education or HRD Department",
      },
      {
        label: "MEA Attestation",
        sub: "Ministry of External Affairs, New Delhi",
      },
      {
        label: "Embassy Attestation",
        sub: "Concerned foreign embassy / consulate",
      },
    ],
  },
  {
    title: "For Non-Educational (Personal) Documents",
    highlight: "Home Dept → MEA → Embassy",
    description:
      "Personal documents such as birth, marriage, or death certificates are authenticated by the Home / General Administration Department, then attested by MEA and finally by the embassy of the destination country.",
    color: "border-amber-500",
    steps: [
      {
        label: "Home Department / GAD",
        sub: "State Home / General Administration Dept.",
      },
      {
        label: "MEA Attestation",
        sub: "Ministry of External Affairs, New Delhi",
      },
      {
        label: "Embassy Attestation",
        sub: "Concerned foreign embassy / consulate",
      },
    ],
  },
  {
    title: "For Commercial Documents",
    highlight: "Chamber → MEA → Embassy",
    description:
      "Commercial papers are pre-authenticated by the Chamber of Commerce, followed by MEA attestation and then embassy attestation, making them valid for international trade and corporate use.",
    color: "border-rose-500",
    steps: [
      {
        label: "Chamber of Commerce",
        sub: "Authorised Chamber pre-authentication",
      },
      {
        label: "MEA Attestation",
        sub: "Ministry of External Affairs, New Delhi",
      },
      {
        label: "Embassy Attestation",
        sub: "Concerned foreign embassy / consulate",
      },
    ],
  },
];

const MeaAttestationProcedureFlow: React.FC = () => {
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
            data-aos="fade-right"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800"
          >
            Procedure Of MEA Document Attestation
          </h2>
          <p
            data-aos="fade-left"
            data-aos-delay="100"
            className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            MEA attestation is completed after the designated state authority has
            authenticated the document. Once the state / chamber process is
            complete, the Ministry of External Affairs (MEA), New Delhi, attests
            the document, and in many cases it is then further attested by the
            concerned country’s embassy.
          </p>
        </div>

        {/* FLOW CARDS */}
        <div className="space-y-8 md:space-y-10">
          {flows.map((flow, flowIndex) => {
            // step card background theme
            const stepBgClass =
              flowIndex === 0
                ? "bg-amber-500"
                : flowIndex === 1
                ? "bg-sky-600"
                : "bg-emerald-600";

            const stepTitleTextClass = "text-white";
            const stepSubTextClass =
              flowIndex === 0
                ? "text-amber-50/90"
                : flowIndex === 1
                ? "text-sky-50/90"
                : "text-emerald-50/90";

            const stepLabelTextClass = "text-white/80";

            return (
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
                      data-aos-delay={flowIndex * 120 + 80}
                      className="text-lg sm:text-xl font-semibold text-slate-800"
                    >
                      {flow.title}
                    </h3>
                    <p
                      data-aos="fade-left"
                      data-aos-delay={flowIndex * 120 + 120}
                      className="mt-1 text-xs sm:text-sm text-gray-600"
                    >
                      {flow.description}
                    </p>
                  </div>

                  <span
                    data-aos="zoom-in"
                    data-aos-delay={flowIndex * 120 + 160}
                    className="mt-1 inline-flex items-center justify-center self-start md:self-center rounded-full bg-slate-900/5 text-[11px] sm:text-xs px-3 py-1 font-medium text-slate-700"
                  >
                    {flow.highlight}
                  </span>
                </div>

                {/* STEP FLOW */}
                <div className="mt-2">
                  <div className="relative">
                    {/* snake line behind cards (desktop only) */}
                    <div className="hidden md:block absolute top-1/2 left-4 right-4 h-[2px] bg-gradient-to-r from-sky-300 via-emerald-300 to-rose-300 -translate-y-1/2 pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-3 relative z-10">
                      {flow.steps.map((step, index) => {
                        // per-step animation: 1st fade-right, 2nd zoom-in, 3rd fade-left
                        const pos = index % 3;
                        const stepAos =
                          pos === 0
                            ? "fade-right"
                            : pos === 1
                            ? "zoom-in"
                            : "fade-left";

                        const delayBase = flowIndex * 120 + 220 + index * 140;

                        return (
                          <React.Fragment key={step.label}>
                            {/* STEP CARD */}
                            <div className="flex-1">
                              <div className="relative max-w-xs md:max-w-none mx-auto">
                                {/* connector dot */}
                                <span className="hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-white border border-sky-300" />

                                <div
                                  data-aos={stepAos}
                                  data-aos-delay={delayBase}
                                  data-aos-duration="650"
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

                            {/* ARROW BETWEEN STEPS */}
                            {index < flow.steps.length - 1 && (
                              <div
                                data-aos="zoom-in"
                                data-aos-delay={delayBase + 70}
                                className="flex md:flex-col items-center justify-center md:justify-start"
                              >
                                {/* mobile arrow */}
                                <span className="md:hidden text-slate-400 text-lg">
                                  →
                                </span>
                                {/* desktop node */}
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
                  data-aos-delay={flowIndex * 120 + 700}
                  className="mt-3 text-[11px] sm:text-xs text-gray-500"
                >
                  EGS assists you at every stage of this process – from state /
                  chamber authentication to MEA attestation and, where required,
                  embassy attestation – ensuring your documents are accepted
                  smoothly abroad.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MeaAttestationProcedureFlow;
