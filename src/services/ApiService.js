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

    // ========== BLOG SPECIFIC METHODS ==========
    
    // Get all blogs (published only for website)
    getBlogs: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return axiosInstance.get(`/blogs${queryString ? `?${queryString}` : ''}`);
    },

    // Get single blog by ID
    getBlogById: (id) => 
      axiosInstance.get(`/blogs/${id}`),

    // Create blog (admin only)
    createBlog: (formData) => 
      axiosInstance.post('/blogs/', formData),

    // Update blog (admin only)
    updateBlog: (id, formData) => 
      axiosInstance.put(`/blogs/${id}`, formData),

    // Delete blog (admin only)
    deleteBlog: (id) => 
      axiosInstance.delete(`/blogs/${id}`),

    // Update blog status (admin only)
    updateBlogStatus: (id, status) => 
      axiosInstance.patch(`/blogs/${id}/status`, { status }),

    // Get blog views
    getBlogViews: (id) => 
      axiosInstance.get(`/blogs/${id}/views`),

    // Increment blog views
    incrementBlogViews: (id) => 
      axiosInstance.post(`/blogs/${id}/views`),

    // Get blogs count (admin only)
    getBlogsCount: () => 
      axiosInstance.get('/blogs/count'),
  };
})();

export default ApiService;