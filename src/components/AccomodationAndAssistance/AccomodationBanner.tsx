"use client";

import React, { useEffect, useMemo, useState } from "react";

const HEADING_TEXT = "Accommodation Assistance for Safe & Budget-Friendly Stays";

const AccommodationAssistanceBanner: React.FC = () => {
  const [typedHeading, setTypedHeading] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // typing effect (runs once)
  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      setTypedHeading(HEADING_TEXT.slice(0, index + 1));
      index++;
      if (index >= HEADING_TEXT.length) window.clearInterval(interval);
    }, 38);

    return () => window.clearInterval(interval);
  }, []);

  // cursor blink (continuous)
  useEffect(() => {
    const t = window.setInterval(() => setShowCursor((p) => !p), 520);
    return () => window.clearInterval(t);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Delhi Coverage", value: "Hotels • Hostels • Stays" },
      { label: "Preferred", value: "Safe • Verified Areas" },
      { label: "Support", value: "Assistance from Start to Check-in" },
    ],
    []
  );

  return (
    <section className="relative w-full overflow-hidden mt-[70px]">
      {/* NAVY / BLUISH BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 520px at 18% 22%, rgba(56,189,248,0.26) 0%, rgba(2,6,23,0) 60%)," +
            "radial-gradient(760px 520px at 85% 28%, rgba(99,102,241,0.26) 0%, rgba(2,6,23,0) 58%)," +
            "radial-gradient(820px 560px at 55% 85%, rgba(244,114,182,0.12) 0%, rgba(2,6,23,0) 62%)," +
            "linear-gradient(135deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 36%, rgba(2,6,23,1) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/20" />

      {/* soft glows */}
      <div className="pointer-events-none absolute -top-28 -left-28 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-24 -right-32 h-80 w-80 rounded-full bg-sky-400/18 blur-3xl" />

      <div className="relative z-10 py-14 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* MAIN WRAPPER CARD (glass) */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center p-6 sm:p-10 lg:p-12">
              {/* LEFT */}
              <div
                className="order-2 lg:order-1"
                style={{
                  animation: "egsfadeup 700ms ease-out both",
                }}
              >
                {/* badge */}
                <div
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs sm:text-sm font-semibold text-white/90"
                  style={{ animation: "egsfadeup 700ms ease-out both", animationDelay: "80ms" }}
                >
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  Accommodation Support · Delhi
                </div>

                {/* heading */}
                <h1
                  className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                  style={{ animation: "egsfadeup 700ms ease-out both", animationDelay: "140ms" }}
                >
                  <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                    {typedHeading}
                  </span>
                  <span
                    className={`inline-block w-[10px] ml-1 rounded-sm align-middle ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ height: "1.15em", background: "rgba(125,211,252,0.9)" }}
                  />
                </h1>

                <p
                  className="mt-4 text-base sm:text-lg md:text-xl text-white/90"
                  style={{ animation: "egsfadeup 700ms ease-out both", animationDelay: "220ms" }}
                >
                  Accommodation assistance in Delhi for every type of traveller.
                </p>

                <p
                  className="mt-4 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed max-w-2xl"
                  style={{ animation: "egsfadeup 700ms ease-out both", animationDelay: "280ms" }}
                >
                  Finding the right place to stay is essential for a comfortable journey. EGS Group assists
                  travelers with short-term arrangements tailored to their needs, preferences, and budgets.
                  From affordable stays to premium housing options, we help you secure safe, reliable, and
                  well-connected accommodations.
                </p>

                {/* mini stats */}
                <div
                  className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3"
                  style={{ animation: "egsfadeup 700ms ease-out both", animationDelay: "340ms" }}
                >
                  {stats.map((s, i) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        animation: "egsfadeup 650ms ease-out both",
                        animationDelay: `${380 + i * 90}ms`,
                      }}
                    >
                      <p className="text-[11px] font-semibold tracking-wide text-white/60 uppercase">
                        {s.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white/90">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="mt-7 flex flex-wrap gap-3"
                  style={{ animation: "egsfadeup 700ms ease-out both", animationDelay: "520ms" }}
                >
                  <button className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-95 transition">
                    Request Accommodation Options
                  </button>
                  <button className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition">
                    Talk to a Coordinator
                  </button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div
                className="order-1 lg:order-2"
                style={{
                  animation: "egsscalein 650ms ease-out both",
                  animationDelay: "120ms",
                }}
              >
                <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.35)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  <img
                    src="/accomodation.jpg"
                    alt="Accommodation assistance and stay arrangements"
                    className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover"
                    width={1200}
                    height={800}
                  />
                  {/* small bottom label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center rounded-full bg-black/40 border border-white/10 px-4 py-2 text-xs sm:text-sm text-white/90 backdrop-blur">
                      Verified areas · Budget to Premium · Smooth check-in guidance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* keyframes */}
          <style>{`
            @keyframes egsfadeup {
              from { opacity: 0; transform: translateY(14px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes egsscalein {
              from { opacity: 0; transform: scale(0.96); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default AccommodationAssistanceBanner;
