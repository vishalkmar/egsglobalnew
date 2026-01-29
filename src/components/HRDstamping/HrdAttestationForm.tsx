// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { RotateCw } from "lucide-react";
// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const DOCUMENT_OPTIONS: Record<string, string[]> = {
//   "Commercial Documents": [
//     "Hiring documents",
//     "Company invoices",
//     "GST documents",
//     "Income tax return",
//     "Company register",
//     "Certificates of Origin",
//     "Power of attorney",
//     "Other business documents",
//   ],
//   "Personal Documents": [
//     "Marriage certificates",
//     "Single status certificate",
//     "Birth certificates",
//     "Divorce certificates",
//     "Aadhar card",
//     "Death certificates",
//     "Power of attorney",
//     "Police clearance certificate",
//   ],
//   "Educational Documents": [
//     "High school certificates",
//     "Degree certificates",
//     "Diploma certificates",
//     "Report cards",
//     "Marksheet verification",
//     "Diploma certificates (additional)",
//     "Power of attorney",
//     "Police clearance certificate",
//   ],
// };

// // Full list of India states (28)
// const STATES = [
//   "",
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",
// ];


// type FormState = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
//   state: string;
//   district: string;
//   message: string;

//   docType: string; // Commercial / Personal / Educational
//   documents: string[]; // selected docs (checkboxes)
//   docCount: string; // total number of documents
// };

// const initialFormState: FormState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   mobile: "",
//   state: "",
//   district: "",
//   message: "",

//   docType: "",
//   documents: [],
//   docCount: "",
// };

// function generateCaptcha() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// export default function HRDAttestationSection() {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: false, // ✅ repeat on every scroll in/out
//       offset: 80,
//       easing: "ease-in-out",
//     });
//   }, []);

