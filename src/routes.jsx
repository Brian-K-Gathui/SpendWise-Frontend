import App from "./App";
import Dashboard from "./pages/Dashbaord";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import VerifyEmail from "./pages/VerifyEmail";

const routers = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/dashboard",
        element: <Dashboard activePage="overview" />,
      },
      {
        path: "/dashboard/wallets",
        element: <Dashboard activePage="wallets" />,
      },
      {
        path: "/dashboard/transactions",
        element: <Dashboard activePage="transactions" />,
      },
      {
        path: "/dashboard/budgets",
        element: <Dashboard activePage="budgets" />,
      },
      {
        path: "/dashboard/reports",
        element: <Dashboard activePage="reports" />,
      },
      {
        path: "/dashboard/notifications",
        element: <Dashboard activePage="notifications" />,
      },
      {
        path: "/dashboard/shared",
        element: <Dashboard activePage="shared" />,
      },
      {
        path: "/dashboard/settings",
        element: <Dashboard activePage="settings" />,
      },
      {
        path: "/sso-callback",
        element: (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Completing authentication...
              </h2>
              <p className="text-muted-foreground">
                Please wait while we finish setting up your account.
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
];

export default routers;
