"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

interface PccFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  companyName: string;
  noOfDocuments: number;
}

type UploadedDoc = {
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  /* ================= LOGIN HELPERS (ONLY LOGIC) ================= */
  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const redirectToLogin = () => {
    if (typeof window === "undefined") return;
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/login?next=${next}`;
  };

  /* ================= CLOUDINARY UPLOAD ================= */
  const uploadToCloudinary = async (file: File): Promise<UploadedDoc> => {
   

    const formDataForUpload = new FormData();
    formDataForUpload.append("file", file);
    formDataForUpload.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      formDataForUpload
    );

    return {
      url: response.data.secure_url,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
    };
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
      const count = Math.max(1, Number(value || 1));
      setFormData((prev) => ({ ...prev, noOfDocuments: count }));
      setFiles(Array.from({ length: count }, () => null));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (index: number, file: File | null) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 🔐 LOGIN CHECK FIRST
    const token = getToken();
    if (!token) {
      redirectToLogin();
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Upload all files to Cloudinary
      const uploadedDocs = await Promise.all(
        files.map(async (file, index) => {
          if (!file) throw new Error(`Document ${index + 1} is required`);
          const docData = await uploadToCloudinary(file);
          return {
            index: index + 1,
            ...docData,
          };
        })
      );

      // Prepare payload
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        companyName: formData.companyName,
        noOfDocuments: formData.noOfDocuments,
        documents: uploadedDocs,
        submittedAt: new Date().toISOString(),
        tracking: {
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
        },
      };

      // Submit to backend
      const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.API_BASE_URL || "";
      const response = await axios.post(`${API_BASE}/pcc/pcc-legalization/enquiry`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log("Response:", response.data);

      setMessage({
        type: "success",
        text: "Your PCC Legalization enquiry has been submitted successfully. We will contact you shortly.",
      });

      // Reset
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        companyName: "",
        noOfDocuments: 1,
      });
      setFiles([null]);
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMsg = error?.response?.data?.message || error?.message || "Submission failed. Please try again.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setIsLoading(false);
    }
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
          <div
            data-aos="fade-left"
            data-aos-delay="120"
            className="bg-white/95 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] px-6 py-8"
          >
            <div className="text-center mb-6">
              <div className="h-11 w-11 mx-auto rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold flex items-center justify-center">
                EGS
              </div>
              <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                Online PCC Legalization Enquiry
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* MESSAGE DISPLAY */}
              {message && (
                <div
                  className={`p-4 rounded-lg text-sm font-medium ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name (optional)"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  disabled={isLoading}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Contact Number *"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  disabled={isLoading}
                />
                <select
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="input"
                  disabled={isLoading}
                >
                  <option value="">Select Country *</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name *"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input"
                  disabled={isLoading}
                />
                <input
                  type="number"
                  min={1}
                  name="noOfDocuments"
                  placeholder="Number of Documents *"
                  required
                  value={formData.noOfDocuments}
                  onChange={handleChange}
                  className="input"
                  disabled={isLoading}
                />
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
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-semibold py-3 rounded-md shadow-md transition ${
                  isLoading ? "bg-slate-400 text-white cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700 text-white"
                }`}
              >
                {isLoading ? "Submitting..." : "Submit PCC Enquiry"}
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
