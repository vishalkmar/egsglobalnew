"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeetGreetServices from "@/components/meetandgreet/MeetandGreetServices";

import AOS from "aos";
import "aos/dist/aos.css";

const HEADING_TEXT = "Premium Guest Handling";

interface MeetGreetFormData {
  name: string;
  email: string;
  phone: string;
  arrivalDate: string;
  submissionDate: string;
  visaType: string;
  submissionCountry: string;
}

const MeetGreetBanner: React.FC = () => {
  // ✅ LOGIN HELPERS (ONLY LOGIC)
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const redirectToLogin = () => {
    const next =
      typeof window !== "undefined"
        ? encodeURIComponent(window.location.pathname + window.location.search)
        : "";
    window.location.href = `/login?next=${next}`;
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // ✅ repeat on every scroll in/out
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

  // typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedHeading(HEADING_TEXT.slice(0, index + 1));
      index++;
      if (index >= HEADING_TEXT.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // ✅ LOGIN CHECK (ONLY ADDITION)
    const token = getToken();
    if (!token) {
      redirectToLogin();
      return;
    }

    console.log("Meet & Greet Form Data:", formData);
    alert("Meet & Greet data submitted successfully");
    // Yahan API call add kar sakte ho
  };

  return (
    <>
      <Header />

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative w-full overflow-hidden bg-black pt-[100px] pb-16 min-h-[80vh]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('/meetgreet/meetgreatbanner.jpg')",
            backgroundSize: "100% 100%",
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-slate-900/75 to-sky-900/35" />

        {/* Content container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: Text content */}
            <div
              data-aos="fade-right"
              className="flex flex-col gap-6 sm:gap-8 lg:gap-10 order-1 text-white"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
                <span className="text-white">{typedHeading}</span>
                <span className="inline-block w-[10px] ml-[2px] bg-sky-400/80 animate-pulse rounded-sm align-middle" />
              </h1>

              <p className="text-base sm:text-lg md:text-xl font-normal text-slate-100/95">
                Personalized facilitation for stress-free travel experiences
              </p>

              <p className="text-sm sm:text-base md:text-lg text-slate-100/85 font-light max-w-2xl leading-relaxed">
                Travel with comfort and confidence through our premium meet
                &amp; greet services. EGS Group arranges professional airport
                pick-up and drop-off solutions, as well as hotel-to-VFS return
                transfers for visa appointments. From arrival assistance to
                secure, punctual transport, our services are designed to make
                your travel experience seamless, stress-free, and personalized.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 px-7 py-2.5 text-sm sm:text-base font-semibold shadow-lg hover:from-sky-600 hover:via-blue-700 hover:to-purple-700 transition text-white">
                  Enquire for Meet &amp; Greet
                </button>
              </div>
            </div>

            {/* RIGHT: FORM CARD */}
            <div
              data-aos="zoom-in"
              className="order-2 lg:order-2 flex items-stretch"
            >
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white/95 backdrop-blur-[4px] text-slate-900 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-9 space-y-4"
              >
                <div className="mb-2">
                  <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-slate-500 text-center">
                    Meet &amp; Greet Request Form
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
                    Submit Meet &amp; Greet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <MeetGreetServices />
      <Footer />
    </>
  );
};

export default MeetGreetBanner;
