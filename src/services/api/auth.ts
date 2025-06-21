import Cookies from 'js-cookie';

import { useAuthStore } from '@/lib/store/use-auth-store';
import { LoginInput, SignUpRequest } from '@/types/auth.dto';

import { axiosInstance } from './axios';

export const login = async (input: LoginInput): Promise<void> => {
  const res = await axiosInstance.post('/api/auth/login', input);

  if (res.status === 200) {
    const { accessToken, refreshToken } = res.data.data;
    useAuthStore.getState().setAuth({ id: input.identifier }, accessToken);

    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    Cookies.set('refreshToken', refreshToken, {
      path: '/',
      secure: isSecure,
      sameSite: isSecure ? 'None' : 'Lax',
    });
  }
};

export const signup = async (input: SignUpRequest): Promise<void> => {
  await axiosInstance.post('/api/auth/signup', input);
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/api/auth/logout');

  useAuthStore.getState().clearAuth();
  Cookies.remove('refreshToken', { path: '/' });
};
