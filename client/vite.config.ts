import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()], // Removed Replit-specific plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Simplified path
      "@shared": path.resolve(__dirname, "../shared"),
      "@assets": path.resolve(__dirname, "./src/assets") // Changed to standard assets folder
    }
  },
  build: {
    outDir: "../dist/public", // Relative path instead of absolute
    emptyOutDir: true
  }
});