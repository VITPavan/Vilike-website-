"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/machine-frames";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    setSuccess(true);
    setFormData({ name: "", email: "", phone: "", company: "" });
    
    // Show success message for 3 seconds, then redirect to login
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }

  return (
    <div className="flex min-h-[100vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-vilike-accent/30 bg-black/60 p-8 shadow-blue-glow">
        <div className="flex justify-center">
          <Image
            src={LOGO_SRC}
            alt="VILIKE"
            width={72}
            height={72}
            className="mx-auto drop-shadow-[0_0_20px_rgba(0,87,255,0.6)] mix-blend-screen"
          />
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold">Request Portal Access</h1>
        <p className="text-center text-sm text-vilike-muted">
          New customer? Provide your details and we'll send you a login passkey
        </p>

        {success ? (
          <div className="mt-6 rounded-lg border border-green-500/40 bg-green-500/10 p-6">
            <p className="font-semibold text-green-400">✓ Request Submitted!</p>
            <p className="mt-2 text-sm text-vilike-muted">
              Thank you for requesting access. Our admin team will review your details and send you a passkey via email shortly.
            </p>
            <p className="mt-4 text-xs text-vilike-muted">
              Redirecting to login page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-vilike-muted mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-lg border border-white/20 bg-vilike-bg px-4 py-3 text-white placeholder:text-white/40 focus:border-vilike-accent focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-vilike-muted mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@company.com"
                className="w-full rounded-lg border border-white/20 bg-vilike-bg px-4 py-3 text-white placeholder:text-white/40 focus:border-vilike-accent focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-vilike-muted mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-white/20 bg-vilike-bg px-4 py-3 text-white placeholder:text-white/40 focus:border-vilike-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-vilike-muted mb-1">
                Company / Mill Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
                className="w-full rounded-lg border border-white/20 bg-vilike-bg px-4 py-3 text-white placeholder:text-white/40 focus:border-vilike-accent focus:outline-none"
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
              className="w-full rounded-lg bg-vilike-accent py-3 font-semibold text-white disabled:opacity-50 hover:opacity-90 transition mt-6"
            >
              {loading ? "Submitting…" : "Request Access"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-vilike-muted">
            Already have a passkey?{" "}
            <Link
              href="/login"
              className="text-vilike-accent hover:underline font-semibold"
            >
              Sign In →
            </Link>
          </p>
        </div>

        <div className="mt-6 rounded-lg bg-white/5 p-3 text-xs text-vilike-muted">
          <p className="font-medium text-white mb-2">How it works:</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Submit your details here</li>
            <li>Admin reviews your request</li>
            <li>You'll receive a login passkey via email</li>
            <li>Use the passkey to sign in</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
