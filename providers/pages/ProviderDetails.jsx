import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import { getMockProviders, getStatusColor } from "../utils/mockData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`provider-tabpanel-${index}`}
      aria-labelledby={`provider-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true);

        const mockData = getMockProviders().find((p) => p.id === id);

        if (!mockData) {
          setError("Provider not found");
          setLoading(false);
          return;
        }

        // Simulate  delay
        setTimeout(() => {
          setProvider(mockData);
          setLoading(false);
        }, 800);
      } catch {
        setError("Failed to load provider data");
        setLoading(false);
      }
    };

    if (id) {
      fetchProvider();
    }
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !provider) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error || "Provider not found"}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/providers")}
            sx={{ mt: 2 }}
          >
            Back to Providers
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/providers")}
        sx={{ mb: 3 }}
      >
        Back to Providers
      </Button>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mr: 3,
                bgcolor: "primary.main",
              }}
            >
              {provider.firstName.charAt(0)}
              {provider.lastName.charAt(0)}
            </Avatar>

            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <Typography variant="h5" component="h1">
                  Dr. {provider.firstName} {provider.lastName}
                </Typography>
                <Chip
                  label={provider.status}
                  color={getStatusColor(provider.status)}
                  size="small"
                />
              </Box>

              <Typography variant="subtitle1" color="text.secondary">
                {provider.credentials.join(", ")}
              </Typography>

              <Typography variant="body1">
                {provider.specialties.map((s) => s.name).join(", ")}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Office Address"
                    secondary={`${provider.address.street}, ${provider.address.city}, ${provider.address.state} ${provider.address.zipCode}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <LocalPhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Phone" secondary={provider.phone} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={provider.email} />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <TranslateIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Languages"
                    secondary={provider.languages.join(", ")}
                  />
                </ListItem>

                <ListItem>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Network Status
                    </Typography>
                    <Typography variant="body1">
                      {provider.networkStatus}
                    </Typography>
                  </Box>
                </ListItem>

                <ListItem>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Accepting New Patients
                    </Typography>
                    <Typography variant="body1">
                      {provider.acceptingNewPatients ? "Yes" : "No"}
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="provider information tabs"
        >
          <Tab label="Biography" id="provider-tab-0" />
          <Tab label="Credentials" id="provider-tab-1" />
          <Tab label="Specialties" id="provider-tab-2" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="body1" paragraph>
          {provider.bio ||
            "No biography information available for this provider."}
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <List>
          {provider.providerCredentials.map((credential, index) => (
            <ListItem
              key={index}
              divider={index < provider.providerCredentials.length - 1}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={credential.type}
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      Number: {credential.number}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="span">
                      Valid:{" "}
                      {new Date(credential.issueDate).toLocaleDateString()} -{" "}
                      {new Date(credential.expirationDate).toLocaleDateString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}

          {provider.providerCredentials.length === 0 && (
            <ListItem>
              <ListItemText primary="No credential information available" />
            </ListItem>
          )}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={2}>
          {provider.specialties.map((specialty, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1">{specialty.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Code: {specialty.code}
                </Typography>
              </Paper>
            </Grid>
          ))}

          {provider.specialties.length === 0 && (
            <Grid item xs={12}>
              <Typography>No specialty information available</Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default ProviderDetail;
