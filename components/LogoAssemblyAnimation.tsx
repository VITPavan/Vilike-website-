"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { ASSEMBLY_MACHINE_IMAGES, LOGO_SRC } from "@/lib/machine-frames";

const corners = [
  { x: "-120%", y: "-80%", rotate: -12 },
  { x: "120%", y: "-80%", rotate: 12 },
  { x: "-120%", y: "80%", rotate: 8 },
  { x: "120%", y: "80%", rotate: -8 },
];

type Props = {
  show: boolean;
  variant?: "intro" | "loader";
  onComplete?: () => void;
};

export default function LogoAssemblyAnimation({
  show,
  variant = "loader",
  onComplete,
}: Props) {
  const duration = variant === "intro" ? 2.8 : 1.8;

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onComplete?.(), duration * 1000 + 200);
    return () => clearTimeout(t);
  }, [show, duration, onComplete]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-vilike-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,87,255,0.15)_0%,transparent_55%)]" />

          {/* Machine models fly in */}
          {ASSEMBLY_MACHINE_IMAGES.map((src, i) => (
            <motion.div
              key={src + i}
              className="absolute h-32 w-32 md:h-40 md:w-40"
              initial={{
                x: corners[i].x,
                y: corners[i].y,
                opacity: 0,
                scale: 0.4,
                rotate: corners[i].rotate,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: [0, 1, 1, 0],
                scale: [0.4, 0.85, 0.2, 0],
                rotate: 0,
              }}
              transition={{
                duration,
                times: [0, 0.35, 0.65, 1],
                ease: "easeInOut",
                delay: i * 0.08,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain drop-shadow-[0_0_25px_rgba(0,87,255,0.5)]"
              />
            </motion.div>
          ))}

          {/* Logo forms at center */}
          <motion.div
            className="relative z-20 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: duration * 0.55, duration: 0.5, type: "spring", stiffness: 120 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative h-28 w-28 md:h-36 md:w-36"
            >
              <div className="absolute inset-0 rounded-full bg-vilike-accent/30 blur-3xl" />
              <Image
                src={LOGO_SRC}
                alt="VILIKE"
                width={144}
                height={144}
                className="relative h-full w-full object-contain mix-blend-screen"
                priority
              />
            </motion.div>
            <motion.p
              className="mt-6 text-sm font-semibold tracking-[0.35em] text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: duration * 0.7 }}
            >
              VILIKE FAB TECH
            </motion.p>
            <motion.p
              className="mt-1 text-xs text-vilike-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: duration * 0.8 }}
            >
              Knitting Solutions for the World
            </motion.p>
          </motion.div>

          {/* Blue flash ring */}
          <motion.div
            className="pointer-events-none absolute h-64 w-64 rounded-full border-2 border-vilike-accent"
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ delay: duration * 0.5, duration: 1.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
