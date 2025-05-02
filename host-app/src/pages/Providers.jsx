// src/pages/Providers.jsx
import { Suspense, lazy, useState, Component } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ProviderDetailsPlain } from "providers/ProviderDetailsPlain";

// Import components from remote app
// const RemoteProviderList = lazy(() => import("providers/ProviderList"));
// const RemoteProviderDetail = lazy(() => import("providers/ProviderDetail"));
// const ProviderDetailsPlain = lazy(() =>
//   import("providers/ProviderDetailsPlain")
// );

// Error boundary component (same as in Claims.jsx)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("Error in ErrorBoundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          Failed to load component. Please check if the remote app is running.
        </Alert>
      );
    }

    return this.props.children;
  }
}

const Providers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  // Get providerId from URL query param or default to list view
  const providerId = searchParams.get("id");
  const viewProvider = providerId ? true : false;

  // Function to handle viewing a specific provider
  const handleViewProvider = (id) => {
    setSearchParams({ id });
  };

  // Function to handle going back to the list
  const handleBackToList = () => {
    setSearchParams({});
  };

  // Handle errors that might occur when loading remote components
  const handleError = (error) => {
    console.error("Error loading remote component:", error);
    setError(
      "Failed to load providers component. Please ensure the providers app is running."
    );
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {viewProvider ? "Provider Details" : "Provider Directory"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ minHeight: 400 }}>
        <CardContent>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 300,
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <ProviderDetailsPlain></ProviderDetailsPlain>
            <ErrorBoundary onError={handleError}>
              {viewProvider ? (
                // Wrap the provider detail component with host app interaction
                <Box>
                  {/* <RemoteProviderDetail
                    id={providerId}
                    onBack={handleBackToList}
                  /> */}
                </Box>
              ) : (
                <ProviderDetailsPlain></ProviderDetailsPlain>
              )}
            </ErrorBoundary>
          </Suspense>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Providers;
