import React from "react";
import {
  Lock,
  FilePenLine,
  CreditCard,
  CalendarCheck2,
  Fingerprint,
  Briefcase,
  Stamp,
  BadgeCheck,
} from "lucide-react";

const topSteps = [
  { step: 1, label: "Create account & fill application" },
  { step: 2, label: "Upload documents & pay online" },
  { step: 3, label: "Visit center, submit passport & get sticker" },
];

const bottomSteps = [
  { step: "STEP 1", title: "Sign Up & Login", icon: Lock },
  { step: "STEP 2", title: "Fill Application", icon: FilePenLine },
  { step: "STEP 3", title: "Upload Documents", icon: Briefcase },
  { step: "STEP 4", title: "Pay Online", icon: CreditCard },
  { step: "STEP 5", title: "Book Appointment", icon: CalendarCheck2 },
  { step: "STEP 6", title: "Biometrics (If Required)", icon: Fingerprint },
  { step: "STEP 7", title: "Passport Submission", icon: Stamp },
  { step: "STEP 8", title: "Collect Passport (Sticker Visa)", icon: BadgeCheck },
];

const StickerVisaProcess: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
            Apply for a{" "}
            <span className="text-rose-500">Sticker Visa</span>{" "}
            in a few simple steps
          </h2>

          {/* Top horizontal steps */}
          <div className="mt-8">
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* connecting line (desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-rose-200 -translate-y-1/2" />

              {topSteps.map((item) => (
                <div
                  key={item.step}
                  className="relative flex flex-col items-center text-center gap-2 md:w-1/3"
                >
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-500 text-white text-xs sm:text-sm font-semibold shadow-md">
                    {item.step}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-800">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            <span className="text-rose-500">Automate</span>{" "}
            <span>Sticker Visa Processing</span>
          </h3>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {bottomSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center pt-10 pb-7 px-4 rounded-2xl border border-rose-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
              >
                {/* circle icon overlapping top */}
                <div className="absolute -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-white">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-blue-600 bg-white">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-500 tracking-[0.18em] mb-2">
                  {step.step}
                </p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Optional small note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Note: Appointment, biometrics and passport submission requirements vary by country/embassy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StickerVisaProcess;
