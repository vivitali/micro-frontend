import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { getMockProviders, getStatusColor } from "../utils/mockData";

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate API call to get providers
    const fetchProviders = async () => {
      try {
        setLoading(true);
        // In a real app, replace with actual API call
        // const response = await api.getProviders();

        // Simulated data
        const mockData = getMockProviders();

        // Simulate network delay
        setTimeout(() => {
          setProviders(mockData);
          setFilteredProviders(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error("Failed to load providers", err);
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProviders(providers);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = providers.filter(
      (provider) =>
        provider.firstName.toLowerCase().includes(term) ||
        provider.lastName.toLowerCase().includes(term) ||
        provider.specialties.some((spec) =>
          spec.name.toLowerCase().includes(term)
        )
    );

    setFilteredProviders(filtered);
  }, [searchTerm, providers]);

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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Provider Directory
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or specialty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredProviders.length} of {providers.length} providers
      </Typography>

      <Grid container spacing={3}>
        {filteredProviders.map((provider) => (
          <Grid item xs={12} key={provider.id}>
            <Card variant="outlined">
              <CardContent sx={{ pb: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="h6" component="h2">
                      Dr. {provider.firstName} {provider.lastName},{" "}
                      {provider.credentials.join(", ")}
                    </Typography>

                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      {provider.specialties.map((s) => s.name).join(", ")}
                    </Typography>
                  </Box>

                  <Chip
                    label={provider.status}
                    color={getStatusColor(provider.status)}
                    size="small"
                  />
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Address:</strong> {provider.address.street},{" "}
                      {provider.address.city}, {provider.address.state}{" "}
                      {provider.address.zipCode}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Phone:</strong> {provider.phone}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Network Status:</strong> {provider.networkStatus}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Accepting New Patients:</strong>{" "}
                      {provider.acceptingNewPatients ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/provider/${provider.id}`}
                  startIcon={<LocalHospitalIcon />}
                >
                  View Profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {filteredProviders.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body1">
                No providers match your search criteria.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ProviderList;
