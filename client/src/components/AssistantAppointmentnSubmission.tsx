"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

type VisaType = "work" | "business" | "tourist";

interface AppointmentFormData {
  submissionDate: string;
  country: string;
  visaType: VisaType | "";
}

const countries = [
  "North Macedonia",
  "Romania",
  "Serbia",
  "Italy",
  "Croatia",
];

const AppointmentSubmissionHero: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    submissionDate: "",
    country: "",
    visaType: "",
  });

  const [submittedData, setSubmittedData] = useState<AppointmentFormData | null>(
    null
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Appointment & Submission form data:", formData);
    setSubmittedData(formData);
    alert("Your appointment & submission request has been received. Our team will coordinate with you shortly.");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-800 via-sky-700 to-cyan-500 text-white py-14 md:pt-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-stretch">
          {/* LEFT SIDE – TEXT BLOCK */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-bold leading-tight md:leading-[1.15] space-y-1">
                <span className="block">Assistant in</span>
                <span className="block">Appointment & Submission</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-sky-50/90 max-w-xl leading-relaxed">
              EGS Group helps you with visa appointment bookings and document
              submission for European missions. Share your preferred submission
              date, country and visa type, and our team will coordinate the next
              steps with you.
            </p>

            <ul className="space-y-1 text-xs sm:text-sm text-sky-100/90">
              <li>• Appointment booking support for selected embassies</li>
              <li>• Guided document submission for work, business and tourist visas</li>
              <li>• Dedicated assistance for applicants from India, Nepal and Bangladesh</li>
            </ul>
          </div>

          {/* RIGHT SIDE – FORM CARD */}
          <div className="flex items-stretch">
            <div className="w-full bg-white text-slate-900 rounded-3xl shadow-2xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-9">
              {/* Logo / Title */}
              <div className="flex flex-col items-center mb-6">
                <div className="h-11 w-11 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  EGS
                </div>
                <p className="mt-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-slate-500 text-center">
                  Appointment &amp; Submission Form
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Submission Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Submission Date
                  </label>
                  <input
                    type="date"
                    name="submissionDate"
                    value={formData.submissionDate}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Country for Submission
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Visa Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Visa Type for Submission
                  </label>
                  <select
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                  >
                    <option value="">Select Visa Type</option>
                    <option value="work">Work Visa</option>
                    <option value="business">Business Visa</option>
                    <option value="tourist">Tourist Visa</option>
                  </select>
                </div>

                {/* Amount – hardcoded */}
                <div className="rounded-md border border-slate-200 px-3 py-3 bg-slate-50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Service Amount
                  </span>
                  <span className="text-sm font-bold text-sky-700">
                    1000
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="mt-2 w-full rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 transition-colors"
                >
                  Submit Request
                </button>
              </form>

              {/* Optional submitted data preview */}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSubmissionHero;
