import js from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Flat config — ESLint 10 dropped .eslintrc entirely.
 * Named .mjs because this package is CommonJS.
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */
export default tseslint.config(
    {
        ignores: ["node_modules", "dist"],
    },

    js.configs.recommended,
    tseslint.configs.recommended,
    prettierRecommended,

    {
        files: ["**/*.ts"],
        languageOptions: {
            globals: globals.node,
        },
        linterOptions: {
            reportUnusedDisableDirectives: "error",
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            // `interface IFoo extends IBar {}` is used deliberately across src/types
            // to give a shape a name. typescript-eslint 8 flags it by default.
            "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
            "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
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
