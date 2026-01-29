"use client";

import React, { useMemo, useState, useEffect } from "react";
import useUserPrefill from "@/hooks/useUserPrefill";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle, CheckCircle2, Loader, Plus, Trash2 } from "lucide-react";

const ACCEPTED_FILE_TYPES = "image/*,application/pdf";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

// ✅ Same languages list (use yours as-is)
const ALL_LANGUAGES = [
  "Afghan","Afrikaans","Albanian","Amharic","Arabic","Armenian","Azerbaijani","Basque","Belarusian","Bengali","Bosnian",
  "Bulgarian","Catalan","Cebuano","Central Khmer","Chichewa","Chinese","Corsican","Croatian","Czech","Danish","Dari","Dutch",
  "English","Esperanto","Estonian","Finnish","French","Galician","Georgian","German","Greek","Gujarati","Haitian Creole","Hausa",
  "Hawaiian","Hebrew","Hindi","Hmong","Hungarian","Icelandic","Igbo","Indonesian","Irish","Italian","Japanese","Javanese","Kannada",
  "Kazakh","Kinyarwanda","Korean","Kurdish","Kyrgyz","Lao","Latin","Latvian","Lithuanian","Luxembourgish","Macedonian","Malagasy",
  "Malay","Malayalam","Maltese","Maori","Marathi","Mongolian","Myanmar (Burmese)","Nepali","Norwegian","Pashto","Persian","Polish",
  "Portuguese","Punjabi","Quechua","Romanian","Russian","Samoan","Scots Gaelic","Serbian","Sesotho","Shona","Sindhi","Sinhala",
  "Slovak","Slovenian","Somali","Spanish","Sundanese","Swahili","Swedish","Tajik","Tamil","Tatar","Telugu","Thai","Turkish",
  "Turkmen","Ukrainian","Urdu","Uyghur","Uzbek","Vietnamese","Welsh","Xhosa","Yiddish","Yoruba","Zulu",
];

// ✅ All document types in ONE list (merged)
const DOCUMENT_TYPES = [
  // Certificate / Personal
  "Marriage Certificate",
  "Birth Certificate",
  "Death Certificate",
  "Leaving Certificate",
  "Police Clearance Certificate (PCC)",

  // Certificate / Commercial
  "Certificate of Origin",
  "Certificate of Incorporation",
  "Commercial Invoices",

  // Certificate / Educational
  "School Leaving Certificate",
  "College Leaving Certificate",
  "Degree Certificate",
  "Academic Mark Sheets",
  "Bonafide Certificate",
  "Post-Graduate Degree Certificate",

  // Immigration (all)
  "Visa Application Forms",
  "Permanent Residency Documents",
  "Invitation Letters",
  "Employment Contracts",
  "Passport & National ID",
  "Residence Permit",
  "Civil Status Certificates",
  "Bank Statements",
  "Salary Slips",
  "Sponsorship Letters",
  "Affidavits & Declarations",
].filter((v, i, a) => a.indexOf(v) === i);

type UploadedDoc = {
  requestIndex: number;
  fileIndex: number;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
};

type RequestItem = {
  sourceLanguage: string;
  targetLanguage: string;
  docType: string;
  noOfDocuments: number;
  files: (File | null)[];
};

