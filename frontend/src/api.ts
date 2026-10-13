import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');

      // Evita loop se o erro 401 ocorreu na própria página de login
      const isLoginPage = window.location.pathname === '/login';
      const isLoginRequest = error.config?.url?.includes('/login');

      if (!isLoginPage && !isLoginRequest) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);