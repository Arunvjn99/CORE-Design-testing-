import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// POC: swap a few app-infrastructure modules (auth, Font Awesome Pro) for local
// stand-ins. Production component files are never edited.
const POC_OVERRIDES = [
  [/components\/api-authorization\/AuthorizeService(\.jsx?)?$/, "src/poc/overrides/AuthorizeService.jsx"],
];
const pocOverrides = () => ({
  name: "poc-overrides",
  enforce: "pre",
  async resolveId(source, importer, options) {
    for (const [re, target] of POC_OVERRIDES) {
      if (re.test(source) && !importer?.includes("/src/poc/")) {
        return path.resolve(__dirname, target);
      }
    }
    return null;
  },
});

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isProd = mode === "production";

  return defineConfig({
    plugins: [
      pocOverrides(),
      react(),
      svgr({
        exportAsDefault: false,
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@fortawesome/pro-light-svg-icons": path.resolve(__dirname, "src/poc/fa-shim/pro-light.js"),
        "@fortawesome/pro-regular-svg-icons": path.resolve(__dirname, "src/poc/fa-shim/pro-regular.js"),
        "@fortawesome/pro-solid-svg-icons": path.resolve(__dirname, "src/poc/fa-shim/pro-solid.js"),
        "@fortawesome/fontawesome-pro/css/all.css": "@fortawesome/fontawesome-free/css/all.css",

        "@progress/kendo-drawing": path.resolve(
          __dirname,
          "node_modules/@progress/kendo-drawing/dist/npm/main.js"
        ),

        "@progress/kendo-charts": path.resolve(
          __dirname,
          "node_modules/@progress/kendo-charts/dist/npm/main.js"
        ),
      },
    },

    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },

    server: {
      port: 5173,
      host: true,
    },

    build: {
      outDir: "build",
      sourcemap: !isProd,
      minify: "esbuild",
    },
    esbuild: {
      drop: isProd ? ["console", "debugger"] : [],
    },
  });
};
