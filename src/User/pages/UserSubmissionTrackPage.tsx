import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Loader2,
  Package,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";
import { userDashboardAPI } from "@/lib/api";

type TrackPageProps = {
  params: {
    type: string;
    id: string;
  };
};

type TimelineItem = {
  id?: string;
  toStatus?: string;
  fromStatus?: string | null;
  status?: string;
  note?: string | null;
  notes?: string | null;
  createdAt?: string;
};

type DocumentItem = {
  id?: string;
  originalName?: string;
  url?: string;
};

const STAGES = [
  { key: "Pending", label: "Pending", icon: Clock3 },
  { key: "Processing", label: "Processing", icon: Package },
  { key: "Approved", label: "Approved", icon: CheckCircle2 },
  { key: "Dispatched", label: "Dispatched", icon: Truck },
  { key: "Received", label: "Received", icon: PackageCheck },
];

function getStageIndex(status?: string) {
  const idx = STAGES.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

const SERVICE_BACK: Record<string, string> = {
  mea: "/user/mea-attestation",
  pcc: "/user/pcc-legalization",
  hrd: "/user/hrd-attestation",
  evisa: "/user/e-visa",
  translation: "/user/translation",
  meet_greet: "/user/meet-greet",
  assistant_appointment: "/user/assistant-appointment",
  dummy_ticket: "/user/dummy-ticket",
  insurance: "/user/insurance",
};

export default function UserSubmissionTrackPage({ params }: TrackPageProps) {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [history, setHistory] = useState<TimelineItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await userDashboardAPI.getSubmissionTimeline(params.type, params.id);
        if (cancelled) return;
        setSubmission(res.data?.submission || null);
        setHistory(res.data?.history || []);
        setDocuments(res.data?.documents || []);
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.response?.data?.message || "Failed to load tracking details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [params.id, params.type]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-[#294d6b]" />
          <p className="text-sm text-slate-500">Loading tracking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Tracking details not found.</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentStatus = submission?.status || "Pending";
  const isRejected = currentStatus === "Rejected";
  const stageIndex = isRejected ? -1 : getStageIndex(currentStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setLocation(SERVICE_BACK[params.type] || "/user/dashboard")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className={`rounded-xl px-4 py-2 text-sm font-semibold ${
          isRejected
            ? "bg-rose-50 text-rose-700"
            : currentStatus === "Received"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-[#294d6b]/10 text-[#294d6b]"
        }`}>
          Status: {currentStatus}
        </div>
      </div>

      {/* Order tracker - Flipkart/Amazon style */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Application Progress</h3>

        {isRejected ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 flex items-start gap-3">
            <XCircle className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-rose-900">Application Rejected</div>
              <div className="text-sm text-rose-700 mt-1">
                Your application was rejected. Please check the timeline for the reason.
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-start min-w-[600px] gap-2">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const completed = i < stageIndex;
                const active = i === stageIndex;
                const upcoming = i > stageIndex;

                return (
                  <div key={stage.key} className="flex-1 flex flex-col items-center relative">
                    {i > 0 && (
                      <div className={`absolute top-5 -left-1/2 right-1/2 h-1 ${i <= stageIndex ? "bg-[#294d6b]" : "bg-slate-200"}`} />
                    )}
                    <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center ${
                      completed
                        ? "bg-[#294d6b] text-white"
                        : active
                          ? "bg-[#294d6b] text-white ring-4 ring-[#294d6b]/20"
                          : "bg-slate-100 text-slate-400 border-2 border-slate-200"
                    }`}>
                      {completed ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div className={`mt-2 text-xs font-semibold text-center ${active ? "text-[#294d6b]" : completed ? "text-slate-700" : "text-slate-400"}`}>
                      {stage.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Applicant</div>
          <div className="mt-2 text-sm text-slate-900 font-medium">{submission?.name || "Applicant"}</div>
          <div className="mt-1 text-sm text-slate-600 break-all">{submission?.email || "-"}</div>
          {submission?.phone && <div className="mt-1 text-sm text-slate-600">{submission.phone}</div>}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Service Details</div>
          <div className="mt-2 text-sm text-slate-900 font-medium">
            {submission?.country || submission?.visaType || submission?.docType || submission?.destination || submission?.insuranceType || "Application"}
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Submitted: {submission?.createdAt ? new Date(submission.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "-"}
          </div>
          <div className="mt-1 text-xs text-slate-500 break-all">
            ID: {submission?.id || params.id}
          </div>
          {submission?.payment && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-[#294d6b]/10 text-[#294d6b]">
              <CreditCard className="h-3.5 w-3.5" />
              Payment: {submission.payment}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold text-slate-900">Status Timeline</h3>
        <div className="mt-5 space-y-4">
          {history.length ? (
            history.map((item, index) => {
              const statusLabel = item.toStatus || item.status || "Updated";
              const note = item.note || item.notes;
              return (
                <div key={item.id || `${statusLabel}-${index}`} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#294d6b] text-white">
                      <Clock3 className="h-4 w-4" />
                    </div>
                    {index < history.length - 1 && <div className="mt-2 h-full w-px bg-slate-200" />}
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-semibold text-slate-900">{statusLabel}</div>
                      <div className="text-xs text-slate-500">
                        {item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : ""}
                      </div>
                    </div>
                    {note ? <p className="mt-2 text-sm text-slate-600">{note}</p> : null}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-[#294d6b]/20 bg-[#294d6b]/5 p-5 text-sm text-slate-600">
              Timeline will appear here once admin starts processing your application.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold text-slate-900">Uploaded Documents</h3>
        <div className="mt-4 space-y-3">
          {documents.length ? (
            documents.map((doc, index) => (
              <div
                key={doc.id || `${doc.originalName}-${index}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-5 w-5 flex-shrink-0 text-[#294d6b]" />
                  <div className="truncate text-sm font-medium text-slate-800">
                    {doc.originalName || `Document ${index + 1}`}
                  </div>
                </div>
                {doc.url ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-[#294d6b] hover:text-[#1f3b54]"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-sm text-slate-400">Unavailable</span>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No documents attached with this submission.</p>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-slate-500">
        <Link href="/user/dashboard">
          <span className="cursor-pointer font-semibold text-[#294d6b] hover:text-[#1f3b54]">
            Back to dashboard
          </span>
        </Link>
      </div>
    </div>
  );
}
