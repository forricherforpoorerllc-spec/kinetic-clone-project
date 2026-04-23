import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { PlanCard } from "@/components/PlanCard";
import { Zap, Wifi, Download, Upload, Gamepad2 } from "lucide-react";
import fiberHero from "@/assets/fiber-hero.jpg";

export const Route = createFileRoute("/fiber-internet")({
  head: () => ({
    meta: [
      { title: "Fiber Internet Plans | Symmetrical Gigabit Speeds — Kinetic" },
      { name: "description", content: "Kinetic Fiber Internet delivers symmetrical fiber-optic speeds up to 2 Gbps with no data caps and no contracts. Plans from $24.99/mo. Built for streaming, gaming and remote work." },
      { name: "keywords", content: "fiber internet, gigabit fiber, symmetrical fiber, 1 gig internet, 2 gig internet, fiber optic plans, fastest home internet" },
      { property: "og:title", content: "Fiber Internet Plans — Symmetrical Gigabit Speeds | Kinetic" },
      { property: "og:description", content: "Symmetrical fiber-optic internet up to 2 Gbps. No caps, no contracts, free Wi-Fi setup." },
      { property: "og:image", content: "/og-fiber.jpg" },
    ],
  }),
  component: FiberPage,
});

const fiberPlans = [
  { name: "Fiber 100", speed: "100 Mbps", price: "$24", cents: ".99", description: "Symmetrical 100 Mbps fiber for browsing, video calls and HD streaming.", features: ["Symmetrical upload & download", "Free Wi-Fi 6 router", "No data caps"], planValue: "Fiber 100 Mbps — $24.99/mo" },
  { name: "Fiber 300", speed: "300 Mbps", price: "$39", cents: ".99", description: "Ideal for 4K streaming, work-from-home and connected smart homes.", features: ["Symmetrical 300 Mbps", "Stream 4K on 5+ devices", "Free expert installation"], planValue: "Fiber 300 Mbps — $39.99/mo" },
  { name: "Fiber 1 Gig", speed: "1,000 Mbps", price: "$49", cents: ".99", description: "Gigabit fiber speeds for the most demanding households and home offices.", features: ["Symmetrical gigabit speeds", "Lag-free cloud gaming", "Whole-home Wi-Fi mesh"], highlight: true, planValue: "Fiber 1 Gig — $49.99/mo" },
  { name: "Fiber 2 Gig", speed: "2,000 Mbps", price: "$79", cents: ".99", description: "Next-generation multi-gig fiber for power users, creators and large families.", features: ["Symmetrical 2 Gbps", "Wi-Fi 6E mesh included", "Priority 24/7 support"], planValue: "Fiber 2 Gig — $79.99/mo" },
];

function FiberPage() {
  const { openModal } = useOrder();
  return (
    <div>
      <section className="relative overflow-hidden bg-foreground text-white">
        <img src={fiberHero} alt="Glowing fiber-optic cables transmitting data at the speed of light" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-kinetic-green px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground">Pure fiber technology</span>
            <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl lg:text-6xl">Fiber internet built for speed and reliability.</h1>
            <p className="mt-5 text-lg text-white/85">
              Experience symmetrical fiber-optic internet that uploads as fast as it downloads. Kinetic Fiber Internet is engineered for 4K streaming, low-ping gaming, lightning cloud backups and crystal-clear video calls.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openModal()} className="h-12 bg-kinetic-green px-7 text-base font-bold text-foreground hover:bg-kinetic-green/90">Order Fiber Now</Button>
              <a href="tel:1-833-740-5365" className="inline-flex h-12 items-center rounded-md border border-white/30 px-7 text-base font-bold text-white hover:bg-white/10">Talk to a Specialist</a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">Choose your Kinetic Fiber plan</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            From everyday browsing to multi-gig power users, every fiber plan includes symmetrical speeds, unlimited data and free professional install.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fiberPlans.map((p) => <PlanCard key={p.name} plan={p} />)}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-black sm:text-4xl">Why fiber outperforms cable & DSL</h2>
              <p className="mt-3 text-muted-foreground">
                Fiber-optic internet uses pulses of light through hair-thin glass strands to deliver the fastest, most consistent broadband technology available. Unlike copper-based cable or DSL, fiber doesn’t slow down during peak hours and isn’t affected by weather or distance from a node.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: Upload, title: "Symmetrical upload speeds", desc: "Upload videos, host meetings and back up to the cloud as fast as you download." },
                  { icon: Download, title: "Lower latency", desc: "Sub-10ms response times keep video calls and online games perfectly smooth." },
                  { icon: Gamepad2, title: "Built for streaming & gaming", desc: "Zero lag on Twitch, Xbox, PlayStation and 4K Netflix — even on every screen at once." },
                ].map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-kinetic-blue/10"><f.icon className="h-5 w-5 text-kinetic-blue" /></div>
                    <div>
                      <div className="font-display font-bold">{f.title}</div>
                      <div className="text-sm text-muted-foreground">{f.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl p-10 text-white" style={{ background: "var(--gradient-hero)" }}>
              <Zap className="h-10 w-10 text-kinetic-green" />
              <div className="mt-4 font-display text-5xl font-black">Up to 2 Gbps</div>
              <p className="mt-2 text-white/90">Multi-gig fiber speeds available in select markets — perfect for creators, gamers and remote teams uploading huge files daily.</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-4"><Wifi className="h-5 w-5 text-kinetic-green" /><div className="mt-2 font-display text-2xl font-black">Wi-Fi 6E</div><div className="text-xs text-white/80">Included router</div></div>
                <div className="rounded-xl bg-white/10 p-4"><div className="font-display text-2xl font-black">99.9%</div><div className="text-xs text-white/80">Network uptime</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
