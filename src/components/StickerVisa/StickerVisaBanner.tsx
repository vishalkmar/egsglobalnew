"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function VisaStickerBannerOnly() {
  useEffect(() => {
    AOS.init({
      duration: 750,
      once: false,
      offset: 120,
      easing: "ease-out",
      mirror: true,
    });
  }, []);

  return (
    <section
      className="w-full bg-white px-4 py-12 mt-[70px]"
      style={{
        background:
          "radial-gradient(900px 500px at 18% 25%, rgba(99,102,241,0.45) 0%, rgba(15,23,42,0) 60%)," +
          "radial-gradient(700px 450px at 85% 30%, rgba(56,189,248,0.30) 0%, rgba(15,23,42,0) 55%)," +
          "radial-gradient(800px 520px at 55% 85%, rgba(244,114,182,0.18) 0%, rgba(15,23,42,0) 60%)," +
          "linear-gradient(135deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 35%, rgba(2,6,23,1) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[28px] shadow-2xl border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent" />

          {/* Decorative glows */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute top-16 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="relative z-10 p-7 sm:p-10 md:p-12">
            <div
              data-aos="fade-down"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs sm:text-sm font-semibold text-white"
            >
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              EGS Group Visa Desk
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="80"
              className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white"
            >
              Apply for Sticker Visa
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="140"
              className="mt-4 text-sm sm:text-base md:text-lg text-slate-100/90 max-w-3xl leading-relaxed"
            >
              A Sticker Visa is an embassy-issued visa stamped on your passport
              after approval. It typically requires correct documentation,
              appointment scheduling, and passport submission.
            </p>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-3 text-sm sm:text-base md:text-lg text-slate-100/90 max-w-3xl leading-relaxed"
            >
              With EGS, you share your details once and our team handles document
              verification, formatting checks, submission guidance, and follow-ups
              as per destination requirements.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="260"
              className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl"
            >
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs text-slate-200">Processing</p>
                <p className="text-base font-semibold text-white">
                  2–7 Working Days
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs text-slate-200">Accuracy</p>
                <p className="text-base font-semibold text-white">
                  Document-first Review
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs text-slate-200">Support</p>
                <p className="text-base font-semibold text-white">
                  Dedicated Assistance
                </p>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="320"
              className="mt-6 text-xs sm:text-sm text-slate-200/90"
            >
              Share your requirements and our team will guide you through the next steps.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
