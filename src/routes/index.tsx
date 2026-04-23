import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { PlanCard } from "@/components/PlanCard";
import { HeroSection } from "@/components/HeroSection";
import { FaqSection } from "@/components/FaqSection";
import { useGeo, locationLabel } from "@/hooks/useGeo";
import { Award, ShieldCheck, Wifi, Headphones, MapPin, Zap, Star, Phone } from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kinetic Fiber Internet | Plans from $24.99/mo + Up to $300 Prepaid Card" },
      { name: "description", content: "Switch to Kinetic Fiber today — symmetrical speeds from $24.99/mo, no data caps, no annual contracts, free whole-home Wi-Fi setup, and up to a $300 prepaid Mastercard®. Order online in under 2 minutes. Available in 18 states." },
      { name: "keywords", content: "Kinetic fiber internet, fast home internet, fiber optic internet, gigabit internet, 2 gig fiber, symmetrical fiber, no contract internet, no data caps, residential internet provider, internet deals near me, $300 Mastercard offer, Whole Home Wi-Fi" },
      { property: "og:title", content: "Kinetic Fiber Internet | Fast, Friendly Home Internet" },
      { property: "og:description", content: "Blazing-fast symmetrical fiber internet from $24.99/mo. No caps, no contracts, free Wi-Fi setup, up to $300 Mastercard offer." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kineticfiber.example.com/" },
      { name: "twitter:title", content: "Kinetic Fiber Internet | Fast, Friendly Home Internet" },
      { name: "twitter:description", content: "Symmetrical fiber from $24.99/mo. No caps, no contracts, $300 Mastercard." },
    ],
    links: [{ rel: "canonical", href: "https://kineticfiber.example.com/" }],
  }),
  component: HomePage,
});

const homePlans = [
  { name: "fiber 100 Mbps", speed: "100 Mbps download", price: "$24", cents: ".99", description: "Reliable support for essentials like email, browsing, and HD video chat.", features: ["Perfect for individuals and small families", "Download a 2.5-hour 4K movie in 24 minutes", "Free Whole Home Wi-Fi setup"], planValue: "Fiber 100 Mbps — $24.99/mo" },
  { name: "fiber 300 Mbps", speed: "300 Mbps download", price: "$39", cents: ".99", description: "Good for most day-to-day internet uses including streaming video.", features: ["Work, stream and play on multiple devices", "Download a 2.5-hour 4K movie in about 8 minutes", "Free expert installation"], planValue: "Fiber 300 Mbps — $39.99/mo" },
  { name: "fiber 1 gig", speed: "1,000 Mbps download", price: "$49", cents: ".99", description: "Boosted speed and capacity for working from home and gaming.", features: ["Plenty of bandwidth for mid-sized households", "More than 25x upload speeds compared to cable", "Lag-free competitive online gaming"], highlight: true, badge: "Most popular", rebate: "$100 prepaid Mastercard®", planValue: "Fiber 1 Gig — $49.99/mo" },
  { name: "fiber 2 gig", speed: "2,000 Mbps download", price: "$69", cents: ".99", description: "Ultra-fast speeds engineered for large smart homes.", features: ["Ideal for immersive 4K cloud gaming", "Supports dozens of devices simultaneously", "Wi-Fi 7 ready router included"], badge: "Best value", rebate: "$200 prepaid Mastercard® · 2-year price guarantee", planValue: "Fiber 2 Gig — $69.99/mo" },
  { name: "fiber max 2 gig", speed: "2,000 Mbps + Secure", price: "$89", cents: ".99", description: "Worry-free internet for the whole home, bundled with security.", features: ["Includes eero Pro 7 Wi-Fi gateway", "Kinetic Secure Plus + extenders as needed", "24/7 always-on Premium Tech Support"], rebate: "$300 prepaid Mastercard® · 3-year price guarantee", planValue: "Fiber Max 2 Gig — $89.99/mo" },
];

