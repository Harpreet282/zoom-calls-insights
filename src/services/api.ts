import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://cors-anywhere.herokuapp.com/https://api.zoom.us/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token =
    "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImM2YWNlNDcwLWI1ZDQtNDE4Ni1hYjdlLTE5Nzg0NTE3NzkxMiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJlMTJHeWo1T1JsQ2ZORGhMQTRqZEpRIiwidmVyIjoxMCwiYXVpZCI6ImFhZmQ3MjJhMWE0Y2UzMjNiNzRlMzYxMzExYmM5NTQ3NWUwNjE0MzRjZDQ3ZmE4OWNlOWRkMzBmNDllMmI2ZDgiLCJuYmYiOjE3NDg1MjM2NDQsImNvZGUiOiItSFlRamNYYVROR2NTeUFacVJpLUFRYjltbnF4RWpEWUciLCJpc3MiOiJ6bTpjaWQ6ZHdWV05pa0FScEc2Qnl5UzZ5eng2QSIsImdubyI6MCwiZXhwIjoxNzQ4NTI3MjQ0LCJ0eXBlIjozLCJpYXQiOjE3NDg1MjM2NDQsImFpZCI6Im15NGZFZFlhVDdHdEN2aFYzb1FqQncifQ.4jqM0Qj77F3J0V1k3NPNwjhWI1RqXG2UD9986Td4AWo4qb2uLD-lsHYK9rAoqzm3rgRZtENhnpEjdYFYw79TRw";
  // const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Origin= 'http://localhost:8080'
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Common API functions
export const apiService = {
  // GET request
  get: async <T>(url: string, params?: any): Promise<T> => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },

  // POST request
  post: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  },

  // PUT request
  put: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      console.error("PUT request failed:", error);
      throw error;
    }
  },

  // DELETE request
  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      console.error("DELETE request failed:", error);
      throw error;
    }
  },
};

// API endpoints
export const endpoints = {
  calls: {
    getAll: (params?: { dateRange?: string; salesRep?: string }) =>
      apiService.get("/users/me/meetings", params),
    getById: (id: string) => apiService.get(`/calls/${id}`),
    create: (data: any) => apiService.post("/calls", data),
    update: (id: string, data: any) => apiService.put(`/calls/${id}`, data),
    delete: (id: string) => apiService.delete(`/calls/${id}`),
  },
  // Add more endpoint groups as needed
};
