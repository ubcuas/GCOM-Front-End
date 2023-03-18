import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        watch: {
            usePolling: true,
        },
        host: "0.0.0.0",
        strictPort: true,
        port: 5173,
        hmr: {
            clientPort: 5173,
        },
    },
});
