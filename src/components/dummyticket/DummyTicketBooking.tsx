// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const COUNTRY_OPTIONS = [
//   "Bulgaria",
//   "North Macedonia",
//   "Croatia",
//   "Serbia",
//   "Russia",
//   "Montenegro",
//   "Belarus",
// ];

// type TabType = "dummyTicket" | "insurance";
// type TripType = "oneWay" | "roundTrip";

// const DummyTicketBooking = () => {
//   const [activeTab, setActiveTab] = useState<TabType>("dummyTicket");
//   const [tripType, setTripType] = useState<TripType>("oneWay");

//   const [flightForm, setFlightForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     startLocation: "",
//     departureDate: "",
//     returnDate: "",
//   });

//   const [insuranceForm, setInsuranceForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     insuranceType: "",
//     travelStart: "",
//     travelEnd: "",
//     destination: "",
//     dob: "",
//     passportFile: null as File | null,
//   });

//   const [error, setError] = useState<string | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   // ✅ API base (set in env)
//   const API_BASE =

//     "http://localhost:5000/api";

//   // ✅ token getter
//   const getToken = () => {
//     // change key if your app uses a different key
//     return typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   };

//   useEffect(() => {
//     AOS.init({
//       duration: 650,
//       offset: 90,
//       easing: "ease-out",
//       once: false,
//       mirror: true,
//     });
//   }, []);

//   useEffect(() => {
//     AOS.refresh();
//   }, [activeTab, tripType]);

//   const handleFlightChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFlightForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleInsuranceChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     if (e.target instanceof HTMLInputElement && e.target.type === "file") {
//       const file = e.target.files?.[0] ?? null;
//       setInsuranceForm((prev) => ({ ...prev, passportFile: file }));
//       return;
//     }

//     setInsuranceForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ redirect helper (works in Next + normal SPA)
//   const redirectToLogin = () => {
//     const current =
//       typeof window !== "undefined"
//         ? encodeURIComponent(window.location.pathname + window.location.search)
//         : "";
//     // If you have login route different, update it
//     window.location.href = `/login?next=${current}`;
//   };

//   // ✅ validate + build payload
//   const buildPayloadOrError = (): { ok: true; payload: any } | { ok: false; message: string } => {
//     if (activeTab === "dummyTicket") {
//       const { name, email, mobile, startLocation, departureDate, returnDate } =
//         flightForm;

//       if (!name || !email || !mobile || !startLocation || !departureDate) {
//         return { ok: false, message: "Please fill all required fields in the dummy ticket form." };
//       }
//       if (tripType === "roundTrip" && !returnDate) {
//         return { ok: false, message: "Please select a return date for round trip." };
//       }

//       return {
//         ok: true,
//         payload: {
//           tripType,
//           ...flightForm,
//           amount: 1000,
//         },
//       };
//     }

//     const {
//       name,
//       email,
//       mobile,
//       insuranceType,
//       travelStart,
//       travelEnd,
//       destination,
//       dob,
//       passportFile,
//     } = insuranceForm;

//     if (
//       !name ||
//       !email ||
//       !mobile ||
//       !insuranceType ||
//       !travelStart ||
//       !travelEnd ||
//       !destination ||
//       !dob ||
//       !passportFile
//     ) {
//       return { ok: false, message: "Please fill all required fields in the insurance form." };
//     }

//     // We'll send as FormData to support file upload
//     return {
//       ok: true,
//       payload: {
//         ...insuranceForm,
//       },
//     };
//   };

//   // ✅ API calls (two different endpoints)
//   const submitDummyTicket = async (token: string, payload: any) => {
//     // Change endpoint as per your backend
//     const res = await fetch(`${API_BASE}/dummy-ticket/create`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json().catch(() => ({}));
//     if (!res.ok) {
//       throw new Error(data?.message || "Failed to submit dummy ticket request.");
//     }
//     return data;
//   };

//   const submitInsurance = async (token: string, payload: any) => {
//     // Change endpoint as per your backend
//     // Use FormData because passportFile is a file
//     const fd = new FormData();
//     fd.append("name", payload.name);
//     fd.append("email", payload.email);
//     fd.append("mobile", payload.mobile);
//     fd.append("insuranceType", payload.insuranceType);
//     fd.append("travelStart", payload.travelStart);
//     fd.append("travelEnd", payload.travelEnd);
//     fd.append("destination", payload.destination);
//     fd.append("dob", payload.dob);
//     if (payload.passportFile) fd.append("passportFile", payload.passportFile);

//     const res = await fetch(`${API_BASE}/insurance/request`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         // NOTE: do NOT set Content-Type for FormData; browser sets boundary
//       },
//       credentials: "include",
//       body: fd,
//     });

//     const data = await res.json().catch(() => ({}));
//     if (!res.ok) {
//       throw new Error(data?.message || "Failed to submit insurance request.");
//     }
//     return data;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     // ✅ 1) check login first
//     const token = getToken();
//     if (!token) {
//       redirectToLogin();
//       return;
//     }

