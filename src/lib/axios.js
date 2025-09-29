import axios from "axios";
import { useAuthStore } from "../store/authStore";

const apiBase = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

export const http = axios.create({
  baseURL: apiBase,
  headers: { "Content-Type": "application/json" },
});

// inject Supabase JWT from store
http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken();
  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// optional: handle 401 globally
http.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response?.status === 401) {
      try {
        await useAuthStore.getState().signOut();
      } catch {}
      // You can also redirect to /login here if you want.
    }
    return Promise.reject(err);
  }
);
