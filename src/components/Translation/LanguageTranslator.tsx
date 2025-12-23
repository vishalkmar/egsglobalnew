"use client";

import React, { useEffect, useRef, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const TranslationImageSlider: React.FC = () => {

    useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,   // ✅ repeat on every scroll in/out
      offset: 80,
      easing: "ease-in-out",
     
    });
  }, []);
  

  const [position, setPosition] = useState(50); // 0–100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clamp = (value: number, min = 0, max = 100) =>
    Math.min(max, Math.max(min, value));

  const updatePositionFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = clamp((x / rect.width) * 100);
    setPosition(percent);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updatePositionFromClientX(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePositionFromClientX(e.touches[0].clientX);
      }
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  const handleStartDrag = (
    e: React.MouseEvent | React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(true);
    if ("touches" in e && e.touches.length > 0) {
      updatePositionFromClientX(e.touches[0].clientX);
    } else if ("clientX" in e) {
      updatePositionFromClientX(e.clientX);
    }
  };

  // view mode depending on slider position (no snap)
  type ViewMode = "before" | "after" | "split";
  const viewMode: ViewMode =
    position < 45 ? "before" : position > 55 ? "after" : "split";

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6" data-aos="zoom-in">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-700">
            The Most Accurate Translation
          </h2>
          <div className="mt-2 h-[3px] w-40 bg-orange-500 mx-auto" />

          <p className="mt-6 text-lg md:text-xl text-slate-800">
            Available{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-semibold text-orange-500">
                At Your Fingertips
              </span>
              <span className="absolute inset-x-0 bottom-0 h-2 bg-orange-100 -z-0" />
            </span>{" "}
            easily
          </p>
        </div>

        {/* Slider card */}
        <div className="rounded-[32px] bg-white shadow-[0_40px_80px_rgba(15,23,42,0.12)] overflow-hidden max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] bg-slate-100 cursor-ew-resize"
          >
            {/* BACKGROUND: AFTER image full (French) */}
            {viewMode !== "before" && (
              <img
                src="/translation/ttwo.jpg"
                alt="Translated language"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* BEFORE full (English) */}
            {viewMode === "before" && (
              <img
                src="/translation/tone.jpg"
                alt="Original English"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* SPLIT view: half English, half French */}
            {viewMode === "split" && (
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: "50%" }}
              >
                <img
                  src=""
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Vertical orange line */}
            <div
              className="absolute top-0 bottom-0 w-[3px] bg-orange-500"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            />

            {/* Round handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
            >
              <div
                onMouseDown={handleStartDrag}
                onTouchStart={handleStartDrag}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white border-[3px] border-orange-500 text-orange-500 shadow-lg cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <span className="inline-block border-l-[8px] border-l-orange-500 border-y-[6px] border-y-transparent mr-0.5" />
                  <span className="inline-block border-r-[8px] border-r-orange-500 border-y-[6px] border-y-transparent ml-0.5" />
                </div>
              </div>
            </div>

            {/* BEFORE / AFTER labels */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2">
              <span className="inline-flex items-center rounded-md bg-white/90 px-4 py-2 text-xs font-semibold text-orange-500 shadow-sm">
                Before
              </span>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <span className="inline-flex items-center rounded-md bg-white/90 px-4 py-2 text-xs font-semibold text-orange-500 shadow-sm">
                After
              </span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Swipe the slider above to switch between English and the translated
          language.
        </p>
      </div>
    </section>
  );
};

export default TranslationImageSlider;
