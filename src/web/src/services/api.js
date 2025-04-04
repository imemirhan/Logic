import axios from "axios";
import config from "../utils/config";  // You already have the config file

// Create an Axios instance
const api = axios.create({
  baseURL: config.API_URL,  // You can set your API URL from the config
  timeout: 5000,            // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",  // Set default Content-Type
  },
});

// Interceptor to attach authorization token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage (or other secure place)
    const userRole = localStorage.getItem("role");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Add the Authorization header if token exists
    }
    if (userRole === "admin") {
      config.headers["X-Admin-Access"] = "true";  // Add custom header for admins
    }
    return config;
  },
  (error) => Promise.reject(error)  // Handle any errors from the request
);

export default api;
