import type { FinancingOption } from "@/lib/types";

export default function FinancingOptions({ options }: { options: FinancingOption[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((o) => (
        <div key={o.id} className="rounded-xl border border-white/10 bg-white/5 p-5 card-glow">
          <h4 className="font-bold text-vilike-accent">{o.title}</h4>
          <p className="mt-2 text-sm text-vilike-muted">{o.description}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded bg-black px-2 py-1 text-white">Down {o.min_down_pct}%+</span>
            <span className="rounded bg-black px-2 py-1 text-white">Up to {o.max_tenure_months} mo</span>
            <span className="rounded bg-black px-2 py-1 text-vilike-accent">{o.interest_range}</span>
          </div>
          <p className="mt-2 text-xs text-vilike-muted">{o.partner_bank}</p>
        </div>
      ))}
    </div>
  );
}
