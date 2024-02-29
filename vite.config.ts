import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      dts({ insertTypesEntry: true }),
      cssInjectedByJsPlugin({
        jsAssetsFilterFunction: (asset) => {
          return asset.facadeModuleId === resolve("src/index.ts");
        },
      }),
    ],
    build: {
      sourcemap: true,
      cssMinify: true,
      lib: {
        entry: ["src/index.ts", "src/util/index.ts"],
        formats: ["es", "cjs"],
        fileName: (format, name) => `${name}.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          entryFileNames: ({ facadeModuleId }) => {
            if (facadeModuleId === resolve("src/util/index.ts")) {
              return "util/[name].[format].js";
            }
            return "[name].[format].js";
          },
        },
      },
    },
  };
});
