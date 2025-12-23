"use client";

// WhatWeDoSection.tsx (fixed layout: left image stays, right shows 2 rows; remaining cards go full-width 3-in-row)
import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Stamp,
  ShieldCheck,
  Languages,
  Ticket,

  Briefcase,
  FileCheck2,
  BadgeCheck,
} from "lucide-react";

type Service = {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  pill: string;
  id: string;
};

const SERVICES: Service[] = [
  {
    id: "visa",
    title: "Visa Services",
    subtitle: "Sticker Visa + E-Visa",
    description:
      "Country-specific guidance, accurate filing, document validation, and end-to-end coordination for both Sticker Visa and E-Visa categories.",
    icon: BadgeCheck,
    pill: "Visa",
  },
  {
    id: "mea",
    title: "MEA Attestation",
    subtitle: "Government authentication",
    description:
      "Support for document attestation through MEA workflows with clear checklists, verification steps, and status coordination.",
    icon: Stamp,
    pill: "Attestation",
  },
  {
    id: "pcc",
    title: "PCC Legalisation & Apostille",
    subtitle: "Police clearance + legalization",
    description:
      "Assistance with PCC preparation and legalization / apostille requirements as per destination country rules and document type.",
    icon: FileCheck2,
    pill: "Legalisation",
  },
  {
    id: "translation",
    title: "Translation Services",
    subtitle: "Accurate & compliant formatting",
    description:
      "Professional translation support with consistent formatting to match embassy/VFS submission expectations and document standards.",
    icon: Languages,
    pill: "Translation",
  },
  {
    id: "embassy",
    title: "Embassy & Consular Services",
    subtitle: "Appointments + submission support",
    description:
      "End-to-end assistance for appointment submission, document readiness, biometrics guidance (if required), and embassy/VFS procedures.",
    icon: Briefcase,
    pill: "Embassy",
  },
  {
    id: "hrd",
    title: "HRD Attestation",
    subtitle: "Educational document attestation",
    description:
      "State HRD verification workflow support for degrees, diplomas, transcripts and educational certificates for overseas acceptance.",
    icon: ShieldCheck,
    pill: "HRD",
  },
  {
    id: "insurance",
    title: "Insurance & Dummy Ticket",
    subtitle: "Visa-friendly documentation",
    description:
      "Dummy ticket reservations and travel insurance assistance aligned with visa documentation needs and timelines.",
    icon: Ticket,
    pill: "Travel",
  }
 
];

const HERO = {
  badge: "WHAT WE DO",
  title: "Services that make your documentation journey simple",
  desc: "All major visa, attestation, legalization, and on-ground support services—managed with accuracy-first workflows and clear communication.",
  image: "/about/whatwedo.jpg", // left image
};

function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

function ServiceCard({
  s,
  selected,
  onClick,
  aos,
  aosDelay,
}: {
  s: Service;
  selected: boolean;
  onClick: () => void;
  aos: string;
  aosDelay: number;
}) {
  const Icon = s.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left group relative rounded-2xl border transition-all overflow-hidden h-full",
        selected
          ? "border-sky-300/40 bg-white/12 shadow-[0_18px_45px_rgba(56,189,248,0.10)]"
          : "border-white/10 bg-white/8 hover:bg-white/10 hover:border-white/15"
      )}
      data-aos={aos}
      data-aos-delay={aosDelay}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/25 via-violet-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center shadow-md border",
                selected
                  ? "bg-sky-500/20 border-sky-300/30 text-sky-200"
                  : "bg-white/10 border-white/12 text-slate-100"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div>
              <p className="text-sm sm:text-base font-semibold text-white">
                {s.title}
              </p>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-200/80">
                {s.subtitle}
              </p>
            </div>
          </div>

          <span
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold border",
              selected
                ? "bg-sky-500/15 border-sky-300/25 text-sky-100"
                : "bg-white/8 border-white/10 text-slate-100/90"
            )}
          >
            {s.pill}
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-100/85 leading-relaxed">
          {s.description}
        </p>

        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <p className="mt-3 text-xs text-slate-200/70">Click to preview on the left</p>
      </div>
    </button>
  );
}

export default function WhatWeDoSection() {
  const [active, setActive] = useState<string>("visa");

  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      offset: 80,
      once: false,
    });
  }, []);

  const activeService = useMemo(
    () => SERVICES.find((s) => s.id === active) ?? SERVICES[0],
    [active]
  );

  // ✅ Right panel shows ONLY 2 rows (4 cards). Rest goes full width.
  const rightTop = useMemo(() => SERVICES.slice(0, 4), []);
  const rest = useMemo(() => SERVICES.slice(4), []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050B1F] via-[#0B1440] to-[#2B0B4A]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_25%,rgba(56,189,248,0.20),transparent_60%),radial-gradient(800px_520px_at_85%_30%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(900px_520px_at_55%_88%,rgba(34,197,94,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/45" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center text-white mb-10 sm:mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold"
            data-aos="fade-down"
          >
            <span className="h-2 w-2 rounded-full bg-sky-300" />
            {HERO.badge}
          </div>

          <h2
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            {HERO.title}
          </h2>

          <p
            className="mt-3 text-sm sm:text-base text-slate-100/90 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="130"
          >
            {HERO.desc}
          </p>
        </div>

        {/* ROW 1: Left (image+spotlight) + Right (2 rows fixed) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-start">
          {/* Left */}
          <div className="relative" data-aos="fade-right">
            <div className="relative rounded-[28px] overflow-hidden border border-white/12 bg-white/5 shadow-[0_22px_80px_rgba(2,6,23,0.55)]">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[420px]">
                <img
                  src="/whatwedo.jpg"
                  alt="EGS Group services"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.22em] uppercase text-slate-200/90">
                      Spotlight
                    </p>
                    <p className="mt-1 text-lg sm:text-xl font-semibold text-white">
                      {activeService.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-200/90">
                      {activeService.subtitle}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-100">
                    {activeService.pill}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-100/90 leading-relaxed">
                  {activeService.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-100">
                    Accuracy-first
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-100">
                    Embassy-ready docs
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-100">
                    Clear timelines
                  </span>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sky-400/18 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-violet-400/18 blur-3xl" />
          </div>

          {/* Right fixed (2 rows => 4 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rightTop.map((s, idx) => (
              <ServiceCard
                key={s.id}
                s={s}
                selected={s.id === active}
                onClick={() => setActive(s.id)}
                aos="zoom-in"
                aosDelay={80 + idx * 60}
              />
            ))}
          </div>
        </div>

        {/* ROW 2: Remaining services full width (3 in a row on lg) */}
        {rest.length > 0 && (
          <div className="mt-10">
            <div
              className="mb-5 flex items-center justify-between gap-3"
              data-aos="fade-up"
            >
              <p className="text-white font-semibold text-lg">
                More Services
              </p>
              <span className="text-xs text-slate-200/70">
                Click any card to preview above
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((s, idx) => (
                <ServiceCard
                  key={s.id}
                  s={s}
                  selected={s.id === active}
                  onClick={() => setActive(s.id)}
                  aos="fade-up"
                  aosDelay={60 + idx * 60}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
