import type {
  ApodResponse,
  AsteroidResponse,
  MarsRoverResponse,
  NasaSearchResponse,
} from './types';

const API_KEY = process.env.EXPO_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov';
const SEARCH_URL = 'https://images-api.nasa.gov';

async function apiClient<T>(endpoint: string, isSearchApi = false): Promise<T> {
  const baseUrl = isSearchApi ? SEARCH_URL : BASE_URL;
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = isSearchApi
    ? `${baseUrl}${endpoint}`
    : `${baseUrl}${endpoint}${separator}api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export const NASA_SERVICES = {
  getApod: () => apiClient<ApodResponse>('/planetary/apod'),

  search: (query: string) =>
    apiClient<NasaSearchResponse>(`/search?q=${query}&media_type=image`, true),

  getAsteroids: (startDate?: string, endDate?: string) =>
    apiClient<AsteroidResponse>(
      `/neo/rest/v1/feed?start_date=${startDate || daysAgo(3)}&end_date=${endDate || today()}`
    ),

  getMarsPhotos: (rover: string = 'perseverance') =>
    apiClient<MarsRoverResponse>(`/mars-photos/api/v1/rovers/${rover}/latest_photos`),

  getSpaceWeather: () =>
    apiClient<any>('/DONKI/CME?startDate=2024-01-01'),
};
