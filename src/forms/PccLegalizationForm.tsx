"use client";

import React, { useMemo, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Upload,
  AlertCircle,
  CheckCircle2,
  Loader,
  PlusCircle,
  Trash2,
  UserRound,
} from "lucide-react";
import useUserPrefill from "@/hooks/useUserPrefill";

interface BaseFields {
  name: string;
  email: string;
  phone: string;
}

type PaxFields = {
  id: string;
  country: string;
  noOfDocuments: number;
  files: (File | null)[];
};

type UploadedDoc = {
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
};

const COUNTRIES = ["India", "Nepal", "Bangladesh", "Sri Lanka", "Pakistan", "Afghanistan", "Bhutan"];

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_DOC_TYPES = "application/pdf,image/jpeg,image/png,image/jpg,image/*";

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function PccLegalizationForm() {
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
  const [base, setBase] = useState<BaseFields>({
    name: "",
    email: "",
    phone: "",
  });

  // Start with 1 pax
  const [paxes, setPaxes] = useState<PaxFields[]>([
    { id: uid(), country: "", noOfDocuments: 1, files: [null] },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // KEEP SAME API
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleBaseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);
    setBase((prev) => ({ ...prev, [name]: value }));
  };

  const validateFileSize = (file: File, label: string) => {
    if (file.size > MAX_FILE_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(2);
      throw new Error(`${label} is ${mb} MB. Max allowed is 5 MB.`);
    }
  };

  const syncFilesCount = (paxId: string, count: number) => {
    setPaxes((prev) =>
      prev.map((p) => {
        if (p.id !== paxId) return p;
        const nextFiles = [...p.files];
        if (nextFiles.length < count) while (nextFiles.length < count) nextFiles.push(null);
        if (nextFiles.length > count) nextFiles.length = count;
        return { ...p, files: nextFiles };
      })
    );
  };

  const handlePaxChange = (
    paxId: string,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);

    if (name === "noOfDocuments") {
      const n = Math.min(Math.max(Number(value || "1"), 1), 20);
      setPaxes((prev) =>
        prev.map((p) => (p.id === paxId ? { ...p, noOfDocuments: n } : p))
      );
      syncFilesCount(paxId, n);
      return;
    }

    setPaxes((prev) =>
      prev.map((p) => (p.id === paxId ? { ...p, [name]: value } : p))
    );
  };

  const handleFileChange = (paxId: string, index: number, file: File | null) => {
    setError(null);
    setSuccess(null);

    setPaxes((prev) =>
      prev.map((p) => {
        if (p.id !== paxId) return p;
        const nextFiles = [...p.files];

        if (!file) {
          nextFiles[index] = null;
          return { ...p, files: nextFiles };
        }

        try {
          validateFileSize(file, `Pax file ${index + 1}`);
        } catch (e: any) {
          setError(e?.message || "File too large. Max 5 MB.");
          nextFiles[index] = null;
          return { ...p, files: nextFiles };
        }

        nextFiles[index] = file;
        return { ...p, files: nextFiles };
      })
    );
  };

  const addPax = () => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => [...prev, { id: uid(), country: "", noOfDocuments: 1, files: [null] }]);
  };

  const removePax = (paxId: string) => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== paxId)));
  };

  const uploadToCloudinary = async (file: File): Promise<UploadedDoc> => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary not configured");
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || "Upload failed");

    return {
      url: data.secure_url,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
    };
  };

  const isValid = useMemo(() => {
    if (!base.email.trim()) return false;
    if (!base.phone.trim()) return false;

    for (const p of paxes) {
      if (!p.country) return false;
      if (!p.noOfDocuments || p.noOfDocuments < 1) return false;
      if (p.files.length !== p.noOfDocuments) return false;
      if (p.files.some((f) => !f)) return false;
    }

    return true;
  }, [base, paxes]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = getToken();
    if (!token) {
      setError("Please login to submit this form");
      return;
    }

    if (!isValid) {
      setError("Please fill all required fields and upload all documents");
      return;
    }

    setSubmitting(true);
    try {
      // Upload files for each pax
      const paxPayload = [];

      for (let pIndex = 0; pIndex < paxes.length; pIndex++) {
        const p = paxes[pIndex];

        const uploadedDocs = await Promise.all(
          p.files.map(async (file, index) => {
            if (!file) throw new Error(`Pax ${pIndex + 1} Document ${index + 1} is required`);
            const docData = await uploadToCloudinary(file);
            return { index: index + 1, ...docData };
          })
        );

        paxPayload.push({
          paxNo: pIndex + 1,
          country: p.country,
          noOfDocuments: p.noOfDocuments,
          documents: uploadedDocs,
        });
      }

      // KEEP SAME API ROUTE (ONLY PAYLOAD UPDATED)
      const payload = {
        name: base.name,
        email: base.email,
        phone: base.phone,
        paxes: paxPayload,
        submittedAt: new Date().toISOString(),
        tracking: {
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      };

      const res = await fetch(`${API_BASE}/pcc/pcc-legalization/enquiry`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Submission failed");

      setSuccess("Your enquiry has been submitted successfully. We will contact you shortly.");
      setBase({ name: "", email: "", phone: "" });
      setPaxes([{ id: uid(), country: "", noOfDocuments: 1, files: [null] }]);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full rounded-2xl border border-emerald-900/10 bg-gradient-to-b from-white to-emerald-50/40 shadow-sm">
        {/* Header strip */}
       

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

          {/* Base details (ONE TIME) */}
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name (Optional)</label>
                <Input
                  type="text"
                  name="name"
                  value={base.name}
                  onChange={handleBaseChange}
                  placeholder="Your name"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  value={base.email}
                  onChange={handleBaseChange}
                  placeholder="your@email.com"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                <Input
                  type="tel"
                  name="phone"
                  value={base.phone}
                  onChange={handleBaseChange}
                  placeholder="+91 9876543210"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pax blocks */}
          <div className="space-y-5">
            {paxes.map((p, paxIdx) => (
              <div key={p.id} className="rounded-2xl border border-emerald-900/10 bg-white p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-emerald-900/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-emerald-900">{paxIdx + 1}</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Country *</label>
                    <select
                      name="country"
                      value={p.country}
                      onChange={(e) => handlePaxChange(p.id, e)}
                      className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      required
                    >
                      <option value="">Select Country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Documents *
                    </label>
                    <Input
                      type="number"
                      name="noOfDocuments"
                      value={String(p.noOfDocuments)}
                      onChange={(e) => handlePaxChange(p.id, e)}
                      min="1"
                      max="20"
                      className="h-11 bg-white border-slate-300 text-slate-900 rounded-xl"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">Max 20 docs. Each file max 5 MB.</p>
                  </div>
                </div>

                {/* Uploads (2 per row) */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-800">Upload Documents</p>
                    <p className="text-xs text-slate-500">Accepted: PDF, JPG, PNG</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {p.files.map((file, idx) => (
                      <div
                        key={`${p.id}-${idx}`}
                        className="relative rounded-xl border border-dashed border-emerald-900/20 bg-emerald-50/40 hover:bg-emerald-50/70 transition"
                      >
                        <label className="flex items-center gap-2 cursor-pointer px-4 py-4">
                          <div className="h-9 w-9 rounded-lg bg-white border border-emerald-900/10 flex items-center justify-center">
                            <Upload className="w-4 h-4 text-emerald-900" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {file ? file.name : `Upload Document ${idx + 1}`}
                            </p>
                            <p className="text-xs text-slate-500">Click to choose file</p>
                          </div>

                          <input
                            type="file"
                            accept={ACCEPTED_DOC_TYPES}
                            onChange={(e) =>
                              handleFileChange(p.id, idx, e.target.files?.[0] || null)
                            }
                            className="hidden"
                          />
                        </label>

                        {file && (
                          <button
                            type="button"
                            onClick={() => handleFileChange(p.id, idx, null)}
                            className="absolute right-3 top-3 text-slate-500 hover:text-red-600"
                            aria-label="Remove file"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

 <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-emerald-900/10 bg-white/70 rounded-t-2xl">
         

          <Button
            type="button"
            onClick={addPax}
            className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add More Pax
          </Button>
        </div>
        
          <Button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Enquiry"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
