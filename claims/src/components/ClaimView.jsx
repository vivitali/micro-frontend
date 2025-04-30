import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Button,
  Divider,
  Grid,
  Box,
  Skeleton,
  Container,
} from "@mui/material";

const ClaimView = () => {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        setLoading(true);

        // Simulated data
        const mockResponse = {
          id,
          claimNumber: `CLM-${id}`,
          status: "PENDING",
          submittedDate: new Date().toISOString(),
          claimAmount: 1250.75,
          policyHolder: "John Doe",
          description: "Vehicle damage claim",
          coverageType: "Comprehensive",
          assignedTo: "Sarah Johnson",
        };

        // Simulate network delay
        setTimeout(() => {
          setClaim(mockResponse);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load claim data");
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id]);

  if (loading)
    return (
      <Container maxWidth="sm">
        <Card sx={{ my: 4 }}>
          <CardHeader title={<Skeleton variant="text" width="60%" />} />
          <CardContent>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="70%" />
          </CardContent>
        </Card>
      </Container>
    );

  if (error)
    return (
      <Container maxWidth="sm">
        <Card sx={{ my: 4, border: "1px solid #ffcccc" }}>
          <CardHeader title={<Typography color="error">Error</Typography>} />
          <CardContent>
            <Typography>{error}</Typography>
          </CardContent>
        </Card>
      </Container>
    );

  return (
    <Container maxWidth="sm">
      <Card sx={{ my: 4 }}>
        <CardHeader
          title={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Claim #{claim.claimNumber}</Typography>
              <Chip
                label={claim.status}
                variant={claim.status === "PENDING" ? "outlined" : "filled"}
                color="primary"
                size="small"
              />
            </Box>
          }
          subheader={`Submitted on ${new Date(
            claim.submittedDate
          ).toLocaleDateString()}`}
          sx={{ pb: 1 }}
        />

        <CardContent sx={{ pt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography color="text.secondary" variant="body2">
                Amount:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="medium" variant="body2">
                ${claim.claimAmount.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography color="text.secondary" variant="body2">
                Policy Holder:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="medium" variant="body2">
                {claim.policyHolder}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography color="text.secondary" variant="body2">
                Coverage:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="medium" variant="body2">
                {claim.coverageType}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography color="text.secondary" variant="body2">
                Assigned To:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="medium" variant="body2">
                {claim.assignedTo}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography
              color="text.secondary"
              variant="body2"
              fontWeight="medium"
              gutterBottom
            >
              Description:
            </Typography>
            <Typography variant="body2">{claim.description}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => (window.location.href = `/raw-claim/${id}`)}
            >
              View Raw Data
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ClaimView;
