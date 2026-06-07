"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/machine-frames";

type Step = "form" | "success";

export default function SignupPage() {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/signup-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, company }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }

    setStep("success");
  }

  const inputCls =
    "w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 focus:border-vilike-accent focus:outline-none";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-vilike-accent/30 bg-black/60 p-8 shadow-blue-glow">
        <div className="flex justify-center">
          <Image
            src={LOGO_SRC}
            alt="VILIKE"
            width={64}
            height={64}
            className="mx-auto drop-shadow-[0_0_20px_rgba(0,87,255,0.6)] mix-blend-screen"
          />
        </div>

        {step === "form" ? (
          <>
            <h1 className="mt-4 text-center text-2xl font-bold">
              Request Portal Access
            </h1>
            <p className="mt-1 text-center text-sm text-vilike-muted">
              Fill in your details. Our team will review your request and email
              you a passkey to log in.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-vilike-muted">
                  Full Name *
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-vilike-muted">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourmill.com"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-vilike-muted">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-vilike-muted">
                  Company / Mill Name
                </label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your spinning mill or company"
                  className={inputCls}
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-vilike-accent py-3 font-semibold text-white disabled:opacity-50"
              >
                {loading ? "Submitting…" : "Submit Request"}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-vilike-muted">
              Already have a passkey?{" "}
              <Link href="/login" className="text-vilike-accent hover:underline">
                Sign in →
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="mt-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-3xl">
                ✓
              </div>
              <h1 className="mt-4 text-2xl font-bold text-green-400">
                Request Submitted!
              </h1>
              <p className="mt-2 text-sm text-vilike-muted">
                Thank you, <span className="text-white">{name}</span>. Our team
                at VILIKE FAB TECH will review your request and send your login
                passkey to{" "}
                <span className="font-medium text-white">{email}</span>.
              </p>
              <p className="mt-3 text-xs text-vilike-muted">
                Typically processed within 1 business day. For urgent
                enquiries, call{" "}
                <span className="text-white">8190908383</span>.
              </p>

              <Link
                href="/login"
                className="mt-6 inline-block rounded-lg bg-vilike-accent px-6 py-2.5 text-sm font-semibold text-white"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
