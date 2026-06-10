// src/services/ApiService.js

import axios from "axios";

export const initialAuthState = {
  userId: null,
  userName: "",
};

const ApiService = (() => {

  // Auto switch URL
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://your-backend-domain.com/api/"
      : "http://localhost:3000/api/";

  const axiosInstance = axios.create({
    baseURL,
    timeout: 100000,
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      // Token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Content Type
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] =
          "multipart/form-data";
      } else {
        config.headers["Content-Type"] =
          "application/json";
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response.data,

    (error) => {
      console.error(
        "API Error:",
        error.response?.data || error.message
      );

      return Promise.reject(
        error.response?.data || error.message
      );
    }
  );

  return {

    get: (url, config = {}) =>
      axiosInstance.get(url, config),

    post: (url, data, config = {}) =>
      axiosInstance.post(url, data, config),

    put: (url, data, config = {}) =>
      axiosInstance.put(url, data, config),

    delete: (url, config = {}) =>
      axiosInstance.delete(url, config),

    patch: (url, data, config = {}) =>
      axiosInstance.patch(url, data, config),
  };
})();

export default ApiService;