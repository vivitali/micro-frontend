// src/pages/Claims.jsx
import { Suspense, lazy, useState, Component } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  ButtonGroup,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

// Import components from remote app
// const RemoteClaimView = lazy(() => import("claims/ClaimView"));
// const RemoteRawClaimView = lazy(() => import("claims/RawClaimView"));

// Sample claim IDs
const SAMPLE_CLAIMS = ["123", "456", "789"];

const Claims = () => {
  const [selectedId, setSelectedId] = useState(SAMPLE_CLAIMS[0]);
  const [viewType, setViewType] = useState("formatted"); // 'formatted' or 'raw'
  const [error, setError] = useState(null);

  // Handle errors that might occur when loading remote components
  const handleError = (error) => {
    console.error("Error loading remote component:", error);
    setError(
      "Failed to load claims component. Please ensure the claims app is running."
    );
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Claims Management
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="body1"
              component="label"
              htmlFor="claim-select"
              sx={{ mr: 2 }}
            >
              Select Claim:
            </Typography>
            <ButtonGroup variant="outlined" aria-label="claim selection">
              {SAMPLE_CLAIMS.map((id) => (
                <Button
                  key={id}
                  onClick={() => setSelectedId(id)}
                  variant={selectedId === id ? "contained" : "outlined"}
                >
                  #{id}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="body1"
              component="label"
              htmlFor="view-select"
              sx={{ mr: 2 }}
            >
              View Type:
            </Typography>
            <ButtonGroup variant="outlined" aria-label="view type selection">
              <Button
                onClick={() => setViewType("formatted")}
                variant={viewType === "formatted" ? "contained" : "outlined"}
              >
                Formatted
              </Button>
              <Button
                onClick={() => setViewType("raw")}
                variant={viewType === "raw" ? "contained" : "outlined"}
              >
                Raw Data
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>

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
            <ErrorBoundary onError={handleError}>
              {viewType === "formatted" ? (
                // <RemoteClaimView id={selectedId} />
                <div>formatted</div>
              ) : (
                <div>Not formatted</div>
                // <RemoteRawClaimView id={selectedId} />
              )}
            </ErrorBoundary>
          </Suspense>
        </CardContent>
      </Card>
    </Box>
  );
};

// Simple Error Boundary component
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

export default Claims;
