import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  CreditCard,
  Filter,
  Loader2,
  Mail,
  RefreshCcw,
  Search,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { paymentsAPI } from "@/lib/api";

type Payment = {
  id: string;
  userId: string;
  serviceType: string;
  cashfreeOrderId: string;
  cashfreePaymentId?: string | null;
  transactionId?: string | null;
  amountDisplay: string;
  amountPaise: number;
  paymentStatus: string;
  paymentMethod?: string | null;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  voucherCode?: string | null;
  voucherNumber?: string | null;
  emailLastStatus?: string | null;
  voucherSent?: boolean;
  createdAt: string;
  updatedAt: string;
  submissionId?: string | null;
  user?: { id: string; email: string; name: string; phone: string } | null;
};

const SERVICE_OPTIONS = [
  { v: "", l: "All services" },
  { v: "insurance", l: "Insurance" },
  { v: "dummy_ticket", l: "Dummy Ticket" },
  { v: "evisa", l: "E-Visa" },
  { v: "hrd", l: "HRD" },
  { v: "mea", l: "MEA" },
  { v: "pcc", l: "PCC" },
  { v: "translation", l: "Translation" },
  { v: "meet_greet", l: "Meet & Greet" },
];

function statusPill(status: string) {
  if (status === "success") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  if (status === "failed" || status === "cancelled") return "bg-rose-50 text-rose-700 border border-rose-200";
  return "bg-amber-50 text-amber-700 border border-amber-200";
}

