import axios from "axios";
import { API_CONFIG } from "../../constants/config";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log("API Request:", config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log("API Response:", response.status, response.config.url);
    }

    return response;
  },
  (error) => {
    // Handle errors globally
    const { response, request } = error;

    if (response) {
      // Server responded with error
      console.error("API Error:", response.status, response.data);

      // Handle specific status codes
      switch (response.status) {
        case 401:
          // Unauthorized - redirect to login
          console.warn("Unauthorized - Token expired or invalid");
          // window.location.href = "/login";
          break;
        case 403:
          console.warn("Forbidden - Access denied");
          break;
        case 404:
          console.warn("Not Found - Resource not found");
          break;
        case 500:
          console.error("Server Error - Internal server error");
          break;
        default:
          console.error("Error:", response.status);
      }
    } else if (request) {
      // Request made but no response
      console.error("Network Error - No response from server");
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
