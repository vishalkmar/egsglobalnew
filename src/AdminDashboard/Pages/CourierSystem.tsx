import { useEffect, useMemo, useState } from "react";
import { courierAPI } from "@/lib/api";
import { PackageSearch, PlusCircle, RefreshCcw, Trash2 } from "lucide-react";

const STATUS_OPTIONS = ["Pending", "Booked", "Picked Up", "In Transit", "Out For Delivery", "Delivered", "Cancelled"];

const emptyForm = {
  courierNumber: "",
  serviceName: "",
  personName: "",
  personEmail: "",
  personPhone: "",
  officeAddress: "",
  amount: "0",
  paymentStatus: "Pending",
  status: "Pending",
  notes: "",
};

export default function CourierSystemAdmin() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const res = await courierAPI.adminList(search ? { search } : {});
      setRows(res.data?.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const stats = useMemo(() => {
    return {
      total: rows.length,
      inTransit: rows.filter((r) => r.status === "In Transit").length,
      delivered: rows.filter((r) => r.status === "Delivered").length,
      pending: rows.filter((r) => r.status === "Pending").length,
    };
  }, [rows]);

  const createCourier = async () => {
    await courierAPI.adminCreate({
      ...form,
      amount: Number(form.amount || 0),
    });
    setForm(emptyForm);
    fetchRows();
  };

  const updateCourier = async (id: string, body: Record<string, any>) => {
    await courierAPI.adminUpdate(id, body);
    fetchRows();
  };

  const deleteCourier = async (id: string) => {
    if (!window.confirm("Delete this courier record?")) return;
    await courierAPI.adminDelete(id);
    fetchRows();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-3xl font-semibold text-slate-900">{stats.total}</div><div className="mt-1 text-sm text-slate-600">Total Couriers</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-3xl font-semibold text-slate-900">{stats.pending}</div><div className="mt-1 text-sm text-slate-600">Pending</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-3xl font-semibold text-slate-900">{stats.inTransit}</div><div className="mt-1 text-sm text-slate-600">In Transit</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-3xl font-semibold text-slate-900">{stats.delivered}</div><div className="mt-1 text-sm text-slate-600">Delivered</div></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px,1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-lg font-semibold text-slate-900">Add New Courier</div>
          <div className="mt-4 space-y-3">
            {Object.entries(form).map(([key, value]) => (
              key === "notes" || key === "officeAddress" ? (
                <textarea
                  key={key}
                  value={value}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={key}
                  className="min-h-[92px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                />
              ) : key === "paymentStatus" ? (
                <select
                  key={key}
                  value={value}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
                >
                  <option>Pending</option>
                  <option>Paid</option>
                </select>
              ) : key === "status" ? (
                <select
                  key={key}
                  value={value}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
                >
                  {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
                </select>
              ) : (
                <input
                  key={key}
                  value={value}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={key}
                  className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
                />
              )
            ))}
          </div>
          <button onClick={createCourier} className="mt-4 inline-flex h-11 items-center gap-2 rounded-2xl bg-[#294d6b] px-5 text-sm font-semibold text-white">
            <PlusCircle className="h-4 w-4" />
            Save Courier
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-lg font-semibold text-slate-900">Courier Management</div>
              <div className="text-sm text-slate-500">Search by courier number, phone, email or service name.</div>
            </div>
            <div className="flex gap-2">
              <div className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 px-4">
                <PackageSearch className="h-4 w-4 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courier..." className="w-56 bg-transparent text-sm outline-none" />
              </div>
              <button onClick={fetchRows} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-slate-700">
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Courier</th>
                  <th className="px-4 py-3 text-left font-medium">Person</th>
                  <th className="px-4 py-3 text-left font-medium">Service</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Payment</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-500">Loading courier records...</td></tr>
                ) : rows.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-500">No courier records found.</td></tr>
                ) : rows.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100 align-top">
                    <td className="px-4 py-3"><div className="font-semibold text-slate-900">{row.courierNumber}</div><div className="text-xs text-slate-500">{new Date(row.createdAt).toLocaleString("en-IN")}</div></td>
                    <td className="px-4 py-3"><div className="font-medium text-slate-900">{row.personName || "-"}</div><div className="text-xs text-slate-500">{row.personEmail || "-"}</div><div className="text-xs text-slate-500">{row.personPhone || "-"}</div></td>
                    <td className="px-4 py-3 text-slate-700">{row.serviceName || "-"}</td>
                    <td className="px-4 py-3 text-slate-700">{row.amountDisplay || "Rs 0.00"}</td>
                    <td className="px-4 py-3">
                      <select value={row.status} onChange={(e) => updateCourier(row.id, { status: e.target.value })} className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none">
                        {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select value={row.paymentStatus || "Pending"} onChange={(e) => updateCourier(row.id, { paymentStatus: e.target.value })} className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none">
                        <option>Pending</option>
                        <option>Paid</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        <textarea
                          defaultValue=""
                          placeholder="Add tracking note and press enter"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              const value = (e.currentTarget.value || "").trim();
                              if (!value) return;
                              updateCourier(row.id, { note: value }).then(() => {
                                e.currentTarget.value = "";
                              });
                            }
                          }}
                          className="min-h-[72px] rounded-2xl border border-slate-200 px-3 py-2 text-xs outline-none"
                        />
                        <button onClick={() => deleteCourier(row.id)} className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600">
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
