"use client";

import { useUser, useClerk, useSession } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import api from "../api/auth";

export const useAuth = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { session } = useSession();
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();

  // Sync Clerk user with our store and Supabase
  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        try {
          const userData = {
            email: user.primaryEmailAddress?.emailAddress,
            full_name: `${user.firstName} ${user.lastName}`,
          };

          // Sync user with Supabase
          const response = await api.post("/users", userData);

          setUser({
            id: response.data.user.id,
            email: response.data.user.email,
            fullName: response.data.user.full_name,
            clerkUserId: user.id,
          });
        } catch (error) {
          console.error("Error syncing user:", error);
          toast.error("Failed to sync user data");
        }
      } else {
        clearUser();
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
    logout,
    session,
  };
};
