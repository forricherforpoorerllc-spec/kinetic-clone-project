import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { PlanCard } from "@/components/PlanCard";
import { HeroSection } from "@/components/HeroSection";
import { FaqSection } from "@/components/FaqSection";
import { useGeo, locationLabel } from "@/hooks/useGeo";
import { Upload, Download, Gamepad2, Wifi, Zap, ShieldCheck, Cpu, Clock } from "lucide-react";
import fiberHero from "@/assets/fiber-hero.jpg";

export const Route = createFileRoute("/fiber-internet")({
  head: () => ({
    meta: [
      { title: "Kinetic Fiber Internet Plans | 100 Mbps to 2 Gig Starting at $24.99/mo" },
      { name: "description", content: "Compare 100% fiber internet plans from $24.99/mo — symmetrical upload and download, unlimited data, no contracts, free whole-home Wi-Fi install, and up to $300 prepaid Mastercard®. Real fiber. Real fast. Order now." },
      { name: "keywords", content: "fiber internet plans, gigabit fiber, 1 gig fiber internet, 2 gig fiber, symmetrical upload speed, 100 percent fiber, fiber optic internet provider, no contract fiber, fiber internet near me" },
      { property: "og:title", content: "Fiber Internet Plans from $24.99/mo | Kinetic" },
      { property: "og:description", content: "Symmetrical fiber-optic internet up to 2 Gig. No caps. No contracts. Free Whole Home Wi-Fi setup." },
      { property: "og:url", content: "https://kineticfiber.example.com/fiber-internet" },
    ],
    links: [{ rel: "canonical", href: "https://kineticfiber.example.com/fiber-internet" }],
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

const fiberFaq = [
  { q: "What makes Kinetic Fiber different from cable internet?", a: "Kinetic Fiber uses 100% fiber-optic glass lines from our local node directly to your home. Unlike cable coax that is shared with your neighbors, fiber delivers symmetrical upload and download speeds that don't slow down when everyone on your street gets home at 6pm." },
  { q: "Are Kinetic Fiber upload speeds really the same as download?", a: "Yes. Every fiber plan — from 100 Mbps to 2 Gig — includes symmetrical speeds. A Kinetic 1 Gig plan uploads up to 1,000 Mbps, which is more than 25x faster than typical cable upload speeds." },
  { q: "Do I need to buy a router?", a: "No. Kinetic Fiber includes a Wi-Fi 6E or Wi-Fi 7 gateway at no extra cost with every install. Our technician tunes placement during the 20-point Whole Home Wi-Fi walkthrough." },
  { q: "What speed do I actually need?", a: "For 1–2 devices with basic browsing and HD streaming, 100 Mbps is plenty. For 4K streaming on multiple TVs, 300 Mbps is a sweet spot. Gamers and remote workers lean toward 1 Gig; smart homes with 20+ connected devices benefit from 2 Gig." },
  { q: "Is Kinetic Fiber available at my address?", a: "We're rapidly expanding across 18 states and have passed more than 1.6 million homes. Enter your address when you order and we'll confirm serviceability, or call 1-833-740-5365 to talk to a local specialist." },
  { q: "How long is the price locked in?", a: "Most Kinetic Fiber plans include price-guarantee periods — 2 years on Fiber 2 Gig and 3 years on Fiber Max 2 Gig. No bait-and-switch promo pricing that balloons after 12 months." },
];

function FiberPage() {
  const { openModal } = useOrder();
  const geo = useGeo();
  const cityLabel = locationLabel(geo, "your area");
  return (
    <div>
      <HeroSection
        eyebrow="100% fiber"
        title={<>100% fiber internet<br />gig speeds from $24.99/mo.</>}
        bullets={[
          "Free Whole Home Wi-Fi Setup – up to $160 value",
          "Symmetrical upload and download",
          "No annual contracts",
          "No data caps",
        ]}
        badgeLabel="fiber plans start at:"
        badgePrice="$24"
        badgeCents=".99"
        image={fiberHero}
        imageAlt="Friends enjoying online gaming on Kinetic Fiber Internet"
        shape="magenta"
        ctaLabel="See fiber plans & order"
      />

      {/* $300 promo strip */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl px-6 py-5 text-center text-white text-base font-medium md:text-lg" style={{ background: "var(--k-cyan)" }}>
          Get up to a <strong className="font-extrabold" style={{ color: "var(--k-yellow)" }}>$300</strong> prepaid Mastercard® with a qualifying fiber plan.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">Kinetic Fiber Internet plans {geo.city ? `in ${geo.city}` : ""}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Five symmetrical fiber speeds — every one includes unlimited data, Whole Home Wi-Fi and month-to-month flexibility. Pick the plan that fits your household and lock in today's price.
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
                  { icon: Clock, title: "No peak-hour slowdowns", desc: "Dedicated fiber lines to your home means your speed is your speed — morning, evening and during the big game." },
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
                Start my fiber order
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How fiber works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">how Kinetic Fiber gets to your home.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Our install team runs fiber directly to your house, no shared infrastructure. Here's what the day-of-install looks like.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { step: "01", icon: Cpu, title: "Fiber to your home", desc: "A Kinetic technician runs a dedicated fiber-optic line from the local access point to an optical network terminal at your house." },
            { step: "02", icon: Wifi, title: "Wi-Fi walkthrough", desc: "We place a Wi-Fi 6E/7 gateway in the optimal spot, test every room and add mesh extenders if needed — up to $160 value, free." },
            { step: "03", icon: Zap, title: "Speed verified & go", desc: "We run a symmetrical speed test on your new Kinetic Fiber line so you can see exactly what you're paying for before we leave." },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="font-display text-3xl font-black" style={{ color: "var(--k-blue)" }}>{s.step}</div>
                <s.icon className="h-6 w-6" style={{ color: "var(--k-green)" }} />
              </div>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button onClick={() => openModal()} className="h-12 px-8 font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
            Book my fiber install{geo.city ? ` in ${geo.city}` : ""}
          </Button>
        </div>
      </section>

      <FaqSection
        heading="Fiber internet — frequently asked questions"
        subhead={`Answers to the most common questions about Kinetic Fiber in ${cityLabel}.`}
        items={fiberFaq}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kineticfiber.example.com/" },
            { "@type": "ListItem", position: 2, name: "Fiber Internet Plans", item: "https://kineticfiber.example.com/fiber-internet" },
          ],
        }) }}
      />
    </div>
  );
}
