'use client';

import { keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';
import { postsApi } from '@/api/client';
import { Post } from '@/types';

export const useFeed = (page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['feed', page],
    queryFn: () => postsApi.getFeed(page, pageSize),
    placeholderData: keepPreviousData,
  });
};

export const useExplore = (page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['explore', page],
    queryFn: () => postsApi.getExplore(page, pageSize),
    placeholderData: keepPreviousData,
  });
};

export const useUserPosts = (
  username: string,
  page: number = 1,
  pageSize: number = 20
) => {
  return useQuery({
    queryKey: ['userPosts', username, page],
    queryFn: () => postsApi.getUserPosts(username, page, pageSize),
    placeholderData: keepPreviousData,
    enabled: !!username,
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (data: { caption: string; visibility: 'PUBLIC' | 'PRIVATE'; file: File }) =>
      postsApi.create(data.caption, data.visibility, data.file),
  });
};
