import { useEffect, useMemo, useState } from "react";
import { Filter, Search, Trash2 } from "lucide-react";

type DummyTicketRow = {
  id: string;
  name?: string;
  email: string;
  mobile: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType: "oneWay" | "roundTrip";
  paxCount: number;
  totalAmount: number;
  status?: string;
  payment?: string;
};

const DESTINATION_COUNTRIES = ["All", "Bulgaria", "North Macedonia", "Croatia", "Serbia", "Russia", "Montenegro", "Belarus"];
const STATUS_OPTIONS = ["All", "Pending", "Processing", "Approved", "Rejected", "Dispatched", "Received"];

export default function DummyTicketAdmin() {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [rows, setRows] = useState<DummyTicketRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [destination, setDestination] = useState<string>("All");
  const [appStatus, setAppStatus] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const fetchRows = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/dummy-ticket`, { credentials: "include" });
      const data = await res.json().catch(() => ({ items: [] }));
      if (!res.ok) throw new Error(data?.message || "Failed to fetch dummy ticket requests");
      setRows(data.items || []);
    } catch (err: any) {
      setApiError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

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
      data = data.filter((r) =>
        [r.name, r.email, r.mobile, r.destination, r.tripType, r.status, r.payment]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      );
    }

    if (destination !== "All") data = data.filter((r) => r.destination === destination);
    if (appStatus !== "All") data = data.filter((r) => (r.status || "Pending") === appStatus);

    return data;
  }, [rows, searchText, destination, appStatus]);

  const stats = useMemo(() => {
    return {
      total: rows.length,
      paid: rows.filter((r) => r.payment === "Paid").length,
      pending: rows.filter((r) => (r.status || "Pending") === "Pending").length,
      destinationCount: destination !== "All" ? rows.filter((r) => r.destination === destination).length : rows.length,
    };
  }, [rows, destination]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [pageSize, searchText, destination, appStatus]);

  const pagedRows = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  const updateField = async (row: DummyTicketRow, updates: Record<string, string>) => {
    try {
      const res = await fetch(`${API_BASE}/dummy-ticket/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Update failed");
      setRows((prev) => prev.map((item) => (item.id === row.id ? { ...item, ...updates } : item)));
    } catch (err: any) {
      alert(err?.message || "Update failed");
    }
  };

  const onDelete = async (row: DummyTicketRow) => {
    if (!window.confirm(`Delete dummy ticket ${row.email}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/dummy-ticket/${row.id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      setRows((prev) => prev.filter((item) => item.id !== row.id));
    } catch (err: any) {
      alert(err?.message || "Delete failed");
    }
  };

  const pill = (text: string, kind: "app" | "pay") => {
    const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
    if (kind === "pay") {
      return text === "Paid"
        ? `${base} bg-emerald-50 text-emerald-700`
        : `${base} bg-amber-50 text-amber-800`;
    }
    if (text === "Approved") return `${base} bg-[#294d6b]/10 text-[#294d6b]`;
    if (text === "Rejected") return `${base} bg-rose-50 text-rose-800`;
    if (text === "Pending") return `${base} bg-sky-50 text-sky-800`;
    if (text === "Dispatched") return `${base} bg-violet-50 text-violet-800`;
    if (text === "Received") return `${base} bg-emerald-50 text-emerald-700`;
    return `${base} bg-slate-100 text-slate-700`;
  };

  const money = (amt: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amt || 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-2xl font-semibold text-slate-900">{stats.total}</div><div className="mt-0.5 text-xs text-slate-600">Total Requests</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.destinationCount}</div><div className="mt-0.5 text-xs text-slate-600">Destination wise</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.pending}</div><div className="mt-0.5 text-xs text-slate-600">Pending status</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.paid}</div><div className="mt-0.5 text-xs text-slate-600">Paid applications</div></div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 flex items-center justify-between">
        <div className="text-sm text-slate-700">{loading ? "Loading requests..." : apiError ? `Error: ${apiError}` : `Loaded: ${rows.length}`}</div>
        <button onClick={fetchRows} className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold">Refresh</button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm"><Filter className="h-4 w-4" />Filters</div>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div className="lg:col-span-2">
            <label className="text-xs font-medium text-slate-600">Search</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10">
              <Search className="h-4 w-4 text-slate-500" />
              <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by name, email, contact..." className="w-full outline-none text-sm" />
            </div>
          </div>
          <div><label className="text-xs font-medium text-slate-600">Destination</label><select value={destination} onChange={(e) => setDestination(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{DESTINATION_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
          <div><label className="text-xs font-medium text-slate-600">Application Status</label><select value={appStatus} onChange={(e) => setAppStatus(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#294d6b] text-white px-4 py-3 font-semibold flex items-center justify-between"><span>Dummy Ticket Requests</span><span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Applicant</th>
                <th className="text-left px-4 py-3 font-medium">Destination</th>
                <th className="text-left px-4 py-3 font-medium">Journey</th>
                <th className="text-left px-4 py-3 font-medium">Amount</th>
                <th className="text-left px-4 py-3 font-medium">Application Status</th>
                <th className="text-left px-4 py-3 font-medium">Payment Status</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-600">{loading ? "Loading..." : "No records found."}</td></tr>
              ) : (
                pagedRows.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-slate-900"><div className="font-medium">{r.name || "User"}</div><div className="text-xs text-slate-500">{r.email}</div><div className="text-xs text-slate-500">{r.mobile}</div></td>
                    <td className="px-4 py-3 text-slate-900">{r.destination}</td>
                    <td className="px-4 py-3 text-slate-900"><div>{r.tripType === "roundTrip" ? "Round Trip" : "One Way"}</div><div className="text-xs text-slate-500">{r.departureDate}{r.returnDate ? ` to ${r.returnDate}` : ""}</div><div className="text-xs text-slate-500">Pax: {r.paxCount}</div></td>
                    <td className="px-4 py-3 text-slate-900">{money(r.totalAmount)}</td>
                    <td className="px-4 py-3"><select value={r.status || "Pending"} onChange={(e) => updateField(r, { status: e.target.value })} className="h-9 px-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 outline-none"><option>Pending</option><option>Processing</option><option>Approved</option><option>Rejected</option><option>Dispatched</option><option>Received</option></select></td>
                    <td className="px-4 py-3"><span className={pill(r.payment || "Pending", "pay")}>{r.payment || "Pending"}</span></td>
                    <td className="px-4 py-3"><button onClick={() => onDelete(r)} className="h-9 w-11 grid place-items-center rounded-xl border border-slate-200 bg-white hover:bg-rose-50" title="Delete"><Trash2 className="h-4 w-4 text-rose-600" /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">Page {page} of {totalPages} • Rows per page: {pageSize}</div>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-sm font-semibold">Prev</button>
            <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-sm font-semibold">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
