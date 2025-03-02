import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
        <p className="text-muted-foreground">
          This is your personal dashboard where you can manage your finances.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium">Total Balance</h3>
          <p className="mt-2 text-3xl font-bold">$0.00</p>
          <p className="text-sm text-muted-foreground">Across all accounts</p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium">Monthly Spending</h3>
          <p className="mt-2 text-3xl font-bold">$0.00</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium">Monthly Income</h3>
          <p className="mt-2 text-3xl font-bold">$0.00</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <div className="mt-4">
          <p className="text-center text-muted-foreground py-8">
            No transactions yet. Start tracking your expenses!
          </p>
        </div>
      </div>
    </div>
  );
}
