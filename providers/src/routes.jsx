import { lazy } from "react";

const ProviderList = lazy(() => import("./pages/ProviderList"));
const ProviderDetail = lazy(() => import("./pages/ProviderDetails"));

const routes = [
  {
    path: "/providers",
    element: <ProviderList />,
  },
  {
    path: "/provider/:id",
    element: <ProviderDetail />,
  },
];

export default routes;
