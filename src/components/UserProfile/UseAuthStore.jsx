import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const baseURL = "https://67f14ef3c733555e24acca22.mockapi.io/User";

export const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: false,
      error: null,

      register: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(baseURL, {
            username,
            password,
            name: username, // simpan juga di field name
          });
          // otomatis login setelah register
          set({ currentUser: res.data, loading: false });
          return res.data;
        } catch (err) {
          set({ error: err.message, loading: false });
          throw err;
        }
      },

      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await axios.get(baseURL);
          const user = data.find(
            (u) => u.username === username && u.password === password
          );
          if (!user) throw new Error("Username atau password salah");
          set({ currentUser: user, loading: false });
          return user;
        } catch (err) {
          set({ error: err.message, loading: false });
          throw err;
        }
      },

      logout: () => set({ currentUser: null }),
    }),
    {
      name: "auth-storage", // simpan di localStorage
    }
  )
);
