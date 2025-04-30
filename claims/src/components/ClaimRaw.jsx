import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Paper,
  Skeleton,
  Grid,
  Container,
  Tooltip,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`claim-tabpanel-${index}`}
      aria-labelledby={`claim-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const RawClaimView = () => {
  const { id } = useParams();
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchRawClaim = async () => {
      try {
        setLoading(true);

        const mockResponse = {
          claimId: id,
          meta: {
            version: "1.2.0",
            processedTimestamp: new Date().toISOString(),
            source: "CLAIMS_PORTAL",
            trackingId: `TRK-${Math.random()
              .toString(36)
              .substring(2, 10)
              .toUpperCase()}`,
          },
          policy: {
            policyNumber: `POL-${Math.floor(Math.random() * 1000000)}`,
            effectiveDate: "2024-01-15T00:00:00Z",
            expirationDate: "2025-01-14T23:59:59Z",
            policyHolder: {
              id: "PH-12345",
              firstName: "John",
              lastName: "Doe",
              dateOfBirth: "1985-06-22",
              contactInfo: {
                email: "john.doe@example.com",
                phone: "555-123-4567",
                address: {
                  street: "123 Main St",
                  city: "Anytown",
                  state: "CA",
                  zipCode: "90210",
                },
              },
            },
            coverages: [
              {
                type: "COMPREHENSIVE",
                limit: 25000,
                deductible: 500,
              },
              {
                type: "LIABILITY",
                limit: 100000,
                deductible: 0,
              },
              {
                type: "COLLISION",
                limit: 15000,
                deductible: 1000,
              },
            ],
          },
          claim: {
            claimNumber: `CLM-${id}`,
            filingDate: new Date(
              Date.now() - 3 * 24 * 60 * 60 * 1000
            ).toISOString(),
            incidentDate: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "PENDING",
            statusHistory: [
              {
                status: "SUBMITTED",
                timestamp: new Date(
                  Date.now() - 3 * 24 * 60 * 60 * 1000
                ).toISOString(),
                updatedBy: "CUSTOMER",
              },
              {
                status: "UNDER_REVIEW",
                timestamp: new Date(
                  Date.now() - 2 * 24 * 60 * 60 * 1000
                ).toISOString(),
                updatedBy: "SYSTEM",
              },
              {
                status: "PENDING",
                timestamp: new Date(
                  Date.now() - 1 * 24 * 60 * 60 * 1000
                ).toISOString(),
                updatedBy: "AGENT_ID_4532",
              },
            ],
            description:
              "Vehicle damage claim resulting from backing into a pole in parking lot",
            claimAmount: 1250.75,
            assignedTo: {
              agentId: "AGT-789",
              name: "Sarah Johnson",
              department: "AUTO_CLAIMS",
              assignedDate: new Date(
                Date.now() - 2 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            documents: [
              {
                id: "DOC-1",
                type: "INCIDENT_REPORT",
                uploadDate: new Date(
                  Date.now() - 3 * 24 * 60 * 60 * 1000
                ).toISOString(),
                fileSize: 1458302,
                mimeType: "application/pdf",
              },
              {
                id: "DOC-2",
                type: "PHOTO_EVIDENCE",
                uploadDate: new Date(
                  Date.now() - 3 * 24 * 60 * 60 * 1000
                ).toISOString(),
                fileSize: 3542987,
                mimeType: "image/jpeg",
              },
              {
                id: "DOC-3",
                type: "REPAIR_ESTIMATE",
                uploadDate: new Date(
                  Date.now() - 2 * 24 * 60 * 60 * 1000
                ).toISOString(),
                fileSize: 982345,
                mimeType: "application/pdf",
              },
            ],
          },
          _debug: {
            processingTime: "127ms",
            cacheMiss: true,
            apiVersion: "v3.2.1",
          },
        };

        // Simulate network delay
        setTimeout(() => {
          setRawData(mockResponse);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load raw claim data");
        setLoading(false);
      }
    };

    fetchRawClaim();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(rawData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading)
    return (
      <Container maxWidth="md">
        <Card sx={{ my: 4 }}>
          <CardHeader title={<Skeleton variant="text" width="60%" />} />
          <CardContent>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </CardContent>
        </Card>
      </Container>
    );

  if (error)
    return (
      <Container maxWidth="md">
        <Card sx={{ my: 4, border: "1px solid #ffcccc" }}>
          <CardHeader title={<Typography color="error">Error</Typography>} />
          <CardContent>
            <Typography>{error}</Typography>
          </CardContent>
        </Card>
      </Container>
    );

  return (
    <Container maxWidth="md">
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
              <Typography variant="h6">
                Raw Data: Claim #{rawData.claim.claimNumber}
              </Typography>
              <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                <IconButton onClick={copyToClipboard} size="small">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />

        <CardContent sx={{ pb: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="claim data tabs"
            >
              <Tab label="JSON" id="claim-tab-0" />
              <Tab label="Info" id="claim-tab-1" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Paper
              variant="outlined"
              sx={{
                maxHeight: 400,
                overflow: "auto",
                bgcolor: "grey.100",
                p: 2,
              }}
            >
              <pre
                style={{
                  margin: 0,
                  fontSize: "0.75rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {JSON.stringify(rawData, null, 2)}
              </pre>
            </Paper>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="text.secondary" variant="body2">
                  Claim ID:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{rawData.claimId}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary" variant="body2">
                  Status:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{rawData.claim.status}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary" variant="body2">
                  Filed:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {new Date(rawData.claim.filingDate).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary" variant="body2">
                  Incident:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {new Date(rawData.claim.incidentDate).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary" variant="body2">
                  Policy #:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {rawData.policy.policyNumber}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary" variant="body2">
                  Documents:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {rawData.claim.documents.length} files
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => (window.location.href = `/claim/${id}`)}
            >
              View Formatted
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

export default RawClaimView;
