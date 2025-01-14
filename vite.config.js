import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./certificates/eyongkart-privateKey.key"),
      cert: fs.readFileSync("./certificates/eyongkart.crt"),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
