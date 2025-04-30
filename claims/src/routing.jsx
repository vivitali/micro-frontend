import { lazy } from "react";
import { Link } from "react-router";

const ClaimView = lazy(() => import("./components/ClaimViewPlain"));
const ClaimRaw = lazy(() => import("./components/ClaimRawPlain"));

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
      <div>
        <h1>Welcome to the Claims App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/claim/1">View Claim</Link>
            </li>
            <li>
              <Link to="/raw-claim/1">View Raw Claim</Link>
            </li>
          </ul>
        </nav>
      </div>
    ),
  },
];
