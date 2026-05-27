"use client";

import { motion } from "framer-motion";
import type { OrderStatus } from "@/lib/types";

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: "confirmed", label: "Confirmed" },
  { key: "under_production", label: "Under Production" },
  { key: "shipped_from_xiamen", label: "Xiamen Shipped" },
  { key: "in_transit", label: "MSN Transit" },
  { key: "in_chennai_port", label: "Chennai Port" },
  { key: "delivered", label: "Delivered" },
];

const orderIndex = (s: OrderStatus) => {
  const idx = STEPS.findIndex((x) => x.key === s);
  return idx >= 0 ? idx : 0;
};

export default function OrderTracker({ status }: { status: OrderStatus }) {
  const current = orderIndex(status);
  return (
    <div className="overflow-x-auto py-2">
      <div className="flex min-w-[600px] items-center justify-between">
        {STEPS.map((step, i) => {
          const done = i <= current;
          const active = i === current;
          return (
            <div key={step.key} className="flex flex-1 flex-col items-center">
              <motion.div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  done ? "border-vilike-accent bg-vilike-accent text-white" : "border-white/20 text-vilike-muted"
                } ${active ? "shadow-blue-flash" : ""}`}
                animate={active ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {i + 1}
              </motion.div>
              <p className={`mt-2 text-center text-xs ${done ? "text-white" : "text-vilike-muted"}`}>{step.label}</p>
              {i < STEPS.length - 1 && (
                <div
                  className={`absolute hidden h-0.5 w-full translate-y-5 sm:block ${i < current ? "bg-vilike-accent" : "bg-white/10"}`}
                  style={{ width: `${100 / STEPS.length}%` }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="relative mt-2 h-1 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-vilike-accent to-blue-400"
          initial={{ width: 0 }}
          animate={{ width: `${(current / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
}
