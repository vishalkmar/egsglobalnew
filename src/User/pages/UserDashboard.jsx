

import { useEffect, useState } from "react";

export default function UserDashboard() {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchMy = async () => {
      try {
        // verify session + fetch my enquiries
        const url = `${API_BASE}/mea/mea-attestation/enquiry/my`;
        console.log("Fetching:", url);
        const res = await fetch(url, {
          credentials: "include",
        });

        if (res.status === 401) {
          window.location.replace("/user/login");
          return;
        }

        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          console.error("API error:", res.status, d);
          setErr(d?.message || `Failed to load your enquiries (${res.status})`);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setItems(data.items || []);
      } catch (e) {
        setErr("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchMy();
  }, [API_BASE]);

  if (loading) return <div className="text-slate-700">Loading your enquiries...</div>;
  if (err) return <div className="text-red-600">{err}</div>;

  return (
    <div className="text-slate-700">
      <h2 className="text-xl font-semibold mb-4">My Enquiries</h2>
      {items.length === 0 ? (
        <div>No enquiries found.</div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it._id} className="p-4 border rounded-lg bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{it.docType} — {it.docCategory}</div>
                  <div className="text-sm text-slate-500">Submitted: {new Date(it.submittedAt).toLocaleString()}</div>
                </div>
                <div className="text-sm text-slate-600">Docs: {Array.isArray(it.documents) ? it.documents.length : 0}</div>
              </div>

              <div className="mt-3 text-sm text-slate-700">
                <div><strong>Name:</strong> {it.name || it.email}</div>
                <div><strong>Contact:</strong> {it.contact}</div>
                <div className="mt-2"><strong>Emails:</strong> User {it.emails?.userSent ? '✅' : '❌'} · Admin {it.emails?.adminSent ? '✅' : '❌'}</div>
              </div>

              {Array.isArray(it.documents) && it.documents.length > 0 && (
                <div className="mt-3">
                  <div className="font-semibold text-sm mb-2">Documents</div>
                  <div className="flex flex-wrap gap-2">
                    {it.documents.map((d) => (
                      <a key={d.index} href={d.url} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded text-sm text-sky-700 bg-sky-50">
                        {d.originalName}
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
  );
}
