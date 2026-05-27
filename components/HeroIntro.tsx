"use client";

import { useEffect, useState } from "react";
import LogoAssemblyAnimation from "./LogoAssemblyAnimation";

export default function HeroIntro({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("vilike_intro_seen");
    if (!seen) {
      setShowIntro(true);
      sessionStorage.setItem("vilike_intro_seen", "1");
    }
  }, []);

  return (
    <>
      <LogoAssemblyAnimation
        show={showIntro}
        variant="intro"
        onComplete={() => setShowIntro(false)}
      />
      {children}
    </>
  );
}
