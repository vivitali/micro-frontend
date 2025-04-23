import { lazy } from "react";

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
];
