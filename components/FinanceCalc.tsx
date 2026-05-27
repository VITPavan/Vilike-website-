"use client";

import { useState } from "react";
import { formatINR } from "@/lib/data";
import type { FinancingOption } from "@/lib/types";

export default function FinanceCalc({ defaultPrice = 2850000 }: { defaultPrice?: number }) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(25);
  const [months, setMonths] = useState(60);
  const [turnover, setTurnover] = useState(50000000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [recommended, setRecommended] = useState<FinancingOption | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const down = (price * downPct) / 100;
  const principal = price - down;
  const rate = 0.11 / 12;
  const emi =
    principal > 0
      ? (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
      : 0;
  const eligible = turnover >= price * 2 && existingEmi < turnover * 0.15;

  async function checkEligibility() {
    setSubmitting(true);
    const res = await fetch("/api/eligibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        machine_price: price,
        annual_turnover: turnover,
        down_payment_pct: downPct,
        tenure_months: months,
      }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.recommended_option) setRecommended(data.recommended_option);
  }

  return (
    <div className="rounded-xl border border-vilike-accent/30 bg-vilike-accent/5 p-6">
      <h3 className="text-lg font-bold text-white">Finance Eligibility Calculator</h3>
      <p className="mt-1 text-xs text-vilike-muted">
        Estimate only — final approval and CIBIL confirmed by bank offline (not in-app bank login)
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-vilike-muted">Machine price (₹)</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white"
          />
        </label>
        <label className="text-sm">
          <span className="text-vilike-muted">Down payment %</span>
          <input
            type="range"
            min={15}
            max={40}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <span className="text-white">{downPct}% = {formatINR(down)}</span>
        </label>
        <label className="text-sm">
          <span className="text-vilike-muted">Tenure (months)</span>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white"
          >
            {[36, 48, 60, 72, 84].map((m) => (
              <option key={m} value={m}>
                {m} months
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-vilike-muted">Annual turnover (₹)</span>
          <input
            type="number"
            value={turnover}
            onChange={(e) => setTurnover(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white"
          />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="text-vilike-muted">Existing monthly EMI obligations (₹)</span>
          <input
            type="number"
            value={existingEmi}
            onChange={(e) => setExistingEmi(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white"
          />
        </label>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-black/60 p-3">
          <p className="text-xs text-vilike-muted">Est. EMI</p>
          <p className="text-xl font-bold text-vilike-accent">{formatINR(Math.round(emi))}/mo</p>
        </div>
        <div className="rounded-lg bg-black/60 p-3">
          <p className="text-xs text-vilike-muted">Loan amount</p>
          <p className="text-xl font-bold text-white">{formatINR(Math.round(principal))}</p>
        </div>
        <div className="rounded-lg bg-black/60 p-3">
          <p className="text-xs text-vilike-muted">Eligibility</p>
          <p className={`text-xl font-bold ${eligible ? "text-green-400" : "text-amber-400"}`}>
            {eligible ? "Likely Eligible" : "Review Required"}
          </p>
        </div>
      </div>

      {recommended && (
        <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
          <p className="text-sm font-medium text-green-400">Recommended: {recommended.title}</p>
          <p className="text-xs text-vilike-muted">{recommended.description}</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={checkEligibility}
          disabled={submitting}
          className="rounded-lg bg-vilike-accent px-6 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? "Checking…" : "Save & Get Recommendation"}
        </button>
        <a
          href="https://wa.me/918190908383?text=Hi%20VILIKE%20FAB%20TECH%2C%20I%20want%20finance%20eligibility%20check"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-vilike-accent px-6 py-2 text-sm text-vilike-accent"
        >
          Apply via WhatsApp →
        </a>
      </div>
    </div>
  );
}
