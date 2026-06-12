import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    exclude: ["bun"],
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      serverFns: {
        base: "/_actions",
      },
    }),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
    nitro({
      preset: "bun",
      traceDeps: ["react", "react-dom"],
      compatibilityDate: "latest",
    }),
  ],
});
