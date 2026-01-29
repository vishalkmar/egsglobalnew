"use client";

import React, { useEffect, useMemo, useState } from "react";
import useUserPrefill from "@/hooks/useUserPrefill";
import AOS from "aos";
import "aos/dist/aos.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader, PlusCircle, Trash2, Ticket } from "lucide-react";

const COUNTRY_OPTIONS = [
  "Bulgaria",
  "North Macedonia",
  "Croatia",
  "Serbia",
  "Russia",
  "Montenegro",
  "Belarus",
];

type TripType = "oneWay" | "roundTrip";

type BaseFields = {
  name: string;
  email: string;
  mobile: string;
};

type PaxTicket = {
  id: string;
  tripType: TripType;
  destination: string;
  departureDate: string;
  returnDate: string;
};

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function DummyTicketForm() {
  const { user } = useUserPrefill();

  useEffect(() => {
    if (!user) return;
    setBase((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      email: prev.email || user.email || "",
      mobile: prev.mobile || user.phone || "",
    }));
  }, [user]);
  const [base, setBase] = useState<BaseFields>({
    name: "",
    email: "",
    mobile: "",
  });

  const [paxes, setPaxes] = useState<PaxTicket[]>([
    { id: uid(), tripType: "oneWay", destination: "", departureDate: "", returnDate: "" },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ✅ keep your working API base
  const API_BASE = "http://localhost:5000/api";

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const redirectToLogin = () => {
    const current =
      typeof window !== "undefined"
        ? encodeURIComponent(window.location.pathname + window.location.search)
        : "";
    window.location.href = `/login?next=${current}`;
  };

  useEffect(() => {
    AOS.init({
      duration: 650,
      offset: 90,
      easing: "ease-out",
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [paxes.length]);

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);
    setBase((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaxChange = (
    paxId: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(null);

    setPaxes((prev) =>
      prev.map((p) => {
        if (p.id !== paxId) return p;

        if (name === "tripType") {
          const nextTrip = value as TripType;
          return {
            ...p,
            tripType: nextTrip,
            returnDate: nextTrip === "oneWay" ? "" : p.returnDate,
          };
        }

        return { ...p, [name]: value };
      })
    );
  };

  const addPax = () => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => [
      ...prev,
      { id: uid(), tripType: "oneWay", destination: "", departureDate: "", returnDate: "" },
    ]);
  };

  const removePax = (paxId: string) => {
    setError(null);
    setSuccess(null);
    setPaxes((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== paxId)));
  };

  const isValid = useMemo(() => {
    if (!base.email.trim()) return false;
    if (!base.mobile.trim()) return false;

    for (const p of paxes) {
      if (!p.destination) return false;
      if (!p.departureDate) return false;
      if (p.tripType === "roundTrip" && !p.returnDate) return false;
    }
    return true;
  }, [base, paxes]);

  const submitDummyTicket = async (token: string, payload: any) => {
    const res = await fetch(`${API_BASE}/dummy-ticket/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Failed to submit dummy ticket request.");
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = getToken();
    if (!token) {
      redirectToLogin();
      return;
    }

    if (!isValid) {
      setError("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: base.name || "",
        email: base.email,
        mobile: base.mobile,
        amountPerPax: 1000,
        totalAmount: 1000 * paxes.length,
        paxes: paxes.map((p, idx) => ({
          paxNo: idx + 1,
          tripType: p.tripType,
          startLocation: p.destination, // keep backend key same style
          departureDate: p.departureDate,
          returnDate: p.tripType === "roundTrip" ? p.returnDate : "",
          amount: 1000,
        })),
        submittedAt: new Date().toISOString(),
        tracking: {
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      };

      await submitDummyTicket(token, payload);

      setSuccess("Dummy ticket request submitted successfully. Our team will contact you shortly.");
      setBase({ name: "", email: "", mobile: "" });
      setPaxes([{ id: uid(), tripType: "oneWay", destination: "", departureDate: "", returnDate: "" }]);
    } catch (err: any) {
      const msg = err?.message || "Something went wrong. Please try again.";
      setError(msg);

      if (/401|unauthorized|token/i.test(msg)) {
        localStorage.removeItem("token");
        redirectToLogin();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Top header (matches your dashboard theme) */}
        

        <form onSubmit={handleSubmit} className="p-6 ">
          {error && (
            <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Base Fields (ONE TIME) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name (Optional)</label>
                <Input
                  type="text"
                  name="name"
                  value={base.name}
                  onChange={handleBaseChange}
                  placeholder="Your full name"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  value={base.email}
                  onChange={handleBaseChange}
                  placeholder="your@email.com"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Mobile *</label>
                <Input
                  type="tel"
                  name="mobile"
                  value={base.mobile}
                  onChange={handleBaseChange}
                  placeholder="+91 9876543210"
                  className="h-11 bg-white border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pax Blocks */}
          <div className="space-y-5">
            {paxes.map((p, idx) => (
              <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-teal-600/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-teal-800">{idx + 1}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Pax Trip Details</h3>
                  </div>

                  <Button
                    type="button"
                    onClick={() => removePax(p.id)}
                    disabled={paxes.length <= 1}
                    variant="ghost"
                    className="rounded-xl text-slate-700 hover:text-red-600 hover:bg-red-50 disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Trip type */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Trip Type *</label>
                    <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() =>
                          handlePaxChange(p.id, {
                            target: { name: "tripType", value: "oneWay" },
                          } as any)
                        }
                        className={`px-4 py-2 text-sm rounded-lg transition ${
                          p.tripType === "oneWay"
                            ? "bg-teal-700 text-white"
                            : "text-slate-700 hover:bg-white"
                        }`}
                      >
                        One Way
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handlePaxChange(p.id, {
                            target: { name: "tripType", value: "roundTrip" },
                          } as any)
                        }
                        className={`px-4 py-2 text-sm rounded-lg transition ${
                          p.tripType === "roundTrip"
                            ? "bg-teal-700 text-white"
                            : "text-slate-700 hover:bg-white"
                        }`}
                      >
                        Round Trip
                      </button>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Destination Country *
                    </label>
                    <select
                      name="destination"
                      value={p.destination}
                      onChange={(e) => handlePaxChange(p.id, e)}
                      className="w-full h-11 bg-white border border-slate-300 rounded-xl px-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      required
                    >
                      <option value="">Select destination</option>
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c} value={c} className="bg-slate-900">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  {p.tripType === "oneWay" ? (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Departure Date *
                      </label>
                      <Input
                        type="date"
                        name="departureDate"
                        value={p.departureDate}
                        onChange={(e) => handlePaxChange(p.id, e)}
                        className="h-11 bg-white border-slate-300 text-slate-900 rounded-xl"
                        required
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Departure Date *
                        </label>
                        <Input
                          type="date"
                          name="departureDate"
                          value={p.departureDate}
                          onChange={(e) => handlePaxChange(p.id, e)}
                          className="h-11 bg-white border-slate-300 text-slate-900 rounded-xl"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Return Date *
                        </label>
                        <Input
                          type="date"
                          name="returnDate"
                          value={p.returnDate}
                          onChange={(e) => handlePaxChange(p.id, e)}
                          className="h-11 bg-white border-slate-300 text-slate-900 rounded-xl"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Amount */}
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Amount (per pax)</span>
                  <span className="text-base font-bold text-teal-800">₹ 1000</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Pax</p>
              <p className="text-lg font-semibold text-slate-900">{paxes.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Total Amount</p>
              <p className="text-lg font-semibold text-teal-900">₹ {1000 * paxes.length}</p>
            </div>
          </div>

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-slate-50">
          
          <Button
            type="button"
            onClick={addPax}
            className="rounded-xl bg-teal-700 hover:bg-teal-800 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Pax
          </Button>
        </div>

          <Button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Buy Dummy Ticket"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
