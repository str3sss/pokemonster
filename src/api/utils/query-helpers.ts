import type { UseQueryOptions } from '@tanstack/react-query';
import { parseApiResponse } from './parse-response';

/**
 * Helper function to create query options with automatic JSON parsing
 * @param parseType - The type to parse the response to
 * @returns Query options with select function that parses the response
 */
export function createQueryOptionsWithParser<T>() {
  return {
    select: (data: unknown) => parseApiResponse<T>(data),
  } as Partial<UseQueryOptions<unknown, unknown, T>>;
}

