import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "providers",
      filename: "remoteEntry.js",
      exposes: {
        "./routes": "./src/routes.jsx",
        "./ProviderDetails": "./src/pages/ProviderDetails.jsx",
        "./ProviderList": "./src/pages/ProviderList.jsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-router": { singleton: true, requiredVersion: "^7.5.1" },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5002,
    strictPort: true,
  },
});
