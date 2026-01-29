import React, { useEffect, useMemo, useRef, useState } from "react";
import { GraduationCap, ShieldCheck, BarChart3, Users, Settings, Mail, KeyRound, ArrowRight } from "lucide-react";
import { z } from "zod";

const OTP_LEN = 6;

// Hard email validation (strict-ish)
const emailSchema = z
  .string()
  .trim()
  .min(6, "Email required")
  .max(120, "Email too long")
  .regex(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
    "Invalid email format"
  );

const otpSchema = z
  .string()
  .regex(/^\d{6}$/, "OTP must be 6 digits");

export default function UserLogin() {

  const getToken = () => localStorage.getItem("token");





  const [step, setStep] = useState<"email" | "otp">("email");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const [otp, setOtp] = useState<string[]>(Array.from({ length: OTP_LEN }, () => ""));
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [verifying, setVerifying] = useState(false);

  const [cooldown, setCooldown] = useState(0);

  const [emailError, setEmailError] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");

  // ✅ Your backend base URL (replace)
  const API_BASE = import.meta?.env?.VITE_API_URL || "http://localhost:5000/api";

  const emailValid = useMemo(() => {
    const r = emailSchema.safeParse(email);
    return r.success;
  }, [email]);

  const nameValid = useMemo(() => name.trim().length >= 2, [name]);
  const phoneValid = useMemo(() => phone.trim().length >= 10 && /^\d{10,}$/.test(phone.replace(/\D/g, "")), [phone]);

  const otpComplete = useMemo(() => otp.every((d) => d.trim().length === 1), [otp]);
  const otpValue = useMemo(() => otp.join(""), [otp]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const resetOtp = () => {
    setOtp(Array.from({ length: OTP_LEN }, () => ""));
    setOtpError("");
    setTimeout(() => otpRefs.current[0]?.focus(), 0);
  };

  const validateEmailUI = () => {
    const r = emailSchema.safeParse(email);
    setEmailError(r.success ? "" : r.error.issues[0]?.message || "Invalid email");
    
    if (!name.trim() || name.trim().length < 2) {
      setEmailError("Name must be at least 2 characters");
      return false;
    }
    
    if (!phone.trim() || phone.trim().length < 10 || !/^\d{10,}$/.test(phone.replace(/\D/g, ""))) {
      setEmailError("Phone must have at least 10 digits");
      return false;
    }
    
    return r.success;
  };

  const validateOtpUI = () => {
    const r = otpSchema.safeParse(otpValue);
    setOtpError(r.success ? "" : r.error.issues[0]?.message || "Invalid OTP");
    return r.success;
  };

  // 🔥 API: Send OTP
  const handleSendOtp = async () => {
    if (sending) return;
    const ok = validateEmailUI();
    if (!ok) return;

    setSending(true);
    setOtpError("");

    try {
      const res = await fetch(`${API_BASE}/auth/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ backend should accept { email, name, phone }
        body: JSON.stringify({ 
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim()
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setEmailError(data?.message || "Failed to send OTP");
        setSending(false);
        return;
      }

      setStep("otp");
      setCooldown(30);
      resetOtp();
    } catch (err: any) {
      setEmailError(err?.message || "Network error");
    } finally {
      setSending(false);
    }
  };

  // OTP input rules: only digits, one digit per box
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1); // only last digit
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LEN - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        setOtp((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        return;
      }
      if (index > 0) otpRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) otpRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LEN - 1) otpRefs.current[index + 1]?.focus();

    // Block any non-numeric key presses (optional strict)
    // allow: Backspace, arrows, Tab
    const allowed = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData("text");
    const digits = text.replace(/\D/g, "").slice(0, OTP_LEN);
    if (!digits) return;

    e.preventDefault();
    const next = Array.from({ length: OTP_LEN }, (_, i) => digits[i] ?? "");
    setOtp(next);

    const firstEmpty = next.findIndex((x) => !x);
    const focusIndex = firstEmpty === -1 ? OTP_LEN - 1 : firstEmpty;
    setTimeout(() => otpRefs.current[focusIndex]?.focus(), 0);
  };

  // 🔥 API: Verify OTP + Login
  const handleVerifyLogin = async () => {
    if (verifying) return;

    const emailOk = validateEmailUI();
    if (!emailOk) return;

    const otpOk = validateOtpUI();
    if (!otpOk) return;

    setVerifying(true);
    setOtpError("");

    try {
      const res = await fetch(`${API_BASE}/auth/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ MUST
        body: JSON.stringify({ 
          email: email.trim(), 
          otp: otpValue,
          name: name.trim(),
          phone: phone.trim()
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setOtpError(data?.message || "OTP verification failed");
        resetOtp();
        setVerifying(false);
        return;
      }

      // ✅ If backend returns token (recommended)
      // Example response: { success:true, token:"...", user:{...} }
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      window.location.href = "/";
    } catch (err: any) {
      setOtpError(err?.message || "Network error");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = () => {
    if (cooldown > 0 || sending) return;
    handleSendOtp();
  };

  const maskEmail = (raw: string) => {
    const e = raw.trim();
    const at = e.indexOf("@");
    if (at <= 1) return e;
    const name = e.slice(0, at);
    const domain = e.slice(at);
    const visible = name.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(2, name.length - 2))}${domain}`;
  };


  
useEffect(() => {
  const token = getToken();
  if (!token) return;

  const verifyTokenAndRedirect = async () => {
    try {
     
       setVerifying(true);

      const res = await fetch(`${API_BASE}/auth/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ token backend ko
        },
        credentials: "include", // if you also use cookies
      });

      if (res.ok) {
        // ✅ token valid -> redirect
        window.location.replace("/user/dashboard");
        return;
      }

      // ❌ token invalid -> remove it
      localStorage.removeItem("token");
    } catch (e) {
      // network issue: token delete mat karo (optional)
      // but safe approach:
      // localStorage.removeItem("token");
    } finally {
      // setVerifying(false);
    }
  };

  verifyTokenAndRedirect();
  // API_BASE dependency ok
}, [API_BASE]);