//     // ✅ 2) validate + build payload
//     const built = buildPayloadOrError();
//     if (!built.ok) {
//       setError(built.message);
//       return;
//     }

//     // ✅ 3) call correct API based on tab
//     setSubmitting(true);
//     try {
//       if (activeTab === "dummyTicket") {
//         await submitDummyTicket(token, built.payload);
//         alert("Dummy ticket request submitted successfully. Our team will coordinate with you shortly.");
//         // optional reset
//         setFlightForm({
//           name: "",
//           email: "",
//           mobile: "",
//           startLocation: "",
//           departureDate: "",
//           returnDate: "",
//         });
//         setTripType("oneWay");
//       } else {
//         await submitInsurance(token, built.payload);
//         alert("Insurance request submitted successfully. Our team will coordinate with you shortly.");
//         // optional reset
//         setInsuranceForm({
//           name: "",
//           email: "",
//           mobile: "",
//           insuranceType: "",
//           travelStart: "",
//           travelEnd: "",
//           destination: "",
//           dob: "",
//           passportFile: null,
//         });
//       }
//     } catch (err: any) {
//       const msg = err?.message || "Something went wrong. Please try again.";
//       setError(msg);

//       // Optional: if backend says token invalid/expired, remove and redirect
//       if (/401|unauthorized|token/i.test(msg)) {
//         localStorage.removeItem("token");
//         redirectToLogin();
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="bg-white py-12 mt-[50px] sm:py-16 lg:py-20">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
//           {/* LEFT SIDE */}
//           <div className="space-y-6" data-aos="fade-right" data-aos-delay="60">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
//                 Book Your Dummy Ticket in Minutes
//               </h2>
//               <p className="text-sm sm:text-base text-slate-600 max-w-md">
//                 Choose your option, share basic details and submit your request.
//                 Our team will process your dummy ticket or travel insurance and
//                 share the confirmation with you shortly.
//               </p>
//             </div>

//             <div
//               className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.18)]"
//               data-aos="zoom-in"
//               data-aos-delay="160"
//             >
//               <img
//                 src="/dummyticketimage.webp"
//                 alt="Dummy ticket booking"
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
//               <div className="absolute bottom-4 left-4 right-4 text-white">
//                 <ul className="space-y-2 text-sm text-white">
//                   <li>• 100% visa-friendly documentation</li>
//                   <li>• Instant request submission, processed by our team</li>
//                   <li>• Support for dummy ticket and travel insurance</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE: form */}
//           <div className="w-full" data-aos="fade-left" data-aos-delay="90">
//             <div className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden bg-white">
//               {/* Tabs */}
//               <div className="flex bg-slate-100">
//                 {[
//                   { id: "dummyTicket", label: "Dummy Ticket" },
//                   { id: "insurance", label: "Insurance" },
//                 ].map((tab) => (
//                   <button
//                     key={tab.id}
//                     type="button"
//                     onClick={() => {
//                       setActiveTab(tab.id as TabType);
//                       setError(null);
//                     }}
//                     className={`flex-1 py-2.5 text-sm sm:text-base font-medium border-b-2 transition-colors ${
//                       activeTab === tab.id
//                         ? "bg-sky-600 text-white border-sky-700"
//                         : "bg-transparent text-slate-700 border-transparent"
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
//                 {/* Error message */}
//                 {error && (
//                   <div
//                     data-aos="fade-down"
//                     className="rounded-md bg-rose-50 border border-rose-200 px-3 py-2 text-xs sm:text-sm text-rose-700"
//                   >
//                     {error}
//                   </div>
//                 )}

//                 {/* Dummy Ticket tab */}
//                 {activeTab === "dummyTicket" && (
//                   <div data-aos="fade-up" data-aos-delay="50">
//                     {/* Trip type toggle */}
//                     <div className="flex justify-center" data-aos="fade-up">
//                       <div className="inline-flex items-center gap-4 rounded-full bg-slate-100 px-5 py-2">
//                         <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
//                           <input
//                             type="radio"
//                             name="tripType"
//                             value="oneWay"
//                             checked={tripType === "oneWay"}
//                             onChange={() => setTripType("oneWay")}
//                             className="accent-sky-600"
//                           />
//                           <span>One Way</span>
//                         </label>
//                         <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
//                           <input
//                             type="radio"
//                             name="tripType"
//                             value="roundTrip"
//                             checked={tripType === "roundTrip"}
//                             onChange={() => setTripType("roundTrip")}
//                             className="accent-sky-600"
//                           />
//                           <span>Round Trip</span>
//                         </label>
//                       </div>
//                     </div>

//                     {/* Fields */}
//                     <div className="space-y-3 sm:space-y-4 mt-4">
//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="80">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           NAME
//                         </label>
//                         <input
//                           type="text"
//                           name="name"
//                           placeholder="Enter your name"
//                           value={flightForm.name}
//                           onChange={handleFlightChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>

