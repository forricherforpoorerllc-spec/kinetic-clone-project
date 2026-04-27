import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// cloudflare: false — disables the Cloudflare Worker build so vite build
//   produces only a static dist/client/ bundle.
// tanstackStart.spa.enabled: true — activates SPA mode, which prerenders
//   a single _shell.html that Netlify serves for every route.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    prerender: {
      enabled: true,
    },
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/_shell.html",
      },
    },
  },
});
