"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Globe,
  Briefcase,
  CalendarClock,
  CheckCircle,
  FileText,
  ChevronRight,
  MapPin,
  Clock,
  Award,
  Headphones,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// ==================== DATA TYPES ====================
type Highlight = { label: string; value: string };
type DocBlock = { title: string; items: string[]; note?: string };
type CountryDoc = {
  title: string;
  subtitle?: string;
  highlights?: Highlight[];
  blocks: DocBlock[];
  disclaimer?: string;
  processingTime?: string;
  successRate?: string;
};

type PurposeKey = "Tourism" | "Business" | "Early Appointment";

const PURPOSE_ICONS: Record<PurposeKey, any> = {
  Tourism: Globe,
  Business: Briefcase,
  "Early Appointment": CalendarClock,
};

const PURPOSE_COLORS: Record<PurposeKey, string> = {
  Tourism: "#0f3b5f",
  Business: "#1e4d6f",
  "Early Appointment": "#2a5f82",
};

// ==================== COUNTRIES DATA ====================
const PURPOSES: Record<PurposeKey, string[]> = {
  Tourism: [
    "Dubai", "Oman", "Singapore", "Vietnam", "Russia",
    "Thailand", "Azerbaijan", "Bahrain", "Armenia", "Egypt",
  ],
  Business: ["Thailand", "Oman", "Dubai", "USA", "UAE"],
  "Early Appointment": ["USA"],
};

const CUSTOM_COUNTRIES: Record<PurposeKey, string[]> = {
  Tourism: [
    "Malaysia", "Indonesia", "Sri Lanka", "Nepal", "Turkey",
    "Georgia", "Kazakhstan", "Uzbekistan", "Qatar", "Saudi Arabia",
    "Kuwait", "Jordan", "Japan", "South Korea", "Philippines", "Cambodia",
  ],
  Business: [
    "Germany", "France", "Italy", "Netherlands", "Spain",
    "Switzerland", "Austria", "Poland", "Czech Republic", "Hungary",
    "Singapore", "Japan", "South Korea", "Canada", "Australia",
  ],
  "Early Appointment": [
    "Canada", "UK", "Germany", "France", "Italy", "Netherlands",
    "Australia", "New Zealand", "Japan", "South Korea", "Singapore", "UAE",
  ],
};

