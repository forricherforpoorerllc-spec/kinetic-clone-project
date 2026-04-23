import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/components/OrderContext";
import { Wifi, Phone, ShieldAlert, Voicemail, PhoneCall, Globe } from "lucide-react";
import bundlesHero from "@/assets/bundles-hero.jpg";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Internet & Phone Bundles from $49.99/mo | Save with Kinetic" },
      { name: "description", content: "Bundle Kinetic Fiber Internet with crystal-clear home phone service starting at $49.99/mo. Unlimited nationwide calling, spam call alerts, no data caps. Order online to save." },
      { name: "keywords", content: "internet and phone bundle, internet phone bundle deals, home phone service, voip home phone, bundle savings, double play bundle, internet voice bundle" },
      { property: "og:title", content: "Internet & Phone Bundles from $49.99/mo | Kinetic" },
      { property: "og:description", content: "Save when you bundle Kinetic Fiber Internet with home phone — unlimited calling and spam call protection included." },
    ],
  }),
  component: BundlesPage,
});

function BundlesPage() {
  const { openModal } = useOrder();
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="text-white">
            <span className="inline-block rounded-full bg-kinetic-green px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground">Bundle & save</span>
            <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl lg:text-6xl">Internet & phone bundling, built for you.</h1>
            <p className="mt-5 max-w-lg text-lg text-white/90">
              Combine blazing-fast Kinetic Fiber Internet with crystal-clear home phone service to unlock bigger savings, unlimited nationwide calling and built-in spam call protection — all on one simple monthly bill.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openModal("Internet + Voice Bundle — $49.99/mo")} className="h-12 bg-kinetic-green px-7 text-base font-bold text-foreground hover:bg-kinetic-green/90">Order Bundle</Button>
              <a href="tel:1-833-740-5365" className="inline-flex h-12 items-center rounded-md border border-white/30 px-7 text-base font-bold text-white hover:bg-white/10">Call 1-833-740-5365</a>
            </div>
          </div>
          <img src={bundlesHero} alt="Kinetic internet router and home phone bundle on a modern desk" width={1536} height={1024} className="rounded-2xl shadow-2xl" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">The best in internet and voice — together.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">One provider. One bill. Twice the value when you bundle Kinetic Internet with home phone.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-kinetic-green bg-card p-8 shadow-[var(--shadow-brand)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-kinetic-green/15"><Wifi className="h-6 w-6 text-kinetic-green" /></div>
              <h3 className="font-display text-2xl font-black">Internet</h3>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Fiber internet starting at:</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-5xl font-black">$24<span className="text-3xl">.99</span></span>
              <span className="text-sm text-muted-foreground">/mo for 12 months</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-kinetic-blue" /> 99.9% network reliability</li>
              <li className="flex items-center gap-2"><Wifi className="h-4 w-4 text-kinetic-blue" /> FREE Whole Home Wi-Fi setup — up to $160 value</li>
              <li className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-kinetic-blue" /> Unlimited data — no caps, no throttling</li>
            </ul>
            <Button onClick={() => openModal("Fiber 1 Gig — $49.99/mo")} className="mt-6 w-full bg-kinetic-blue text-white hover:bg-kinetic-blue/90 h-11 font-semibold">Add Internet</Button>
          </div>

          <div className="rounded-2xl border-2 border-kinetic-blue bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-kinetic-blue/15"><Phone className="h-6 w-6 text-kinetic-blue" /></div>
              <h3 className="font-display text-2xl font-black">Voice</h3>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Starting at:</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-5xl font-black">$25<span className="text-3xl">.00</span></span>
              <span className="text-sm text-muted-foreground">/mo when bundled</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4 text-kinetic-blue" /> Unlimited nationwide calling</li>
              <li className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-kinetic-blue" /> Spam call alerts and screening</li>
              <li className="flex items-center gap-2"><Voicemail className="h-4 w-4 text-kinetic-blue" /> Visual voicemail & web portal management</li>
            </ul>
            <Button onClick={() => openModal("Internet + Voice Bundle — $49.99/mo")} className="mt-6 w-full bg-kinetic-green text-foreground hover:bg-kinetic-green/90 h-11 font-semibold">Add Voice</Button>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Why bundle with Kinetic?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Bundling Kinetic Internet and Voice saves you money, simplifies your bill and keeps your home connected through every conversation, stream and download.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Save up to $20/mo", desc: "Bundle pricing locks in your lowest available rate when you combine internet and home phone." },
              { title: "One simple bill", desc: "Manage internet and phone together in one easy account — pay once, monitor usage anywhere." },
              { title: "Priority support", desc: "Bundle customers receive expedited 24/7 customer care and proactive network monitoring." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 text-left shadow-[var(--shadow-card)]">
                <div className="font-display text-lg font-bold text-kinetic-blue">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
          <Button onClick={() => openModal("Internet + Voice Bundle — $49.99/mo")} className="mt-10 h-12 bg-kinetic-blue px-8 text-base font-bold text-white hover:bg-kinetic-blue/90">Order My Bundle</Button>
        </div>
      </section>
    </div>
  );
}
