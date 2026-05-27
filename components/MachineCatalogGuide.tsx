import { brandStory, machineSystemOverview, salesServiceCopy } from "@/lib/catalog-copy";

export default function MachineCatalogGuide() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border border-vilike-accent/20 bg-gradient-to-b from-vilike-accent/5 to-transparent p-8 md:p-10">
        <p className="text-sm uppercase tracking-widest text-vilike-accent">{brandStory.headline}</p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/90">{brandStory.intro}</p>

        <h3 className="mt-10 text-2xl font-bold text-white">{machineSystemOverview.title}</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {machineSystemOverview.sections.map((s) => (
            <article key={s.heading} className="rounded-xl border border-white/10 bg-black/40 p-5">
              <h4 className="font-semibold text-vilike-accent">{s.heading}</h4>
              <p className="mt-2 text-sm leading-relaxed text-vilike-muted">{s.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <h3 className="text-xl font-bold text-white">{salesServiceCopy.title}</h3>
          <ul className="mt-4 space-y-2">
            {salesServiceCopy.points.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-vilike-muted">
                <span className="text-vilike-accent">▸</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
