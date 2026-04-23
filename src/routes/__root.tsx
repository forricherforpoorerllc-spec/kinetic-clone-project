import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { OrderProvider } from "@/components/OrderContext";
import { OrderModal } from "@/components/OrderModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://kineticfiber.example.com";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "TelecommunicationsService",
  name: "Kinetic Fiber Internet — Authorized Agent",
  alternateName: "Kinetic Fiber",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "Kinetic Fiber Internet delivers symmetrical 100% fiber-optic home internet up to 2 Gig with no data caps and no annual contracts, plus Whole Home Wi-Fi and 24/7 local support.",
  areaServed: "United States",
  serviceType: ["Fiber Internet", "Home Phone", "Internet & Voice Bundle"],
  contactPoint: [{
    "@type": "ContactPoint",
    telephone: "+1-833-740-5365",
    contactType: "sales",
    areaServed: "US",
    availableLanguage: ["English", "Spanish"],
  }],
  sameAs: [] as string[],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kinetic Fiber Internet | Fast, Affordable Home Internet" },
      { name: "description", content: "Order Kinetic Fiber Internet — symmetrical speeds from $24.99/mo, no data caps, no annual contracts, free whole-home Wi-Fi, and up to $300 prepaid Mastercard®. Serving 18 states." },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "theme-color", content: "#0a0f3d" },
      { name: "format-detection", content: "telephone=yes" },
      { property: "og:site_name", content: "Kinetic Fiber Internet" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.png" },
      { rel: "shortcut icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://ipapi.co" },
      { rel: "dns-prefetch", href: "https://ipapi.co" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <OrderProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <OrderModal />
      <Toaster richColors position="top-center" />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
    </OrderProvider>
  );
}
