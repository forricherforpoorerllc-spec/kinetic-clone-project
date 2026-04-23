import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { PlanCard } from "@/components/PlanCard";
import { HeroSection } from "@/components/HeroSection";
import { Award, ShieldCheck, Wifi, Headphones, MapPin } from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kinetic Fiber Internet | Fast, Friendly Home Internet from $24.99/mo" },
      { name: "description", content: "Get blazing-fast Kinetic Fiber Internet starting at $24.99/mo with AutoPay. No data caps, no annual contracts, free Whole Home Wi-Fi setup, and 99.9% network reliability. Order online to claim up to a $300 prepaid Mastercard®." },
      { name: "keywords", content: "Kinetic fiber internet, fast home internet, fiber optic internet, gigabit internet, no contract internet, no data caps, residential internet provider, internet deals, $300 Mastercard offer" },
      { property: "og:title", content: "Kinetic Fiber Internet | Fast, Friendly Home Internet" },
      { property: "og:description", content: "Blazing-fast fiber internet from $24.99/mo. No data caps, no contracts, free Wi-Fi setup, $300 Mastercard offer." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const homePlans = [
  { name: "fiber 100 Mbps", speed: "100 Mbps download", price: "$24", cents: ".99", description: "Reliable support for essentials like email, browsing, and HD video chat.", features: ["Perfect for individuals and small families", "Download a 2.5-hour 4K movie in 24 minutes", "Free Whole Home Wi-Fi setup"], planValue: "Fiber 100 Mbps — $24.99/mo" },
  { name: "fiber 300 Mbps", speed: "300 Mbps download", price: "$39", cents: ".99", description: "Good for most day-to-day internet uses including streaming video.", features: ["Work, stream and play on multiple devices", "Download a 2.5-hour 4K movie in about 8 minutes", "Free expert installation"], planValue: "Fiber 300 Mbps — $39.99/mo" },
  { name: "fiber 1 gig", speed: "1,000 Mbps download", price: "$49", cents: ".99", description: "Boosted speed and capacity for working from home and gaming.", features: ["Plenty of bandwidth for mid-sized households", "More than 25x upload speeds compared to cable", "Lag-free competitive online gaming"], highlight: true, badge: "Most popular", rebate: "$100 prepaid Mastercard®", planValue: "Fiber 1 Gig — $49.99/mo" },
  { name: "fiber 2 gig", speed: "2,000 Mbps download", price: "$69", cents: ".99", description: "Ultra-fast speeds engineered for large smart homes.", features: ["Ideal for immersive 4K cloud gaming", "Supports dozens of devices simultaneously", "Wi-Fi 7 ready router included"], badge: "Best value", rebate: "$200 prepaid Mastercard® · 2-year price guarantee", planValue: "Fiber 2 Gig — $69.99/mo" },
];

function HomePage() {
  const { openModal } = useOrder();
  return (
    <div>
      <HeroSection
        title={<>fast, friendly<br />fiber internet.</>}
        bullets={[
          "Free Whole Home Wi-Fi Setup – up to $160 value",
          "99.9% network reliability",
          "No annual contracts",
          "No data caps",
        ]}
        badgeLabel="fiber plans start at:"
        badgePrice="$24"
        badgeCents=".99"
        image={heroFamily}
        imageAlt="Family enjoying fast Kinetic fiber internet at home"
        shape="green"
      />

      {/* $300 promo strip */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl px-6 py-5 text-center text-white text-base font-medium md:text-lg" style={{ background: "var(--k-cyan)" }}>
          Get up to a <strong className="font-extrabold" style={{ color: "var(--k-yellow)" }}>$300</strong> prepaid Mastercard® with a qualifying internet plan.
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">fiber speeds that fit your needs.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Get the most advanced high-speed home internet at a great price, no matter what speed you choose.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {homePlans.map((p) => <PlanCard key={p.name} plan={p} />)}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">*Price includes a $5.00/mo discount with AutoPay.</p>
      </section>

      {/* Communities band */}
      <section className="py-20" style={{ background: "var(--k-navy)" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="text-white">
            <h2 className="font-display text-3xl font-black sm:text-4xl">kinetic fiber internet, reaching more communities.</h2>
            <p className="mt-4 text-white/80">
              Kinetic already brings Fiber Internet to over 1.6 million homes across 18 states — and we're not slowing down. Our gig-speed expansion means more households get faster speeds, better reliability, and exclusive local offers designed to deliver more value for less.
            </p>
            <Button onClick={() => openModal()} className="mt-6 h-12 px-7 font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
              Check my address
            </Button>
          </div>
          <div className="rounded-3xl p-8" style={{ background: "var(--k-magenta)" }}>
            <div className="grid grid-cols-2 gap-4 text-white">
              {[
                { n: "1.6M+", l: "homes connected" },
                { n: "18", l: "states served" },
                { n: "99.9%", l: "network reliability" },
                { n: "25x", l: "faster uploads vs cable" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/10 p-5 text-center">
                  <div className="font-display text-3xl font-black" style={{ color: "var(--k-yellow)" }}>{s.n}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Kinetic */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">100% fiber speeds, powered by your community.</h2>
          <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
            We're not just delivering high-speed internet. We're delivering it with local care, backed by people who live and work right here in your community. Service you can count on and people you can trust.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, title: "Award-winning service", desc: "Recognized by CNET, Rolling Stone and BroadbandNow for value and reliability." },
            { icon: Wifi, title: "Free Whole Home Wi-Fi", desc: "Strong wall-to-wall coverage with professional 20-point installation." },
            { icon: ShieldCheck, title: "99.9% reliability", desc: "Resilient 100% fiber network engineered for streaming, gaming and remote work." },
            { icon: Headphones, title: "24/7 real-time support", desc: "Around-the-clock chat and care from a team that lives in the communities we serve." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "color-mix(in oklab, var(--k-green) 18%, transparent)" }}>
                <f.icon className="h-6 w-6" style={{ color: "var(--k-green)" }} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl p-10 sm:p-14 lg:grid-cols-2 lg:items-center" style={{ background: "var(--k-navy)" }}>
          <div className="text-white">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[var(--k-navy)]" style={{ background: "var(--k-yellow)" }}>Talk, browse & save</span>
            <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl">Add home phone for just $25/mo.</h2>
            <p className="mt-3 text-white/80 max-w-lg">
              Bundle Kinetic Fiber Internet with crystal-clear home phone service for unlimited nationwide calling, spam-call alerts and one simple bill — no annual contract required.
            </p>
            <Button onClick={() => openModal("Internet + Voice Bundle — $49.99/mo")} className="mt-6 h-12 px-7 font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
              Order my bundle
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full text-center sm:h-56 sm:w-56" style={{ background: "var(--k-yellow)" }}>
              <div className="text-xs font-extrabold uppercase text-[var(--k-navy)]">internet + phone</div>
              <div className="text-xs font-bold text-[var(--k-navy)]">starting at</div>
              <div className="mt-1 flex items-start font-display text-[var(--k-navy)]">
                <span className="text-3xl font-black">$</span>
                <span className="text-6xl font-black leading-none">49</span>
                <span className="text-xl font-black">.99*</span>
              </div>
              <div className="text-[10px] font-bold text-[var(--k-navy)]">/month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage strip */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6" style={{ color: "var(--k-blue)" }} />
            <div>
              <div className="font-display text-lg font-bold">See if Kinetic Fiber is in your neighborhood</div>
              <div className="text-sm text-muted-foreground">Enter your address to view available speeds and offers in your area.</div>
            </div>
          </div>
          <Button onClick={() => openModal()} className="h-11 px-6 font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
            Check availability
          </Button>
        </div>
      </section>
    </div>
  );
}
