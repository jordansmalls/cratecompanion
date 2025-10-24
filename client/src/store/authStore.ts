import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";

interface User {
  _id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      // 🔐 LOGIN
      login: async (email, password) => {
        try {
          set({ loading: true });
          await api.post("/api/auth/login", { email, password });
          const { data } = await api.get("/api/auth/me");
          set({ user: data });
        } catch (err) {
          console.error("Login failed:", err);
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      // 📝 REGISTER
      register: async (email, password) => {
        try {
          set({ loading: true });
          await api.post("/api/auth/", { email, password });
          const { data } = await api.get("/api/auth/me");
          set({ user: data });
        } catch (err) {
          console.error("Registration failed:", err);
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      // 🚪 LOGOUT
      logout: async () => {
        try {
          await api.post("/api/auth/logout");
          set({ user: null });
          localStorage.removeItem("auth-storage"); // optional cleanup
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },

      // 👤 FETCH USER (from cookie)
      fetchUser: async () => {
        try {
          set({ loading: true });
          const { data } = await api.get("/api/auth/me");
          set({ user: data });
        } catch {
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ user: state.user }), // only persist user
    }
  )
);
