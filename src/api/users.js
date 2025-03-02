import axios from "axios";

// User API endpoints
export const getUsers = async () => {
  const response = await axios.get("/users");
  return response.data.users;
};

export const getUser = async (userId) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data.user;
};

export const updateUser = async ({ userId, userData }) => {
  const response = await axios.put(`/users/${userId}`, userData);
  return response.data.user;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`/users/${userId}`);
  return response.data;
};

// Function to refresh the access token
// // Assuming l hav a refresh endpoint
const refreshToken = async () => {
  try {
    const response = await axios.post("/auth/refresh");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Seting up axios interceptor for authentication
export const setupAuthInterceptor = (queryClient) => {
  // Adding a request interceptor to include the token in all requests
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Adding a response interceptor to handle token expiration
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error is 401 and we haven't tried to refresh the token yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const { access_token } = await refreshToken();
          localStorage.setItem("accessToken", access_token);

          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${access_token}`;

          // Retry the original request
          return axios(originalRequest);
        } catch (refreshError) {
          // If refresh token fails, logout the user
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");

          // Invalidate all queries to refetch once the user logs in again
          queryClient.invalidateQueries();

          // Redirect to login page
          window.location.href = "/login";

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
