import axios from "axios";
import { API_CONFIG } from "../../constants/config";

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
    console.log("=== DEBUG AXIOS REQUEST ===");
    console.log("Method:", config.method?.toUpperCase());
    console.log("Full URL:", config.url);
    // ... sisanya sama
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("=== DEBUG AXIOS RESPONSE ===");
    console.log("Status:", response.status);
    console.log("URL:", response.config.url);
    return response;
  },
  (error) => {
    console.error("=== ERROR AXIOS ===", error.message);
    return Promise.reject(error);
  }
);

export default apiClient;