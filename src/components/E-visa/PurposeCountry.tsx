import React, { useEffect, useMemo, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
/**
 * DATA TYPES
 */
type Highlight = { label: string; value: string };
type DocBlock = { title: string; items: string[]; note?: string };
type CountryDoc = {
  title: string;
  subtitle?: string;
  highlights?: Highlight[];
  blocks: DocBlock[];
  disclaimer?: string;
};

type PurposeKey = "Tourism" | "Business" | "Early Appointment";

/**
 * PURPOSE -> TAB COUNTRIES
 */
const PURPOSES: Record<PurposeKey, string[]> = {
  Tourism: [
    "Dubai",
    "Oman",
    "Singapore",
    "Vietnam",
    "Russia",
    "Thailand",
    "Azerbaijan",
    "Bahrain",
    "Armenia",
    "Egypt",
  ],
  Business: ["Thailand", "Oman", "Dubai", "USA", "UAE"],
  "Early Appointment": ["USA"],
};

/**
 * PURPOSE -> CUSTOM COUNTRIES (10–20)
 */
const CUSTOM_COUNTRIES: Record<PurposeKey, string[]> = {
  Tourism: [
    "Malaysia",
    "Indonesia",
    "Sri Lanka",
    "Nepal",
    "Turkey",
    "Georgia",
    "Kazakhstan",
    "Uzbekistan",
    "Qatar",
    "Saudi Arabia",
    "Kuwait",
    "Jordan",
    "Japan",
    "South Korea",
    "Philippines",
    "Cambodia",
  ],
  Business: [
    "Germany",
    "France",
    "Italy",
    "Netherlands",
    "Spain",
    "Switzerland",
    "Austria",
    "Poland",
    "Czech Republic",
    "Hungary",
    "Singapore",
    "Japan",
    "South Korea",
    "Canada",
    "Australia",
  ],
  "Early Appointment": [
    "Canada",
    "UK",
    "Germany",
    "France",
    "Italy",
    "Netherlands",
    "Australia",
    "New Zealand",
    "Japan",
    "South Korea",
    "Singapore",
    "UAE",
  ],
};

/**
 * IMPORTANT:
 * Purpose -> Country -> Docs
 *
 * ✅ Here you can fully customize every country (tab countries + custom countries).
 * ✅ If any country missing, UI will show "Not configured".
 *
 * Start with 10-20+ countries. Add more anytime.
 */
const DOCS_BY_PURPOSE: Record<PurposeKey, Record<string, CountryDoc>> = {
  Tourism: {
    Dubai: {
      title: "Dubai/UAE Tourist e-Visa – Required Documents",
      subtitle: "Tourist visa documentation checklist (e-Visa / e-permit)",
      highlights: [
        { label: "Visa type", value: "Tourist e-Visa" },
        { label: "Processing time", value: "24–72 hours (avg.)" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "Single/Multiple (as per approval)" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (front + last page if applicable), min. 6 months validity",
            "Recent photo (white background, clear face, no glare)",
            "Contact details (mobile + email)",
          ],
        },
        {
          title: "Recommended Supporting",
          items: [
            "Return flight reservation",
            "Hotel booking / address in UAE",
            "If staying with relative: sponsor details + address proof (as required)",
          ],
        },
        {
          title: "Notes",
          items: [
            "Processing depends on nationality and immigration checks",
            "Additional documents may be requested after submission",
          ],
        },
      ],
      disclaimer:
        "Requirements can change. Final approval is at the discretion of UAE immigration.",
    },

    Oman: {
      title: "Oman Tourist e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Oman e-Visa" },
        { label: "Processing time", value: "2–5 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "Single/Multiple (as per approval)" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (min. 6 months validity)",
            "Photo (white background, face centered, no shadows)",
            "Travel details (expected dates, city of entry)",
            "Hotel booking / accommodation proof OR host details",
          ],
        },
        {
          title: "If Requested (Case to Case)",
          items: [
            "Bank statement / proof of funds",
            "Occupation proof (job letter / student ID)",
            "Previous travel history (if requested)",
          ],
        },
        {
          title: "Photo Guidelines",
          items: [
            "White background, no filters",
            "No glare, no cropped edges",
            "Face clearly visible, neutral expression",
          ],
          note:
            "If photo is rejected, application gets delayed. Use a high-quality passport photo.",
        },
      ],
      disclaimer:
        "Final requirements depend on nationality and immigration rules; additional documents may be requested.",
    },

    Singapore: {
      title: "Singapore Tourist Visa (e-Visa/ETA) – Required Documents",
      subtitle: "Tourist documentation checklist (as per country requirements)",
      highlights: [
        { label: "Visa type", value: "Tourist Visa / ETA (as applicable)" },
        { label: "Processing time", value: "3–7 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "Single/Multiple (as per approval)" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (min. 6 months validity)",
            "Recent photo (white background)",
            "Travel itinerary (brief)",
            "Hotel booking proof",
          ],
        },
        {
          title: "Financial Proof",
          items: [
            "Bank statement (last 3–6 months) if required",
            "Salary slips / ITR (if required)",
          ],
        },
        {
          title: "Notes",
          items: [
            "Requirements vary by nationality",
            "Embassy/agent may request additional documents",
          ],
        },
      ],
    },

    Vietnam: {
      title: "Vietnam Tourist e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Vietnam e-Visa" },
        { label: "Processing time", value: "3–5 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "Single/Multiple (as per approval)" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (bio page) – min. 6 months validity",
            "Digital photo (white background)",
            "Entry/exit dates + port of entry selection",
          ],
        },
        {
          title: "Important Notes",
          items: [
            "Match passport details exactly (name, passport no., DOB)",
            "Incorrect info may cause rejection/delay",
          ],
        },
      ],
    },

    Russia: {
      title: "Russia Tourist Visa – Required Documents",
      subtitle: "Tourist visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa" },
        { label: "Processing time", value: "7–15 working days (avg.)" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "As per visa issued" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport (min. 6 months validity beyond stay)",
            "Photo (visa specification)",
            "Hotel booking",
            "Travel insurance (if required)",
          ],
        },
        {
          title: "Invitation/Voucher (If applicable)",
          items: [
            "Tourist voucher / invitation from authorized entity (as required)",
          ],
        },
      ],
    },

    Thailand: {
      title: "Thailand Tourist Visa / e-Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa / e-Visa (as applicable)" },
        { label: "Processing time", value: "3–10 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "Single/Multiple (as per approval)" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (min. 6 months validity)",
            "Photo (white background)",
            "Return ticket",
            "Hotel booking",
          ],
        },
        {
          title: "Financial Proof",
          items: [
            "Bank statement (last 3–6 months) as required",
            "Employment proof / business proof (if required)",
          ],
        },
      ],
    },

    Azerbaijan: {
      title: "Azerbaijan Tourist e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "ASAN Visa (e-Visa)" },
        { label: "Processing time", value: "3 working days (standard)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "Single entry (commonly)" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (bio page)",
            "Digital photo",
            "Travel dates + contact details",
          ],
        },
        {
          title: "Notes",
          items: ["Ensure passport validity meets entry rules."],
        },
      ],
    },

    Bahrain: {
      title: "Bahrain Tourist e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Bahrain e-Visa" },
        { label: "Processing time", value: "3–7 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (min. 6 months validity)",
            "Photo (white background)",
            "Hotel booking / accommodation proof",
            "Return ticket (recommended)",
          ],
        },
      ],
    },

    Armenia: {
      title: "Armenia Tourist e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Armenia e-Visa" },
        { label: "Processing time", value: "3–7 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: ["Passport scan", "Photo", "Travel details", "Accommodation proof"],
        },
      ],
    },

    Egypt: {
      title: "Egypt Tourist e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Egypt e-Visa" },
        { label: "Processing time", value: "3–7 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "Single/Multiple (as per approval)" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (min. 6 months validity)",
            "Photo (white background)",
            "Travel itinerary (brief)",
          ],
        },
        {
          title: "Recommended Supporting",
          items: ["Hotel booking", "Return ticket"],
        },
      ],
    },

    // --- Custom countries (Tourism) examples (each has unique docs object) ---
    Malaysia: {
      title: "Malaysia Tourist Visa – Required Documents",
      subtitle: "Tourist visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa / e-Visa (as applicable)" },
        { label: "Processing time", value: "3–10 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport scan (min. 6 months validity)",
            "Photo (white background)",
            "Return ticket reservation",
            "Hotel booking",
          ],
        },
        {
          title: "Financial Proof",
          items: ["Bank statement (last 3–6 months) if required"],
        },
        {
          title: "Notes",
          items: ["Requirements vary based on nationality."],
        },
      ],
    },

    Indonesia: {
      title: "Indonesia Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa / e-Visa (as applicable)" },
        { label: "Processing time", value: "2–7 working days (avg.)" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: ["Passport scan", "Photo", "Travel dates", "Accommodation proof"],
        },
        {
          title: "Notes",
          items: ["Passport validity rules apply."],
        },
      ],
    },

    SriLanka: {
      title: "Sri Lanka ETA / Tourist Visa – Required Documents",
      subtitle: "Tourist ETA documentation checklist",
      highlights: [
        { label: "Visa type", value: "ETA (as applicable)" },
        { label: "Processing time", value: "24–72 hours (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        { title: "Mandatory Documents", items: ["Passport scan", "Photo", "Travel dates"] },
        { title: "Recommended", items: ["Return ticket", "Hotel booking"] },
      ],
    },

    Nepal: {
      title: "Nepal Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa (on arrival / as applicable)" },
        { label: "Processing time", value: "As per port/authority" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        { title: "Documents", items: ["Passport", "Photo", "Travel plan (basic)"] },
      ],
    },

    Turkey: {
      title: "Turkey e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Turkey e-Visa (eligible nationals)" },
        { label: "Processing time", value: "Within 24 hours (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: ["Passport scan", "Photo", "Valid email", "Card payment (if applicable)"],
        },
        {
          title: "Notes",
          items: ["Eligibility depends on nationality and supporting documents."],
        },
      ],
    },

    Georgia: {
      title: "Georgia Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa (as applicable)" },
        { label: "Processing time", value: "5–15 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photo", "Hotel booking", "Return ticket"] },
        { title: "Financial", items: ["Bank statement (if required)"] },
      ],
    },

    Kazakhstan: {
      title: "Kazakhstan Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa (as applicable)" },
        { label: "Processing time", value: "5–15 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [{ title: "Documents", items: ["Passport", "Photo", "Travel plan"] }],
    },

    Uzbekistan: {
      title: "Uzbekistan e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "e-Visa (as applicable)" },
        { label: "Processing time", value: "2–5 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [{ title: "Mandatory", items: ["Passport scan", "Photo", "Travel dates"] }],
    },

    Qatar: {
      title: "Qatar Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa / e-Visa (as applicable)" },
        { label: "Processing time", value: "2–7 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        { title: "Mandatory", items: ["Passport scan", "Photo", "Hotel booking", "Return ticket"] },
        { title: "Notes", items: ["Requirements vary by nationality."] },
      ],
    },

    "Saudi Arabia": {
      title: "Saudi Arabia Tourist e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist e-Visa" },
        { label: "Processing time", value: "1–5 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "Multiple/Single (as per approval)" },
      ],
      blocks: [
        { title: "Mandatory", items: ["Passport scan", "Photo", "Travel details"] },
        { title: "Recommended", items: ["Hotel booking", "Return ticket"] },
      ],
    },

    Kuwait: {
      title: "Kuwait Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa (as applicable)" },
        { label: "Processing time", value: "3–10 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [{ title: "Documents", items: ["Passport scan", "Photo", "Travel plan"] }],
    },

    Jordan: {
      title: "Jordan Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa (as applicable)" },
        { label: "Processing time", value: "As per authority" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [{ title: "Documents", items: ["Passport", "Photo", "Hotel booking (recommended)"] }],
    },

    Japan: {
      title: "Japan Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist (strict documentation)",
      highlights: [
        { label: "Visa type", value: "Tourist Visa" },
        { label: "Processing time", value: "7–15 working days (avg.)" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "As per visa issued" },
      ],
      blocks: [
        {
          title: "Mandatory Documents",
          items: [
            "Passport (original + copies as required)",
            "Visa form (as applicable)",
            "Photo (specification)",
            "Cover letter (purpose of visit)",
            "Detailed itinerary",
            "Flight and hotel bookings",
          ],
        },
        {
          title: "Financial & Employment",
          items: [
            "Bank statement (last 6 months)",
            "ITR / salary slips",
            "NOC from employer / business proof",
          ],
        },
      ],
    },

    "South Korea": {
      title: "South Korea Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa" },
        { label: "Processing time", value: "7–15 working days (avg.)" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "As per visa issued" },
      ],
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photo", "Itinerary", "Hotel booking", "Return ticket"] },
        { title: "Financial", items: ["Bank statement", "Employment proof"] },
      ],
    },

    Philippines: {
      title: "Philippines Tourist Visa – Required Documents",
      subtitle: "Tourist documentation checklist",
      highlights: [
        { label: "Visa type", value: "Tourist Visa" },
        { label: "Processing time", value: "7–15 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [{ title: "Mandatory", items: ["Passport", "Photo", "Hotel booking", "Return ticket"] }],
    },

    Cambodia: {
      title: "Cambodia e-Visa – Required Documents",
      subtitle: "Tourist e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Cambodia e-Visa" },
        { label: "Processing time", value: "3 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "Single entry (commonly)" },
      ],
      blocks: [{ title: "Mandatory", items: ["Passport scan", "Photo", "Travel dates"] }],
    },
  },

  Business: {
    Thailand: {
      title: "Thailand Business Visa – Required Documents",
      subtitle: "Business visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Business Visa / e-Visa (as applicable)" },
        { label: "Processing time", value: "5–15 working days (avg.)" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        { title: "Company & Applicant", items: ["Passport", "Photo", "Company ID/letter", "Visiting card"] },
        { title: "Invitation", items: ["Invitation letter from host company", "Company registration copy (if required)"] },
        { title: "Financial", items: ["Bank statement", "Company bank statement (if required)"] },
      ],
    },

    Oman: {
      title: "Oman Business e-Visa – Required Documents",
      subtitle: "Business e-Visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Business e-Visa (as applicable)" },
        { label: "Processing time", value: "2–7 working days (avg.)" },
        { label: "Validity", value: "As per approval" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        { title: "Mandatory", items: ["Passport scan", "Photo", "Company letter / visiting card"] },
        { title: "Host Details", items: ["Invitation letter (recommended)", "Host company address + contact"] },
      ],
    },

    Dubai: {
      title: "UAE Business Visa – Required Documents",
      subtitle: "Business visa documentation checklist",
      highlights: [
        { label: "Visa type", value: "Business e-Visa" },
        { label: "Processing time", value: "24–72 hours (avg.)" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "As per approval" },
      ],
      blocks: [
        { title: "Mandatory", items: ["Passport scan", "Photo", "Company visiting card"] },
        { title: "Business Support", items: ["Invitation letter", "Meeting details (agenda/location)"] },
      ],
    },

    USA: {
      title: "USA Business Visa (B1) – Required Documents",
      subtitle: "Business (B1) documentation checklist",
      highlights: [
        { label: "Visa type", value: "B1 (Business)" },
        { label: "Processing time", value: "Appointment based" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "Multiple (commonly)" },
      ],
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photo", "DS-160 confirmation", "Appointment confirmation"] },
        { title: "Business Proof", items: ["Invitation letter", "Company letter", "Meeting agenda"] },
        { title: "Financial", items: ["Bank statement", "ITR / salary slips"] },
      ],
    },

    UAE: {
      title: "UAE Business Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport scan", "Photo", "Company visiting card"] },
        { title: "Recommended", items: ["Invitation letter", "Hotel booking", "Return ticket"] },
      ],
    },

    // Custom Business countries examples
    Germany: {
      title: "Germany Business Schengen Visa – Required Documents",
      subtitle: "Business Schengen documentation checklist",
      highlights: [
        { label: "Visa type", value: "Schengen (Business)" },
        { label: "Processing time", value: "Appointment based" },
        { label: "Validity", value: "As per visa issued" },
        { label: "Entry", value: "Single/Multiple (as per approval)" },
      ],
      blocks: [
        { title: "Applicant", items: ["Passport", "Photos", "Visa form"] },
        { title: "Business", items: ["Invitation letter", "Company cover letter", "Trade license (if required)"] },
        { title: "Financial", items: ["Bank statement", "ITR", "Salary slips"] },
        { title: "Travel", items: ["Flight booking", "Hotel booking", "Travel insurance"] },
      ],
    },

    France: {
      title: "France Business Schengen Visa – Required Documents",
      subtitle: "Business Schengen documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Visa form", "Invitation letter"] },
        { title: "Financial & Travel", items: ["Bank statement", "Insurance", "Hotel/flight bookings"] },
      ],
    },

    Italy: {
      title: "Italy Business Schengen Visa – Required Documents",
      subtitle: "Business Schengen documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Visa form", "Invitation letter"] },
        { title: "Financial & Travel", items: ["Bank statement", "Insurance", "Hotel/flight bookings"] },
      ],
    },

    Netherlands: {
      title: "Netherlands Business Schengen Visa – Required Documents",
      subtitle: "Business Schengen documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Visa form", "Invitation letter"] },
        { title: "Financial & Travel", items: ["Bank statement", "Insurance", "Hotel/flight bookings"] },
      ],
    },

    Spain: {
      title: "Spain Business Schengen Visa – Required Documents",
      subtitle: "Business Schengen documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Visa form", "Invitation letter"] },
        { title: "Financial & Travel", items: ["Bank statement", "Insurance", "Hotel/flight bookings"] },
      ],
    },

    Switzerland: {
      title: "Switzerland Business Schengen Visa – Required Documents",
      subtitle: "Business Schengen documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Visa form", "Invitation letter"] },
        { title: "Financial & Travel", items: ["Bank statement", "Insurance", "Hotel/flight bookings"] },
      ],
    },

    Austria: {
      title: "Austria Business Schengen Visa – Required Documents",
      subtitle: "Business Schengen documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Visa form", "Invitation letter"] },
        { title: "Financial & Travel", items: ["Bank statement", "Insurance", "Hotel/flight bookings"] },
      ],
    },

    Poland: {
      title: "Poland Business Schengen Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Invitation letter"] },
        { title: "Supporting", items: ["Company cover letter", "Bank statement", "Insurance"] },
      ],
    },

    "Czech Republic": {
      title: "Czech Republic Business Schengen Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Visa form", "Invitation letter"] },
        { title: "Supporting", items: ["Bank statement", "Insurance", "Hotel/flight bookings"] },
      ],
    },

    Hungary: {
      title: "Hungary Business Schengen Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photos", "Invitation letter"] },
        { title: "Supporting", items: ["Bank statement", "Insurance", "Hotel/flight bookings"] },
      ],
    },

    Singapore: {
      title: "Singapore Business Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photo", "Invitation letter (if available)"] },
        { title: "Company", items: ["Company letter", "Meeting details"] },
      ],
    },

    Japan: {
      title: "Japan Business Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photo", "Invitation letter", "Company letter"] },
        { title: "Financial", items: ["Bank statement", "ITR", "Salary slips"] },
      ],
    },

    "South Korea": {
      title: "South Korea Business Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photo", "Invitation letter", "Company letter"] },
        { title: "Financial", items: ["Bank statement", "Salary slips"] },
      ],
    },

    Canada: {
      title: "Canada Business Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photo", "Forms as required"] },
        { title: "Supporting", items: ["Invitation letter", "Company letter", "Financial proof"] },
      ],
    },

    Australia: {
      title: "Australia Business Visa – Required Documents",
      subtitle: "Business documentation checklist",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Photo", "Application form"] },
        { title: "Supporting", items: ["Invitation letter", "Company letter", "Financial proof"] },
      ],
    },
  },

  "Early Appointment": {
    USA: {
      title: "USA Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment request",
      highlights: [
        { label: "Type", value: "Appointment expedite support" },
        { label: "Decision", value: "Embassy discretion" },
        { label: "Timeline", value: "Varies by case" },
        { label: "Tip", value: "Provide strong urgency proof" },
      ],
      blocks: [
        {
          title: "Mandatory",
          items: [
            "Passport (valid)",
            "Existing appointment details (if already booked)",
            "DS-160 confirmation (if applicable)",
            "Reason for expedite (clear statement)",
          ],
        },
        {
          title: "Urgency Proof (Any one or more)",
          items: [
            "Medical emergency documents (hospital letter/summary)",
            "University intake / admission letter with joining date",
            "Company urgent travel letter (signed/stamped)",
            "Conference/event invitation with dates",
          ],
        },
        {
          title: "Supporting",
          items: [
            "Preferred dates (3 options)",
            "Contact details (mobile/email)",
          ],
        },
      ],
      disclaimer:
        "Early appointment approval depends on embassy decision and the strength of your documents.",
    },

    // Custom countries (Early Appointment)
    Canada: {
      title: "Canada Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment request",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Existing appointment details", "Reason for expedite"] },
        { title: "Urgency Proof", items: ["University intake letter", "Medical documents", "Company letter"] },
      ],
    },

    UK: {
      title: "UK Early Appointment – Required Documents",
      subtitle: "Documents needed for priority/early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Booking reference (if any)", "Reason for urgency"] },
        { title: "Urgency Proof", items: ["Intake letter", "Medical emergency", "Work letter"] },
      ],
    },

    Germany: {
      title: "Germany Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    France: {
      title: "France Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    Italy: {
      title: "Italy Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    Netherlands: {
      title: "Netherlands Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    Australia: {
      title: "Australia Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    "New Zealand": {
      title: "New Zealand Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    Japan: {
      title: "Japan Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    "South Korea": {
      title: "South Korea Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    Singapore: {
      title: "Singapore Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Application reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Admission letter", "Employer letter", "Medical documents"] },
      ],
    },

    UAE: {
      title: "UAE Early Appointment – Required Documents",
      subtitle: "Documents needed for early appointment support",
      blocks: [
        { title: "Mandatory", items: ["Passport", "Booking reference", "Reason statement"] },
        { title: "Urgency Proof", items: ["Medical documents / urgent travel proof"] },
      ],
    },
  },
};

