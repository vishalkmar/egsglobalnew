import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, ExternalLink, Filter, LayoutGrid, RefreshCcw, Search } from "lucide-react";

type ServiceKey =
  | "evisa"
  | "hrd"
  | "mea"
  | "pcc"
  | "sticker_visa"
  | "translation"
  | "assistant_appointment"
  | "insurance"
  | "meet_greet";

type ServiceStat = {
  label: string;
  total: number;
  byStatus: Record<string, number>;
};

type DashboardResponse = {
  success: boolean;
  totals: {
    totalSubmissions: number;
    totalPending: number;
    totalUsers: number;
  };
  perService: Record<ServiceKey, ServiceStat>;
};

type SubmissionItem = {
  id: string;
  serviceType: ServiceKey;
  label: string;
  name?: string;
  email?: string;
  phone?: string;
  contact?: string;
  country?: string;
  state?: string;
  destination?: string;
  submissionCountry?: string;
  visaType?: string;
  docType?: string;
  insuranceType?: string;
  status?: string;
  payment?: string;
  createdAt?: string;
  submittedAt?: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ROUTE_BY_SERVICE: Record<ServiceKey, string> = {
  evisa: "/admin/e-visa",
  hrd: "/admin/hrd-attestation",
  mea: "/admin/mea-attestation",
  pcc: "/admin/pcc-legalization",
  sticker_visa: "/admin/sticker-visa",
  translation: "/admin/translation",
  assistant_appointment: "/admin/assistant-appointment",
  insurance: "/admin/insurance",
  meet_greet: "/admin/meet-greet",
};

const SERVICE_OPTIONS: Array<{ value: "" | ServiceKey; label: string }> = [
  { value: "", label: "All Services" },
  { value: "evisa", label: "E-Visa" },
  { value: "hrd", label: "HRD Attestation" },
  { value: "mea", label: "MEA Attestation" },
  { value: "pcc", label: "PCC Legalization" },
  { value: "sticker_visa", label: "Sticker Visa" },
  { value: "translation", label: "Translation" },
  { value: "assistant_appointment", label: "Assistant & Appointment" },
  { value: "insurance", label: "Insurance" },
  { value: "meet_greet", label: "Meet & Greet" },
];

const readFiltersFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") || "",
    from: params.get("from") || "",
    to: params.get("to") || "",
    year: params.get("year") || "",
    serviceType: (params.get("serviceType") || "") as "" | ServiceKey,
  };
};

const syncUrl = (filters: { q: string; from: string; to: string; year: string; serviceType: "" | ServiceKey }) => {
  const url = new URL(window.location.href);
  const entries: Array<[string, string]> = [
    ["q", filters.q.trim()],
    ["from", filters.from],
    ["to", filters.to],
    ["year", filters.year],
    ["serviceType", filters.serviceType],
  ];

  entries.forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  });

  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event("admin-dashboard-query-sync"));
};

