// KeyConsiderationsSection.tsx
"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const indiaImg = "https://flagcdn.com/w320/in.png";
const bangladeshImg = "https://flagcdn.com/w320/bd.png";
const nepalImg = "https://flagcdn.com/w320/np.png";

export default function KeyConsiderationsSection() {
  useEffect(() => {
    AOS.init({
      duration: 850,
      once: false,
      offset: 90,
      easing: "ease-out",
      mirror: true,
    });
  }, []);

  const cards = [
    {
      img: indiaImg,
      alt: "India",
      title: "Indian Citizens",
      subtitle: "Applicants residing in India",
      aos: "fade-right", // left -> right
      body: (
        <>
          <p>
            <span className="font-semibold text-white">Correct visa category:</span>{" "}
            Tourist / Business / Student / Work / Transit – must match the purpose of travel.
          </p>
          <p>
            <span className="font-semibold text-white">Accurate passport details:</span>{" "}
            Name, DOB, passport number and issue/expiry dates must exactly match the passport.
          </p>
          <p>
            <span className="font-semibold text-white">Jurisdiction check:</span>{" "}
            Ensure Delhi VFS / Embassy is correct for your state of residence.
          </p>
          <p>
            <span className="font-semibold text-white">Previous travel history:</span>{" "}
            Declare all Schengen / US / UK / other visas honestly wherever the form asks.
          </p>
          <p>
            <span className="font-semibold text-white">Passport validity:</span>{" "}
            Ideally 6+ months beyond the travel date with enough blank pages.
          </p>
          <p>
            <span className="font-semibold text-white">Active contact details:</span>{" "}
            Use a working email and Indian mobile number for OTPs, links and alerts.
          </p>
          <p>
            <span className="font-semibold text-white">Biometrics history:</span>{" "}
            For Schengen/other visas, check if old biometrics are valid or new ones are required.
          </p>
        </>
      ),
    },
    {
      img: bangladeshImg,
      alt: "Bangladesh",
      title: "Bangladesh Citizens",
      subtitle: "Applicants residing in India",
      aos: "zoom-in", // zoom in
      body: (
        <>
          <p>
            <span className="font-semibold text-white">Correct visa category:</span>{" "}
            Tourist / Business / Student / Work / Transit – must match the purpose of travel.
          </p>
          <p>
            <span className="font-semibold text-white">Embassy / VFS eligibility:</span>{" "}
            Confirm that the Delhi Embassy / VFS accepts Bangladeshi nationals residing in India
            (some missions require applying from Bangladesh).
          </p>
          <p>
            <span className="font-semibold text-white">Additional scrutiny:</span>{" "}
            Some countries may apply extra checks or longer processing time – manage expectations accordingly.
          </p>
          <p>
            <span className="font-semibold text-white">Passport condition:</span>{" "}
            Clean, undamaged passport with sufficient blank pages and 6+ months validity.
          </p>
          <p>
            <span className="font-semibold text-white">Data consistency:</span>{" "}
            Nationality, place of birth and past visa details must match the passport and old visa stickers.
          </p>
          <p>
            <span className="font-semibold text-white">Past visa issues:</span>{" "}
            Any refusal, overstay or immigration problem must be declared honestly wherever the form asks.
          </p>
        </>
      ),
    },
    {
      img: nepalImg,
      alt: "Nepal",
      title: "Nepal Citizens",
      subtitle: "Applicants residing in India",
      aos: "fade-left", // right -> left
      body: (
        <>
          <p>
            <span className="font-semibold text-white">Correct visa category:</span>{" "}
            Tourist / Business / Student / Work / Transit – must match the purpose of travel.
          </p>
          <p>
            <span className="font-semibold text-white">Jurisdiction confirmation:</span>{" "}
            Check if the respective embassy allows Nepalese nationals to apply from Delhi or requires application from Nepal.
          </p>
          <p>
            <span className="font-semibold text-white">Country-specific rules:</span>{" "}
            Certain destinations may conduct extra verification or take longer processing time for Nepalese nationals.
          </p>
          <p>
            <span className="font-semibold text-white">Passport requirements:</span>{" "}
            Clean, undamaged passport with correct spellings, at least 6 months validity and enough blank pages.
          </p>
          <p>
            <span className="font-semibold text-white">Past travel / refusals:</span>{" "}
            Any previous refusal, overstay or immigration issue must be declared truthfully wherever requested in the form.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-14 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Key Considerations · Appointment Submission (Delhi)
          </div>

          <h2
            data-aos="fade-right"
            data-aos-delay="80"
            className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900"
          >
            Country-wise Guidelines for Visa / Embassy Appointments
          </h2>

          <p
            data-aos="fade-left"
            data-aos-delay="120"
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-slate-500"
          >
            Review the important points below before booking an appointment for
            Indian, Bangladeshi, or Nepalese applicants residing in India.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-7 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <article
              key={card.title}
              data-aos={card.aos}
              data-aos-delay={idx * 90}
              className="group relative flex flex-col rounded-3xl border border-sky-200/40 bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 shadow-[0_18px_55px_rgba(2,6,23,0.25)] hover:shadow-[0_26px_80px_rgba(2,6,23,0.32)] transition-all duration-200 overflow-hidden"
            >
              {/* glossy overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
              {/* accent top bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 opacity-90" />

              <div className="p-6 pt-7 sm:p-7 flex flex-col h-full relative">
                {/* Flag + Title */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 blur-md bg-sky-400/35 rounded-full scale-110 group-hover:bg-sky-400/50 transition-colors" />
                    <div className="relative h-14 w-14 rounded-full overflow-hidden border border-white/25 shadow-md bg-white">
                      <img
                        src={card.img}
                        alt={card.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-sky-200 font-semibold">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-2.5 text-sm text-slate-100/90 leading-relaxed">
                  {card.body}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Note */}
        <p
          data-aos="fade-up"
          data-aos-delay="140"
          className="mt-8 text-xs text-slate-400 text-center"
        >
          These are general guidelines. Exact requirements may vary by country,
          embassy / consulate and the latest visa rules.
        </p>
      </div>
    </section>
  );
}
