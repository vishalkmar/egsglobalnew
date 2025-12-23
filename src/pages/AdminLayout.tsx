import React, { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  FileText,
  Languages,
  Sticker,

  CalendarCheck,
  Ticket,
  ShieldCheck,
  Handshake,
  Menu,
  LogOut,
  X,
  LayoutDashboard,
} from "lucide-react";

/**
 * Admin Dashboard Shell (single component)
 * - Sidebar with your exact links
 * - Hamburger:
 *    - Desktop: collapse/expand (icons-only vs icons+labels)
 *    - Mobile: open/close drawer
 * - Topbar: "Welcome, <Name>" + Logout button
 * - Page loader when switching menu items
 *
 * Hook it after admin login:
 *   navigate("/admin");  (or render <AdminDashboard />)
 */
export default function AdminDashboard() {
  const adminName = "Super Admin"; // replace with logged-in admin name

  const navItems = useMemo(
    () => [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "mea", label: "MEA Attestation", icon: BadgeCheck },
      { key: "pcc", label: "PCC Legalization", icon: FileText },
      { key: "translation", label: "Translation", icon: Languages },
      { key: "stiker", label: "Stiker visa", icon: Sticker },
      { key: "evisa", label: "E-Visa", icon: CalendarCheck },
      { key: "assistant", label: "AssistantandAppointment", icon: CalendarCheck },
      { key: "dummy", label: "DummyTicket", icon: Ticket },
      { key: "insurance", label: "Insurence", icon: ShieldCheck },
      { key: "meetgreet", label: "Meetgreet", icon: Handshake },
    ],
    []
  );

  const [activeKey, setActiveKey] = useState("dashboard");

  // Desktop collapse (icons-only)
  const [collapsed, setCollapsed] = useState(false);

  // Mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  // Loader on page change
  const [loading, setLoading] = useState(false);

  // if user switches pages => show loader briefly
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [activeKey]);

  const activeItem = navItems.find((n) => n.key === activeKey);

  const handleHamburger = () => {
    // Mobile => drawer
    if (window.innerWidth < 1024) {
      setMobileOpen((v) => !v);
      return;
    }
    // Desktop => collapse
    setCollapsed((v) => !v);
  };

  const handleLogout = () => {
    // TODO: clear auth token/session, then redirect to /admin-login
    // Example:
    // localStorage.removeItem("adminToken");
    // navigate("/admin-login");
    alert("Logout clicked (wire this to your auth).");
  };

  const Sidebar = ({ isMobile = false }) => (
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

        {!collapsed && !isMobile && (
          <div className="leading-tight">
            <div className="font-semibold">Admin Panel</div>
            <div className="text-xs text-white/70">Operations Dashboard</div>
          </div>
        )}

        {isMobile && (
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
          const active = item.key === activeKey;

          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveKey(item.key);
                if (isMobile) setMobileOpen(false);
              }}
              className={[
                "w-full flex items-center gap-3 rounded-xl px-3 py-3 transition",
                active ? "bg-white/15" : "hover:bg-white/10",
                collapsed && !isMobile ? "justify-center" : "justify-start",
              ].join(" ")}
            >
              <Icon className="h-5 w-5 opacity-95" />
              {(!collapsed || isMobile) && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
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
          {(!collapsed || isMobile) && (
            <div className="text-sm font-semibold">{adminName}</div>
          )}
          {collapsed && !isMobile && (
            <div className="text-sm font-semibold">Admin</div>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 shadow-2xl">
            <Sidebar isMobile />
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
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
                  onClick={handleHamburger}
                  className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 grid place-items-center"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-5 w-5 text-teal-900" />
                </button>

                <div className="hidden sm:block">
                  <div className="text-sm text-slate-500">
                    ICCICT 2026 Admin Panel
                  </div>
                  <div className="text-base font-semibold text-slate-900">
                    {activeItem?.label || "Dashboard"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-slate-700">
                  <span className="text-sm">Welcome,</span>
                  <span className="text-sm font-semibold">{adminName}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="h-10 px-4 rounded-xl border border-rose-200 text-rose-600 bg-white hover:bg-rose-50 flex items-center gap-2 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>

                {/* Mobile close (only when drawer open) */}
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
              {/* Page card */}
              <div className="rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-6 border-b border-slate-100">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-teal-900">
                    {activeItem?.label || "Dashboard"}
                  </h1>
                  <div className="mt-2 text-sm text-slate-500">
                    Manage requests, applications and operations from here.
                  </div>
                </div>

                {/* Loader + Body */}
                <div className="p-6">
                  {loading ? (
                    <div className="py-14 flex flex-col items-center justify-center gap-4">
                      <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-teal-900 animate-spin" />
                      <div className="text-sm text-slate-600">
                        Loading {activeItem?.label}...
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Dashboard-like summary blocks (placeholder) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { title: "Total Requests", value: "—" },
                          { title: "Pending", value: "—" },
                          { title: "In Process", value: "—" },
                          { title: "Completed", value: "—" },
                        ].map((c, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                          >
                            <div className="text-2xl font-semibold text-slate-900">
                              {c.value}
                            </div>
                            <div className="text-sm text-slate-600 mt-1">
                              {c.title}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Recent Activity table (placeholder) */}
                      <div className="rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="bg-teal-900 text-white px-5 py-4 font-semibold">
                          Recent Activity
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-slate-600">
                              <tr>
                                <th className="text-left px-5 py-3 font-medium">
                                  Type
                                </th>
                                <th className="text-left px-5 py-3 font-medium">
                                  Service
                                </th>
                                <th className="text-left px-5 py-3 font-medium">
                                  Details
                                </th>
                                <th className="text-left px-5 py-3 font-medium">
                                  Timestamp
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                {
                                  type: "New",
                                  service: activeItem?.label || "Dashboard",
                                  details: "Sample activity row",
                                  time: "Just now",
                                },
                                {
                                  type: "Update",
                                  service: "PCC Legalization",
                                  details: "Document verification completed",
                                  time: "2 hours ago",
                                },
                                {
                                  type: "Inquiry",
                                  service: "Meetgreet",
                                  details: "New inquiry received",
                                  time: "6 hours ago",
                                },
                              ].map((r, i) => (
                                <tr
                                  key={i}
                                  className="border-t border-slate-100"
                                >
                                  <td className="px-5 py-4">
                                    <span className="inline-flex items-center rounded-full bg-teal-50 text-teal-900 px-3 py-1 text-xs font-semibold">
                                      {r.type}
                                    </span>
                                  </td>
                                  <td className="px-5 py-4 font-medium text-slate-900">
                                    {r.service}
                                  </td>
                                  <td className="px-5 py-4 text-slate-600">
                                    {r.details}
                                  </td>
                                  <td className="px-5 py-4 text-slate-600">
                                    {r.time}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Page-specific placeholder */}
                      <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="text-sm font-semibold text-slate-900">
                          {activeItem?.label} Content Area
                        </div>
                        <div className="mt-2 text-sm text-slate-600">
                          Yahan par aap each page ka actual content (forms, tables,
                          filters, CRUD etc.) add karoge. Sidebar se jo bhi page
                          open ho, same layout, topbar, loader sab same rahega.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile hint */}
              <div className="mt-4 text-xs text-slate-500">
                Tip: Mobile pe hamburger se drawer open/close hoga. Desktop pe
                same button se sidebar icons-only / expanded toggle hoga.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
