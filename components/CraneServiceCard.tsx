import type { Service } from "@/lib/types";

export default function CraneServiceCard({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {services.map((s) => (
        <div key={s.id} className="rounded-xl border border-vilike-gold/30 bg-vilike-gold/5 p-5">
          <p className="text-xs uppercase tracking-wider text-vilike-gold">{s.type}</p>
          <h4 className="mt-1 font-bold text-white">{s.title}</h4>
          <p className="mt-2 text-sm text-vilike-muted">{s.description}</p>
          <a href={`tel:+91${s.contact_phone}`} className="mt-3 inline-block text-sm text-vilike-accent">
            📞 {s.contact_phone}
          </a>
        </div>
      ))}
    </div>
  );
}
