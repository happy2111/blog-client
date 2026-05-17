import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios';
import {AuthResponse, LoginRequest, RegisterRequest} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Создаем инстанс axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для добавления JWT токена к запросам
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromStorage();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Перехватчик для обработки ошибок ��твета
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) => {
    // Если 401 - токен истекший или не валидный
    if (error.response?.status === 401) {
      // Очищаем токен и редиректим на логин
      clearToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getTokenFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem('accessToken');
};

export const setTokenToStorage = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
    document.cookie = `accessToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  }
};

export const clearToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    document.cookie = 'accessToken=; path=/; max-age=0; SameSite=Lax';
  }
};

export const isAuthenticated = (): boolean => {
  return !!getTokenFromStorage();
};

// Auth API методы
export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
    return response.data;
  },
};

// Posts API методы
export const postsApi = {
  getExplore: async (page: number = 1, pageSize: number = 20) => {
    const response = await apiClient.get('/api/posts/explore', {
      params: { page, pageSize },
    });
    return response.data;
  },

  getFeed: async (page: number = 1, pageSize: number = 20) => {
    const response = await apiClient.get('/api/posts/feed', {
      params: { page, pageSize },
    });
    return response.data;
  },

  create: async (caption: string, visibility: 'PUBLIC' | 'PRIVATE', file: File) => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('visibility', visibility);
    formData.append('file', file);

    const response = await apiClient.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getUserPosts: async (username: string, page: number = 1, pageSize: number = 20) => {
    const response = await apiClient.get(`/api/posts/user/${username}`, {
      params: { page, pageSize },
    });
    return response.data;
  },
};

// Users API методы
export const usersApi = {
  getProfile: async (username: string) => {
    const response = await apiClient.get(`/api/users/profile/${username}`);
    return response.data;
  },

  follow: async (username: string) => {
    const response = await apiClient.post(`/api/users/follow/${username}`);
    return response.data;
  },

  unfollow: async (username: string) => {
    const response = await apiClient.delete(`/api/users/follow/${username}`);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/api/users/me');
    return response.data;
  },
};

export default apiClient;

