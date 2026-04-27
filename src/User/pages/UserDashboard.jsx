

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  FileCheck, Clock, AlertCircle, CheckCircle2, Package,
  LogOut, Search, Filter, Eye
} from "lucide-react";
import { userDashboardAPI } from "../../lib/api";

export default function UserDashboard() {
  const [, setLocation] = useLocation();

  // State
  const [dashboardData, setDashboardData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [selectedService, setSelectedService] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch dashboard on mount
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await userDashboardAPI.getDashboard();
        setDashboardData(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setLocation("/user/login");
          return;
        }
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [setLocation]);

  // Fetch submissions based on filters
  useEffect(() => {
    if (!dashboardData) return;

    const fetchSubmissions = async () => {
      try {
        const params = {
          page,
          limit,
          ...(selectedService !== "all" && { serviceType: selectedService }),
          ...(selectedStatus !== "all" && { status: selectedStatus }),
          ...(searchQuery && { search: searchQuery }),
        };

        const res = await userDashboardAPI.getSubmissions(params);
        setSubmissions(res.data.submissions || []);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      }
    };

    fetchSubmissions();
  }, [dashboardData, selectedService, selectedStatus, searchQuery, page]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLocation("/user/login");
  };

  const handleViewDetails = (submission) => {
    setLocation(`/user/track/${submission.serviceType}/${submission.id}`);
  };

  const services = ["all", "evisa", "hrd", "mea", "pcc", "sticker_visa", "translation", "assistant_appointment", "insurance", "meet_greet"];
  const statuses = ["all", "Pending", "Processing", "Approved", "Rejected", "Dispatched"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Processing":
        return "status-processing";
      case "Approved":
        return "status-approved";
      case "Rejected":
        return "status-rejected";
      case "Dispatched":
        return "status-dispatched";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5" />;
      case "Processing":
        return <Package className="h-5 w-5" />;
      case "Approved":
        return <CheckCircle2 className="h-5 w-5" />;
      case "Rejected":
        return <AlertCircle className="h-5 w-5" />;
      case "Dispatched":
        return <FileCheck className="h-5 w-5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Package className="h-12 w-12 text-[#294d6b] mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-red-600">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total */}
          <div className="stat-card">
            <div className="text-3xl font-bold text-[#294d6b]">{dashboardData?.stats?.totalSubmissions || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Total Submissions</div>
          </div>

          {/* Pending */}
          <div className="stat-card">
            <div className="text-3xl font-bold text-yellow-600">{dashboardData?.stats?.pending || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Pending</div>
          </div>

          {/* Processing */}
          <div className="stat-card">
            <div className="text-3xl font-bold text-[#294d6b]">{dashboardData?.stats?.processing || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Processing</div>
          </div>

          {/* Approved */}
          <div className="stat-card">
            <div className="text-3xl font-bold text-[#294d6b]">{dashboardData?.stats?.approved || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Approved</div>
          </div>

          {/* Rejected */}
          <div className="stat-card">
            <div className="text-3xl font-bold text-red-600">{dashboardData?.stats?.rejected || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Rejected</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search submissions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294d6b]"
                />
              </div>
            </div>

            {/* Service Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
              <select
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294d6b]"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s === "all" ? "All Services" : s.replace("_", " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294d6b]"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s === "all" ? "All Statuses" : s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Submissions
            </h2>
          </div>

          {submissions.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No submissions found matching your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-[#294d6b]/10 text-[#294d6b] text-sm font-semibold rounded-full">
                          {sub.serviceType.toUpperCase().replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {sub.country || sub.submissionCountry || sub.destination || sub.visaType || sub.insuranceType || sub.docType || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(sub.status)}`}>
                          {getStatusIcon(sub.status)}
                          <span className="text-sm font-semibold">{sub.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(sub)}
                          className="flex items-center gap-1 text-[#294d6b] hover:text-[#1f3b54] font-semibold transition"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {submissions.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {(page - 1) * limit + 1} to {(page - 1) * limit + submissions.length} results
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
