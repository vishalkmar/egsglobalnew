"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader, PlusCircle, Trash2, UploadCloud } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import useUserPrefill from "@/hooks/useUserPrefill";

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

type BaseFields = {
  name: string;
  email: string;
  phone: string;
};

type UploadedDoc = {
  index: number;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
};

type Pax = {
  id: string;
  visaType: VisaType | "";
  country: string;
  days: string;
  passportFile: File | null;
};

const ACCEPTED_FILE_TYPES = "image/*,application/pdf";
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function EVisaEnquiryFormFullWidth() {
  // AOS (optional, you already use it across pages)
  useEffect(() => {
    AOS.init({
      duration: 650,
      offset: 90,
      easing: "ease-out",
      once: false,
      mirror: true,
    });
  }, []);

  // ✅ keep same API behavior
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.API_BASE_URL ||
    "http://localhost:5000/api";

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const redirectToLogin = () => {
    const next =
      typeof window !== "undefined"
        ? encodeURIComponent(window.location.pathname + window.location.search)
        : "";
    window.location.href = `/login?next=${next}`;
  };

  const [base, setBase] = useState<BaseFields>({
    name: "",
    email: "",
    phone: "",
  });

  const { user } = useUserPrefill();

  useEffect(() => {
    if (!user) return;
    setBase((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
    }));
  }, [user]);

  const [paxes, setPaxes] = useState<Pax[]>([
    { id: uid(), visaType: "", country: "", days: "", passportFile: null },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);
    setBase((prev) => ({ ...prev, [name]: value }));
  };

  const onPaxChange = (
    paxId: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);

    setPaxes((prev) =>
      prev.map((p) => (p.id === paxId ? { ...p, [name]: value } : p))
    );
  };

  const onPassportChange = (paxId: string, file: File | null) => {
    setError(null);
    setSuccess(null);

    if (file && file.size > MAX_FILE_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(2);
      setError(`Passport file is ${mb} MB. Max allowed is 5 MB.`);
      return;
    }

    setPaxes((prev) =>
      prev.map((p) => (p.id === paxId ? { ...p, passportFile: file } : p))
    );
  };

  const addPax = () => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => [...prev, { id: uid(), visaType: "", country: "", days: "", passportFile: null }]);
  };

  const removePax = (paxId: string) => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== paxId)));
  };

  const isValid = useMemo(() => {
    if (!base.name.trim()) return false;
    if (!base.email.trim()) return false;
    if (!base.phone.trim()) return false;

    for (const p of paxes) {
      if (!p.visaType) return false;
      if (!p.country) return false;
      if (!p.days.trim()) return false;
      if (!Number(p.days)) return false;
      if (!p.passportFile) return false;
    }
    return true;
  }, [base, paxes]);

  const uploadToCloudinary = async (file: File) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary not configured");
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
    const res = await fetch(endpoint, { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data?.error?.message || "Cloudinary upload failed");
    return String(data?.secure_url || data?.url || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = getToken();
    if (!token) {
      redirectToLogin();
      return;
    }

    if (!isValid) {
      setError("Please fill all required fields and upload passport for each pax.");
      return;
    }

    setSubmitting(true);
    try {
      const uploadedDocsByPax: { paxId: string; doc: UploadedDoc }[] = [];

      // Upload passport for each pax
      for (let i = 0; i < paxes.length; i++) {
        const p = paxes[i];
        const f = p.passportFile;
        if (!f) throw new Error(`Passport file is required for Pax ${i + 1}`);

        const url = await uploadToCloudinary(f);
        uploadedDocsByPax.push({
          paxId: p.id,
          doc: {
            index: i + 1,
            url,
            originalName: f.name,
            mimeType: f.type,
            size: f.size,
          },
        });
      }

      // Build payload (API SAME)
      // Your backend earlier expected ONE visaType/country/days + documents array.
      // Here we send pax-wise details + documents. Backend can store pax array; if not, you can still read first pax fields.
      const submittedAt = new Date().toISOString();
      const enquiryDate = new Date().toISOString().split("T")[0];

      const payload = {
        name: base.name,
        email: base.email,
        contact: base.phone,
        // for backward compatibility:
        visaType: paxes[0].visaType,
        country: paxes[0].country,
        noOfDays: Number(paxes[0].days),
        // new:
        paxes: paxes.map((p, idx) => {
          const doc = uploadedDocsByPax.find((x) => x.paxId === p.id)?.doc;
          return {
            paxNo: idx + 1,
            visaType: p.visaType,
            country: p.country,
            noOfDays: Number(p.days),
            passport: doc ? [doc] : [],
          };
        }),
        noOfDocuments: uploadedDocsByPax.length,
        documents: uploadedDocsByPax.map((x) => x.doc),
        submittedAt,
        enquiryDate,
        tracking: {
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
        },
      };

      const res = await fetch(`${API_BASE}/evisa/e-visa/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        redirectToLogin();
        return;
      }

      if (!res.ok) {
        throw new Error(data?.message || "Submission failed");
      }

      setSuccess("Application submitted successfully. Our team will contact you shortly.");
      setBase({ name: "", email: "", phone: "" });
      setPaxes([{ id: uid(), visaType: "", country: "", days: "", passportFile: null }]);
    } catch (err: any) {
      setError(err?.message || "Submission failed. Please try again.");
      if (/401|unauthorized|token/i.test(String(err?.message || ""))) {
        localStorage.removeItem("token");
        redirectToLogin();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" data-aos="fade-up">
        {/* Header */}
       

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Base fields (ONE TIME) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                <Input
                  type="text"
                  name="name"
                  value={base.name}
                  onChange={onBaseChange}
                  placeholder="Full name"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  value={base.email}
                  onChange={onBaseChange}
                  placeholder="you@example.com"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                <Input
                  type="tel"
                  name="phone"
                  value={base.phone}
                  onChange={onBaseChange}
                  placeholder="+91 9876543210"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pax blocks */}
          <div className="space-y-5">
            {paxes.map((p, idx) => (
              <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-teal-600/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-teal-800">{idx + 1}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Pax Details</h3>
                  </div>

                  <Button
                    type="button"
                    onClick={() => removePax(p.id)}
                    disabled={paxes.length <= 1}
                    variant="ghost"
                    className="rounded-xl text-slate-700 hover:text-red-600 hover:bg-red-50 disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Visa Type *</label>
                    <select
                      name="visaType"
                      value={p.visaType}
                      onChange={(e) => onPaxChange(p.id, e)}
                      className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Tourist">Tourist</option>
                      <option value="Work">Work</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Country *</label>
                    <select
                      name="country"
                      value={p.country}
                      onChange={(e) => onPaxChange(p.id, e)}
                      className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      required
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-white text-slate-900">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">No. of Days *</label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      name="days"
                      value={p.days}
                      onChange={(e) =>
                        onPaxChange(p.id, {
                          ...e,
                          target: {
                            ...e.target,
                            name: "days",
                            value: e.target.value.replace(/[^\d]/g, ""),
                          },
                        } as any)
                      }
                      placeholder="e.g. 7"
                      className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Passport (Image/PDF) *
                    </label>

                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 hover:border-teal-600/50 transition">
                      <label className="flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer">
                        <div className="h-11 w-11 rounded-xl bg-teal-600/10 flex items-center justify-center">
                          <UploadCloud className="h-5 w-5 text-teal-700" />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">
                            {p.passportFile ? p.passportFile.name : "Upload passport copy"}
                          </p>
                          <p className="text-xs text-slate-500">
                            JPG/PNG/PDF • Max 5 MB
                          </p>
                        </div>

                        <input
                          type="file"
                          accept={ACCEPTED_FILE_TYPES}
                          onChange={(e) => onPassportChange(p.id, e.target.files?.[0] ?? null)}
                          className="hidden"
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-slate-50">
         

          <Button
            type="button"
            onClick={addPax}
            className="rounded-xl bg-teal-700 hover:bg-teal-800 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Pax
          </Button>
        </div>
        
          <Button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
