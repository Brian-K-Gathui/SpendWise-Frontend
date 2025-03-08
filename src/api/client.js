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

// Add retry logic
apiClient.interceptors.response.use(null, async (error) => {
  const config = error.config;

  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retries) return Promise.reject(error);

  // Set the variable for tracking retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retries) {
    // Reject with the error
    return Promise.reject(error);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff with increasing delay
  const backoff = new Promise((resolve) => {
    const delay = Math.min(1000 * 2 ** config.__retryCount, 10000); // Max 10 seconds
    console.log(
      `Retrying request (${config.__retryCount}/${config.retries}) after ${delay}ms...`,
    );
    setTimeout(() => {
      resolve();
    }, delay);
  });

  // Return the promise in which recalls axios to retry the request
  await backoff;
  return apiClient(config);
});

// Add a request interceptor to add the token
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await window.Clerk?.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error("Error getting Clerk token:", error);
    // Continue without token rather than rejecting the request
    return config;
  }
});

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);

    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
