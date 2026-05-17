import { AxiosError } from 'axios';
import { ApiError } from '@/types';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError<ApiError>) {
    return error.response?.data?.error || error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

export const handleApiError = (error: unknown): never => {
  const message = getErrorMessage(error);
  throw new Error(message);
};

