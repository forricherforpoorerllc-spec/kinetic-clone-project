// @lovable.dev/vite-tanstack-config bundles the Cloudflare Worker plugin by default,
// which is incompatible with a Netlify static deploy. We disable it and turn on
// TanStack Start's SPA mode so the build emits a prerendered _shell.html the
// client router can hydrate from. Local `vite dev` is unaffected.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: { enabled: true },
  },
});
