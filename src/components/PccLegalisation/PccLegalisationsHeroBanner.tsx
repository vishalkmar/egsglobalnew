"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface PccFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  companyName: string;
  noOfDocuments: number;
}

const COUNTRIES = ["India", "Nepal", "Bangladesh"];

const PccLegalizationHero: React.FC = () => {
  const [formData, setFormData] = useState<PccFormData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    companyName: "",
    noOfDocuments: 1,
  });

  const [files, setFiles] = useState<(File | null)[]>([null]);

  /* ================= LOGIN HELPERS (ONLY LOGIC) ================= */
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const redirectToLogin = () => {
    const next =
      typeof window !== "undefined"
        ? encodeURIComponent(window.location.pathname + window.location.search)
        : "";
    window.location.href = `/login?next=${next}`;
  };
  /* ============================================================= */

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 120,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "noOfDocuments") {
      const count = Math.max(1, Number(value));
      setFormData((prev) => ({ ...prev, noOfDocuments: count }));
      setFiles(Array(count).fill(null));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (index: number, file: File | null) => {
    const updated = [...files];
    updated[index] = file;
    setFiles(updated);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    /* 🔐 LOGIN CHECK FIRST */
    const token = getToken();
    if (!token) {
      redirectToLogin();
      return;
    }

    /* ✅ SAME LOGIC AS BEFORE */
    const payload = {
      ...formData,
      attachments: files.map((f, i) => ({
        index: i + 1,
        name: f?.name,
        type: f?.type,
        size: f?.size,
      })),
    };

    console.log("PCC LEGALIZATION FORM DATA:", payload);
    console.log("FILES:", files);

    alert("Your PCC Legalization enquiry has been submitted successfully.");
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-14 md:pt-40 md:pb-20">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pcclegalisation/legalbanner.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-slate-900/75 to-cyan-900/30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-stretch">
          {/* LEFT TEXT */}
          <div data-aos="fade-right" className="flex flex-col justify-center text-white space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              PCC Legalization & Apostille
            </h1>

            <p className="text-sm sm:text-base text-slate-100/90 max-w-xl">
              EGS Group provides complete PCC legalization support for employment,
              immigration, and long-term visa requirements with PSK, MEA and
              embassy coordination.
            </p>

            <ul className="text-xs sm:text-sm space-y-1 text-slate-100/90">
              <li>• PCC for employment, immigration & long stay visas</li>
              <li>• PSK / MEA / Embassy coordination</li>
              <li>• Country-specific guidance & timelines</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div data-aos="fade-left" data-aos-delay="120" className="bg-white/95 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] px-6 py-8">
            <div className="text-center mb-6">
              <div className="h-11 w-11 mx-auto rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold flex items-center justify-center">
                EGS
              </div>
              <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                Online PCC Legalization Enquiry
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* SAME FORM – UNCHANGED */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Name (optional)" value={formData.name} onChange={handleChange} className="input" />
                <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} className="input" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="tel" name="phone" placeholder="Contact Number *" required value={formData.phone} onChange={handleChange} className="input" />
                <select name="country" required value={formData.country} onChange={handleChange} className="input">
                  <option value="">Select Country *</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="companyName" placeholder="Company Name *" required value={formData.companyName} onChange={handleChange} className="input" />
                <input type="number" min={1} name="noOfDocuments" placeholder="Number of Documents *" required value={formData.noOfDocuments} onChange={handleChange} className="input" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">Upload Documents *</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {files.map((_, i) => (
                    <input
                      key={i}
                      type="file"
                      required
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(i, e.target.files?.[0] || null)}
                      className="file-input"
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-md shadow-md transition">
                Submit PCC Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #e2e8f0;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 14px;
        }
        .file-input {
          border: 1px dashed #cbd5e1;
          padding: 10px;
          border-radius: 6px;
          font-size: 13px;
        }
      `}</style>
    </section>
  );
};

export default PccLegalizationHero;
