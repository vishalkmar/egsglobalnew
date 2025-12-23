import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Search, Filter } from "lucide-react";

type AssistRow = {
  id: string;
  fullName: string;
  email: string;
  contact: string;
  dateOfArrival: string;     // yyyy-mm-dd
  submissionDate: string;    // yyyy-mm-dd
  visaType: "Tourist" | "Work" | "Business";
  country: string;
  status: "Pending" | "Received" | "Rejected" | "Final";
  createdAt: string;
};

// ✅ Countries dropdown (edit here). Screenshot me jo dikh rahe the + tum add kar sakte ho.
const COUNTRIES = [
  "All",
  "Bulgaria",
  "North Macedonia",
  "Croatia",
  "Serbia",
  "Russia",
  "Montenegro",
  "Belarus",
];

const VISA_TYPES: Array<AssistRow["visaType"] | "All"> = ["All", "Tourist", "Work", "Business"];

const STATUS_OPTIONS: Array<AssistRow["status"] | "All"> = [
  "All",
  "Pending",
  "Received",
  "Rejected",
  "Final",
];

export default function AssistantandAppointment() {
  const [rows] = useState<AssistRow[]>([
    {
      id: "AP-3001",
      fullName: "User One",
      email: "user1@mail.com",
      contact: "9876543210",
      dateOfArrival: "2026-01-10",
      submissionDate: "2026-01-05",
      visaType: "Tourist",
      country: "Russia",
      status: "Pending",
      createdAt: "Just now",
    },
    {
      id: "AP-3002",
      fullName: "User Two",
      email: "user2@mail.com",
      contact: "9999999999",
      dateOfArrival: "2026-02-01",
      submissionDate: "2026-01-22",
      visaType: "Business",
      country: "Serbia",
      status: "Received",
      createdAt: "2 hours ago",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState("All");
  const [visaType, setVisaType] = useState<(typeof VISA_TYPES)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    const calc = () => {
      const h = window.innerHeight;
      const reserved = 280;
      const rowH = 56;
      const usable = Math.max(320, h - reserved);
      const size = Math.floor(usable / rowH);
      setPageSize(Math.max(10, Math.min(15, size)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const filtered = useMemo(() => {
    let data = [...rows];

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      data = data.filter((r) => {
        return (
          r.id.toLowerCase().includes(q) ||
          r.fullName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.contact.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.visaType.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q)
        );
      });
    }

    if (country !== "All") data = data.filter((r) => r.country === country);
    if (visaType !== "All") data = data.filter((r) => r.visaType === visaType);
    if (status !== "All") data = data.filter((r) => r.status === status);

    return data;
  }, [rows, searchText, country, visaType, status]);

  const stats = useMemo(() => {
    const total = rows.length;

    const byCountry =
      country !== "All" ? rows.filter((r) => r.country === country).length : rows.length;

    const byVisaType =
      visaType !== "All" ? rows.filter((r) => r.visaType === visaType).length : rows.length;

    const byStatus =
      status !== "All" ? rows.filter((r) => r.status === status).length : rows.length;

    return { total, byCountry, byVisaType, byStatus };
  }, [rows, country, visaType, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => setPage(1), [pageSize, searchText, country, visaType, status]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const pill = (text: AssistRow["status"]) => {
    const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
    if (text === "Final") return `${base} bg-emerald-50 text-emerald-800`;
    if (text === "Rejected") return `${base} bg-rose-50 text-rose-800`;
    if (text === "Received") return `${base} bg-teal-50 text-teal-900`;
    return `${base} bg-sky-50 text-sky-800`; // Pending
  };

  const onEdit = (row: AssistRow) => alert(`Edit: ${row.id}`);
  const onDelete = (row: AssistRow) => alert(`Delete: ${row.id}`);

  return (
    <div className="space-y-4">
      {/* Stats */}
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
          <div className="mt-0.5 text-xs text-slate-600">Visa type wise</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.byStatus}</div>
          <div className="mt-0.5 text-xs text-slate-600">Status wise</div>
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
                placeholder="Search by name, email, contact..."
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Country</label>
            <select
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Visa Type</label>
            <select
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
              value={visaType}
              onChange={(e) => setVisaType(e.target.value as any)}
            >
              {VISA_TYPES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Status</label>
            <select
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* spacer */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-teal-900 text-white px-4 py-3 font-semibold flex items-center justify-between">
          <span>Assistant & Appointment Requests</span>
          <span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Full Name</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Contact</th>
                <th className="text-left px-4 py-3 font-medium">Arrival</th>
                <th className="text-left px-4 py-3 font-medium">Submission</th>
                <th className="text-left px-4 py-3 font-medium">Visa Type</th>
                <th className="text-left px-4 py-3 font-medium">Country</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
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
                    <td className="px-4 py-3 text-slate-900">{r.fullName}</td>
                    <td className="px-4 py-3 text-slate-900">{r.email}</td>
                    <td className="px-4 py-3 text-slate-900">{r.contact}</td>
                    <td className="px-4 py-3 text-slate-900">{r.dateOfArrival}</td>
                    <td className="px-4 py-3 text-slate-900">{r.submissionDate}</td>
                    <td className="px-4 py-3 text-slate-900">{r.visaType}</td>
                    <td className="px-4 py-3 text-slate-900">{r.country}</td>

                    <td className="px-4 py-3">
                      <span className={pill(r.status)}>{r.status}</span>
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
  );
}
