"use client";

import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type VisaType = "Tourist" | "Work" | "Business";

const COUNTRIES = [
  "Dubai",
  "UAE",
  "Oman",
  "Singapore",
  "Vietnam",
  "Thailand",
  "Russia",
  "Azerbaijan",
  "Bahrain",
  "Armenia",
  "Egypt",
  "Malaysia",
  "Indonesia",
  "Sri Lanka",
  "Turkey",
  "Qatar",
  "Saudi Arabia",
  "Kuwait",
  "Jordan",
  "Japan",
  "South Korea",
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  visaType: VisaType | "";
  country: string;
  days: string;
};

const ACCEPTED_FILE_TYPES = "image/*,application/pdf";

export default function VisaStickerCard() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    visaType: "",
    country: "",
    days: "",
  });

  const [attachments, setAttachments] = useState<(File | null)[]>([null]);

  useEffect(() => {
    AOS.init({
      duration: 750,
      once: false,
      offset: 120,
      easing: "ease-out",
      mirror: true,
    });
  }, []);

  const isFormValid = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!form.email.trim()) return false;
    if (!form.phone.trim()) return false;
    if (!form.visaType) return false;
    if (!form.country) return false;
    if (!form.days.trim()) return false;
    if (attachments.length === 0) return false;
    if (attachments.some((f) => !f)) return false;
    return true;
  }, [form, attachments]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleFileChange = (index: number, file: File | null) => {
    setAttachments((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const addAttachmentField = () => setAttachments((prev) => [...prev, null]);

  const removeAttachmentField = (index: number) => {
    setAttachments((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next.length ? next : [null];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      days: Number(form.days),
      attachments: attachments
        .filter(Boolean)
        .map((f) => ({
          name: (f as File).name,
          type: (f as File).type,
          size: (f as File).size,
        })),
    };

    console.log("Visa Sticker Form Payload:", payload);
    console.log("Raw Files:", attachments);

    alert("Submitted! Check console.");
  };

  return (
    <section
      className="w-full bg-white px-4 py-10 mt-[70px]"
      style={{
        background:
          "radial-gradient(900px 500px at 18% 25%, rgba(99,102,241,0.45) 0%, rgba(15,23,42,0) 60%)," +
          "radial-gradient(700px 450px at 85% 30%, rgba(56,189,248,0.30) 0%, rgba(15,23,42,0) 55%)," +
          "radial-gradient(800px 520px at 55% 85%, rgba(244,114,182,0.18) 0%, rgba(15,23,42,0) 60%)," +
          "linear-gradient(135deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 35%, rgba(2,6,23,1) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Sticker Wrapper */}
        <div
         
          className="relative overflow-hidden rounded-[28px] shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent" />

          {/* Decorative glows */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute top-16 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
            {/* LEFT */}
            <div data-aos="fade-right" className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs sm:text-sm font-semibold">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                EGS Group Visa Desk
              </div>

              <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Apply for Sticker Visa
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-100 leading-relaxed max-w-xl">
                A Sticker Visa is an embassy-issued visa stamped on your passport
                after approval. It requires proper documentation, appointment
                scheduling, and passport submission.
              </p>

              <p className="mt-3 text-sm sm:text-base text-slate-100 leading-relaxed max-w-xl">
                With EGS, you upload documents once and we handle verification,
                formatting, embassy submission, and follow-ups as per country
                rules—ensuring a smooth, error-free process with faster
                turnaround.
              </p>

              {/* Stats: subtle stagger */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  data-aos="fade-up"
                  data-aos-delay="80"
                  className="rounded-2xl border border-white/15 bg-white/10 p-4"
                >
                  <p className="text-xs text-slate-200">Processing</p>
                  <p className="text-base font-semibold">2–7 Working Days</p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="140"
                  className="rounded-2xl border border-white/15 bg-white/10 p-4"
                >
                  <p className="text-xs text-slate-200">Document Check</p>
                  <p className="text-base font-semibold">Accuracy First</p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 sm:col-span-2"
                >
                  <p className="text-xs text-slate-200">Support</p>
                  <p className="text-base font-semibold">Dedicated Team</p>
                </div>
              </div>

              <div className="mt-6 text-xs text-slate-200/90">
                Supported files: Images (all formats) + PDF. All fields are
                mandatory.
              </div>
            </div>

            {/* RIGHT */}
            <div
              data-aos="fade-left"
              className="bg-white/95 backdrop-blur rounded-2xl border border-white/20 shadow-xl p-5 md:p-6"
            >
              <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                Quick Application Form
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Fill details. On submit, data prints in console.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      type="text"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="Full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      type="email"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      type="tel"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="Phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Visa Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={form.visaType}
                      onChange={(e) => updateField("visaType", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-400"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Tourist">Tourist</option>
                      <option value="Work">Work</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Select Country <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-400"
                      required
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      No. of Days <span className="text-rose-500">*</span>
                    </label>
                    <input
                      value={form.days}
                      onChange={(e) =>
                        updateField("days", e.target.value.replace(/[^\d]/g, ""))
                      }
                      type="text"
                      inputMode="numeric"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="e.g. 7"
                      required
                    />
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium text-slate-700">
                      Attachments <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={addAttachmentField}
                      className="text-sm font-medium text-rose-600 hover:text-rose-700"
                    >
                      Add another document
                    </button>
                  </div>

                  <div className="mt-2 space-y-3">
                    {attachments.map((file, idx) => (
                      <div
                        key={idx}
                        data-aos="fade-up"
                        data-aos-delay={Math.min(80 + idx * 60, 360)}
                        className="rounded-xl border border-slate-200 bg-white p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-full">
                            <p className="text-xs text-slate-500 mb-2">
                              Document {idx + 1}{" "}
                              <span className="text-rose-500">*</span>
                            </p>
                            <input
                              type="file"
                              accept={ACCEPTED_FILE_TYPES}
                              onChange={(e) =>
                                handleFileChange(idx, e.target.files?.[0] ?? null)
                              }
                              className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
                              required
                            />
                            {file ? (
                              <p className="mt-2 text-xs text-slate-600">
                                Selected:{" "}
                                <span className="font-medium">{file.name}</span>
                              </p>
                            ) : (
                              <p className="mt-2 text-xs text-slate-500">
                                No file selected
                              </p>
                            )}
                          </div>

                          {attachments.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => removeAttachmentField(idx)}
                              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                            >
                              Remove
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Supported: images + PDF. Each attachment field is mandatory.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full rounded-xl px-4 py-3 text-sm md:text-base font-semibold shadow-md transition
                    ${
                      isFormValid
                        ? "bg-rose-500 text-white hover:opacity-95 shadow-rose-400/40"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
