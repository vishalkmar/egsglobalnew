import React, { useState } from "react";

const PURPOSES = {
  Tourism: [
    "Dubai",
    "Oman",
    "Singapore",
    "Vietnam",
    "Russia",
    "Thailand",
    "Azerbaijan",
    "Bahrain",
    "Armenia",
    "Egypt",
  ],
  Business: ["Thailand", "Oman", "Dubai", "USA", "UAE"],
  "Early Appointment": ["USA"],
} as const;

type PurposeKey = keyof typeof PURPOSES;

export default function VisaPurpose() {
  const [activePurpose, setActivePurpose] = useState<PurposeKey>("Tourism");
  const countries = PURPOSES[activePurpose];

  return (
    <section className="w-full bg-white text-slate-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Document requirements
        </h1>

        {/* Card wrapper */}
        <div className="bg-white border border-slate-200 rounded-2xl px-6 md:px-10 py-8 shadow-lg shadow-slate-200/70">
          {/* Purpose tabs */}
          <div className="mb-6">
            <p className="text-sm md:text-base font-medium mb-3">
              Select a purpose:
            </p>
            <div className="flex flex-wrap gap-3">
              {Object.keys(PURPOSES).map((purpose) => {
                const key = purpose as PurposeKey;
                const isActive = activePurpose === key;
                return (
                  <button
                    key={purpose}
                    type="button"
                    onClick={() => setActivePurpose(key)}
                    className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition
                      ${
                        isActive
                          ? "bg-rose-500 text-white shadow-md shadow-rose-400/50"
                          : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                  >
                    {purpose}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Country list */}
          <div>
            <p className="text-sm md:text-base font-medium mb-3">
              Select a country:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {countries.map((country) => (
                <div
                  key={country}
                  className="text-sm md:text-base text-slate-800 bg-primary text-white border border-primary rounded-xl px-3 py-2
                            cursor-pointer "
                >
                  {country}
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs md:text-sm text-slate-500">
              Change the purpose to see the countries available in each category.
              You can add more countries later by updating the list in this
              component.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
