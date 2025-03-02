import axios from "axios";

// Auth API endpoints
export const registerUser = async (userData) => {
  const response = await axios.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
};

export const refreshToken = async () => {
  const response = await axios.post("/auth/refresh");
  return response.data;
};
