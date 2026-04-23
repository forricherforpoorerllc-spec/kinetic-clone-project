import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "./OrderContext";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { openModal } = useOrder();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = "text-sm font-semibold text-foreground/80 transition-colors hover:text-kinetic-blue";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "var(--gradient-hero)" }}>
            <span className="font-display text-xl font-black text-white">K</span>
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
            kinetic<span className="text-kinetic-cyan">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link to="/" className={navLinkClass} activeProps={{ className: "text-kinetic-blue" }}>Home</Link>
          <Link to="/fiber-internet" className={navLinkClass} activeProps={{ className: "text-kinetic-blue" }}>Fiber Internet</Link>
          <Link to="/high-speed-internet" className={navLinkClass} activeProps={{ className: "text-kinetic-blue" }}>Internet</Link>
          <Link to="/bundles" className={navLinkClass} activeProps={{ className: "text-kinetic-blue" }}>Bundles</Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:1-833-740-5365" className="flex items-center gap-2 text-sm font-semibold text-kinetic-blue">
            <Phone className="h-4 w-4" /> 1-833-740-5365
          </a>
          <Button onClick={() => openModal()} className="bg-kinetic-green text-foreground hover:bg-kinetic-green/90 font-semibold">
            Order Now
          </Button>
        </div>

        <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden" aria-label="Toggle menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link to="/" className="rounded px-3 py-2 hover:bg-muted" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/fiber-internet" className="rounded px-3 py-2 hover:bg-muted" onClick={() => setMobileOpen(false)}>Fiber Internet</Link>
            <Link to="/high-speed-internet" className="rounded px-3 py-2 hover:bg-muted" onClick={() => setMobileOpen(false)}>Internet</Link>
            <Link to="/bundles" className="rounded px-3 py-2 hover:bg-muted" onClick={() => setMobileOpen(false)}>Bundles</Link>
            <Button onClick={() => { setMobileOpen(false); openModal(); }} className="mt-2 bg-kinetic-green text-foreground hover:bg-kinetic-green/90">Order Now</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
