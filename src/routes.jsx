import App from "./App";
import Dashboard from "./pages/Dashbaord";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import VerifyEmail from "./pages/VerifyEmail";

// Import dashboard pages or create placeholder components
const WalletsPage = () => <Dashboard activePage="wallets" />;
const TransactionsPage = () => <Dashboard activePage="transactions" />;
const BudgetsPage = () => <Dashboard activePage="budgets" />;
const ReportsPage = () => <Dashboard activePage="reports" />;
const MessagesPage = () => <Dashboard activePage="messages" />;
const SharedWalletsPage = () => <Dashboard activePage="shared" />;
const SettingsPage = () => <Dashboard activePage="settings" />;

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
        element: <WalletsPage />,
      },
      {
        path: "/dashboard/transactions",
        element: <TransactionsPage />,
      },
      {
        path: "/dashboard/budgets",
        element: <BudgetsPage />,
      },
      {
        path: "/dashboard/reports",
        element: <ReportsPage />,
      },
      {
        path: "/dashboard/messages",
        element: <MessagesPage />,
      },
      {
        path: "/dashboard/shared",
        element: <SharedWalletsPage />,
      },
      {
        path: "/dashboard/settings",
        element: <SettingsPage />,
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
