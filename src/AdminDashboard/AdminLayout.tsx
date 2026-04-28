import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  FileText,
  Handshake,
  Languages,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageSearch,
  Search,
  ShieldCheck,
  Ticket,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  to: string;
  icon: React.ElementType;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminName = "Super Admin";
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
      { label: "MEA Attestation", to: "/admin/mea-attestation", icon: BadgeCheck },
      { label: "PCC Legalization", to: "/admin/pcc-legalization", icon: FileText },
      { label: "Translation", to: "/admin/translation", icon: Languages },
      { label: "E-Visa", to: "/admin/e-visa", icon: BadgeCheck },
      { label: "Assistant & Appointment", to: "/admin/assistant-appointment", icon: CalendarCheck },
      { label: "Dummy Ticket", to: "/admin/dummy-ticket", icon: Ticket },
      { label: "Insurance", to: "/admin/insurance", icon: ShieldCheck },
      { label: "Meet & Greet", to: "/admin/meet-greet", icon: Handshake },
      { label: "HRD Attestation", to: "/admin/hrd-attestation", icon: FileText },
      { label: "Payments", to: "/admin/payments", icon: CreditCard },
      { label: "Courier System", to: "/admin/courier-system", icon: PackageSearch },
    ],
    []
  );

  const activeTitle =
    navItems.find((x) => location === x.to || location.startsWith(x.to + "/"))?.label || "Dashboard";

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) setMobileOpen((v) => !v);
    else setCollapsed((v) => !v);
  };

  useEffect(() => {
    const syncSearch = () => {
      const params = new URLSearchParams(window.location.search);
      setGlobalSearch(params.get("q") || "");
    };

    syncSearch();
    window.addEventListener("popstate", syncSearch);
    window.addEventListener("admin-dashboard-query-sync", syncSearch);

    return () => {
      window.removeEventListener("popstate", syncSearch);
      window.removeEventListener("admin-dashboard-query-sync", syncSearch);
    };
  }, [location]);

  useEffect(() => {
    if (!location.startsWith("/admin/dashboard")) return;

    const timer = window.setTimeout(() => {
      const url = new URL(window.location.href);
      const value = globalSearch.trim();
      const current = url.searchParams.get("q") || "";
      if (current === value) return;
      if (value) url.searchParams.set("q", value);
      else url.searchParams.delete("q");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      window.dispatchEvent(new Event("admin-dashboard-search"));
    }, 250);

    return () => window.clearTimeout(timer);
  }, [globalSearch, location]);

  const submitDashboardSearch = () => {
    const q = globalSearch.trim();
    const next = q ? `/admin/dashboard?q=${encodeURIComponent(q)}` : "/admin/dashboard";
    window.location.assign(next);
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/admin/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      // ignore network error, still logout locally
    } finally {
      localStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_token");
      window.location.replace("/admin/login");
    }
  };

  const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <aside
      className={["h-full text-white flex flex-col", isMobile ? "w-80" : collapsed ? "w-20" : "w-72"].join(" ")}
      style={{ backgroundColor: "#294d6b" }}
    >
      <div className="px-4 py-5 border-b border-white/10 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/10 grid place-items-center">
          <span className="text-lg font-semibold">A</span>
        </div>

        {(isMobile || !collapsed) && (
          <div className="leading-tight">
            <div className="font-semibold">Admin Panel</div>
            <div className="text-xs text-white/70">Operations Dashboard</div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.to;

          return (
            <Link key={item.to} href={item.to}>
              <a
                onClick={() => isMobile && setMobileOpen(false)}
                className={[
                  "w-full flex items-center gap-3 rounded-xl px-3 py-3 transition",
                  isActive ? "bg-white/15" : "hover:bg-white/10",
                  collapsed && !isMobile ? "justify-center" : "justify-start",
                ].join(" ")}
              >
                <Icon className="h-5 w-5 opacity-95" />
                {(isMobile || !collapsed) && <span className="text-sm font-medium">{item.label}</span>}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className={["rounded-xl bg-white/10 px-3 py-3", collapsed && !isMobile ? "text-center" : ""].join(" ")}>
          <div className="text-xs text-white/70">Logged in as</div>
          <div className="text-sm font-semibold">{collapsed && !isMobile ? "Admin" : adminName}</div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 shadow-2xl">
            <Sidebar isMobile />
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
            <div className="min-h-16 px-4 py-3 sm:px-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={toggleSidebar}
                  className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 grid place-items-center"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-5 w-5 text-[#294d6b]" />
                </button>

                <div className="hidden sm:block min-w-0">
                  <div className="text-sm text-slate-500">EGS Group Admin Panel</div>
                  <div className="text-base font-semibold text-slate-900">{activeTitle}</div>
                </div>
              </div>

              <div className="hidden lg:flex flex-1 max-w-2xl items-center">
                <div className="flex h-11 w-full items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitDashboardSearch();
                    }}
                    placeholder="Global search by name, email, payment, service, date..."
                    className="w-full bg-transparent text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={submitDashboardSearch}
                  className="hidden lg:inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#294d6b] hover:bg-slate-50"
                >
                  Search
                </button>

                {/* <div className="hidden sm:flex items-center gap-2 text-slate-700">
                  <span className="text-sm">Welcome,</span>
                  <span className="text-sm font-semibold">{adminName}</span>
                </div> */}

                <button
                  onClick={logout}
                  className="h-10 px-4 rounded-xl border border-rose-200 text-rose-600 bg-white hover:bg-rose-50 flex items-center gap-2 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>

                {mobileOpen && (
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 grid place-items-center"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 text-slate-700" />
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-6">
            <div className="max-w-[1400px] min-w-0 mx-auto">
              <div className="rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
