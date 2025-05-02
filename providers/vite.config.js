// providers-app/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "providers",
      filename: "remoteEntry.js", // This is the key - place at root, not in assets
      exposes: {
        "./ProviderDetailsPlain": "./src/pages/ProviderDetailsPlain.jsx", // Make sure extension is correct
        // Uncomment other exports as needed:
        // "./ProviderList": "./src/pages/ProviderList.jsx",
        // "./ProviderDetail": "./src/pages/ProviderDetails.jsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-router-dom": { singleton: true, requiredVersion: "^7.5.1" },
        "@mui/material": { singleton: true },
        "@emotion/react": { singleton: true },
        "@emotion/styled": { singleton: true },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    // DON'T output to specific assets directory for remoteEntry.js
    // The federation plugin handles this differently than @module-federation/vite
  },
  server: {
    port: 5002,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