useEffect(() => {
  if (step !== "otp") return;
  if (!otpComplete) return;
  if (verifying) return;

  // slight delay for better UX (optional)
  const t = setTimeout(() => {
    handleVerifyLogin();
  }, 300);

  return () => clearTimeout(t);
}, [otpComplete, step]);


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
                <div className="text-4xl font-extrabold tracking-wide">User Portal</div>
                <div className="mt-3 max-w-md text-white/85 text-base leading-relaxed">
                  Sign in with your email to access your dashboard and track requests.
                </div>
              </div>

              <div className="mt-10 space-y-4 max-w-md">
                <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Secure OTP Login" />
                <Feature icon={<BarChart3 className="h-5 w-5" />} title="Track Status Updates" />
                <Feature icon={<Users className="h-5 w-5" />} title="Manage Your Requests" />
                <Feature icon={<Settings className="h-5 w-5" />} title="Fast Support Workflow" />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14 bg-white">
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Welcome Back!</h1>
                <p className="mt-2 text-sm text-slate-500">
                  {step === "email" ? "Login with your email address" : "Enter the OTP sent to your email"}
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {/* EMAIL STEP */}
                {step === "email" && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">Full Name</label>
                      <div className="mt-1 h-12 rounded-2xl bg-slate-50 border border-slate-200 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-500">
                        <Users className="h-4 w-4 text-slate-500" />
                        <input
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          type="text"
                          className="w-full bg-transparent outline-none text-sm text-slate-900"
                          placeholder="Enter your full name"
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600">Email Address</label>
                      <div className="mt-1 h-12 rounded-2xl bg-slate-50 border border-slate-200 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-500">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          onBlur={validateEmailUI}
                          type="email"
                          className="w-full bg-transparent outline-none text-sm text-slate-900"
                          placeholder="Enter email"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600">Phone Number</label>
                      <div className="mt-1 h-12 rounded-2xl bg-slate-50 border border-slate-200 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-500">
                        <KeyRound className="h-4 w-4 text-slate-500" />
                        <input
                          value={phone}
                          onChange={(e) => {
                            const cleaned = e.target.value.replace(/\D/g, "");
                            setPhone(cleaned.slice(0, 15));
                            if (emailError) setEmailError("");
                          }}
                          type="tel"
                          className="w-full bg-transparent outline-none text-sm text-slate-900"
                          placeholder="Enter 10+ digit phone"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    {emailError ? (
                      <p className="mt-2 text-xs text-red-600">{emailError}</p>
                    ) : (
                        <p className="mt-2 text-xs text-slate-500">We will send a 6-digit OTP to your email.</p>
                      )}

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!emailValid || !nameValid || !phoneValid || sending}
                      className={`w-full h-12 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition
                        ${(!emailValid || !nameValid || !phoneValid || sending) ? "bg-teal-300 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800"}`}
                    >
                      <KeyRound className="h-5 w-5" />
                      {sending ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </>
                )}

                {/* OTP STEP */}
                {step === "otp" && (
                  <>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <label className="text-xs font-semibold text-slate-600">OTP</label>
                        <button
                          type="button"
                          onClick={() => {
                            setStep("email");
                            setOtp(Array.from({ length: OTP_LEN }, () => ""));
                            setOtpError("");
                            setCooldown(0);
                            setEmail("");
                            setName("");
                            setPhone("");
                          }}
                          className="text-xs font-semibold text-teal-800 hover:opacity-80"
                        >
                          Change details
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-center gap-2" >
                        {otp.map((d, i) => (
                          <input
                            key={i}
                            ref={(el) => (otpRefs.current[i] = el)}
                            value={d}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            inputMode="numeric"
                            pattern="\d*"
                            className="h-12 w-11 sm:w-12 rounded-2xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                            maxLength={1}
                            aria-label={`OTP digit ${i + 1}`}
                            onPaste={handleOtpPaste}

                          />
                        ))}
                      </div>

                      {otpError ? (
                        <p className="mt-2 text-xs text-red-600 text-center">{otpError}</p>
                      ) : (
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                          <span>
                            OTP sent to: <span className="font-semibold text-slate-800">{maskEmail(email)}</span>
                          </span>

                          <button
                            type="button"
                            onClick={handleResend}
                            disabled={cooldown > 0 || sending}
                            className={`font-semibold ${
                              cooldown > 0 || sending ? "text-slate-400" : "text-teal-800 hover:opacity-80"
                            }`}
                          >
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyLogin}
                      disabled={!otpComplete || verifying}
                      className={`w-full h-12 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition
                        ${!otpComplete || verifying ? "bg-teal-300 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800"}`}
                    >
                      <ArrowRight className="h-5 w-5" />
                      {verifying ? "Verifying..." : "Verify & Login"}
                    </button>
                  </>
                )}

                <div className="pt-2 border-t border-slate-200" />
              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                OTP is sent via email. Backend endpoints are required for production.
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
