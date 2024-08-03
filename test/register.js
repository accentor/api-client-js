/*
 * Overrides the tsconfig used for the app.
 * In the test environment we need some tweaks.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tsNode = require("ts-node");

tsNode.register({
  files: true,
  transpileOnly: true,
  project: "./test/tsconfig.json",
});
