import React, { useEffect, useMemo, useState } from "react";
import {
  Paperclip,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Pencil,
  Trash2,
  Search,
  Filter,
  X,
} from "lucide-react";

type DocFile = {
  name: string;
  url: string;
  type: "pdf" | "image" | "other";
};

type InsuranceRow = {
  id: string;
  email: string;
  contact: string;

  insuranceType: "Travel" | "Student";

  travelStartDate: string; // yyyy-mm-dd
  travelEndDate: string; // yyyy-mm-dd
  dob: string; // yyyy-mm-dd

  destinationCountry: string;

  // ✅ user photo (image) + passport (pdf only)
  files: {
    photo: DocFile | null; // image
    passportPdf: DocFile | null; // pdf
  };

  status: "Pending" | "Approved" | "Rejected" | "Dispatched" | "Received";
  payment: "Paid" | "Pending";
  createdAt: string;
};

/* ✅ Destination countries dropdown (same as your image) */
const DESTINATION_COUNTRIES = [
  "All",
  "Bulgaria",
  "North Macedonia",
  "Croatia",
  "Serbia",
  "Russia",
  "Montenegro",
  "Belarus",
];

const INSURANCE_TYPES: Array<InsuranceRow["insuranceType"] | "All"> = ["All", "Travel", "Student"];

const STATUS_OPTIONS: Array<InsuranceRow["status"] | "All"> = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Dispatched",
  "Received",
];

const PAYMENT_OPTIONS: Array<InsuranceRow["payment"] | "All"> = ["All", "Paid", "Pending"];

