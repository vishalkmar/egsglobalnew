import React, { useEffect, useMemo, useState } from "react";
import {
  Paperclip,
  FileText,
  Image as ImageIcon,
  ExternalLink,
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

type PccRow = {
  id: string;
  email: string;
  phone: string;
  companyName: string;
  country: string;
  noOfDocs: number;
  files: DocFile[];
  status: "Pending" | "Approved" | "Rejected" | "Dispatched" | "Received";
  payment: "Paid" | "Pending";
  createdAt: string;
};

const STATUS_OPTIONS: Array<PccRow["status"] | "All"> = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Dispatched",
  "Received",
];

const PAYMENT_OPTIONS: Array<PccRow["payment"] | "All"> = ["All", "Paid", "Pending"];

type ApiDoc = {
  index: number;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
};

type ApiItem = {
  _id: string;
  name?: string;
  email: string;
  phone: string;
  country: string;
  companyName: string;
  noOfDocuments: number;
  documents: ApiDoc[];
  createdAt: string;
  updatedAt: string;
  status?: string;
  payment?: string;
};

type ApiResp = {
  count: number;
  items: ApiItem[];
};

const fileTypeFrom = (mimeType?: string, url?: string): DocFile["type"] => {
  const mt = (mimeType || "").toLowerCase();
  if (mt.includes("pdf")) return "pdf";
  if (mt.startsWith("image/")) return "image";

  const u = (url || "").toLowerCase();
  if (u.endsWith(".pdf")) return "pdf";
  if (u.match(/\.(png|jpg|jpeg|webp|gif)$/)) return "image";

  return "other";
};

const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
};