const homeFaq = [
  { q: "How fast is Kinetic Fiber Internet?", a: "Kinetic Fiber plans range from 100 Mbps up to 2 Gig symmetrical download and upload. That means you can back up a 50 GB video library, host a crystal-clear video call and stream in 4K on every TV — all at the same time — without buffering." },
  { q: "Is there a data cap on Kinetic Fiber plans?", a: "No. Every Kinetic Fiber plan includes unlimited data with no throttling, no overage fees and no hidden caps — stream, game and work from home as much as you want." },
  { q: "Do I have to sign a contract?", a: "Never. Kinetic Fiber is a month-to-month service. You can change plans, upgrade speeds or cancel at any time without early-termination fees." },
  { q: "What's included in Whole Home Wi-Fi setup?", a: "Every Kinetic Fiber install includes a pro technician walking your home to place a Wi-Fi 6E/7 gateway in the optimal spot, plus up to two mesh extenders when the home needs them — all at no extra cost, a value of up to $160." },
  { q: "How do I claim the $300 prepaid Mastercard®?", a: "Order any qualifying Kinetic Fiber plan online and keep service active for the first 90 days. Your prepaid Mastercard® is mailed to your service address — no rebate form, no hoops." },
  { q: "How long does installation take?", a: "Most standard fiber installs are completed in 2–4 hours. We'll confirm your preferred install date after you place your order and send SMS updates on the day of service." },
];

