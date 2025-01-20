import { ApiResponse } from '../types';

export const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data
});

export const createErrorResponse = (error: string): ApiResponse<never> => ({
  success: false,
  error
}); 