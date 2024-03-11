export default [
    "apps/*",
    {
        extends: "./apps/client/vite.config.ts",
        test: {
            include: ["tests/**/*.{browser}.test.{ts,js}"],
            name: "happy-dom",
            environment: "happy-dom",
        },
    },
    {
        test: {
            include: ["tests/**/*.{node}.test.{ts,js}"],
            name: "node",
            environment: "node",
        },
    },
];
