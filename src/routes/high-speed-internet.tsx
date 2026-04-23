import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { PlanCard } from "@/components/PlanCard";
import { ShieldCheck, Infinity as InfinityIcon, BadgeCheck, Truck } from "lucide-react";
import internetHero from "@/assets/internet-hero.jpg";

export const Route = createFileRoute("/high-speed-internet")({
  head: () => ({
    meta: [
      { title: "High-Speed Home Internet from $44.99/mo | Kinetic Internet" },
      { name: "description", content: "Reliable high-speed Kinetic Internet for browsing, streaming and remote work. Free expert installation, no data caps, no annual contracts. Order online today." },
      { name: "keywords", content: "high-speed internet, home internet, broadband internet, internet plans, no contract internet, residential internet service" },
      { property: "og:title", content: "High-Speed Home Internet from $44.99/mo | Kinetic" },
      { property: "og:description", content: "Reliable high-speed home internet with free install, no caps, no contracts." },
    ],
  }),
  component: InternetPage,
});

const internetPlans = [
  { name: "Internet 50", speed: "50 Mbps", price: "$44", cents: ".99", description: "Solid speeds for browsing, email and HD video on a few devices.", features: ["Free expert installation", "No data caps", "Reliable nationwide coverage"], planValue: "Internet 50 — $44.99/mo" },
  { name: "Internet 100", speed: "100 Mbps", price: "$54", cents: ".99", description: "Stream HD video, work from home and connect smart-home devices comfortably.", features: ["Free Wi-Fi router", "No annual contract", "24/7 customer care"], highlight: true, planValue: "Internet 100 — $54.99/mo" },
  { name: "Internet 200", speed: "200 Mbps", price: "$64", cents: ".99", description: "Powerful broadband for busy households doing it all at the same time.", features: ["4K streaming on multiple TVs", "Online gaming ready", "Whole-home Wi-Fi available"], planValue: "Internet 200 — $64.99/mo" },
];

function InternetPage() {
  const { openModal } = useOrder();
  return (
    <div>
      <section className="relative overflow-hidden bg-kinetic-light-blue/30">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <span className="inline-block rounded-full bg-kinetic-blue px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">High-speed internet</span>
            <h1 className="mt-4 font-display text-4xl font-black text-foreground sm:text-5xl lg:text-6xl">Internet, better with Kinetic.</h1>
            <p className="mt-5 max-w-lg text-lg text-foreground/80">
              Kinetic high-speed internet brings consistent, reliable broadband to homes everywhere we serve. Stream, video chat, work and learn online with no data caps, no annual contract and no surprises on your bill.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openModal()} className="h-12 bg-kinetic-blue px-7 text-base font-bold text-white hover:bg-kinetic-blue/90">Get Kinetic Internet</Button>
              <a href="tel:1-833-740-5365" className="inline-flex h-12 items-center rounded-md border-2 border-kinetic-blue px-7 text-base font-bold text-kinetic-blue hover:bg-kinetic-blue/5">Call 1-833-740-5365</a>
            </div>
          </div>
          <img src={internetHero} alt="Woman streaming video on laptop with reliable Kinetic high-speed internet" width={1536} height={1024} className="rounded-2xl shadow-[var(--shadow-card)]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">Fast internet. Worry-free service.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Every Kinetic Internet plan comes loaded with the essentials your household needs.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "99.9% reliability", desc: "Connectivity you can count on with our resilient broadband network." },
            { icon: InfinityIcon, title: "Unlimited data", desc: "Surf and stream without limits, throttling or overage fees." },
            { icon: BadgeCheck, title: "No annual contracts", desc: "Modify or cancel any time without penalties or fine print." },
            { icon: Truck, title: "Free installation", desc: "A trained Kinetic technician sets you up at no extra cost." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-kinetic-green/15"><f.icon className="h-6 w-6 text-kinetic-green" /></div>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black sm:text-4xl">Pick your Kinetic Internet plan</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Affordable broadband speeds for every household — order online and save.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {internetPlans.map((p) => <PlanCard key={p.name} plan={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
