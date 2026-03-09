import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "assets/*.png",
      "assets/*.svg",
      "assets/styles.css",
      "en/",
      "node_modules/",
      "resources/",
      "logs/",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.es2024,
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
];
