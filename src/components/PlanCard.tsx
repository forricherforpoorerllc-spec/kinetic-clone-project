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
  planValue: string;
};

export function PlanCard({ plan }: { plan: Plan }) {
  const { openModal } = useOrder();
  return (
    <div className={`relative flex flex-col rounded-2xl border-2 bg-card p-6 transition-all hover:-translate-y-1 ${plan.highlight ? "border-kinetic-green shadow-[var(--shadow-brand)]" : "border-border shadow-[var(--shadow-card)]"}`}>
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-kinetic-green px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground">
          Most Popular
        </div>
      )}
      <h3 className="font-display text-lg font-bold text-kinetic-blue">{plan.name}</h3>
      <div className="mt-1 font-display text-3xl font-black text-foreground">{plan.speed}</div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-5xl font-black text-foreground">{plan.price}</span>
        <span className="font-display text-xl font-bold text-foreground">{plan.cents}</span>
        <span className="text-sm text-muted-foreground">/mo*</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
      <ul className="mt-4 space-y-2 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-kinetic-green" /> <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button onClick={() => openModal(plan.planValue)} className="mt-6 w-full bg-kinetic-blue text-white hover:bg-kinetic-blue/90 font-semibold h-11">
        Order {plan.name}
      </Button>
    </div>
  );
}
