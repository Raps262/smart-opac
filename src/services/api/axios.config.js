import axios from "axios";
import { API_CONFIG } from "../../constants/config";

// Gabungkan BASE_URL + API_PREFIX secara eksplisit
// Contoh hasil: http://203.194.114.217/api
const BASE_API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}`;

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_API_URL,
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
      console.log(
        "API Request:",
        config.method?.toUpperCase(),
        `${BASE_API_URL}${config.url}`
      );
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
    if (import.meta.env.DEV) {
      console.log("API Response:", response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    const { response, request } = error;

    if (response) {
      console.error("API Error:", response.status, response.data);

      switch (response.status) {
        case 401:
          console.warn("Unauthorized - Token expired or invalid");
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
      console.error("Network Error - No response from server");
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
