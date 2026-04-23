import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

type Props = {
  heading: string;
  subhead?: string;
  items: FaqItem[];
  /** When true, also emits FAQPage JSON-LD for Google rich results. */
  emitJsonLd?: boolean;
};

/**
 * Accessible FAQ accordion with optional JSON-LD schema for Google rich results.
 * Renders semantic <details>/<summary> for progressive enhancement and SEO.
 */
export function FaqSection({ heading, subhead, items, emitJsonLd = true }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">{heading}</h2>
        {subhead && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subhead}</p>}
      </div>
      <div className="mt-10 space-y-3">
        {items.map((it, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={it.q}
              className={`rounded-2xl border bg-card transition-shadow ${isOpen ? "border-[var(--k-blue)] shadow-[var(--shadow-card)]" : "border-border"}`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-base font-bold text-foreground sm:text-lg">{it.q}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-[var(--k-blue)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {it.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {emitJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}
    </section>
  );
}
