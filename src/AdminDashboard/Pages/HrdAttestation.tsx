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

/* ---------- TYPES ---------- */

type DocFile = {
  name: string;
  url: string;
  type: "pdf" | "image" | "other";
};

type HrdRow = {
  id: string;
  email: string;
  contact: string;

  // HRD: Country nahi, State
  state: string;

  category: string; // Educational/Personal/Commercial
  docType: string;
  noOfDocs: number;

  files: DocFile[];

  status: "Pending" | "Approved" | "Rejected" | "Dispatched" | "Received";
  payment: "Paid" | "Pending";
  createdAt: string;
};

/* ---------- CONSTANTS ---------- */

// ✅ State list yahan daal do (frontend se fixed nahi hota)
// Abhi example states, aap chahe to ALL STATES ka array yahin paste kar dena.
const STATES = [
  "All",
  "Delhi",
  "Haryana",
  "Uttar Pradesh",
  "Rajasthan",
  "Punjab",
  "Maharashtra",
  "Gujarat",
  "Madhya Pradesh",
  "Bihar",
  "West Bengal",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Kerala",
];

const CATEGORY_OPTIONS = [
  "Select Category",
  "Educational Documents",
  "Personal Documents",
  "Commercial Documents",
];

const DOC_TYPE_BY_CATEGORY: Record<string, string[]> = {
  "Educational Documents": [
    "Select Document Type",
    "Degree Certificate",
    "Marksheet",
    "Diploma",
    "Transcript",
  ],
  "Personal Documents": [
    "Select Document Type",
    "Birth certificate",
    "Marriage certificate",
    "Death certificate",
    "Divorce certificate",
    "PCC Certificate",
  ],
  "Commercial Documents": [
    "Select Document Type",
    "Invoice",
    "COO (Certificate of Origin)",
    "Authorization Letter",
    "Company Registration",
  ],
};

const STATUS_OPTIONS: Array<HrdRow["status"] | "All"> = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Dispatched",
  "Received",
];

const PAYMENT_OPTIONS: Array<HrdRow["payment"] | "All"> = ["All", "Paid", "Pending"];

/* ---------- COMPONENT ---------- */

