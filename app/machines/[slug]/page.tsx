import { notFound } from "next/navigation";
import Link from "next/link";
import { getMachineBySlug, getReviewsForMachine, formatINR } from "@/lib/data";
import { formatModelDescription } from "@/lib/catalog-copy";
import MachineExplorer from "@/components/MachineExplorer";
import ReviewCard from "@/components/ReviewCard";
import FinanceCalc from "@/components/FinanceCalc";

export default function MachinePage({ params }: { params: { slug: string } }) {
  const machine = getMachineBySlug(params.slug);
  if (!machine) notFound();

  const reviews = getReviewsForMachine(machine.id);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/#models" className="text-sm text-vilike-accent hover:underline">
        ← All Models
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{machine.model_name}</h1>
      <p className="mt-2 text-vilike-muted">
        {machine.category} · {formatINR(machine.price)} · Delivery ~{machine.delivery_days} days from Xiamen
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-white/85">
        {formatModelDescription({
          dia: machine.specs.dia,
          gauge: machine.specs.gauge,
          feeders: machine.specs.feeders,
          note: machine.specs.note,
          category: machine.category,
          delivery_days: machine.delivery_days,
        })}
      </p>
      {machine.prominent_customer && (
        <p className="mt-2 inline-block rounded-full bg-vilike-gold px-4 py-1 text-sm font-bold text-black">
          ★ Prominent Customer: {machine.prominent_customer}
        </p>
      )}

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Interactive Machine Explorer</h2>
        <MachineExplorer machine={machine} />
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold">Customer Feedback</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {reviews.length > 0 ? (
            reviews.map((r) => <ReviewCard key={r.id} review={r} />)
          ) : (
            <p className="text-vilike-muted">No reviews yet for this model.</p>
          )}
        </div>
      </section>

      <section className="mt-16">
        <FinanceCalc defaultPrice={machine.price} />
      </section>

      <div className="mt-10 flex gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-vilike-accent px-6 py-3 font-semibold text-white"
        >
          Request Quote / Login
        </Link>
        <a
          href="https://wa.me/918190908383"
          className="rounded-lg border border-white/30 px-6 py-3"
        >
          WhatsApp
        </a>
      </div>
    </main>
  );
}