export default function PCCLegalization() {
  const API_BASE = "http://localhost:5000/api";

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [rows, setRows] = useState<PccRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchPcc = async () => {
    setLoading(true);
    setApiError(null);

    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/pcc/pcc-legalization/enquiry`, {
        method: "GET",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      const data: ApiResp = await res.json().catch(() => ({ count: 0, items: [] } as any));
      if (!res.ok) throw new Error((data as any)?.message || "Failed to fetch enquiries");

      const mapped: PccRow[] = (data.items || []).map((it) => {
        const files: DocFile[] = (it.documents || []).map((d) => ({
          name: d.originalName || `Document ${d.index}`,
          url: d.url,
          type: fileTypeFrom(d.mimeType, d.url),
        }));

        return {
          id: it._id,
          email: it.email,
          phone: it.phone,
          companyName: it.companyName,
          country: it.country,
          noOfDocs: Number(it.noOfDocuments || 0),
          files,
          status: (it.status || "Pending") as PccRow["status"],
          payment: (it.payment || "Pending") as PccRow["payment"],
          createdAt: it.createdAt || it.updatedAt || new Date().toISOString(),
        };
      });

      setRows(mapped);
    } catch (e: any) {
      setApiError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPcc();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState<string>("All");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [payment, setPayment] = useState<(typeof PAYMENT_OPTIONS)[number]>("All");

  const [showExact, setShowExact] = useState(false);
  const [findCountry, setFindCountry] = useState<string>("All");
  const [useExactFind, setUseExactFind] = useState(false);

  const [openDocsRow, setOpenDocsRow] = useState<PccRow | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    const calc = () => {
      const h = window.innerHeight;
      const reserved = 280;
      const rowH = 56;
      const usable = Math.max(320, h - reserved);
      const size = Math.floor(usable / rowH);
      const clamped = Math.max(10, Math.min(15, size));
      setPageSize(clamped);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const countriesList = useMemo(() => {
    const set = new Set(rows.map((r) => r.country));
    return ["All", ...Array.from(set).sort()];
  }, [rows]);

  const filtered = useMemo(() => {
    let data = [...rows];

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      data = data.filter((r) => {
        return (
          r.id.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.toLowerCase().includes(q) ||
          r.companyName.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q)
        );
      });
    }

    if (country !== "All") data = data.filter((r) => r.country === country);
    if (status !== "All") data = data.filter((r) => r.status === status);
    if (payment !== "All") data = data.filter((r) => r.payment === payment);

    if (useExactFind && findCountry !== "All") {
      data = data.filter((r) => r.country === findCountry);
    }

    return data;
  }, [rows, searchText, country, status, payment, useExactFind, findCountry]);

  const stats = useMemo(() => {
    const total = rows.length;
    const byCountry =
      (useExactFind ? findCountry : country) !== "All"
        ? rows.filter((r) => r.country === (useExactFind ? findCountry : country)).length
        : rows.length;
    const pending = rows.filter((r) => r.status === "Pending").length;
    const completed = rows.filter((r) => r.status === "Approved" || r.status === "Received").length;

    return { total, byCountry, pending, completed };
  }, [rows, country, useExactFind, findCountry]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [pageSize, searchText, country, status, payment, useExactFind, findCountry]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

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

  const onDelete = async (row: PccRow) => {
    if (!window.confirm(`Delete PCC enquiry for ${row.email}?`)) return;

    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/pcc/pcc-legalization/enquiry/${row.id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete");
      alert("Deleted successfully");
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    }
  };

  const onUpdateStatus = async (row: PccRow, newStatus: string) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/pcc/pcc-legalization/enquiry/${row.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      alert("Status updated successfully");
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: newStatus as any } : r))
      );
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    }
  };

  const onUpdatePayment = async (row: PccRow, newPayment: string) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/pcc/pcc-legalization/enquiry/${row.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ payment: newPayment }),
      });

      if (!res.ok) throw new Error("Failed to update payment");
      alert("Payment updated successfully");
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, payment: newPayment as any } : r))
      );
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    }
  };

  const clearExactFind = () => {
    setFindCountry("All");
    setUseExactFind(false);
  };

  return (
    <div className="space-y-4">
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
          <div className="text-2xl font-semibold text-slate-900">{stats.pending}</div>
          <div className="mt-0.5 text-xs text-slate-600">Pending</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-semibold text-slate-900">{stats.completed}</div>
          <div className="mt-0.5 text-xs text-slate-600">Completed</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 flex items-center justify-between">
        <div className="text-sm text-slate-700">
          {loading ? "Loading enquiries..." : apiError ? `Error: ${apiError}` : `Loaded: ${rows.length}`}
        </div>
        <button
          onClick={fetchPcc}
          className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold"
        >
          Refresh
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
            <Filter className="h-4 w-4" />
            Filters
          </div>

          <button
            onClick={() => setShowExact((v) => !v)}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold"
          >
            {showExact ? "Hide Exact Find" : "Exact Find"}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 lg:grid-cols-6 gap-2">
          <div className="lg:col-span-2">
            <label className="text-xs font-medium text-slate-600">Search</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              {countriesList.map((c) => (
                <option key={c} value={c}>
                  {c}
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

          <div className="hidden lg:block" />
        </div>

        {showExact && (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
              <div className="text-sm font-semibold text-slate-900">Exact Find (Country)</div>

              <div className="flex items-center gap-2">
                {useExactFind && (
                  <button
                    onClick={clearExactFind}
                    className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-sm font-medium"
                  >
                    Clear
                  </button>
                )}

                <button
                  onClick={() => setUseExactFind(true)}
                  className="h-9 px-4 rounded-xl bg-teal-900 text-white hover:opacity-95 text-sm font-semibold"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-slate-600">Country</label>
                <select
                  value={findCountry}
                  onChange={(e) => setFindCountry(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none bg-white"
                >
                  {countriesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {useExactFind && (
              <div className="mt-2 text-xs text-slate-600">
                Exact Find is active: showing results for selected country.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-teal-900 text-white px-4 py-3 font-semibold flex items-center justify-between">
          <span>PCC Legalization Enquiries</span>
          <span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Documents</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Phone</th>
                <th className="text-left px-4 py-3 font-medium">Company</th>
                <th className="text-left px-4 py-3 font-medium">Country</th>
                <th className="text-left px-4 py-3 font-medium">No. of Docs</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Payment</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pagedRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-slate-600">
                    {loading ? "Loading..." : "No records found."}
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
                      <div className="mt-1 text-[11px] text-slate-500">
                        {formatDateTime(r.createdAt)}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-900">{r.email}</td>
                    <td className="px-4 py-3 text-slate-900">{r.phone}</td>
                    <td className="px-4 py-3 text-slate-900">{r.companyName}</td>
                    <td className="px-4 py-3 text-slate-900">{r.country}</td>
                    <td className="px-4 py-3 text-slate-900">{r.noOfDocs}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={r.status}
                          onChange={(e) => onUpdateStatus(r, e.target.value)}
                          className="h-9 px-2 rounded-lg border border-sky-200 bg-sky-50 text-sm font-medium text-sky-900 outline-none hover:border-sky-300"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Received">Received</option>
                        </select>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={r.payment}
                          onChange={(e) => onUpdatePayment(r, e.target.value)}
                          className="h-9 px-2 rounded-lg border border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-900 outline-none hover:border-emerald-300"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="inline-flex rounded-xl overflow-hidden border border-slate-200 bg-white">
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

      {openDocsRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenDocsRow(null)} />

          <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
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
                Request ID: <span className="font-semibold text-slate-900">{openDocsRow.id}</span>
              </div>

              <div className="mt-4 space-y-2">
                {openDocsRow.files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {f.type === "pdf" ? (
                        <FileText className="h-5 w-5 text-sky-700" />
                      ) : f.type === "image" ? (
                        <ImageIcon className="h-5 w-5 text-emerald-700" />
                      ) : (
                        <Paperclip className="h-5 w-5 text-slate-700" />
                      )}

                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">{f.name}</div>
                        <div className="text-xs text-slate-600">Click open to view/download</div>
                      </div>
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
                Note: Backend se file URLs aa rahe hain (Cloudinary URLs).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
