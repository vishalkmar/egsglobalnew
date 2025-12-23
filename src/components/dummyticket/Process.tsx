import { Plane, FileText, CreditCard, ThumbsUp } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Select Your Destination",
    description: "Choose your origin, destination and desired travel date.",
    icon: Plane,
  },
  {
    id: "02",
    title: "Fill Your Details",
    description:
      "Enter traveller details like name (as per passport), email, mobile and DOB.",
    icon: FileText,
  },
  {
    id: "03",
    title: "Pay Booking Amount",
    description:
      "Secure your reservation by completing the required booking payment.",
    icon: CreditCard,
  },
  {
    id: "04",
    title: "Get Your Ticket",
    description:
      "Receive your dummy ticket and be ready to submit it with your visa file.",
    icon: ThumbsUp,
  },
];

const DummyTicketProcess: React.FC = () => {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Booking Process
            </h2>
            <div className="h-[2px] w-20 bg-sky-500 mt-2" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            A simple four-step process to get your dummy ticket issued quickly
            and accurately for your visa application.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative h-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-5 sm:px-5 sm:py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-200"
              >
                {/* Step label */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-700">
                    Step {step.id}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {index === 0
                      ? "Start"
                      : index === steps.length - 1
                      ? "Done"
                      : "Next"}
                  </span>
                </div>

                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-sky-50 border border-sky-100">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-sky-700" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom progress bar accent */}
                <div className="mt-4 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-sky-500"
                    style={{
                      width: `${((index + 1) / steps.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DummyTicketProcess;
