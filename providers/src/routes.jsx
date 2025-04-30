import { lazy } from "react";
import { Link } from "react-router";

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
  {
    path: "/",
    element: (
      <div>
        <h1>Welcome to the Provider App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/providers">View ProviderList</Link>
            </li>
            <li>
              <Link to="/provider/1">View Provider</Link>
            </li>
          </ul>
        </nav>
      </div>
    ),
  },
];

export default routes;
