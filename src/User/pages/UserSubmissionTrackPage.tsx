import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { AlertCircle, ArrowLeft, Clock3, FileText, Loader2 } from "lucide-react";
import { userDashboardAPI } from "@/lib/api";

type TrackPageProps = {
  params: {
    type: string;
    id: string;
  };
};

type TimelineItem = {
  id?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
};

type DocumentItem = {
  id?: string;
  originalName?: string;
  url?: string;
};

export default function UserSubmissionTrackPage({ params }: TrackPageProps) {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [history, setHistory] = useState<TimelineItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const backRouteMap: Record<string, string> = {
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

  useEffect(() => {
    let cancelled = false;

    const fetchTimeline = async () => {
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
    };

    fetchTimeline();
    return () => {
      cancelled = true;
    };
  }, [params.id, params.type]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-[#294d6b]" />
          <p className="text-sm text-slate-500">Tracking details load ho rahi hain...</p>
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
            <p className="font-semibold">Tracking details nahi mili.</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setLocation(backRouteMap[params.type] || "/user/dashboard")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="rounded-xl bg-[#294d6b]/10 px-4 py-2 text-sm font-semibold text-[#294d6b]">
          Status: {submission?.status || "Pending"}
        </div>
      </div>

      <div className="rounded-2xl border border-[#294d6b]/10 bg-white p-6">
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Applicant</div>
            <div className="mt-2 text-sm text-slate-900">{submission?.name || "Applicant"}</div>
            <div className="mt-1 text-sm text-slate-600">{submission?.email || "-"}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Service Details</div>
            <div className="mt-2 text-sm text-slate-900">
              {submission?.country || submission?.visaType || submission?.docType || "Submitted successfully"}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              {submission?.createdAt ? new Date(submission.createdAt).toLocaleString() : "-"}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Submission ID: {submission?.id || params.id}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">Status Timeline</h3>
        <div className="mt-5 space-y-4">
          {history.length ? (
            history.map((item, index) => (
              <div key={item.id || `${item.status}-${index}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#294d6b] text-white">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  {index < history.length - 1 && <div className="mt-2 h-full w-px bg-slate-200" />}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-semibold text-slate-900">{item.status || "Updated"}</div>
                    <div className="text-xs text-slate-500">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
                    </div>
                  </div>
                  {item.notes ? <p className="mt-2 text-sm text-slate-600">{item.notes}</p> : null}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#294d6b]/20 bg-[#294d6b]/[0.03] p-5 text-sm text-slate-600">
              Timeline abhi start nahi hui hai. Submission receive ho chuki hai, updates yahin dikhengi.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">Uploaded Documents</h3>
        <div className="mt-4 space-y-3">
          {documents.length ? (
            documents.map((doc, index) => (
              <div
                key={doc.id || `${doc.originalName}-${index}`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
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
