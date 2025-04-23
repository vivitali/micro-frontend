import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routing";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
