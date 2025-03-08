import api, {
  createSupabaseClient,
  registerUser,
  getCurrentUser,
} from "./auth";
import apiClient from "./client";
import { endpoints } from "./endpoints";
import {
  walletService,
  transactionService,
  budgetService,
  categoryService,
  notificationService,
} from "./services";

// Export everything for backward compatibility
export {
  api,
  apiClient,
  createSupabaseClient,
  registerUser,
  getCurrentUser,
  walletService,
  transactionService,
  budgetService,
  categoryService,
  notificationService,
};

// Export the endpoints API
export const apiService = endpoints;

// Default export for convenience
export default api;
