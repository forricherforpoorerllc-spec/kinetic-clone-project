import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-white mt-24" style={{ background: "var(--k-navy)" }}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
                <defs>
                  <linearGradient id="lgf" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#f5ff1e" />
                    <stop offset="0.5" stopColor="#26b170" />
                    <stop offset="1" stopColor="#931d69" />
                  </linearGradient>
                </defs>
                <path d="M20 4 a16 16 0 1 1 -11.3 27.3" fill="none" stroke="url(#lgf)" strokeWidth="6" strokeLinecap="round" />
                <circle cx="20" cy="20" r="4" fill="#00adef" />
              </svg>
              <span className="font-display text-xl font-black">kinetic.</span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Fast, friendly fiber internet for over 1.6 million homes across 18 states. No data caps. No annual contracts.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white">Plans</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link to="/fiber-internet" className="hover:text-[var(--k-yellow)]">Fiber Internet</Link></li>
              <li><Link to="/high-speed-internet" className="hover:text-[var(--k-yellow)]">High-Speed Internet</Link></li>
              <li><Link to="/bundles" className="hover:text-[var(--k-yellow)]">Internet & Voice Bundles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>Help Center</li>
              <li>Account Login</li>
              <li>Service Outages</li>
              <li>Speed Test</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: "var(--k-yellow)" }} /> 1-833-740-5365</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: "var(--k-yellow)" }} />care@kinetic.com</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" style={{ color: "var(--k-yellow)" }} /> Available in 18 states nationwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {year} Kinetic Fiber Internet — Authorized Agent. All rights reserved. Speeds, pricing and availability vary by location. *With AutoPay.
        </div>
      </div>
    </footer>
  );
}
