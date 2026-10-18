import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para injetar o token JWT automaticamente se ele existir no localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