//   // ✅ LOGIN HELPERS (ONLY LOGIC)
//   const getToken = () =>
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const redirectToLogin = () => {
//     const next =
//       typeof window !== "undefined"
//         ? encodeURIComponent(window.location.pathname + window.location.search)
//         : "";
//     window.location.href = `/login?next=${next}`;
//   };

//   const [form, setForm] = useState<FormState>(initialFormState);
//   const [files, setFiles] = useState<(File | null)[]>([]);
//   const [districts, setDistricts] = useState<string[]>([]);
//   const [captcha, setCaptcha] = useState<string>(generateCaptcha);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const syncFilesCount = (count: number) => {
//     setFiles((prev) => {
//       const next = [...prev];
//       if (next.length < count) while (next.length < count) next.push(null);
//       if (next.length > count) next.length = count;
//       return next;
//     });
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setSuccessMessage(null);

//     // When docCount changes, trim selected documents to the allowed number and sync file inputs
//     if (name === "docCount") {
//       const n = Number(value || "0");
//       setForm((prev) => ({ ...prev, [name]: value, documents: prev.documents.slice(0, n) }));
//       syncFilesCount(n);
//       return;
//     }

//     // Replace district select with free text input logic (no dependent districts)
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDocumentToggle = (doc: string) => {
//     setForm((prev) => {
//       const alreadySelected = prev.documents.includes(doc);
//       const n = Number(prev.docCount || "0");

//       if (!alreadySelected) {
//         // prevent selecting more than docCount
//         if (n && prev.documents.length >= n) {
//           alert(`You can only select up to ${n} document(s).`);
//           return prev;
//         }
//         return { ...prev, documents: [...prev.documents, doc] };
//       }

//       return { ...prev, documents: prev.documents.filter((d) => d !== doc) };
//     });
//     setSuccessMessage(null);
//   };

//   const handleFileChangeAt = (index: number, file: File | null) => {
//     setSuccessMessage(null);

//     if (!file) {
//       setFiles((prev) => {
//         const next = [...prev];
//         next[index] = null;
//         return next;
//       });
//       return;
//     }

//     try {
//       validateFileSize(file, `File ${index + 1}`);
//     } catch (e: any) {
//       alert(e?.message || "File too large. Max 5 MB.");
//       setFiles((prev) => {
//         const next = [...prev];
//         next[index] = null;
//         return next;
//       });
//       return;
//     }

//     setFiles((prev) => {
//       const next = [...prev];
//       next[index] = file;
//       return next;
//     });
//   };

//   // Cloudinary
//   const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
//   const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
//   const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";
//   const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

//   const validateFileSize = (file: File, label: string) => {
//     if (file.size > MAX_FILE_BYTES) {
//       const mb = (file.size / (1024 * 1024)).toFixed(2);
//       throw new Error(`${label} is ${mb} MB. Max allowed is 5 MB.`);
//     }
//   };

//   const uploadToCloudinary = async (file: File) => {
//     if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
//       throw new Error("Cloudinary not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET");
//     }
//     const fd = new FormData();
//     fd.append("file", file);
//     fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//     const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
//     const res = await fetch(endpoint, { method: "POST", body: fd });
//     const data = await res.json().catch(() => ({}));
//     if (!res.ok) throw new Error(data?.error?.message || "Cloud upload failed");
//     return String(data?.secure_url || data?.url || "");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // ✅ LOGIN CHECK
//     const token = getToken();
//     if (!token) {
//       redirectToLogin();
//       return;
//     }

//     // validation
//     if (!form.docType) {
//       alert("Please select document type.");
//       return;
//     }
//     const n = Number(form.docCount || "0");
//     if (!n || n < 1) {
//       alert("Please enter a valid total number of documents.");
//       return;
//     }
//     if (form.documents.length !== n) {
//       alert(`Please select exactly ${n} document(s). You selected ${form.documents.length}.`);
//       return;
//     }
//     if (files.length !== n) {
//       alert(`Please upload exactly ${n} file(s). You uploaded ${files.length}.`);
//       return;
//     }

//     try {
//       // validate file presence and sizes
//       files.forEach((f, idx) => {
//         if (!f) throw new Error(`File ${idx + 1} is missing.`);
//         validateFileSize(f, `File ${idx + 1}`);
//       });

//       // upload
//       const uploadedDocs: { index: number; originalName: string; mimeType: string; size: number; url: string }[] = [];
//       for (let i = 0; i < files.length; i++) {
//         const f = files[i] as File;
//         const url = await uploadToCloudinary(f);
//         uploadedDocs.push({ index: i + 1, originalName: f.name, mimeType: f.type, size: f.size, url });
//       }

//       const submittedAt = new Date().toISOString();
//       const payload: any = {
//         firstName: form.firstName || "",
//         lastName: form.lastName || "",
//         email: form.email,
//         mobile: form.mobile,
//         state: form.state || "",
//         district: form.district || "",
//         docType: form.docType,
//         selectedDocs: form.documents || [],
//         docCount: Number(form.docCount || 0),
//         message: form.message || "",
//         documents: uploadedDocs,
//         enquiryDate: new Date().toISOString().slice(0,10),
//         submittedAt,
//         tracking: { pageUrl: typeof window !== "undefined" ? window.location.href : "", userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "" },
//       };

//       const res = await fetch(`${API_BASE}/hrd/hrd-attestation/enquiry`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json().catch(() => ({}));
//       if (res.status === 401) {
//         alert("Unauthorized. Please login again.");
//         redirectToLogin();
//         return;
//       }
//       if (!res.ok) throw new Error(data?.message || "Submission failed");

//       setSuccessMessage("Your HRD enquiry has been submitted successfully. Check your email for confirmation.");

//       // reset
//       setForm(initialFormState);
//       setFiles([]);
//       setCaptcha(generateCaptcha());
//     } catch (err: any) {
//       alert(err?.message || "Something went wrong");
//     }
//   };

//   const currentDocList = form.docType ? DOCUMENT_OPTIONS[form.docType] || [] : [];

//   return (
//     <section className="md:py-20 bg-white py-[100px] bg-gray">
//       <div className="max-w-6xl mx-auto px-4 md:px-6">
//         <div className="grid gap-10 md:grid-cols-[1.1fr,1fr] items-start">
//           {/* LEFT: Content */}
//           <div data-aos="fade-right">
//             <h2 className="text-3xl md:text-5xl text-[#10b9e8] font-semibold text-slate-900 mb-3">
//               HRD Attestation Services
//             </h2>
//             <div className="h-px w-24 bg-slate-300 mb-6" />

//             <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
//               Attestation of educational documents is essential for individuals
//               who wish to pursue higher education or seek employment abroad. HRD
//               Attestation is a crucial process that validates the authenticity
//               of educational certificates issued in India.
//               <span className="font-medium"> EGS Group</span> understands the
//               significance of this procedure and is here to guide you through it
//               seamlessly.
//             </p>

//             <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
//               HRD Attestation service offered by{" "}
//               <span className="font-medium">EGS Group</span> ensures that your
//               educational documents meet the necessary requirements set by
//               government authorities and are recognised internationally. Our team
//               has an in-depth understanding of the attestation process, and we
//               offer reliable and efficient services to simplify the entire
//               procedure.
//             </p>

//             <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-8">
//               We offer HRD Attestation services for a variety of educational
//               documents, including degree certificates, diploma certificates,
//               mark sheets and other academic records. Our streamlined process
//               ensures that your documents are processed correctly and on time.
//             </p>
//           </div>

//           {/* RIGHT: Form card */}
//           <div
//             data-aos="fade-left"
//             className="rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-[1px] shadow-lg"
//           >
//             <div className="rounded-2xl bg-gradient-to-b from-sky-500/80 via-blue-600/90 to-indigo-700/95 p-6 md:p-7 text-white">
//               <h3 className="text-xl md:text-2xl font-semibold mb-2">
//                 Looking for Services Related to your Attestation Needs?
//               </h3>
//               <p className="text-xs md:text-sm text-sky-100 mb-6">
//                 Share your details and our EGS Group attestation experts will
//                 connect with you to discuss the best solution for your case.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* First + Last Name */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div className="space-y-1">
//                     <label className="text-xs font-medium">First Name</label>
//                     <Input
//                       name="firstName"
//                       placeholder="First Name"
//                       value={form.firstName}
//                       onChange={handleChange}
//                       className="bg-white/90 border-none text-slate-900 placeholder:text-slate-400"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-xs font-medium">Last Name</label>
//                     <Input
//                       name="lastName"
//                       placeholder="Last Name"
//                       value={form.lastName}
//                       onChange={handleChange}
//                       className="bg-white/90 border-none text-slate-900 placeholder:text-slate-400"
//                     />
//                   </div>
//                 </div>

//                 {/* Email + Mobile */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div className="space-y-1">
//                     <label className="text-xs font-medium">Email</label>
//                     <Input
//                       type="email"
//                       name="email"
//                       placeholder="Email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="bg-white/90 border-none text-slate-900 placeholder:text-slate-400"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-xs font-medium">Mobile No</label>
//                     <Input
//                       name="mobile"
//                       placeholder="Mobile Number"
//                       value={form.mobile}
//                       onChange={handleChange}
//                       className="bg-white/90 border-none text-slate-900 placeholder:text-slate-400"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* State */}
//                 <div className="space-y-1">
//                   <label className="text-xs font-medium">State</label>
//                   <select
//                     name="state"
//                     value={form.state}
//                     onChange={handleChange}
//                     className="w-full rounded-full px-3 py-2 text-sm bg-white/90 text-slate-900 border-none outline-none"
//                   >
//                     <option value="">Select state</option>
//                     {STATES.map((s) => (
//                       <option key={s} value={s}>
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* District / City (free text) */}
//                 <div className="space-y-1">
//                   <label className="text-xs font-medium">District / City</label>
//                   <Input
//                     name="district"
//                     placeholder="District or City"
//                     value={form.district}
//                     onChange={handleChange}
//                     className="bg-white/90 border-none text-slate-900 placeholder:text-slate-400"
//                     required
//                   />
//                 </div>

//                 {/* Document type select */}
//                 <div className="space-y-1">
//                   <label className="text-xs font-medium">
//                     Select Document Type
//                   </label>
//                   <select
//                     name="docType"
//                     value={form.docType}
//                     onChange={handleChange}
//                     className="w-full rounded-full px-3 py-2 text-sm bg-white/90 text-slate-900 border-none outline-none"
//                     required
//                   >
//                     <option value="">Select document category</option>
//                     <option value="Commercial Documents">
//                       Commercial Documents
//                     </option>
//                     <option value="Personal Documents">Personal Documents</option>
//                     <option value="Educational Documents">
//                       Educational Documents
//                     </option>
//                   </select>
//                 </div>

//                 {/* Dynamic document checkboxes */}
//                 {form.docType && (
//                   <div className="space-y-2">
//                     <p className="text-[11px] font-medium">
//                       Select the document(s) you want to attest (select up to {form.docCount || "N"})
//                     </p>
//                     <div className="text-xs text-slate-200">Selected: {form.documents.length}</div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
//                       {currentDocList.map((doc) => (
//                         <label
//                           key={doc}
//                           className="flex items-center gap-2 text-[11px] md:text-xs"
//                         >
//                           <input
//                             type="checkbox"
//                             className="accent-sky-400"
//                             checked={form.documents.includes(doc)}
//                             onChange={() => handleDocumentToggle(doc)}
//                           />
//                           <span>{doc}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Number of documents + file upload */}
//                 {form.docType && (
//                   <div className="space-y-1">
//                     <label className="text-xs font-medium">
//                       Total Number of Documents
//                     </label>
//                     <Input
//                       type="number"
//                       name="docCount"
//                       min={1}
//                       placeholder="e.g., 3"
//                       value={form.docCount}
//                       onChange={handleChange}
//                       className="bg-white/90 border-none text-slate-900 placeholder:text-slate-400"
//                     />

//                     <label className="text-xs font-medium mt-2">Upload Documents</label>
//                     {Number(form.docCount || 0) > 0 ? (
//                       <div className="space-y-2">
//                         {files.length === 0 && <div className="text-xs text-slate-200">No files selected</div>}
//                         {files.map((f, idx) => (
//                           <div key={idx} className="flex items-center gap-3">
//                             <input
//                               type="file"
//                               onChange={(e) => handleFileChangeAt(idx, e.target.files?.[0] || null)}
//                               className="text-sm file:rounded-full file:px-3 file:py-1 file:bg-white/90"
//                             />
//                             <div className="text-xs text-slate-200">{f ? f.name : `File ${idx + 1} (required)`}</div>
//                           </div>
//                         ))}
//                         <div className="text-xs text-slate-200">Allowed: PDF, images. Max 5 MB per file.</div>
//                       </div>
//                     ) : (
//                       <div className="text-xs text-slate-200">Enter total number of documents to upload.</div>
//                     )}
//                   </div>
//                 )}

//                 {/* Message */}
//                 <div className="space-y-1">
//                   <label className="text-xs font-medium">Message</label>
//                   <Textarea
//                     name="message"
//                     placeholder="Share your attestation requirement or queries..."
//                     value={form.message}
//                     onChange={handleChange}
//                     className="bg-white/90 border-none text-slate-900 placeholder:text-slate-400 min-h-[90px]"
//                   />
//                 </div>

//                 {/* Submit + Success message */}
//                 <div className="pt-2 space-y-3">
//                   <Button type="submit" className="w-full rounded-full">
//                     Submit
//                   </Button>

//                   {successMessage && (
//                     <p className="text-[11px] md:text-xs text-emerald-100 text-center">
//                       {successMessage}
//                     </p>
//                   )}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
