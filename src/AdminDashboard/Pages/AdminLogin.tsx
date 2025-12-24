import React, { useMemo, useState } from "react";
import { ShieldCheck, BarChart3, Users, Settings, GraduationCap, LogIn, Mail, Lock, Crown } from "lucide-react";
import { z } from "zod";

// strict-ish email regex
const emailSchema = z
  .string()
  .trim()
  .min(6, "Email is required")
  .max(120, "Email too long")
  .regex(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
    "Invalid email format"
  );

// strong password rules (change as per your policy)
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password too long")
  

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  accessLevel: z.literal("Super Admin"),
});

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // only super admin
  const accessLevel: "Super Admin" = "Super Admin";

  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [formErr, setFormErr] = useState("");

  const API_BASE = import.meta?.env?.VITE_API_URL || "http://localhost:5000/api";

  const isValid = useMemo(() => {
    const r = loginSchema.safeParse({ email, password, accessLevel });
    return r.success;
  }, [email, password]);

  const validateUI = () => {
    setEmailErr("");
    setPassErr("");
    setFormErr("");

    const r = loginSchema.safeParse({ email, password, accessLevel });
    if (r.success) return true;

    // show field-wise errors
    for (const issue of r.error.issues) {
      if (issue.path[0] === "email") setEmailErr(issue.message);
      if (issue.path[0] === "password") setPassErr(issue.message);
    }
    return false;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const ok = validateUI();
    if (!ok) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // cookie auth support
        body: JSON.stringify({
          email: email.trim(),
          password,
          accessLevel, // always "Super Admin"
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormErr(data?.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // optional: if backend returns token and you want localStorage (cookie-only better)
      if (data?.token) localStorage.setItem("admin_token", data.token);

      // ✅ Use replace so login not in history
      window.location.replace("/admin/dashboard");
    } catch (err: any) {
      setFormErr(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0b7b78] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl rounded-[34px] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.35)] border border-white/10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="relative bg-[#0b7b78] text-white px-8 py-10 lg:px-12 lg:py-14">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-full bg-white/15 flex items-center justify-center">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div className="mt-8">
                <div className="text-4xl font-extrabold tracking-wide">ICCICT 2026</div>
                <div className="mt-3 max-w-md text-white/85 text-base leading-relaxed">
                  Admin Control Panel (Super Admin Access)
                </div>
              </div>

              <div className="mt-10 space-y-4 max-w-md">
                <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Secure Admin Access" />
                <Feature icon={<BarChart3 className="h-5 w-5" />} title="Real-time Analytics" />
                <Feature icon={<Users className="h-5 w-5" />} title="User Management" />
                <Feature icon={<Settings className="h-5 w-5" />} title="Complete Control Panel" />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14 bg-white">
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Welcome Back!</h1>
                <p className="mt-2 text-sm text-slate-500">Sign in as Super Admin</p>
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                {/* EMAIL */}
                <div>
                  <label className="text-xs font-semibold text-slate-600">Email Address</label>
                  <div className="mt-1 h-12 rounded-2xl bg-slate-50 border border-slate-200 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-500">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailErr) setEmailErr("");
                        if (formErr) setFormErr("");
                      }}
                      onBlur={() => {
                        const r = emailSchema.safeParse(email);
                        setEmailErr(r.success ? "" : r.error.issues[0]?.message || "Invalid email");
                      }}
                      type="email"
                      className="w-full bg-transparent outline-none text-sm text-slate-900"
                      placeholder="superadmin@iccict.com"
                      autoComplete="email"
                    />
                  </div>
                  {emailErr ? <p className="mt-2 text-xs text-red-600">{emailErr}</p> : null}
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-xs font-semibold text-slate-600">Password</label>
                  <div className="mt-1 h-12 rounded-2xl bg-slate-50 border border-slate-200 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-500">
                    <Lock className="h-4 w-4 text-slate-500" />
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passErr) setPassErr("");
                        if (formErr) setFormErr("");
                      }}
                      onBlur={() => {
                        const r = passwordSchema.safeParse(password);
                        setPassErr(r.success ? "" : r.error.issues[0]?.message || "Invalid password");
                      }}
                      type="password"
                      className="w-full bg-transparent outline-none text-sm text-slate-900"
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </div>
                  {passErr ? (
                    <p className="mt-2 text-xs text-red-600">{passErr}</p>
                  ) : (
                    <p className="mt-2 text-[11px] text-slate-500">
                      Min 8 chars, uppercase, lowercase, number, special character.
                    </p>
                  )}
                </div>

                {/* ACCESS LEVEL (fixed) */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-900">Access Level</div>
                  <div className="mt-3 flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200">
                    <div className="mt-0.5 h-8 w-8 rounded-xl bg-slate-100 grid place-items-center">
                      <Crown className="h-4 w-4 text-slate-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900">Super Admin</div>
                      <div className="text-xs text-slate-500">Full system access and admin management</div>
                    </div>
                  </div>
                </div>

                {formErr ? <p className="text-sm text-red-600 text-center">{formErr}</p> : null}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className={`w-full h-12 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition
                    ${!isValid || loading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800"}`}
                >
                  <LogIn className="h-5 w-5" />
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="pt-2 border-t border-slate-200" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-white/12 flex items-center justify-center">{icon}</div>
      <div className="text-sm font-semibold text-white/95">{title}</div>
    </div>
  );
}
