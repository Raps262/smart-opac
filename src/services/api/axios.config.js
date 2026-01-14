import axios from "axios";
import { API_CONFIG } from "../../constants/config";

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL + API_CONFIG.API_PREFIX,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
