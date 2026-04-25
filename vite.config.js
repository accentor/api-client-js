import { defineConfig } from "vitest/config";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    sourcemap: true,
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
  test: {
    include: ["test/**/*.test.ts"],
    setupFiles: ["test/mock-api.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      reporter: ["text-summary", "html", "lcov", "cobertura"],
      reportsDirectory: "./coverage",
    },
  },
});
