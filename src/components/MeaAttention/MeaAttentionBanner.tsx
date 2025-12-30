
import React, {
  useMemo,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type DocCategory =
  | "Educational Documents"
  | "Personal Documents"
  | "Commercial Documents";

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

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_DOC_TYPES = "application/pdf,image/jpeg,image/png,image/jpg";
const ACCEPTED_IMG_TYPES = "image/jpeg,image/png,image/jpg";

interface MeaFormData {
  name: string; // optional
  email: string;
  contact: string;
  country: string;
  docCategory: DocCategory | "";
  docType: string;
  noOfDocuments: string;

  // ✅ tracking / extra fields
  enquiryDate: string; // yyyy-mm-dd (user selected)
}

type UploadedDoc = {
  index: number;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
};

const MeaAttestationHero: React.FC = () => {
  const [formData, setFormData] = useState<MeaFormData>({
    name: "",
    email: "",
    contact: "",
    country: "",
    docCategory: "",
    docType: "",
    noOfDocuments: "",
    enquiryDate: "",
  });

  // multiple documents
  const [files, setFiles] = useState<(File | null)[]>([null]);

  // ✅ two extra image fields (required)


  const [submittedData, setSubmittedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ✅ API base (env)
  const API_BASE = "http://localhost:5000/api";

  // ✅ Cloudinary env (set these in .env)
  const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";

const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";


  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const redirectToLogin = () => {
    const current =
      typeof window !== "undefined"
        ? encodeURIComponent(window.location.pathname + window.location.search)
        : "";
    window.location.href = `/login?next=${current}`;
  };

  const docTypeOptions = useMemo(() => {
    if (!formData.docCategory) return [];
    return DOC_TYPES[formData.docCategory];
  }, [formData.docCategory]);

  const syncFilesCount = (count: number) => {
    setFiles((prev) => {
      const next = [...prev];
      if (next.length < count) while (next.length < count) next.push(null);
      if (next.length > count) next.length = count;
      return next;
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "docCategory") {
      setFormData((prev) => ({
        ...prev,
        docCategory: value as DocCategory,
        docType: "",
      }));
      return;
    }

    if (name === "noOfDocuments") {
      const onlyNum = value.replace(/[^\d]/g, "");
      const n = Math.min(Math.max(Number(onlyNum || "1"), 1), 20);
      setFormData((prev) => ({ ...prev, noOfDocuments: String(n) }));
      syncFilesCount(n);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFileSize = (file: File, label: string) => {
    if (file.size > MAX_FILE_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(2);
      throw new Error(`${label} is ${mb} MB. Max allowed is 5 MB.`);
    }
  };

  const handleFileChange = (index: number, file: File | null) => {
    setError(null);

    if (!file) {
      setFiles((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });
      return;
    }

    try {
      validateFileSize(file, `File ${index + 1}`);
    } catch (e: any) {
      setError(e?.message || "File too large. Max 5 MB.");
      // reset this input slot
      setFiles((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });
      return;
    }

    setFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  

  const isValid = useMemo(() => {
    if (!formData.email.trim()) return false;
    if (!formData.contact.trim()) return false;
    if (!formData.country) return false;
    if (!formData.docCategory) return false;
    if (!formData.docType) return false;

    const n = Number(formData.noOfDocuments || "0");
    if (!n || n < 1) return false;
    if (files.length !== n) return false;
    if (files.some((f) => !f)) return false;

    // ✅ extra required fields
    if (!formData.enquiryDate) return false;
  

    return true;
  }, [formData, files]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  // ✅ Cloudinary upload (returns secure_url)
  const uploadToCloudinary = async (file: File) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error(
        "Cloudinary is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET."
      );
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // auto => handles pdf/images
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;

    const res = await fetch(endpoint, {
      method: "POST",
      body: fd,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.error?.message || "Cloud upload failed.");
    }
    return String(data?.secure_url || data?.url || "");
  };

  // ✅ Submit API (JSON: form data + urls + tracking fields)
  const submitMeaEnquiry = async (token: string) => {
    // safety: size check again at submit time
    files.forEach((f, idx) => {
      if (f) validateFileSize(f, `File ${idx + 1}`);
    });
   

    // ✅ 1) upload all docs to cloudinary
    const uploadedDocs: UploadedDoc[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
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


    // ✅ 3) tracking fields
    const submittedAt = new Date().toISOString();
    const pageUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const userAgent =
      typeof navigator !== "undefined" ? navigator.userAgent : "";

    // ✅ 4) final payload
    const payload = {
      // existing form fields (same data goes)
      name: formData.name || "",
      email: formData.email,
      contact: formData.contact,
      country: formData.country,
      docCategory: String(formData.docCategory),
      docType: formData.docType,
      noOfDocuments: Number(formData.noOfDocuments || "0"),

      // ✅ new: urls
      documents: uploadedDocs, // array of doc urls + metadata
   

      // ✅ new: date + timestamp + tracking
      enquiryDate: formData.enquiryDate, // selected date
      submittedAt, // ISO timestamp
      tracking: {
        pageUrl,
        userAgent,
      },
    };
    console.log(payload)

    const res = await fetch(`${API_BASE}/mea/mea-attestation/enquiry`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data)
    if (!res.ok) throw new Error(data?.message || "Failed to submit enquiry.");
    return { api: data, payload };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // ✅ 1) login check first
    const token = getToken();
    if (!token) {
      redirectToLogin();
      return;
    }

    // ✅ 2) validate (same as button disable, but safety)
    if (!isValid) {
      setError("Please fill all required fields and upload all documents (max 5 MB each).");
      return;
    }

    // ✅ 3) submit
    setSubmitting(true);
    try {
      const resp = await submitMeaEnquiry(token);

      setSubmittedData(resp); // preview (payload + api)

      alert(
        "Your enquiry has been submitted successfully. Our team will contact you shortly."
      );

      // optional reset
      setFormData({
        name: "",
        email: "",
        contact: "",
        country: "",
        docCategory: "",
        docType: "",
        noOfDocuments: "",
        enquiryDate: "",
      });
      setFiles([null]);
     
    } catch (err: any) {
      const msg = err?.message || "Something went wrong. Please try again.";
      setError(msg);

      // optional: if token invalid/expired
  
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-14 md:pt-36 md:pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/meattestationheader.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h1
            data-aos="fade-down"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            Ministry of External Affairs – MEA Attestation
          </h1>
          <p
            data-aos="fade-left"
            className="mt-3 text-sm sm:text-base text-slate-100/90 max-w-3xl mx-auto leading-relaxed"
          >
            EGS Group provides end-to-end support for MEA attestation of personal,
            educational and commercial documents. From authentication to MEA
            stamping and safe delivery, we manage the entire process.
          </p>
        </div>

        <div className="mt-10 flex justify-center" data-aos="zoom-in">
          <div className="w-full lg:w-[75%] bg-white/95 backdrop-blur rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/20 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-9">
            <div className="flex flex-col items-center mb-6">
              <div className="h-11 w-11 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                EGS
              </div>
              <p className="mt-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-slate-500 text-center">
                Online MEA Attestation Enquiry Form
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-md bg-rose-50 border border-rose-200 px-3 py-2 text-xs sm:text-sm text-rose-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Name (optional)
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Contact <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Enter Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Country (where you will use the document){" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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
                  <label className="text-xs font-semibold text-slate-600">
                    Document Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="docCategory"
                    value={formData.docCategory}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Educational Documents">
                      Educational Documents
                    </option>
                    <option value="Personal Documents">Personal Documents</option>
                    <option value="Commercial Documents">
                      Commercial Documents
                    </option>
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Document Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="docType"
                    value={formData.docType}
                    onChange={handleChange}
                    disabled={!formData.docCategory}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:bg-slate-100"
                    required
                  >
                    <option value="">
                      {formData.docCategory
                        ? "Select Document Type"
                        : "Select Category first"}
                    </option>
                    {docTypeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    No. of Documents <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="noOfDocuments"
                    value={formData.noOfDocuments}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Max 20 files. Max size 5 MB per file.
                  </p>
                </div>

                {/* ✅ Date field */}
                <div className="lg:col-span-3">
                  <label className="text-xs font-semibold text-slate-600">
                    Enquiry Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="enquiryDate"
                    value={formData.enquiryDate}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              {/* ✅ Upload Documents */}
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  Upload Documents <span className="text-rose-500">*</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-slate-200 bg-white px-3 py-3"
                    >
                      <p className="text-[11px] font-semibold text-slate-600 mb-2">
                        File {idx + 1} <span className="text-rose-500">*</span>
                      </p>
                      <input
                        type="file"
                        accept={ACCEPTED_DOC_TYPES}
                        onChange={(e) =>
                          handleFileChange(
                            idx,
                            e.target.files?.[0] ?? null
                          )
                        }
                        className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:opacity-90"
                        required
                      />
                      <p className="mt-2 text-[11px] text-slate-500 truncate">
                        {file ? `Selected: ${file.name}` : "No file selected"}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Max 5 MB per file.
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-2 text-[11px] text-slate-500">
                  Supported: PDF, JPG, JPEG, PNG.
                </p>
              </div>

             
              <button
                type="submit"
                disabled={!isValid || submitting}
                className={`w-full rounded-md text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 transition-colors shadow-md ${
                  !isValid || submitting
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-sky-600 hover:bg-sky-700"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>

            {submittedData && (
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  Submitted Data (preview)
                </p>
                <pre className="text-[11px] sm:text-xs bg-slate-50 border border-slate-200 rounded-md p-3 overflow-x-auto">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeaAttestationHero;
