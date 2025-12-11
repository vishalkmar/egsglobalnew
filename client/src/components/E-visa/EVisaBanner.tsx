"use client";

import React, { useEffect, useState } from "react";

type Slide = {
  id: number;
  image: string;
  badge: string;
  titleLines: string[];
  description: string;
  primaryCta?: string;
  secondaryCta?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/visa/bone.avif",
    badge: "Your Trusted Visa Partner",
    titleLines: [
      "Your Trusted Partner for",
      "Smooth & Successful Visa",
      "Approvals",
    ],
    description:
      "EGS Group simplifies visa processing with reliable, accurate, and fully managed backend support—helping travel agencies and tour operators deliver faster approvals with complete confidence.",
  },
  {
    id: 2,
    image: "/visa/btwo.jpg",
    badge: "Reliable & Faster Processing",
    titleLines: ["Full-Scale Visa", "Support Designed for Travel", "  Professionals"],
    description:
      "From itinerary verification to document review and embassy submission, EGS ensures seamless, error-free workflows so you can focus on growing your travel business.",
  },
  {
    id: 3,
    image: "/visa/three.jpg",
    badge: "Global Visa Coverage",
    titleLines: ["Visas for 50+", "Destinations", "Worldwide"],
    description:
      "Powered by strong expertise and international compliance knowledge, EGS supports visa applications across major leisure, corporate, MICE, and student destinations with unmatched accuracy.",
  },
  {
    id: 4,
    image: "/visa/five.jpg",
    badge: "Trusted by Thousands",
    titleLines: ["Reliable Backend", "Team for High", "Visa Volumes"],
    description:
      "With a dedicated, experienced, and process-driven operations team, EGS ensures high-volume visa handling with precision, compliance, and consistent customer satisfaction.",
  },
];

const AUTO_SLIDE_INTERVAL = 4000;

const VisaBannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const goToSlide = (index: number) => {
    const total = slides.length;
    if (index < 0) setCurrent(total - 1);
    else if (index >= total) setCurrent(0);
    else setCurrent(index);
  };

  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isHovering]);

  const next = () => goToSlide(current + 1);
  const prev = () => goToSlide(current - 1);

  return (
    <section
      className="relative w-full h-[70vh] md:h-[90vh] pt-[60px] bg-black overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* SLIDES WRAPPER */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-full flex-shrink-0"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${slide.image})` ,backgroundSize:'100% 100%'}}
            />

            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-xl md:max-w-2xl space-y-6 md:space-y-8">
                {/* Badge */}
                <span className="inline-flex items-center rounded-full bg-rose-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg">
                  {slide.badge}
                </span>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-tight text-white space-y-1">
                  {slide.titleLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-slate-100 max-w-xl leading-relaxed">
                  {slide.description}
                </p>

                {/* Agar baad mein CTA add karna ho to yahan buttons aa sakte hain */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left / Right Arrows */}
      <button
        type="button"
        onClick={prev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white text-lg hover:bg-black/60 transition"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white text-lg hover:bg-black/60 transition"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              current === index
                ? "w-6 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default VisaBannerCarousel;
