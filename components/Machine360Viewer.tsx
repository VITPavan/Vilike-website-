"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ROTATION_FRAMES } from "@/lib/machine-frames";

type Props = {
  heroImage?: string;
  autoRotate?: boolean;
};

export default function Machine360Viewer({ heroImage, autoRotate = true }: Props) {
  const frames = heroImage
    ? [{ src: heroImage, label: "Model view" }, ...ROTATION_FRAMES.slice(1)]
    : ROTATION_FRAMES;

  const [frameIndex, setFrameIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const rotateY = useMotionValue(0);
  const dragStart = useRef({ x: 0, index: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const displayRotate = useTransform(rotateY, (v) => `${v}deg`);

  const setIndexFromY = useCallback(
    (deg: number) => {
      const normalized = ((deg % 360) + 360) % 360;
      const idx = Math.round((normalized / 360) * frames.length) % frames.length;
      setFrameIndex(idx);
    },
    [frames.length]
  );

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const controls = animate(rotateY, rotateY.get() + 360, {
      duration: 24,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (v) => setIndexFromY(v),
    });
    return () => controls.stop();
  }, [autoRotate, isDragging, rotateY, setIndexFromY]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, index: frameIndex };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart.current.x;
    const deg = (delta / 4) % 360;
    const newY = dragStart.current.index * (360 / frames.length) + deg;
    rotateY.set(newY);
    setIndexFromY(newY);
  };

  const onPointerUp = () => setIsDragging(false);

  const frame = frames[frameIndex];

  return (
    <div className="space-y-3">
      <p className="text-center text-xs text-vilike-muted">
        Drag left/right to rotate · {frame.label}
      </p>
      <div
        ref={containerRef}
        className="relative mx-auto aspect-square w-full max-w-lg cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(0,87,255,0.2)_0%,transparent_70%)]" />

        {/* 3D ring of ghost panels */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotateY: displayRotate, transformStyle: "preserve-3d" }}
        >
          {frames.map((f, i) => {
            const angle = (i / frames.length) * 360;
            return (
              <div
                key={`${f.src}-${i}`}
                className="absolute h-[70%] w-[70%] opacity-[0.08]"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(180px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <Image src={f.src} alt="" fill className="object-contain" />
              </div>
            );
          })}
        </motion.div>

        {/* Main visible frame */}
        <motion.div
          className="relative z-10 h-full w-full min-h-[280px]"
          animate={{ scale: isDragging ? 1.02 : 1 }}
          transition={{ scale: { duration: 0.2 } }}
        >
          <Image
            src={frame.src}
            alt={frame.label}
            fill
            className="object-contain drop-shadow-[0_0_50px_rgba(0,87,255,0.45)]"
            draggable={false}
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
