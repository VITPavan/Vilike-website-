"use client";

import LogoAssemblyAnimation from "./LogoAssemblyAnimation";

export default function LogoLoader({
  show,
  onComplete,
}: {
  show: boolean;
  onComplete?: () => void;
}) {
  return <LogoAssemblyAnimation show={show} variant="loader" onComplete={onComplete} />;
}
