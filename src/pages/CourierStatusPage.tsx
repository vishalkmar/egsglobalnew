import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { courierAPI } from "@/lib/api";
import { Loader2, PackageSearch, Search } from "lucide-react";

export default function CourierStatusPage() {
  const [courierNumber, setCourierNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);

  const handleTrack = async () => {
    if (!courierNumber.trim()) {
      setError("Courier number enter karein.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await courierAPI.track(courierNumber.trim());
      setData(res.data?.item || null);
      if (!res.data?.item) setError("Courier details nahi mili.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Tracking details nahi mili.");
    } finally {
      setLoading(false);
    }
  };

  const history = (data?.trackingHistory || []).slice().reverse();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-24">
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[32px] bg-white shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#294d6b] to-[#1f3b54] px-8 py-10 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Courier Tracking</div>
                <h1 className="mt-3 text-4xl font-bold">Track your courier with a full movement timeline.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
                  Courier number daaliye aur website par hi latest status, amount aur movement line-wise dekh lijiye.
                </p>
              </div>

              <div className="px-6 py-8 sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-12 flex-1 items-center gap-3 rounded-2xl border border-slate-200 px-4">
                    <PackageSearch className="h-4 w-4 text-slate-400" />
                    <input
                      value={courierNumber}
                      onChange={(e) => setCourierNumber(e.target.value)}
                      placeholder="Enter courier number"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                  <button onClick={handleTrack} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#294d6b] px-5 text-sm font-semibold text-white">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    Track Now
                  </button>
                </div>

                {error ? <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

                {data ? (
                  <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
                    <div className="space-y-4">
                      <div className="rounded-3xl bg-slate-50 p-5">
                        <div className="text-xs uppercase tracking-wide text-slate-500">Courier Number</div>
                        <div className="mt-1 text-xl font-semibold text-slate-900">{data.courierNumber}</div>
                      </div>
                      <div className="rounded-3xl bg-slate-50 p-5">
                        <div className="text-xs uppercase tracking-wide text-slate-500">Current Status</div>
                        <div className="mt-1 text-xl font-semibold text-[#294d6b]">{data.status}</div>
                      </div>
                      <div className="rounded-3xl bg-slate-50 p-5">
                        <div className="text-xs uppercase tracking-wide text-slate-500">Service Name</div>
                        <div className="mt-1 text-lg text-slate-900">{data.serviceName || "-"}</div>
                      </div>
                      <div className="rounded-3xl bg-slate-50 p-5">
                        <div className="text-xs uppercase tracking-wide text-slate-500">Amount / Payment</div>
                        <div className="mt-1 text-lg text-slate-900">{data.amountDisplay || "Rs 0.00"} • {data.paymentStatus || "Pending"}</div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 p-6">
                      <div className="text-lg font-semibold text-slate-900">Tracking Timeline</div>
                      <div className="mt-6 space-y-5">
                        {history.length ? history.map((item: any, index: number) => (
                          <div key={item.id || `${item.toStatus}-${index}`} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="h-4 w-4 rounded-full bg-[#294d6b]" />
                              {index < history.length - 1 ? <div className="mt-2 w-px flex-1 bg-slate-200" /> : null}
                            </div>
                            <div className="flex-1 rounded-2xl bg-slate-50 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="font-semibold text-slate-900">{item.toStatus}</div>
                                <div className="text-xs text-slate-500">{item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : ""}</div>
                              </div>
                              {item.note ? <div className="mt-2 text-sm text-slate-600">{item.note}</div> : null}
                            </div>
                          </div>
                        )) : (
                          <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
                            Tracking timeline abhi available nahi hai.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
