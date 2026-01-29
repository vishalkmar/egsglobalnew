"use client";

import React, { useEffect, useMemo, useState } from "react";
import useUserPrefill from "@/hooks/useUserPrefill";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  arrivalDate: string;
  submissionDate: string;
  visaType: string;
  submissionCountry: string;
};

const COUNTRY_OPTIONS = [
  "Bulgaria",
  "North Macedonia",
  "Croatia",
  "Serbia",
  "Russia",
  "Montenegro",
  "Belarus",
] as const;

export default function AppointmentSubmissionFormFullWidth() {
  // optional, since you already use AOS in project
  useEffect(() => {
    AOS.init({
      duration: 650,
      offset: 90,
      easing: "ease-out",
      once: false,
      mirror: true,
    });
  }, []);

  // ✅ login helpers (same pattern)
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const redirectToLogin = () => {
    const next =
      typeof window !== "undefined"
        ? encodeURIComponent(window.location.pathname + window.location.search)
        : "";
    window.location.href = `/login?next=${next}`;
  };

  // ✅ API base (keep your env approach)
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.API_BASE_URL ||
    "http://localhost:5000/api";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    arrivalDate: "",
    submissionDate: "",
    visaType: "",
    submissionCountry: "",
  });

  const { user } = useUserPrefill();

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
    }));
  }, [user]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isValid = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!form.email.trim()) return false;
    if (!form.phone.trim()) return false;
    if (!form.arrivalDate) return false;
    if (!form.submissionDate) return false;
    if (!form.visaType) return false;
    if (!form.submissionCountry) return false;
    return true;
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);
    setForm((prev) => ({ ...prev, [name]: value }));
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
      setError("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        submittedAt: new Date().toISOString(),
        enquiryDate: new Date().toISOString().slice(0, 10),
        tracking: {
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
        },
      };

      // ✅ Put your working endpoint here (I kept a clean default)
      const res = await fetch(`${API_BASE}/appointment-submission/enquiry`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        localStorage.removeItem("token");
        redirectToLogin();
        return;
      }

      if (!res.ok) {
        throw new Error(data?.message || "Submission failed");
      }

      setSuccess("Your request has been submitted successfully. Our team will contact you shortly.");
      setForm({
        name: "",
        email: "",
        phone: "",
        arrivalDate: "",
        submissionDate: "",
        visaType: "",
        submissionCountry: "",
      });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full" data-aos="fade-up">
      <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
     
       

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

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name *
              </label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email *
              </label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone *
              </label>
              <Input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date of Arrival *
              </label>
              <Input
                type="date"
                name="arrivalDate"
                value={form.arrivalDate}
                onChange={handleChange}
                className="h-11 bg-white border-slate-300 text-slate-900 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Submission Date (Visa / VFS) *
              </label>
              <Input
                type="date"
                name="submissionDate"
                value={form.submissionDate}
                onChange={handleChange}
                className="h-11 bg-white border-slate-300 text-slate-900 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Visa Type *
              </label>
              <select
                name="visaType"
                value={form.visaType}
                onChange={handleChange}
                className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              >
                <option value="">Select Visa Type</option>
                <option value="Tourist Visa" className="bg-white text-slate-900">
                  Tourist Visa
                </option>
                <option value="Business Visa" className="bg-white text-slate-900">
                  Business Visa
                </option>
                <option value="Work Visa" className="bg-white text-slate-900">
                  Work Visa
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Country for Submission *
              </label>
              <select
                name="submissionCountry"
                value={form.submissionCountry}
                onChange={handleChange}
                className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              >
                <option value="">Select Country</option>
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-white text-slate-900">
                    {c}
                  </option>
                ))}
              </select>
            </div>
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
              "Submit Request"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
