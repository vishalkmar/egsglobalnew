import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { CheckCircle2, Loader2, Receipt, ArrowRight, XCircle } from "lucide-react";
import { paymentsAPI } from "@/lib/api";

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("order_id");
    const paymentId = params.get("payment_id") || "";

    if (!orderId) {
      setStatus("failed");
      setError("No payment session found.");
      return;
    }

    (async () => {
      try {
        const res = await paymentsAPI.verify({ orderId, paymentId });
        setPayment(res.data?.payment || null);
        setStatus("success");
      } catch (err: any) {
        setError(err?.response?.data?.message || "Payment verification failed");
        setStatus("failed");
      }
    })();
  }, []);

  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-3xl px-8 py-10 text-center max-w-md w-full">
          <Loader2 className="h-12 w-12 text-[#294d6b] mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-bold text-slate-900">Verifying payment...</h2>
          <p className="text-slate-500 mt-2 text-sm">Please don't close this window.</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-rose-200 rounded-3xl px-8 py-10 text-center max-w-md w-full">
          <XCircle className="h-14 w-14 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Payment Failed</h2>
          <p className="text-slate-600 mt-2 text-sm">{error || "Something went wrong."}</p>
          <button
            onClick={() => setLocation("/user/dashboard")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#294d6b] hover:bg-[#1f3b54] text-white px-5 py-3 text-sm font-semibold"
          >
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-emerald-200 rounded-3xl px-6 py-8 max-w-2xl w-full shadow-sm">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Payment Successful</h2>
          <p className="text-slate-600 mt-2">Your payment has been processed and a receipt has been emailed to you.</p>
        </div>

        {payment && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Service</span><span className="font-semibold text-slate-900 capitalize">{String(payment.serviceType || "").replace("_", " ")}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-semibold text-slate-900">{payment.amountDisplay}</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Order ID</span><span className="font-medium text-slate-900 break-all text-right">{payment.cashfreeOrderId}</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Payment ID</span><span className="font-medium text-slate-900 break-all text-right">{payment.cashfreePaymentId || "-"}</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Voucher Code</span><span className="font-mono font-semibold text-slate-900 text-right break-all">{payment.voucherCode || "-"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Voucher Ref</span><span className="font-medium text-slate-900">{payment.voucherNumber || "-"}</span></div>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link href="/user/transactions">
            <a className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#294d6b] hover:bg-[#1f3b54] text-white px-5 py-3 text-sm font-semibold">
              <Receipt className="h-4 w-4" /> View Transactions
            </a>
          </Link>
          {payment?.submissionId && (
            <Link href={`/user/track/${payment.serviceType}/${payment.submissionId}`}>
              <a className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-3 text-sm font-semibold">
                Track Application <ArrowRight className="h-4 w-4" />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
