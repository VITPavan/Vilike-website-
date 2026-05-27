"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

/** Professional presentation: black canvas + blue rim glow; works with cutout assets */
export default function MachineImage({
  src,
  alt,
  priority,
  className = "",
  fill,
  width,
  height,
}: Props) {
  const glow =
    "drop-shadow-[0_0_35px_rgba(0,87,255,0.45)] drop-shadow-[0_0_80px_rgba(0,87,255,0.15)]";

  if (fill) {
    return (
      <div className="relative h-full w-full bg-vilike-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,255,0.12)_0%,transparent_70%)]" />
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-contain ${glow} ${className}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div className="relative inline-block bg-vilike-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,255,0.15)_0%,transparent_65%)]" />
      <Image
        src={src}
        alt={alt}
        width={width ?? 900}
        height={height ?? 600}
        priority={priority}
        className={`relative mx-auto ${glow} ${className}`}
      />
    </div>
  );
}
