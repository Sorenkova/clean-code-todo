import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "error",
    },
  },
  {
    files: ["app.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser,
    },
  },
];
