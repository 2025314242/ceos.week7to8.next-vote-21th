import { create } from 'zustand';

interface TokenState {
  accessToken: string | null;

  setAccessToken: (token: string) => void;
  clear: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: null,

  setAccessToken: (token) => set({ accessToken: token }),

  clear: () =>
    set({
      accessToken: null,
    }),
}));
