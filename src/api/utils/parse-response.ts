/**
 * Utility function to parse API response
 * Handles both string and already parsed JSON responses
 * @param data - The data to parse (can be string or already parsed object)
 * @returns Parsed data with the specified type
 */
export function parseApiResponse<T>(data: unknown): T {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON response: ${error}`);
    }
  }
  return data as T;
}

