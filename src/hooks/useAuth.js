import { useUser, useClerk, useSession } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";
import api, { createSupabaseClient } from "../api/auth";

export const useAuth = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { session } = useSession();
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Sync Clerk user with our store and Supabase
  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        try {
          setIsLoading(true);
          const userData = {
            email: user.primaryEmailAddress?.emailAddress || "",
            full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          };

          // Try to sync with our backend
          let backendUser = null;
          try {
            const response = await api.post("/users", userData);
            backendUser = response.data?.user;
          } catch (error) {
            console.error("Error syncing with backend:", error);
            // Continue even if backend sync fails
          }

          // Try to sync with Supabase
          try {
            const supabase = await createSupabaseClient();

            // Directly check if the table exists using information_schema
            try {
              const { data, error } = await supabase
                .from("user_data")
                .select("id")
                .limit(1);

              // If there's no error, the table exists
              if (!error) {
                // Check if user exists in Supabase
                const { data: existingUser, error: fetchError } = await supabase
                  .from("user_data")
                  .select("*")
                  .eq("user_id", user.id)
                  .maybeSingle();

                if (fetchError) {
                  console.error("Error checking user in Supabase:", fetchError);
                }

                // If user doesn't exist, create a profile in Supabase
                if (!existingUser) {
                  const { error: insertError } = await supabase
                    .from("user_data")
                    .insert({
                      user_id: user.id,
                      data: {
                        email: user.primaryEmailAddress?.emailAddress || "",
                        full_name:
                          `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                        avatar_url: user.imageUrl || "",
                      },
                    });

                  if (insertError) {
                    console.error(
                      "Error creating user in Supabase:",
                      insertError,
                    );
                  }
                }
              } else if (error.code === "42P01") {
                // Table doesn't exist - show a message to the user
                console.error("The user_data table doesn't exist in Supabase");
                toast.error(
                  "Database setup incomplete. Please run the SQL setup script in Supabase.",
                );
              }
            } catch (tableError) {
              console.error("Error checking if table exists:", tableError);
            }
          } catch (supabaseError) {
            console.error("Error with Supabase operations:", supabaseError);
            // Continue even if Supabase sync fails
          }

          // Store user data in our frontend store regardless of backend/Supabase success
          setUser({
            id: backendUser?.id || user.id,
            email:
              backendUser?.email ||
              user.primaryEmailAddress?.emailAddress ||
              "",
            fullName:
              backendUser?.full_name ||
              `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            clerkUserId: user.id,
            imageUrl: user.imageUrl || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
          });
        } catch (error) {
          console.error("Error in overall sync process:", error);
          // Still set the user with Clerk data even if syncing fails
          setUser({
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            clerkUserId: user.id,
            imageUrl: user.imageUrl || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        clearUser();
        setIsLoading(false);
      }
    };

    syncUser();
  }, [isSignedIn, user, setUser, clearUser]);

  const logout = async () => {
    try {
      await signOut();
      clearUser();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return {
    user: useAuthStore.getState().user,
    isAuthenticated: isSignedIn,
    isLoading,
    logout,
    session,
  };
};

export default useAuth;
