"use client";

import { useEffect, useState } from "react";
import type { DynamicCustomer } from "@/lib/customer-store";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  machineModel: string;
  machineDetails: string;
  lcCopy: string;
  shiftCopy: string;
  deliveryAddress: string;
  paymentDetails: string;
  bankName: string;
  rtgsNo: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  machineModel: "",
  machineDetails: "",
  lcCopy: "",
  shiftCopy: "",
  deliveryAddress: "",
  paymentDetails: "",
  bankName: "",
  rtgsNo: "",
};

export default function AdminCreateCustomer() {
  const [customers, setCustomers] = useState<DynamicCustomer[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newCustomer, setNewCustomer] = useState<DynamicCustomer | null>(null);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"form" | "list">("form");

  async function fetchCustomers() {
    const res = await fetch("/api/admin/create-customer");
    if (res.ok) {
      const data = await res.json();
      setCustomers(data.customers);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNewCustomer(null);
    setCopied(false);

    const res = await fetch("/api/admin/create-customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to create customer");
      return;
    }

    setNewCustomer(data.customer);
    setForm(EMPTY);
    fetchCustomers();
    setTab("list");
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this customer? They will lose access.")) return;
    await fetch("/api/admin/create-customer", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCustomers();
  }

  function copyPasskey(pk: string) {
    navigator.clipboard.writeText(pk);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const pending = customers.filter((c) => c.status === "pending");
  const active = customers.filter((c) => c.status === "active");

  const inputCls =
    "w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-vilike-accent focus:outline-none";
  const labelCls = "block text-xs font-medium text-vilike-muted mb-1";

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Customer Login Management</h2>
          <p className="text-sm text-vilike-muted">
            Create portal access and issue passkeys to customers
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTab("form")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === "form"
                ? "bg-vilike-accent text-white"
                : "border border-white/20 text-vilike-muted hover:text-white"
            }`}
          >
            + Create New
          </button>
          <button
            onClick={() => setTab("list")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === "list"
                ? "bg-vilike-accent text-white"
                : "border border-white/20 text-vilike-muted hover:text-white"
            }`}
          >
            All Customers{" "}
            {customers.length > 0 && (
              <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">
                {customers.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Passkey success banner ── */}
      {newCustomer && (
        <div className="mt-4 rounded-xl border border-green-500/40 bg-green-500/10 p-5">
          <p className="font-semibold text-green-400">
            ✓ Customer login created successfully!
          </p>
          <p className="mt-1 text-sm text-vilike-muted">
            Share this passkey with{" "}
            <span className="text-white">{newCustomer.name}</span> (
            {newCustomer.email})
          </p>
          <div className="mt-3 flex items-center gap-3">
            <code className="rounded-lg bg-black/50 px-4 py-2 text-lg font-bold tracking-widest text-vilike-accent">
              {newCustomer.passkey}
            </code>
            <button
              onClick={() => copyPasskey(newCustomer.passkey)}
              className="rounded-lg border border-vilike-accent/50 px-3 py-2 text-sm text-vilike-accent hover:bg-vilike-accent/10"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="mt-3 text-xs text-vilike-muted">
            ℹ️ To auto-email this passkey, configure{" "}
            <code className="text-white">RESEND_API_KEY</code> in your
            environment and uncomment the email hook in{" "}
            <code className="text-white">
              app/api/admin/create-customer/route.ts
            </code>
          </p>
        </div>
      )}

      {/* ── Pending signup requests ── */}
      {tab === "list" && pending.length > 0 && (
        <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="mb-2 text-sm font-semibold text-amber-400">
            ⚠ Pending Signup Requests ({pending.length})
          </p>
          <p className="mb-3 text-xs text-vilike-muted">
            These customers requested access from the login page. Click "Create Login"
            to fill in their details and issue a passkey.
          </p>
          <div className="space-y-2">
            {pending.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-vilike-muted">
                    {c.email} · {c.phone} · {c.company}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setForm({
                        ...EMPTY,
                        name: c.name,
                        email: c.email,
                        phone: c.phone,
                        company: c.company,
                      });
                      handleDelete(c.id);
                      setTab("form");
                    }}
                    className="rounded-lg bg-vilike-accent px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Create Login
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Create form ── */}
      {tab === "form" && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 rounded-xl border border-white/10 bg-black/30 p-6"
        >
          <p className="mb-5 text-sm font-semibold text-vilike-muted uppercase tracking-wider">
            New Customer Details
          </p>

          {/* Row 1 — identity */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Customer full name"
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="customer@example.com"
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Company / Mill Name</label>
              <input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Spinning Mills Pvt. Ltd."
                className={inputCls}
              />
            </div>
          </div>

          <hr className="my-5 border-white/10" />
          <p className="mb-4 text-sm font-semibold text-vilike-muted uppercase tracking-wider">
            Machine Details
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Machine Model</label>
              <input
                value={form.machineModel}
                onChange={(e) => set("machineModel", e.target.value)}
                placeholder='e.g. VILIKE 30" × 18GG × 60F'
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>LC Copy Reference</label>
              <input
                value={form.lcCopy}
                onChange={(e) => set("lcCopy", e.target.value)}
                placeholder="LC-2026-VLK-001"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Shift Copy Reference</label>
              <input
                value={form.shiftCopy}
                onChange={(e) => set("shiftCopy", e.target.value)}
                placeholder="Shift doc / AWB number"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Delivery Address</label>
              <input
                value={form.deliveryAddress}
                onChange={(e) => set("deliveryAddress", e.target.value)}
                placeholder="Factory address, Tirupur"
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Machine Details / Notes</label>
              <textarea
                value={form.machineDetails}
                onChange={(e) => set("machineDetails", e.target.value)}
                placeholder="Spec notes, gauge, feeders, attachments…"
                rows={2}
                className={inputCls}
              />
            </div>
          </div>

          <hr className="my-5 border-white/10" />
          <p className="mb-4 text-sm font-semibold text-vilike-muted uppercase tracking-wider">
            Payment & Banking
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Bank Name</label>
              <input
                value={form.bankName}
                onChange={(e) => set("bankName", e.target.value)}
                placeholder="HDFC Bank, Tirupur"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>RTGS / Transaction No.</label>
              <input
                value={form.rtgsNo}
                onChange={(e) => set("rtgsNo", e.target.value)}
                placeholder="RTGS2026XXXXXXX"
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Payment Details / Notes</label>
              <textarea
                value={form.paymentDetails}
                onChange={(e) => set("paymentDetails", e.target.value)}
                placeholder="EMI structure, disbursement terms, advance amount…"
                rows={2}
                className={inputCls}
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-vilike-accent px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Creating…" : "Create Customer Login & Generate Passkey"}
            </button>
            <button
              type="button"
              onClick={() => { setForm(EMPTY); setError(""); }}
              className="rounded-lg border border-white/20 px-4 py-2.5 text-sm text-vilike-muted hover:text-white"
            >
              Clear
            </button>
          </div>
        </form>
      )}

      {/* ── Active customers list ── */}
      {tab === "list" && (
        <div className="mt-5">
          {active.length === 0 ? (
            <p className="rounded-xl border border-white/10 p-8 text-center text-sm text-vilike-muted">
              No active customer logins yet. Use "Create New" to add one.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-vilike-accent/20 text-white">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Machine</th>
                    <th className="p-3">Bank</th>
                    <th className="p-3">RTGS No.</th>
                    <th className="p-3">Passkey</th>
                    <th className="p-3">Created</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {active.map((c) => (
                    <tr key={c.id} className="border-t border-white/10">
                      <td className="p-3 font-medium text-white">{c.name}</td>
                      <td className="p-3 text-vilike-muted">{c.email}</td>
                      <td className="p-3 text-vilike-muted">{c.company || "—"}</td>
                      <td className="p-3 text-vilike-muted">{c.machineModel || "—"}</td>
                      <td className="p-3 text-vilike-muted">{c.bankName || "—"}</td>
                      <td className="p-3 text-vilike-muted">{c.rtgsNo || "—"}</td>
                      <td className="p-3">
                        <code className="rounded bg-black/50 px-2 py-0.5 text-xs font-bold text-vilike-accent">
                          {c.passkey}
                        </code>
                      </td>
                      <td className="p-3 text-xs text-vilike-muted">
                        {new Date(c.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
