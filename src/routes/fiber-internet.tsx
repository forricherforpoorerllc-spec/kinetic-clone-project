import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { PlanCard } from "@/components/PlanCard";
import { HeroSection } from "@/components/HeroSection";
import { Upload, Download, Gamepad2, Wifi, Zap, ShieldCheck } from "lucide-react";
import fiberHero from "@/assets/fiber-hero.jpg";

export const Route = createFileRoute("/fiber-internet")({
  head: () => ({
    meta: [
      { title: "Fiber Internet Built for Speed & Reliability | Kinetic — from $24.99/mo" },
      { name: "description", content: "Kinetic Fiber Internet delivers symmetrical 100% fiber-optic speeds up to 2 Gig with no data caps and no annual contracts. Plans from $24.99/mo with AutoPay. Free Whole Home Wi-Fi setup included." },
      { name: "keywords", content: "fiber internet plans, gigabit fiber, 1 gig fiber internet, 2 gig fiber, symmetrical upload speed, 100 percent fiber, fiber optic internet provider, no contract fiber" },
      { property: "og:title", content: "Fiber Internet Built for Speed & Reliability | Kinetic" },
      { property: "og:description", content: "Symmetrical fiber-optic internet up to 2 Gig. No caps. No contracts. Free Whole Home Wi-Fi setup." },
    ],
  }),
  component: FiberPage,
});

const fiberPlans = [
  { name: "fiber 100 Mbps", speed: "100 Mbps", price: "$24", cents: ".99", description: "Reliable support for essentials like email, browsing, and video chat.", features: ["Perfect for individuals and small families", "Download a 2.5-hour 4K movie in 24 minutes", "Free Whole Home Wi-Fi setup"], planValue: "Fiber 100 Mbps — $24.99/mo" },
  { name: "fiber 300 Mbps", speed: "300 Mbps", price: "$39", cents: ".99", description: "Good for most day-to-day internet uses including streaming video.", features: ["Work, stream and play on multiple devices", "Download a 2.5-hour 4K movie in about 8 minutes", "Free expert installation"], planValue: "Fiber 300 Mbps — $39.99/mo" },
  { name: "fiber 1 gig", speed: "1,000 Mbps", price: "$49", cents: ".99", description: "Boosted speed and capacity for working from home and gaming.", features: ["More than 25x upload speeds vs cable", "Plenty of bandwidth for mid-sized households", "Lag-free online gaming"], highlight: true, badge: "Most popular", rebate: "$100 prepaid Mastercard®", planValue: "Fiber 1 Gig — $49.99/mo" },
  { name: "fiber 2 gig", speed: "2,000 Mbps", price: "$69", cents: ".99", description: "Ultra-fast speeds for large smart homes and creators.", features: ["Ideal for immersive cloud gaming", "Supports dozens of simultaneous devices", "Wi-Fi 7 router technology"], badge: "Best value", rebate: "$200 prepaid Mastercard® · 2-year price guarantee", planValue: "Fiber 2 Gig — $69.99/mo" },
  { name: "fiber max 2 gig", speed: "2,000 Mbps + Secure", price: "$89", cents: ".99", description: "Worry-free internet for the whole home, bundled with security.", features: ["Includes eero Pro 7 Wi-Fi gateway", "Kinetic Secure Plus + extenders as needed", "24/7 always-on Premium Tech Support"], rebate: "$300 prepaid Mastercard® · 3-year price guarantee", planValue: "Fiber Max 2 Gig — $89.99/mo" },
];

function FiberPage() {
  const { openModal } = useOrder();
  return (
    <div>
      <HeroSection
        eyebrow="100% fiber"
        title={<>fiber internet built for<br />speed and reliability.</>}
        bullets={[
          "Free Whole Home Wi-Fi Setup – up to $160 value",
          "No annual contracts",
          "No data caps",
        ]}
        badgeLabel="fiber plans start at:"
        badgePrice="$24"
        badgeCents=".99"
        image={fiberHero}
        imageAlt="Friends enjoying online gaming on Kinetic Fiber Internet"
        shape="magenta"
      />

      {/* $300 promo strip */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl px-6 py-5 text-center text-white text-base font-medium md:text-lg" style={{ background: "var(--k-cyan)" }}>
          Get up to a <strong className="font-extrabold" style={{ color: "var(--k-yellow)" }}>$300</strong> prepaid Mastercard® with a qualifying fiber plan.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">kinetic fiber internet.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Experience unmatched speed and reliability with 100% fiber technology — symmetrical upload and download for flawless work, play and everything in between.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {fiberPlans.map((p) => <PlanCard key={p.name} plan={p} />)}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">*Price includes a $5.00/mo discount with AutoPay.</p>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-black sm:text-4xl">why fiber outperforms cable & DSL.</h2>
              <p className="mt-3 text-muted-foreground">
                Kinetic's 100% fiber network uses pulses of light through hair-thin glass strands to deliver the fastest, most consistent broadband technology available. Unlike copper-based cable or DSL, fiber doesn't slow down during peak hours and isn't affected by weather or distance from a node.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  { icon: Upload, title: "Symmetrical upload speeds", desc: "Upload videos, host meetings and back up to the cloud as fast as you download — more than 25x faster than cable." },
                  { icon: Download, title: "Lower latency", desc: "Sub-10ms response times keep video calls and online games buttery smooth." },
                  { icon: Gamepad2, title: "Built for streaming & gaming", desc: "Zero lag on Twitch, Xbox, PlayStation and 4K Netflix — even on every screen at once." },
                ].map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: "color-mix(in oklab, var(--k-blue) 12%, transparent)" }}>
                      <f.icon className="h-5 w-5" style={{ color: "var(--k-blue)" }} />
                    </div>
                    <div>
                      <div className="font-display font-bold">{f.title}</div>
                      <div className="text-sm text-muted-foreground">{f.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl p-10 text-white" style={{ background: "var(--k-navy)" }}>
              <Zap className="h-10 w-10" style={{ color: "var(--k-yellow)" }} />
              <div className="mt-4 font-display text-5xl font-black">Up to 2 Gig</div>
              <p className="mt-2 text-white/80">Multi-gig fiber speeds available in select markets — perfect for creators, gamers and remote teams uploading huge files daily.</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <Wifi className="h-5 w-5" style={{ color: "var(--k-yellow)" }} />
                  <div className="mt-2 font-display text-2xl font-black">Wi-Fi 7</div>
                  <div className="text-xs text-white/80">Eero Pro included</div>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <ShieldCheck className="h-5 w-5" style={{ color: "var(--k-yellow)" }} />
                  <div className="mt-2 font-display text-2xl font-black">99.9%</div>
                  <div className="text-xs text-white/80">Network uptime</div>
                </div>
              </div>
              <Button onClick={() => openModal()} className="mt-6 h-12 w-full font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
                See plans in my area
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
