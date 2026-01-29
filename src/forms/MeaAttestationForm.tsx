"use client";

import React, { useMemo, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle, CheckCircle2, Loader, PlusCircle, Trash2, UserRound } from "lucide-react";
import useUserPrefill from "@/hooks/useUserPrefill";

type DocCategory = "Educational Documents" | "Personal Documents" | "Commercial Documents";

const DOC_TYPES: Record<DocCategory, string[]> = {
  "Educational Documents": [
    "Degree certificate",
    "Diploma certificate",
    "Mark sheets",
    "Transfer Certificate",
    "Nursing Certificate",
  ],
  "Personal Documents": [
    "Birth certificate",
    "Marriage certificate",
    "Death certificate",
    "Divorce certificate",
    "PCC Certificate",
  ],
  "Commercial Documents": [
    "Power of Attorney",
    "Company Invoices",
    "Export Documentation",
    "Certificates of Incorporation",
    "Memorandum of Association",
  ],
};

const ALL_COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada",
  "Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Costa Rica",
  "Croatia","Cuba","Cyprus","Czechia (Czech Republic)","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini (fmr. Swaziland)","Ethiopia","Fiji","Finland","France","Gabon",
  "Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras",
  "Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya",
  "Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia",
  "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar (Burma)","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine State",
  "Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia",
  "Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania",
  "Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
  "Yemen","Zambia","Zimbabwe",
];

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_DOC_TYPES = "application/pdf,image/jpeg,image/png,image/jpg";

type UploadedDoc = {
  index: number;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
};

type BaseFields = {
  name: string;
  email: string;
  contact: string;
};

type PaxFields = {
  id: string;
  country: string;
  docCategory: DocCategory | "";
  docType: string;
  noOfDocuments: number;
  files: (File | null)[];
};

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function MeaAttestationForm() {
  const { user } = useUserPrefill();
  const [base, setBase] = useState<BaseFields>({
    name: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    if (!user) return;
    setBase((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      email: prev.email || user.email || "",
      contact: prev.contact || user.phone || "",
    }));
  }, [user]);

  // Start with 1 pax by default
  const [paxes, setPaxes] = useState<PaxFields[]>([
    {
      id: uid(),
      country: "",
      docCategory: "",
      docType: "",
      noOfDocuments: 1,
      files: [null],
    },
  ]);

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
      throw new Error(`${label} is ${mb} MB. Max allowed is 5 MB.`);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary is not configured. Please set environment variables.");
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;

    const res = await fetch(endpoint, { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || "Cloud upload failed.");
    return String(data?.secure_url || data?.url || "");
  };

  const handleBaseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);
    setBase((prev) => ({ ...prev, [name]: value }));
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

    setPaxes((prev) =>
      prev.map((p) => {
        if (p.id !== paxId) return p;

        if (name === "docCategory") {
          return {
            ...p,
            docCategory: value as DocCategory,
            docType: "",
          };
        }

        if (name === "noOfDocuments") {
          const onlyNum = value.replace(/[^\d]/g, "");
          const n = Math.min(Math.max(Number(onlyNum || "1"), 1), 20);
          // sync file inputs
          setTimeout(() => syncFilesCount(paxId, n), 0);
          return { ...p, noOfDocuments: n };
        }

        return { ...p, [name]: value };
      })
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
          validateFileSize(file, `File ${index + 1}`);
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
    setPaxes((prev) => [
      ...prev,
      {
        id: uid(),
        country: "",
        docCategory: "",
        docType: "",
        noOfDocuments: 1,
        files: [null],
      },
    ]);
  };

  const removePax = (paxId: string) => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== paxId)));
  };

  const isValid = useMemo(() => {
    if (!base.email.trim()) return false;
    if (!base.contact.trim()) return false;

    if (!paxes.length) return false;

    for (const p of paxes) {
      if (!p.country) return false;
      if (!p.docCategory) return false;
      if (!p.docType) return false;
      if (!p.noOfDocuments || p.noOfDocuments < 1) return false;
      if (p.files.length !== p.noOfDocuments) return false;
      if (p.files.some((f) => !f)) return false;
    }

    return true;
  }, [base, paxes]);

  const submitMeaEnquiry = async (token: string) => {
    // upload all pax files
    const paxPayload = [];

    for (let pIndex = 0; pIndex < paxes.length; pIndex++) {
      const p = paxes[pIndex];

      p.files.forEach((f, idx) => {
        if (f) validateFileSize(f, `Pax ${pIndex + 1} - File ${idx + 1}`);
      });

      const uploadedDocs: UploadedDoc[] = [];
      for (let i = 0; i < p.files.length; i++) {
        const f = p.files[i];
        if (!f) continue;
        const url = await uploadToCloudinary(f);
        uploadedDocs.push({
          index: i + 1,
          originalName: f.name,
          mimeType: f.type,
          size: f.size,
          url,
        });
      }

      paxPayload.push({
        paxNo: pIndex + 1,
        country: p.country,
        docCategory: String(p.docCategory),
        docType: p.docType,
        noOfDocuments: Number(p.noOfDocuments || 0),
        documents: uploadedDocs,
      });
    }

    const submittedAt = new Date().toISOString();
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

    const payload = {
      name: base.name || "",
      email: base.email,
      contact: base.contact,
      paxes: paxPayload,
      submittedAt,
      tracking: { pageUrl, userAgent },
    };

    const res = await fetch(`${API_BASE}/mea/mea-attestation/enquiry`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Failed to submit enquiry.");
    return data;
  };

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
      setError("Please fill all required fields and upload all documents.");
      return;
    }

    setSubmitting(true);
    try {
      await submitMeaEnquiry(token);
      setSuccess("Your enquiry has been submitted successfully. Our team will contact you shortly.");

      setBase({ name: "", email: "", contact: "" });
      setPaxes([
        { id: uid(), country: "", docCategory: "", docType: "", noOfDocuments: 1, files: [null] },
      ]);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const docTypeOptionsFor = (p: PaxFields) => {
    if (!p.docCategory) return [];
    return DOC_TYPES[p.docCategory];
  };

  return (
    <div className="w-full">
      {/* Premium container (matches sidebar vibe) */}
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number *</label>
                <Input
                  type="tel"
                  name="contact"
                  value={base.contact}
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
              const docTypeOptions = docTypeOptionsFor(p);

              return (
                <div
                  key={p.id}
                  className="rounded-2xl border border-emerald-900/10 bg-white p-5"
                >
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

                  {/* Pax fields */}
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
                        {ALL_COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Document Category *</label>
                      <select
                        name="docCategory"
                        value={p.docCategory}
                        onChange={(e) => handlePaxChange(p.id, e)}
                        className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Educational Documents">Educational Documents</option>
                        <option value="Personal Documents">Personal Documents</option>
                        <option value="Commercial Documents">Commercial Documents</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Document Type *</label>
                      <select
                        name="docType"
                        value={p.docType}
                        onChange={(e) => handlePaxChange(p.id, e)}
                        className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        required
                        disabled={!p.docCategory}
                      >
                        <option value="">Select Type</option>
                        {docTypeOptions.map((dt) => (
                          <option key={dt} value={dt}>
                            {dt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Number of Documents *</label>
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
                      <p className="text-xs text-slate-500 mt-1">Max 20 documents. Each file max 5 MB.</p>
                    </div>
                  </div>

                  {/* Uploads grid (2 per row) */}
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
                              onChange={(e) => handleFileChange(p.id, idx, e.target.files?.[0] || null)}
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
        
          {/* Submit */}
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
