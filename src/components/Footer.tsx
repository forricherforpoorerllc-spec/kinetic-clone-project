import { Link } from "@tanstack/react-router";
import { MapPin, ShieldCheck, Award, Clock } from "lucide-react";
import kineticLogo from "@/assets/kinetic-logo.png";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-white mt-24" style={{ background: "var(--k-navy)" }}>
      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: ShieldCheck, t: "99.9% network reliability", d: "Resilient 100% fiber backbone." },
            { icon: Award, t: "Award-winning service", d: "CNET, Rolling Stone, BroadbandNow." },
            { icon: Clock, t: "24/7 local support", d: "Real humans, any hour." },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-3">
              <f.icon className="h-6 w-6 flex-shrink-0" style={{ color: "var(--k-yellow)" }} />
              <div>
                <div className="font-bold text-white">{f.t}</div>
                <div className="text-sm text-white/70">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-xl bg-white p-3 inline-block">
              <img src={kineticLogo} alt="Kinetic Authorized Agent" className="h-12 w-auto" />
            </div>
            <p className="mt-4 max-w-md text-sm text-white/70">
              Fast, friendly Kinetic Fiber Internet for over 1.6 million homes across 18 states. Symmetrical speeds, no data caps, no annual contracts — just dependable fiber service backed by people who live in your community.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: "var(--k-yellow)" }} />
              <span>Available in 18 states nationwide</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white">Plans</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link to="/fiber-internet" className="hover:text-[var(--k-yellow)]">Fiber Internet</Link></li>
              <li><Link to="/high-speed-internet" className="hover:text-[var(--k-yellow)]">High-Speed Internet</Link></li>
              <li><Link to="/bundles" className="hover:text-[var(--k-yellow)]">Internet &amp; Voice Bundles</Link></li>
              <li><Link to="/fiber-internet" className="hover:text-[var(--k-yellow)]">Compare Fiber Speeds</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {year} Kinetic Fiber Internet — Authorized Agent. All rights reserved. Speeds, pricing and availability vary by location. *With AutoPay. Not affiliated with Windstream.
        </div>
      </div>
    </footer>
  );
}

