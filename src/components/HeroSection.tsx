import { ReactNode } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrder } from "./OrderContext";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  bullets: string[];
  badgeLabel: string;     // e.g. "fiber plans start at:"
  badgePrice: string;     // e.g. "$24"
  badgeCents: string;     // e.g. ".99"
  badgeSuffix?: string;   // e.g. "/month"
  image: string;
  imageAlt: string;
  shape?: "green" | "magenta";
  ctaPlan?: string;
  ctaLabel?: string;
  disclaimer?: string;
};

export function HeroSection({
  eyebrow,
  title,
  bullets,
  badgeLabel,
  badgePrice,
  badgeCents,
  badgeSuffix = "/month",
  image,
  imageAlt,
  shape = "green",
  ctaPlan,
  ctaLabel = "Check availability",
  disclaimer = "*with AutoPay.",
}: Props) {
  const { openModal } = useOrder();
  const shapeColor = shape === "green" ? "var(--k-green)" : "var(--k-magenta)";

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--k-navy)" }}>
      {/* Diagonal color shape on right */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden lg:block"
        style={{
          width: "55%",
          background: shapeColor,
          clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="text-white">
          {eyebrow && (
            <span className="inline-block rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[var(--k-navy)]" style={{ background: "var(--k-yellow)" }}>
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mt-6 text-sm font-bold uppercase tracking-wider text-white/80">plans include:</div>
          <ul className="mt-3 space-y-2 text-white">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-base">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: "var(--k-yellow)" }} strokeWidth={3} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/60">{disclaimer}</p>

          <div className="mt-6 max-w-md rounded-2xl p-3" style={{ background: "var(--k-yellow)" }}>
            <div className="font-bold text-[var(--k-navy)] mb-2 px-1">Hurry, see if you qualify for special offers today!</div>
            <Button
              onClick={() => openModal(ctaPlan)}
              className="w-full h-12 text-base font-extrabold text-white hover:opacity-90"
              style={{ background: "var(--k-green)" }}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* Yellow price badge circle */}
          <div className="absolute -top-4 -left-4 z-20 flex h-36 w-36 flex-col items-center justify-center rounded-full text-center shadow-xl sm:h-44 sm:w-44" style={{ background: "var(--k-yellow)" }}>
            <div className="px-2 text-[11px] font-extrabold leading-tight text-[var(--k-navy)] sm:text-xs">{badgeLabel}</div>
            <div className="mt-0.5 flex items-start font-display text-[var(--k-navy)]">
              <span className="text-3xl font-black sm:text-4xl">$</span>
              <span className="text-5xl font-black leading-none sm:text-6xl">{badgePrice.replace("$", "")}</span>
              <span className="text-lg font-black sm:text-xl">{badgeCents}*</span>
            </div>
            <div className="text-[10px] font-bold text-[var(--k-navy)]">{badgeSuffix}</div>
          </div>

          <img
            src={image}
            alt={imageAlt}
            width={1536}
            height={1024}
            className="relative z-10 rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
