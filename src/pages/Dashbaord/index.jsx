import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { createSupabaseClient } from "@/api/auth";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tableExists, setTableExists] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !user) return;

      try {
        setLoading(true);
        const supabase = await createSupabaseClient();

        // Check if the table exists by trying to query it
        try {
          const { data, error } = await supabase
            .from("user_data")
            .select("id")
            .limit(1);

          if (error && error.code === "42P01") {
            // Table doesn't exist
            console.log("Table doesn't exist, please create it in Supabase");
            setTableExists(false);
            toast.error(
              "The user_data table doesn't exist. Please run the SQL setup script in Supabase.",
            );
            setLoading(false);
            return;
          } else {
            // Table exists
            setTableExists(true);
          }
        } catch (error) {
          console.error("Error checking table:", error);
          setTableExists(false);
          setLoading(false);
          return;
        }

        // Now try to get the user data
        const { data, error } = await supabase
          .from("user_data")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data");
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        toast.error("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newData.trim() || !tableExists) return;

    try {
      setSubmitting(true);
      const supabase = await createSupabaseClient();

      // If userData doesn't exist yet, insert a new record
      if (!userData) {
        const { error } = await supabase.from("user_data").insert({
          user_id: user.id,
          data: {
            custom_data: newData,
            email: user.email,
            full_name: user.fullName,
            avatar_url: user.imageUrl,
          },
        });

        if (error) {
          console.error("Error inserting user data:", error);
          toast.error("Failed to save user data");
          return;
        }
      } else {
        // Update the existing record
        const { error } = await supabase
          .from("user_data")
          .update({
            data: {
              ...userData.data,
              custom_data: newData,
            },
          })
          .eq("user_id", user.id);

        if (error) {
          console.error("Error updating user data:", error);
          toast.error("Failed to update user data");
          return;
        }
      }

      toast.success("Data updated successfully");

      // Refresh the user data
      const { data: refreshedData, error: refreshError } = await supabase
        .from("user_data")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (refreshError) {
        console.error("Error refreshing user data:", refreshError);
      } else {
        setUserData(refreshedData);
        setNewData("");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("An error occurred while updating user data");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              {isLoading ? "Loading..." : "Authentication Required"}
            </CardTitle>
            <CardDescription>
              {isLoading
                ? "Please wait while we load your data."
                : "Please sign in to access your dashboard."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            ) : (
              <Button onClick={() => (window.location.href = "/login")}>
                Sign In
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.fullName || "User"}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Your account information from Clerk
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img
                      src={
                        user?.imageUrl || "/placeholder.svg?height=64&width=64"
                      }
                      alt={user?.fullName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{user?.fullName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase Data</CardTitle>
            <CardDescription>Your data stored in Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !tableExists ? (
              <div className="text-center py-4">
                <p className="text-red-500 mb-4">
                  The user_data table doesn't exist in Supabase.
                </p>
                <p>
                  Please run the SQL setup script in Supabase to create the
                  necessary table.
                </p>
                <pre className="bg-muted p-4 mt-4 rounded-md overflow-auto text-sm text-left">
                  {`CREATE TABLE IF NOT EXISTS public.user_data (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on the table
ALTER TABLE public.user_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
ON public.user_data FOR SELECT
TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own data"
ON public.user_data FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own data"
ON public.user_data FOR UPDATE
TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own data"
ON public.user_data FOR DELETE
TO authenticated USING (auth.uid() = user_id);`}
                </pre>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Current Data:</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                    {JSON.stringify(userData?.data || {}, null, 2)}
                  </pre>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="newData"
                      className="block text-sm font-medium mb-1"
                    >
                      Add Custom Data
                    </label>
                    <Input
                      id="newData"
                      value={newData}
                      onChange={(e) => setNewData(e.target.value)}
                      placeholder="Enter some custom data"
                    />
                  </div>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Data"
                    )}
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
