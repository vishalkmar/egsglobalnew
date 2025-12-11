// KeyConsiderationsSection.tsx
import React from "react";

const indiaImg =
  "https://flagcdn.com/w320/in.png"; // replace with your own image / import
const bangladeshImg =
  "https://flagcdn.com/w320/bd.png"; // replace with your own image / import
const nepalImg =
  "https://flagcdn.com/w320/np.png"; // replace with your own image / import

export default function KeyConsiderationsSection() {
  return (
    <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Key Considerations · Appointment Submission (Delhi)
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Country-wise Guidelines for Visa / Embassy Appointments
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-gray-500">
            Review the important points below before booking an appointment for
            Indian, Bangladeshi, or Nepalese applicants residing in India.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-7 lg:grid-cols-3">
          {/* INDIA CARD */}
          <article className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white/80 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-200">
            {/* Accent top border */}
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-emerald-500 to-sky-500 opacity-80" />
            <div className="p-6 pt-7 sm:p-7 flex flex-col h-full">
              {/* Flag + Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 blur-md bg-emerald-200/60 rounded-full scale-110 group-hover:bg-emerald-300/70 transition-colors" />
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={indiaImg}
                      alt="India"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Indian Citizens
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
                    Indian Passport Holders
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-2.5 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Correct visa category:</span>{" "}
                  Tourist / Business / Student / Work / Transit – must match the
                  purpose of travel.
                </p>
                <p>
                  <span className="font-semibold">Accurate passport details:</span>{" "}
                  Name, DOB, passport number and issue/expiry dates must exactly
                  match the passport.
                </p>
                <p>
                  <span className="font-semibold">Jurisdiction check:</span> Ensure
                  Delhi VFS / Embassy is correct for your state of residence.
                </p>
                <p>
                  <span className="font-semibold">Previous travel history:</span>{" "}
                  Declare all Schengen / US / UK / other visas honestly wherever
                  the form asks.
                </p>
                <p>
                  <span className="font-semibold">Passport validity:</span> Ideally
                  6+ months beyond the travel date with enough blank pages.
                </p>
                <p>
                  <span className="font-semibold">Active contact details:</span>{" "}
                  Use a working email and Indian mobile number for OTPs, links and
                  alerts.
                </p>
                <p>
                  <span className="font-semibold">Biometrics history:</span> For
                  Schengen/other visas, check if old biometrics are valid or new
                  ones are required.
                </p>
              </div>
            </div>
          </article>

          {/* BANGLADESH CARD */}
          <article className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white/80 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-200">
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-emerald-500 to-sky-500 opacity-80" />
            <div className="p-6 pt-7 sm:p-7 flex flex-col h-full">
              {/* Flag + Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 blur-md bg-emerald-200/60 rounded-full scale-110 group-hover:bg-emerald-300/70 transition-colors" />
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={bangladeshImg}
                      alt="Bangladesh"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Bangladesh Citizens
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
                    Residing in India
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-2.5 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Valid Indian stay proof:</span>{" "}
                  Long-term visa, residence permit or FRRO registration, as
                  applicable.
                </p>
                <p>
                  <span className="font-semibold">Local address proof:</span> Rental
                  agreement, utility bill, employer letter or similar Indian address
                  proof.
                </p>
                <p>
                  <span className="font-semibold">Embassy / VFS eligibility:</span>{" "}
                  Confirm that the Delhi Embassy / VFS accepts Bangladeshi nationals
                  residing in India (some missions require applying from Bangladesh).
                </p>
                <p>
                  <span className="font-semibold">Additional scrutiny:</span> Some
                  countries may apply extra checks or longer processing time – manage
                  expectations accordingly.
                </p>
                <p>
                  <span className="font-semibold">Passport condition:</span> Clean,
                  undamaged passport with sufficient blank pages and 6+ months
                  validity.
                </p>
                <p>
                  <span className="font-semibold">Data consistency:</span>{" "}
                  Nationality, place of birth and past visa details must match the
                  passport and old visa stickers.
                </p>
                <p>
                  <span className="font-semibold">Past visa issues:</span> Any
                  refusal, overstay or immigration problem must be declared honestly
                  wherever the form asks.
                </p>
              </div>
            </div>
          </article>

          {/* NEPAL CARD */}
          <article className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white/80 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-200 lg:col-span-1">
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-emerald-500 to-sky-500 opacity-80" />
            <div className="p-6 pt-7 sm:p-7 flex flex-col h-full">
              {/* Flag + Title */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 blur-md bg-emerald-200/60 rounded-full scale-110 group-hover:bg-emerald-300/70 transition-colors" />
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={nepalImg}
                      alt="Nepal"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Nepal Citizens
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
                    Residing in India
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-2.5 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Indian residency documents:</span>{" "}
                  Where applicable, keep long-term visa / work permit / FRRO or
                  immigration registration handy as per current rules.
                </p>
                <p>
                  <span className="font-semibold">Indian address proof:</span> Rental
                  agreement, employer letter, Aadhaar-linked address (if available),
                  or utility bill to show residence in India.
                </p>
                <p>
                  <span className="font-semibold">Jurisdiction confirmation:</span>{" "}
                  Check if the respective embassy allows Nepalese nationals to apply
                  from Delhi or requires application from Nepal.
                </p>
                <p>
                  <span className="font-semibold">Country-specific rules:</span>{" "}
                  Certain destinations may conduct extra verification or take longer
                  processing time for Nepalese nationals.
                </p>
                <p>
                  <span className="font-semibold">Passport requirements:</span>{" "}
                  Clean, undamaged passport with correct spellings, at least 6 months
                  validity and enough blank pages.
                </p>
                <p>
                  <span className="font-semibold">Past travel / refusals:</span> Any
                  previous refusal, overstay or immigration issue must be declared
                  truthfully wherever requested in the form.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Small Note */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          These are general guidelines. Exact requirements may vary by country,
          embassy / consulate and the latest visa rules.
        </p>
      </div>
    </section>
  );
}
