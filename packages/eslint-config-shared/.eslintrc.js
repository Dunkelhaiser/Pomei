module.exports = {
    extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:vitest/recommended",
        "plugin:jsdoc/recommended-typescript-error",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["jsdoc"],
    rules: {
        // Vanilla
        "no-unreachable": "error",
        "prefer-destructuring": "error",
        "object-shorthand": "error",
        eqeqeq: "error",
        yoda: "error",
        "arrow-body-style": ["error", "as-needed"],
        "no-label-var": "error",
        "no-undef-init": "warn",
        "new-cap": ["error", { capIsNew: false }],
        "new-parens": "error",
        "no-array-constructor": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-bitwise": "error",
        "no-lonely-if": "error",
        "no-multi-assign": ["error"],
        "no-unneeded-ternary": "error",
        "no-nested-ternary": "error",
        "prefer-object-spread": "error",
        "prefer-rest-params": "error",
        "prefer-template": "error",
        "default-case-last": "error",
        "grouped-accessor-pairs": "error",
        "no-useless-computed-key": "error",
        "no-useless-rename": "error",
        "no-constant-binary-expression": "error",
        "no-promise-executor-return": "error",
        "no-template-curly-in-string": "error",
        "no-unreachable-loop": "error",
        "no-caller": "error",
        "no-constructor-return": "error",
        "no-else-return": "warn",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-floating-decimal": "error",
        "no-implicit-coercion": "error",
        "no-implied-eval": "error",
        "no-iterator": "error",
        "no-labels": ["error"],
        "no-lone-blocks": "error",
        "no-new": "error",
        "no-proto": "error",
        "no-return-assign": "error",
        "no-script-url": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-useless-call": "error",
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "prefer-named-capture-group": "error",
        "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
        "prefer-regex-literals": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-console": "error",
        "no-alert": "error",
        "symbol-description": "error",
        "array-callback-return": ["error", { allowImplicit: true }],
        "@typescript-eslint/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "no-loop-func": "off",
        "@typescript-eslint/no-loop-func": "error",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "require-await": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/default-param-last": "error",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "variable",
                filter: "__typename",
                format: null,
            },
            {
                selector: "variable",
                types: ["function"],
                format: ["camelCase", "PascalCase"],
                leadingUnderscore: "allow",
            },
            {
                selector: "variable",
                types: ["boolean", "number", "string", "array"],
                format: ["camelCase", "UPPER_CASE"],
            },
            {
                selector: "typeLike",
                format: ["PascalCase"],
            },
        ],

        // JSDoc
        "jsdoc/require-jsdoc": "off",

        // Import
        "import/order": [
            "warn",
            {
                pathGroups: [
                    {
                        pattern: "$/**",
                        group: "internal",
                    },
                ],
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"], "unknown"],
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
            },
        ],
        "import/no-unresolved": "off",
        "import/no-default-export": "error",
        "import/prefer-default-export": "off",
        "import/first": "error",
        "import/newline-after-import": "warn",
        "import/no-absolute-path": "error",
        "import/no-cycle": "error",
        "import/no-extraneous-dependencies": ["error", { includeTypes: true }],
        "import/no-mutable-exports": "error",
        "import/no-relative-packages": "error",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": ["error"],
    },
    overrides: [
        {
            files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
            rules: {
                "import/no-extraneous-dependencies": "off",
            },
        },
    ],
};
