import App from "./App";
import Dashboard from "./pages/Dashbaord";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import Features from "./pages/Feature";

// Placeholder components for other dashboard pages
const BudgetsPage = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
    <p className="text-muted-foreground">
      Set and track your spending budgets.
    </p>
    <div className="p-8 text-center bg-muted rounded-lg">
      <h3 className="text-xl font-medium">Coming Soon</h3>
      <p className="mt-2">
        We're working on building comprehensive budget tracking features.
      </p>
    </div>
  </div>
);

const ReportsPage = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
    <p className="text-muted-foreground">
      View financial reports and analytics.
    </p>
    <div className="p-8 text-center bg-muted rounded-lg">
      <h3 className="text-xl font-medium">Coming Soon</h3>
      <p className="mt-2">
        We're working on building comprehensive financial reports for you.
      </p>
    </div>
  </div>
);

const MessagesPage = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
    <p className="text-muted-foreground">
      View and manage your notifications and messages.
    </p>
    <div className="p-8 text-center bg-muted rounded-lg">
      <h3 className="text-xl font-medium">No Messages</h3>
      <p className="mt-2">You don't have any messages at this time.</p>
    </div>
  </div>
);

const SharedWalletsPage = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Shared Wallets</h2>
    <p className="text-muted-foreground">
      Manage wallets shared with family and friends.
    </p>
    <div className="p-8 text-center bg-muted rounded-lg">
      <h3 className="text-xl font-medium">Coming Soon</h3>
      <p className="mt-2">We're working on building shared wallet features.</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
    <p className="text-muted-foreground">
      Manage your account settings and preferences.
    </p>
    <div className="p-8 text-center bg-muted rounded-lg">
      <h3 className="text-xl font-medium">Coming Soon</h3>
      <p className="mt-2">
        We're working on building comprehensive settings for your account.
      </p>
    </div>
  </div>
);

// import MainDashboard from "./pages/Dashboard";
// import DashboardNav from "./components/DashboardNav";

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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/features",
        element: <Features />,
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
        path: "/dashboard/messages",
        element: <Dashboard activePage="messages" />,
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
