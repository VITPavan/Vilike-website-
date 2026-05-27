"use client";

import Link from "next/link";
import Image from "next/image";
import { LOGO_SRC } from "@/lib/machine-frames";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const links = [
    { href: "/#models", label: "Models" },
    { href: "/#catalog", label: "Technology" },
    { href: "/#finance", label: "Finance" },
    { href: "/login", label: "Login" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-vilike-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={LOGO_SRC}
            alt="VILIKE"
            width={44}
            height={44}
            className="drop-shadow-[0_0_12px_rgba(0,87,255,0.6)] mix-blend-screen"
          />
          <div>
            <p className="text-sm font-bold tracking-wide text-white">VILIKE FAB TECH</p>
            <p className="hidden text-xs text-vilike-muted sm:block">Official Agent · Tirupur</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-vilike-muted hover:text-vilike-accent">
              {l.label}
            </Link>
          ))}
          {(pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) && (
            <button onClick={logout} className="text-vilike-muted hover:text-red-400">
              Logout
            </button>
          )}
          <Link
            href="/login"
            className="rounded-lg bg-vilike-accent px-4 py-2 font-medium text-white hover:shadow-blue-glow"
          >
            Portal
          </Link>
        </nav>

        <button className="md:hidden text-white text-xl" onClick={() => setOpen(!open)} aria-label="Menu">
          ☰
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-vilike-muted"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
