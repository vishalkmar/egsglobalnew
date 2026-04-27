import React, { useEffect, useMemo, useState } from "react";
import { Search, Filter, Trash2 } from "lucide-react";

type ApiRow = {
  id: string;
  name?: string;
  email: string;
  phone: string;
  arrivalDate: string;
  submissionDate: string;
  visaType: string;
  submissionCountry: string;
  status?: string;
  payment?: string;
  createdAt: string;
};

const COUNTRIES = ["All", "Bulgaria", "North Macedonia", "Croatia", "Serbia", "Russia", "Montenegro", "Belarus"];
const VISA_TYPES = ["All", "Tourist Visa", "Business Visa", "Work Visa"];
const STATUS_OPTIONS = ["All", "Pending", "Processing", "Approved", "Rejected", "Dispatched", "Received"];
const PAYMENT_OPTIONS = ["All", "Pending", "Paid"];

export default function MeetGreet() {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [rows, setRows] = useState<ApiRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [submissionCountry, setSubmissionCountry] = useState("All");
  const [visaType, setVisaType] = useState("All");
  const [status, setStatus] = useState("All");
  const [payment, setPayment] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const fetchRows = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/meet-greet/meet-greet/enquiry`, { credentials: "include" });
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
        [r.name, r.email, r.phone, r.arrivalDate, r.submissionDate, r.visaType, r.submissionCountry, r.status, r.payment]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      );
    }
    if (submissionCountry !== "All") data = data.filter((r) => r.submissionCountry === submissionCountry);
    if (visaType !== "All") data = data.filter((r) => r.visaType === visaType);
    if (status !== "All") data = data.filter((r) => (r.status || "Pending") === status);
    if (payment !== "All") data = data.filter((r) => (r.payment || "Pending") === payment);
    return data;
  }, [rows, searchText, submissionCountry, visaType, status, payment]);

  const stats = useMemo(() => ({
    total: rows.length,
    byCountry: submissionCountry !== "All" ? rows.filter((r) => r.submissionCountry === submissionCountry).length : rows.length,
    byVisaType: visaType !== "All" ? rows.filter((r) => r.visaType === visaType).length : rows.length,
    byPayment: payment !== "All" ? rows.filter((r) => (r.payment || "Pending") === payment).length : rows.length,
  }), [rows, submissionCountry, visaType, payment]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [pageSize, searchText, submissionCountry, visaType, status, payment]);
  const pagedRows = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  const updateField = async (row: ApiRow, updates: Record<string, string>) => {
    try {
      const res = await fetch(`${API_BASE}/meet-greet/meet-greet/enquiry/${row.id}`, {
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
    if (!window.confirm(`Delete request for ${row.email}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/meet-greet/meet-greet/enquiry/${row.id}`, { method: "DELETE", credentials: "include" });
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
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.byCountry}</div><div className="mt-0.5 text-xs text-slate-600">Country wise</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.byVisaType}</div><div className="mt-0.5 text-xs text-slate-600">Visa type wise</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-2xl font-semibold text-slate-900">{stats.byPayment}</div><div className="mt-0.5 text-xs text-slate-600">Payment wise</div></div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 flex items-center justify-between">
        <div className="text-sm text-slate-700">{loading ? "Loading enquiries..." : apiError ? `Error: ${apiError}` : `Loaded: ${rows.length}`}</div>
        <button onClick={fetchRows} className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold">Refresh</button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm"><Filter className="h-4 w-4" />Filters</div>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-6 gap-2">
          <div className="lg:col-span-2"><label className="text-xs font-medium text-slate-600">Search</label><div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10"><Search className="h-4 w-4 text-slate-500" /><input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by name, email, phone..." className="w-full outline-none text-sm" /></div></div>
          <div><label className="text-xs font-medium text-slate-600">Country</label><select value={submissionCountry} onChange={(e) => setSubmissionCountry(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
          <div><label className="text-xs font-medium text-slate-600">Visa Type</label><select value={visaType} onChange={(e) => setVisaType(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{VISA_TYPES.map((v) => <option key={v} value={v}>{v}</option>)}</select></div>
          <div><label className="text-xs font-medium text-slate-600">Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          <div><label className="text-xs font-medium text-slate-600">Payment</label><select value={payment} onChange={(e) => setPayment(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">{PAYMENT_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#294d6b] text-white px-4 py-3 font-semibold flex items-center justify-between"><span>Meet & Greet Requests</span><span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600"><tr><th className="text-left px-4 py-3 font-medium">Name</th><th className="text-left px-4 py-3 font-medium">Email</th><th className="text-left px-4 py-3 font-medium">Contact</th><th className="text-left px-4 py-3 font-medium">Arrival</th><th className="text-left px-4 py-3 font-medium">Submission</th><th className="text-left px-4 py-3 font-medium">Visa Type</th><th className="text-left px-4 py-3 font-medium">Country</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">Payment</th><th className="text-left px-4 py-3 font-medium">Actions</th></tr></thead>
            <tbody>
              {pagedRows.length === 0 ? <tr><td colSpan={10} className="px-4 py-10 text-center text-slate-600">{loading ? "Loading..." : "No records found."}</td></tr> : pagedRows.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-900">{r.name || "User"}</td>
                  <td className="px-4 py-3 text-slate-900">{r.email}</td>
                  <td className="px-4 py-3 text-slate-900">{r.phone}</td>
                  <td className="px-4 py-3 text-slate-900">{r.arrivalDate}</td>
                  <td className="px-4 py-3 text-slate-900">{r.submissionDate}</td>
                  <td className="px-4 py-3 text-slate-900">{r.visaType}</td>
                  <td className="px-4 py-3 text-slate-900">{r.submissionCountry}</td>
                  <td className="px-4 py-3"><select value={r.status || "Pending"} onChange={(e) => updateField(r, { status: e.target.value })} className="h-9 px-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 outline-none"><option>Pending</option><option>Processing</option><option>Approved</option><option>Rejected</option><option>Dispatched</option><option>Received</option></select></td>
                  <td className="px-4 py-3"><select value={r.payment || "Pending"} onChange={(e) => updateField(r, { payment: e.target.value })} className="h-9 px-2 rounded-lg border border-[#294d6b]/20 bg-[#294d6b]/10 text-sm font-medium text-[#294d6b] outline-none"><option>Pending</option><option>Paid</option></select></td>
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
