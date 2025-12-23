

import React, { useEffect, useMemo, useRef, useState } from "react";
import { GraduationCap, ShieldCheck, BarChart3, Users, Settings, Phone, KeyRound, ArrowRight } from "lucide-react";


const OTP_LEN = 6;

export default function UserLogin() {


  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const [otp, setOtp] = useState<string[]>(Array.from({ length: OTP_LEN }, () => ""));
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [verifying, setVerifying] = useState(false);

  const [cooldown, setCooldown] = useState(0); // seconds

  const phoneValid = useMemo(() => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 13;
  }, [phone]);

  const otpComplete = useMemo(() => otp.every((d) => d.trim().length === 1), [otp]);
  const otpValue = useMemo(() => otp.join(""), [otp]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const resetOtp = () => {
    setOtp(Array.from({ length: OTP_LEN }, () => ""));
    otpRefs.current[0]?.focus();
  };

  const handleSendOtp = async () => {
    if (!phoneValid || sending) return;

    setSending(true);

    const payload = {
      phone,
      ts: new Date().toISOString(),
    };

    console.log("Send OTP payload:", payload);

    // demo simulation
    setTimeout(() => {
      setSending(false);
      setStep("otp");
      setCooldown(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
      alert("OTP sent (Demo). Check console.");
    }, 700);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1); // last numeric
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
        // clear current
        setOtp((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        return;
      }
      // move back
      if (index > 0) otpRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) otpRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LEN - 1) otpRefs.current[index + 1]?.focus();
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

  const handleVerify = async () => {
    if (!otpComplete || verifying) return;

    setVerifying(true);

    const payload = {
      phone,
      otp: otpValue,
      ts: new Date().toISOString(),
    };

    console.log("Verify OTP payload:", payload);

    // demo: accept only 123456
    setTimeout(() => {
      const ok = otpValue === "123456";

      setVerifying(false);

      if (!ok) {
        alert("Invalid OTP (Demo). Try 123456");
        resetOtp();
        return;
      }

      alert("OTP Verified! Redirecting...");
      window.location.href="/user/dashboard";
    }, 750);
  };

  const handleResend = () => {
    if (cooldown > 0 || sending) return;
    handleSendOtp();
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
                <div className="text-4xl font-extrabold tracking-wide">User Portal</div>
                <div className="mt-3 max-w-md text-white/85 text-base leading-relaxed">
                  Sign in with your phone number to access your dashboard and track requests.
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
                  {step === "phone" ? "Login with your phone number" : "Enter the OTP sent to your phone"}
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {/* PHONE STEP */}
                {step === "phone" && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">Phone Number</label>
                      <div className="mt-1 h-12 rounded-2xl bg-slate-50 border border-slate-200 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-500">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                          inputMode="numeric"
                          className="w-full bg-transparent outline-none text-sm text-slate-900"
                          placeholder="Enter phone number"
                          autoComplete="tel"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        Enter 10–13 digits (country code allowed).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!phoneValid || sending}
                      className={`w-full h-12 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition
                        ${!phoneValid || sending ? "bg-teal-300 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800"}`}
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
                            setStep("phone");
                            setOtp(Array.from({ length: OTP_LEN }, () => ""));
                          }}
                          className="text-xs font-semibold text-teal-800 hover:opacity-80"
                        >
                          Change number
                        </button>
                      </div>

                      <div
                        className="mt-2 flex items-center justify-center gap-2"
                        onPaste={handleOtpPaste}
                      >
                        {otp.map((d, i) => (
                          <input
                            key={i}
                            ref={(el) => {
                              otpRefs.current[i] = el;
                            }}
                            value={d}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            inputMode="numeric"
                            className="h-12 w-11 sm:w-12 rounded-2xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                            maxLength={1}
                            aria-label={`OTP digit ${i + 1}`}
                          />
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>
                          OTP sent to: <span className="font-semibold text-slate-800">{phone}</span>
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

                      <p className="mt-2 text-[11px] text-slate-500">
                        Demo: correct OTP is <span className="font-semibold">123456</span>.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleVerify}
                      disabled={!otpComplete || verifying}
                      className={`w-full h-12 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition
                        ${!otpComplete || verifying ? "bg-teal-300 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800"}`}
                    >
                      <ArrowRight className="h-5 w-5" />
                      {verifying ? "Verifying..." : "Verify OTP"}
                    </button>
                  </>
                )}

                <div className="pt-2 border-t border-slate-200" />
              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                Demo only. Replace console/alert with real OTP service + auth token.
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