// ==================== DOCUMENTATION DATA ====================
// (Keeping your existing DOCS_BY_PURPOSE data - it's already comprehensive!)
// For brevity, I'm showing the structure - you'll keep your full data
const DOCS_BY_PURPOSE: Record<PurposeKey, Record<string, CountryDoc>> = {
  Tourism: {
    Dubai: {
      title: "Dubai/UAE Tourist e-Visa – Required Documents",
      subtitle: "Complete tourist visa documentation checklist",
      processingTime: "24-72 hours",
      successRate: "98%",
      highlights: [
        { label: "Visa type", value: "Tourist e-Visa" },
        { label: "Processing", value: "24–72 hours" },
        { label: "Validity", value: "58 days from issue" },
        { label: "Entry", value: "Single/Multiple" },
      ],
      blocks: [
        {
          title: "📄 Mandatory Documents",
          items: [
            "Passport scan (front + last page) - min. 6 months validity",
            "Recent passport-size photo (white background, clear face)",
            "Contact details (mobile + email)",
          ],
        },
        {
          title: "✈️ Supporting Documents (Recommended)",
          items: [
            "Return flight reservation",
            "Hotel booking or address in UAE",
            "If staying with relative: sponsor details + address proof",
          ],
        },
        {
          title: "💡 Important Notes",
          items: [
            "Processing depends on nationality and immigration checks",
            "Additional documents may be requested after submission",
            "Visa approval is at UAE immigration's discretion",
          ],
        },
      ],
      disclaimer: "Requirements subject to change. Final approval by UAE immigration.",
    },
    // ... rest of your Tourism data
    Oman: {
      title: "Oman Tourist e-Visa – Required Documents",
      subtitle: "Complete e-Visa documentation checklist",
      processingTime: "2-5 days",
      successRate: "95%",
      highlights: [
        { label: "Visa type", value: "Oman e-Visa" },
        { label: "Processing", value: "2–5 working days" },
        { label: "Validity", value: "30 days" },
        { label: "Entry", value: "Single/Multiple" },
      ],
      blocks: [
        {
          title: "📄 Mandatory Documents",
          items: [
            "Passport scan (min. 6 months validity)",
            "Photo (white background, face centered)",
            "Travel details (expected dates, city of entry)",
            "Hotel booking or host details",
          ],
        },
        {
          title: "📊 Financial Proof (if requested)",
          items: [
            "Bank statement / proof of funds",
            "Occupation proof (job letter / student ID)",
          ],
        },
        {
          title: "📸 Photo Guidelines",
          items: [
            "White background, no filters",
            "No glare, no cropped edges",
            "Face clearly visible, neutral expression",
          ],
          note: "Use high-quality passport photo to avoid delays",
        },
      ],
    },
    // Add other countries similarly...
  },
  Business: {
    // Your existing Business data
    Thailand: {
      title: "Thailand Business Visa – Required Documents",
      subtitle: "Complete business visa documentation",
      processingTime: "5-15 days",
      successRate: "92%",
      highlights: [
        { label: "Visa type", value: "Business Visa" },
        { label: "Processing", value: "5–15 working days" },
        { label: "Validity", value: "90 days" },
        { label: "Entry", value: "Single/Multiple" },
      ],
      blocks: [
        {
          title: "🏢 Company & Applicant Documents",
          items: [
            "Passport (min. 6 months validity)",
            "Recent photo (specification as required)",
            "Company ID card (if available)",
            "Visiting card",
          ],
        },
        {
          title: "📨 Invitation Documents",
          items: [
            "Invitation letter from host company",
            "Company registration copy (if required)",
          ],
        },
        {
          title: "💰 Financial Documents",
          items: [
            "Personal bank statement (last 6 months)",
            "Company bank statement (if required)",
            "ITR / salary slips",
          ],
        },
      ],
    },
    // ... rest of Business data
  },
  "Early Appointment": {
    USA: {
      title: "USA Early Appointment – Expedite Request",
      subtitle: "Documents needed for emergency appointment",
      processingTime: "1-7 days (subject to approval)",
      successRate: "85%",
      highlights: [
        { label: "Service Type", value: "Appointment Expedite" },
        { label: "Decision", value: "Embassy discretion" },
        { label: "Response Time", value: "2-5 business days" },
        { label: "Success Rate", value: "85% (with strong proof)" },
      ],
      blocks: [
        {
          title: "📋 Mandatory Documents",
          items: [
            "Valid passport",
            "Existing appointment confirmation (if booked)",
            "DS-160 confirmation page",
            "Clear reason for expedite request",
          ],
        },
        {
          title: "🚨 Urgency Proof (Any one or more)",
          items: [
            "Medical emergency documents (hospital letter/summary)",
            "University intake letter with joining date",
            "Company urgent travel letter (signed and stamped)",
            "Conference/event invitation with dates",
          ],
        },
        {
          title: "📅 Preferred Details",
          items: [
            "3 preferred appointment dates",
            "Complete contact details (mobile + email)",
            "Current location/city",
          ],
        },
      ],
      disclaimer: "Approval depends on embassy decision and urgency proof strength.",
    },
    // ... rest of Early Appointment data
  },
};

// ==================== HELPER FUNCTION ====================
function getDocs(purpose: PurposeKey, country: string): CountryDoc | null {
  return DOCS_BY_PURPOSE[purpose]?.[country] ?? null;
}