/**
 * Helper: if docs not configured, show a safe warning UI
 */
function getDocs(purpose: PurposeKey, country: string): CountryDoc | null {
  return DOCS_BY_PURPOSE[purpose]?.[country] ?? null;
}

export default function VisaPurposeTwoColumnFullCustom() {
    
    useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,   // ✅ repeat on every scroll in/out
      offset: 80,
      easing: "ease-in-out",
     
    });
  }, []);

  const [activePurpose, setActivePurpose] = useState<PurposeKey>("Tourism");
  const [selectedCountry, setSelectedCountry] = useState<string>(PURPOSES.Tourism[0]);
  const [customCountry, setCustomCountry] = useState<string>("");

  const countries = PURPOSES[activePurpose];
  const customList = CUSTOM_COUNTRIES[activePurpose];

  // when tab changes
  useEffect(() => {
    setSelectedCountry(PURPOSES[activePurpose][0] || "");
    setCustomCountry("");
  }, [activePurpose]);

  const activeCountry = customCountry || selectedCountry;

  const doc = useMemo(() => getDocs(activePurpose, activeCountry), [activePurpose, activeCountry]);

  return (
    <section className="w-full bg-white text-slate-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Document requirements
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div  data-aos="fade-right"  className="bg-white border border-slate-200 rounded-2xl px-6 md:px-8 py-7 shadow-lg shadow-slate-200/70">
            <div className="mb-6">
              <p className="text-sm md:text-base font-medium mb-3">Select a purpose:</p>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(PURPOSES) as PurposeKey[]).map((purpose) => {
                  const isActive = activePurpose === purpose;
                  return (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => setActivePurpose(purpose)}
                      className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition
                        ${
                          isActive
                            ? "bg-rose-500 text-white shadow-md shadow-rose-400/50"
                            : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                    >
                      {purpose}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm md:text-base font-medium mb-3">Select a country:</p>

              <div className="grid grid-cols-2 gap-2">
                {countries.map((country) => {
                  const isActive = !customCountry && selectedCountry === country;
                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setCustomCountry("");
                      }}
                      className={`text-sm md:text-base rounded-xl px-3 py-2 text-left transition border
                        ${
                          isActive
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      {country}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-xs md:text-sm text-slate-500">
                Click any country to view required documents on the right.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-200">
              <p className="text-sm md:text-base font-medium mb-3">Custom country selection:</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={customCountry}
                  onChange={(e) => setCustomCountry(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm md:text-base bg-white"
                >
                  <option value="">Select a custom country</option>
                  {customList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setCustomCountry("")}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm md:text-base hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>

              <p className="mt-3 text-xs md:text-sm text-slate-500">
                Custom country selection is also fully country-wise configurable.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div  data-aos="fade-left" className="bg-white border border-slate-200 rounded-2xl px-6 md:px-8 py-7 shadow-lg shadow-slate-200/70">
            <div className="mb-5">
              <p className="text-xs md:text-sm text-slate-500">Showing documents for</p>
              <h2 className="text-xl md:text-2xl font-semibold">{activeCountry}</h2>
              <p className="mt-1 text-sm md:text-base text-slate-600">
                Purpose: <span className="font-medium">{activePurpose}</span>
              </p>
            </div>

            {!doc ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="text-base md:text-lg font-semibold text-amber-900">
                  Documents not configured for this country
                </h3>
                <p className="mt-2 text-sm md:text-base text-amber-800">
                  Please add configuration in <span className="font-mono">DOCS_BY_PURPOSE.{activePurpose}["{activeCountry}"]</span>.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">{doc.title}</h3>
                  {doc.subtitle ? (
                    <p className="mt-1 text-sm md:text-base text-slate-600">{doc.subtitle}</p>
                  ) : null}
                </div>

                {doc.highlights?.length ? (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {doc.highlights.map((h) => (
                      <div key={h.label} className="rounded-xl border border-slate-200 p-3">
                        <p className="text-xs text-slate-500">{h.label}</p>
                        <p className="text-sm md:text-base font-medium text-slate-900">{h.value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="space-y-5">
                  {doc.blocks.map((b) => (
                    <div key={b.title} className="rounded-2xl border border-slate-200 p-4">
                      <h4 className="text-base md:text-lg font-semibold mb-3">{b.title}</h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-slate-700">
                        {b.items.map((it, idx) => (
                          <li key={`${b.title}-${idx}`}>{it}</li>
                        ))}
                      </ul>
                      {b.note ? (
                        <p className="mt-3 text-xs md:text-sm text-slate-500">{b.note}</p>
                      ) : null}
                    </div>
                  ))}
                </div>

                {doc.disclaimer ? (
                  <p className="mt-6 text-xs md:text-sm text-slate-500">{doc.disclaimer}</p>
                ) : null}

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-rose-500 text-white px-4 py-2 text-sm md:text-base font-medium shadow-md shadow-rose-400/40 hover:opacity-95"
                  >
                    Apply e-Visa
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm md:text-base hover:bg-slate-50"
                  >
                    Talk to an expert
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 text-xs md:text-sm text-slate-500 text-center">
          Admin note: All document lists are fully country-wise configurable in <span className="font-mono">DOCS_BY_PURPOSE</span>.
        </p>
      </div>
    </section>
  );
}
