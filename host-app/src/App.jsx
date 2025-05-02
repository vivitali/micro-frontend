// src/App.jsx
import { Suspense, useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  CircularProgress,
} from "@mui/material";
import baseTheme from "./theme";

// Import layout and pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Claims from "./pages/Claims";
import Providers from "./pages/Providers";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  // State to track the preferred color scheme
  const [mode, setMode] = useState("light");

  // Check for preferred color scheme on mount
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setMode(prefersDark ? "dark" : "light");

    // Add listener for changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setMode(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Create a theme with dark mode colors when needed
  const theme = useMemo(() => {
    if (mode === "dark") {
      return createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode: "dark",
          primary: {
            main: "#60a5fa", // Lighter blue for dark mode
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#818cf8", // Lighter indigo for dark mode
            contrastText: "#ffffff",
          },
          background: {
            default: "#0f172a", // Dark blue-gray
            paper: "#1e293b",
          },
          text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
          },
        },
      });
    }
    return baseTheme;
  }, [mode]);

  // Global loading fallback
  const LoadingFallback = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary errorMessage="There was a problem loading the application">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="claims" element={<Claims />} />
                <Route path="providers" element={<Providers />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