export default function TranslationEnquiryForm() {
  const { user } = useUserPrefill();

  useEffect(() => {
    if (!user) return;
    setBase((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      email: prev.email || user.email || "",
      contact: prev.contact || user.phone || "",
    }));
  }, [user]);

  const [base, setBase] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [requests, setRequests] = useState<RequestItem[]>([
    {
      sourceLanguage: "",
      targetLanguage: "",
      docType: "",
      noOfDocuments: 1,
      files: [null],
    },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ API same
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
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

  const isValid = useMemo(() => {
    if (!base.email.trim()) return false;
    if (!base.contact.trim()) return false;

    for (const r of requests) {
      if (!r.sourceLanguage) return false;
      if (!r.targetLanguage) return false;
      if (!r.docType) return false;
      if (!r.noOfDocuments || r.noOfDocuments < 1) return false;
      if (r.files.length !== r.noOfDocuments) return false;
      if (r.files.some((f) => !f)) return false;
    }
    return true;
  }, [base, requests]);

  const setRequestField = (idx: number, key: keyof RequestItem, value: any) => {
    setError(null);
    setSuccess(null);

    setRequests((prev) => {
      const next = [...prev];
      const item = { ...next[idx] };

      if (key === "noOfDocuments") {
        const n = Math.max(1, Math.min(Number(value || 1), 20));
        item.noOfDocuments = n;

        const files = [...item.files];
        if (files.length < n) while (files.length < n) files.push(null);
        if (files.length > n) files.length = n;
        item.files = files;

        next[idx] = item;
        return next;
      }

      (item as any)[key] = value;
      next[idx] = item;
      return next;
    });
  };

  const setFile = (reqIdx: number, fileIdx: number, file: File | null) => {
    setError(null);
    setSuccess(null);

    if (file && file.size > MAX_FILE_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(2);
      setError(`File is ${mb}MB. Max 5MB.`);
      return;
    }

    setRequests((prev) => {
      const next = [...prev];
      const item = { ...next[reqIdx] };
      const files = [...item.files];
      files[fileIdx] = file;
      item.files = files;
      next[reqIdx] = item;
      return next;
    });
  };

  const addRequest = () => {
    setError(null);
    setSuccess(null);
    setRequests((prev) => [
      ...prev,
      { sourceLanguage: "", targetLanguage: "", docType: "", noOfDocuments: 1, files: [null] },
    ]);
  };

  const removeRequest = (idx: number) => {
    setError(null);
    setSuccess(null);
    setRequests((prev) => {
      const next = [...prev];
      next.splice(idx, 1);
      return next.length ? next : prev;
    });
  };

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
    if (!res.ok) throw new Error(data?.error?.message || "Upload failed");
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
      setError("Please fill all required fields and upload all documents.");
      return;
    }

    setSubmitting(true);
    try {
      // Upload all files (flattened)
      const uploadedDocs: UploadedDoc[] = [];
      for (let r = 0; r < requests.length; r++) {
        for (let f = 0; f < requests[r].files.length; f++) {
          const file = requests[r].files[f];
          if (!file) throw new Error(`Request ${r + 1}: File ${f + 1} is required`);
          if (file.size > MAX_FILE_BYTES) throw new Error(`Request ${r + 1}: File ${f + 1} exceeds 5MB`);
          const url = await uploadToCloudinary(file);
          uploadedDocs.push({
            requestIndex: r + 1,
            fileIndex: f + 1,
            url,
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
          });
        }
      }

      const submittedAt = new Date().toISOString();

      // ✅ Backward-friendly payload:
      // - Keep top-level fields like your old API (uses first request)
      // - Also send "requests" for multiple items
      const first = requests[0];
      const payload = {
        name: base.name || "",
        email: base.email,
        contact: base.contact,

        // old-style (kept)
        sourceLanguage: first.sourceLanguage || null,
        targetLanguage: first.targetLanguage || null,
        selectedDocType: first.docType,
        noOfDocuments: uploadedDocs.length,
        documents: uploadedDocs,

        // new-style (for multiple requests)
        requests: requests.map((r, idx) => ({
          requestIndex: idx + 1,
          sourceLanguage: r.sourceLanguage,
          targetLanguage: r.targetLanguage,
          docType: r.docType,
          noOfDocuments: r.noOfDocuments,
        })),

        enquiryDate: new Date().toISOString().slice(0, 10),
        submittedAt,
        tracking: {
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      };

      const res = await fetch(`${API_BASE}/translation/translation/enquiry`, {
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
        redirectToLogin();
        return;
      }
      if (!res.ok) throw new Error(data?.message || "Submission failed");

      setSuccess("Your translation enquiry has been submitted successfully. We will contact you shortly.");
      setBase({ name: "", email: "", contact: "" });
      setRequests([{ sourceLanguage: "", targetLanguage: "", docType: "", noOfDocuments: 1, files: [null] }]);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 bg-slate-50 rounded-2xl border border-slate-200">
      {/* <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Translation Enquiry</h2>
        <p className="text-sm text-slate-600 mt-1">
          Add one or more requests. Email & contact stay same.
        </p>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{success}</p>
          </div>
        )}

        {/* Base fields (one time) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Name (Optional)</label>
            <Input
              type="text"
              value={base.name}
              onChange={(e) => setBase((p) => ({ ...p, name: e.target.value }))}
              placeholder="Full name"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
            <Input
              type="email"
              value={base.email}
              onChange={(e) => setBase((p) => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contact *</label>
            <Input
              type="tel"
              value={base.contact}
              onChange={(e) => setBase((p) => ({ ...p, contact: e.target.value }))}
              placeholder="+91 9876543210"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
              required
            />
          </div>
        </div>

        {/* Requests header */}
       

        {/* Requests list */}
        <div className="space-y-4">
          {requests.map((r, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 text-teal-700 text-sm font-bold border border-teal-100">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-900">Request</p>
                </div>

                {requests.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequest(idx)}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>

              {/* Request fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Source Language *
                  </label>
                  <select
                    value={r.sourceLanguage}
                    onChange={(e) => setRequestField(idx, "sourceLanguage", e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select source language</option>
                    {ALL_LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Destination Language *
                  </label>
                  <select
                    value={r.targetLanguage}
                    onChange={(e) => setRequestField(idx, "targetLanguage", e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select destination language</option>
                    {ALL_LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Document Type *
                  </label>
                  <select
                    value={r.docType}
                    onChange={(e) => setRequestField(idx, "docType", e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select document type</option>
                    {DOCUMENT_TYPES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    No. of Documents *
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={r.noOfDocuments}
                    onChange={(e) => setRequestField(idx, "noOfDocuments", e.target.value)}
                    className="bg-white border-slate-300 text-slate-900"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Max 20 files. Max 5MB each.</p>
                </div>
              </div>

              {/* Uploads */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Files (Image/PDF) *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {r.files.map((file, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-teal-500/60 transition bg-slate-50"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                          <Upload className="w-4 h-4 text-teal-700" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800">
                            File {fIdx + 1}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {file ? file.name : "Choose image or PDF"}
                          </p>
                        </div>

                        <input
                          type="file"
                          accept={ACCEPTED_FILE_TYPES}
                          onChange={(e) => setFile(idx, fIdx, e.target.files?.[0] || null)}
                          className="hidden"
                          required
                        />
                      </label>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Supported: all image formats + PDF. Upload exactly {r.noOfDocuments} file(s) for this request.
                </p>
              </div>
            </div>
          ))}
        </div>
         <div className="flex items-center justify-between gap-3 pt-2">
          {/* <div>
            <p className="text-sm font-semibold text-slate-900">Translation Requests</p>
            <p className="text-xs text-slate-600">
              Add request(s). Each request needs languages, doc type and uploads.
            </p>
          </div> */}

          <Button
            type="button"
            onClick={addRequest}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add More
          </Button>
        </div>

        <Button
          type="submit"
          disabled={submitting || !isValid}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:opacity-50"
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
  );
}
