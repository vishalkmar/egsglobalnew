import React from "react";
import { Link } from "wouter";
import { XCircle, ArrowRight, RefreshCcw } from "lucide-react";

export default function PaymentFailure() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-rose-200 rounded-3xl px-6 py-8 max-w-md w-full text-center shadow-sm">
        <div className="h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
          <XCircle className="h-9 w-9 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Payment Failed</h2>
        <p className="text-slate-600 mt-2 text-sm">
          Your payment could not be processed. No amount has been deducted. You can retry from the form.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/user/insurance">
            <a className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#294d6b] hover:bg-[#1f3b54] text-white px-5 py-3 text-sm font-semibold">
              <RefreshCcw className="h-4 w-4" /> Retry Payment
            </a>
          </Link>
          <Link href="/user/dashboard">
            <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-3 text-sm font-semibold">
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
