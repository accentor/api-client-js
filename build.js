/* eslint-disable @typescript-eslint/no-require-imports */
/* This file is not an ES6 module */

const { build } = require("estrella");
const { Generator } = require("npm-dts");

const baseConfig = {
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: ["fetch-retry"],
  logLevel: "info",
  minify: true,
  sourcemap: true,
  target: ["es2018"],
};

build({
  ...baseConfig,
  format: "esm",
  outfile: "dist/index.esm.js",
}).catch(() => process.exit(1));

build({
  ...baseConfig,
  format: "cjs",
  outfile: "dist/index.cjs.js",
}).catch(() => process.exit(1));

new Generator({
  entry: "src/index.ts",
  output: "dist/index.d.ts",
}).generate();
