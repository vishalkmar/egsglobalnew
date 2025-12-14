// EmbassyConsularIntro.tsx
import React from "react";

export default function EmbassyConsularIntro() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-14 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      {/* soft background accents (light) */}
      <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />

      <div className="max-w-5xl mx-auto relative">
        {/* Badge + Heading */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Embassy & Consular Services – Overview
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            What Are Embassy and Consular Services?
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-3xl mx-auto">
            A neutral explanation of how official embassies, consulates and visa
            centres handle international travel and documentation processes.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative rounded-3xl border border-slate-200/70 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden">
          {/* gradient top bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-400" />

          {/* subtle inner tint */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent" />

          <div className="p-6 sm:p-8 lg:p-10 relative">
            {/* Intro Paragraph */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Embassy and Consular Services refer to the official processes
              handled by a country’s Embassy, Consulate, or authorised visa
              centre (such as VFS Global). 
            </p>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Two-column layout on larger screens */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
              {/* Left: Steps / procedure */}
              <div className="rounded-2xl border border-slate-200/70 bg-white p-5 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
                  Typical Procedures Involved
                </h2>
                <p className="text-sm sm:text-base text-slate-700 mb-3">
                  In most cases, applicants must follow a defined procedure that
                  includes:
                </p>

                <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>
                      Submitting visa applications for tourism, business, study,
                      work, or long-term stay
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>
                      Providing biometrics such as fingerprints and photographs
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>
                      Scheduling appointments at the Embassy, Consulate, or VFS
                      centre
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>
                      Submitting passports and supporting documents for
                      verification
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>
                      Applying for consular services such as passport renewal
                      (for citizens of that country), attestation, document
                      verification, and emergency travel permissions
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right: Info block / highlight box */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-emerald-900 mb-2">
                  How Embassies and Consulates Operate
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                  Embassies and Consulates operate under strict international and
                  government guidelines. Each country has its own requirements,
                  document checklists, timelines, eligibility rules, and
                  jurisdiction restrictions. Appointment availability is
                  controlled directly by the concerned Embassy or visa centre,
                  and applicants must follow the official process to secure a
                  slot.
                </p>

                <div className="mt-4 rounded-xl bg-white/90 border border-emerald-100 px-3 py-2.5 text-xs sm:text-sm text-emerald-950">
                  In simple terms, Embassy and Consular Services are the official
                  gateway through which international travellers complete visa,
                  document, and identity-related procedures before travelling to
                  another country.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional tiny note */}
        <p className="mt-4 text-[11px] sm:text-xs text-slate-400 text-center">
          This section is for general informational purposes and does not replace
          official guidance from any Embassy, Consulate, or authorised visa centre.
        </p>
      </div>
    </section>
  );
}
