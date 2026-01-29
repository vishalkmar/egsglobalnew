"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
  // ✅ LOGIN HELPERS (ONLY LOGIC ADDED)
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
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex items-center justify-center">
          <div
            data-aos="fade-up"
            className="flex flex-col gap-6 sm:gap-8 lg:gap-10 text-center text-white"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-bold leading-tight md:leading-[1.15]">
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center">
              <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 px-7 py-2.5 text-sm sm:text-base font-semibold shadow-lg hover:from-sky-600 hover:via-blue-700 hover:to-purple-700 transition text-white">
                Enquire for Appointment &amp; Submission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSubmissionHero;
