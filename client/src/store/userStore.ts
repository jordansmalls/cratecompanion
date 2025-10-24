import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";

interface User {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
}

interface UserState {
  user: User | null;
  loading: boolean;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  resetAccount: () => Promise<void>;
  deactivateAccount: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,

      // 📩 UPDATE EMAIL
      updateEmail: async (email) => {
        try {
          set({ loading: true });
          await api.patch("/api/user/email", { email });

          // Refresh user data
          const { data } = await api.get("/api/auth/me");
          set({ user: data });
        } catch (err) {
          console.error("Failed to update email:", err);
          throw err; // allow components to handle
        } finally {
          set({ loading: false });
        }
      },

      // 🔐 UPDATE PASSWORD
      updatePassword: async (currentPassword, newPassword) => {
        try {
          set({ loading: true });
          await api.patch("/api/user/password", {
            currentPassword,
            newPassword,
          });
        } catch (err) {
          console.error("Failed to update password:", err);
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // 🗑️ RESET ACCOUNT (delete all tracklists)
      resetAccount: async () => {
        try {
          set({ loading: true });
          await api.delete("/api/user/tracklists");
        } catch (err) {
          console.error("Failed to reset account:", err);
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // 🚫 DEACTIVATE ACCOUNT (soft delete)
      deactivateAccount: async () => {
        try {
          set({ loading: true });
          await api.delete("/api/user");

          // Clear user after deactivation
          set({ user: null });
          localStorage.removeItem("auth-storage");
        } catch (err) {
          console.error("Failed to deactivate account:", err);
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // 👤 REFRESH USER INFO
      fetchUser: async () => {
        try {
          set({ loading: true });
          const { data } = await api.get("/api/auth/me");
          set({ user: data });
        } catch (err) {
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
