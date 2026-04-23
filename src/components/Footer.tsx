import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "var(--gradient-hero)" }}>
                <span className="font-display text-xl font-black text-white">K</span>
              </div>
              <span className="font-display text-xl font-extrabold">kinetic<span className="text-kinetic-cyan">.</span></span>
            </div>
            <p className="mt-4 text-sm text-background/70">
              Fast, reliable fiber internet for homes across America. No data caps. No annual contracts.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold">Plans</h4>
            <ul className="mt-3 space-y-2 text-sm text-background/70">
              <li><Link to="/fiber-internet" className="hover:text-kinetic-cyan">Fiber Internet</Link></li>
              <li><Link to="/high-speed-internet" className="hover:text-kinetic-cyan">High-Speed Internet</Link></li>
              <li><Link to="/bundles" className="hover:text-kinetic-cyan">Internet & Voice Bundles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-background/70">
              <li>Help Center</li>
              <li>Account Login</li>
              <li>Service Outages</li>
              <li>Speed Test</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-background/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-kinetic-cyan" /> 1-833-740-5365</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-kinetic-cyan" /> care@kinetic.com</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-kinetic-cyan" /> Available in 18 states nationwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-6 text-xs text-background/50">
          © {new Date().getFullYear()} Kinetic Fiber Internet. All rights reserved. Speeds, pricing and availability vary by location.
        </div>
      </div>
    </footer>
  );
}
