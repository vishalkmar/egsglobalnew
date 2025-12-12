import React, { useState } from "react";

type Destination = {
  name: string;
  image: string;
  badge?: string;
  visaType: string;
  stayDuration: string;
  processingTime: string;
  entryType: string;
};

const STICKER_DESTINATIONS: Destination[] = [
  {
    name: "USA",
    image: "/stickervisa/usa.avif",
    badge: "Sticker Visa",
    visaType: "Tourism / Business",
    stayDuration: "As per visa issued",
    processingTime: "10-30 working days",
    entryType: "Multiple (commonly)",
  },
  {
    name: "UK",
    image: "/stickervisa/uk.avif",
    badge: "Sticker Visa",
    visaType: "Tourism / Business",
    stayDuration: "As per visa issued",
    processingTime: "15–30 working days",
    entryType: "Multiple (as per approval)",
  },
  {
    name: "Canada",
    image: "/stickervisa/canada.jpg",
    badge: "Sticker Visa",
    visaType: "Tourism / Business",
    stayDuration: "As per visa issued",
    processingTime: "20–45 working days",
    entryType: "Multiple (commonly)",
  },
  {
    name: "New Zealand",
    image: "/stickervisa/newzeland.avif",
    badge: "Sticker Visa",
    visaType: "Tourism / Business",
    stayDuration: "As per visa issued",
    processingTime: "15–30 working days",
    entryType: "Multiple (as per approval)",
  },
  {
    name: "France",
    image: "/stickervisa/france.avif",
    badge: "Sticker Visa",
    visaType: "Schengen",
    stayDuration: "10/15/30/90 days",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Germany",
    image: "/stickervisa/germany.avif",
    badge: "Sticker Visa",
    visaType: "Schengen",
    stayDuration: "10/15/30/90 days",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Hungary",
    image: "/stickervisa/hungary.avif",
    badge: "Sticker Visa",
    visaType: "Schengen",
    stayDuration: "10/15/30/90 days",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Italy",
    image: "/stickervisa/itlay.jpg",
    badge: "Sticker Visa",
    visaType: "Schengen",
    stayDuration: "10/15/30/90 days",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Malta",
    image: "/stickervisa/malta.jpg",
    badge: "Sticker Visa",
    visaType: "Schengen",
    stayDuration: "10/15/30/90 days",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Spain",
    image: "/stickervisa/spain.avif",
    badge: "Sticker Visa",
    visaType: "Schengen",
    stayDuration: "10/15/30/90 days",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Latvia",
    image: "/stickervisa/latvia.jpg",
    badge: "Sticker Visa",
    visaType: "Schengen",
    stayDuration: "10/15/30/90 days",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Russia",
    image: "/visa/countries/russia.avif",
    badge: "Sticker Visa",
    visaType: "Tourism / Business",
    stayDuration: "15/30 days",
    processingTime: "10–15 working days",
    entryType: "Single / Double / Multiple",
  },
  {
    name: "Bulgaria",
    image: "/stickervisa/bulgaria.avif",
    badge: "Sticker Visa",
    visaType: "Tourism / Business",
    stayDuration: "As per approval",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Romania",
    image: "/stickervisa/romania.avif",
    badge: "Sticker Visa",
    visaType: "Tourism / Business",
    stayDuration: "As per approval",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
  {
    name: "Croatia",
    image: "/stickervisa/Croatia.avif",
    badge: "Sticker Visa",
    visaType: "Schengen (as applicable)",
    stayDuration: "10/15/30/90 days",
    processingTime: "10–20 working days",
    entryType: "Single / Multiple",
  },
];

export default function StickerVisaDestinations() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleDestinations = STICKER_DESTINATIONS.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount(STICKER_DESTINATIONS.length);

  return (
    <section className="w-full bg-slate-50 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-[0.2em] text-rose-500 uppercase">
            Handpicked for you
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mt-2">
            Sticker Visa Destinations
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            Popular countries where a physical visa sticker is required.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((dest) => (
            <article
              key={dest.name}
              className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(15,23,42,0.08)] overflow-hidden border border-slate-100 flex flex-col"
            >
              {/* Image section */}
              <div className="relative h-54 md:h-58 w-full overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {dest.badge && (
                  <span className="absolute top-3 right-3 bg-amber-400 text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                    {dest.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="px-4 pt-3 pb-2 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900">
                    {dest.name}
                  </h3>
                  <div className="flex gap-2">
                    <span className="bg-slate-100 text-[11px] font-semibold text-slate-700 px-3 py-1 rounded-full">
                      {dest.visaType}
                    </span>
                    <span className="bg-slate-100 text-[11px] font-semibold text-slate-700 px-3 py-1 rounded-full">
                      {dest.entryType}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] md:text-xs text-slate-500 mt-1">
                  <div className="bg-slate-50 rounded-2xl px-3 py-2">
                    <p className="font-semibold text-[11px] text-slate-600">
                      Stay Duration
                    </p>
                    <p className="mt-1">{dest.stayDuration}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl px-3 py-2">
                    <p className="font-semibold text-[11px] text-slate-600">
                      Processing Time
                    </p>
                    <p className="mt-1">{dest.processingTime}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        {visibleCount < STICKER_DESTINATIONS.length && (
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={handleLoadMore}
              className="px-6 py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold shadow-md hover:bg-rose-600 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
