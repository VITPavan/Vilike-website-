import type { Review } from "@/lib/types";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-2 flex gap-1 text-vilike-gold">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="text-sm italic text-white/90">&ldquo;{review.review_text}&rdquo;</p>
      <p className="mt-3 font-semibold text-vilike-accent">{review.company_name}</p>
      <p className="text-xs text-vilike-muted">{review.customer_name}</p>
    </div>
  );
}
