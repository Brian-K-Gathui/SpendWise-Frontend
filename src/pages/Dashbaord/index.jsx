import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import api from "../../api/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        const response = await api.get(`/users/${user.id}`);
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {userData?.full_name || user?.firstName}!
        </h1>
        <p className="text-muted-foreground">
          This is your personal dashboard where you can manage your finances.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium">Account Details</h3>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Email:</span>{" "}
              {userData?.email || user?.primaryEmailAddress?.emailAddress}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Full Name:</span>{" "}
              {userData?.full_name || `${user?.firstName} ${user?.lastName}`}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Member Since:</span>{" "}
              {new Date(
                userData?.created_at || user?.createdAt,
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Add more dashboard components here */}
      </div>
    </div>
  );
}
