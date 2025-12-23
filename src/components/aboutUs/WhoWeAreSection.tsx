"use client";

// WhoWeAreSection.tsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WHO = {
  badge: "ABOUT EGS GROUP",
  tagline: "Global Travel & Documentation Partner",
  title: "Who We Are",
  desc1:
    "EGS Group supports individuals, families, and businesses with end-to-end travel documentation and embassy-facing processes.",
  desc2:
    "From visas (E-Visa + Sticker Visa) to attestations, translations, insurance, and on-ground assistance—our team focuses on accuracy, transparency, and smooth execution.",
  highlights: [
    "Visa assistance: E-Visa + Sticker Visa",
    "Attestation & legalization: HRD, MEA, PCC, Apostille",
    "Translation services & documentation support",
    "Insurance, dummy ticket, and appointment assistance",
  ],
  stats: [
    { k: "Accuracy-first", v: "Verification workflow" },
    { k: "Fast support", v: "Dedicated team" },
    { k: "Secure handling", v: "Confidential documents" },
  ],
  cta: "Learn More",
  image: {
    src: "/about/whoweare.jpg", // change this
    alt: "EGS Group team assisting clients",
  },
};

export default function WhoWeAreSection() {
  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      offset: 80,
      once: false, // repeats on scroll in/out (AOS style)
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050B1F] via-[#0B1440] to-[#2B0B4A]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_22%,rgba(56,189,248,0.22),transparent_60%),radial-gradient(800px_520px_at_85%_28%,rgba(168,85,247,0.20),transparent_60%),radial-gradient(900px_520px_at_55%_88%,rgba(34,197,94,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/40" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <div className="text-white" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              {WHO.badge}
            </div>

            <p
              className="mt-5 text-xs sm:text-sm tracking-[0.24em] uppercase text-slate-200/90"
              data-aos="fade-down"
              data-aos-delay="80"
            >
              {WHO.tagline}
            </p>

            <h2
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              {WHO.title}
            </h2>

            <p
              className="mt-4 text-sm sm:text-base text-slate-100/90 leading-relaxed max-w-xl"
              data-aos="fade-up"
              data-aos-delay="170"
            >
              {WHO.desc1}
            </p>

            <p
              className="mt-3 text-sm sm:text-base text-slate-100/90 leading-relaxed max-w-xl"
              data-aos="fade-up"
              data-aos-delay="220"
            >
              {WHO.desc2}
            </p>

            {/* Highlights */}
            <div
              className="mt-6 rounded-2xl border border-white/12 bg-white/8 p-5"
              data-aos="fade-up"
              data-aos-delay="260"
            >
              <p className="text-sm font-semibold text-white mb-3">
                What you can expect
              </p>
              <ul className="space-y-2.5 text-sm text-slate-100/90">
                {WHO.highlights.map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-300 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {WHO.stats.map((s, i) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-white/12 bg-white/10 p-4"
                  data-aos="zoom-in"
                  data-aos-delay={320 + i * 90}
                >
                  <p className="text-xs text-slate-200/90">{s.k}</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-7" data-aos="fade-up" data-aos-delay="520">
              <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(56,189,248,0.18)] hover:opacity-95 transition">
                {WHO.cta}
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative" data-aos="fade-left">
            <div className="relative rounded-[28px] overflow-hidden border border-white/12 bg-white/5 shadow-[0_22px_80px_rgba(2,6,23,0.55)]">
              {/* Image */}
              <div className="relative h-[280px] sm:h-[340px] lg:h-[420px]">
                <img
                  src="/aboutimage2.jpg"
                  alt={WHO.image.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              </div>

              {/* Floating card */}
              <div
                className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 rounded-2xl border border-white/12 bg-black/35 backdrop-blur-md p-4 sm:p-5"
                data-aos="zoom-in"
                data-aos-delay="180"
              >
                <p className="text-sm font-semibold text-white">
                  Reliable documentation support under one roof
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                  Clear guidance, accurate filing, and proactive follow-ups—so
                  your submission stays embassy-ready.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-100">
                    Visa (E-Visa + Sticker)
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-100">
                    Attestation & Legalization
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-100">
                    Translation & Support
                  </span>
                </div>
              </div>
            </div>

            {/* Soft glows */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-violet-400/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
