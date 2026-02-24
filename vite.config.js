// biome-ignore assist/source/organizeImports: preserve import order for Vite config
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite configuration for HoneyTrap project.
 * Configures React plugin for development and production builds.
 * @see https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react()],
});
