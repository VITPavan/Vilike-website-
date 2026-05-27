import type { OrderDocument } from "@/lib/types";

export default function OrderDocuments({ documents }: { documents: OrderDocument[] }) {
  if (!documents.length) return null;
  return (
    <div className="rounded-xl border border-white/10 p-5">
      <h3 className="font-bold text-vilike-accent">Documents</h3>
      <ul className="mt-3 space-y-2">
        {documents.map((d) => (
          <li key={d.id}>
            <span className="rounded bg-vilike-accent/20 px-3 py-2 text-sm text-white">
              📄 {d.label}
              {d.file_url !== "#" ? (
                <a href={d.file_url} className="ml-2 text-vilike-accent underline" target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              ) : (
                <span className="ml-2 text-vilike-muted">(upload via admin)</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
