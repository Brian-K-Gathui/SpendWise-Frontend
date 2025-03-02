import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, loginUser, logoutUser } from "../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Check for authentication on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const userString = localStorage.getItem("user");

      if (token && userString) {
        try {
          const userData = JSON.parse(userString);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to parse user data:", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Optional: Add event listener for storage changes if needed
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store the token and user data
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update state
      setUser(data.user);
      setIsAuthenticated(true);

      // Invalidate any user queries to refetch with new auth
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Store the token and user data
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update state
      setUser(data.user);
      setIsAuthenticated(true);

      // Invalidate any user queries to refetch with new auth
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("Registration successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const logout = () => {
    const mutation = useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
        // Clear local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // Update state
        setUser(null);
        setIsAuthenticated(false);

        // Reset the query cache
        queryClient.clear();

        toast.success("Logged out successfully");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Logout failed");

        // Even if the logout fails, clear local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // Update state
        setUser(null);
        setIsAuthenticated(false);

        navigate("/login");
      },
    });

    return mutation.mutate();
  };

  return {
    user,
    isAuthenticated,
    login: login.mutate,
    register: register.mutate,
    logout,
    isLoading: login.isPending || register.isPending,
  };
};
