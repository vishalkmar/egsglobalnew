import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  CreditCard,
  FileText,
  Receipt,
  XCircle,
} from "lucide-react";
import { paymentsAPI } from "@/lib/api";

type Txn = {
  id: string;
  serviceType: string;
  cashfreeOrderId: string;
  cashfreePaymentId?: string | null;
  transactionId?: string | null;
  amountDisplay: string;
  amountPaise: number;
  currency: string;
  paymentStatus: "pending" | "success" | "failed" | "cancelled" | "refunded";
  paymentMethod?: string | null;
  paymentResponse?: any;
  voucherCode?: string | null;
  voucherNumber?: string | null;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  createdAt: string;
  updatedAt: string;
  submissionId?: string | null;
};

const SERVICE_LABEL: Record<string, string> = {
  insurance: "Insurance",
  dummy_ticket: "Dummy Ticket",
  evisa: "E-Visa",
  hrd: "HRD Attestation",
  mea: "MEA Attestation",
  pcc: "PCC Legalization",
  sticker_visa: "Sticker Visa",
  translation: "Translation",
  assistant_appointment: "Assistant & Appointment",
  meet_greet: "Meet & Greet",
};

function statusMeta(status: string) {
  if (status === "success") {
    return {
      Icon: CheckCircle2,
      pill: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      card: "border-emerald-200",
    };
  }
  if (status === "failed" || status === "cancelled") {
    return {
      Icon: XCircle,
      pill: "bg-rose-50 text-rose-700 border border-rose-200",
      card: "border-rose-200",
    };
  }
  return {
    Icon: Clock3,
    pill: "bg-amber-50 text-amber-700 border border-amber-200",
    card: "border-amber-200",
  };
}

function fmt(d?: string | null, withTime = false) {
  if (!d) return "-";
  return new Date(d).toLocaleString("en-IN", withTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" });
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Txn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ limit: 20, offset: 0, total: 0 });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await paymentsAPI.history({
        limit: pagination.limit,
        offset: pagination.offset,
      });
      const list: Txn[] = res.data?.transactions || [];
      setTransactions(list);
      setPagination((prev) => ({ ...prev, total: res.data?.total || 0 }));
      setExpandedId((curr) => curr || list[0]?.id || null);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [pagination.offset]);

  // Verify on redirect from Cashfree
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("order_id");
    const paymentId = params.get("payment_id") || "";
    if (!orderId) return;

    let cancelled = false;
    (async () => {
      setVerifying(true);
      setInfo("Verifying your payment...");
      try {
        await paymentsAPI.verify({ orderId, paymentId });
        if (cancelled) return;
        setInfo("Payment verified successfully.");
        await load();
        const url = new URL(window.location.href);
        url.searchParams.delete("order_id");
        url.searchParams.delete("payment_id");
        window.history.replaceState({}, "", url.pathname + url.search);
      } catch (err: any) {
        if (!cancelled) setError(err?.response?.data?.message || "Verification failed");
      } finally {
        if (!cancelled) setVerifying(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.limit));
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Receipt className="h-7 w-7 text-[#294d6b]" />
            Transaction Details
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            Complete history of your payments, vouchers and receipts.
          </p>
        </div>
        <div className="rounded-xl border border-[#294d6b]/20 bg-[#294d6b]/5 px-4 py-3 text-sm text-[#294d6b]">
          Payments are processed via Cashfree (UPI, Cards, Netbanking).
        </div>
      </div>

      {(verifying || info) && (
        <div className={`rounded-xl px-5 py-4 text-sm border ${
          verifying
            ? "bg-amber-50 border-amber-200 text-amber-800"
            : "bg-emerald-50 border-emerald-200 text-emerald-700"
        }`}>
          {verifying ? "Verifying payment..." : info}
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      )}

      {loading && transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-10 w-10 rounded-full border-4 border-[#294d6b] border-t-transparent animate-spin mb-3" />
          <p className="text-slate-500">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-500">No transactions yet. After your first paid service, your receipts will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((t) => {
            const meta = statusMeta(t.paymentStatus);
            const Icon = meta.Icon;
            const isExpanded = expandedId === t.id;
            const serviceLabel = SERVICE_LABEL[t.serviceType] || t.serviceType;

            return (
              <div key={t.id} className={`rounded-2xl border ${meta.card} bg-white shadow-sm overflow-hidden`}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedId(isExpanded ? null : t.id)}
                  className="w-full text-left px-5 py-4 cursor-pointer"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-xl bg-[#294d6b]/10 text-[#294d6b] flex items-center justify-center">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-bold text-slate-900">{serviceLabel}</h2>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.pill}`}>
                            <Icon className="h-3.5 w-3.5" />
                            {t.paymentStatus.toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {fmt(t.createdAt, true)}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm">
                          <span className="font-semibold text-slate-900">{t.amountDisplay}</span>
                          <span className="text-slate-500 break-all">Order: {t.cashfreeOrderId}</span>
                          {t.voucherNumber && (
                            <span className="text-slate-500">Voucher: {t.voucherNumber}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start md:self-center">
                      <span className="text-xs text-slate-400">{isExpanded ? "Hide" : "View"} details</span>
                      <div className="rounded-lg border border-slate-200 p-1.5 text-slate-500">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 pb-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" /> Payment Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Internal ID</span><span className="font-medium text-slate-900 text-right break-all">{t.id}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Order ID</span><span className="font-medium text-slate-900 text-right break-all">{t.cashfreeOrderId}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Gateway Payment ID</span><span className="font-medium text-slate-900 text-right break-all">{t.cashfreePaymentId || "-"}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Method</span><span className="font-medium text-slate-900">{t.paymentMethod || "Cashfree"}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Currency</span><span className="font-medium text-slate-900">{t.currency || "INR"}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Amount</span><span className="font-semibold text-slate-900">{t.amountDisplay}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Created</span><span className="font-medium text-slate-900">{fmt(t.createdAt, true)}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Updated</span><span className="font-medium text-slate-900">{fmt(t.updatedAt, true)}</span></div>
                        </div>
                      </section>

                      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Customer & Voucher</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Name</span><span className="font-medium text-slate-900">{t.customerName || "-"}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Email</span><span className="font-medium text-slate-900 break-all text-right">{t.customerEmail || "-"}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Phone</span><span className="font-medium text-slate-900">{t.customerPhone || "-"}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Service</span><span className="font-medium text-slate-900">{serviceLabel}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Voucher Code</span><span className="font-mono font-semibold text-slate-900 text-right break-all">{t.voucherCode || "-"}</span></div>
                          <div className="flex justify-between gap-3"><span className="text-slate-500">Voucher Ref</span><span className="font-medium text-slate-900">{t.voucherNumber || "-"}</span></div>
                          {t.submissionId && (
                            <div className="flex justify-between gap-3"><span className="text-slate-500">Submission</span><a href={`/user/track/${t.serviceType}/${t.submissionId}`} className="text-[#294d6b] font-semibold hover:underline">Track →</a></div>
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-600">
            Page {currentPage} of {totalPages} • Total {pagination.total} transactions
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPagination((prev) => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPagination((prev) => ({ ...prev, offset: prev.offset + prev.limit }))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
