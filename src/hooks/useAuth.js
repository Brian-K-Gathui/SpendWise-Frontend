import { useUser, useClerk, useSession } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "../api/auth";

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
            avatar_url: user.imageUrl || "",
          };

          // Try to sync with Supabase
          try {
            const supabase = await createSupabaseClient();

            // First check if user exists in user_data
            const { data: existingData, error: fetchError } = await supabase
              .from("user_data")
              .select("*")
              .eq("user_id", user.id)
              .limit(1)
              .single();

            if (fetchError && fetchError.code !== "PGRST116") {
              console.error("Error checking user in Supabase:", fetchError);
            }

            // If user doesn't exist or we need to update, upsert the data
            const { data: updatedData, error: upsertError } = await supabase
              .from("user_data")
              .upsert({
                user_id: user.id,
                data: userData,
              })
              .select()
              .single();

            if (upsertError) {
              console.error(
                "Error upserting user data in Supabase:",
                upsertError,
              );
            }

            // Store user data in our frontend store
            setUser({
              id: user.id,
              email: userData.email,
              fullName: userData.full_name,
              clerkUserId: user.id,
              imageUrl: userData.avatar_url,
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              // Add any additional data from Supabase if needed
              supabaseData: updatedData?.data || existingData?.data || {},
            });
          } catch (supabaseError) {
            console.error("Error with Supabase operations:", supabaseError);
            // Still set basic user data even if Supabase fails
            setUser({
              id: user.id,
              email: userData.email,
              fullName: userData.full_name,
              clerkUserId: user.id,
              imageUrl: userData.avatar_url,
              firstName: user.firstName || "",
              lastName: user.lastName || "",
            });
          }
        } catch (error) {
          console.error("Error in overall sync process:", error);
          // Set basic user data from Clerk as fallback
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