export default function HRDAttestation() {
  /* ---------- MOCK DATA ---------- */
  const [rows] = useState<HrdRow[]>([
    {
      id: "HRD-2001",
      email: "user1@example.com",
      contact: "9876543210",
      state: "Delhi",
      category: "Educational Documents",
      docType: "Degree Certificate",
      noOfDocs: 2,
      files: [
        { name: "degree.pdf", url: "#", type: "pdf" },
        { name: "marksheet.pdf", url: "#", type: "pdf" },
      ],
      status: "Pending",
      payment: "Pending",
      createdAt: "Just now",
    },
    {
      id: "HRD-2002",
      email: "user2@example.com",
      contact: "9999999999",
      state: "Maharashtra",
      category: "Personal Documents",
      docType: "Birth certificate",
      noOfDocs: 1,
      files: [{ name: "birth.pdf", url: "#", type: "pdf" }],
      status: "Approved",
      payment: "Paid",
      createdAt: "2 hours ago",
    },
    {
      id: "HRD-2003",
      email: "user3@example.com",
      contact: "8888888888",
      state: "Rajasthan",
      category: "Commercial Documents",
      docType: "Invoice",
      noOfDocs: 3,
      files: [
        { name: "invoice1.pdf", url: "#", type: "pdf" },
        { name: "invoice2.pdf", url: "#", type: "pdf" },
      ],
      status: "Dispatched",
      payment: "Paid",
      createdAt: "6 hours ago",
    },
  ]);

  /* ---------- FILTERS ---------- */
  const [searchText, setSearchText] = useState("");
  const [state, setState] = useState<string>("All");
  const [category, setCategory] = useState<string>("Select Category");
  const [docType, setDocType] = useState<string>("Select Document Type");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [payment, setPayment] = useState<(typeof PAYMENT_OPTIONS)[number]>("All");

  // Exact Find (collapsible)
  const [showExact, setShowExact] = useState(false);
  const [findState, setFindState] = useState<string>("All");
  const [findCategory, setFindCategory] = useState<string>("Select Category");
  const [findDocType, setFindDocType] = useState<string>("Select Document Type");
  const [useExactFind, setUseExactFind] = useState(false);

  // Docs modal
  const [openDocsRow, setOpenDocsRow] = useState<HrdRow | null>(null);

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
      const clamped = Math.max(10, Math.min(15, size));
      setPageSize(clamped);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // reset doc type when category changes
  useEffect(() => {
    setDocType("Select Document Type");
  }, [category]);

  useEffect(() => {
    setFindDocType("Select Document Type");
  }, [findCategory]);

  /* ---------- OPTIONS ---------- */
  const docTypeOptions = useMemo(() => {
    if (!DOC_TYPE_BY_CATEGORY[category]) return ["Select Document Type"];
    return DOC_TYPE_BY_CATEGORY[category];
  }, [category]);

  const findDocTypeOptions = useMemo(() => {
    if (!DOC_TYPE_BY_CATEGORY[findCategory]) return ["Select Document Type"];
    return DOC_TYPE_BY_CATEGORY[findCategory];
  }, [findCategory]);

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
          r.state.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.docType.toLowerCase().includes(q)
        );
      });
    }

    if (state !== "All") data = data.filter((r) => r.state === state);
    if (category !== "Select Category") data = data.filter((r) => r.category === category);
    if (docType !== "Select Document Type") data = data.filter((r) => r.docType === docType);

    if (status !== "All") data = data.filter((r) => r.status === status);
    if (payment !== "All") data = data.filter((r) => r.payment === payment);

    if (useExactFind) {
      if (findState !== "All") data = data.filter((r) => r.state === findState);
      if (findCategory !== "Select Category") data = data.filter((r) => r.category === findCategory);
      if (findDocType !== "Select Document Type") data = data.filter((r) => r.docType === findDocType);
    }

    return data;
  }, [
    rows,
    searchText,
    state,
    category,
    docType,
    status,
    payment,
    useExactFind,
    findState,
    findCategory,
    findDocType,
  ]);

  /* ---------- STATS ---------- */
  const stats = useMemo(() => {
    const total = rows.length;

    const byState =
      findState !== "All"
        ? rows.filter((r) => r.state === findState).length
        : state !== "All"
          ? rows.filter((r) => r.state === state).length
          : rows.length;

    const byCategory =
      (useExactFind ? findCategory : category) !== "Select Category"
        ? rows.filter((r) => r.category === (useExactFind ? findCategory : category)).length
        : rows.length;

    const byType =
      (useExactFind ? findDocType : docType) !== "Select Document Type"
        ? rows.filter((r) => r.docType === (useExactFind ? findDocType : docType)).length
        : rows.length;

    return { total, byState, byCategory, byType };
  }, [rows, state, category, docType, useExactFind, findState, findCategory, findDocType]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [
    pageSize,
    searchText,
    state,
    category,
    docType,
    status,
    payment,
    useExactFind,
    findState,
    findCategory,
    findDocType,
  ]);

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

  const onEdit = (row: HrdRow) => alert(`Edit: ${row.id} (wire this to edit modal/page)`);
  const onDelete = (row: HrdRow) => alert(`Delete: ${row.id} (wire this to delete confirm + API)`);

  const clearExactFind = () => {
    setFindState("All");
    setFindCategory("Select Category");
    setFindDocType("Select Document Type");
    setUseExactFind(false);
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-6 border-b border-slate-100">
          <h1 className="text-2xl sm:text-3xl font-semibold text-teal-900">HRD Attestation</h1>
          <div className="mt-2 text-sm text-slate-500">
            Manage requests, applications and operations from here.
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-semibold text-slate-900">{stats.total}</div>
              <div className="mt-0.5 text-xs text-slate-600">Total Requests</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-2xl font-semibold text-slate-900">{stats.byState}</div>
              <div className="mt-0.5 text-xs text-slate-600">State wise</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-2xl font-semibold text-slate-900">{stats.byCategory}</div>
              <div className="mt-0.5 text-xs text-slate-600">Category wise</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-2xl font-semibold text-slate-900">{stats.byType}</div>
              <div className="mt-0.5 text-xs text-slate-600">Type wise</div>
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
                onClick={() => setShowExact((v) => !v)}
                className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold"
              >
                {showExact ? "Hide Exact Find" : "Exact Find"}
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
                    placeholder="Search by email, contact, state, category, type..."
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label className="text-xs font-medium text-slate-600">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                >
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-medium text-slate-600">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="text-xs font-medium text-slate-600">Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                >
                  {docTypeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
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

              {/* Payment */}
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

            {/* Exact Find */}
            {showExact && (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900">
                    Exact Find (State + Category + Type)
                  </div>

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

                <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-600">State</label>
                    <select
                      value={findState}
                      onChange={(e) => setFindState(e.target.value)}
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none bg-white"
                    >
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600">Category</label>
                    <select
                      value={findCategory}
                      onChange={(e) => setFindCategory(e.target.value)}
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none bg-white"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600">Type</label>
                    <select
                      value={findDocType}
                      onChange={(e) => setFindDocType(e.target.value)}
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none bg-white"
                    >
                      {findDocTypeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {useExactFind && (
                  <div className="mt-2 text-xs text-slate-600">
                    Exact Find is active: showing results for selected values.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-teal-900 text-white px-4 py-3 font-semibold flex items-center justify-between">
              <span>HRD Enquiries</span>
              <span className="text-sm font-semibold opacity-90">Showing: {filtered.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Documents</th>
                    <th className="text-left px-4 py-3 font-medium">Email</th>
                    <th className="text-left px-4 py-3 font-medium">Contact</th>
                    <th className="text-left px-4 py-3 font-medium">State</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-left px-4 py-3 font-medium">Type</th>
                    <th className="text-left px-4 py-3 font-medium">No. of Docs</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Payment</th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {pagedRows.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-10 text-center text-slate-600">
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
                        <td className="px-4 py-3 text-slate-900">{r.state}</td>
                        <td className="px-4 py-3 text-slate-900">{r.category}</td>
                        <td className="px-4 py-3 text-slate-900">{r.docType}</td>
                        <td className="px-4 py-3 text-slate-900">{r.noOfDocs}</td>

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
      </div>

      {/* Documents Modal */}
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
                Note: Abhi links dummy hain. Backend se file URLs aayenge to yahin render ho jayenge.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
