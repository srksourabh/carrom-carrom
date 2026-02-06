import axios from 'axios';
import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2, iOS simulator uses localhost
// Web production uses relative URL (same domain on Vercel)
const getBaseUrl = () => {
  if (Platform.OS === 'web' && !__DEV__) {
    return '/api/v1';
  }
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000/api/v1';
    }
    return 'http://localhost:3000/api/v1';
  }
  return 'https://carrom-two.vercel.app/api/v1';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Lazy import to avoid circular dependency
let getAuthStore: () => any;

export function setAuthStoreGetter(getter: () => any) {
  getAuthStore = getter;
}

api.interceptors.request.use((config) => {
  if (getAuthStore) {
    const token = getAuthStore().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && getAuthStore) {
      originalRequest._retry = true;
      const store = getAuthStore();
      const refreshToken = store.refreshToken;
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${getBaseUrl()}/auth/refresh`, { refreshToken });
          store.setTokens(data.data.accessToken, data.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(originalRequest);
        } catch {
          store.logout();
        }
      } else {
        store.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
