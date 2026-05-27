"use client";

import { motion } from "framer-motion";
import MachineImage from "./MachineImage";

const shots = [
  {
    src: "/images/machine-gallery-4.png",
    title: "Studio views — closed & open configuration",
    caption: "See the machine with safety doors closed or open to inspect fabric take-down and drive systems.",
  },
  {
    src: "/images/machine-gallery-6.png",
    title: "Multi-angle engineering showcase",
    caption: "Six professional angles highlight the creel, knitting head, and base — ideal for mill planning.",
  },
];

export default function MachineGallery() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-3xl font-bold">Machine gallery</h2>
      <p className="mt-2 max-w-2xl text-vilike-muted">
        Professional studio imagery on a dark canvas — the same presentation style used at international
        textile exhibitions.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {shots.map((s, i) => (
          <motion.article
            key={s.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="overflow-hidden rounded-xl border border-white/10 bg-vilike-bg"
          >
            <div className="relative aspect-[4/3]">
              <MachineImage src={s.src} alt={s.title} fill />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-vilike-muted">{s.caption}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
