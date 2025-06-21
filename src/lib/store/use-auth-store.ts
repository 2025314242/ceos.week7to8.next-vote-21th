import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  accessToken: string | null;

  setAuth: (user: User, token: string) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setAuth: (user, token) =>
        set(() => ({
          user,
          accessToken: token,
        })),

      setAccessToken: (token) =>
        set((prev) => ({
          ...prev,
          accessToken: token,
        })),

      clearAuth: () =>
        set(() => ({
          user: null,
          accessToken: null,
        })),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
