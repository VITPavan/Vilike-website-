"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Hotspot, Machine } from "@/lib/types";
import { componentHotspots } from "@/lib/catalog-copy";
import { formatModelDescription } from "@/lib/catalog-copy";
import MachineImage from "./MachineImage";
import Machine360Viewer from "./Machine360Viewer";

export default function MachineExplorer({ machine }: { machine: Machine }) {
  const hotspots = machine.hotspots?.length ? machine.hotspots : componentHotspots;
  const [active, setActive] = useState<Hotspot | null>(null);

  const catalogText = formatModelDescription({
    dia: machine.specs.dia,
    gauge: machine.specs.gauge,
    feeders: machine.specs.feeders,
    note: machine.specs.note,
    category: machine.category,
    delivery_days: machine.delivery_days,
  });

  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-base leading-relaxed text-white/85">{catalogText}</p>

      <section className="rounded-xl border border-vilike-accent/30 bg-black/40 p-4">
        <h3 className="mb-2 text-center text-lg font-bold text-vilike-accent">3D Machine View</h3>
        <Machine360Viewer heroImage={machine.hero_image} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-vilike-accent/30 bg-vilike-bg shadow-blue-glow">
          <MachineImage
            src={machine.hero_image}
            alt={machine.model_name}
            fill
            priority
            className="p-4"
          />
          {hotspots.map((h, i) => (
            <motion.button
              key={h.id}
              type="button"
              className="absolute z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-vilike-accent shadow-blue-flash"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
              onClick={() => setActive(h)}
              aria-label={h.label}
            />
          ))}
        </div>

        <div>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-vilike-accent/40 bg-vilike-accent/10 p-5"
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-vilike-bg">
                  <MachineImage src={active.zoomImage} alt={active.label} fill />
                </div>
                <h4 className="text-lg font-bold text-vilike-accent">{active.label}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{active.description}</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-dashed border-white/20 p-6 text-sm leading-relaxed text-vilike-muted"
              >
                Select a pulsing blue point on the machine to explore yarn feeders, cam box, take-up
                rollers, and other core systems.
              </motion.div>
            )}
          </AnimatePresence>

          <h4 className="mt-8 font-bold text-white">German & European core components</h4>
          <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {machine.engineering.map((e) => (
              <li key={e.title} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
                <span className="font-medium text-vilike-accent">{e.title}</span>
                <p className="mt-1 leading-relaxed text-vilike-muted">{e.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
