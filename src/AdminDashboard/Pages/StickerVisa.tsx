import React, { useEffect, useMemo, useState } from "react";
import {
  Paperclip,
  ExternalLink,
  Pencil,
  Trash2,
  Search,
  Filter,
  X,
} from "lucide-react";

/* ---------- TYPES ---------- */

type DocFile = {
  name: string;
  url: string;
  type: "pdf" | "image" | "other";
};

type StickerVisaRow = {
  id: string;
  email: string;
  contact: string;
  country: string;
  visaType: "Tourist" | "Work" | "Business";
  noOfDays: number;
  files: DocFile[];
  status: "Pending" | "Approved" | "Rejected" | "Dispatched" | "Received";
  payment: "Paid" | "Pending";
  createdAt: string;
};

/* ---------- CONSTANTS ---------- */

const COUNTRY_OPTIONS = [
  "All Countries",
  "Dubai",
  "UAE",
  "Oman",
  "Singapore",
  "Vietnam",
  "Thailand",
  "Russia",
  "Azerbaijan",
  "Bahrain",
  "Armenia",
  "Egypt",
  "Malaysia",
  "Indonesia",
  "Sri Lanka",
  "Turkey",
  "Qatar",
  "Saudi Arabia",
  "Kuwait",
  "Jordan",
  "Japan",
  "South Korea",
] as const;

const VISA_TYPE_OPTIONS = ["All Visa Types", "Tourist", "Work", "Business"] as const;

const STATUS_OPTIONS = [
  "All Status",
  "Pending",
  "Approved",
  "Rejected",
  "Dispatched",
  "Received",
] as const;

const PAYMENT_OPTIONS = ["All Payments", "Paid", "Pending"] as const;

/* ---------- COMPONENT ---------- */

