import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the token
api.interceptors.request.use(async (config) => {
  try {
    const token = await window.Clerk.session.getToken();
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

export const registerUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const user = await window.Clerk.user.getCurrent();
  if (!user) {
    throw new Error("No authenticated user");
  }
  const response = await api.get(`/users/${user.id}`);
  return response.data;
};

export default api;
