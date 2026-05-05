import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileText, Search, Filter, Trash2 } from "lucide-react";

type ApiDoc = {
  id?: string;
  originalName?: string;
  url?: string;
};

type ApiRow = {
  id: string;
  name?: string;
  email: string;
  phone: string;
  insuranceType: string;
  travelDate: string;
  returnDate?: string;
  tripDuration?: string;
  destination: string;
  specialRequirements?: string;
  status?: string;
  payment?: string;
  paymentAmount?: string | null;
  documents?: ApiDoc[];
};

const DESTINATIONS = ["All", "Bulgaria", "North Macedonia", "Croatia", "Serbia", "Russia", "Montenegro", "Belarus"];
const INSURANCE_TYPES = ["All", "Travel Insurance", "Student Insurance"];
const STATUS_OPTIONS = ["All", "Pending", "Processing", "Approved", "Rejected", "Dispatched", "Received"];
const PAYMENT_OPTIONS = ["All", "Pending", "Paid"];

export default function InsuranceAdmin() {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [rows, setRows] = useState<ApiRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [destination, setDestination] = useState("All");
  const [insuranceType, setInsuranceType] = useState("All");
  const [status, setStatus] = useState("All");
  const [payment, setPayment] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const fetchRows = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/insurance/insurance/enquiry`, { credentials: "include" });
      const data = await res.json().catch(() => ({ items: [] }));
      if (!res.ok) throw new Error(data?.message || "Failed to fetch enquiries");
      setRows(data.items || []);
    } catch (err: any) {
      setApiError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); }, []);
  useEffect(() => {
    const calc = () => {
      const usable = Math.max(320, window.innerHeight - 300);
      setPageSize(Math.max(10, Math.min(15, Math.floor(usable / 56))));
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
        [r.name, r.email, r.phone, r.destination, r.insuranceType, r.status, r.payment]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      );
    }
    if (destination !== "All") data = data.filter((r) => r.destination === destination);
    if (insuranceType !== "All") data = data.filter((r) => r.insuranceType === insuranceType);
    if (status !== "All") data = data.filter((r) => (r.status || "Pending") === status);
    if (payment !== "All") data = data.filter((r) => (r.payment || "Pending") === payment);
    return data;
  }, [rows, searchText, destination, insuranceType, status, payment]);

  const stats = useMemo(() => ({
    total: rows.length,
    byDestination: destination !== "All" ? rows.filter((r) => r.destination === destination).length : rows.length,
    byType: insuranceType !== "All" ? rows.filter((r) => r.insuranceType === insuranceType).length : rows.length,
    byPayment: payment !== "All" ? rows.filter((r) => (r.payment || "Pending") === payment).length : rows.length,
  }), [rows, destination, insuranceType, payment]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [pageSize, searchText, destination, insuranceType, status, payment]);
  const pagedRows = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  const updateField = async (row: ApiRow, updates: Record<string, string>) => {
    try {
      const res = await fetch(`${API_BASE}/insurance/insurance/enquiry/${row.id}`, {
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

  const deleteRow = async (row: ApiRow) => {
    if (!window.confirm(`Delete insurance request for ${row.email}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/insurance/insurance/enquiry/${row.id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      setRows((prev) => prev.filter((item) => item.id !== row.id));
    } catch (err: any) {
      alert(err?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-2xl font-semibold text-slate-900">{stats.total}</div><div className="mt-0.5 text-xs text-slate-600">Total Requests</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.byDestination}</div><div className="mt-0.5 text-xs text-slate-600">Destination wise</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.byType}</div><div className="mt-0.5 text-xs text-slate-600">Insurance type wise</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.byPayment}</div><div className="mt-0.5 text-xs text-slate-600">Payment wise</div></div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 flex items-center justify-between">
        <div className="text-sm text-slate-700">{loading ? "Loading enquiries..." : apiError ? `Error: ${apiError}` : `Loaded: ${rows.length}`}</div>
        <button onClick={fetchRows} className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold">Refresh</button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm"><Filter className="h-4 w-4" />Filters</div>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-6 gap-2">
          <div className="lg:col-span-2"><label className="text-xs font-medium text-slate-600">Search</label><div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10"><Search className="h-4 w-4 text-slate-500" /><input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by name, email, destination..." className="w-full outline-none text-sm" /></div></div>
          <div><label className="text-xs font-medium text-slate-600">Destination</label><select value={destination} onChange={(e) => setDestination(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
          <div><label className="text-xs font-medium text-slate-600">Type</label><select value={insuranceType} onChange={(e) => setInsuranceType(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{INSURANCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
          <div><label className="text-xs font-medium text-slate-600">Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          <div><label className="text-xs font-medium text-slate-600">Payment</label><select value={payment} onChange={(e) => setPayment(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{PAYMENT_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#294d6b] text-white px-4 py-3 font-semibold flex items-center justify-between"><span>Insurance Enquiries</span><span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600"><tr><th className="text-left px-4 py-3 font-medium">Applicant</th><th className="text-left px-4 py-3 font-medium">Travel</th><th className="text-left px-4 py-3 font-medium">Destination</th><th className="text-left px-4 py-3 font-medium">Passport</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">Payment</th><th className="text-left px-4 py-3 font-medium">Amount</th><th className="text-left px-4 py-3 font-medium">Actions</th></tr></thead>
            <tbody>
              {pagedRows.length === 0 ? <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-600">{loading ? "Loading..." : "No records found."}</td></tr> : pagedRows.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-900"><div className="font-medium">{r.name || "User"}</div><div className="text-xs text-slate-500">{r.email}</div><div className="text-xs text-slate-500">{r.phone}</div></td>
                  <td className="px-4 py-3 text-slate-900"><div>{r.insuranceType}</div><div className="text-xs text-slate-500">{r.travelDate}{r.returnDate ? ` to ${r.returnDate}` : ""}</div></td>
                  <td className="px-4 py-3 text-slate-900"><div>{r.destination}</div><div className="text-xs text-slate-500">{r.tripDuration ? `${r.tripDuration} days` : "Duration not set"}</div></td>
                  <td className="px-4 py-3">{r.documents?.[0]?.url ? <a href={r.documents[0].url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#294d6b] hover:bg-slate-50"><FileText className="h-4 w-4" />Open<ExternalLink className="h-3 w-3" /></a> : <span className="text-xs text-slate-500">No file</span>}</td>
                  <td className="px-4 py-3"><select value={r.status || "Pending"} onChange={(e) => updateField(r, { status: e.target.value })} className="h-9 px-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 outline-none"><option>Pending</option><option>Processing</option><option>Approved</option><option>Rejected</option><option>Dispatched</option><option>Received</option></select></td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${(r.payment || "Pending") === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>{r.payment || "Pending"}</span></td>
                  <td className="px-4 py-3 text-slate-900">{r.paymentAmount || "-"}</td>
                  <td className="px-4 py-3"><button onClick={() => deleteRow(r)} className="h-9 w-11 grid place-items-center rounded-xl border border-slate-200 bg-white hover:bg-rose-50" title="Delete"><Trash2 className="h-4 w-4 text-rose-600" /></button></td>
                </tr>
              ))}
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
