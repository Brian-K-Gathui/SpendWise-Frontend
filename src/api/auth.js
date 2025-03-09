import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// Create axios instance with default config - keeping for backward compatibility
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  retries: 3, // Add retry capability
});

// Add retry logic with exponential backoff
api.interceptors.response.use(null, async (error) => {
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
  return api(config);
});

// Add a request interceptor to add the token
api.interceptors.request.use(async (config) => {
  try {
    const token = await window.Clerk?.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error("Error getting Clerk token:", error);
    return Promise.reject(error);
  }
});

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Create a Supabase client with Clerk authentication
export const createSupabaseClient = async () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or anon key in environment variables");
    throw new Error("Supabase configuration is incomplete");
  }

  try {
    // Get the Supabase JWT from Clerk
    let token = null;
    try {
      token = await window.Clerk?.session?.getToken({
        template: "supabase",
      });
    } catch (tokenError) {
      console.error("Error getting Clerk token for Supabase:", tokenError);
      // Continue without token
    }

    // Create Supabase client with the token if available
    const options = {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    };

    if (token) {
      options.global = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return createClient(supabaseUrl, supabaseKey, options);
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    // Return a client without auth as fallback
    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await window.Clerk?.user?.getCurrent();
    if (!user) {
      throw new Error("No authenticated user");
    }
    const response = await api.get(`/users/${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};

export default api;
