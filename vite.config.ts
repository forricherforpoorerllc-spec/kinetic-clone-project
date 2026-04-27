import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// cloudflare: false — disables the Cloudflare Worker build so vite build
//   produces only a static dist/client/ bundle.
// tanstackStart.spa.enabled: true — activates SPA mode.
// NOTE: outputPath must be '/_shell' (without .html) because TanStack
// appends '.html' for the SPA shell file internally.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    prerender: {
      enabled: true,
    },
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/_shell",
      },
    },
  },
});
