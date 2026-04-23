import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { HeroSection } from "@/components/HeroSection";
import { FaqSection } from "@/components/FaqSection";
import { useGeo, locationLabel } from "@/hooks/useGeo";
import { ShieldCheck, Infinity as InfinityIcon, BadgeCheck, Tv, Video, CloudUpload } from "lucide-react";
import internetHero from "@/assets/internet-hero.jpg";

export const Route = createFileRoute("/high-speed-internet")({
  head: () => ({
    meta: [
      { title: "Kinetic High-Speed Internet | Reliable Home Broadband from $44.99/mo" },
      { name: "description", content: "Get Kinetic high-speed internet from $44.99/mo — 99.9% uptime, no data caps, no annual contracts, free professional installation. Dependable home broadband across 18 states. Order online today." },
      { name: "keywords", content: "high-speed internet, Kinetic internet plans, home internet service, no contract internet, no data caps internet, residential broadband, reliable home internet, fastest internet provider near me" },
      { property: "og:title", content: "High-Speed Home Internet from $44.99/mo | Kinetic" },
      { property: "og:description", content: "Reliable high-speed home internet with free expert install, no caps, no contracts, 99.9% reliability." },
      { property: "og:url", content: "https://kineticfiber.example.com/high-speed-internet" },
    ],
    links: [{ rel: "canonical", href: "https://kineticfiber.example.com/high-speed-internet" }],
  }),
  component: InternetPage,
});

const internetFaq = [
  { q: "What's the difference between Kinetic High-Speed Internet and Kinetic Fiber?", a: "Kinetic Fiber delivers symmetrical speeds up to 2 Gig over 100% fiber-optic lines. Kinetic High-Speed Internet is our reliable residential broadband service for areas where fiber isn't available yet — still with no data caps and no annual contracts." },
  { q: "Will Kinetic Internet be fast enough for streaming 4K?", a: "Yes. Every Kinetic Internet plan comfortably handles 4K streaming on multiple TVs simultaneously, video calls and general household use for up to 10 connected devices." },
  { q: "Is there a contract or data cap?", a: "No annual contract, ever. Every plan includes unlimited data — no throttling, no overage fees, no hidden caps." },
  { q: "Does my plan include the modem and router?", a: "Yes. Your monthly price includes a managed Wi-Fi router, and our technician handles the full install at no extra charge." },
  { q: "Can I upgrade to Kinetic Fiber later?", a: "Absolutely. If Kinetic Fiber becomes available at your address, you can switch any time with no early-termination fee and keep your same account and number if you bundle voice." },
];

function InternetPage() {
  const { openModal } = useOrder();
  const geo = useGeo();
  const cityLabel = locationLabel(geo, "your area");
  return (
    <div>
      <HeroSection
        eyebrow="Reliable home internet"
        title={<>kinetic high-speed internet<br />reliable, fast, no contracts.</>}
        bullets={[
          "Free expert installation",
          "Unlimited data — no caps",
          "No annual contracts",
          "99.9% network reliability",
        ]}
        badgeLabel="plans start at:"
        badgePrice="$44"
        badgeCents=".99"
        image={internetHero}
        imageAlt="Father and daughter working online with Kinetic high-speed internet"
        shape="magenta"
        ctaLabel="Order high-speed internet"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">fast internet. worry-free service plans.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Every Kinetic Internet plan comes loaded with the essentials your household needs to browse, stream and connect with confidence{geo.city ? ` in ${geo.city}` : ""}.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "99.9% reliability", desc: "Enjoy connectivity you can count on with our resilient broadband network and proactive fiber backhaul." , color: "var(--k-green)"},
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

      {/* What you can do with Kinetic Internet */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">what you can do with Kinetic Internet.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Speeds that keep up with real life — streaming, schoolwork, remote meetings and the whole family online at once.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Tv, title: "Stream 4K on every TV", desc: "Watch Netflix, Disney+ and Max in crystal-clear 4K Ultra HD on multiple TVs at the same time — no buffering." },
              { icon: Video, title: "Work from home confidently", desc: "Zoom, Teams and Google Meet run smoothly on HD video, even with other family members streaming or gaming." },
              { icon: CloudUpload, title: "Cloud-backup your memories", desc: "Automatically back up your phone photos and important files to iCloud, Google Drive or OneDrive." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
                <f.icon className="h-8 w-8" style={{ color: "var(--k-blue)" }} />
                <h3 className="mt-3 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
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
              <li>• Best Internet Providers 2025 — BroadbandNow</li>
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

      <FaqSection
        heading="Kinetic Internet — frequently asked questions"
        subhead={`Everything you need to know about Kinetic Internet in ${cityLabel}.`}
        items={internetFaq}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kineticfiber.example.com/" },
            { "@type": "ListItem", position: 2, name: "High-Speed Internet", item: "https://kineticfiber.example.com/high-speed-internet" },
          ],
        }) }}
      />
    </div>
  );
}