export default function InsuranceAdmin() {
  /* ---------- MOCK DATA ---------- */
  const [rows] = useState<InsuranceRow[]>([
    {
      id: "INS-2001",
      email: "user1@mail.com",
      contact: "9876543210",
      insuranceType: "Travel",
      travelStartDate: "2026-01-10",
      travelEndDate: "2026-01-22",
      dob: "1998-06-14",
      destinationCountry: "Russia",
      files: {
        photo: { name: "photo.jpg", url: "#", type: "image" },
        passportPdf: { name: "passport.pdf", url: "#", type: "pdf" },
      },
      status: "Pending",
      payment: "Pending",
      createdAt: "Just now",
    },
    {
      id: "INS-2002",
      email: "user2@mail.com",
      contact: "9999999999",
      insuranceType: "Student",
      travelStartDate: "2026-02-01",
      travelEndDate: "2026-08-01",
      dob: "2003-11-02",
      destinationCountry: "Serbia",
      files: {
        photo: { name: "profile.png", url: "#", type: "image" },
        passportPdf: { name: "passport.pdf", url: "#", type: "pdf" },
      },
      status: "Approved",
      payment: "Paid",
      createdAt: "3 hours ago",
    },
  ]);

  /* ---------- FILTER STATES ---------- */
  const [searchText, setSearchText] = useState("");
  const [destination, setDestination] = useState<string>("All");
  const [insuranceType, setInsuranceType] = useState<(typeof INSURANCE_TYPES)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [payment, setPayment] = useState<(typeof PAYMENT_OPTIONS)[number]>("All");

  /* Docs modal (shows photo + passport PDF) */
  const [openDocsRow, setOpenDocsRow] = useState<InsuranceRow | null>(null);

  /* ---------- PAGINATION (min 10 max 15) ---------- */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    const calc = () => {
      const h = window.innerHeight;
      const reserved = 300;
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

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      data = data.filter((r) => {
        return (
          r.id.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.contact.toLowerCase().includes(q) ||
          r.destinationCountry.toLowerCase().includes(q) ||
          r.insuranceType.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q) ||
          r.payment.toLowerCase().includes(q)
        );
      });
    }

    if (destination !== "All") data = data.filter((r) => r.destinationCountry === destination);
    if (insuranceType !== "All") data = data.filter((r) => r.insuranceType === insuranceType);
    if (status !== "All") data = data.filter((r) => r.status === status);
    if (payment !== "All") data = data.filter((r) => r.payment === payment);

    return data;
  }, [rows, searchText, destination, insuranceType, status, payment]);

  /* ---------- STATS ---------- */
  const stats = useMemo(() => {
    const total = rows.length;

    const byDestination =
      destination !== "All"
        ? rows.filter((r) => r.destinationCountry === destination).length
        : rows.length;

    const byType =
      insuranceType !== "All"
        ? rows.filter((r) => r.insuranceType === insuranceType).length
        : rows.length;

    const byStatus =
      status !== "All" ? rows.filter((r) => r.status === status).length : rows.length;

    const byPayment =
      payment !== "All" ? rows.filter((r) => r.payment === payment).length : rows.length;

    return { total, byDestination, byType, byStatus, byPayment };
  }, [rows, destination, insuranceType, status, payment]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [pageSize, searchText, destination, insuranceType, status, payment]);

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

  const onEdit = (row: InsuranceRow) => alert(`Edit: ${row.id} (wire to modal/page)`);
  const onDelete = (row: InsuranceRow) => alert(`Delete: ${row.id} (wire to confirm + API)`);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.total}</div>
          <div className="mt-0.5 text-xs text-slate-600">Total Requests</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.byDestination}</div>
          <div className="mt-0.5 text-xs text-slate-600">Destination wise</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.byType}</div>
          <div className="mt-0.5 text-xs text-slate-600">Insurance type wise</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.byPayment}</div>
          <div className="mt-0.5 text-xs text-slate-600">Payment wise</div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
          <Filter className="h-4 w-4" />
          Filters
        </div>

        <div className="mt-3 grid grid-cols-1 lg:grid-cols-6 gap-2">
          <div className="lg:col-span-2">
            <label className="text-xs font-medium text-slate-600">Search</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by email, contact, destination..."
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Destination</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              {DESTINATION_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Insurance Type</label>
            <select
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value as any)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              {INSURANCE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Payment</label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value as any)}
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
          <span>Insurance Enquiries</span>
          <span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Docs</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Contact</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-left px-4 py-3 font-medium">DOB</th>
                <th className="text-left px-4 py-3 font-medium">Travel Start</th>
                <th className="text-left px-4 py-3 font-medium">Travel End</th>
                <th className="text-left px-4 py-3 font-medium">Destination</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Payment</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pagedRows.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-slate-600">
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
                        <span className="text-xs font-semibold text-slate-800">View</span>
                      </button>
                    </td>

                    <td className="px-4 py-3 text-slate-900">{r.email}</td>
                    <td className="px-4 py-3 text-slate-900">{r.contact}</td>
                    <td className="px-4 py-3 text-slate-900">{r.insuranceType}</td>
                    <td className="px-4 py-3 text-slate-900">{r.dob}</td>
                    <td className="px-4 py-3 text-slate-900">{r.travelStartDate}</td>
                    <td className="px-4 py-3 text-slate-900">{r.travelEndDate}</td>
                    <td className="px-4 py-3 text-slate-900">{r.destinationCountry}</td>

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

      {/* Docs Modal */}
      {openDocsRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenDocsRow(null)} />
          <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-5 py-4 bg-teal-900 text-white flex items-center justify-between">
              <div className="font-semibold">Attachments</div>
              <button
                onClick={() => setOpenDocsRow(null)}
                className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 grid place-items-center"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="text-sm text-slate-600">
                Request ID:{" "}
                <span className="font-semibold text-slate-900">{openDocsRow.id}</span>
              </div>

              {/* Photo */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <ImageIcon className="h-5 w-5 text-emerald-700" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {openDocsRow.files.photo?.name || "Photo (missing)"}
                    </div>
                    <div className="text-xs text-slate-600">Image file</div>
                  </div>
                </div>
                {openDocsRow.files.photo?.url ? (
                  <a
                    href={openDocsRow.files.photo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">—</span>
                )}
              </div>

              {/* Passport PDF */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-5 w-5 text-sky-700" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {openDocsRow.files.passportPdf?.name || "Passport PDF (missing)"}
                    </div>
                    <div className="text-xs text-slate-600">PDF only</div>
                  </div>
                </div>
                {openDocsRow.files.passportPdf?.url ? (
                  <a
                    href={openDocsRow.files.passportPdf.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">—</span>
                )}
              </div>

              <div className="pt-2 text-xs text-slate-500">
                Note: abhi links dummy hain. Backend se file URLs aayenge to yahin render ho jayenge.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