//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="140">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           EMAIL
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           placeholder="Enter your email"
//                           value={flightForm.email}
//                           onChange={handleFlightChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>

//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="200">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           MOBILE NO
//                         </label>
//                         <input
//                           type="tel"
//                           name="mobile"
//                           placeholder="Enter your mobile number"
//                           value={flightForm.mobile}
//                           onChange={handleFlightChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>

//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="260">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           DESTINATION COUNTRY
//                         </label>
//                         <select
//                           name="startLocation"
//                           value={flightForm.startLocation}
//                           onChange={handleFlightChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
//                         >
//                           <option value="">Select destination</option>
//                           {COUNTRY_OPTIONS.map((c) => (
//                             <option key={c} value={c}>
//                               {c}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="320">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           DEPARTURE DATE
//                         </label>
//                         <input
//                           type="date"
//                           name="departureDate"
//                           value={flightForm.departureDate}
//                           onChange={handleFlightChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>

//                       {tripType === "roundTrip" && (
//                         <div className="space-y-1" data-aos="fade-up" data-aos-delay="380">
//                           <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                             RETURN DATE
//                           </label>
//                           <input
//                             type="date"
//                             name="returnDate"
//                             value={flightForm.returnDate}
//                             onChange={handleFlightChange}
//                             className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     {/* Amount box */}
//                     <div
//                       className="rounded-md border border-slate-200 px-3 py-3 bg-slate-50 flex items-center justify-between mt-4"
//                       data-aos="fade-up"
//                       data-aos-delay="440"
//                     >
//                       <span className="text-xs sm:text-sm font-semibold text-slate-600">
//                         Dummy Ticket Amount
//                       </span>
//                       <span className="text-sm sm:text-base font-bold text-sky-700">
//                         ₹ 1000
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Insurance tab */}
//                 {activeTab === "insurance" && (
//                   <div className="space-y-3 sm:space-y-4" data-aos="fade-up" data-aos-delay="50">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="80">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           NAME
//                         </label>
//                         <input
//                           type="text"
//                           name="name"
//                           value={insuranceForm.name}
//                           onChange={handleInsuranceChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>

//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="140">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           EMAIL
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={insuranceForm.email}
//                           onChange={handleInsuranceChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="200">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           MOBILE NO
//                         </label>
//                         <input
//                           type="tel"
//                           name="mobile"
//                           value={insuranceForm.mobile}
//                           onChange={handleInsuranceChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>

//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="260">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           INSURANCE TYPE
//                         </label>
//                         <select
//                           name="insuranceType"
//                           value={insuranceForm.insuranceType}
//                           onChange={handleInsuranceChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
//                         >
//                           <option value="">Select insurance type</option>
//                           <option value="Travel Insurance">Travel Insurance</option>
//                           <option value="Student Insurance">Student Insurance</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="320">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           TRAVEL START DATE
//                         </label>
//                         <input
//                           type="date"
//                           name="travelStart"
//                           value={insuranceForm.travelStart}
//                           onChange={handleInsuranceChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>

//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="380">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           TRAVEL END DATE
//                         </label>
//                         <input
//                           type="date"
//                           name="travelEnd"
//                           value={insuranceForm.travelEnd}
//                           onChange={handleInsuranceChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="440">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           DATE OF BIRTH
//                         </label>
//                         <input
//                           type="date"
//                           name="dob"
//                           value={insuranceForm.dob}
//                           onChange={handleInsuranceChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                         />
//                       </div>

//                       <div className="space-y-1" data-aos="fade-up" data-aos-delay="500">
//                         <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                           DESTINATION COUNTRY
//                         </label>
//                         <select
//                           name="destination"
//                           value={insuranceForm.destination}
//                           onChange={handleInsuranceChange}
//                           className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
//                         >
//                           <option value="">Select destination</option>
//                           {COUNTRY_OPTIONS.map((c) => (
//                             <option key={c} value={c}>
//                               {c}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="space-y-1" data-aos="fade-up" data-aos-delay="560">
//                       <label className="text-[11px] sm:text-xs font-semibold text-sky-700">
//                         PASSPORT COPY (PDF)
//                       </label>
//                       <input
//                         type="file"
//                         name="passportFile"
//                         accept="application/pdf"
//                         onChange={handleInsuranceChange}
//                         className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Submit button */}
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className={`mt-4 w-full rounded-md text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 transition-colors ${
//                     submitting ? "bg-sky-300 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"
//                   }`}
//                   data-aos="fade-up"
//                   data-aos-delay="650"
//                 >
//                   {submitting
//                     ? "Submitting..."
//                     : activeTab === "dummyTicket"
//                     ? "Buy Dummy Ticket"
//                     : "Submit Insurance Request"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DummyTicketBooking;
