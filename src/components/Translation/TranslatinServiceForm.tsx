import React, { useMemo, useState, ChangeEvent, FormEvent, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type TranslationCategory = "Certificate Translation" | "Immigration Translation";
type CertificateGroup = "Personal" | "Educational" | "Commercial";

type ImmigrationGroup =
  | "Visa & Residency Applications"
  | "Identity & Civil Status"
  | "Supporting Documents";

const CERTIFICATE_DOCS: Record<CertificateGroup, string[]> = {
  Personal: [
    "Marriage Certificate",
    "Birth Certificate",
    "Death Certificate",
    "Leaving Certificate",
    "Police Clearance Certificate (PCC)",
  ],
  Commercial: [
    "Certificate of Origin",
    "Certificate of Incorporation",
    "Commercial Invoices",
  ],
  Educational: [
    "School Leaving Certificate",
    "College Leaving Certificate",
    "Degree Certificate",
    "Academic Mark Sheets",
    "Bonafide Certificate",
    "Post-Graduate Degree Certificate",
  ],
};

const IMMIGRATION_DOCS: Record<ImmigrationGroup, string[]> = {
  "Visa & Residency Applications": [
    "Visa Application Forms",
    "Permanent Residency Documents",
    "Invitation Letters",
    "Employment Contracts",
  ],
  "Identity & Civil Status": [
    "Passport & National ID",
    "Residence Permit",
    "Police Clearance Certificate (PCC)",
    "Civil Status Certificates",
  ],
  "Supporting Documents": [
    "Bank Statements",
    "Salary Slips",
    "Sponsorship Letters",
    "Affidavits & Declarations",
  ],
};

const ACCEPTED_FILE_TYPES = "image/*,application/pdf";

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

interface TranslationFormData {
  name: string; // optional
  email: string;
  contact: string;
  country: string;

  category: TranslationCategory | "";
  // Certificate flow:
  certGroup: CertificateGroup | "";
  certDocType: string;

  // Immigration flow:
  immGroup: ImmigrationGroup | "";
  immDocType: string;

  noOfDocuments: string;
}

const TranslationServiceForm: React.FC = () => {
  const [formData, setFormData] = useState<TranslationFormData>({
    name: "",
    email: "",
    contact: "",
    country: "",
    category: "",
    certGroup: "",
    certDocType: "",
    immGroup: "",
    immDocType: "",
    noOfDocuments: "",
  });

  const [files, setFiles] = useState<(File | null)[]>([null]);
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, offset: 80, easing: "ease-in-out" });
  }, []);

  const syncFilesCount = (count: number) => {
    setFiles((prev) => {
      const next = [...prev];
      if (next.length < count) while (next.length < count) next.push(null);
      if (next.length > count) next.length = count;
      return next;
    });
  };

  const certificateDocOptions = useMemo(() => {
    if (!formData.certGroup) return [];
    return CERTIFICATE_DOCS[formData.certGroup];
  }, [formData.certGroup]);

  const immigrationDocOptions = useMemo(() => {
    if (!formData.immGroup) return [];
    return IMMIGRATION_DOCS[formData.immGroup];
  }, [formData.immGroup]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Main category switch -> reset dependent fields
    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value as any,
        certGroup: "",
        certDocType: "",
        immGroup: "",
        immDocType: "",
      }));
      return;
    }

    // Certificate group -> reset doc type
    if (name === "certGroup") {
      setFormData((prev) => ({
        ...prev,
        certGroup: value as any,
        certDocType: "",
      }));
      return;
    }

    // Immigration group -> reset doc type
    if (name === "immGroup") {
      setFormData((prev) => ({
        ...prev,
        immGroup: value as any,
        immDocType: "",
      }));
      return;
    }

    // No of documents -> sync upload fields
    if (name === "noOfDocuments") {
      const onlyNum = value.replace(/[^\d]/g, "");
      const n = Math.min(Math.max(Number(onlyNum || "1"), 1), 20);
      setFormData((prev) => ({ ...prev, noOfDocuments: String(n) }));
      syncFilesCount(n);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (index: number, file: File | null) => {
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
    if (!formData.category) return false;

    // category dependent validation
    if (formData.category === "Certificate Translation") {
      if (!formData.certGroup) return false;
      if (!formData.certDocType) return false;
    }
    if (formData.category === "Immigration Translation") {
      if (!formData.immGroup) return false;
      if (!formData.immDocType) return false;
    }

    const n = Number(formData.noOfDocuments || "0");
    if (!n || n < 1) return false;
    if (files.length !== n) return false;
    if (files.some((f) => !f)) return false;

    return true;
  }, [formData, files]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      noOfDocuments: Number(formData.noOfDocuments),
      selectedDocType:
        formData.category === "Certificate Translation"
          ? formData.certDocType
          : formData.immDocType,
      files: files.map((f, i) => ({
        index: i + 1,
        name: f?.name,
        type: f?.type,
        size: f?.size,
      })),
    };

    console.log("Translation form payload:", payload);
    console.log("RAW FILES (send via FormData):", files);
    setSubmittedData(payload);
    alert("Your enquiry has been submitted. Check console for data.");
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-14 md:pt-32 md:pb-20">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/translationheader.jpg')" }}
      />
      

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h1 data-aos="fade-down" className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Translation Services
          </h1>
          <p data-aos="fade-left" className="mt-3 text-sm sm:text-base text-slate-100/90 max-w-3xl mx-auto leading-relaxed">
            Certificate translations and immigration translations with accurate formatting and terminology.
          </p>
        </div>

        <div className="mt-10 flex justify-center" data-aos="zoom-in">
          <div className="w-full lg:w-[75%] bg-white/95 backdrop-blur rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/20 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-9">
            {/* Logo + subtitle */}
            <div className="flex flex-col items-center mb-6">
              <div className="h-11 w-11 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                EGS
              </div>
              <p className="mt-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-slate-500 text-center">
                Online Translation Enquiry Form
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Name optional */}
                <div>
                  <label className="text-xs font-semibold text-slate-600">Name (optional)</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Email */}
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
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Contact */}
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
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Country */}
                <div className="lg:col-span-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Country (where you will use the translation) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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

                {/* Translation category */}
                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Translation Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Certificate Translation">Certificate Translation</option>
                    <option value="Immigration Translation">Immigration Translation</option>
                  </select>
                </div>

                {/* Conditional: Certificate Translation flow */}
                {formData.category === "Certificate Translation" && (
                  <>
                    <div className="lg:col-span-2">
                      <label className="text-xs font-semibold text-slate-600">
                        Document Group <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="certGroup"
                        value={formData.certGroup}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      >
                        <option value="">Select Group</option>
                        <option value="Personal">Personal</option>
                        <option value="Educational">Educational</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>

                    <div className="lg:col-span-3">
                      <label className="text-xs font-semibold text-slate-600">
                        Document Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="certDocType"
                        value={formData.certDocType}
                        onChange={handleChange}
                        disabled={!formData.certGroup}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100"
                        required
                      >
                        <option value="">
                          {formData.certGroup ? "Select Document Type" : "Select Group first"}
                        </option>
                        {certificateDocOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Conditional: Immigration Translation flow */}
                {formData.category === "Immigration Translation" && (
                  <>
                    <div className="lg:col-span-2">
                      <label className="text-xs font-semibold text-slate-600">
                        Document Group <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="immGroup"
                        value={formData.immGroup}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      >
                        <option value="">Select Group</option>
                        <option value="Visa & Residency Applications">Visa & Residency Applications</option>
                        <option value="Identity & Civil Status">Identity & Civil Status</option>
                        <option value="Supporting Documents">Supporting Documents</option>
                      </select>
                    </div>

                    <div className="lg:col-span-3">
                      <label className="text-xs font-semibold text-slate-600">
                        Document Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="immDocType"
                        value={formData.immDocType}
                        onChange={handleChange}
                        disabled={!formData.immGroup}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100"
                        required
                      >
                        <option value="">
                          {formData.immGroup ? "Select Document Type" : "Select Group first"}
                        </option>
                        {immigrationDocOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* No of docs */}
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
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                  <p className="mt-1 text-[11px] text-slate-500">Max 20 files.</p>
                </div>
              </div>

              {/* Uploads */}
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  Attach Documents <span className="text-rose-500">*</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file, idx) => (
                    <div key={idx} className="rounded-md border border-slate-200 bg-white px-3 py-3">
                      <p className="text-[11px] font-semibold text-slate-600 mb-2">
                        File {idx + 1} <span className="text-rose-500">*</span>
                      </p>
                      <input
                        type="file"
                        accept={ACCEPTED_FILE_TYPES}
                        onChange={(e) => handleFileChange(idx, e.target.files?.[0] ?? null)}
                        className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:opacity-90"
                        required
                      />
                      <p className="mt-2 text-[11px] text-slate-500 truncate">
                        {file ? `Selected: ${file.name}` : "No file selected"}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-2 text-[11px] text-slate-500">
                  Supported: images + PDF. All fields required except Name.
                </p>
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full rounded-md text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 transition-colors shadow-md
                  ${isValid ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-300 cursor-not-allowed"}`}
              >
                Submit Enquiry
              </button>
            </form>

            {submittedData && (
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">Submitted Data (preview)</p>
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

export default TranslationServiceForm;
