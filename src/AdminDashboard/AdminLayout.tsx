import React, { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BadgeCheck,
  FileText,
  Languages,
  Sticker,

  CalendarCheck,
  Ticket,
  ShieldCheck,
  Handshake,
  LayoutDashboard,
  Menu,
  LogOut,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  to: string;
  icon: React.ElementType;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminName = "Super Admin";

  const [location, setLocation] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
      { label: "MEA Attestation", to: "/admin/mea-attestation", icon: BadgeCheck },
      { label: "PCC Legalization", to: "/admin/pcc-legalization", icon: FileText },
      { label: "Translation", to: "/admin/translation", icon: Languages },
      { label: "Stiker visa", to: "/admin/sticker-visa", icon: Sticker },
      { label: "E-Visa", to: "/admin/e-visa", icon:Sticker  },
      { label: "AssistantandAppointment", to: "/admin/assistant-appointment", icon: CalendarCheck },
      { label: "DummyTicket", to: "/admin/dummy-ticket", icon: Ticket },
      { label: "Insurence", to: "/admin/insurance", icon: ShieldCheck },
      { label: "Meet And greet", to: "/admin/meet-greet", icon: Handshake },
       { label: "HRD Attestation", to: "/admin/hrd-attestation", icon: FileText },
    ],
    []
  );

  const activeTitle =
    navItems.find((x) => location === x.to || location.startsWith(x.to + "/"))?.label ||
    "Dashboard";

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) setMobileOpen((v) => !v);
    else setCollapsed((v) => !v);
  };

  const logout = () => {
    // TODO: clear token
    setLocation("/login");
  };

  const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <aside
      className={[
        "h-full bg-teal-900 text-white flex flex-col",
        isMobile ? "w-80" : collapsed ? "w-20" : "w-72",
      ].join(" ")}
    >
      {/* Brand */}
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

      {/* Nav */}
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
                {(isMobile || !collapsed) && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </a>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div
          className={[
            "rounded-xl bg-white/10 px-3 py-3",
            collapsed && !isMobile ? "text-center" : "",
          ].join(" ")}
        >
          <div className="text-xs text-white/70">Logged in as</div>
          <div className="text-sm font-semibold">{collapsed && !isMobile ? "Admin" : adminName}</div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 shadow-2xl">
            <Sidebar isMobile />
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
            <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSidebar}
                  className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 grid place-items-center"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-5 w-5 text-teal-900" />
                </button>

                <div className="hidden sm:block">
                  <div className="text-sm text-slate-500">EGS Group Admin Panel</div>
                  <div className="text-base font-semibold text-slate-900">{activeTitle}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-slate-700">
                  <span className="text-sm">Welcome,</span>
                  <span className="text-sm font-semibold">{adminName}</span>
                </div>

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

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
              <div className="rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-6 border-b border-slate-100">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-teal-900">
                    {activeTitle}
                  </h1>
                  <div className="mt-2 text-sm text-slate-500">
                    Manage requests, applications and operations from here.
                  </div>
                </div>

                <div className="p-6">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
