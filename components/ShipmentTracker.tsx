"use client";

import { motion } from "framer-motion";
import type { Order } from "@/lib/types";
import { DEMO_MSN_TRACKING } from "@/lib/demo-data";

export default function ShipmentTracker({ order }: { order: Order }) {
  const tracking = order.msn_tracking_number || DEMO_MSN_TRACKING;
  return (
    <div className="rounded-xl border border-vilike-accent/30 bg-black/40 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-white">Live Shipment · Xiamen → Chennai</h3>
        <span className="rounded-full bg-vilike-accent/20 px-3 py-1 text-xs text-vilike-accent">
          MSN Logistics · {tracking}
        </span>
      </div>
      <p className="mt-1 text-sm text-vilike-muted">
        Vessel: {order.vessel_name} · ETA Chennai: {order.eta_chennai}
      </p>

      {/* Route map SVG */}
      <div className="relative my-6 h-24 overflow-hidden rounded-lg bg-vilike-accent/5">
        <svg viewBox="0 0 400 80" className="h-full w-full">
          <motion.circle cx="40" cy="40" r="6" fill="#0057FF" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          <text x="20" y="65" fill="#94a3b8" fontSize="10">Xiamen</text>
          <motion.path
            d="M 50 40 Q 200 20 350 40"
            stroke="#0057FF"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <motion.circle
            cx="200"
            cy="30"
            r="5"
            fill="#DAA520"
            animate={{ cx: [200, 280, 350], cy: [30, 35, 40] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
          <circle cx="350" cy="40" r="6" fill="#0057FF" />
          <text x="310" y="65" fill="#94a3b8" fontSize="10">Chennai</text>
        </svg>
      </div>

      <div className="space-y-3">
        {order.tracking_events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3 border-l-2 border-vilike-accent pl-4"
          >
            <div>
              <p className="text-sm font-medium text-white">{ev.description}</p>
              <p className="text-xs text-vilike-muted">
                {ev.location} · {new Date(ev.timestamp).toLocaleDateString("en-IN")}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs text-vilike-muted">
        Sample tracking ref for demo: {DEMO_MSN_TRACKING} (10-digit Indian format)
      </p>
    </div>
  );
}
