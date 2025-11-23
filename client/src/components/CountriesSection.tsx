import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import indiaFlag from "@assets/generated_images/india_national_flag.png";
import nepalFlag from "@assets/generated_images/nepal_national_flag.png";
import bangladeshFlag from "@assets/generated_images/bangladesh_national_flag.png";

const countries = [
  {
    name: "India",
    flag: indiaFlag,
    heroImage:
      "https://plus.unsplash.com/premium_photo-1697730429201-381b71f61427?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tagline: "Travel, study, work — simplified visa support for India.",
    description:
      "End-to-end visa assistance for travel, business, medical and study purposes in India. From paperwork to submission, we guide you at every step.",
    highlights: ["Tourist Visa", "Business Visa", "Medical Visa", "Embassy Support"],
  },
  {
    name: "Nepal",
    flag: nepalFlag,
    heroImage:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/87/68/a5.jpg",
    tagline: "Perfect for treks, pilgrimages and scenic getaways.",
    description:
      "Fast and reliable visa processing for Nepal including tourist visas, trekking permits and short business visits with local expertise.",
    highlights: ["Tourist Visa", "Trekking Permits", "Business Visa", "Fast Processing"],
  },
  {
    name: "Bangladesh",
    flag: bangladeshFlag,
    heroImage:
      "https://media.istockphoto.com/id/1256251766/photo/pyramid-shaped-building-of-national-martyrs-monument-bangladesh-liberation-war-memorial.jpg?s=612x612&w=0&k=20&c=q7xqq1lxJC39enBROHO0D0gvsiDM6uKQNFwQGPsEWMo=",
    tagline: "Business hubs, family visits and smooth border travel.",
    description:
      "Complete visa solutions for Bangladesh with professional guidance on tourist, business visas and extensions. Hassle-free, transparent support.",
    highlights: ["Tourist Visa", "Business Visa", "Visa Extensions", "Expert Guidance"],
  },
];

export default function CountriesSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
         
          <h2 className="text-3xl md:text-5xl text-sky-600 font-bold mb-4 ">
            Countries We Serve
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dedicated visa and documentation support across key South Asian destinations with
            localized expertise and reliable processing.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {countries.map((country) => (
            <Card
              key={country.name}
              data-testid={`card-country-${country.name.toLowerCase()}`}
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
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-white/70 shadow-md bg-white/80">
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/90 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur">
                    {country.name}
                  </span>
                </div>

                {/* Country name & tagline at bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    data-testid={`text-country-name-${country.name.toLowerCase()}`}
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
                  data-testid={`text-country-description-${country.name.toLowerCase()}`}
                  className="text-sm text-slate-600 leading-relaxed mb-5"
                >
                  {country.description}
                </p>

                {/* Highlights as stylish tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {country.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                    >
                      <Check className="w-3 h-3" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <div className="mt-auto">
                  <Button
                    data-testid={`button-learn-more-${country.name.toLowerCase()}`}
                    variant="outline"
                    className="w-full group/button text-white border-primary/60   bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    Learn more about {country.name}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Subtle glow on hover (very light for white theme) */}
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
