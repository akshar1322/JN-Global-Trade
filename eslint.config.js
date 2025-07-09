import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import ts from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default ts.config(
  {
    // Base TypeScript configuration
    extends: [
      js.configs.recommended,
      ...compat.extends("next/core-web-vitals"),
    ],
    ignores: [
      ".next/",
      "node_modules/",
      "dist/",
      "out/"
    ]
  },
  {
    // TypeScript-specific settings
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": ts.plugin
    },
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/consistent-type-imports": "error",

      // Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",

      // React rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Custom rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "sort-imports": ["warn", { ignoreDeclarationSort: true }],
    }
  },
  {
    // API route specific overrides
    files: ["src/app/api/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "no-console": "off"
    }
  }
);
