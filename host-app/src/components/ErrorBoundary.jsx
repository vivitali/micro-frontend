// src/components/ErrorBoundary.jsx
import React from "react";
import { Alert, Button, Box, Typography } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error);
    }
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {this.props.errorMessage || "Failed to load component"}
          </Alert>

          <Typography variant="body1" sx={{ mb: 2 }}>
            This usually happens when the remote app is not running. Please
            ensure that all microfrontend apps are started.
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
