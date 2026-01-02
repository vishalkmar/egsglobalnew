

import { useEffect, useState } from "react";

export default function UserDashboard() {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const [loading, setLoading] = useState(true);
  const [meaItems, setMeaItems] = useState([]);
  const [pccItems, setPccItems] = useState([]);
  const [err, setErr] = useState(null);
  const [activeTab, setActiveTab] = useState("mea"); // "mea" or "pcc"

  useEffect(() => {
    const fetchMyEnquiries = async () => {
      try {
        setLoading(true);

        // Fetch MEA enquiries
        const meaUrl = `${API_BASE}/mea/mea-attestation/enquiry/my`;
        const meaRes = await fetch(meaUrl, {
          credentials: "include",
        });

        // Fetch PCC enquiries
        const pccUrl = `${API_BASE}/pcc/pcc-legalization/enquiry/my`;
        const pccRes = await fetch(pccUrl, {
          credentials: "include",
        });

        if (meaRes.status === 401 || pccRes.status === 401) {
          window.location.replace("/user/login");
          return;
        }

        let meaData = { items: [] };
        let pccData = { items: [] };

        if (meaRes.ok) {
          meaData = await meaRes.json();
        } else {
          const errData = await meaRes.json().catch(() => ({}));
          console.error("MEA API error:", meaRes.status, errData);
        }

        if (pccRes.ok) {
          pccData = await pccRes.json();
        } else {
          const errData = await pccRes.json().catch(() => ({}));
          console.error("PCC API error:", pccRes.status, errData);
        }

        setMeaItems(meaData.items || []);
        setPccItems(pccData.items || []);
      } catch (e) {
        console.error("Network error:", e);
        setErr("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEnquiries();
  }, [API_BASE]);

  if (loading) return <div className="text-slate-700">Loading your enquiries...</div>;
  if (err) return <div className="text-red-600">{err}</div>;

  const displayItems = activeTab === "mea" ? meaItems : pccItems;
  const totalSubmissions = meaItems.length + pccItems.length;

  return (
    <div className="text-slate-700">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-3xl font-bold text-teal-900">{totalSubmissions}</div>
          <div className="text-sm text-slate-600 mt-1">Total Submissions</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-3xl font-bold text-blue-900">{meaItems.length}</div>
          <div className="text-sm text-slate-600 mt-1">MEA Attestation</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-3xl font-bold text-purple-900">{pccItems.length}</div>
          <div className="text-sm text-slate-600 mt-1">PCC Legalization</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("mea")}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "mea"
              ? "border-teal-900 text-teal-900"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          MEA Attestation ({meaItems.length})
        </button>
        <button
          onClick={() => setActiveTab("pcc")}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "pcc"
              ? "border-teal-900 text-teal-900"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          PCC Legalization ({pccItems.length})
        </button>
      </div>

      {/* Enquiries List */}
      <div className="text-slate-700">
        <h2 className="text-xl font-semibold mb-4">
          {activeTab === "mea" ? "MEA Attestation" : "PCC Legalization"} Enquiries
        </h2>
        {displayItems.length === 0 ? (
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 text-center text-slate-600">
            No {activeTab === "mea" ? "MEA Attestation" : "PCC Legalization"} enquiries found.
          </div>
        ) : (
          <div className="space-y-4">
            {displayItems.map((item) => (
              <div key={item._id} className="p-5 border border-slate-200 rounded-lg bg-white hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {activeTab === "mea" ? (
                      <>
                        <div className="font-semibold text-lg">
                          {item.docType} — {item.docCategory}
                        </div>
                        <div className="text-sm text-slate-500">
                          Country: <strong>{item.country}</strong>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-semibold text-lg">
                          PCC for <strong>{item.country}</strong>
                        </div>
                        <div className="text-sm text-slate-500">
                          Company: <strong>{item.companyName}</strong>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-700">
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(item.submittedAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-sm text-slate-700 space-y-1">
                  <div><strong>Email:</strong> {item.email}</div>
                  <div>
                    <strong>Contact:</strong> {item.contact || item.phone}
                  </div>
                  <div>
                    <strong>Application Status:</strong> {item.status}
                  </div>
                   <div>
                    <strong>Application Payment Status:</strong> {item.payment}
                  </div>
                  <div className="mt-2">
                    <strong>Email Status:</strong> User{" "}
                    <span className="font-semibold">
                      {item.emails?.userSent ? "✅ Sent" : "❌ Not Sent"}
                    </span>{" "}
                    · Admin{" "}
                    <span className="font-semibold">
                      {item.emails?.adminSent ? "✅ Sent" : "❌ Not Sent"}
                    </span>
                  </div>
                </div>

                {/* Documents Section */}
                {Array.isArray(item.documents) && item.documents.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="font-semibold text-sm mb-3">
                      Uploaded Documents ({item.documents.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.documents.map((doc) => (
                        <a
                          key={doc.index}
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-2 border border-sky-200 rounded-lg bg-sky-50 hover:bg-sky-100 transition text-sm text-sky-700 font-medium"
                        >
                          <span>📄</span>
                          <span className="truncate">{doc.originalName}</span>
                          <span className="text-xs text-sky-600">({Math.round(doc.size / 1024)} KB)</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
