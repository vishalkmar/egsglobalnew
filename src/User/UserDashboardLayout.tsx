
import React, { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";

import {
  LayoutDashboard,
  ClipboardList,
  Wallet,
  UserCircle2,
  Settings,
  Pencil,
  Trash2,
  Menu,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

type NavItem = {
  label: string;
  to: string;
  icon: React.ElementType;
};

export default function UserLayout({ children }: { children: React.ReactNode }) {

  const userName = "User";

  const [location, setLocation] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Dashboard", to: "/user/dashboard", icon: LayoutDashboard },
      { label: "Track Applications", to: "/user/applications", icon: ClipboardList },
      { label: "Payments", to: "/user/payments", icon: Wallet },
      { label: "Profile", to: "/user/profile", icon: UserCircle2 },
      { label: "Settings", to: "/user/settings", icon: Settings },
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


const logout = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/user/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    // ignore
  } finally {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // ✅ history replace (dashboard back me nahi aayega)
    window.location.replace("/");
  }
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
          <span className="text-lg font-semibold">U</span>
        </div>

        {(isMobile || !collapsed) && (
          <div className="leading-tight">
            <div className="font-semibold">User Portal</div>
            <div className="text-xs text-white/70">Track your requests</div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {(isMobile || !collapsed) && (
        <div className="px-3 pt-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/70">Quick actions</div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link href="/user/profile/edit">
                <a
                  onClick={() => isMobile && setMobileOpen(false)}
                  className="h-10 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </a>
              </Link>

              <button
                type="button"
                onClick={() => alert("Delete profile (wire to confirm modal + API)")}
                className="h-10 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-50 flex items-center justify-center gap-2 text-sm font-semibold"
                title="Delete Profile"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>

            <div className="mt-2 text-[11px] text-white/70 leading-relaxed">
              Note: Delete is demo only. Add confirmation modal + backend later.
            </div>
          </div>
        </div>
      )}

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
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && <ChevronRight className="h-4 w-4 opacity-80" />}
                  </div>
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
            "rounded-2xl bg-white/10 px-3 py-3",
            collapsed && !isMobile ? "text-center" : "",
          ].join(" ")}
        >
          <div className="text-xs text-white/70">Logged in as</div>
          <div className="text-sm font-semibold">
            {collapsed && !isMobile ? "User" : userName}
          </div>
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
                  <div className="text-sm text-slate-500">EGS Group User Portal</div>
                  <div className="text-base font-semibold text-slate-900">{activeTitle}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-slate-700">
                  <span className="text-sm">Welcome,</span>
                  <span className="text-sm font-semibold">{userName}</span>
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
                    Track your applications, payments, and profile settings here.
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
