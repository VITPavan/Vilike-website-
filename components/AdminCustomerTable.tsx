"use client";

import { formatINR } from "@/lib/data";

type Row = {
  id: string;
  full_name: string;
  company: string;
  phone: string;
  email: string;
  machine?: { model_name: string } | null;
  order?: { amount_paid: number; total_amount: number; status: string; id: string } | null;
  outstanding: number;
};

export default function AdminCustomerTable({
  customers,
  onStatusChange,
}: {
  customers: Row[];
  onStatusChange: (orderId: string, status: string) => void;
}) {
  const statuses = [
    "confirmed",
    "under_production",
    "shipped_from_xiamen",
    "in_transit",
    "in_chennai_port",
    "customs_clearance",
    "delivered",
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-vilike-accent/20 text-white">
          <tr>
            <th className="p-3">Customer</th>
            <th className="p-3">Company</th>
            <th className="p-3">Machine</th>
            <th className="p-3">Paid</th>
            <th className="p-3">Outstanding</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t border-white/10">
              <td className="p-3 text-white">{c.full_name}</td>
              <td className="p-3 text-vilike-muted">{c.company}</td>
              <td className="p-3">{c.machine?.model_name ?? "—"}</td>
              <td className="p-3">{c.order ? formatINR(c.order.amount_paid) : "—"}</td>
              <td className="p-3 text-amber-400">{formatINR(c.outstanding)}</td>
              <td className="p-3">
                {c.order ? (
                  <select
                    value={c.order.status}
                    onChange={(e) => onStatusChange(c.order!.id, e.target.value)}
                    className="rounded border border-white/20 bg-black px-2 py-1 text-white"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