// ==================== MAIN COMPONENT ====================
export default function VisaDocumentRequirements() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
      offset: 60,
      easing: "ease-out-cubic",
    });
  }, []);

  const [activePurpose, setActivePurpose] = useState<PurposeKey>("Tourism");
  const [selectedCountry, setSelectedCountry] = useState<string>(PURPOSES.Tourism[0]);
  const [customCountry, setCustomCountry] = useState<string>("");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const countries = PURPOSES[activePurpose];
  const customList = CUSTOM_COUNTRIES[activePurpose];
  const activeColor = PURPOSE_COLORS[activePurpose];
  const PurposeIcon = PURPOSE_ICONS[activePurpose];

  // Reset selection when purpose changes
  useEffect(() => {
    setSelectedCountry(PURPOSES[activePurpose][0] || "");
    setCustomCountry("");
  }, [activePurpose]);

  const activeCountry = customCountry || selectedCountry;
  const doc = useMemo(
    () => getDocs(activePurpose, activeCountry),
    [activePurpose, activeCountry]
  );

  const handleCountrySelect = useCallback((country: string) => {
    setSelectedCountry(country);
    setCustomCountry("");
  }, []);

  const handleCustomSelect = useCallback((value: string) => {
    setCustomCountry(value);
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 shadow-sm border border-slate-200">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-500">Visa Guide</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Document Requirements
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about visa documentation. Select your purpose and country to get started.
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-rose-400 to-rose-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ==================== LEFT PANEL ==================== */}
          <div
            data-aos="fade-right"
            data-aos-duration="600"
            className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
          >
            {/* Purpose Tabs */}
            <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
              <p className="text-sm font-semibold text-slate-600 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                SELECT TRAVEL PURPOSE
              </p>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(PURPOSES) as PurposeKey[]).map((purpose) => {
                  const Icon = PURPOSE_ICONS[purpose];
                  const isActive = activePurpose === purpose;
                  const color = PURPOSE_COLORS[purpose];
                  return (
                    <button
                      key={purpose}
                      onClick={() => setActivePurpose(purpose)}
                      className={`group relative px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2
                        ${
                          isActive
                            ? "text-white shadow-lg"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      style={isActive ? { backgroundColor: color } : {}}
                    >
                      <Icon className="w-4 h-4" />
                      {purpose}
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/50 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Countries Grid */}
            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold text-slate-600 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                SELECT DESTINATION COUNTRY
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {countries.map((country) => {
                  const isActive = !customCountry && selectedCountry === country;
                  const isHovered = hoveredCountry === country;
                  return (
                    <button
                      key={country}
                      onClick={() => handleCountrySelect(country)}
                      onMouseEnter={() => setHoveredCountry(country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      className={`relative text-sm md:text-base rounded-xl px-3 py-2.5 text-left transition-all duration-200 overflow-hidden
                        ${
                          isActive
                            ? "text-white font-medium shadow-md"
                            : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm"
                        }`}
                      style={isActive ? { backgroundColor: activeColor } : {}}
                    >
                      <span className="relative z-10 flex items-center justify-between">
                        {country}
                        {isActive && <CheckCircle className="w-4 h-4" />}
                      </span>
                      {isHovered && !isActive && (
                        <div
                          className="absolute inset-0 opacity-10 transition-opacity duration-200"
                          style={{ backgroundColor: activeColor }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-slate-400 flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                Click any country to view requirements
              </p>
            </div>

            {/* Custom Country */}
            <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50/50">
              <p className="text-sm font-semibold text-slate-600 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                OR SELECT FROM EXTENDED LIST
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={customCountry}
                  onChange={(e) => handleCustomSelect(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-opacity-50 transition"
                  style={{ focusRingColor: activeColor }}
                >
                  <option value="">Choose a country</option>
                  {customList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {customCountry && (
                  <button
                    onClick={() => handleCustomSelect("")}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-100 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {customList.length}+ additional countries available
              </p>
            </div>
          </div>

          {/* ==================== RIGHT PANEL ==================== */}
          <div
            data-aos="fade-left"
            data-aos-duration="600"
            data-aos-delay="100"
            className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
          >
            {!doc ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  Documents Not Configured
                </h3>
                <p className="text-amber-700">
                  Add configuration for {activeCountry} in DOCS_BY_PURPOSE
                </p>
              </div>
            ) : (
              <>
                {/* Header with badge */}
                <div
                  className="p-6 md:p-8 text-white"
                  style={{ backgroundColor: activeColor }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm flex items-center gap-1">
                      <PurposeIcon className="w-3 h-3" />
                      {activePurpose}
                    </span>
                    {doc.processingTime && (
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {doc.processingTime}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{doc.title}</h2>
                  {doc.subtitle && (
                    <p className="text-white/80 text-sm">{doc.subtitle}</p>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Stats */}
                  {doc.successRate && (
                    <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                      <Award className="w-8 h-8 text-emerald-600" />
                      <div>
                        <p className="text-sm text-emerald-700 font-medium">Success Rate</p>
                        <p className="text-xl font-bold text-emerald-800">{doc.successRate}</p>
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {doc.highlights?.length ? (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {doc.highlights.map((h, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border-l-4 p-3 bg-slate-50"
                          style={{ borderLeftColor: activeColor }}
                        >
                          <p className="text-xs text-slate-500">{h.label}</p>
                          <p className="text-sm font-semibold text-slate-800">{h.value}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Document Blocks */}
                  <div className="space-y-4">
                    {doc.blocks.map((block, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition"
                      >
                        <div
                          className="px-4 py-3 font-semibold text-sm text-white"
                          style={{ backgroundColor: activeColor }}
                        >
                          {block.title}
                        </div>
                        <ul className="p-4 space-y-2">
                          {block.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: activeColor }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {block.note && (
                          <div className="px-4 pb-4">
                            <p className="text-xs text-slate-400 bg-slate-50 p-2 rounded">
                              💡 {block.note}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Disclaimer */}
                  {doc.disclaimer && (
                    <p className="mt-6 text-xs text-slate-400 italic border-t border-slate-100 pt-4">
                      ⚠️ {doc.disclaimer}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      className="flex-1 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:shadow-lg flex items-center justify-center gap-2"
                      style={{ backgroundColor: activeColor }}
                    >
                      Apply for Visa
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="flex-1 py-3 rounded-xl border-2 text-slate-700 font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-2">
                      <Headphones className="w-4 h-4" />
                      Talk to Expert
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-xs text-slate-400">
          📋 Document requirements are regularly updated. Contact our visa experts for personalized assistance.
        </p>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  );
}