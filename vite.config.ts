import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Replaces @lovable.dev/vite-tanstack-config so we can target Netlify.
// TanStack Start with target: "netlify" emits:
//   - dist/client/  → static assets + index.html shell
//   - a Netlify Function for SSR (auto-wired via netlify.toml)
export default defineConfig({
  resolve: {
    alias: { "@": "/src" },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({ target: "netlify" }),
    viteReact(),
  ],
});
