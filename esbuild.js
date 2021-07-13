const esbuild = require("esbuild");

const baseConfig = {
  bundle: true,
  entryPoints: ["src/index.js"],
  external: ["fetch-retry"],
  logLevel: "info",
  minify: true,
  sourcemap: true,
  target: ["es2018"],
};

esbuild
  .build({
    ...baseConfig,
    format: "esm",
    outfile: "dist/index.mjs",
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...baseConfig,
    format: "cjs",
    outfile: "dist/index.js",
  })
  .catch(() => process.exit(1));
