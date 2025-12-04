import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", 
  timeout: 10000,
});

// Add request interceptor to include token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let finalError = {
      success: false,
      message: "Something went wrong",
      code: null,
      status: null,
    };

    if (error.response) {
      const { status, data } = error.response;

      finalError.status = status;
      finalError.code = data?.code || null;

      const codeMessages = {
        4001: "Invalid input data",
        4002: "User already exists",
        4010: "Authentication failed",
        4030: "You are not allowed to do this",
        4040: "Resource not found",
        5000: "Server error, try again later",
      };

      if (data?.code && codeMessages[data.code]) {
        finalError.message = codeMessages[data.code];
      } else if (data?.message) {
        finalError.message = data.message;
      } else {
        finalError.message = "Unexpected error from server";
      }
    } else if (error.request) {
      finalError.message = "No response from server. Check your internet connection.";
    } else {
      finalError.message = error.message || "Unknown axios error";
    }

    return Promise.reject(finalError);
  }
);

export default api;
