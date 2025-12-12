"use client";

import React, { useState } from "react";

type TabKey = "what" | "benefits" | "why";

const ImmigrationTabs = {
  what: {
    heading: "What Is Immigration Translation?",
    content: (
      <>
        <p className="mb-3">
          Immigration translation is the translation of documents needed for
          immigration purposes, such as birth certificates, marriage
          certificates, divorce decrees, educational transcripts and employment
          records. These documents must be accurately translated to support an
          immigration application.
        </p>
        <p className="mb-3">
          Professional translation services, employing translators fluent in
          both the source and target languages and experienced in translating
          official documents, typically perform immigration translation. To
          verify the accuracy of the translation, an affidavit or other form of
          certification may be required.
        </p>
        <p>
          The reliability and accuracy of translated documents are crucial in
          the immigration process, as even minor errors can delay or impact the
          outcome of an application.
        </p>
      </>
    ),
  },
  benefits: {
    heading: "The Benefits of Immigration Translation",
    content: (
      <>
        <p className="mb-3">
          Here are some advantages of using a professional translation service
          for immigration translation:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-semibold">Accuracy:</span> Professional
            translation services ensure that your translated documents are
            accurate and faithfully represent the originals.
          </li>
          <li>
            <span className="font-semibold">Legality:</span> Many immigration
            authorities require legally recognised translations.
          </li>
          <li>
            <span className="font-semibold">Speed:</span> Professional teams can
            translate documents quickly and efficiently.
          </li>
          <li>
            <span className="font-semibold">Quality:</span> Experienced
            translators ensure translated content is clear and precise.
          </li>
          <li>
            <span className="font-semibold">Convenience:</span> Saves time and
            effort—no need to manage multiple translators yourself.
          </li>
        </ul>
      </>
    ),
  },
  why: {
    heading: "Why EGS Group for Immigration Translation?",
    content: (
      <>
        <p className="mb-3">
          EGS Group understands the unique challenges individuals and businesses
          face when navigating immigration processes. That’s why we offer
          translation solutions tailored to each client’s specific needs.
        </p>
        <p>
          Our team delivers high-quality, legally compliant translations and
          collaborates closely with clients to strengthen every immigration
          file.
        </p>
      </>
    ),
  },
};

const CertificateTabs = {
  what: {
    heading: "What Is Certificate Translation?",
    content: (
      <>
        <p className="mb-3">
          Certificate translation involves converting an official document from
          one language to another. This service is often required when a
          foreign-language certificate must be presented for a job application,
          immigration process or any legal or official purpose.
        </p>
        <p className="mb-3">
          Professional translation companies like EGS Group perform certificate
          translation using translators proficient in both the source and target
          languages and experienced with official documents.
        </p>
        <p>
          In many cases, an affidavit or other certification is needed to
          confirm accuracy and authenticity of the translation.
        </p>
      </>
    ),
  },
  benefits: {
    heading: "The Benefits of Certificate Translation",
    content: (
      <>
        <p className="mb-3">
          There are several advantages to having your certificates translated by
          EGS Group:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-semibold">Accuracy:</span> Precise, faithful
            translations for legal/official verification.
          </li>
          <li>
            <span className="font-semibold">Legality:</span> Meets standards of
            employers, universities and authorities.
          </li>
          <li>
            <span className="font-semibold">Speed:</span> Urgent translations
            without compromising quality.
          </li>
          <li>
            <span className="font-semibold">Quality:</span> Natural readability
            with all important details preserved.
          </li>
          <li>
            <span className="font-semibold">Convenience:</span> No hassle of
            managing translators or terminology checks.
          </li>
        </ul>
      </>
    ),
  },
  why: {
    heading: "Why EGS Group for Certificate Translation?",
    content: (
      <>
        <p className="mb-3">
          Certificates are crucial for careers, studies and legal procedures.
          EGS Group helps bridge communication gaps when documents are in a
          different language.
        </p>
        <p>
          Our translators combine linguistic expertise with industry knowledge,
          focusing on clarity, compliance and presentation so documents are
          accepted confidently.
        </p>
      </>
    ),
  },
};

const TabButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      relative px-4 py-2 text-sm font-semibold transition
      ${
        active
          ? "text-white"
          : "text-slate-200 hover:text-white"
      }
    `}
  >
    {/* underline */}
    <span
      className={`
        absolute left-0 bottom-0 h-[2px] w-full transition-opacity
        ${active ? "opacity-100 bg-gradient-to-r from-violet-500 to-fuchsia-500" : "opacity-0"}
      `}
    />
    {/* active pill bg */}
    <span
      className={`
        absolute inset-0 rounded-md -z-10 transition-opacity
        ${
          active
            ? "opacity-100 bg-gradient-to-r from-violet-600/70 to-fuchsia-600/60"
            : "opacity-0 hover:opacity-100 bg-white/5"
        }
      `}
    />
    {label}
  </button>
);

const TranslationInfoSections: React.FC = () => {
  const [immigrationTab, setImmigrationTab] = useState<TabKey>("what");
  const [certificateTab, setCertificateTab] = useState<TabKey>("what");

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#070A14] via-[#0B1024] to-[#070A14]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16 md:space-y-20">

        {/* IMMIGRATION */}
        <div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Immigration Translation Services
            </h2>
            <div className="mt-3 h-[3px] w-32 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto md:mx-0 rounded-full" />
            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto md:mx-0">
              Clear, compliant translations for visa files, residency applications and official submissions.
            </p>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/10 bg-black/25 px-2 py-2">
              <TabButton
                label="What It Is"
                active={immigrationTab === "what"}
                onClick={() => setImmigrationTab("what")}
              />
              <TabButton
                label="Benefits"
                active={immigrationTab === "benefits"}
                onClick={() => setImmigrationTab("benefits")}
              />
              <TabButton
                label="Why Us?"
                active={immigrationTab === "why"}
                onClick={() => setImmigrationTab("why")}
              />
            </div>

            {/* Content */}
            <div className="p-5 md:p-7 text-sm md:text-base text-slate-200 leading-relaxed">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {ImmigrationTabs[immigrationTab].heading}
              </h3>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5 text-slate-200">
                {ImmigrationTabs[immigrationTab].content}
              </div>

              <button className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* CERTIFICATE */}
        <div>
          {/* heading right, content LTR */}
          <div className="text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Certificate Translation Services
            </h2>
            <div className="mt-3 h-[3px] w-32 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto md:ml-auto md:mr-0 rounded-full" />
            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto md:ml-auto md:mr-0">
              Embassy-ready certificate translations with accurate formatting and terminology.
            </p>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
            {/* Tabs RIGHT */}
            <div className="flex justify-end gap-1 border-b border-white/10 bg-black/25 px-2 py-2">
              <TabButton
                label="What It Is"
                active={certificateTab === "what"}
                onClick={() => setCertificateTab("what")}
              />
              <TabButton
                label="Benefits"
                active={certificateTab === "benefits"}
                onClick={() => setCertificateTab("benefits")}
              />
              <TabButton
                label="Why Us?"
                active={certificateTab === "why"}
                onClick={() => setCertificateTab("why")}
              />
            </div>

            {/* Content LEFT-to-RIGHT */}
            <div className="p-5 md:p-7 text-sm md:text-base text-slate-200 leading-relaxed text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {CertificateTabs[certificateTab].heading}
              </h3>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5 text-slate-200">
                {CertificateTabs[certificateTab].content}
              </div>

              <div className="mt-6 flex md:justify-end">
                <button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TranslationInfoSections;
