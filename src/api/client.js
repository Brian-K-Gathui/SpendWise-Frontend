import axios from "axios";
import { toast } from "react-toastify";

// Create a base API client
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  retries: 3, // Add retry capability
});

// Add a request interceptor to add the token
apiClient.interceptors.request.use(async (config) => {
  try {
    // Try to get token from Clerk first
    let token = await window.Clerk?.session?.getToken();

    // Fallback to localStorage if Clerk token isn't available
    if (!token) {
      token = localStorage.getItem("authToken");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error("Error getting auth token:", error);
    // Continue without token rather than rejecting the request
    return config;
  }
});

// Add a response interceptor for error handling and retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry if specific error cases
    if (
      originalRequest._retry ||
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 429) // Don't retry rate limit errors
    ) {
      // Handle unauthorized access
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }

      // Show error message using toast
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);

      return Promise.reject(error);
    }

    // Retry logic for network errors, timeouts, or if retries are explicitly set
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // Check if we've maxed out the total number of retries
    const maxRetries = originalRequest.retries || 3;
    if (originalRequest._retryCount >= maxRetries) {
      // Show error message using toast
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);

      return Promise.reject(error);
    }

    // Increase the retry count
    originalRequest._retryCount += 1;
    originalRequest._retry = true;

    // Create new promise to handle exponential backoff with increasing delay
    const delay = Math.min(1000 * 2 ** originalRequest._retryCount, 10000); // Max 10 seconds
    console.log(
      `Retrying request (${originalRequest._retryCount}/${maxRetries}) after ${delay}ms...`,
    );

    // Return the promise in which recalls axios to retry the request
    return new Promise((resolve) => {
      setTimeout(() => resolve(apiClient(originalRequest)), delay);
    });
  },
);

export default apiClient;
