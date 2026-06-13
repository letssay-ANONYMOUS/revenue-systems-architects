import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "production" &&
      legacy({
        targets: ["Chrome >= 49", "Android >= 5", "Safari >= 12"],
        modernPolyfills: true,
        renderLegacyChunks: true,
      }),
    process.env.ANALYZE &&
      visualizer({ filename: "bundle-stats.html", gzipSize: true, template: "treemap" }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // pre-bundle so the first visit to a lazy 3D section doesn't trigger a
    // dev-server re-optimization + full page reload
    include: ["three/examples/jsm/utils/BufferGeometryUtils.js"],
  },
}));
