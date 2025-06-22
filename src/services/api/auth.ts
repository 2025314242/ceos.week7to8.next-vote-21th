import Cookies from 'js-cookie';

import { useTokenStore } from '@/lib/store/use-token-store';
import { LoginInput, SignUpRequest } from '@/types/auth.dto';
import type { User } from '@/types/user';

import { axiosInstance } from './axios';

export const login = async (input: LoginInput): Promise<void> => {
  const res = await axiosInstance.post('/api/auth/login', input);

  if (res.status === 200) {
    const { accessToken, refreshToken } = res.data.data;
    useTokenStore.getState().setAccessToken(accessToken);

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

  useTokenStore.getState().clear();
  Cookies.remove('refreshToken', { path: '/' });
};

export const me = async (): Promise<User | null> => {
  try {
    const res = await axiosInstance.get('/api/auth/me');
    const myData = res.data.data;
    return myData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
