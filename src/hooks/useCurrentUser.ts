'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { usersApi, getTokenFromStorage } from '@/api/client';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  const { user, setUser } = useAuthStore();
  const token = getTokenFromStorage();

  const { data: fetchedUser, isLoading: isFetching } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => usersApi.getCurrentUser(),
    enabled: !!token && !user,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (fetchedUser && !user) {
      setUser(fetchedUser);
    }
  }, [fetchedUser, user, setUser]);

  return {
    user: user || fetchedUser || null,
    isLoading: isFetching && !!token && !user,
    isAuthenticated: !!token,
  };
};

