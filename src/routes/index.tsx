import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { PlanCard } from "@/components/PlanCard";
import { Wifi, ShieldCheck, Infinity as InfinityIcon, Zap, Award, HeartHandshake } from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kinetic Fiber Internet | Fast, Reliable Home Internet from $24.99/mo" },
      { name: "description", content: "Get blazing-fast Kinetic Fiber Internet starting at $24.99/mo. No data caps, no annual contracts, free Wi-Fi setup, and 99.9% network reliability. Order online today." },
      { name: "keywords", content: "fiber internet, high-speed internet, home internet, gigabit internet, fiber optic internet, internet service provider, ISP, no contract internet, unlimited data internet" },
      { property: "og:title", content: "Kinetic Fiber Internet | Fast, Reliable Home Internet" },
      { property: "og:description", content: "Blazing-fast fiber internet from $24.99/mo. No data caps, no contracts, 99.9% reliability." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const homePlans = [
  { name: "Fiber 100", speed: "100 Mbps", price: "$24", cents: ".99", description: "Reliable speed for browsing, email and HD video chat for individuals and couples.", features: ["Free Whole Home Wi-Fi setup", "No data caps", "Stream HD on 3+ devices"], planValue: "Fiber 100 Mbps — $24.99/mo" },
  { name: "Fiber 300", speed: "300 Mbps", price: "$39", cents: ".99", description: "Perfect for busy households streaming 4K, gaming and working from home simultaneously.", features: ["Free Whole Home Wi-Fi setup", "Symmetrical upload speeds", "4K streaming on multiple TVs"], highlight: true, planValue: "Fiber 300 Mbps — $39.99/mo" },
  { name: "Fiber 1 Gig", speed: "1,000 Mbps", price: "$49", cents: ".99", description: "Ultra-fast gigabit fiber for power users, smart homes and seamless cloud workflows.", features: ["Free premium Wi-Fi 6 router", "Lag-free competitive gaming", "Download 4K movies in minutes"], planValue: "Fiber 1 Gig — $49.99/mo" },
];

function HomePage() {
  const { openModal } = useOrder();
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="text-white">
            <span className="inline-block rounded-full bg-kinetic-green px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground">Limited time offer</span>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Fast, friendly fiber internet for every home.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/90">
              Stream, game and work without slowdowns on Kinetic Fiber Internet — symmetrical gigabit speeds, no data caps and no annual contracts. Plans start at just $24.99/mo with AutoPay.
            </p>
            <ul className="mt-6 space-y-2 text-white/95">
              <li className="flex items-center gap-2"><InfinityIcon className="h-5 w-5 text-kinetic-green" /> Unlimited data — stream all you want</li>
              <li className="flex items-center gap-2"><Wifi className="h-5 w-5 text-kinetic-green" /> Free Whole Home Wi-Fi setup (up to $160 value)</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-kinetic-green" /> 99.9% reliable fiber-optic network</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openModal()} className="h-12 bg-kinetic-green px-7 text-base font-bold text-foreground hover:bg-kinetic-green/90">
                Order Online — Save $300
              </Button>
              <a href="tel:1-833-740-5365" className="inline-flex h-12 items-center rounded-md border border-white/30 px-7 text-base font-bold text-white hover:bg-white/10">
                Call 1-833-740-5365
              </a>
            </div>
            <p className="mt-4 text-xs text-white/70">*With AutoPay. Promotional pricing for new residential customers.</p>
          </div>
          <div className="relative">
            <img src={heroFamily} alt="Family streaming entertainment together over Kinetic fiber internet" width={1536} height={1024} className="rounded-2xl shadow-2xl" />
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-kinetic-green/20 p-2"><Award className="h-6 w-6 text-kinetic-green" /></div>
                <div>
                  <div className="font-display text-sm font-bold">$300 Mastercard®</div>
                  <div className="text-xs text-muted-foreground">With qualifying plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">Fiber speeds that fit your needs</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Choose the perfect Kinetic Fiber Internet plan for your household. Every plan includes free expert installation, unlimited data and zero hidden fees.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {homePlans.map((p) => <PlanCard key={p.name} plan={p} />)}
        </div>
      </section>

      {/* WHY KINETIC */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">Why customers choose Kinetic</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              From symmetrical fiber speeds to award-winning customer support, Kinetic delivers the modern internet experience your family deserves.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: "Pure Fiber Speed", desc: "True fiber-optic technology — symmetrical upload and download for flawless video calls and cloud uploads." },
              { icon: ShieldCheck, title: "99.9% Reliability", desc: "Our fiber backbone is built for resilience, so you stay connected when it matters most." },
              { icon: InfinityIcon, title: "No Data Caps", desc: "Stream, game, and download as much as you want — no overage fees, ever." },
              { icon: HeartHandshake, title: "No Contracts", desc: "Month-to-month service with no early termination fees. Stay because you love it." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-kinetic-blue/10">
                  <f.icon className="h-6 w-6 text-kinetic-blue" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 text-center text-white sm:p-16" style={{ background: "var(--gradient-hero)" }}>
          <h2 className="font-display text-3xl font-black sm:text-4xl">Ready to upgrade your internet?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Join thousands of households enjoying lightning-fast Kinetic Fiber Internet. Order in under 2 minutes — install in days, not weeks.
          </p>
          <Button onClick={() => openModal()} className="mt-8 h-12 bg-kinetic-green px-8 text-base font-bold text-foreground hover:bg-kinetic-green/90">
            Start My Order
          </Button>
        </div>
      </section>
    </div>
  );
}
