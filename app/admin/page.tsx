"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminCustomerTable from "@/components/AdminCustomerTable";
import AdminMachineManager from "@/components/AdminMachineManager";
import AdminOrderStatus from "@/components/AdminOrderStatus";
import { formatINR } from "@/lib/data";
import { DEMO_MSN_TRACKING } from "@/lib/demo-data";
import type { Machine } from "@/lib/types";

type CustomerRow = {
  id: string;
  full_name: string;
  company: string;
  phone: string;
  email: string;
  machine?: { model_name: string } | null;
  order?: {
    amount_paid: number;
    total_amount: number;
    status: string;
    id: string;
    msn_tracking_number?: string;
  } | null;
  outstanding: number;
};

export default function AdminPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [stats, setStats] = useState({ booked: 0, collected: 0, outstanding: 0 });

  useEffect(() => {
    Promise.all([fetch("/api/customers"), fetch("/api/machines")])
      .then(async ([cRes, mRes]) => {
        if (cRes.status === 401) {
          router.push("/login");
          return;
        }
        const cData = await cRes.json();
        const mData = await mRes.json();
        setCustomers(cData.customers);
        setStats(cData.stats);
        setMachines(mData.machines);
      });
  }, [router]);

  async function onStatusChange(orderId: string, status: string) {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    const res = await fetch("/api/customers");
    const data = await res.json();
    setCustomers(data.customers);
    setStats(data.stats);
  }

  const firstOrder = customers.find((c) => c.order)?.order;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-vilike-muted">VILIKE FAB TECH — Order & customer management</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-vilike-accent/30 bg-vilike-accent/10 p-5">
          <p className="text-sm text-vilike-muted">Total Booked</p>
          <p className="text-2xl font-bold">{formatINR(stats.booked)}</p>
        </div>
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5">
          <p className="text-sm text-vilike-muted">Collected</p>
          <p className="text-2xl font-bold text-green-400">{formatINR(stats.collected)}</p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
          <p className="text-sm text-vilike-muted">Outstanding</p>
          <p className="text-2xl font-bold text-amber-400">{formatINR(stats.outstanding)}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Customers & Orders</h2>
        <p className="text-sm text-vilike-muted">Demo MSN tracking: {DEMO_MSN_TRACKING}</p>
        <div className="mt-4">
          <AdminCustomerTable customers={customers} onStatusChange={onStatusChange} />
        </div>
        {firstOrder && (
          <AdminOrderStatus
            orderId={firstOrder.id}
            initialMsn={firstOrder.msn_tracking_number || DEMO_MSN_TRACKING}
          />
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Machine Catalog</h2>
        <p className="mb-4 text-sm text-vilike-muted">Edit model name, price, and hero image URL</p>
        <AdminMachineManager initialMachines={machines} />
      </section>
    </main>
  );
}
