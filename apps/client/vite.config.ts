/// <reference types="vitest" />
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        TanStackRouterVite(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Pomei",
                short_name: "Pomei",
                start_url: "/",
                display: "standalone",
                background_color: "#f9fafb",
                lang: "en",
                scope: "/",
                icons: [
                    {
                        src: "/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                    {
                        src: "/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
                theme_color: "#f9fafb",
            },
        }),
    ],
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: "./src/test/setup.ts",
    },
});
