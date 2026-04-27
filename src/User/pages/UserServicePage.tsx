import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { AlertCircle, Clock3, Eye, FileText, Loader2, Package2 } from "lucide-react";
import { userDashboardAPI } from "@/lib/api";

type SubmissionItem = {
  id: string;
  serviceType: string;
  status: string;
  createdAt: string;
  country?: string | null;
  submissionCountry?: string | null;
  destination?: string | null;
  visaType?: string | null;
  insuranceType?: string | null;
  docType?: string | null;
  name?: string | null;
  email?: string | null;
};

type Props = {
  title: string;
  serviceType: string;
  form: ReactNode;
};

const PAGE_SIZE = 10;

const statusClasses: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  Processing: "bg-[#294d6b]/10 text-[#294d6b] border border-[#294d6b]/20",
  Approved: "bg-[#294d6b]/10 text-[#294d6b] border border-[#294d6b]/20",
  Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
  Dispatched: "bg-slate-100 text-slate-700 border border-slate-200",
  Received: "bg-slate-100 text-slate-700 border border-slate-200",
};

export default function UserServicePage({ title, serviceType, form }: Props) {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"applications" | "apply">("applications");
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  useEffect(() => {
    let cancelled = false;

    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await userDashboardAPI.getSubmissions({
          serviceType,
          page,
          limit: PAGE_SIZE,
        });

        if (cancelled) return;
        setSubmissions(res.data?.submissions || []);
        setPagination(
          res.data?.pagination || { page: 1, totalPages: 1, total: 0 }
        );
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.response?.data?.message || "Failed to load your applications.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (activeTab === "applications") {
      fetchSubmissions();
    }

    return () => {
      cancelled = true;
    };
  }, [activeTab, page, serviceType]);

  const summaryText = useMemo(() => {
    if (!pagination.total) return `No ${title} applications yet.`;
    if (pagination.total === 1) return "1 application found.";
    return `${pagination.total} applications found.`;
  }, [pagination.total, title]);

  const renderApplications = () => {
    if (loading) {
      return (
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="text-center">
            <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-[#294d6b]" />
            <p className="text-sm text-slate-500">Loading your applications...</p>
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
              <p className="font-semibold">Applications load nahi ho payi.</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
        </div>
      );
    }

    if (!submissions.length) {
      return (
        <div className="rounded-2xl border border-dashed border-[#294d6b]/20 bg-[#294d6b]/[0.03] p-10 text-center">
          <Package2 className="mx-auto mb-4 h-12 w-12 text-[#294d6b]" />
          <h3 className="text-lg font-semibold text-slate-900">Abhi koi application nahi hai</h3>
          <p className="mt-2 text-sm text-slate-500">
            `Apply Now` tab se nayi request submit karo, phir woh yahin table me dikh jayegi.
          </p>
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Your Applications</h3>
              <p className="mt-1 text-sm text-slate-500">{summaryText}</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("apply")}
              className="rounded-xl bg-[#294d6b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f3b54]"
            >
              New Application
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Applicant</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Details</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Submitted</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">{item.name || "Applicant"}</div>
                    <div className="text-sm text-slate-500">{item.email || "-"}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    <div>{item.country || item.submissionCountry || item.destination || item.visaType || item.insuranceType || item.docType || "Details submitted"}</div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[item.status] || "bg-slate-100 text-slate-700 border border-slate-200"}`}>
                      {item.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-[#294d6b]" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setLocation(`/user/track/${item.serviceType}/${item.id}`)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#294d6b]/20 bg-[#294d6b]/10 px-3 py-2 text-sm font-semibold text-[#294d6b] transition hover:bg-[#294d6b]/15"
                    >
                      <Eye className="h-4 w-4" />
                      Track Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <p className="text-sm text-slate-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={pagination.page <= 1}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() =>
                setPage((prev) => Math.min(pagination.totalPages || 1, prev + 1))
              }
              disabled={pagination.page >= pagination.totalPages}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
        <button
          type="button"
          onClick={() => setActiveTab("applications")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
            activeTab === "applications"
              ? "bg-[#294d6b] text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          Your Application
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("apply")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
            activeTab === "apply"
              ? "bg-[#294d6b] text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          Apply Now
        </button>
      </div>

      {activeTab === "applications" ? renderApplications() : form}
    </div>
  );
}
