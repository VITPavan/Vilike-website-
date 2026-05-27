"use client";

import { useState } from "react";
import { DEMO_MSN_TRACKING } from "@/lib/demo-data";

export default function AdminOrderStatus({
  orderId,
  initialMsn,
}: {
  orderId: string;
  initialMsn: string;
}) {
  const [msn, setMsn] = useState(initialMsn || DEMO_MSN_TRACKING);
  const [msg, setMsg] = useState("");

  async function saveMsn() {
    const res = await fetch("/api/tracking", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, msn_tracking_number: msn }),
    });
    if (res.ok) setMsg("MSN number saved.");
    else setMsg("Failed to save.");
  }

  async function refresh() {
    const res = await fetch("/api/tracking", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, action: "refresh" }),
    });
    if (res.ok) setMsg("Tracking refreshed from MSN Logistics.");
    else setMsg("Refresh failed.");
  }

  return (
    <div className="mt-4 rounded-xl border border-vilike-accent/30 bg-vilike-accent/5 p-4">
      <h3 className="font-bold text-white">Shipment · MSN Logistics</h3>
      <p className="text-xs text-vilike-muted">Xiamen → Chennai · Sample format: 10-digit Indian number</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          value={msn}
          onChange={(e) => setMsn(e.target.value)}
          placeholder="9876543210"
          className="rounded-lg border border-white/20 bg-black px-3 py-2 text-white"
          maxLength={10}
        />
        <button onClick={saveMsn} className="rounded-lg bg-vilike-accent px-4 py-2 text-sm text-white">
          Save MSN #
        </button>
        <button onClick={refresh} className="rounded-lg border border-vilike-accent px-4 py-2 text-sm text-vilike-accent">
          Refresh Tracking
        </button>
      </div>
      {msg && <p className="mt-2 text-sm text-green-400">{msg}</p>}
    </div>
  );
}
