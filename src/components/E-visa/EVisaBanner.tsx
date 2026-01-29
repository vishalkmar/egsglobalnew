"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HERO = {
  titleLines: ["E-Visa & Travel Assistance", "Fast. Simple. Reliable."],
  description:
    "Apply online with expert guidance. We help you submit the right documents, avoid rejections, and track your application end-to-end.",
};

export default function VisaBannerWithEVisaForm() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 120,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  return (
    <section className="relative w-full bg-white text-slate-900 mt-[70px]">
      <div className="relative w-full min-h-[70vh] md:min-h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            background:
              "radial-gradient(900px 500px at 18% 25%, rgba(99,102,241,0.45) 0%, rgba(15,23,42,0) 60%)," +
              "radial-gradient(700px 450px at 85% 30%, rgba(56,189,248,0.30) 0%, rgba(15,23,42,0) 55%)," +
              "radial-gradient(800px 520px at 55% 85%, rgba(244,114,182,0.18) 0%, rgba(15,23,42,0) 60%)," +
              "linear-gradient(135deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 35%, rgba(2,6,23,1) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* LEFT */}
            <div data-aos="fade-right" className="text-white pt-10 md:pt-14">
              <h1
                data-aos="fade-down"
                data-aos-delay="140"
                className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-tight"
              >
                {HERO.titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p
                data-aos="fade-down"
                data-aos-delay="210"
                className="mt-5 text-sm sm:text-base md:text-lg text-slate-100 max-w-xl leading-relaxed"
              >
                {HERO.description}
              </p>

              <div
                data-aos="fade-down"
                data-aos-delay="280"
                className="mt-7 grid grid-cols-2 gap-3 max-w-xl"
              >
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-xs text-slate-200">Avg. Processing</p>
                  <p className="text-base font-semibold">2–7 Working Days</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-xs text-slate-200">Coverage</p>
                  <p className="text-base font-semibold">50+ Destinations</p>
                </div>
              </div>
            </div>

            {/* RIGHT (placeholder for form) */}
            <div className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
