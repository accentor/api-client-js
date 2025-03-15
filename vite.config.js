import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      name: "@accent/api-client-js",
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["fetch-retry"],
      output: {
        globals: {
          "fetch-retry": "useFetchRetry",
        },
      },
    },
  },
});
