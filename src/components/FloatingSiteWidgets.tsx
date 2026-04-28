import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowUp,
  BookOpen,
  MessageCircle,
  PackageSearch,
  X,
  Send,
} from "lucide-react";
const WHATSAPP_NUMBER = "919999999999";

export default function FloatingSiteWidgets() {
  const [location] = useLocation();
  const [showScroll, setShowScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const shown = sessionStorage.getItem("egs_support_popup_seen");
    if (shown) return;
    const timer = window.setTimeout(() => {
      setPromoOpen(true);
      sessionStorage.setItem("egs_support_popup_seen", "1");
    }, 10000);
    return () => window.clearTimeout(timer);
  }, []);

  const handleBookOnline = () => {
    const isLoggedIn =
      typeof window !== "undefined" &&
      Boolean(localStorage.getItem("authToken") || localStorage.getItem("token"));
    if (isLoggedIn) {
      window.location.href = "/user/dashboard";
      return;
    }
    window.location.href = `/user/login?next=${encodeURIComponent("/user/dashboard")}`;
  };

  if (location.startsWith("/admin") || location.startsWith("/user")) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl transition hover:-translate-y-0.5"
          aria-label="WhatsApp us"
        >
          <MessageCircle className="h-6 w-6" />
        </a>

        <div className="relative">
          <button
            type="button"
            onMouseEnter={() => setMenuOpen(true)}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#294d6b] text-white shadow-xl transition hover:-translate-y-0.5"
            aria-label="Quick support actions"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <PackageSearch className="h-5 w-5" />}
          </button>

          <div
            onMouseLeave={() => setMenuOpen(false)}
            className={`absolute bottom-16 right-0 w-72 origin-bottom-right transition-all duration-300 ${menuOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"}`}
          >
            <div className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#294d6b]">Quick Access</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">Need help with your service?</div>
              <div className="mt-4 space-y-2">
                <button type="button" onClick={handleBookOnline} className="flex w-full items-center gap-3 rounded-2xl bg-[#294d6b] px-4 py-3 text-left text-sm font-semibold text-white">
                  <BookOpen className="h-4 w-4" />
                  Book Your Service Online
                </button>
                <button type="button" onClick={() => (window.location.href = "/document-courier-support")} className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  <Send className="h-4 w-4 text-[#294d6b]" />
                  Courier Your Document
                </button>
                <button type="button" onClick={() => (window.location.href = "/courier-status")} className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  <PackageSearch className="h-4 w-4 text-[#294d6b]" />
                  Your Status
                </button>
              </div>
            </div>
          </div>
        </div>

        {showScroll && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#294d6b] text-white shadow-xl transition hover:-translate-y-0.5"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>

      {promoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <div className="text-lg font-semibold text-slate-900">Need help with documents or booking?</div>
                <div className="text-sm text-slate-500">Choose the fastest option and continue from here.</div>
              </div>
              <button type="button" onClick={() => setPromoOpen(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-3 px-6 py-6">
              <button type="button" onClick={handleBookOnline} className="flex w-full items-center justify-between rounded-2xl bg-[#294d6b] px-5 py-4 text-left text-sm font-semibold text-white">
                <span className="flex items-center gap-3"><BookOpen className="h-4 w-4" />Book Your Service Online</span>
                <PackageSearch className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => (window.location.href = "/document-courier-support")} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                <span className="flex items-center gap-3"><Send className="h-4 w-4 text-[#294d6b]" />Courier Your Document</span>
                <PackageSearch className="h-4 w-4 text-[#294d6b]" />
              </button>
              <button type="button" onClick={() => (window.location.href = "/courier-status")} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                <span className="flex items-center gap-3"><PackageSearch className="h-4 w-4 text-[#294d6b]" />Track Your Courier Status</span>
                <PackageSearch className="h-4 w-4 text-[#294d6b]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
