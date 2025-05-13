import globals from "globals";
import tseslint from "typescript-eslint";

import baseConfig from "../../eslint.config.js";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "object-curly-spacing": ["error", "always"],
      curly: ["error", "all"],
    },
  },
  ...baseConfig
);
