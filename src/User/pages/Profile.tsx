import React, { useEffect, useState } from "react";
import { Loader2, Save, UserRound, Mail, Phone, CalendarClock, ShieldCheck } from "lucide-react";
import { profileAPI } from "@/lib/api";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await profileAPI.get();
        setProfile(res.data?.user || null);
        setName(res.data?.user?.name || "");
        setPhone(res.data?.user?.phone || "");
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await profileAPI.update({ name, phone });
      setProfile(res.data?.user);
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...stored, ...res.data?.user }));
      } catch {}
      setSuccess("Profile updated successfully.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-[#294d6b] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <UserRound className="h-7 w-7 text-[#294d6b]" />
          My Profile
        </h1>
        <p className="text-slate-600 mt-1 text-sm">View and update your account details.</p>
      </div>

      {error && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 px-5 py-3 text-sm text-rose-700">{error}</div>
      )}
      {success && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-3 text-sm text-emerald-700">{success}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Personal Information</h2>
          <form onSubmit={onSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email (read only)</label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#294d6b]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#294d6b]"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#294d6b] hover:bg-[#1f3b54] text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#294d6b]" /> Account Info
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="font-medium text-slate-900 break-all">{profile?.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">Phone</div>
                  <div className="font-medium text-slate-900">{profile?.phone || "Not set"}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarClock className="h-4 w-4 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">Joined</div>
                  <div className="font-medium text-slate-900">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "-"}
                  </div>
                </div>
              </div>
              {profile?.lastLoginAt && (
                <div className="flex items-start gap-2">
                  <CalendarClock className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500">Last Login</div>
                    <div className="font-medium text-slate-900">
                      {new Date(profile.lastLoginAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[#294d6b]/20 bg-[#294d6b]/5 p-5">
            <h3 className="text-sm font-semibold text-[#294d6b] mb-2">Need help?</h3>
            <p className="text-xs text-slate-700">
              For account or payment related queries, reach out to us via the contact page or email <b>info@evrenglobalsolutions.com</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
