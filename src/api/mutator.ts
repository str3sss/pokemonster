/**
 * Custom mutator for API requests
 * Used by Orval-generated React Query hooks
 */

const BASE_URL = 'https://pokeapi.co';

export type ErrorType<Error> = Error;

export type BodyType<BodyData> = BodyData;

export type CustomInstanceProps = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, unknown>;
  data?: BodyType<unknown>;
  responseType?: 'json' | 'text' | 'blob';
  signal?: AbortSignal;
};

export const customInstance = async <T = unknown>({
  url,
  method,
  params,
  data,
  responseType = 'json',
  signal,
}: CustomInstanceProps): Promise<T> => {
  // Build URL with query parameters
  const urlObj = new URL(url, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
  }

  // Build fetch options
  const fetchOptions: RequestInit = {
    method,
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add body for non-GET requests
  if (data && method !== 'GET') {
    fetchOptions.body = JSON.stringify(data);
  }

  // Make the request
  const response = await fetch(urlObj.toString(), fetchOptions);

  // Handle errors
  if (!response.ok) {
    const error = await response.text().catch(() => response.statusText);
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }

  // Determine content type from response header
  const contentType = response.headers.get('content-type') || '';

  // Parse response based on responseType or content-type
  if (responseType === 'text' || contentType.includes('text/plain')) {
    return (await response.text()) as T;
  }

  if (responseType === 'blob' || contentType.includes('application/octet-stream')) {
    return (await response.blob()) as T;
  }

  // Try to parse as JSON (Pokemon API returns JSON)
  try {
    return (await response.json()) as T;
  } catch {
    // Fallback to text if JSON parsing fails
    return (await response.text()) as T;
  }
};

export default customInstance;

