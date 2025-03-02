import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, loginUser, logoutUser } from "../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Store the token and user data
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Invalidate any user queries to refetch with new auth
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("Registration successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store the token and user data
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Invalidate any user queries to refetch with new auth
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Reset the query cache
      queryClient.clear();

      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");

      // Even if the  logout fails, clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    },
  });
};

export const useCurrentUser = () => {
  // Getting the current user from localStorage
  const userString = localStorage.getItem("user");
  if (!userString) return null;

  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
};
