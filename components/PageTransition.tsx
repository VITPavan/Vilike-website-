"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoLoader from "./LogoLoader";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setLoading(true);
    setReady(false);
    const fallback = setTimeout(() => {
      setLoading(false);
      setReady(true);
    }, 2200);
    return () => clearTimeout(fallback);
  }, [pathname]);

  const finish = () => {
    setLoading(false);
    setReady(true);
  };

  return (
    <>
      <LogoLoader show={loading} onComplete={finish} />
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}
