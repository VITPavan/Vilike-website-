"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Machine } from "@/lib/types";
import { formatINR } from "@/lib/data";
import { formatModelDescription } from "@/lib/catalog-copy";
import MachineImage from "./MachineImage";

export default function MachineCard({ machine, index }: { machine: Machine; index: number }) {
  const blurb = formatModelDescription({
    dia: machine.specs.dia,
    gauge: machine.specs.gauge,
    feeders: machine.specs.feeders,
    note: machine.specs.note,
    category: machine.category,
    delivery_days: machine.delivery_days,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-vilike-bg card-glow transition-colors"
    >
      <div className="relative h-52">
        <MachineImage src={machine.hero_image} alt={machine.model_name} fill className="p-3" />
        {machine.prominent_customer && (
          <span className="absolute left-2 top-2 z-10 rounded bg-vilike-gold/95 px-2 py-0.5 text-xs font-bold text-black">
            ★ {machine.prominent_customer}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-vilike-accent">{machine.category}</p>
        <h3 className="font-semibold text-white">{machine.model_name}</h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-vilike-muted">{blurb}</p>
        <p className="mt-3 text-lg font-bold text-white">{formatINR(machine.price)}</p>
        <Link
          href={`/machines/${machine.slug}`}
          className="mt-auto pt-3 inline-block w-full rounded-lg border border-vilike-accent py-2 text-center text-sm text-vilike-accent transition-colors group-hover:bg-vilike-accent group-hover:text-white"
        >
          Explore machine →
        </Link>
      </div>
    </motion.div>
  );
}
