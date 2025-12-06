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

  // Handle blob responses
  if (responseType === 'blob' || contentType.includes('application/octet-stream')) {
    return (await response.blob()) as T;
  }

  // Pokemon API always returns JSON, even if content-type says text/plain
  // Try to parse as JSON first
  try {
    const text = await response.text();
    // If response is empty, return empty object
    if (!text.trim()) {
      return {} as T;
    }
    return JSON.parse(text) as T;
  } catch {
    // If JSON parsing fails and responseType is explicitly 'text', return as text
    if (responseType === 'text') {
      return (await response.text()) as T;
    }
    // Otherwise, try to get text again (shouldn't happen for Pokemon API)
    const text = await response.text();
    return text as T;
  }
};

export default customInstance;
