import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOrder } from "./OrderContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import kineticLogo from "@/assets/kinetic-logo.png";

export function Header() {
  const { openModal } = useOrder();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = "text-[15px] font-semibold text-foreground/80 transition-colors hover:text-[var(--k-blue)]";
  const activeLinkClass = "text-[var(--k-blue)] border-b-2 border-[var(--k-green)] pb-1";

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* Promo bar */}
      <div className="w-full text-center text-white text-sm font-medium py-2 px-4" style={{ background: "var(--k-cyan)" }}>
        Sign up for a plan today and receive up to <strong className="font-extrabold" style={{ color: "var(--k-yellow)" }}>$300</strong> prepaid Mastercard®. <button onClick={() => openModal()} className="underline font-semibold">Order now</button>
      </div>

      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <img src={kineticLogo} alt="Kinetic Authorized Agent" className="h-12 w-auto md:h-14" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/fiber-internet" className={navLinkClass} activeProps={{ className: activeLinkClass }}>Fiber Internet</Link>
            <Link to="/high-speed-internet" className={navLinkClass} activeProps={{ className: activeLinkClass }}>Internet</Link>
            <Link to="/bundles" className={navLinkClass} activeProps={{ className: activeLinkClass }}>Bundles</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button onClick={() => openModal()} className="font-bold text-[var(--k-navy)] hover:opacity-90 h-11 px-6" style={{ background: "var(--k-yellow)" }}>
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
              <Button onClick={() => { setMobileOpen(false); openModal(); }} className="mt-2 font-bold text-[var(--k-navy)]" style={{ background: "var(--k-yellow)" }}>Order Now</Button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
