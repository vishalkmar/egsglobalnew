import React, { useMemo, useState } from "react";

type Destination = {
  name: string;
  image: string;
  badge?: string;
  visaType: string;
  stayDuration: string;
  processingTime: string;
  entryType: string;
};

const DESTINATIONS: Destination[] = [
  {
    name: "Dubai",
    image: "/visa/countries/dubai.jpg",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "4–6 working days",
    entryType: "Single",
  },
  {
    name: "Oman",
    image: "/visa/countries/oman.jpg",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "1-3 working days",
    entryType: "Single Entry",
  },
  {
    name: "Singapore",
    image: "/visa/countries/singapore.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "3–5 working days",
    entryType: "Single / Multiple Entry",
  },
  {
    name: "Vietnam",
    image: "/visa/countries/viatnamm.jpg",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "4–7 working days",
    entryType: "Single / Multiple Entry",
  },
  {
    name: "Russia",
    image: "/visa/countries/russia.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "15/30 days",
    processingTime: "10–15 working days",
    entryType: "Single / Double / Multiple",
  },
  {
    name: "Thailand",
    image: "/visa/countries/thailand.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/15/30 days",
    processingTime: "2–5 working days",
    entryType: "Single / Multiple Entery ",
  },
  {
    name: "Azerbaijan",
    image: "/visa/countries/azerbaijan.jpg",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "3–7 working days",
    entryType: "Single / Mulitple Entry",
  },
  {
    name: "Bahrain",
    image: "/visa/countries/bahrain.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/15/30 days",
    processingTime: "3-5 working days",
    entryType: "Single Entry",
  },
  {
    name: "Armenia",
    image: "/visa/countries/armenia.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "3-5 working days",
    entryType: "Single Entry",
  },
  {
    name: "Egypt",
    image: "/visa/countries/egypt.avif",
    badge: "E-Visa",
    visaType: "Tourism",
    stayDuration: "10/30 days",
    processingTime: "5–7 working days",
    entryType: "Single Entry",
  },
];

function MoreCountriesCard() {
  return (
    <article className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 shadow-[0_10px_35px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col min-h-[290px]">
      <div className="relative h-54 md:h-68 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
       

        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-white text-lg md:text-xl font-semibold">
              We process many more countries
            </p>
            <p className="mt-2 text-white/80 text-sm">
              Didn’t find your destination here? Share your country and we’ll guide you.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              <span className="bg-white/10 text-white/90 text-[11px] font-semibold px-3 py-1 rounded-full">
                Tourist Visa
              </span>
              <span className="bg-white/10 text-white/90 text-[11px] font-semibold px-3 py-1 rounded-full">
                Business Visa
              </span>
              <span className="bg-white/10 text-white/90 text-[11px] font-semibold px-3 py-1 rounded-full">
                Sticker / E-Visa
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-3 pb-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-white font-semibold">Need help?</p>
          <span className="bg-white/10 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
            Contact EGS
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] md:text-xs text-white/80">
          <div className="bg-white/10 rounded-2xl px-3 py-2">
            <p className="font-semibold text-[11px] text-white/90">Document Check</p>
            <p className="mt-1">Free guidance</p>
          </div>
          <div className="bg-white/10 rounded-2xl px-3 py-2">
            <p className="font-semibold text-[11px] text-white/90">Processing</p>
            <p className="mt-1">Country-specific</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PopularDestinations() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleDestinations = DESTINATIONS.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount(DESTINATIONS.length);

  // Figure out if we should add filler cards (desktop/tablet)
  // - mobile: 1 column => no gap
  // - sm: 2 columns
  // - lg: 3 columns
  const fillers = useMemo(() => {
    const count = visibleDestinations.length;

    // For lg (3 columns): if remainder 1 => add 2 fillers, remainder 2 => add 1 filler
    const rem3 = count % 3;
    const needForLg = rem3 === 0 ? 0 : 3 - rem3;

    // For sm (2 columns): if remainder 1 => add 1 filler
    const rem2 = count % 2;
    const needForSm = rem2 === 0 ? 0 : 1;

    // We’ll render 2 fillers max, and show/hide by responsive classes:
    // - one filler visible on sm (when needForSm=1)
    // - fillers visible on lg based on needForLg
    return { needForLg, needForSm };
  }, [visibleDestinations.length]);

  return (
    <section className="w-full bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-[0.2em] text-rose-500 uppercase">
            Handpicked for you
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-2">
            Popular Visa Destinations
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            Browse top countries travellers are applying for right now.
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

              {/* Content section */}
              <div className="px-4 pt-3 pb-2 flex flex-col gap-3 flex-1">
                {/* Title + tags */}
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

                {/* Info row */}
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

          {/* FILLER: show only when needed (responsive) */}
          {fillers.needForSm === 1 && (
            <div className="hidden sm:block lg:hidden">
              <MoreCountriesCard />
            </div>
          )}

          {fillers.needForLg >= 1 && (
            <div className="hidden lg:block">
              <MoreCountriesCard />
            </div>
          )}

         
        </div>

        {/* Load more */}
        {visibleCount < DESTINATIONS.length && (
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
