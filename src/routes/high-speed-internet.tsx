import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { HeroSection } from "@/components/HeroSection";
import { ShieldCheck, Infinity as InfinityIcon, BadgeCheck } from "lucide-react";
import internetHero from "@/assets/internet-hero.jpg";

export const Route = createFileRoute("/high-speed-internet")({
  head: () => ({
    meta: [
      { title: "High-Speed Home Internet from $44.99/mo | Kinetic Internet" },
      { name: "description", content: "Internet better with Kinetic Internet. Plans from $44.99/mo with AutoPay include free expert installation, no annual contracts and no data caps. 99.9% reliability you can count on." },
      { name: "keywords", content: "high-speed internet, Kinetic internet plans, home internet service, no contract internet, no data caps internet, residential broadband, reliable home internet" },
      { property: "og:title", content: "High-Speed Home Internet from $44.99/mo | Kinetic" },
      { property: "og:description", content: "Reliable high-speed home internet with free expert install, no caps, no contracts, 99.9% reliability." },
    ],
  }),
  component: InternetPage,
});

function InternetPage() {
  const { openModal } = useOrder();
  return (
    <div>
      <HeroSection
        eyebrow="Reliable home internet"
        title={<>internet better with<br />kinetic internet.</>}
        bullets={[
          "Free expert installation",
          "No annual contracts",
          "No data caps",
        ]}
        badgeLabel="plans start at:"
        badgePrice="$44"
        badgeCents=".99"
        image={internetHero}
        imageAlt="Father and daughter working online with Kinetic high-speed internet"
        shape="magenta"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">fast internet. worry-free service plans.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Every Kinetic Internet plan comes loaded with the essentials your household needs to browse, stream and connect with confidence.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "99.9% reliability", desc: "Enjoy connectivity you can count on with our resilient broadband network." , color: "var(--k-green)"},
            { icon: InfinityIcon, title: "Unlimited data", desc: "Surf and stream without limits, throttling or overage fees — ever.", color: "var(--k-cyan)" },
            { icon: BadgeCheck, title: "No annual contracts", desc: "Modify or cancel your service at any time without penalties or fine print.", color: "var(--k-magenta)" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, ${f.color} 15%, transparent)` }}>
                <f.icon className="h-7 w-7" style={{ color: f.color }} />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--k-navy)" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="text-white">
            <h2 className="font-display text-3xl font-black sm:text-4xl">the awards are streaming in.</h2>
            <p className="mt-3 text-white/80">
              Kinetic Internet has been recognized by CNET, Rolling Stone, BroadbandNow and more for delivering award-winning value, reliability and customer care to homes across America.
            </p>
            <ul className="mt-5 space-y-2 text-white/90">
              <li>• Best Internet Providers 2024 — BroadbandNow</li>
              <li>• Best Fiber Internet 2024 — Rolling Stone</li>
              <li>• 2025 CNET Best Of award winner</li>
              <li>• Google Customer Reviews verified provider</li>
            </ul>
            <Button onClick={() => openModal()} className="mt-7 h-12 px-7 font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
              Order Kinetic Internet
            </Button>
          </div>
          <div className="rounded-3xl p-10" style={{ background: "var(--k-magenta)" }}>
            <div className="text-white">
              <div className="text-sm font-bold uppercase tracking-wider opacity-80">peace of mind</div>
              <h3 className="mt-2 font-display text-2xl font-black">Family-safe browsing built in.</h3>
              <p className="mt-3 text-white/85">From parental controls and malware protection to advanced VPN encryption and ID monitoring, Kinetic Secure Wi-Fi helps keep your whole family safe online.</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Parental controls — filter content & pause Wi-Fi</li>
                <li>• Phishing, malware and tracking protection</li>
                <li>• Advanced virus and banking protection</li>
                <li>• Passcode check & secure password vault</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
