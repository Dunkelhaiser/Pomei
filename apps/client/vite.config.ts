/// <reference types="vitest" />
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react(), tsconfigPaths(), TanStackRouterVite()],
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: "./src/test/setup.ts",
    },
});
