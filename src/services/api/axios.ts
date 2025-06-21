import axios from 'axios';
import Cookies from 'js-cookie';

import { useAuthStore } from '@/lib/store/use-auth-store';

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// accessToken auto-injection
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      const refreshToken = Cookies.get('refreshToken');

      // /api/auth/refresh
      if (refreshToken) {
        try {
          const { data } = await axios.post('/api/auth/refresh', {}, { headers: { 'Refresh-Token': refreshToken } });
          const { accessToken: newAccessToken } = data;
          useAuthStore.getState().setAccessToken(newAccessToken);
        } catch (refreshError) {
          useAuthStore.getState().clearAuth();
          Cookies.remove('refreshToken', { path: '/' });
          return Promise.reject(refreshError);
        }
      }
    }

    const refreshedAccessToken = useAuthStore.getState().accessToken;

    if (refreshedAccessToken) {
      config.headers.Authorization = `Bearer ${refreshedAccessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err),
);

// accessToken auto-refresh
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // status 401: Unauthorized
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        useAuthStore.getState().clearAuth();
        Cookies.remove('refreshToken', { path: '/' });
        return Promise.reject(err);
      }

      // /api/auth/refresh
      try {
        const { data } = await axios.post('/api/auth/refresh', {}, { headers: { 'Refresh-Token': refreshToken } });
        const { accessToken: newAccessToken } = data;
        useAuthStore.getState().setAccessToken(newAccessToken);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  },
);
