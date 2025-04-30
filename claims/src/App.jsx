import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  CircularProgress,
  Box,
} from "@mui/material";
import theme from "./theme";
import { routes } from "./routing";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
