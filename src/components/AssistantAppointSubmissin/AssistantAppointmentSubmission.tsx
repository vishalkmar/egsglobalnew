"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type VisaType = "work" | "business" | "tourist";

interface MeetGreetFormData {
  name: string;
  email: string;
  phone: string;
  arrivalDate: string;
  submissionDate: string;
  visaType: string;
  submissionCountry: string;
}

const countries = ["North Macedonia", "Romania", "Serbia", "Italy", "Croatia"];

const AppointmentSubmissionHero: React.FC = () => {

    useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,   // ✅ repeat on every scroll in/out
      offset: 80,
      easing: "ease-in-out",
     
    });
  }, []);
  

   const [typedHeading, setTypedHeading] = useState("");
   const [formData, setFormData] = useState<MeetGreetFormData>({
     name: "",
     email: "",
     phone: "",
     arrivalDate: "",
     submissionDate: "",
     visaType: "",
     submissionCountry: "",
   });
 
   
   const handleChange = (
     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
   };
 
   const handleSubmit = (e: FormEvent) => {
     e.preventDefault();
     console.log("Assistance in Appointment & Submission Form Data:", formData);
     alert(" Assistance in Appointment & Submissiondata submitted successfully");
     // Yahan API call add kar sakte ho
   };
 

  return (
    <section className="relative w-full overflow-hidden bg-black py-14 md:pt-40 md:pb-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          // change this path to your actual appointment hero image
          backgroundImage: "url('/submission.jpg')",
        }}
      />

      {/* Overlay gradient (same vibe family) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-slate-900/70 to-sky-900/35" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-stretch">
          {/* LEFT SIDE – TEXT BLOCK */}
          <div data-aos="fade-right" className="flex flex-col justify-center space-y-6 md:space-y-8 text-white">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-bold leading-tight md:leading-[1.15] space-y-1">
                <span className="block">Assistance in</span>
                <span className="block">Appointment &amp; Submission</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-100/90 max-w-xl leading-relaxed">
              EGS Group helps you with visa appointment bookings and document
              submission for European Countries. Share your preferred submission
              date, country and visa type, and our team will coordinate the next
              steps with you.
            </p>

            <ul className="space-y-1 text-xs sm:text-sm text-slate-100/90">
              <li>• Appointment booking support for selected embassies</li>
              <li>
                • Guided document submission for work, business and tourist visas
              </li>
              <li>
                • Dedicated assistance for applicants from India, Nepal and
                Bangladesh
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE – FORM CARD */}
             {/* RIGHT: FORM CARD */}
            <div data-aos="fade-left" className="order-2 lg:order-2 flex items-stretch">
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white/95 backdrop-blur-[4px] text-slate-900 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-9 space-y-4"
              >
                <div className="mb-2">
                  <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-slate-500 text-center">
                  Appointment booking Request Form
                  </p>
                </div>

                {/* Row 1: Name / Email / Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="text-xs font-medium text-slate-600 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium text-slate-600 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="text-xs font-medium text-slate-600 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
                    />
                  </div>
                </div>

                {/* Row 2: Arrival / Submission Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label
                      htmlFor="arrivalDate"
                      className="text-xs font-medium text-slate-600 mb-1"
                    >
                      Date of Arrival
                    </label>
                    <input
                      id="arrivalDate"
                      name="arrivalDate"
                      type="date"
                      required
                      value={formData.arrivalDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="submissionDate"
                      className="text-xs font-medium text-slate-600 mb-1"
                    >
                      Submission Date (Visa / VFS)
                    </label>
                    <input
                      id="submissionDate"
                      name="submissionDate"
                      type="date"
                      required
                      value={formData.submissionDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
                    />
                  </div>
                </div>

                {/* Row 3: Visa Type / Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label
                      htmlFor="visaType"
                      className="text-xs font-medium text-slate-600 mb-1"
                    >
                      Visa Type
                    </label>
                    <select
                      id="visaType"
                      name="visaType"
                      required
                      value={formData.visaType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
                    >
                      <option value="">Select Visa Type</option>
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Business Visa">Business Visa</option>
                      <option value="Work Visa">Work Visa</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="submissionCountry"
                      className="text-xs font-medium text-slate-600 mb-1"
                    >
                      Country for Submission
                    </label>
                    <select
                      id="submissionCountry"
                      name="submissionCountry"
                      required
                      value={formData.submissionCountry}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
                    >
                      <option value="">Select Country</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="North Macedonia">North Macedonia</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Russia">Russia</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Belarus">Belarus</option>
                    </select>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 text-white font-semibold text-sm px-6 py-2.5 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition"
                  >
                  Assistance in
Appointment & Submission
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSubmissionHero;
