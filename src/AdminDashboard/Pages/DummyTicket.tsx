import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Search, Filter } from "lucide-react";

type DummyTicketRow = {
  id: string;
  email: string;
  contact: string;
  destinationCountry: string;
  departureDate: string; // yyyy-mm-dd
  ticketAmount: number; // dummy amount
  tripType: "One Way" | "Two Way";
  applicationStatus: "Pending" | "Approved" | "Rejected" | "Dispatched" | "Received";
  paymentStatus: "Paid" | "Pending";
  createdAt: string;
};

/* ✅ Destination countries (as per dropdown) */
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

const TRIP_TYPES: Array<DummyTicketRow["tripType"] | "All"> = ["All", "One Way", "Two Way"];

const APPLICATION_STATUS_OPTIONS: Array<DummyTicketRow["applicationStatus"] | "All"> = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Dispatched",
  "Received",
];

const PAYMENT_STATUS_OPTIONS: Array<DummyTicketRow["paymentStatus"] | "All"> = [
  "All",
  "Paid",
  "Pending",
];

export default function DummyTicketAdmin() {
  /* ---------- MOCK DATA ---------- */
  const [rows] = useState<DummyTicketRow[]>([
    {
      id: "DT-4001",
      email: "user1@mail.com",
      contact: "9876543210",
      destinationCountry: "Russia",
      departureDate: "2026-01-20",
      ticketAmount: 18500,
      tripType: "One Way",
      applicationStatus: "Pending",
      paymentStatus: "Pending",
      createdAt: "Just now",
    },
    {
      id: "DT-4002",
      email: "user2@mail.com",
      contact: "9999999999",
      destinationCountry: "Serbia",
      departureDate: "2026-02-02",
      ticketAmount: 26500,
      tripType: "Two Way",
      applicationStatus: "Approved",
      paymentStatus: "Paid",
      createdAt: "2 hours ago",
    },
  ]);

  /* ---------- FILTERS ---------- */
  const [searchText, setSearchText] = useState("");
  const [destination, setDestination] = useState<string>("All");
  const [tripType, setTripType] = useState<(typeof TRIP_TYPES)[number]>("All");
  const [appStatus, setAppStatus] = useState<(typeof APPLICATION_STATUS_OPTIONS)[number]>("All");
  const [paymentStatus, setPaymentStatus] = useState<(typeof PAYMENT_STATUS_OPTIONS)[number]>("All");

  /* ---------- PAGINATION ---------- */
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
          r.tripType.toLowerCase().includes(q) ||
          r.applicationStatus.toLowerCase().includes(q) ||
          r.paymentStatus.toLowerCase().includes(q)
        );
      });
    }

    if (destination !== "All")
      data = data.filter((r) => r.destinationCountry === destination);

    if (tripType !== "All") data = data.filter((r) => r.tripType === tripType);

    if (appStatus !== "All")
      data = data.filter((r) => r.applicationStatus === appStatus);

    if (paymentStatus !== "All")
      data = data.filter((r) => r.paymentStatus === paymentStatus);

    return data;
  }, [rows, searchText, destination, tripType, appStatus, paymentStatus]);

  /* ---------- STATS ---------- */
  const stats = useMemo(() => {
    const total = rows.length;

    const byDestination =
      destination !== "All"
        ? rows.filter((r) => r.destinationCountry === destination).length
        : rows.length;

    const byTripType =
      tripType !== "All" ? rows.filter((r) => r.tripType === tripType).length : rows.length;

    const byAppStatus =
      appStatus !== "All"
        ? rows.filter((r) => r.applicationStatus === appStatus).length
        : rows.length;

    const byPayment =
      paymentStatus !== "All"
        ? rows.filter((r) => r.paymentStatus === paymentStatus).length
        : rows.length;

    return { total, byDestination, byTripType, byAppStatus, byPayment };
  }, [rows, destination, tripType, appStatus, paymentStatus]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [pageSize, searchText, destination, tripType, appStatus, paymentStatus]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  /* ---------- UI HELPERS ---------- */
  const pill = (text: string, kind: "app" | "pay") => {
    const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
    if (kind === "pay") {
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

  const money = (amt: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amt);

  /* ---------- ACTIONS ---------- */
  const onEdit = (row: DummyTicketRow) => alert(`Edit: ${row.id} (wire to modal/page)`);
  const onDelete = (row: DummyTicketRow) => alert(`Delete: ${row.id} (wire to confirm + API)`);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.total}</div>
          <div className="mt-0.5 text-xs text-slate-600">Total Requests</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.byDestination}</div>
          <div className="mt-0.5 text-xs text-slate-600">Destination wise</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.byTripType}</div>
          <div className="mt-0.5 text-xs text-slate-600">Trip type wise</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.byAppStatus}</div>
          <div className="mt-0.5 text-xs text-slate-600">Application status wise</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.byPayment}</div>
          <div className="mt-0.5 text-xs text-slate-600">Payment status wise</div>
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
            <label className="text-xs font-medium text-slate-600">Trip Type</label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value as any)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              {TRIP_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Application Status</label>
            <select
              value={appStatus}
              onChange={(e) => setAppStatus(e.target.value as any)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              {APPLICATION_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as any)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              {PAYMENT_STATUS_OPTIONS.map((p) => (
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
          <span>Dummy Ticket Requests</span>
          <span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Contact</th>
                <th className="text-left px-4 py-3 font-medium">Destination</th>
                <th className="text-left px-4 py-3 font-medium">Departure Date</th>
                <th className="text-left px-4 py-3 font-medium">Ticket Amount</th>
                <th className="text-left px-4 py-3 font-medium">Trip Type</th>
                <th className="text-left px-4 py-3 font-medium">Application Status</th>
                <th className="text-left px-4 py-3 font-medium">Payment Status</th>
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
                    <td className="px-4 py-3 text-slate-900">{r.email}</td>
                    <td className="px-4 py-3 text-slate-900">{r.contact}</td>
                    <td className="px-4 py-3 text-slate-900">{r.destinationCountry}</td>
                    <td className="px-4 py-3 text-slate-900">{r.departureDate}</td>
                    <td className="px-4 py-3 text-slate-900">{money(r.ticketAmount)}</td>
                    <td className="px-4 py-3 text-slate-900">{r.tripType}</td>

                    <td className="px-4 py-3">
                      <span className={pill(r.applicationStatus, "app")}>{r.applicationStatus}</span>
                    </td>

                    <td className="px-4 py-3">
                      <span className={pill(r.paymentStatus, "pay")}>{r.paymentStatus}</span>
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
