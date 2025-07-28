import {defineConfig, globalIgnores} from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import markdown from "@eslint/markdown";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  globalIgnores(["tracer-bundle.js"]),
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {js, stylistic},
    extends: ["js/all", "stylistic/all"],
    rules: {
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/indent": ["error", 4],
      "@stylistic/multiline-comment-style": "off",
      "@stylistic/multiline-ternary": "off",
      "@stylistic/object-property-newline": ["error", {allowAllPropertiesOnSameLine: true}],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "capitalized-comments": "off",
      "max-lines-per-function": ["error", 100],
      "max-statements": ["error", 25],
      "no-inline-comments": "off",
      "no-magic-numbers": "off",
      "no-ternary": "off",
      "one-var": ["error", "never"],
      "sort-keys": "off",
      strict: "off"
    }
  },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
]);
