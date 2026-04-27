import React, { useEffect, useMemo, useRef, useState } from "react";
import { GraduationCap, ShieldCheck, BarChart3, Users, Settings, Mail, KeyRound, ArrowRight, Phone } from "lucide-react";
import { z } from "zod";
import { authAPI } from "../../lib/api";

const OTP_LEN = 6;
const EGS_BRAND = "#294d6b";

// Validation schemas
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

const nameSchema = z
  .string()
  .trim()
  .min(2, "Name at least 2 chars");

const phoneSchema = z
  .string()
  .regex(/^\d{10,}$/, "Phone 10+ digits");

export default function UserLogin() {
  // Token management
  const getToken = () => localStorage.getItem("authToken") || localStorage.getItem("token");
  
  // State management
  const [step, setStep] = useState<"email" | "otp" | "profile">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array.from({ length: OTP_LEN }, () => ""));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Flags for conditional steps
  const [userExists, setUserExists] = useState(false);
  const [needsProfile, setNeedsProfile] = useState(false);

  // UI states
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [profileError, setProfileError] = useState("");

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Validation helpers
  const emailValid = useMemo(() => emailSchema.safeParse(email).success, [email]);
  const otpComplete = useMemo(() => otp.every((d) => d.trim().length === 1), [otp]);
  const otpValue = useMemo(() => otp.join(""), [otp]);
  const nameValid = useMemo(() => nameSchema.safeParse(name).success, [name]);
  const phoneValid = useMemo(() => phoneSchema.safeParse(phone).success, [phone]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Redirect if already logged in
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    window.location.replace("/user/dashboard");
  }, []);

  // Utility: Mask email
  const maskEmail = (raw: string) => {
    const e = raw.trim();
    const at = e.indexOf("@");
    if (at <= 1) return e;
    const name = e.slice(0, at);
    const domain = e.slice(at);
    const visible = name.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(2, name.length - 2))}${domain}`;
  };

  // Reset OTP
  const resetOtp = () => {
    setOtp(Array.from({ length: OTP_LEN }, () => ""));
    setOtpError("");
    setTimeout(() => otpRefs.current[0]?.focus(), 0);
  };

  // ===== HANDLERS =====

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (sending || !emailValid) return;
    setSending(true);
    setEmailError("");

    try {
      const res = await authAPI.sendOTP(email.trim());
      setUserExists(res.data.exists);
      setNeedsProfile(res.data.needsProfile);
      setStep("otp");
      setCooldown(30);
      resetOtp();
    } catch (err: any) {
      setEmailError(err.response?.data?.message || err.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (verifying || !otpComplete) return;
    setVerifying(true);
    setOtpError("");

    try {
      // If new user (needsProfile), pass name+phone here
      // If returning user (userExists), name+phone can be empty
      const res = await authAPI.verifyOTP(
        email.trim(),
        otpValue,
        needsProfile ? name.trim() : undefined,
        needsProfile ? phone.trim() : undefined
      );

      // Save token
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      }

      // If user needs to complete profile later, go to profile step
      if (needsProfile && res.data.needsProfile) {
        setStep("profile");
      } else {
        // Direct redirect - use replace to prevent back button issues
        window.location.replace("/user/dashboard");
      }
    } catch (err: any) {
      setOtpError(err.response?.data?.message || err.message || "OTP verification failed");
      resetOtp();
    } finally {
      setVerifying(false);
    }
  };

  // Step 3: Complete Profile (fallback/optional)
  const handleCompleteProfile = async () => {
    if (verifying || !nameValid || !phoneValid) return;
    setVerifying(true);
    setProfileError("");

    try {
      const res = await authAPI.completeProfile(email.trim(), name.trim(), phone.trim());
      if (res.data?.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("token", res.data.token);
      }
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      window.location.href = "/user/dashboard";
    } catch (err: any) {
      setProfileError(err.response?.data?.message || err.message || "Failed to complete profile");
    } finally {
      setVerifying(false);
    }
  };

  // Resend OTP
  const handleResend = () => {
    if (cooldown > 0 || sending) return;
    handleSendOtp();
  };

  // OTP input: Change handler
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LEN - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // OTP input: Keydown handler
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

    const allowed = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // OTP input: Paste handler
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


  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-10"
      style={{ background: `linear-gradient(135deg, ${EGS_BRAND} 0%, #1f3850 55%, #122130 100%)` }}
    >
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT PANEL */}
          <div
            className="relative hidden lg:block text-white px-8 py-10 lg:px-12 lg:py-14"
            style={{ background: `linear-gradient(135deg, ${EGS_BRAND} 0%, #1f3850 55%, #122130 100%)` }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-full bg-white/15 flex items-center justify-center">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div className="mt-8">
                <div className="text-4xl font-extrabold tracking-tight">EGS Portal</div>
                <div className="mt-3 max-w-md text-white/90 text-base leading-relaxed">
                  Secure access to your visa & attestation applications. Track status in real-time.
                </div>
              </div>

              <div className="mt-10 space-y-4 max-w-md">
                <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Secure OTP Login" />
                <Feature icon={<BarChart3 className="h-5 w-5" />} title="Track Status Updates" />
                <Feature icon={<Users className="h-5 w-5" />} title="Manage Requests" />
                <Feature icon={<Settings className="h-5 w-5" />} title="24/7 Support" />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 bg-white">
            <div className="max-w-md mx-auto">
              <div className="lg:hidden text-center mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#294d6b]/10 text-[#294d6b]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#294d6b]">
                  Evren Global Solution
                </p>
              </div>
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {step === "email" && "Sign In"}
                  {step === "otp" && "Verify OTP"}
                  {step === "profile" && "Complete Profile"}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  {step === "email" && "Enter your email to begin"}
                  {step === "otp" && `OTP sent to ${maskEmail(email)}`}
                  {step === "profile" && "Complete your profile details"}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 space-y-6">
                {/* STEP 1: EMAIL */}
                {step === "email" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          type="email"
                          placeholder="you@example.com"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294d6b] focus:border-transparent"
                          autoComplete="email"
                        />
                      </div>
                      {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
                    </div>

                    <button
                      onClick={handleSendOtp}
                      disabled={!emailValid || sending}
                      className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition
                        ${!emailValid || sending
                          ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#294d6b] hover:bg-[#1f3b54] active:scale-95"
                        }`}
                    >
                      {sending ? "Sending OTP..." : <>Send OTP <ArrowRight className="h-5 w-5" /></>}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                      A 6-digit OTP will be sent to your email
                    </p>
                  </>
                )}

                {/* STEP 2: OTP */}
                {step === "otp" && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-gray-700">Enter OTP</label>
                        <button
                          onClick={() => {
                            setStep("email");
                            resetOtp();
                            setCooldown(0);
                          }}
                          className="text-xs font-semibold text-[#294d6b] hover:text-[#1f3b54]"
                        >
                          Change email
                        </button>
                      </div>

                      <div className="flex gap-2 justify-center">
                        {otp.map((d, i) => (
                          <input
                            key={i}
                            ref={(el) => (otpRefs.current[i] = el)}
                            value={d}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            onPaste={handleOtpPaste}
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={1}
                            className="h-12 w-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294d6b] focus:border-transparent"
                            aria-label={`OTP digit ${i + 1}`}
                          />
                        ))}
                      </div>

                      {otpError && <p className="mt-3 text-sm text-red-600 text-center">{otpError}</p>}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Didn't receive OTP?
                      </span>
                      <button
                        onClick={handleResend}
                        disabled={cooldown > 0 || sending}
                        className={`font-semibold ${
                          cooldown > 0 || sending ? "text-gray-400 cursor-not-allowed" : "text-[#294d6b] hover:text-[#1f3b54]"
                        }`}
                      >
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
                      </button>
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={!otpComplete || verifying}
                      className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition
                        ${!otpComplete || verifying
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#294d6b] hover:bg-[#1f3b54] active:scale-95"
                        }`}
                    >
                      {verifying ? "Verifying..." : <>Continue <ArrowRight className="h-5 w-5" /></>}
                    </button>
                  </>
                )}

                {/* STEP 3: PROFILE (Conditional) */}
                {step === "profile" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (profileError) setProfileError("");
                          }}
                          type="text"
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294d6b] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          value={phone}
                          onChange={(e) => {
                            const cleaned = e.target.value.replace(/\D/g, "");
                            setPhone(cleaned.slice(0, 15));
                            if (profileError) setProfileError("");
                          }}
                          type="tel"
                          placeholder="+91 XXXXXXXXXX"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294d6b] focus:border-transparent"
                        />
                      </div>
                    </div>

                    {profileError && <p className="text-sm text-red-600 text-center">{profileError}</p>}

                    <button
                      onClick={handleCompleteProfile}
                      disabled={!nameValid || !phoneValid || verifying}
                      className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition
                        ${!nameValid || !phoneValid || verifying
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#294d6b] hover:bg-[#1f3b54] active:scale-95"
                        }`}
                    >
                      {verifying ? "Completing..." : <>Complete <ArrowRight className="h-5 w-5" /></>}
                    </button>
                  </>
                )}
              </div>
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
      <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">{icon}</div>
      <div className="text-sm font-semibold text-white/95">{title}</div>
    </div>
  );
}