function HomePage() {
  const { openModal } = useOrder();
  const geo = useGeo();
  const cityLabel = locationLabel(geo, "your neighborhood");

  // Emit a structured-data ItemList + Offer catalog so Google surfaces rich pricing.
  const productLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: homePlans.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `Kinetic ${p.name}`,
        description: p.description,
        brand: { "@type": "Brand", name: "Kinetic" },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: Number(p.price.replace("$", "")) + Number(p.cents),
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: Number(p.price.replace("$", "")) + Number(p.cents),
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
      },
    })),
  };

  const ratingLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Kinetic Fiber Internet",
    brand: { "@type": "Brand", name: "Kinetic" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2347",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Maria R." },
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Switched from cable and doubled our upload speeds. My husband works from home and has had zero dropped meetings since install day.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "James T." },
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Gaming latency is under 9ms on our PS5 — feels unfair. The tech walked every room and placed the Wi-Fi exactly where it needed to be.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Ava P." },
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "No contracts, no data caps, no surprises. The $300 Mastercard showed up 60 days in like they promised.",
      },
    ],
  };

  return (
    <div>
      <HeroSection
        title={<>kinetic fiber internet<br />built for your home.</>}
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
        ctaLabel="Claim my fiber deal"
      />

      {/* $300 promo strip */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl px-6 py-5 text-center text-white text-base font-medium md:text-lg" style={{ background: "var(--k-cyan)" }}>
          Get up to a <strong className="font-extrabold" style={{ color: "var(--k-yellow)" }}>$300</strong> prepaid Mastercard® with a qualifying internet plan.
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">fiber speeds that fit your needs.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Symmetrical 100% fiber-optic internet from 100 Mbps up to 2 Gig — every Kinetic Fiber plan includes unlimited data, free Whole Home Wi-Fi and month-to-month flexibility.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
              Kinetic already brings fiber internet to over 1.6 million homes across 18 states — and we're not slowing down. Our gig-speed expansion means more households get faster speeds, better reliability and exclusive local offers designed to deliver more value for less.
            </p>
            <Button onClick={() => openModal()} className="mt-6 h-12 px-7 font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
              See my local offers
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
            Kinetic isn't just another internet provider — we're neighbors. Our 100% fiber network is engineered locally, installed by technicians who live in the communities we serve, and backed by award-winning 24/7 support for every home we connect.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, title: "Award-winning service", desc: "Named a best fiber provider by CNET, Rolling Stone and BroadbandNow for value, speed and reliability." },
            { icon: Wifi, title: "Free Whole Home Wi-Fi", desc: "Every install includes a pro 20-point walkthrough and Wi-Fi 6E/7 gateway — up to $160 value, free." },
            { icon: ShieldCheck, title: "99.9% reliability", desc: "Buried fiber doesn't flinch at storms, heat or peak traffic — built for streaming, gaming and remote work." },
            { icon: Headphones, title: "24/7 real-time support", desc: "Talk to a real person any hour, any day. Chat, phone and video support staffed by local Kinetic pros." },
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

      {/* Fiber vs Cable comparison */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">fiber vs cable: why Kinetic wins.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              100% fiber-optic networks use pulses of light through glass strands — not copper — so speeds don't slow down at peak hours and upload is just as fast as download.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full text-left text-sm">
              <thead style={{ background: "var(--k-navy)" }} className="text-white">
                <tr>
                  <th className="p-4 font-display">Feature</th>
                  <th className="p-4 font-display">Kinetic Fiber</th>
                  <th className="p-4 font-display">Cable / DSL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Upload speed", "Up to 2,000 Mbps symmetrical", "Typically 10–35 Mbps"],
                  ["Data caps", "None — unlimited", "Usually 1 TB/mo or less"],
                  ["Annual contracts", "None required", "Often 12–24 months"],
                  ["Peak-hour slowdowns", "No — fiber is not shared like coax", "Common during evenings"],
                  ["Weather resilience", "Underground fiber, storm-resistant", "Signal drops in storms"],
                  ["Price guarantee", "Up to 3 years locked in", "Promo pricing expires"],
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-background" : ""}>
                    <td className="p-4 font-semibold">{row[0]}</td>
                    <td className="p-4" style={{ color: "var(--k-green)" }}><strong>{row[1]}</strong></td>
                    <td className="p-4 text-muted-foreground">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">built for every home{geo.city ? ` in ${geo.city}` : ""}.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Whether you're a solo renter streaming in 4K or a full household juggling remote work, homework and online gaming — Kinetic Fiber fits the way you live online.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Zap, title: "Remote workers & creators", desc: "Symmetrical uploads mean huge client files, cloud backups and live streams finish in seconds, not hours." },
            { icon: Wifi, title: "Families & smart homes", desc: "Connect every phone, tablet, doorbell, thermostat and TV — no lag, no fighting for bandwidth." },
            { icon: Award, title: "Gamers & streamers", desc: "Sub-10ms latency on PlayStation, Xbox and PC. Crystal-clear Twitch streams at 1080p60 with headroom to spare." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
              <f.icon className="h-8 w-8" style={{ color: "var(--k-blue)" }} />
              <h3 className="mt-3 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: "color-mix(in oklab, var(--k-blue) 6%, transparent)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">real customers. real speeds. real reliability.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Thousands of families nationwide rate Kinetic Fiber 4.8/5 for the install experience and ongoing service.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { name: "Maria R.", city: "Lexington, KY", quote: "Switched from cable and doubled our upload speeds. My husband works from home and has had zero dropped meetings since install day." },
              { name: "James T.", city: "Greenville, NC", quote: "The tech walked every room and placed the Wi-Fi exactly where it needed to be. Gaming latency is under 9ms on our PS5 — feels unfair." },
              { name: "Ava P.", city: "Columbus, OH", quote: "No contracts, no data caps, no surprises. The $300 Mastercard showed up 60 days in like they promised." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex gap-0.5" style={{ color: "var(--k-yellow)" }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
                <div className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.name} · {t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
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

      {/* FAQ */}
      <FaqSection
        heading="Kinetic Fiber Internet — frequently asked questions"
        subhead="Everything you need to know before ordering Kinetic Fiber Internet at home."
        items={homeFaq}
      />

      {/* Final local CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 flex-shrink-0" style={{ color: "var(--k-blue)" }} />
            <div>
              <div className="font-display text-lg font-bold">Ready to order Kinetic Fiber in {cityLabel}?</div>
              <div className="text-sm text-muted-foreground">Lock in today's pricing and your prepaid Mastercard® offer in under 2 minutes.</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="tel:+18337405365" className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-bold text-[var(--k-navy)] hover:bg-muted">
              <Phone className="h-4 w-4" /> 1-833-740-5365
            </a>
            <Button onClick={() => openModal()} className="h-11 px-6 font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>
              Order Kinetic Fiber
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingLd) }}
      />
    </div>
  );
}
