'use client';

import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authApi, setTokenToStorage, clearToken, getTokenFromStorage } from '@/api/client';
import { LoginRequest, RegisterRequest } from '@/types';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const { user, setUser, logout: storeLogout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await authApi.login(credentials);
      return response;
    },
    onSuccess: (data) => {
      setTokenToStorage(data.accessToken);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterRequest) => {
      const response = await authApi.register(credentials);
      return response;
    },
    onSuccess: (data) => {
      setTokenToStorage(data.accessToken);
    },
  });

  const logout = useCallback(() => {
    clearToken();
    storeLogout();
  }, [storeLogout]);

  const isAuthenticated = useCallback(() => {
    return !!getTokenFromStorage();
  }, []);

  return {
    user,
    isAuthenticated: isAuthenticated(),
    isLoading: loginMutation.isPending || registerMutation.isPending,
    loginAsync: loginMutation.mutateAsync,
    registerAsync: registerMutation.mutateAsync,
    logout,
    error: loginMutation.error || registerMutation.error,
  };
};
