"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/machine-frames";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("customer@demo.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }
    router.push(data.role === "admin" ? "/admin" : "/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-vilike-accent/30 bg-black/60 p-8 shadow-blue-glow">
        <div className="flex justify-center">
          <Image
            src={LOGO_SRC}
            alt="VILIKE"
            width={72}
            height={72}
            className="mx-auto drop-shadow-[0_0_20px_rgba(0,87,255,0.6)] mix-blend-screen"
          />
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold">Customer Login</h1>
        <p className="text-center text-sm text-vilike-muted">
          Sign in to your VILIKE portal
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-vilike-muted mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              className="w-full rounded-lg border border-white/20 bg-vilike-bg px-4 py-3 text-white placeholder:text-white/40 focus:border-vilike-accent focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-vilike-muted mb-1">
              Passkey
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your login passkey"
              className="w-full rounded-lg border border-white/20 bg-vilike-bg px-4 py-3 text-white placeholder:text-white/40 focus:border-vilike-accent focus:outline-none"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-vilike-accent py-3 font-semibold text-white disabled:opacity-50 hover:opacity-90 transition"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* New customer sign-up section */}
        <div className="mt-6 rounded-lg border border-vilike-accent/20 bg-vilike-accent/5 p-4 text-center">
          <p className="text-sm font-semibold text-white">New to VILIKE?</p>
          <p className="mt-1 text-xs text-vilike-muted">
            Request portal access and we'll send you a passkey once approved
          </p>
          <Link
            href="/signup"
            className="mt-3 inline-block rounded-lg border border-vilike-accent bg-vilike-accent/10 px-5 py-2 text-sm font-semibold text-vilike-accent hover:bg-vilike-accent hover:text-white transition"
          >
            Request Access →
          </Link>
        </div>

        <div className="mt-4 rounded-lg bg-white/5 p-3 text-xs text-vilike-muted">
          <p className="font-medium text-white mb-2">Demo Credentials</p>
          <p>
            <span className="text-white">Customer:</span> customer@demo.com / demo123
          </p>
          <p>
            <span className="text-white">Admin:</span> admin@vilikefab.com / demo123
          </p>
        </div>
      </div>
    </div>
  );
}