function fmt(d?: string | null, withTime = true) {
  if (!d) return "-";
  return new Date(d).toLocaleString("en-IN", withTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" });
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [resending, setResending] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * limit;
      const params: any = { limit, offset };
      if (search) params.search = search;
      if (status) params.status = status;
      if (serviceType) params.serviceType = serviceType;
      if (from) params.from = from;
      if (to) params.to = to;

      const [listRes, statsRes] = await Promise.all([
        paymentsAPI.adminList(params),
        paymentsAPI.adminStats({ from, to }),
      ]);

      setPayments(listRes.data?.payments || []);
      setStats(statsRes.data?.stats || null);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const total = stats?.total_transactions || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleResend = async (id: string) => {
    setResending(id);
    try {
      await paymentsAPI.adminResend(id);
      await load();
      alert("Receipt re-sent successfully.");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to resend receipt.");
    } finally {
      setResending(null);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = "text-[#294d6b]" }: any) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-2xl font-bold ${color}`}>{value}</div>
          <div className="text-xs text-slate-500 mt-0.5">{title}</div>
        </div>
        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-slate-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <CreditCard className="h-7 w-7 text-[#294d6b]" />
          Payments Management
        </h1>
        <p className="text-slate-600 text-sm mt-1">All Cashfree transactions, receipts, and revenue analytics.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard title="Total Revenue" value={stats?.total_revenue || "Rs 0.00"} icon={TrendingUp} color="text-emerald-700" />
        <StatCard title="Total Transactions" value={stats?.total_transactions || 0} icon={CreditCard} />
        <StatCard title="Successful" value={stats?.successful_payments || 0} icon={CheckCircle2} color="text-emerald-700" />
        <StatCard title="Failed" value={stats?.failed_payments || 0} icon={XCircle} color="text-rose-700" />
        <StatCard title="Unique Customers" value={stats?.unique_customers || 0} icon={Users} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-3">
          <Filter className="h-4 w-4" /> Filters
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
          <div className="lg:col-span-2">
            <label className="text-xs font-medium text-slate-600">Search</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { setPage(1); load(); } }}
                placeholder="Email, name, order id, voucher..."
                className="w-full outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600">Service</label>
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none">
              {SERVICE_OPTIONS.map((s) => (<option key={s.v} value={s.v}>{s.l}</option>))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600">From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600">To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            onClick={() => { setPage(1); load(); }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#294d6b] hover:bg-[#1f3b54] text-white px-4 py-2 text-sm font-semibold"
          >
            <RefreshCcw className="h-4 w-4" /> Apply
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 px-5 py-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#294d6b] text-white px-4 py-3 font-semibold flex items-center justify-between">
          <span>Transactions</span>
          <span className="text-sm opacity-90">Total: {total}</span>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 text-[#294d6b] animate-spin mb-2" />
            <span className="text-sm text-slate-500">Loading...</span>
          </div>
        ) : payments.length === 0 ? (
          <div className="py-16 text-center text-slate-500">No transactions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Customer</th>
                  <th className="text-left px-4 py-3 font-medium">Service</th>
                  <th className="text-left px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => {
                  const isExp = expandedId === p.id;
                  return (
                    <React.Fragment key={p.id}>
                      <tr className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-900">
                          <div className="font-medium">{p.user?.name || p.customerName || "User"}</div>
                          <div className="text-xs text-slate-500 break-all">{p.user?.email || p.customerEmail}</div>
                          <div className="text-xs text-slate-500">{p.user?.phone || p.customerPhone}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-900 capitalize">{String(p.serviceType).replace("_", " ")}</td>
                        <td className="px-4 py-3 text-slate-900 font-semibold">{p.amountDisplay}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusPill(p.paymentStatus)}`}>
                            {p.paymentStatus === "success" ? <CheckCircle2 className="h-3.5 w-3.5" /> : p.paymentStatus === "failed" ? <XCircle className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
                            {p.paymentStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <span className={`inline-block rounded-full px-2 py-0.5 ${
                            p.emailLastStatus === "sent" ? "bg-emerald-50 text-emerald-700" :
                            p.emailLastStatus === "failed" ? "bg-rose-50 text-rose-700" :
                            "bg-slate-100 text-slate-600"
                          }`}>
                            {p.emailLastStatus || "pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600">{fmt(p.createdAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setExpandedId(isExp ? null : p.id)}
                              className="h-9 w-9 grid place-items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
                              title={isExp ? "Hide" : "View"}
                            >
                              {isExp ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                            {p.paymentStatus === "success" && (
                              <button
                                onClick={() => handleResend(p.id)}
                                disabled={resending === p.id}
                                className="h-9 px-3 rounded-xl border border-[#294d6b]/20 bg-[#294d6b]/5 hover:bg-[#294d6b]/10 text-xs font-semibold text-[#294d6b] inline-flex items-center gap-1.5"
                                title="Resend receipt"
                              >
                                {resending === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Mail className="h-3.5 w-3.5" />}
                                Resend
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      {isExp && (
                        <tr className="bg-slate-50">
                          <td colSpan={7} className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Payment</h4>
                                <div className="space-y-1.5 text-xs">
                                  <div><span className="text-slate-500">Order ID:</span> <span className="font-medium break-all">{p.cashfreeOrderId}</span></div>
                                  <div><span className="text-slate-500">Gateway ID:</span> <span className="font-medium break-all">{p.cashfreePaymentId || "-"}</span></div>
                                  <div><span className="text-slate-500">Method:</span> <span className="font-medium">{p.paymentMethod || "Cashfree"}</span></div>
                                  <div><span className="text-slate-500">Updated:</span> <span className="font-medium">{fmt(p.updatedAt)}</span></div>
                                </div>
                              </div>
                              <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Voucher</h4>
                                <div className="space-y-1.5 text-xs">
                                  <div><span className="text-slate-500">Code:</span> <span className="font-mono font-semibold break-all">{p.voucherCode || "-"}</span></div>
                                  <div><span className="text-slate-500">Reference:</span> <span className="font-medium">{p.voucherNumber || "-"}</span></div>
                                  <div><span className="text-slate-500">Voucher Sent:</span> <span className="font-medium">{p.voucherSent ? "Yes" : "No"}</span></div>
                                </div>
                              </div>
                              <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Submission</h4>
                                <div className="space-y-1.5 text-xs">
                                  <div><span className="text-slate-500">Service:</span> <span className="font-medium capitalize">{String(p.serviceType).replace("_", " ")}</span></div>
                                  <div><span className="text-slate-500">Submission ID:</span> <span className="font-medium break-all">{p.submissionId || "-"}</span></div>
                                  <div><span className="text-slate-500">User ID:</span> <span className="font-medium break-all">{p.userId || "-"}</span></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-4 py-3 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">Page {page} of {totalPages}</div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-sm font-semibold"
            >Prev</button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-sm font-semibold"
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
