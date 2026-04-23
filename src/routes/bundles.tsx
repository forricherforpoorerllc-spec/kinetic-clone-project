import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { HeroSection } from "@/components/HeroSection";
import { Wifi, Phone, ShieldAlert, Voicemail, PhoneCall, Globe } from "lucide-react";
import bundlesHero from "@/assets/bundles-hero.jpg";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Internet & Phone Bundles from $49.99/mo | Kinetic Bundles" },
      { name: "description", content: "Bundle Kinetic Fiber Internet with crystal-clear home phone for just $49.99/mo. Unlimited nationwide calling, spam-call alerts, web portal management, no data caps. Order online today." },
      { name: "keywords", content: "internet and phone bundle, Kinetic bundle, home phone service, bundle deals, double play bundle, internet voice bundle, bundle and save" },
      { property: "og:title", content: "Internet & Phone Bundles from $49.99/mo | Kinetic" },
      { property: "og:description", content: "Bundle internet + home phone for $49.99/mo. Unlimited calling, spam alerts, no contracts." },
    ],
  }),
  component: BundlesPage,
});

function BundlesPage() {
  const { openModal } = useOrder();
  return (
    <div>
      <HeroSection
        eyebrow="Bundle & save"
        title={<>internet & phone<br />bundling for you.</>}
        bullets={[
          "No data caps",
          "Spam call alert",
          "Web portal feature management",
          "One simple monthly bill",
        ]}
        badgeLabel="internet + phone starting at"
        badgePrice="$49"
        badgeCents=".99"
        image={bundlesHero}
        imageAlt="Kinetic customer using bundled internet and home phone"
        shape="magenta"
        ctaPlan="Internet + Voice Bundle — $49.99/mo"
      />

      {/* $300 promo strip */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl px-6 py-5 text-center text-white text-base font-medium md:text-lg" style={{ background: "var(--k-cyan)" }}>
          Get up to a <strong className="font-extrabold" style={{ color: "var(--k-yellow)" }}>$300</strong> prepaid Mastercard® with a qualifying internet plan.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">get the best in internet and voice.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">One provider. One bill. Twice the value when you bundle Kinetic Fiber Internet with home phone.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border-2 bg-card p-8 shadow-[var(--shadow-brand)]" style={{ borderColor: "var(--k-green)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "color-mix(in oklab, var(--k-green) 18%, transparent)" }}>
                <Wifi className="h-6 w-6" style={{ color: "var(--k-green)" }} />
              </div>
              <h3 className="font-display text-2xl font-black">internet</h3>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">fiber internet starting at:</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-5xl font-black">$24<span className="text-3xl">.99</span></span>
              <span className="text-sm text-muted-foreground">/mo for 12 months</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">with autopay</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Globe className="h-4 w-4" style={{ color: "var(--k-green)" }} /> 99.9% network reliability</li>
              <li className="flex items-center gap-2"><Wifi className="h-4 w-4" style={{ color: "var(--k-green)" }} /> FREE Whole Home Wi-Fi setup — up to $160 value</li>
              <li className="flex items-center gap-2"><ShieldAlert className="h-4 w-4" style={{ color: "var(--k-green)" }} /> Fast speeds for mid-sized households</li>
            </ul>
            <Button onClick={() => openModal("Fiber 1 Gig — $49.99/mo")} className="mt-6 w-full h-11 font-bold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>Add Internet</Button>
          </div>

          <div className="rounded-2xl border-2 bg-card p-8 shadow-[var(--shadow-card)]" style={{ borderColor: "var(--k-magenta)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "color-mix(in oklab, var(--k-magenta) 18%, transparent)" }}>
                <Phone className="h-6 w-6" style={{ color: "var(--k-magenta)" }} />
              </div>
              <h3 className="font-display text-2xl font-black">voice</h3>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">starting at:</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-5xl font-black">$25<span className="text-3xl">.00</span></span>
              <span className="text-sm text-muted-foreground">/mo when bundled</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">with internet</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4" style={{ color: "var(--k-magenta)" }} /> Reliable connection & caller ID</li>
              <li className="flex items-center gap-2"><ShieldAlert className="h-4 w-4" style={{ color: "var(--k-magenta)" }} /> Spam call alert and screening</li>
              <li className="flex items-center gap-2"><Voicemail className="h-4 w-4" style={{ color: "var(--k-magenta)" }} /> Voicemail, premium call forwarding & web portal</li>
            </ul>
            <Button onClick={() => openModal("Internet + Voice Bundle — $49.99/mo")} className="mt-6 w-full h-11 font-bold text-white hover:opacity-90" style={{ background: "var(--k-magenta)" }}>Add Voice</Button>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">*Price includes a $5.00/mo discount with AutoPay.</p>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-black sm:text-4xl">why bundle with Kinetic?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Bundling Kinetic Internet and home phone saves you money, simplifies your bill and keeps your home connected through every conversation, stream and download.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Save up to $20/mo", desc: "Bundle pricing locks in your lowest available rate when you combine internet and home phone." },
              { title: "One simple bill", desc: "Manage internet and phone together in one easy account — pay once, monitor anywhere." },
              { title: "Priority support", desc: "Bundle customers receive expedited 24/7 customer care and proactive network monitoring." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 text-left shadow-[var(--shadow-card)]">
                <div className="font-display text-lg font-bold" style={{ color: "var(--k-blue)" }}>{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
          <Button onClick={() => openModal("Internet + Voice Bundle — $49.99/mo")} className="mt-10 h-12 px-8 font-extrabold text-[var(--k-navy)] hover:opacity-90" style={{ background: "var(--k-yellow)" }}>Order my bundle</Button>
        </div>
      </section>
    </div>
  );
}
