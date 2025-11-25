"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type CountryServiceConfig = {
  name: string;
  flag: string; // emoji for now – can be replaced with image
  heroImage: string;
  tagline: string;
  description: string;
  services: string[];
};

const NATIONALITIES = ["India", "Nepal", "Bangladesh"];

const countries: CountryServiceConfig[] = [
  {
    name: "North Macedonia",
    flag: "🇲🇰",
    heroImage:
      "/northmesodonia.jpg",
    tagline: "Rising study and work destination in the Balkans.",
    description:
      "Assistance for North Macedonia visa appointments and document submissions for students, workers and family visitors.",
    services: ["PCC Legalisation", "Appointment Submission"],
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    heroImage:
      "/romania.jpg",
    tagline: "Historic cities, universities and industrial hubs.",
    description:
      "Dedicated appointment booking and file submission support for Romania visas across major categories.",
    services: ["Appointment Submission"], // only this, as requested
  },
  {
    name: "Serbia",
    flag: "🇷🇸",
    heroImage:
      "/serbia.jpg",
    tagline: "Popular for studies, work permits and tourism.",
    description:
      "End-to-end help for Serbia visa appointments, PCC legalisation and file submission for long and short stays.",
    services: ["PCC Legalisation", "Appointment Submission"],
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    heroImage:
      "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Top destination for tourism, study and skilled jobs.",
    description:
      "Guidance on Italy visa requirements, PCC legalisation and appointment handling for applicants from India and neighbouring countries.",
    services: ["PCC Legalisation", "Appointment Submission"],
  },
  {
    name: "Croatia",
    flag: "🇭🇷",
    heroImage:
      "/cortia.jpg",
    tagline: "Schengen coastline with growing job and study options.",
    description:
      "Support for Croatia visa appointments, document checks and PCC legalisation for tourism, work and study plans.",
    services: ["PCC Legalisation", "Appointment Submission"],
  },
];

export default function CountriesSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl text-sky-600 font-bold mb-4">
            Countries We Serve
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Visa appointment handling, PCC legalisation and documentation
            support for key European destinations, tailored for South Asian
            applicants.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {countries.map((country) => (
            <Card
              key={country.name}
              data-testid={`card-country-${country.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 rounded-2xl flex flex-col"
            >
              {/* Hero image + overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={country.heroImage}
                  alt={`${country.name} landscape`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Light gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                {/* Floating flag badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-white/70 shadow-md bg-white/90 flex items-center justify-center text-lg">
                    <span aria-hidden="true">{country.flag}</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/90 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur">
                    {country.name}
                  </span>
                </div>

                {/* Country name & tagline at bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    data-testid={`text-country-name-${country.name.toLowerCase().replace(
                      /\s+/g,
                      "-"
                    )}`}
                    className="text-2xl font-bold text-white drop-shadow-md"
                  >
                    {country.name}
                  </h3>
                  <p className="text-xs mt-1 text-slate-100/90 line-clamp-2">
                    {country.tagline}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p
                  data-testid={`text-country-description-${country.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-sm text-slate-600 leading-relaxed mb-5"
                >
                  {country.description}
                </p>

                {/* NEW small section: Services + Nationalities Catered */}
                <div className="mb-6 grid grid-cols-2 gap-4 text-xs sm:text-[0.8rem] text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">
                      Services
                    </p>
                    <ul className="space-y-1">
                      {country.services.map((service) => (
                        <li key={service} className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">
                      Nationalities Catered
                    </p>
                    <ul className="space-y-1">
                      {NATIONALITIES.map((nat) => (
                        <li key={nat} className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>{nat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA button */}
                <div className="mt-auto">
                  <Button
                    data-testid={`button-learn-more-${country.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    variant="outline"
                    className="w-full group/button text-white border-primary/60 bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    Learn more about {country.name}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-24 bg-radial from-primary/10 via-transparent to-transparent blur-3xl" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
