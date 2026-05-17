/**
 * Core types for the Instagram-like Blog application
 */

export interface User {
  id: string;
  username: string;
  email: string | null;
  avatarUrl: string | null;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  caption: string;
  mediaUrl: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  authorUsername: string;
  authorId: string;
  author?: User;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface ApiError {
  error: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  page: number;
  pageSize: number;
}

export interface CreatePostRequest {
  caption: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  file: File;
}