const formatDate = (value?: string) => {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const buildSummary = (item: SubmissionItem) =>
  [
    item.country,
    item.state,
    item.destination,
    item.submissionCountry,
    item.visaType,
    item.docType,
    item.insuranceType,
  ]
    .filter(Boolean)
    .join(" | ") || "Submission received";

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardResponse | null>(null);
  const [rows, setRows] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [year, setYear] = useState("");
  const [serviceType, setServiceType] = useState<"" | ServiceKey>("");

  const applyFiltersFromUrl = () => {
    const next = readFiltersFromUrl();
    setQuery(next.q);
    setFromDate(next.from);
    setToDate(next.to);
    setYear(next.year);
    setServiceType(next.serviceType);
  };

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = readFiltersFromUrl();
      const params = new URLSearchParams();
      if (filters.q) params.set("search", filters.q);
      if (filters.from) params.set("from", filters.from);
      if (filters.to) params.set("to", filters.to);
      if (filters.year) params.set("year", filters.year);
      if (filters.serviceType) params.set("serviceType", filters.serviceType);
      params.set("limit", "250");

      const [meRes, dashboardRes, submissionsRes] = await Promise.all([
        fetch(`${API_BASE}/secureadmin/admin/me`, { credentials: "include" }),
        fetch(`${API_BASE}/secureadmin/admin/dashboard?${params.toString()}`, { credentials: "include" }),
        fetch(`${API_BASE}/secureadmin/admin/submissions?${params.toString()}`, { credentials: "include" }),
      ]);

      if (!meRes.ok) {
        window.location.replace("/admin/login");
        return;
      }

      const dashboardData = await dashboardRes.json().catch(() => ({}));
      const submissionsData = await submissionsRes.json().catch(() => ({}));

      if (!dashboardRes.ok) {
        throw new Error(dashboardData?.message || "Failed to load dashboard");
      }
      if (!submissionsRes.ok) {
        throw new Error(submissionsData?.message || "Failed to load submissions");
      }

      setSummary(dashboardData);
      setRows(submissionsData.items || []);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFiltersFromUrl();
    fetchDashboard();

    const handleSync = () => {
      applyFiltersFromUrl();
      fetchDashboard();
    };

    window.addEventListener("popstate", handleSync);
    window.addEventListener("admin-dashboard-search", handleSync);
    window.addEventListener("admin-dashboard-query-sync", handleSync);

    return () => {
      window.removeEventListener("popstate", handleSync);
      window.removeEventListener("admin-dashboard-search", handleSync);
      window.removeEventListener("admin-dashboard-query-sync", handleSync);
    };
  }, []);

  const serviceCards = useMemo(() => {
    if (!summary) return [];
    return Object.entries(summary.perService).map(([key, item]) => ({
      key: key as ServiceKey,
      label: item.label,
      total: item.total,
      pending: item.byStatus?.Pending || 0,
      route: ROUTE_BY_SERVICE[key as ServiceKey],
    }));
  }, [summary]);

  const availableYears = useMemo(() => {
    const current = new Date().getFullYear();
    const discovered = rows
      .map((row) => new Date(row.createdAt || row.submittedAt || "").getFullYear())
      .filter((value) => !Number.isNaN(value));
    const merged = Array.from(new Set([current, current - 1, current - 2, ...discovered]));
    return merged.sort((a, b) => b - a);
  }, [rows]);

  const onFilterChange = (next: Partial<{ q: string; from: string; to: string; year: string; serviceType: "" | ServiceKey }>) => {
    const merged = {
      q: next.q ?? query,
      from: next.from ?? fromDate,
      to: next.to ?? toDate,
      year: next.year ?? year,
      serviceType: next.serviceType ?? serviceType,
    };

    setQuery(merged.q);
    setFromDate(merged.from);
    setToDate(merged.to);
    setYear(merged.year);
    setServiceType(merged.serviceType);
    syncUrl(merged);
  };

  const clearFilters = () => {
    onFilterChange({ q: "", from: "", to: "", year: "", serviceType: "" });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#294d6b] to-[#1f3b54] p-6 text-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm text-white/75">Admin Overview</div>
            <h1 className="mt-1 text-2xl font-semibold">All submissions in one place</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80">
              Global search, date filters, and service-wise cards are now connected so you can jump straight to the right tab.
            </p>
          </div>

          <button
            onClick={fetchDashboard}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh Data
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <button
          onClick={clearFilters}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-[#294d6b]/25 hover:bg-white"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">Total Forms</span>
            <LayoutGrid className="h-4 w-4 text-[#294d6b]" />
          </div>
          <div className="mt-4 text-3xl font-semibold text-slate-900">{summary?.totals.totalSubmissions ?? 0}</div>
          <div className="mt-1 text-xs text-slate-500">All filtered services combined</div>
        </button>

        {serviceCards.map((card) => (
          <button
            key={card.key}
            onClick={() => window.location.assign(card.route)}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-[#294d6b]/25 hover:shadow-sm"
          >
            <div className="text-sm font-semibold text-slate-600">{card.label}</div>
            <div className="mt-4 text-3xl font-semibold text-slate-900">{card.total}</div>
            <div className="mt-1 text-xs text-slate-500">Pending: {card.pending}</div>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Filter className="h-4 w-4 text-[#294d6b]" />
            Dashboard Filters
          </div>

          <button
            onClick={clearFilters}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Clear All
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <label className="text-xs font-medium text-slate-600">Global Search</label>
            <div className="mt-1 flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => onFilterChange({ q: e.target.value })}
                placeholder="Name, email, payment, date, visa, insurance, state..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Service</label>
            <select
              value={serviceType}
              onChange={(e) => onFilterChange({ serviceType: e.target.value as "" | ServiceKey })}
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Year</label>
            <select
              value={year}
              onChange={(e) => onFilterChange({ year: e.target.value })}
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
            >
              <option value="">All Years</option>
              {availableYears.map((option) => (
                <option key={option} value={String(option)}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">From Date</label>
            <div className="mt-1 flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3">
              <CalendarDays className="h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => onFilterChange({ from: e.target.value })}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">To Date</label>
            <div className="mt-1 flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3">
              <CalendarDays className="h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={toDate}
                onChange={(e) => onFilterChange({ to: e.target.value })}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#294d6b] px-5 py-4 text-white">
          <div>
            <div className="text-base font-semibold">Global Results</div>
            <div className="text-xs text-white/75">Search across all admin forms from one panel</div>
          </div>
          <div className="text-sm font-semibold">Showing {rows.length}</div>
        </div>

        {error && (
          <div className="border-b border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Service</th>
                <th className="px-4 py-3 text-left font-medium">Applicant</th>
                <th className="px-4 py-3 text-left font-medium">Details</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Payment</th>
                <th className="px-4 py-3 text-left font-medium">Created</th>
                <th className="px-4 py-3 text-left font-medium">Open</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                    Loading dashboard data...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                    No submissions matched the current filters.
                  </td>
                </tr>
              ) : (
                rows.map((item) => (
                  <tr key={`${item.serviceType}-${item.id}`} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.serviceType}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{item.name || "User"}</div>
                      <div className="text-xs text-slate-500">{item.email || "No email"}</div>
                      <div className="text-xs text-slate-500">{item.phone || item.contact || "No phone"}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{buildSummary(item)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-[#294d6b]">
                        {item.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{item.payment || "Pending"}</td>
                    <td className="px-4 py-3 text-slate-700">{formatDate(item.createdAt || item.submittedAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => window.location.assign(ROUTE_BY_SERVICE[item.serviceType])}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 font-medium text-[#294d6b] hover:bg-slate-50"
                      >
                        Open
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
