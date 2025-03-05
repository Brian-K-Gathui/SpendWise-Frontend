import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { GoalCard } from "@/components/dashboard/GoalCard";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";
import { SharedWalletTable } from "@/components/dashboard/SharedWalletTable";
import { Gamepad, Plane, Umbrella } from "lucide-react";
import { Navigate } from "react-router-dom";

// Fake data for demonstration
const fakeTransactions = [
  {
    id: "1",
    date: "2024-03-05",
    description: "Grocery Shopping",
    amount: 5000,
    type: "debit",
  },
  {
    id: "2",
    date: "2024-03-04",
    description: "Salary Deposit",
    amount: 150000,
    type: "credit",
  },
  {
    id: "3",
    date: "2024-03-03",
    description: "Electricity Bill",
    amount: 2500,
    type: "debit",
  },
];

const fakeSharedWallets = [
  {
    id: "1",
    name: "Family Thanksgiving",
    team: [
      { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    date: "17 Dec 2023",
    amount: 45000,
  },
  {
    id: "2",
    name: "Dubai Family Trip",
    team: [
      { name: "Alice Brown", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Bob Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    date: "15 Dec 2023",
    amount: 120000,
  },
];

// Placeholder components for other dashboard pages
const WalletsContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Wallets</h2>
    <p className="text-muted-foreground">
      Manage your wallets and payment methods.
    </p>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <WalletCard title="Main Wallet" balance={145320.5} />
      <WalletCard title="Savings" balance={75000} />
      <WalletCard title="Emergency Fund" balance={50000} />
    </div>
  </div>
);

const TransactionsContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
    <p className="text-muted-foreground">
      View and manage your transaction history.
    </p>
    <TransactionHistory transactions={fakeTransactions} />
  </div>
);

const BudgetsContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
    <p className="text-muted-foreground">
      Set and track your spending budgets.
    </p>
    <div className="grid gap-4 md:grid-cols-3">
      <GoalCard
        title="Holidays"
        icon={<Plane className="h-4 w-4 text-blue-500" />}
        current={50000}
        target={150000}
      />
      <GoalCard
        title="Recreation"
        icon={<Gamepad className="h-4 w-4 text-green-500" />}
        current={25000}
        target={75000}
      />
      <GoalCard
        title="Xbox"
        icon={<Umbrella className="h-4 w-4 text-orange-500" />}
        current={35000}
        target={55000}
      />
    </div>
  </div>
);

const ReportsContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
    <p className="text-muted-foreground">
      View financial reports and analytics.
    </p>
    <div className="p-8 text-center bg-muted rounded-lg">
      <h3 className="text-xl font-medium">Reports Coming Soon</h3>
      <p className="mt-2">
        We're working on building comprehensive financial reports for you.
      </p>
    </div>
  </div>
);

const MessagesContent = () => (
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

const SharedWalletsContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Shared Wallets</h2>
    <p className="text-muted-foreground">
      Manage wallets shared with family and friends.
    </p>
    <SharedWalletTable wallets={fakeSharedWallets} />
  </div>
);

const SettingsContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
    <p className="text-muted-foreground">
      Manage your account settings and preferences.
    </p>
    <div className="p-8 text-center bg-muted rounded-lg">
      <h3 className="text-xl font-medium">Settings Coming Soon</h3>
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

    {/* Wallet Section */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <WalletCard
        className="md:col-span-2"
        title="Main Wallet"
        balance={145320.5}
      />
      <div className="grid gap-4 md:col-span-2 lg:col-span-5">
        <div className="grid gap-4 md:grid-cols-3">
          <GoalCard
            title="Holidays"
            icon={<Plane className="h-4 w-4 text-blue-500" />}
            current={50000}
            target={150000}
          />
          <GoalCard
            title="Recreation"
            icon={<Gamepad className="h-4 w-4 text-green-500" />}
            current={25000}
            target={75000}
          />
          <GoalCard
            title="Xbox"
            icon={<Umbrella className="h-4 w-4 text-orange-500" />}
            current={35000}
            target={55000}
          />
        </div>
      </div>
    </div>

    {/* Transactions and Shared Wallets */}
    <div className="grid gap-4 md:grid-cols-2">
      <TransactionHistory transactions={fakeTransactions} />
      <SharedWalletTable wallets={fakeSharedWallets} />
    </div>
  </div>
);

export default function Dashboard({ activePage = "overview" }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on mobile when component mounts
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, []);

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
    switch (activePage) {
      case "wallets":
        return <WalletsContent />;
      case "transactions":
        return <TransactionsContent />;
      case "budgets":
        return <BudgetsContent />;
      case "reports":
        return <ReportsContent />;
      case "messages":
        return <MessagesContent />;
      case "shared":
        return <SharedWalletsContent />;
      case "settings":
        return <SettingsContent />;
      case "overview":
      default:
        return <DashboardOverview user={user} />;
    }
  };

  return <DashboardLayout>{renderContent()}</DashboardLayout>;
}
