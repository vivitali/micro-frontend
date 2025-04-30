import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "claims",
      filename: "remoteEntry.js",
      exposes: {
        "./routes": "./src/routing.jsx",
        "./ClaimView": "./src/components/ClaimView.jsx",
        "./RawClaimView": "./src/components/ClaimRaw.jsx",
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
    port: 5001,
    strictPort: true,
  },
});
