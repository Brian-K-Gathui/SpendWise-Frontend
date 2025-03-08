import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WalletsPage } from "@/components/dashboard/WalletsPage";
import { TransactionsPage } from "@/components/dashboard/TransactionsPage";
import { BudgetsPage } from "@/components/dashboard/BudgetsPage";
import { NotificationsPage } from "@/components/dashboard/NotificationsPage";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

// Placeholder components for other dashboard pages
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

// Main dashboard content
const DashboardOverview = ({ user }) => (
  <div className="space-y-8">
    {/* Welcome Section */}
    <div>
      <h2 className="text-3xl font-bold tracking-tight">
        Hello, {user?.firstName || "User"}!
      </h2>
      <p className="text-muted-foreground">
        Here's an overview of your finances.
      </p>
    </div>

    {/* Dashboard content will be loaded from WalletsPage and TransactionsPage */}
    <div className="grid gap-8">
      <WalletsPage />
      <TransactionsPage />
    </div>
  </div>
);

export default function Dashboard({ activePage = "overview" }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Simulate page transition loading
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activePage]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-muted-foreground">
            Please wait while we load your dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the appropriate content based on the active page
  const renderContent = () => {
    if (isPageLoading) {
      return (
        <div className="space-y-8 animate-in fade-in duration-500">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[180px] w-full" />
            <Skeleton className="h-[180px] w-full" />
            <Skeleton className="h-[180px] w-full" />
          </div>
        </div>
      );
    }

    switch (activePage) {
      case "wallets":
        return <WalletsPage />;
      case "transactions":
        return <TransactionsPage />;
      case "budgets":
        return <BudgetsPage />;
      case "reports":
        return <ReportsPage />;
      case "notifications":
        return <NotificationsPage />;
      case "shared":
        return <SharedWalletsPage />;
      case "settings":
        return <SettingsPage />;
      case "overview":
      default:
        return <DashboardOverview user={user} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-in fade-in duration-300">{renderContent()}</div>
    </DashboardLayout>
  );
}
