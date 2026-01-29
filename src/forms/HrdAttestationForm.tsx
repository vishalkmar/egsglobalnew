"use client";

import React, { useMemo, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Upload,
  AlertCircle,
  CheckCircle2,
  Loader,
  PlusCircle,
  Trash2,
  UserRound,
  Minus,
} from "lucide-react";
import useUserPrefill from "@/hooks/useUserPrefill";

/** --------- CONFIG --------- */
const DOCUMENT_OPTIONS: Record<string, string[]> = {
  "Commercial Documents": [
    "Hiring documents",
    "Company invoices",
    "GST documents",
    "Income tax return",
    "Company register",
    "Certificates of Origin",
    "Power of attorney",
  ],
  "Personal Documents": [
    "Marriage certificates",
    "Single status certificate",
    "Birth certificates",
    "Divorce certificates",
    "Aadhar card",
    "Death certificates",
    "Police clearance certificate",
  ],
  "Educational Documents": [
    "High school certificates",
    "Degree certificates",
    "Diploma certificates",
    "Report cards",
    "Marksheet verification",
    "Police clearance certificate",
  ],
};

const STATES = [
  "",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_DOC_TYPES = "application/pdf,image/jpeg,image/png,image/jpg,image/*";

type UploadedDoc = {
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
};

type BaseFields = {
  fullName: string;
  email: string;
  mobile: string;
};

type DocQtyMap = Record<string, number>;

type PaxFields = {
  id: string;
  state: string;
  district: string;
  message: string;
  docType: string; // category
  docQty: DocQtyMap; // per document quantity
  files: (File | null)[];
};

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const calcDocCount = (docQty: DocQtyMap) =>
  Object.values(docQty).reduce((sum, v) => sum + (Number(v) || 0), 0);

const buildSelectedDocsArray = (docQty: DocQtyMap) => {
  // send list with duplicates if qty > 1: ["GST documents","GST documents","Hiring documents"]
  const list: string[] = [];
  Object.entries(docQty).forEach(([doc, qty]) => {
    const q = Number(qty) || 0;
    for (let i = 0; i < q; i++) list.push(doc);
  });
  return list;
};

export default function HrdAttestationForm() {
  const { user } = useUserPrefill();
  const [base, setBase] = useState<BaseFields>({
    fullName: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (!user) return;
    setBase((prev) => ({
      ...prev,
      fullName: prev.fullName || user.name || "",
      email: prev.email || user.email || "",
      mobile: prev.mobile || user.phone || "",
    }));
  }, [user]);

  // Start with 1 pax
  const [paxes, setPaxes] = useState<PaxFields[]>([
    {
      id: uid(),
      state: "",
      district: "",
      message: "",
      docType: "",
      docQty: {},
      files: [],
    },
  ]);

  const [filesUploading] = useState(false); // kept if you later add per-file progress
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const validateFileSize = (file: File, label: string) => {
    if (file.size > MAX_FILE_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(2);
      throw new Error(`${label} is ${mb}MB. Max 5MB.`);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<UploadedDoc> => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary not configured");
    }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
    const res = await fetch(endpoint, { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || "Cloud upload failed");

    return {
      url: String(data?.secure_url || data?.url || ""),
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
    };
  };

  /** --------- BASE HANDLERS --------- */
  const handleBaseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);
    setBase((prev) => ({ ...prev, [name]: value }));
  };

  /** --------- PAX HELPERS --------- */
  const syncFilesCount = (paxId: string, count: number) => {
    setPaxes((prev) =>
      prev.map((p) => {
        if (p.id !== paxId) return p;
        const next = [...p.files];
        if (next.length < count) while (next.length < count) next.push(null);
        if (next.length > count) next.length = count;
        return { ...p, files: next };
      })
    );
  };

  const handlePaxFieldChange = (
    paxId: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);

    // docType change => reset selections + files
    if (name === "docType") {
      setPaxes((prev) =>
        prev.map((p) =>
          p.id === paxId
            ? { ...p, docType: value, docQty: {}, files: [] }
            : p
        )
      );
      return;
    }

    setPaxes((prev) =>
      prev.map((p) => (p.id === paxId ? { ...p, [name]: value } : p))
    );
  };

  const setDocQty = (paxId: string, doc: string, nextQty: number) => {
    const qty = Math.max(0, Math.min(nextQty, 20)); // per doc cap
    setPaxes((prev) =>
      prev.map((p) => {
        if (p.id !== paxId) return p;

        const nextMap: DocQtyMap = { ...p.docQty };
        if (qty === 0) delete nextMap[doc];
        else nextMap[doc] = qty;

        const total = calcDocCount(nextMap);
        // Keep files length in sync with total docs
        const nextFiles = [...p.files];
        if (nextFiles.length < total) while (nextFiles.length < total) nextFiles.push(null);
        if (nextFiles.length > total) nextFiles.length = total;

        return { ...p, docQty: nextMap, files: nextFiles };
      })
    );
  };

  const incDoc = (paxId: string, doc: string) => {
    const pax = paxes.find((x) => x.id === paxId);
    const current = pax?.docQty?.[doc] || 0;
    setDocQty(paxId, doc, current + 1);
  };

  const decDoc = (paxId: string, doc: string) => {
    const pax = paxes.find((x) => x.id === paxId);
    const current = pax?.docQty?.[doc] || 0;
    setDocQty(paxId, doc, current - 1);
  };

  const handleFileChange = (paxId: string, index: number, file: File | null) => {
    setError(null);
    setSuccess(null);

    setPaxes((prev) =>
      prev.map((p) => {
        if (p.id !== paxId) return p;
        const next = [...p.files];

        if (!file) {
          next[index] = null;
          return { ...p, files: next };
        }

        try {
          validateFileSize(file, `File ${index + 1}`);
        } catch (e: any) {
          setError(e?.message || "File too large. Max 5MB.");
          next[index] = null;
          return { ...p, files: next };
        }

        next[index] = file;
        return { ...p, files: next };
      })
    );
  };

  const addPax = () => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => [
      ...prev,
      {
        id: uid(),
        state: "",
        district: "",
        message: "",
        docType: "",
        docQty: {},
        files: [],
      },
    ]);
  };

  const removePax = (paxId: string) => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== paxId)));
  };

  /** --------- VALIDATION --------- */
  const isValid = useMemo(() => {
    if (!base.fullName.trim()) return false;
    if (!base.email.trim()) return false;
    if (!base.mobile.trim()) return false;

    for (const p of paxes) {
      if (!p.state) return false;
      if (!p.district.trim()) return false;
      if (!p.docType) return false;

      const total = calcDocCount(p.docQty);
      if (!total || total < 1) return false;

      if (p.files.length !== total) return false;
      if (p.files.some((f) => !f)) return false;
    }

    return true;
  }, [base, paxes]);

  /** --------- SUBMIT --------- */
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
      const paxPayload: any[] = [];

      for (let pIndex = 0; pIndex < paxes.length; pIndex++) {
        const p = paxes[pIndex];
        const totalDocs = calcDocCount(p.docQty);

        // validate & upload
        p.files.forEach((f, idx) => {
          if (f) validateFileSize(f, `Pax ${pIndex + 1} - File ${idx + 1}`);
        });

        const uploadedDocs: any[] = [];
        for (let i = 0; i < p.files.length; i++) {
          const f = p.files[i];
          if (!f) continue;
          const docData = await uploadToCloudinary(f);
          uploadedDocs.push({ index: i + 1, ...docData });
        }

        paxPayload.push({
          paxNo: pIndex + 1,
          state: p.state || "",
          district: p.district || "",
          docType: p.docType,
          // this replaces your old checkbox array with “qty support”
          selectedDocs: buildSelectedDocsArray(p.docQty),
          docCount: totalDocs,
          message: p.message || "",
          documents: uploadedDocs,
        });
      }

      const payload = {
        // base info only once
        fullName: base.fullName,
        email: base.email,
        mobile: base.mobile,

        // pax-wise info
        paxes: paxPayload,

        enquiryDate: new Date().toISOString().slice(0, 10),
        submittedAt: new Date().toISOString(),
        tracking: {
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      };

      const res = await fetch(`${API_BASE}/hrd/hrd-attestation/enquiry`, {
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

      setSuccess("Your HRD enquiry has been submitted successfully. Check your email for confirmation.");
      setBase({ fullName: "", email: "", mobile: "" });
      setPaxes([
        { id: uid(), state: "", district: "", message: "", docType: "", docQty: {}, files: [] },
      ]);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  /** --------- UI HELPERS --------- */
  const docListFor = (docType: string) => (docType ? DOCUMENT_OPTIONS[docType] || [] : []);

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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <Input
                  type="text"
                  name="fullName"
                  value={base.fullName}
                  onChange={handleBaseChange}
                  placeholder="Your full name"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                  required
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mobile *</label>
                <Input
                  type="tel"
                  name="mobile"
                  value={base.mobile}
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
            {paxes.map((p, paxIdx) => {
              const currentDocList = docListFor(p.docType);
              const totalDocs = calcDocCount(p.docQty);

              return (
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

                  {/* pax fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">State *</label>
                      <select
                        name="state"
                        value={p.state}
                        onChange={(e) => handlePaxFieldChange(p.id, e)}
                        className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        required
                      >
                        {STATES.map((s) => (
                          <option key={s} value={s} className="bg-white text-dark">
                            {s || "Select State"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">District *</label>
                      <Input
                        type="text"
                        name="district"
                        value={p.district}
                        onChange={(e) => handlePaxFieldChange(p.id, e)}
                        placeholder="Your district"
                        className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Document Type *</label>
                    <select
                      name="docType"
                      value={p.docType}
                      onChange={(e) => handlePaxFieldChange(p.id, e)}
                      className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      required
                    >
                      <option value="">Select Document Type</option>
                      {Object.keys(DOCUMENT_OPTIONS).map((key) => (
                        <option key={key} value={key} className="bg-white">
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* document picker with qty */}
                  {p.docType && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-slate-700">
                          Select Documents *
                        </label>

                        <div className="text-sm text-slate-600">
                          Total Documents:{" "}
                          <span className="font-semibold text-slate-900">{totalDocs || 0}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200">
                        {currentDocList.map((doc) => {
                          const qty = p.docQty?.[doc] || 0;

                          return (
                            <div
                              key={doc}
                              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">{doc}</p>
                                <p className="text-xs text-slate-500">Select copies using +/-</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => decDoc(p.id, doc)}
                                  className="h-9 w-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center disabled:opacity-40"
                                  disabled={qty <= 0}
                                  aria-label="Decrease"
                                  title="Decrease"
                                >
                                  <Minus className="h-4 w-4 text-slate-700" />
                                </button>

                                <div className="min-w-[40px] text-center">
                                  <span className="text-sm font-semibold text-emerald-900">
                                    {qty}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => incDoc(p.id, doc)}
                                  className="h-9 w-9 rounded-lg border border-emerald-900/20 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center"
                                  aria-label="Increase"
                                  title="Increase"
                                >
                                  <PlusCircle className="h-4 w-4 text-emerald-900" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Uploads (auto based on totalDocs) */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-800">
                        Upload Documents {totalDocs ? `(${totalDocs})` : ""}
                      </p>
                      <p className="text-xs text-slate-500">Accepted: PDF, JPG, PNG</p>
                    </div>

                    {totalDocs < 1 ? (
                      <div className="text-sm text-slate-600 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        Select document copies above to enable uploads.
                      </div>
                    ) : (
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
                                  {file ? file.name : `Upload File ${idx + 1}`}
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
                    )}
                  </div>

            
                </div>
              );
            })}
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
            disabled={!isValid || submitting || filesUploading}
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
