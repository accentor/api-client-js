/*
 * Overrides the tsconfig used for the app.
 * In the test environment we need some tweaks.
 */
import tsNode from "ts-node";

tsNode.register({
  transpileOnly: true,
  project: "./test/tsconfig.json",
});
