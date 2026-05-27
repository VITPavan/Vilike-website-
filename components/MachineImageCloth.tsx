"use client";

import MachineImage from "./MachineImage";

export default function MachineImageCloth({ src, alt }: { src: string; alt: string }) {
  return <MachineImage src={src} alt={alt} fill className="object-cover object-center" />;
}
