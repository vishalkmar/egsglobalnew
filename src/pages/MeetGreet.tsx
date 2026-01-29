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
      <section className="relative w-full overflow-hidden bg-black  mt-[80px] pt-[100px] pb-16 min-h-[80vh]">
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="h-full flex items-center justify-center">
            {/* CENTERED: Text content */}
            <div
              data-aos="fade-up"
              className="flex flex-col gap-6 sm:gap-8 lg:gap-10 text-center text-white"
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

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center">
                <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 px-7 py-2.5 text-sm sm:text-base font-semibold shadow-lg hover:from-sky-600 hover:via-blue-700 hover:to-purple-700 transition text-white">
                  Enquire for Meet &amp; Greet
                </button>
              </div>
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
