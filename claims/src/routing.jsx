import { lazy } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  Button,
} from "@mui/material";

const ClaimView = lazy(() => import("./components/ClaimView"));
const ClaimRaw = lazy(() => import("./components/ClaimRaw"));

export const routes = [
  {
    path: "/claim/:id",
    element: <ClaimView />,
  },
  {
    path: "/raw-claim/:id",
    element: <ClaimRaw />,
  },
  {
    path: "/",
    element: (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Claims App
        </Typography>
        <Box sx={{ mt: 4 }}>
          <List>
            <ListItem>
              <Button
                component={Link}
                to="/claim/1"
                variant="contained"
                sx={{ mr: 2 }}
              >
                View Claim
              </Button>
            </ListItem>
            <ListItem>
              <Button component={Link} to="/raw-claim/1" variant="outlined">
                View Raw Claim
              </Button>
            </ListItem>
          </List>
        </Box>
      </Container>
    ),
  },
];
