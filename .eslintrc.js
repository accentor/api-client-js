module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    curly: "warn",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
};
