import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [react(), tailwindcss(), VitePWA({ registerType: "autoUpdate" })],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
