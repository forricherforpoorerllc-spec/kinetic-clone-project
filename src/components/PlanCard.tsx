import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useOrder } from "./OrderContext";

type Plan = {
  name: string;
  speed: string;
  price: string;
  cents: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  rebate?: string;
  planValue: string;
};

export function PlanCard({ plan }: { plan: Plan }) {
  const { openModal } = useOrder();
  return (
    <div className={`relative flex flex-col rounded-2xl border-2 bg-card p-6 transition-all hover:-translate-y-1 ${plan.highlight ? "border-[var(--k-yellow)] shadow-[var(--shadow-brand)]" : "border-border shadow-[var(--shadow-card)]"}`}>
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-[var(--k-navy)]" style={{ background: "var(--k-yellow)" }}>
          {plan.badge}
        </div>
      )}
      <div className="text-sm font-bold uppercase tracking-wide" style={{ color: "var(--k-blue)" }}>{plan.name}</div>
      <div className="mt-1 font-display text-2xl font-black text-foreground">{plan.speed}</div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-5xl font-black text-foreground">{plan.price}</span>
        <span className="font-display text-xl font-black text-foreground">{plan.cents}</span>
        <span className="text-sm text-muted-foreground">/mo*</span>
      </div>
      {plan.rebate && (
        <div className="mt-2 text-sm font-bold" style={{ color: "var(--k-magenta)" }}>{plan.rebate}</div>
      )}
      <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
      <ul className="mt-4 space-y-2 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--k-green)" }} /> <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button onClick={() => openModal(plan.planValue)} className="mt-6 w-full font-bold h-11 text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
        Order {plan.name}
      </Button>
    </div>
  );
}
