import api, {
  createSupabaseClient,
  registerUser,
  getCurrentUser,
} from "./auth";
import apiClient from "./client";
import { endpoints } from "./endpoints";

// Export everything for backward compatibility
export { api, apiClient, createSupabaseClient, registerUser, getCurrentUser };

// Export the new endpoints API
export const apiService = endpoints;

// Default export for convenience
export default api;
