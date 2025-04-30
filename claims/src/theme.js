// src/theme.js
import { createTheme } from "@mui/material/styles";

// Using direct color values instead of CSS variables
// These approximate your original colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#1e40af", // Similar to your original primary
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f3f4f6", // Light gray
      contrastText: "#1e40af",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827", // Dark gray/almost black
      secondary: "#6b7280", // Medium gray
    },
    error: {
      main: "#ef4444", // Red
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "3.2em",
      lineHeight: 1.1,
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10, // Using a direct value instead of CSS variable
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "0.6em 1.2em",
          fontSize: "1em",
          fontWeight: 500,
          transition: "border-color 0.25s",
          "&:hover": {
            borderColor: "#1e40af", // Using direct value
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    // Custom styles for dark mode can be added by using
    // the StylesProvider or another theming approach
  },
});

export default theme;
