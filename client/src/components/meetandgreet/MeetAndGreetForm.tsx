import React, { useState } from "react";

export default function MeetAndGreetForm() {
  const [formData, setFormData] = useState({
    arrivalDate: "",
    submissionDate: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meet & Greet Form Data:", formData);
    alert("data submitted sucessfully")
    // Yahan aap apni API call add kar sakte ho
    // await fetch("/api/meet-greet", { method: "POST", body: JSON.stringify(formData) })
  };

  return (
    <section className=" py-10 px-4">
      <div
        className="
          max-w-4xl mx-auto
         
          border border-lime-400/40
          rounded-2xl shadow-xl
          px-6 py-8
          flex flex-col md:flex-row gap-8
        "
      >
        {/* LEFT TEXT */}
        <div className="md:w-5/12 flex flex-col justify-center">
          <h2 className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent text-xl md:text-4xl font-semibold mb-2">
            Meet &amp; Greet Details
          </h2>
          <p className="text-sm md:text-base  leading-relaxed">
            Share your arrival and submission details so we can arrange a smooth
            meet and greet at the airport. Our team will align your pickup,
            welcome assistance, and coordination as per the information you
            submit here.
          </p>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="md:w-7/12 space-y-4"
        >
          {/* Arrival Date */}
          <div className="flex flex-col">
            <label
              htmlFor="arrivalDate"
              className="text-xs font-medium  mb-1"
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
              className="
                w-full rounded-xl border border-slate-700
                bg-slate-900/70 text-slate-100
                px-3 py-2 text-sm
                outline-none
                focus:border-lime-400 focus:ring-2 focus:ring-lime-400/50
              "
            />
          </div>

          {/* Submission Date */}
          <div className="flex flex-col">
            <label
              htmlFor="submissionDate"
              className="text-xs font-medium mb-1"
            >
              Submission Date
            </label>
            <input
              id="submissionDate"
              name="submissionDate"
              type="date"
              required
              value={formData.submissionDate}
              onChange={handleChange}
              className="
                w-full rounded-xl border border-slate-700
                bg-slate-900/70 text-slate-100
                px-3 py-2 text-sm
                outline-none
                focus:border-lime-400 focus:ring-2 focus:ring-lime-400/50
              "
            />
          </div>

          {/* Country for Submission */}
          <div className="flex flex-col">
            <label
              htmlFor="country"
              className="text-xs font-medium  mb-1"
            >
              Country for Submission
            </label>
            <input
              id="country"
              name="country"
              type="text"
              placeholder="e.g. Oman, UAE, Jordan"
              required
              value={formData.country}
              onChange={handleChange}
              className="
                w-full rounded-xl border border-slate-700
                bg-slate-900/70 text-slate-100 placeholder:text-slate-500
                px-3 py-2 text-sm
                outline-none
                focus:border-lime-400 focus:ring-2 focus:ring-lime-400/50
                placeholder:text-white
              "
            />
          </div>

          {/* Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="
                inline-flex items-center justify-center
                rounded-full
                bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 
                text-slate-950 font-semibold text-sm
                px-6 py-2.5
                shadow-lg shadow-lime-500/30
                hover:shadow-xl hover:translate-y-[-1px]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400
                transition
              "
            >
              Submit Meet &amp; Greet
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
