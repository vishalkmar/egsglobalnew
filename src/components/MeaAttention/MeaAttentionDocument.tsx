"use client";

import React from "react";

const documentsRequired = ["Original Documents", "Passport Copy"];

const categories = [
  {
    title: "Educational Documents",
    color: "from-sky-500 to-sky-600",
    items: [
      "Degree certificate",
      "Diploma certificate",
      "Mark sheets",
      "Transfer Certificate",
      "Nursing Certificate",
    ],
  },
  {
    title: "Personal Documents",
    color: "from-amber-400 to-amber-500",
    items: [
      "Birth certificate",
      "Marriage certificate",
      "Death certificate",
      "Divorce certificate",
      "PCC Certificate",
    ],
  },
  {
    title: "Commercial Documents",
    color: "from-rose-500 to-rose-600",
    items: [
      "Power of Attorney",
      "Company Invoices",
      "Export Documentation",
      "Certificates of Incorporation",
      "Memorandum of Association",
    ],
  },
];

const MeaDocumentsSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN HEADING */}
        <div className="text-center mb-8 md:mb-10">
          <h2 data-aos="fade-left" className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
            Documents Required For MEA Attestation
          </h2>
          <p data-aos="fade-right" className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The documents required for MEA attestation are broadly classified
            into educational, personal and commercial categories. Before
            submission, you must have the following:
          </p>

          <ul data-aos="zoom-in" className="mt-4 inline-flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center text-sm sm:text-base text-slate-800">
            {documentsRequired.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 bg-white shadow-sm border border-slate-200 rounded-full px-4 py-1.5"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SUB HEADING */}
        <div className="text-center mb-6 md:mb-8" data-aos="zoom-out">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">
            Types of Documents That Need MEA Attestation
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Below is an overview of the documents that are commonly attested for
            use abroad.
          </p>
        </div>

        {/* CATEGORY CARDS – different style from screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
  {categories.map((category, index) => {
    const pos = index % 3; // 0,1,2
    const aosType =
      pos === 0 ? "fade-right" : pos === 1 ? "zoom-in" : "fade-left";

    return (
      <div
        key={category.title}
        data-aos={aosType}
        data-aos-delay={pos * 120}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col"
      >
        {/* colored bar + title */}
        <div
          className="rounded-t-2xl bg-gradient-to-r px-4 py-3 text-center text-white font-semibold text-sm sm:text-base tracking-wide"
          style={{ backgroundImage: undefined }}
        >
          <div
            className={`inline-flex px-4 py-1 rounded-full bg-gradient-to-r ${category.color} shadow-sm`}
          >
            {category.title}
          </div>
        </div>

        {/* content */}
        <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5 space-y-3">
          <p className="text-xs sm:text-sm text-gray-500">
            Commonly attested {category.title.toLowerCase()} include:
          </p>

          <div className="flex flex-wrap gap-2">
            {category.items.map((doc) => (
              <span
                key={doc}
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[11px] sm:text-xs text-slate-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {doc}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  })}
</div>

      </div>
    </section>
  );
};

export default MeaDocumentsSection;
