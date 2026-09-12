import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import js from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Flat config — ESLint 10 dropped .eslintrc entirely.
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */
export default tseslint.config(
    {
        ignores: ["dist", "node_modules", "playwright-report", "test-results", "blob-report"],
    },

    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat["recommended-latest"],
    prettierRecommended,

    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        linterOptions: {
            reportUnusedDisableDirectives: "error",
        },
        plugins: {
            "react-refresh": reactRefresh,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            // `interface IFoo extends IBar {}` is used deliberately across src/types
            // to give a response shape a name. typescript-eslint 8 flags it by default.
            "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true,
                    allowExportNames: ["meta", "links", "headers", "loader", "action", "badgeVariants"],
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    args: "after-used",
                    argsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                },
            ],
        },
    },
);
