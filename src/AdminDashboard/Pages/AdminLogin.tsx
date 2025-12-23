import React, { useMemo, useState } from "react";
import { ShieldCheck, BarChart3, Users, Settings, GraduationCap, LogIn, Mail, Lock, Crown, User } from "lucide-react";



export default function AdminLogin() {
  const [email, setEmail] = useState("admin@iccict.com");
  const [password, setPassword] = useState("password");
  const [accessLevel, setAccessLevel] = useState<"Admin" | "Super Admin">("Admin");
  const [loading, setLoading] = useState(false);

  const isValid = useMemo(() => {
    if (!email.trim()) return false;
    if (!password.trim()) return false;
    if (!email.includes("@")) return false;
    return true;
  }, [email, password]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);

    const payload = {
      email,
      password, // NOTE: production me password console mat karo
      accessLevel,
      ts: new Date().toISOString(),
    };


    console.log("AdminLogin submit payload:", payload);
    alert("admin login successsfully ");
    window.location.href="/admin/dashboard"


    setTimeout(() => {
      setLoading(false);
      alert("Login submitted! (Check console)");
    }, 650);
  };

  return (
    <div className="min-h-screen w-full bg-[#0b7b78] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl rounded-[34px] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.35)] border border-white/10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="relative bg-[#0b7b78] text-white px-8 py-10 lg:px-12 lg:py-14">
            {/* subtle grid */}
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
                  International Conference on AI, ML, IoT and Computer Science
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
                <p className="mt-2 text-sm text-slate-500">Please sign in to your admin account</p>
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                {/* EMAIL */}
                <div>
                  <label className="text-xs font-semibold text-slate-600">Email Address</label>
                  <div className="mt-1 h-12 rounded-2xl bg-slate-50 border border-slate-200 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-500">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-full bg-transparent outline-none text-sm text-slate-900"
                      placeholder="admin@iccict.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-xs font-semibold text-slate-600">Password</label>
                  <div className="mt-1 h-12 rounded-2xl bg-slate-50 border border-slate-200 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-500">
                    <Lock className="h-4 w-4 text-slate-500" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="w-full bg-transparent outline-none text-sm text-slate-900"
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                {/* ACCESS LEVEL */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-900">Select Access Level</div>

                  <div className="mt-3 space-y-3">
                    <label className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="access"
                        checked={accessLevel === "Admin"}
                        onChange={() => setAccessLevel("Admin")}
                        className="mt-1"
                      />
                      <div className="mt-0.5 h-8 w-8 rounded-xl bg-slate-100 grid place-items-center">
                        <User className="h-4 w-4 text-slate-700" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900">Admin</div>
                        <div className="text-xs text-slate-500">Manage registrations and content</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="access"
                        checked={accessLevel === "Super Admin"}
                        onChange={() => setAccessLevel("Super Admin")}
                        className="mt-1"
                      />
                      <div className="mt-0.5 h-8 w-8 rounded-xl bg-slate-100 grid place-items-center">
                        <Crown className="h-4 w-4 text-slate-700" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900">Super Admin</div>
                        <div className="text-xs text-slate-500">Full system access and admin management</div>
                      </div>
                    </label>
                  </div>
                </div>

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

              <p className="mt-4 text-center text-xs text-slate-500">
                Demo only. Replace alert/console with real authentication.
              </p>
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