export default function StickerVisa() {
  /* ---------- MOCK DATA (API later) ---------- */
  const [rows] = useState<StickerVisaRow[]>([
    {
      id: "SV-1001",
      email: "user1@mail.com",
      contact: "9876543210",
      country: "UAE",
      visaType: "Tourist",
      noOfDays: 30,
      files: [
        { name: "passport.pdf", url: "#", type: "pdf" },
        { name: "photo.jpg", url: "#", type: "image" },
      ],
      status: "Pending",
      payment: "Pending",
      createdAt: "Just now",
    },
    {
      id: "SV-1002",
      email: "user2@mail.com",
      contact: "9999999999",
      country: "Singapore",
      visaType: "Business",
      noOfDays: 14,
      files: [{ name: "passport.pdf", url: "#", type: "pdf" }],
      status: "Approved",
      payment: "Paid",
      createdAt: "2 hours ago",
    },
    {
      id: "SV-1003",
      email: "user3@mail.com",
      contact: "8888888888",
      country: "Oman",
      visaType: "Work",
      noOfDays: 60,
      files: [{ name: "passport.pdf", url: "#", type: "pdf" }],
      status: "Dispatched",
      payment: "Paid",
      createdAt: "6 hours ago",
    },
  ]);

  /* ---------- FILTER STATES ---------- */
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState<(typeof COUNTRY_OPTIONS)[number]>("All Countries");
  const [visaType, setVisaType] = useState<(typeof VISA_TYPE_OPTIONS)[number]>("All Visa Types");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All Status");
  const [payment, setPayment] = useState<(typeof PAYMENT_OPTIONS)[number]>("All Payments");

  /* ---------- DOCS MODAL ---------- */
  const [openDocsRow, setOpenDocsRow] = useState<StickerVisaRow | null>(null);

  /* ---------- PAGINATION (min 10, max 15) ---------- */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    const calc = () => {
      const h = window.innerHeight;
      const reserved = 300; // compact layout
      const rowH = 56;
      const usable = Math.max(320, h - reserved);
      const size = Math.floor(usable / rowH);
      setPageSize(Math.max(10, Math.min(15, size)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* ---------- FILTERING ---------- */
  const filtered = useMemo(() => {
    let data = [...rows];

    // search
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      data = data.filter((r) => {
        return (
          r.id.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.contact.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.visaType.toLowerCase().includes(q)
        );
      });
    }

    // selects
    if (country !== "All Countries") data = data.filter((r) => r.country === country);
    if (visaType !== "All Visa Types") data = data.filter((r) => r.visaType === visaType);
    if (status !== "All Status") data = data.filter((r) => r.status === status);
    if (payment !== "All Payments") data = data.filter((r) => r.payment === payment);

    return data;
  }, [rows, searchText, country, visaType, status, payment]);

  /* ---------- STATS (ye “state” wala section) ---------- */
  const stats = useMemo(() => {
    const total = rows.length;

    const byCountry =
      country !== "All Countries" ? rows.filter((r) => r.country === country).length : rows.length;

    const byVisaType =
      visaType !== "All Visa Types" ? rows.filter((r) => r.visaType === visaType).length : rows.length;

    const byStatus =
      status !== "All Status" ? rows.filter((r) => r.status === status).length : rows.length;

    return { total, byCountry, byVisaType, byStatus };
  }, [rows, country, visaType, status]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [pageSize, searchText, country, visaType, status, payment]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  /* ---------- UI HELPERS ---------- */
  const pill = (text: string, kind: "status" | "payment") => {
    const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";

    if (kind === "payment") {
      return text === "Paid"
        ? `${base} bg-emerald-50 text-emerald-800`
        : `${base} bg-amber-50 text-amber-900`;
    }

    if (text === "Approved") return `${base} bg-emerald-50 text-emerald-800`;
    if (text === "Rejected") return `${base} bg-rose-50 text-rose-800`;
    if (text === "Pending") return `${base} bg-sky-50 text-sky-800`;
    if (text === "Dispatched") return `${base} bg-purple-50 text-purple-800`;
    if (text === "Received") return `${base} bg-teal-50 text-teal-900`;
    return `${base} bg-slate-100 text-slate-700`;
  };

  const onEdit = (row: StickerVisaRow) => alert(`Edit: ${row.id} (wire to modal/page)`);
  const onDelete = (row: StickerVisaRow) => alert(`Delete: ${row.id} (wire to confirm + API)`);

  const clearFilters = () => {
    setSearchText("");
    setCountry("All Countries");
    setVisaType("All Visa Types");
    setStatus("All Status");
    setPayment("All Payments");
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
     

      <div className="p-6 space-y-4">
        {/* Stats (state) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-2xl font-semibold text-slate-900">{stats.total}</div>
            <div className="mt-0.5 text-xs text-slate-600">Total Requests</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-2xl font-semibold text-slate-900">{stats.byCountry}</div>
            <div className="mt-0.5 text-xs text-slate-600">Country wise</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-2xl font-semibold text-slate-900">{stats.byVisaType}</div>
            <div className="mt-0.5 text-xs text-slate-600">Visa Type wise</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-2xl font-semibold text-slate-900">{stats.byStatus}</div>
            <div className="mt-0.5 text-xs text-slate-600">Status wise</div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
              <Filter className="h-4 w-4" />
              Filters
            </div>

            <button
              onClick={clearFilters}
              className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold"
            >
              Clear Filters
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 lg:grid-cols-6 gap-2">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="text-xs font-medium text-slate-600">Search</label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search by email, contact, country..."
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="text-xs font-medium text-slate-600">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as (typeof COUNTRY_OPTIONS)[number])}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Visa Type */}
            <div>
              <label className="text-xs font-medium text-slate-600">Visa Type</label>
              <select
                value={visaType}
                onChange={(e) => setVisaType(e.target.value as (typeof VISA_TYPE_OPTIONS)[number])}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
              >
                {VISA_TYPE_OPTIONS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-medium text-slate-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as (typeof STATUS_OPTIONS)[number])}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment */}
            <div>
              <label className="text-xs font-medium text-slate-600">Payment</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value as (typeof PAYMENT_OPTIONS)[number])}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
              >
                {PAYMENT_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-teal-900 text-white px-4 py-3 font-semibold flex items-center justify-between">
            <span>Sticker Visa Enquiries</span>
            <span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Docs</th>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Contact</th>
                  <th className="text-left px-4 py-3 font-medium">Country</th>
                  <th className="text-left px-4 py-3 font-medium">Visa Type</th>
                  <th className="text-left px-4 py-3 font-medium">Days</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Payment</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pagedRows.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-slate-600">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  pagedRows.map((r) => (
                    <tr key={r.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setOpenDocsRow(r)}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2"
                        >
                          <Paperclip className="h-4 w-4 text-teal-900" />
                          <span className="text-xs font-semibold text-slate-800">
                            {r.files.length} file(s)
                          </span>
                        </button>
                      </td>

                      <td className="px-4 py-3 text-slate-900">{r.email}</td>
                      <td className="px-4 py-3 text-slate-900">{r.contact}</td>
                      <td className="px-4 py-3 text-slate-900">{r.country}</td>
                      <td className="px-4 py-3 text-slate-900">{r.visaType}</td>
                      <td className="px-4 py-3 text-slate-900">{r.noOfDays}</td>

                      <td className="px-4 py-3">
                        <span className={pill(r.status, "status")}>{r.status}</span>
                      </td>

                      <td className="px-4 py-3">
                        <span className={pill(r.payment, "payment")}>{r.payment}</span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="inline-flex rounded-xl overflow-hidden border border-slate-200 bg-white">
                          <button
                            onClick={() => onEdit(r)}
                            className="h-9 w-11 grid place-items-center hover:bg-slate-50"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4 text-sky-700" />
                          </button>
                          <div className="w-px bg-slate-200" />
                          <button
                            onClick={() => onDelete(r)}
                            className="h-9 w-11 grid place-items-center hover:bg-rose-50"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-rose-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              Page {page} of {totalPages} • Rows per page: {pageSize}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white text-sm font-semibold"
              >
                Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white text-sm font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Modal */}
      {openDocsRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenDocsRow(null)} />

          <div
            className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-teal-900 text-white flex items-center justify-between">
              <div className="font-semibold">Documents Attached</div>
              <button
                onClick={() => setOpenDocsRow(null)}
                className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 grid place-items-center"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="text-sm text-slate-600">
                Request ID:{" "}
                <span className="font-semibold text-slate-900">{openDocsRow.id}</span>
              </div>

              <div className="mt-4 space-y-2">
                {openDocsRow.files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">{f.name}</div>
                      <div className="text-xs text-slate-600">Click open to view/download</div>
                    </div>

                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-xs text-slate-500">
                Note: Abhi links dummy hain. Backend se file URLs aayenge to yahin render ho
                jayenge.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
