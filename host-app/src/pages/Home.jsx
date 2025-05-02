// src/pages/Home.jsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

const Home = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          backgroundImage: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Insurance Portal
        </Typography>
        <Typography variant="h6">
          Access claims management and provider network in one place
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <DescriptionIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
                <Typography variant="h5" component="h2">
                  Claims Management
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" paragraph>
                View and manage insurance claims efficiently with our claims
                processing system.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DescriptionIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="View claim details" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DescriptionIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Access claim data" />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                component={Link}
                to="/claims"
                fullWidth
              >
                Go to Claims
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PeopleIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
                <Typography variant="h5" component="h2">
                  Provider Network
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" paragraph>
                Access our network of healthcare providers and their detailed
                information.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Browse all providers" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="View provider details" />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                component={Link}
                to="/providers"
                fullWidth
              >
                Go to Providers
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
