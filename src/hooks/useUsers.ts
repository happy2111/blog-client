'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/api/client';

export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: ['userProfile', username],
    queryFn: () => usersApi.getProfile(username),
    enabled: !!username,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => usersApi.follow(username),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => usersApi.unfollow(username),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};
